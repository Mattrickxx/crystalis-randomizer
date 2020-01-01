import {Rom} from '../rom.js';
import {DefaultMap} from '../util.js';
import {Condition, Requirement} from './requirement.js';

export class Terrains {

  // Aggressive memoization prevents instantiating the same terrain twice.
  // This allows reference equality to tell when two terrains are the same.
  private readonly tiles =
      new DefaultMap<number, Terrain>(
          (effects: number) => makeTile(this.rom, effects));
  private readonly bosses =
      new DefaultMap<number, Terrain>((flag: number) => new BossTerrain(flag));
  private readonly statues = new Map<string, Terrain>();
  private readonly flags =
      new DefaultMap<Terrain, DefaultMap<number, DefaultMap<Terrain, Terrain>>>(
          (base: Terrain) => new DefaultMap(
              (flag: number) => new DefaultMap(
                  (alt: Terrain) => new FlagTerrain(base, flag, alt))));
  private readonly meets =
      new DefaultMap<Terrain, DefaultMap<Terrain, Terrain>>(
          (left: Terrain) => new DefaultMap(
              (right: Terrain) => new MeetTerrain(left, right)));
  private readonly _seamless =
      new DefaultMap<Terrain, Terrain>((t: Terrain) => new SeamlessTerrain(t));

  constructor(readonly rom: Rom) {}

  tile(effects: number): Terrain|undefined {
    return effects & 0x04 ? undefined : this.tiles.get(effects);
  }

  boss(flag: number): Terrain {
    return this.bosses.get(flag);
  }

  // NOTE: also used for triggers
  statue(req: Requirement.Frozen): Terrain {
    const label = Requirement.label(req);
    let terrain = this.statues.get(label);
    if (!terrain) this.statues.set(label, terrain = new StatueTerrain(req));
    return terrain!;
  }

  flag(base: Terrain|undefined, flag: number, alt: Terrain): Terrain {
    if (!base) base = CLOSED;
    return this.flags.get(base).get(flag).get(alt);
  }

  meet(left: Terrain, right: Terrain): Terrain {
    // TODO - memoize properly?  only allow two?
    return this.meets.get(left).get(right);
  }

  seamless(delegate: Terrain) {
    return this._seamless.get(delegate);
  }
}

type DirMask = number;
// NOTE: missing directions are forbidden.
type ExitRequirements = ReadonlyArray<readonly [DirMask, Requirement.Frozen]>;
export interface Terrain {
  enter: Requirement.Frozen;
  exit: ExitRequirements;
}

export namespace Terrain {
  // Built-in terrain bits
  // 0x01 => pit
  export const FLY = 0x02;
  export const BLOCKED = 0x04;
  // 0x08 => flag alternate
  // 0x10 => behind
  export const SLOPE = 0x20;
  // 0x40 => slow
  // 0x80 => pain
  export const BITS = 0x26;

  // Custom terrain bits
  export const SWAMP = 0x100;
  export const BARRIER = 0x200; // shooting statues
  // slope 0..5 => no requirements
  export const SLOPE8 = 0x400; // slope 6..8
  export const SLOPE9 = 0x800; // slopt 9
  // slope 10+ => flight only
  export const DOLPHIN = 0x1000;
}

class SeamlessTerrain implements Terrain {
  readonly enter: Requirement.Frozen;
  readonly exit: ExitRequirements;
  constructor(readonly _delegate: Terrain) {
    this.enter = _delegate.enter;
    this.exit = _delegate.exit;
  }
}

// Basic terrain with an entrance and/or undirected exit condition
class SimpleTerrain implements Terrain {
  readonly exit: ExitRequirements;
  constructor(readonly enter: Requirement.Frozen,
              exit: Requirement.Frozen = Requirement.OPEN) {
    this.exit = [[0xf, exit]];
  }
}

// Basic terrain with an entrance and/or non-south exit condition
class SouthTerrain implements Terrain {
  readonly exit: ExitRequirements;
  constructor(readonly enter: Requirement.Frozen, exit?: Requirement.Frozen) {
    this.exit =
        exit ?
            [[0xb, exit], [0x4, Requirement.OPEN]] :
            [[0xf, Requirement.OPEN]];
  }
}

// Make a terrain from a tileeffects value, augmented with a few details.
function makeTile(rom: Rom, effects: number): Terrain {
  let enter = Requirement.OPEN;
  let exit = undefined;

  if ((effects & Terrain.DOLPHIN) && (effects & Terrain.FLY)) {
    if (effects & Terrain.SLOPE) {
      exit = rom.flags.ClimbWaterfall.r;
    }
    enter = [[rom.flags.AbleToRideDolphin.c], [rom.flags.Flight.c]];
  } else {
    if (effects & Terrain.SLOPE9) {
      exit = rom.flags.ClimbSlope9.r;
    } else if (effects & Terrain.SLOPE8) {
      exit = rom.flags.ClimbSlope8.r;
    } else if (effects & Terrain.SLOPE) {
      exit = rom.flags.Flight.r;
    }
    if (effects & Terrain.FLY) enter = rom.flags.Flight.r;
  }
  if (effects & Terrain.SWAMP) { // swamp
    enter = enter.map(
        (cs: readonly Condition[]) => [rom.flags.TravelSwamp.c, ...cs]);
  }
  if (effects & Terrain.BARRIER) { // shooting statues
    enter = enter.map(
        (cs: readonly Condition[]) => [rom.flags.ShootingStatue.c, ...cs]);
  }
  return new SouthTerrain(enter, exit);
}

class BossTerrain extends SimpleTerrain {
  constructor(readonly _flag: number) {
    super(Requirement.OPEN, [[_flag as Condition]]);
  }
}

class StatueTerrain extends SouthTerrain {
  constructor(readonly _req: Requirement.Frozen) {
    super(Requirement.OPEN, _req);
  }
}

class FlagTerrain extends SimpleTerrain {
  constructor(base: Terrain, flag: number, alt: Terrain) {
    // NOTE: base and alt must both be simple terrains!
    // If flag is -1 then don't consider it (it's untracked).
    if (base.exit.length !== 1 || alt.exit.length !== 1) {
      throw new Error('bad flag');
    }
    const f = [[flag as Condition]];
    const enter = flag >= 0 ? Requirement.meet(alt.enter, f) : alt.enter;
    const exit =
        flag >= 0 ? Requirement.meet(alt.exit[0][1], f) : alt.exit[0][1];
    super(Requirement.or(base.enter, enter),
          Requirement.or(base.exit[0][1], exit));
  }
}
const CLOSED = new SimpleTerrain(Requirement.CLOSED, Requirement.CLOSED);

/** Returns a map from Dir to index in the exit map. */
function directionIndex(t: Terrain): number[] {
  const ind: number[] = [];
  for (let i = 0; i < t.exit.length; i++) {
    for (let b = 0; b < 4; b++) {
      if (t.exit[i][0] & (1 << b)) ind[b] = i;
    }
  }
  for (let b = 0; b < 4; b++) { // sanity check
    if (ind[b] == null) {
      throw new Error(`Bad terrain: ${t.exit.map(e => e[0]).join(',')}`);
    }
  }
  return ind;
}

class MeetTerrain implements Terrain {
  readonly enter: Requirement.Frozen;
  readonly exit: ExitRequirements;
  constructor(readonly left: Terrain, readonly right: Terrain) {
    // This is tricky: we need to figure out which exits are in common and
    // not repeat work.  So build up a reverse map of direction-to-index,
    // then keep track of all the unique combinations.
    const leftInd = directionIndex(left);
    const rightInd = directionIndex(right);
    const sources = new Set<number>();
    const exit: Array<readonly [number, Requirement.Frozen]> = [];
    for (let i = 0; i < 4; i++) {
      sources.add(leftInd[i] << 2 | rightInd[i]);
    }
    for (const source of sources) {
      const [d0, r0] = left.exit[source >> 2];
      const [d1, r1] = right.exit[source & 3];
      exit.push([d0 & d1, Requirement.meet(r0, r1)]);
    }
    this.enter = Requirement.meet(left.enter, right.enter);
    this.exit = exit;
  }
}
