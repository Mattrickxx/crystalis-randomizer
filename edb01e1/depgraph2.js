import { Graph, Area, Boss, Condition, Item, Location, Magic, Option, Trigger } from './graph2.js';

// Make a fresh/clean graph. We could pass options directly into this function.
export const generate = () => {

const graph = new Graph();
const option = (name, value = true) => new Option(graph, name, value);
const item = (id, name) => new Item(graph, id, name, id, null);
const magic = (id, name) => new Magic(graph, id, name, id, null);
const trigger = (name) => new Trigger(graph, name);
const condition = (name) => new Condition(graph, name);
const boss = (index, name, ...deps) => new Boss(graph, index, name, ...deps);
const area = (name) => new Area(graph, name);
const location = (id, area, name) => new Location(graph, id, area, name);


////////////////////////////////////////////////////////////////
// Options
////////////////////////////////////////////////////////////////
const leatherBootsGiveSpeed = option('Leather Boots grant speed');
const assumeGhettoFlight    = option('Assume ghetto flight');
const assumeTalkGlitch      = option('Assume talk glitch');
const swordMagicOptional    = option('Sword magic optional', false);
const requireCalmForBarrier = option('Require calm for barrier');
const teleportToShyron      = option('Sword of Thunder teleports to Shyron');
const barrierOptional       = option('Barrier magic optional');
const refreshOptional       = option('Refresh magic optional');
const earlyFlight           = option('Early flight', false);
const limeTreeConnectsToLeaf = option('Lime Tree connects to Leaf', true);
const assumeWildWarp        = option('Assume wild warp', false);

// TODO - for wild warp consider adding a list of locations,
// then we can hack those into the rom if it changes?

////////////////////////////////////////////////////////////////
// Items
////////////////////////////////////////////////////////////////
const swordOfWind           = item(0x00, 'Sword of Wind')
                                .fromPerson(0x0d)
                                .npcSpawn(0x5e, 0x10, 1)
                                .dialog(0x0d, 0xc0, 2)
                                .key();
const swordOfFire           = item(0x01, 'Sword of Fire')
                                .fromPerson(0x1d)
                                .dialog(0x1d, null, 3)
                                .key();
const swordOfWater          = item(0x02, 'Sword of Water').chest().key();
const swordOfThunder        = item(0x03, 'Sword of Thunder').chest().key();
const crystalis             = item(0x04, 'Crystalis').fixed();
const ballOfWind            = item(0x05, 'Ball of Wind').chest().key();
const tornadoBracelet       = item(0x06, 'Tornado Bracelet').chest().key();
const ballOfFire            = item(0x07, 'Ball of Fire')
                                .bossDrop(0x01)
                                .dialog(0x1e, null, 0)
                                .dialog(0x20, null, 0)
                                .dialog(0x21, null, 0)
                                .dialog(0x22, null, 0)
                                .dialog(0x60, 0x1e, 0)
                                .dialog(0x1d, null, 2)
                                .dialog(0x1f, null, 0)
                                .npcSpawn(0xc1)
                                .key();
const flameBracelet         = item(0x08, 'Flame Bracelet')
                                .bossDrop(0x02)
                                .npcSpawn(0xc2)
                                .key();
const ballOfWater           = item(0x09, 'Ball of Water')
                                .direct(0x3d337)
                                .npcSpawn(0xc3)
                                .key();
const blizzardBracelet      = item(0x0a, 'Blizzard Bracelet').chest().key();
const ballOfThunder         = item(0x0b, 'Ball of Thunder')
                                .bossDrop(0x05)
                                .trigger(0x9a, 1)
                                .key();
const stormBracelet         = item(0x0c, 'Storm Bracelet').chest().key();
const carapaceShield        = item(0x0d, 'Carapace Shield');
const bronzeShield          = item(0x0e, 'Bronze Shield');
const platinumShield        = item(0x0f, 'Platinum Shield');
const mirroredShield        = item(0x10, 'Mirrored Shield');
const ceramicShield         = item(0x11, 'Ceramic Shield');
const sacredShield          = item(0x12, 'Sacred Shield')
                                .bossDrop(0x08)
                                .npcSpawn(0xc7)
                                .bonus();
const battleShield          = item(0x13, 'Battle Shield');
const psychoShield          = item(0x14, 'Psycho Shield');
const tannedHide            = item(0x15, 'Tanned Hide');
const leatherArmor          = item(0x16, 'Leather Armor');
const bronzeArmor           = item(0x17, 'Bronze Armor');
const platinumArmor         = item(0x18, 'Platinmum Armor');
const soldierSuit           = item(0x19, 'Soldier Suit');
const ceramicSuit           = item(0x1a, 'Ceramic Suit');
const battleSuit            = item(0x1b, 'Battle Suit');
const psychoArmor           = item(0x1c, 'Psycho Armor')
                                .bossDrop(0x0a)
                                .npcSpawn(0xcb) // boss spawn
                                .trigger(0x9f) // unused?
                                .npcSpawn(0x83) // azteca
                                .key();
const medicalHerb           = item(0x1d, 'Medical Herb');
const antidote              = item(0x1e, 'Antidote');
const lysisPlant            = item(0x1f, 'Lysis Plant');
const fruitOfLime           = item(0x20, 'Fruit of Lime');
const fruitOfPower          = item(0x21, 'Fruit of Power');
const magicRing             = item(0x22, 'Magic Ring');
const fruitOfRepun          = item(0x23, 'Fruit of Repun')
                                .bossDrop(0x07)
                                .npcSpawn(0xc6)
                                .key();
const warpBoots             = item(0x24, 'Warp Boots');
const statueOfOnyx          = item(0x25, 'Statue of Onyx')
                                .chest()
                                .invisible(0x3e3a2)
                                .key();
const opelStatue            = item(0x26, 'Opel Statue')
                                .bossDrop(0x06)
                                .npcSpawn(0xc5)
                                .key();
const insectFlute           = item(0x27, 'Insect Flute')
                                .fromPerson(0x1e)
                                .dialog(0x1e, null, 1)
                                .key();
const fluteOfLimeQueen      = item(0x28, 'Flute of Lime')
                                .fromPerson(0x38)
                                .direct(0x98f9) // persondata 62 +1
                                // .direct(0x3fa28) // mesia version
                                .dialog(0x38, null, 4)
                                .dialog(0x38, null, 5, 0)
                                .key();
const gasMask               = item(0x29, 'Gas Mask')
                                .direct(0x3d7fe)
                                .npcSpawn(0x16, 0x18)
                                .key();
const powerRing             = item(0x2a, 'Power Ring').chest().bonus();
const warriorRing           = item(0x2b, 'Warrior Ring')
                                .fromPerson(0x54)
                                .dialog(0x54, null, 2)
                                .bonus();
const ironNecklace          = item(0x2c, 'Iron Necklace').chest().bonus();
const deosPendant           = item(0x2d, 'Deo\'s Pendant')
                                .fromPerson(0x5a)
                                .dialog(0x5a, null, 0)
                                .bonus();
const rabbitBoots           = item(0x2e, 'Rabbit Boots')
                                .bossDrop(0x00)
                                .npcSpawn(0xc0)
                                .key();
const leatherBoots          = item(0x2f, 'Leather Boots').chest().bonus();
const shieldRing            = item(0x30, 'Shield Ring')
                                .direct(0x3d2af)
                                .npcSpawn(0x16, 0x57, 2)
                                .bonus();
const alarmFlute            = item(0x31, 'Alarm Flute').fixed();
const windmillKey           = item(0x32, 'Windmill Key')
                                .fromPerson(0x14)
                                .dialog(0x14, 0x0e, 0)
                                .key();
const keyToPrison           = item(0x33, 'Key to Prison').chest().key();
const keyToStyx             = item(0x34, 'Key to Styx')
                                .fromPerson(0x5e, 1)
                                // Require getting both sword of thunder
                                // AND the key to styx SLOT to trigger
                                // shyron massacre.
                                .trigger(0x80, 2) // newly added
                                .dialog(0x5e, 0xf2, 0)
                                .dialog(0x62, 0xf2, 0)
                                .key();
const fogLamp               = item(0x35, 'Fog Lamp').chest().key();
const shellFlute            = item(0x36, 'Shell Flute')
                                .fromPerson(0x63, 1)
                                .npcSpawn(0x63)
                                //.npcSpawn(0x64)
                                //.dialog(0x7b, null, 0)
                                .key();
                                // TODO --- need to add some code,
                                // still need to delete itemuse trigger?
                                // just use the hard-coded ones...?
const eyeGlasses            = item(0x37, 'Eye Glasses')
                                .fromPerson(0x44)
                                .dialog(0x44, 0xe9, 1)
                                .key();
const brokenStatue          = item(0x38, 'Broken Statue')
                                .bossDrop(0x04)
                                .npcSpawn(0x7f, 0x65) // sabera
                                .npcSpawn(0x46)
                                .npcSpawn(0x47)
                                .npcSpawn(0x6a)
                                .npcSpawn(0x84)
                                .npcSpawn(0x8e)
                                .dialog(0x3d)
                                .dialog(0x3e)
                                .dialog(0x3f)
                                .dialog(0x40)
                                .dialog(0x41)
                                .dialog(0x42)
                                .dialog(0x43)
                                .dialog(0x44, 0xe9)
                                .trigger(0xb6)
                                .key();
const glowingLamp           = item(0x39, 'Glowing Lamp')
                                .direct(0x3d30e)
                                .npcSpawn(0x7e, 0x62, 1)
                                .key();
const statueOfGold          = item(0x3a, 'Statue of Gold')
                                // direct(0x1c594) // shuffle is a little odd
                                .fixed();
const lovePendant           = item(0x3b, 'Love Pendant')
                                .chest()
                                .invisible(0x3e3aa)
                                .key();
const kirisaPlant           = item(0x3c, 'Kirisa Plant')
                                .chest()
                                .invisible(0x3e3a6)
                                .key();
const ivoryStatue           = item(0x3d, 'Ivory Statue')
                                .bossDrop(0x09)
                                .npcSpawn(0xc8)
                                .key();
const bowOfMoon             = item(0x3e, 'Bow of Moon')
                                .fromPerson(0x23) // not actually used???
                                .direct(0x3d6e8)
                                .dialog(0x23, null, 1)
                                .key();
const bowOfSun              = item(0x3f, 'Bow of Sun')
                                .chest()
                                .key();
const bowOfTruth            = item(0x40, 'Bow of Truth')
                                .fromPerson(0x83)
                                .npcSpawn(0x83, 0x9c, 1)
                                .dialog(0x83, null, 0)
                                .key();
const refresh               = magic(0x41, 'Refresh')
                                .fromPerson(0x5e)
                                .direct(0x3d711)
                                .dialog(0x5e, 0x10, 2)
                                .trigger(0xb4, 1);
const paralysis             = magic(0x42, 'Paralysis')
                                .direct(0x3d655)
                                // TODO - require defeating kelbesque?
                                .trigger(0x8d)
                                .trigger(0xb2);
const telepathy             = magic(0x43, 'Telepathy')
                                .direct(0x367f4)
                                .npcSpawn(0x5f, 0x1e, 1)
                                .trigger(0x85, 1);
const teleport              = magic(0x44, 'Teleport')
                                .fromPerson(0x5f)
                                .dialog(0x5f, 0x21, 0);
const recover               = magic(0x45, 'Recover')
                                .direct(0x3d1f9);
                                // NOTE: no need for second slot because
                                // recover does not have an ItemGet normally.
const barrier               = magic(0x46, 'Barrier')
                                .direct(0x3d6d9)
                                .trigger(0x84, 0);
const change                = magic(0x47, 'Change')
                                .direct(0x3d6de)
                                .npcSpawn(0x74, 0xf1, 1);
const flight                = magic(0x48, 'Flight')
                                .direct(0x3d18f);
                                // See recover - no need for second slot.
const fluteOfLimeChest      = item(0x28, "Flute of Lime").chest(0x5b).key();
const fruitOfPowerVampire2  = fruitOfPower
                                .bossDrop(0x0c, 0x61)
                                .npcSpawn(0xcc);
const mimic                 = item(0x70, 'Mimic'); // special handling to dup


////////////////////////////////////////////////////////////////
// Triggers
////////////////////////////////////////////////////////////////

// TODO - maybe don't build any logic into here, just put them where they need to go?

const talkedToLeafElder     = trigger('Talked to Leaf Elder').get(swordOfWind);
const talkedToLeafStudent   = trigger('Talked to Leaf Student');
const buyAlarmFlute         = trigger('Buy alarm flute').get(alarmFlute);
const talkedToZebuInCave    = trigger('Talked to Zebu in cave');
const wokeUpWindmillGuard   = trigger('Woke up Windmill Guard').get(windmillKey);
const startedWindmill       = trigger('Started Windmill');
const learnedRefresh        = trigger('Learned Refresh').get(refresh);
const gaveStatueToAkahana   = trigger('Gave Statue to Akahana').get(gasMask);
const foughtStom            = trigger('Fought Stom').get(telepathy);
const visitedOak            = trigger('Visited Oak');
const talkedToOakMother     = trigger('Talked to Oak Mother');
const rescuedOakChild       = trigger('Rescued Oak Child');
const talkedToOakMothher2   = trigger('Talked to Oak Mother Again').get(insectFlute);
const talkedToOakElder      = trigger('Talked to Oak Elder').get(swordOfFire);
const talkedToTornelOnMtSabre = trigger('Talked to Tornel on Mt Sabre').get(teleport);
const villagersAbducted     = trigger('Villagers Abducted');
const talkedToLeafRabbit    = trigger('Talked to Rabbit in Leaf');
const learnedParalysis      = trigger('Learned Paralysis').get(paralysis);
const talkedToPortoaQueen   = trigger('Talked to Portoa Queen');
const talkedToFortuneTeller = trigger('Talked to Fortune Teller');
const visitedUndergroundChannel = trigger('Visited Underground Channel');
const sentToWaterfallCave   = trigger('Sent to Waterfall Cave').get(fluteOfLimeQueen); // no rando? or do both...
const curedAkahana          = trigger('Cured Akahana').get(shieldRing);
const talkedToRage          = trigger('Talked to Rage').get(ballOfWater);
const mesiaRecording        = trigger('Mesia recording played');
const talkedToAsina         = trigger('Talked to Asina').get(recover);
const healedDolphin         = trigger('Healed Dolphin').get(shellFlute);
const returnedFogLamp       = trigger('Returned Fog Lamp');
const talkedToKensuInCabin  = trigger('Talked to Kensu in Cabin');
const talkedToJoelElder     = trigger('Talked to Joel Elder');
const talkedToClark         = trigger('Talked to Clark').get(eyeGlasses);
const talkedToKensuInLighthouse = trigger('Talked to Kensu in Lighthouse').get(glowingLamp);
const repairBrokenStatue    = trigger('Repair Broken Statue').get(statueOfGold); // no rando?
const calmedSea             = trigger('Calmed the Angry Sea');
const learnedBarrier        = trigger('Learned Barrier').get(barrier);
const talkedToStomInSwan    = trigger('Talked to Stom in Swan Hut');
const talkedToKensuInTavern = trigger('Talked to Kensu in Swan tavern');
const talkedToKensuAtDance  = trigger('Talked to Kensu at Swan dance');
const returnedLovePendant   = trigger('Returned Kensu\'s love pendant').get(change);
const talkedToAmazonesQueen = trigger('Talked to Amazones Queen').get(bowOfMoon);
const enteredShyron         = trigger('Entered Shyron');
const talkedToZebuInShyron  = trigger('Talked to Zebu in Shyron').get(keyToStyx);
const shyronMassacre        = trigger('Shyron Massacre');
const savedKensu            = trigger('Saved Kensu').get(flight);
const talkedToDeo           = trigger('Talked to Deo').get(deosPendant);
const talkedToAkahanaFriend = trigger('Talked to Akahana\'s Friend').get(warriorRing);
const getBowOfTruth         = trigger('Get Bow of Truth').get(bowOfTruth);
const forgedCrystalis       = trigger('Forged Crystalis').get(crystalis);
const win                   = trigger('Win');
//exports.end = win;

////////////////////////////////////////////////////////////////
// Conditions
////////////////////////////////////////////////////////////////
const destroyStone          = condition('Destroy stone').option(swordOfWind, ballOfWind);
const destroyIce            = condition('Destroy ice').option(swordOfFire, ballOfFire);
const crossRivers           = condition('Cross rivers')
                                .option(swordOfWater, ballOfWater)
                                .option(flight, earlyFlight);
const destroyIron           = condition('Destroy iron').option(swordOfThunder, ballOfThunder);
const anySword              = condition('Any sword')
                                .option(swordOfWind).option(swordOfFire)
                                .option(swordOfWater).option(swordOfThunder);
const fireOrWaterOrThunder  = condition('Fire/Water/Thunder')
                                .option(swordOfFire).option(swordOfWater).option(swordOfThunder);
const speedBoots            = condition('Speed boots').option(leatherBoots, leatherBootsGiveSpeed);
const climbSlopes           = condition('Climb slopes')
                                .option(rabbitBoots)
                                .option(flight, earlyFlight)
                                .option(speedBoots);
// Required for access to underground channel.
const asinaTrigger          = condition('Asina in her room')
                                // NOTE: this is just ballOfWater in vanilla.
                                .option(mesiaRecording);
const paralysisOrAsina      = condition('Paralysis or Ball of Water')
                                .option(paralysis).option(asinaTrigger);
// TODO - consider adding healedDolphin and/or returnedFogLamp here?  otherwise, flight alone
// is basically enough (though with flight the dolphin is basically just a convenience).
const rideDolphin           = condition('Ride dolphin').option(shellFlute, talkedToKensuInCabin);
const crossSea              = condition('Cross sea')
                                .option(rideDolphin)
                                .option(flight, earlyFlight);
const crossWhirlpool        = condition('Cross whirlpool')
                                .option(calmedSea)
                                .option(flight, earlyFlight)
                                .option(assumeGhettoFlight);
const windMagic             = condition('Wind magic')
                                .option(swordMagicOptional)
                                .option(ballOfWind, tornadoBracelet);
const fireMagic             = condition('Fire magic')
                                .option(swordMagicOptional)
                                .option(ballOfFire, flameBracelet);
const waterMagic            = condition('Water magic')
                                .option(swordMagicOptional)
                                .option(ballOfWater, blizzardBracelet);
const thunderMagic          = condition('Thunder magic')
                                .option(swordMagicOptional)
                                .option(ballOfThunder, stormBracelet);
const fluteOfLimeOrGlitch   = condition('Flute of lime or glitch')
                                .option(fluteOfLimeQueen)
                                .option(assumeTalkGlitch);
const changeOrGlitch        = condition('Change or glitch')
                                .option(change)
                                .option(assumeTalkGlitch);
const passShootingStatues   = condition('Pass shooting statues')
                                .option(barrier)
                                .option(refresh)
                                .option(barrierOptional);
// TODO - what to block this on?
// const maybeRefresh          = condition('Refresh if needed')
//                                 .option(refreshOptional)
//                                 .option(refresh);

// TODO - warp triggers, wild warp, etc...
// ghetto flight?  talk glitch?  triggers (calmed sea or ghetto flight)?  require magic for boss?

////////////////////////////////////////////////////////////////
// Bosses
////////////////////////////////////////////////////////////////

// TODO - .trigger(...) but also allow bossLocation.trigger(...) to only affect after
// the boss is killed...? useful for e.g. eyeGlasses require sabera1 or else palace boss?
const vampire1    = boss(0x00, 'Vampire 1', anySword).get(rabbitBoots);
const giantInsect = boss(0x01, 'Insect', insectFlute, fireOrWaterOrThunder).get(ballOfFire);
const kelbesque1  = boss(0x02, 'Kelbesque 1', swordOfWind, windMagic).get(flameBracelet);
const vampire2    = boss(0x0c, 'Vampire 2', anySword).get(fruitOfPowerVampire2);
const sabera1     = boss(0x04, 'Sabera 1', swordOfFire, fireMagic).get(brokenStatue);
const mado1       = boss(0x05, 'Mado 1', swordOfWater, waterMagic).get(ballOfThunder);
const kelbesque2  = boss(0x06, 'Kelbesque 2', swordOfWind, windMagic).get(opelStatue);
const sabera2     = boss(0x07, 'Sabera 2', swordOfFire, fireMagic).get(fruitOfRepun);
const mado2       = boss(0x08, 'Mado 2', swordOfWater, waterMagic).get(sacredShield);
const karmine     = boss(0x09, 'Karmine', swordOfThunder, thunderMagic).get(ivoryStatue);
const draygon1    = boss(0x0a, 'Draygon 1', anySword).get(psychoArmor);
const statues     = boss(null, 'Statues', bowOfSun, bowOfMoon);
const draygon2    = boss(0x0b, 'Draygon 2', anySword);
const dyna        = boss(0x0d, 'Dyna', crystalis);

////////////////////////////////////////////////////////////////
// Areas
////////////////////////////////////////////////////////////////
const LEAF = area('Leaf');
const VWND = area('Valley of Wind');
const VAMP = area('Sealed Cave');
const CORD = area('Cordel Plain');
const BRYN = area('Brynmaer');
const AMZN = area('Amazones');
const SBRW = area('Mt Sabre West');
const SBRN = area('Mt Sabre North');
const NADR = area('Nadare\'s');
const OAK  = area('Oak');
const WFVL = area('Waterfall Valley');
const PORT = area('Portoa');
const WFCV = area('Waterfall Cave');
const FOGL = area('Fog Lamp Cave');
const KIRI = area('Kirisa Plant Cave');
const ASEA = area('Angry Sea');
const JOEL = area('Joel');
const EVIL = area('Evil Spirit Island');
const SABR = area('Sabera\'s Castle');
const SWAN = area('Swan');
const HYDR = area('Mt Hydra');
const SHYR = area('Shyron');
const STYX = area('Styx');
const GOA  = area('Goa');
const DRG1 = area('Draygonia Fortress 1');
const DRG2 = area('Draygonia Fortress 2');
const DRG3 = area('Draygonia Fortress 3');
const DRG4 = area('Draygonia Fortress 4');
const OASC = area('Oasis Cave');
const DSRT = area('Desert');
const SHRA = area('Sahara');
const PYRF = area('Pyramid Front');
const PYRB = area('Pyramid Back');
const TOWR = area('Tower');

////////////////////////////////////////////////////////////////
// Locations
////////////////////////////////////////////////////////////////

// Leaf, Valley of Wind, Sealed Cave

const start                 = location(0x00, LEAF, 'Start');
const mezameShrine          = location(0x00, LEAF, 'Mezame Shrine')
                                .connect(start);
const outsideStart          = location(0x01, LEAF, 'Outside Start')
                                .connect(mezameShrine);
const leaf                  = location(0x02, LEAF, 'Town')
                                .connect(outsideStart);
const valleyOfWind          = location(0x03, VWND, 'Main')
                                .connect(leaf)
                                .trigger(learnedRefresh, startedWindmill);
const outsideWindmill       = location(0x03, VWND, 'Outside Windmill');
const sealedCave1           = location(0x04, VAMP, 'Tunnel 1 (entrance)')
                                // to(valleyOfWind), // TODO - unglitch
                                .from(valleyOfWind, startedWindmill);
const sealedCave2           = location(0x05, VAMP, 'Tunnel 2 (over bridge)')
                                .connect(sealedCave1);
const sealedCave6           = location(0x06, VAMP, 'Tunnel 6 (herb dead end)')
                                .chest(medicalHerb, 0x0f);
const sealedCave4a          = location(0x07, VAMP, 'Tunnel 4a (ball corridor)')
                                .chest(medicalHerb, 0x14, 0x50)
                                .chest(ballOfWind, 0x15);
const sealedCave4b          = location(0x07, VAMP, 'Tunnel 4b (antidote dead end)')
                                .connect(sealedCave4a, destroyStone) // 64dd:10
                                .chest(antidote, 0x1e);
const sealedCave5           = location(0x08, VAMP, 'Tunnel 5 (warp boots dead end)')
                                .chest(warpBoots, 0x0e);
const sealedCave3a          = location(0x09, VAMP, 'Tunnel 3a (branch, front)')
                                .connect(sealedCave2)
                                .connectTo(sealedCave4a)
                                .connectTo(sealedCave5);
const sealedCave3b          = location(0x09, VAMP, 'Tunnel 3b (branch, back)')
                                .connect(sealedCave3a, destroyStone) // 64dd:08
                                .connectTo(sealedCave6);
const sealedCave7           = location(0x0a, VAMP, 'Tunnel 7 (boss)')
                                .connect(sealedCave3b)
                                .boss(vampire1);
const sealedCave8a          = location(0x0c, VAMP, 'Tunnel 8a (exit, above wall)')
                                .connect(sealedCave7);
const sealedCave8b          = location(0x0c, VAMP, 'Tunnel 8b (exit, below wall)')
                                .connect(sealedCave8a, destroyStone); // 64d0:10
const windmillCave          = location(0x0e, VWND, 'Windmill Cave')
                                .connect(valleyOfWind)
                                .connectTo(outsideWindmill)
                                .trigger(wokeUpWindmillGuard, alarmFlute, talkedToZebuInCave);
const windmill              = location(0x0f, VWND, 'Windmill')
                                .connect(outsideWindmill)
                                .trigger(startedWindmill, windmillKey);
const zebuCaveFront         = location(0x10, VWND, 'Zebu\'s Cave Front')
                                .connect(valleyOfWind)
                                .trigger(talkedToZebuInCave, talkedToLeafElder, talkedToLeafStudent)
                                .trigger(learnedRefresh, startedWindmill, talkedToZebuInCave);
const zebuCaveBack          = location(0x10, VWND, 'Zebu\'s Cave Back')
                                .trigger(villagersAbducted)
                                .connect(zebuCaveFront, destroyIce);
const mtSabreWestTunnel1    = location(0x11, SBRW, 'Tunnel 1 (to Zebu)')
                                .connect(zebuCaveBack);

// Cordel Plain, Brynmaer, and environs

const cordelPlainWest       = location(0x14, CORD, 'West')
                                //.connect(zebuCaveBack)
                                .connect(sealedCave8b);
const cordelPlainSouth      = location(0x14, CORD, 'South')
                                .connect(cordelPlainWest, crossRivers); // 64dd:04
const cordelPlainEast       = location(0x15, CORD, 'East')
                                .connect(cordelPlainWest)
                                .chest(statueOfOnyx, 0x18);
const brynmaer              = location(0x18, BRYN, 'Town')
                                .connect(cordelPlainWest)
                                .trigger(gaveStatueToAkahana, statueOfOnyx);
const outsideStomsHouse     = location(0x19, CORD, 'Outside Stom\'s House')
                                .connect(cordelPlainWest);
const swamp                 = location(0x1a, CORD, 'Swamp')
                                .connect(cordelPlainEast, gasMask)
                                .trigger(rescuedOakChild, talkedToOakMother, gasMask);
const swampBoss             = location(0x1a, CORD, 'Swamp Insect Area')
                                .connect(swamp, gasMask)
                                .boss(giantInsect);
const amazones              = location(0x1b, AMZN, 'Town')
                                .connect(cordelPlainSouth);
const oak                   = location(0x1c, OAK,  'Town')
                                .connect(swamp, gasMask)
                                .trigger(visitedOak);
const stomsHouse            = location(0x1e, CORD, 'Stom\'s House')
                                .connect(outsideStomsHouse)
                                .trigger(foughtStom, visitedOak);

// Mt Sabre West

const mtSabreWestEntrance   = location(0x20, SBRW, 'Entrance')
                                .connect(cordelPlainWest)
                                .connect(mtSabreWestTunnel1);
const mtSabreWestUpSlope    = location(0x20, SBRW, 'Up Slope')
                                .from(mtSabreWestEntrance, climbSlopes)
                                .to(mtSabreWestEntrance);
const mtSabreWestDeadEnd    = location(0x20, SBRW, 'Dead End (warp boots)')
                                .chest(warpBoots, 0x18, 0x6a);
const mtSabreWestUpper      = location(0x21, SBRW, 'Upper')
                                .from(mtSabreWestEntrance, flight)
                                .to(mtSabreWestEntrance);
const mtSabreWestTornel     = location(0x21, SBRW, 'Tornel Dead End')
                                .trigger(talkedToTornelOnMtSabre, tornadoBracelet)
                                .chest(magicRing, 0x17, 0x69);
const mtSabreWestTunnel2a   = location(0x22, SBRW, 'Tunnel 2a (fork at start)')
                                .connect(mtSabreWestEntrance);
const mtSabreWestTunnel2b   = location(0x22, SBRW, 'Tunnel 2b (left branch to dead end)')
                                .connect(mtSabreWestTunnel2a, destroyIce) // 64dd:02
                                .connectTo(mtSabreWestDeadEnd);
const mtSabreWestTunnel2c   = location(0x22, SBRW, 'Tunnel 2c (right branch to upper)')
                                .connect(mtSabreWestTunnel2a, destroyIce); // 64dd:01
const mtSabreWestTunnel3a   = location(0x23, SBRW, 'Tunnel 3a (tunnel to upper, with herb chest)')
                                .connect(mtSabreWestTunnel2c)
                                .chest(medicalHerb, 0x17, 0x52);
const mtSabreWestTunnel3b   = location(0x23, SBRW, 'Tunnel 3b (tunnel to upper, branch below ice)')
                                .connect(mtSabreWestTunnel3a, destroyIce) // 64dc:80
                                .connectTo(mtSabreWestUpper);
const mtSabreWestTunnel4a   = location(0x24, SBRW, 'Tunnel 4a (branch to upper or Tornel)')
                                .connect(mtSabreWestTunnel3b);
const mtSabreWestTunnel4b   = location(0x24, SBRW, 'Tunnel 4b (out to upper)')
                                .connect(mtSabreWestTunnel4a, destroyIce) // 64dc:40
                                .connectTo(mtSabreWestUpper);
const mtSabreWestTunnel5    = location(0x25, SBRW, 'Tunnel 5 (tiny connector)')
                                .connect(mtSabreWestTunnel4a);
const mtSabreWestTunnel6a   = location(0x26, SBRW, 'Tunnel 6a (exit to Tornel, above ice)')
                                .connect(mtSabreWestTunnel5);
const mtSabreWestTunnel6b   = location(0x26, SBRW, 'Tunnel 6b (exit to Tornel, below ice)')
                                .connect(mtSabreWestTunnel6a, destroyIce) // 64dc:20
                                .connectTo(mtSabreWestTornel);
const mtSabreWestTunnel7a   = location(0x27, SBRW, 'Tunnel 7a (tornado bracelet, lower)')
                                .connect(mtSabreWestUpSlope);
const mtSabreWestTunnel7b   = location(0x27, SBRW, 'Tunnel 7b (tornado bracelet, middle)')
                                .connect(mtSabreWestTunnel7a, destroyIce); // 64dc:10
const mtSabreWestTunnel7c   = location(0x27, SBRW, 'Tunnel 7c (tornado bracelet, upper)')
                                .connect(mtSabreWestTunnel7b, destroyIce) // 64dc:08
                                .chest(tornadoBracelet, 0x19);

// Mt Sabre North

const mtSabreNorthEntrance  = location(0x28, SBRN, 'Entrance')
                                .connect(cordelPlainEast, teleport, talkedToLeafRabbit);
const mtSabreNorthUpper     = location(0x28, SBRN, 'Upper')
                                .from(mtSabreNorthEntrance, flight)
                                .to(mtSabreNorthEntrance);
const mtSabreNorthSummit    = location(0x28, SBRN, 'Summit (boss)')
                                .from(mtSabreNorthUpper, flight)
                                .to(mtSabreNorthUpper)
                                .boss(kelbesque1);
const mtSabreNorthConnector = location(0x29, SBRN, 'Connector');
const mtSabreNorthMidLeft   = location(0x29, SBRN, 'Middle Left');
const mtSabreNorthMidRight  = location(0x29, SBRN, 'Middle Right')
                                .from(mtSabreNorthMidLeft, climbSlopes)
                                .to(mtSabreNorthMidLeft);
const mtSabreNorthTunnel2a  = location(0x2a, SBRN, 'Tunnel 2a (from entrance to connector)')
                                .connectTo(mtSabreNorthConnector);
const mtSabreNorthTunnel2b  = location(0x2a, SBRN, 'Tunnel 2b (under bridge, to antidote)')
                                .connect(mtSabreNorthTunnel2a, destroyIce) // 64dc:04
                                .chest(antidote, 0x17, 0x5e);
const mtSabreNorthTunnel3a  = location(0x2b, SBRN, 'Tunnel 3a (branch after connector)')
                                .connect(mtSabreNorthConnector);
const mtSabreNorthTunnel3b  = location(0x2b, SBRN, 'Tunnel 3b (right branch)')
                                .connect(mtSabreNorthTunnel3a, destroyIce); // 64dc:02
const mtSabreNorthTunnel3c  = location(0x2b, SBRN, 'Tunnel 3c (upper branch)')
                                .connect(mtSabreNorthTunnel3a, destroyIce); // 64dc:01
const mtSabreNorthTunnel4   = location(0x2c, SBRN, 'Tunnel 4 (over bridge, to middle)')
                                .connect(mtSabreNorthTunnel3c)
                                .connectTo(mtSabreNorthMidLeft);
const mtSabreNorthTunnel5a  = location(0x2d, SBRN, 'Tunnel 5a (E-shaped, from right branch)')
                                .connect(mtSabreNorthTunnel3b)
                                .connectTo(mtSabreNorthMidRight);
const mtSabreNorthTunnel5b  = location(0x2d, SBRN, 'Tunnel 5b (dead-end with herb)')
                                .connect(mtSabreNorthTunnel5a, destroyIce) // 64db:80
                                .chest(medicalHerb, 0x16, 0x53);
const mtSabreNorthTunnel6a  = location(0x2e, SBRN, 'Tunne; 6a (S-shaped hall, right)')
                                .connect(mtSabreNorthTunnel5a);
const mtSabreNorthTunnel6b  = location(0x2e, SBRN, 'Tunne; 6b (S-shaped hall, middle)')
                                .connect(mtSabreNorthTunnel6a, destroyIce); // 64db:20
const mtSabreNorthTunnel6c  = location(0x2e, SBRN, 'Tunnel 6c (S-shaped hall, left)')
                                .connect(mtSabreNorthTunnel6b, destroyIce); // 64db:40
// NOTE: the following four ice walls are problematic for bacsktracking.
// We may want to put in place something to destroy them if coming in at that entrance,
// or to enter lower if the wall is intact.  We could even iterate over the objects and
// detect the wall at the current coordinates?  Or reject the transition?  These are not
// important reverse paths, so we just remove them from the graph for now.
const mtSabreNorthPrison    = location(0x2f, SBRN, 'Prison (hallway)')
                                .connect(mtSabreNorthUpper);
const mtSabreNorthLeftCell  = location(0x30, SBRN, 'Left Cell (shopkeepers)')
                                .from(mtSabreNorthPrison, destroyIce); // 64db:08
const mtSabreNorthLeftCell2 = location(0x31, SBRN, 'Left Cell 2 (back, with prison key)')
                                .from(mtSabreNorthLeftCell, destroyIce) // 64db:04
                                .chest(keyToPrison, 0x0d);
const mtSabreNorthRightCell = location(0x32, SBRN, 'Right Cell (villagers)')
                                .from(mtSabreNorthPrison, destroyIce); // 64db:10
const mtSabreNorthTunnel8   = location(0x33, SBRN, 'Tunnel 8 (behind right cell, toward summit)')
                                .from(mtSabreNorthRightCell, destroyIce); // 64db:02
const mtSabreNorthTunnel9   = location(0x34, SBRN, 'Tunnel 9 (connector to summit)')
                                .connect(mtSabreNorthTunnel8)
                                .connectTo(mtSabreNorthSummit);
const mtSabreNorthTunnel10a = location(0x35, SBRN, 'Tunnel 10a (summit cave, front)')
                                .from(mtSabreNorthSummit, keyToPrison)
                                .to(mtSabreNorthSummit);
const mtSabreNorthTunnel10b = location(0x35, SBRN, 'Tunnel 10b (summit cave, behind ice)')
                                .connect(mtSabreNorthTunnel10a, destroyIce) // 64da:80
                                .trigger(learnedParalysis);
const mtSabreNorthTunnel1   = location(0x38, SBRN, 'Tunnel 1 (leads from main entrance)')
                                .connect(mtSabreNorthEntrance)
                                .connectTo(mtSabreNorthTunnel2a);
const mtSabreNorthTunnel7   = location(0x39, SBRN, 'Tunnel 7 (to upper)')
                                .connect(mtSabreNorthTunnel6c)
                                .connectTo(mtSabreNorthUpper);

const nadareInn             = location(0x3c, NADR, 'Inn');
const nadareToolShop        = location(0x3d, NADR, 'Tool Shop');
const nadareBackRoom        = location(0x3e, NADR, 'Back Room');

// Waterfall Valley

const waterfallValleySummit = location(0x40, WFVL, 'Summit')
                                .connect(mtSabreNorthTunnel10b);
const waterfallValleyNW     = location(0x40, WFVL, 'Northwest')
                                .from(waterfallValleySummit)
                                .to(waterfallValleySummit, flight);
const waterfallValleyNE     = location(0x40, WFVL, 'Northeast')
                                .connect(waterfallValleyNW, crossRivers);
const waterfallValleySW     = location(0x41, WFVL, 'Southwest')
                                .connect(waterfallValleyNW);
const waterfallValleySE     = location(0x41, WFVL, 'Southeast')
                                .connect(waterfallValleySW, crossRivers);
const limeTreeValley        = location(0x42, WFVL, 'Lime Tree Valley')
                                .connect(waterfallValleySW)
                                .connect(valleyOfWind, limeTreeConnectsToLeaf);
const limeTreeLake          = location(0x43, WFVL, 'Lime Tree Lake (Rage)')
                                .connect(limeTreeValley)
                                .trigger(talkedToRage, swordOfWater);

// Kirisa Plant Cave

const kirisaCave1a          = location(0x44, KIRI, 'Tunnel 1a (entrance)')
                                .connect(waterfallValleySE);
const kirisaCave1b          = location(0x44, KIRI, 'Tunnel 1b (behind wall)')
                                .connect(kirisaCave1a, destroyStone); // 64d8:02
const kirisaCave2a          = location(0x45, KIRI, 'Tunnel 2a (main path, before wall)')
                                .connect(kirisaCave1b);
const kirisaCave2b          = location(0x45, KIRI, 'Tunnel 2b (dead end, antidote)')
                                .connect(kirisaCave2a, destroyStone) // 64d8:01
                                .chest(antidote, 0x19, 0x5f);
const kirisaCave2c          = location(0x45, KIRI, 'Tunnel 2c (main path, after wall)')
                                .connect(kirisaCave2a, destroyStone); // 64d7:80
const kirisaCave3a          = location(0x46, KIRI, 'Tunnel 3a (last room, before wall)')
                                .connect(kirisaCave2c);
const kirisaCave3b          = location(0x46, KIRI, 'Tunnel 3b (last room, after wall)')
                                .connect(kirisaCave3a, destroyStone); // 64d0:40
const kirisaMeadow          = location(0x47, KIRI, 'Meadow')
                                .connect(kirisaCave3b)
                                .chest(kirisaPlant, 0x0e);

// Fog Lamp Cave

const fogLampCave1a         = location(0x48, FOGL, 'Tunnel 1a (entrance)')
                                .connect(waterfallValleyNE);
const fogLampCave1b         = location(0x48, FOGL, 'Tunnel 1b (past wall)')
                                .connect(fogLampCave1a, destroyStone); // 64d9:10
const fogLampCave1c         = location(0x48, FOGL, 'Tunnel 1c (dead end, lysisPlant)')
                                .connect(fogLampCave1b, destroyStone) // 64d9:20
                                .chest(lysisPlant, 0x18);
const fogLampCave2          = location(0x49, FOGL, 'Tunnel 2 (tiny connector)')
                                .connect(fogLampCave1b);
const fogLampCave3a         = location(0x4a, FOGL, 'Tunnel 3a (upper branch)')
                                .connect(fogLampCave2);
const fogLampCave3b         = location(0x4a, FOGL, 'Tunnel 3b (dead end, mimic)')
                                .connect(fogLampCave3a, destroyStone) // 64d9:01
                                .chest(mimic, 0x15);
const fogLampCave3c         = location(0x4a, FOGL, 'Tunnel 3c (short passage with mimic)')
                                .connect(fogLampCave3a, destroyStone) // 64d9:02
                                .chest(mimic, 0x16);
const fogLampCave3d         = location(0x4a, FOGL, 'Tunnel 3d (lower branch)')
                                .connect(fogLampCave3c, destroyStone); // 64d9:04
const fogLampCave4          = location(0x4b, FOGL, 'Tunnel 4 (dead end loop)') // pointless 64d9:08
                                .connect(fogLampCave3d);
const fogLampCave5a         = location(0x4c, FOGL, 'Tunnel 5a (right branch over bridge)')
                                .connect(fogLampCave3c);
const fogLampCave5b         = location(0x4c, FOGL, 'Tunnel 5b (past wall over bridge)')
                                .connect(fogLampCave5a, destroyStone); // 64d8:80
const fogLampCave6a         = location(0x4d, FOGL, 'Tunnel 6a (from left branch)')
                                .connect(fogLampCave5a);
const fogLampCave6b         = location(0x4d, FOGL, 'Tunnel 6b (reconvergence)')
                                .connect(fogLampCave6a, destroyStone) // 64d8:10
                                .connect(fogLampCave5b);
const fogLampCave6c         = location(0x4d, FOGL, 'Tunnel 6c (between walls)')
                                .connect(fogLampCave6b, destroyStone); // 64d8:20
const fogLampCave6d         = location(0x4d, FOGL, 'Tunnel 6d (under bridge)')
                                .connect(fogLampCave6c, destroyStone); // 64d8:40
const fogLampCave7a         = location(0x4e, FOGL, 'Tunnel 7a (over second bridge)')
                                .connect(fogLampCave6d);
const fogLampCave7b         = location(0x4e, FOGL, 'Tunnel 7b (past wall)')
                                .connect(fogLampCave7a, destroyStone); // 64d8:08
const fogLampCave8a         = location(0x4f, FOGL, 'Tunnel 8a (under second bridge)')
                                .connect(fogLampCave7b);
const fogLampCave8b         = location(0x4f, FOGL, 'Tunnel 8b (fog lamp)')
                                .connect(fogLampCave8a, destroyStone) // 64d8:04
                                .chest(fogLamp, 0x13);

// Portoa, Mesia

const portoa                = location(0x50, PORT, 'Town')
                                .connect(waterfallValleyNW);
const portoaFishermanIsland = location(0x51, PORT, 'Fishherman Island')
                                .connect(portoa);
const mesiaShrine           = location(0x52, WFVL, 'Mesia Shrine')
                                // TODO - consider adding an item here?
                                .trigger(mesiaRecording)
                                .connect(limeTreeLake, crossRivers, talkedToRage); // 64d9:40

// Waterfall Cave

const waterfallCave1a       = location(0x54, WFCV, 'Tunnel 1a (entrance)')
                                .connect(waterfallValleyNW);
const waterfallCave1b       = location(0x54, WFCV, 'Tunnel 1b (dead end, mimic)')
                                .connect(waterfallCave1a, destroyIce) // 64da:10 or :08
                                .chest(mimic, 0x13);
const waterfallCave1c       = location(0x54, WFCV, 'Tunnel 1c (past ice)')
                                .connect(waterfallCave1a, destroyIce); // 64da:04
const waterfallCave2        = location(0x55, WFCV, 'Tunnel 2 (stoned pair)')
                                .connect(waterfallCave1c);
const waterfallCave3        = location(0x56, WFCV, 'Tunnel 3 (wide medusa hallways)')
                                .from(waterfallCave2, fluteOfLimeOrGlitch)
                                .to(waterfallCave2, fluteOfLimeQueen);
// NOTE: no reverse path thru these ice walls - will soft lock!
const waterfallCave4a       = location(0x57, WFCV, 'Tunnel 4a (left entrance)')
                                .from(waterfallCave3, destroyIce)
                                .chest(fluteOfLimeChest, 0x19)
                                .trigger(curedAkahana, fluteOfLimeChest); // $64da:02
const waterfallCave4b       = location(0x57, WFCV, 'Tunnel 4b (right entrance)')
                                .from(waterfallCave3, destroyIce) // $64da:01
                                .connect(waterfallCave4a, flight);
const waterfallCave4c       = location(0x57, WFCV, 'Tunnel 4c (sword of water)')
                                .connect(waterfallCave3, destroyIce) // $64d9:80
                                .chest(swordOfWater, 0x18);

// Tower

const towerEntrance         = location(0x58, TOWR, 'Entrance');
const tower1                = location(0x59, TOWR, 'Level 1').from(towerEntrance);
const tower2                = location(0x5a, TOWR, 'Level 2').from(tower1);
const tower3                = location(0x5b, TOWR, 'Level 3').from(tower2);
const tower4                = location(0x5c, TOWR, 'Outside Mesia Room').from(tower3);
const tower5                = location(0x5d, TOWR, 'Outside Dyna Room').from(tower4, crystalis);
const towerMesia            = location(0x5e, TOWR, 'Mesia')
                                .connect(tower4)
                                .trigger(forgedCrystalis);
const towerDyna             = location(0x5f, TOWR, 'Dyna')
                                .from(tower5)
                                .boss(dyna)
                                .trigger(win);

// Angry Sea

const angrySeaCabinBeach    = location(0x60, ASEA, 'Cabin Beach')
                                .from(portoaFishermanIsland, returnedFogLamp);
const angrySeaSouth         = location(0x60, ASEA, 'South')
                                .connect(angrySeaCabinBeach, crossSea);
const angrySeaJoelBeach     = location(0x60, ASEA, 'Joel Beach')
                                .connect(angrySeaSouth, crossSea);
const angrySeaLighthouse    = location(0x60, JOEL, 'Outside Lighthouse');
const angrySeaAltar         = location(0x60, ASEA, 'Altar')
                                .connect(angrySeaSouth, crossSea)
                                .trigger(repairBrokenStatue, glowingLamp, brokenStatue)
                                .trigger(calmedSea, statueOfGold);
const angrySeaNorth         = location(0x60, ASEA, 'North')
                                .to(angrySeaSouth, crossSea)
                                .from(angrySeaSouth, crossSea, crossWhirlpool)
                                // NOTE: calmedSea is not normally a requirement.
                                .trigger(learnedBarrier, calmedSea);
const angrySeaSwanBeach     = location(0x60, ASEA, 'Swan Beach')
                                .connect(angrySeaNorth, crossSea);
const angrySeaCabin         = location(0x61, ASEA, 'Cabin')
                                .connect(angrySeaCabinBeach)
                                // TODO - only have kensu appear after heal and/or boat?
                                .trigger(talkedToKensuInCabin);
const lighthouse            = location(0x62, JOEL, 'Lighthouse')
                                .connect(angrySeaLighthouse)
                                .trigger(talkedToKensuInLighthouse, alarmFlute);
const undergroundChannel1   = location(0x64, PORT, 'Underground Channel 1 (from throne room)')
                                .trigger(visitedUndergroundChannel);
const undergroundChannel2   = location(0x64, PORT, 'Underground Channel 2 (to fortune teller)')
                                .connect(undergroundChannel1, crossRivers); // 64d7:40
const undergroundChannel3   = location(0x64, PORT, 'Underground Channel 3 (from fortune teller)')
                                .connect(undergroundChannel1, flight);
const undergroundChannel4   = location(0x64, PORT, 'Underground Channel 4 (asina)')
                                .connect(undergroundChannel3, crossRivers); // 64d7:20
const undergroundChannel5   = location(0x64, PORT, 'Underground Channel 5 (dolphin)')
                                .connect(undergroundChannel4, crossRivers) // 64d7:10
                                .trigger(healedDolphin, medicalHerb, ballOfWater);
const undergroundChannel6   = location(0x64, PORT, 'Underground Channel 6 (water)')
                                .connect(undergroundChannel5, crossSea)
                                .connectTo(angrySeaSouth, crossSea)
                                .chest(lovePendant, 0x11);

// Evil Spirit Island

const zombieTown            = location(0x65, EVIL, 'Zombie Town');
const evilSpiritIsland1     = location(0x68, EVIL, 'Tunnel 1 (entrance)')
                                .connect(angrySeaSouth, talkedToJoelElder, crossSea);
const evilSpiritIsland2a    = location(0x69, EVIL, 'Tunnel 2a (start)')
                                .connect(evilSpiritIsland1);
const evilSpiritIsland2b    = location(0x69, EVIL, 'Tunnel 2b (dead end to left)')
                                .connect(evilSpiritIsland2a, crossRivers); // 2b9
const evilSpiritIsland2c    = location(0x69, EVIL, 'Tunnel 2c (across first river)')
                                .connect(evilSpiritIsland2a, crossRivers); // 2b8
const evilSpiritIsland2d    = location(0x69, EVIL, 'Tunnel 2d (across second river)')
                                .connect(evilSpiritIsland2c, crossRivers); // 2b7
const evilSpiritIsland2e    = location(0x69, EVIL, 'Tunnel 2e (dead end, magic ring)')
                                .connect(evilSpiritIsland2d, destroyStone) // 2ba
                                .chest(magicRing, 0x1d);
const evilSpiritIsland2f    = location(0x69, EVIL, 'Tunnel 2f (stair down)')
                                .connect(evilSpiritIsland2d, destroyStone); // 2bb
const evilSpiritIsland3a    = location(0x6a, EVIL, 'Tunnel 3a (main area)')
                                // unnecessary wall 2b5
                                .connect(evilSpiritIsland2f)
                                .connectTo(zombieTown)
                                .chest(lysisPlant, 0x19, 0x5c);
const evilSpiritIsland3b    = location(0x6a, EVIL, 'Tunnel 3b (left area toward items)')
                                .connect(evilSpiritIsland3a, destroyStone); // 2b6
const evilSpiritIsland4a    = location(0x6b, EVIL, 'Tunnel 4a (right side, mimic)')
                                // TODO - model pits?
                                // If we want to model the full path including backtracks
                                // then we'll need to add triggers for backtracking through
                                // one-way passages.
                                .connect(evilSpiritIsland3b)
                                .chest(mimic, 0x0e);
const evilSpiritIsland4b    = location(0x6b, EVIL, 'Tunnel 4b (left side, iron necklace)')
                                .connect(evilSpiritIsland4a, crossRivers) // 285
                                .chest(ironNecklace, 0x0f); // 0f: 2c

// Sabera's Palace

const saberaPalaceFloor1    = location(0x6c, SABR, 'Floor 1')
                                .connect(zombieTown);
const saberaPalaceMiniboss  = location(0x6c, SABR, 'Miniboss')
                                .boss(vampire2)
                                .connect(saberaPalaceFloor1);
const saberaPalaceFloor2a   = location(0x6d, SABR, 'Floor 2a (left stair)')
                                .connect(saberaPalaceFloor1)
                                .chest(fruitOfPower, 0x13);
const saberaPalaceFloor2b   = location(0x6d, SABR, 'Floor 2b (right stair)')
                                .connect(saberaPalaceMiniboss)
                                .chest(medicalHerb, 0x1e, 0x55);
const saberaPalaceFloor3a   = location(0x6e, SABR, 'Floor 3a (toward boss)')
                                .connect(saberaPalaceFloor2b);
const saberaPalaceFloor3b   = location(0x6e, SABR, 'Floor 3b (boss room)')
                                .connect(saberaPalaceFloor3a);
const saberaPalaceBoss      = location(0x6e, SABR, 'Boss')
                                .boss(sabera1)
                                .connect(saberaPalaceFloor3b);
const saberaPalaceFloor3c   = location(0x6e, SABR, 'Floor 3c (back room trap)')
                                .from(saberaPalaceFloor3b)
                                .to(saberaPalaceFloor1);

// Misc

const joelSecretPassage     = location(0x70, JOEL, 'Secret Passage')
                                .connectTo(angrySeaLighthouse);
const joel                  = location(0x71, JOEL, 'Town')
                                .connect(angrySeaJoelBeach);
const swan                  = location(0x72, SWAN, 'Town')
                                .connect(angrySeaSwanBeach);
const swanGateRight         = location(0x73, SWAN, 'Inside Gate')
                                .connect(swan);
const swanGateLeft          = location(0x73, SWAN, 'Outside Gate')
                                // TODO - consider allowing gate to open both sides?
                                .from(swanGateRight, change);
const goaValley             = location(0x78, GOA,  'Valley')
                                .connect(swanGateLeft);

// Mt Hydra

const mtHydra1              = location(0x7c, HYDR, 'Entrance')
                                .connect(goaValley);
const mtHydra2              = location(0x7c, HYDR, 'Over first river toward Shyron')
                                .connect(mtHydra1, crossRivers); // 2b2
const mtHydra3              = location(0x7c, HYDR, 'After first tunnel');
const mtHydra4              = location(0x7c, HYDR, 'Door to Styx')
                                .connect(mtHydra3, crossRivers); // 2b1
const mtHydra5              = location(0x7c, HYDR, 'Dead end (no item)');
const mtHydra6              = location(0x7c, HYDR, 'Dead end (fruit of lime)')
                                .chest(fruitOfLime, 0x1a);
const mtHydra7              = location(0x7c, HYDR, 'Dead end (magic ring)')
                                .chest(magicRing, 0x19, 0x65);
const mtHydra8              = location(0x7c, HYDR, 'Outside tunnel to bow');
const mtHydra9              = location(0x7c, HYDR, 'Floating island (bow of sun)')
                                .connect(mtHydra8, flight)
                                .chest(bowOfSun, 0x18);
const mtHydraTunnel1        = location(0x7d, HYDR, 'Tunnel 1 (to Shyron)')
                                .connect(mtHydra1);
const mtHydraOutsideShyron  = location(0x7e, HYDR, 'Outside Shyron')
                                .connect(mtHydraTunnel1);
const mtHydraTunnel2        = location(0x7f, HYDR, 'Tunnel 2 (fork)')
                                .connect(mtHydra1)
                                .connectTo(mtHydra6) // right branch
                                .connectTo(mtHydra3); // left branch
const mtHydraTunnel3        = location(0x80, HYDR, 'Tunnel 3 (caves)')
                                .connect(mtHydra4); // all the way right
const mtHydraTunnel4        = location(0x81, HYDR, 'Tunnel 4 (left branch of cave)')
                                .connect(mtHydraTunnel3); // took left branch
const mtHydraTunnel5        = location(0x82, HYDR, 'Tunnel 5 (dead end, medical herb)')
                                .connect(mtHydraTunnel4) // took left branch again
                                .chest(medicalHerb, 0x0f, 0x56);
const mtHydraTunnel6a       = location(0x83, HYDR, 'Tunnel 6a (left-then-right)')
                                .connect(mtHydraTunnel4); // took right branch
const mtHydraTunnel6b       = location(0x83, HYDR, 'Tunnel 6b (past wall)')
                                .connect(mtHydraTunnel6a, destroyStone); // 2af
const mtHydraTunnel7        = location(0x84, HYDR, 'Tunnel 7 (wide hall)')
                                .connect(mtHydraTunnel6b);
const mtHydraTunnel8        = location(0x85, HYDR, 'Tunnel 8 (red slimes)')
                                .from(mtHydraTunnel7, destroyStone) // 2ae (bad)
                                .connectTo(mtHydra8);
const mtHydraTunnel9        = location(0x86, HYDR, 'Tunnel 9 (right branch, infinite loop)')
                                // non-blocking wall: 2ad
                                .connect(mtHydraTunnel3);
const mtHydraTunnel10a      = location(0x87, HYDR, 'Tunnel 10a (toward magic ring)')
                                .connect(mtHydraTunnel9);
const mtHydraTunnel10b      = location(0x87, HYDR, 'Tunnel 10b (past wall)')
                                .connect(mtHydraTunnel10a, destroyStone) // 2ac
                                .connectTo(mtHydra7);

// Styx

const styx1                 = location(0x88, STYX, 'Entrance')
                                .from(mtHydra4, keyToStyx, passShootingStatues); // TODO - two-way?
const styx2a                = location(0x89, STYX, 'Left branch')
                                .connect(styx1)
                                .chest(mimic, 0x13);
const styx2b                = location(0x89, STYX, 'Left branch, past one bridge')
                                .connect(styx2a, crossRivers); // 2aa
const styx2c                = location(0x89, STYX, 'Left branch, past two bridges')
                                .connect(styx2b, crossRivers) // 2a9
                                .chest(medicalHerb, 0x1d, 0x57);
const styx2d                = location(0x89, STYX, 'Right branch')
                                .connect(styx1);
const styx2e                = location(0x89, STYX, 'Right branch, across water')
                                .connect(styx2d, flight)
                                .chest(mimic, 0x14)
                                .chest(mimic, 0x15)
                                .chest(psychoShield, 0x1e);
const styx3                 = location(0x8a, STYX, 'Upper floor')
                                // pit to styx2a
                                .connect(styx2c)
                                .chest(swordOfThunder, 0x1b);

// Misc

const shyron                = location(0x8c, SHYR, 'Town')
                                .connect(mtHydraOutsideShyron, changeOrGlitch)
                                .trigger(enteredShyron);
const goa                   = location(0x8e, GOA,  'Town')
                                .connect(goaValley);
const fortressBasement1     = location(0x8f, OASC, 'Draygonia Fortress Basement 1 (front)');
const fortressBasement2     = location(0x8f, OASC, 'Draygonia Fortress Basement 2 (power ring)')
                                .connect(fortressBasement1, destroyIron) // 290
                                .chest(powerRing, 0x0f);
const desert1               = location(0x90, GOA,  'Desert 1')
                                .connect(goaValley);

// Oasis Cave

const oasisCave1            = location(0x91, OASC, 'Area 1 (from entrance)')
                                .chest(leatherBoots, 0x1a);
const oasisCave2            = location(0x91, OASC, 'Area 2 (across top bridge)')
                                .connect(oasisCave1, crossRivers); // 29b
const oasisCave3            = location(0x91, OASC, 'Area 3 (dead-end across top-right bridge)')
                                .connect(oasisCave2, crossRivers); // 293
const oasisCave4            = location(0x91, OASC, 'Area 4 (left across middle-right bridge)')
                                .connect(oasisCave2, crossRivers); // 292
const oasisCave5            = location(0x91, OASC, 'Area 5 (bottom edge)')
                                .connect(oasisCave4, crossRivers); // 291
const oasisCave6            = location(0x91, OASC, 'Area 6 (bottom island)')
                                .connect(oasisCave5, crossRivers); // 295
const oasisCave7            = location(0x91, OASC, 'Area 7 (bottom inner ring)')
                                .connect(oasisCave6, crossRivers); // 296
const oasisCave8            = location(0x91, OASC, 'Area 8 (left outer ring)')
                                .connect(oasisCave7, crossRivers) // 298
                                .connect(oasisCave1, crossRivers) // 29a
                                .chest(fruitOfPower, 0x1b, 0x64);
const oasisCave9            = location(0x91, OASC, 'Area 9 (top left inner ring)')
                                .connect(oasisCave8, crossRivers); // 299
const oasisCave10           = location(0x91, OASC, 'Area 10 (top right inner ring)')
                                .connect(oasisCave9, crossRivers); // 297
const oasisCave11           = location(0x91, OASC, 'Area 11 (center)')
                                .connect(oasisCave10, crossRivers) // 294
                                .connectTo(fortressBasement1);
const oasisCave12           = location(0x91, OASC, 'Area 12 (top center islands)')
                                .connect(oasisCave1, flight)
                                .chest(battleSuit, 0x1c);

// Desert

const desertCave1           = location(0x92, SHRA, 'Desert Cave 1')
                                .connect(desert1, flight);
const sahara                = location(0x93, SHRA, 'Town');
const saharaOutsideCave     = location(0x94, SHRA, 'Outside Cave')
                                .connect(sahara);
const desertCave2           = location(0x95, SHRA, 'Desert Cave 2')
                                .connect(saharaOutsideCave);
const saharaMeadow          = location(0x96, SHRA, 'Meadow')
                                .connect(desertCave1)
                                .connectTo(sahara)
                                .trigger(talkedToDeo, change, shyronMassacre);
const desert2               = location(0x98, SHRA, 'Desert 2')
                                .connect(desertCave2);

// Pyramid Front

const pyramidFrontEntrance  = location(0x9c, PYRF, 'Entrance')
                                .connect(desert2, flight);
const pyramidFrontAzteca    = location(0x9c, PYRF, 'Azteca')
                                .trigger(getBowOfTruth);
const pyramidFrontFork      = location(0x9d, PYRF, 'Fork')
                                .connect(pyramidFrontEntrance);
const pyramidFrontMain      = location(0x9e, PYRF, 'Main')
                                .connect(pyramidFrontFork);
const pyramidFrontChest     = location(0x9e, PYRF, 'Treasure Chest (magic ring)')
                                .connect(pyramidFrontMain)
                                .chest(magicRing, 0x1b, 0x6c);
const pyramidFrontDraygon   = location(0x9f, PYRF, 'Draygon')
                                .connect(pyramidFrontMain)
                                .to(pyramidFrontAzteca)
                                .boss(draygon1);

// Pyramid Back

const pyramidBackEntrance   = location(0xa0, PYRB, 'Entrance')
                                .connect(desert2, flight);
const pyramidBackStatues    = location(0xa0, PYRB, 'Statues')
                                .connect(pyramidBackEntrance)
                                .boss(statues);
const pyramidBackHall1      = location(0xa1, PYRB, 'Hall 1')
                                .connect(pyramidBackStatues);
const pyramidBackFork       = location(0xa2, PYRB, 'Branch')
                                .connect(pyramidBackHall1);
const pyramidBackLeft       = location(0xa3, PYRB, 'Left Dead End')
                                .connect(pyramidBackFork)
                                .chest(mimic, 0x0d);
const pyramidBackRight      = location(0xa4, PYRB, 'Right Dead End')
                                .connect(pyramidBackFork);
const pyramidBackHall2      = location(0xa5, PYRB, 'Hall 2')
                                .connect(pyramidBackFork)
                                .chest(opelStatue, 0x1a, 0x6d);
const pyramidBackDraygon2   = location(0xa6, PYRB, 'Draygon 2')
                                .connect(pyramidBackHall2)
                                .boss(draygon2);
const pyramidBackTeleporter = location(0xa7, PYRB, 'Teleporter')
                                .from(pyramidBackDraygon2)
                                .to(towerEntrance);

// Draygonia Fortress

const fortressEntrance      = location(0xa8, DRG1, 'Entrance')
                                .connect(goa, passShootingStatues)
                                // TODO - need to add talkedToZebuInShyron
                                .trigger(shyronMassacre, swordOfThunder);
const fortress1a            = location(0xa9, DRG1, 'Main')
                                .from(fortressEntrance, destroyIron); // 2a8
const fortress1Boss         = location(0xa9, DRG1, 'Boss')
                                .connect(fortress1a)
                                .boss(kelbesque2);
const fortressZebu          = location(0xaa, DRG1, 'Zebu').connect(fortress1Boss);
const fortress2a            = location(0xab, DRG2, 'Entrance').connect(fortressZebu);
const fortress2b            = location(0xab, DRG2, 'Dead End Behind Iron (fruit of power)')
                                .connect(fortress2a, destroyIron) // 13, 29f
                                .chest(fruitOfPower, 0x1c, 0x62);
const fortress2c            = location(0xab, DRG2, 'Dead End Loop Across Closer Bridges')
                                .connect(fortress2a, crossRivers) // 19, 2a6
                                .connect(fortress2a, crossRivers); // 1b, 2a0
const fortress2d            = location(0xab, DRG2, 'Across First Bridge (fruit of repun)')
                                .connect(fortress2a, crossRivers) // 1a, 2a5
                                .chest(fruitOfRepun, 0x1e, 0x66);
const fortress2e            = location(0xab, DRG2, 'Across Second Bridge')
                                .connect(fortress2d, crossRivers); // 18, 2a4
const fortress2f            = location(0xab, DRG2, 'Dead End Across Two Bridges ()')
                                .connect(fortress2e, crossRivers) // 15, 2a1
                                .connect(fortress2e, crossRivers) // 17, 2a3
                                .chest(lysisPlant, 0x1d, 0x5d);
const fortress2g            = location(0xab, DRG2, 'Across Third Bridge')
                                .connect(fortress2e, crossRivers); // 16, 2a2
const fortress2h            = location(0xab, DRG2, 'Exit Behind Iron Door')
                                .connect(fortress2g, destroyIron); // 14, 29e
const fortress2Boss         = location(0xac, DRG2, 'Boss').connect(fortress2h).boss(sabera2);
const fortressTornel        = location(0xac, DRG2, 'Tornel').connect(fortress2Boss);
const fortress3Lower        = location(0xad, DRG3, 'Lower')
                                .connect(fortressTornel)
                                .chest(opelStatue, 0x1a, 0x63)
                                .chest(magicRing, 0x1b, 0x6f);
const fortress3UpperLoop    = location(0xae, DRG3, 'Upper Loop')
                                .connect(fortress3Lower)
                                .chest(antidote, 0x16, 0x60);
const fortress3UpperDeadEnd = location(0xae, DRG3, 'Upper Loop Behind Wall (magic ring)')
                                .connect(fortress3UpperLoop, destroyIron) // 15, 29d
                                .chest(magicRing, 0x17, 0x6b);
const fortress3UpperPassage = location(0xaf, DRG3, 'Upper Passage (toward Mado)')
                                .connect(fortress3Lower)
                                .chest(magicRing, 0x1b, 0x54);
const fortress4a            = location(0xb0, DRG4, 'Initial Fork');
const fortress4b            = location(0xb1, DRG4, 'Left Branch').connect(fortress4a);
const fortress4c            = location(0xb2, DRG4, 'Main Area (right branch, over bridges)')
                                .connect(fortress4a);
const fortress4d            = location(0xb3, DRG4, 'U-shaped Passage (between floors)')
                                .connect(fortress4c);
const fortress4e            = location(0xb4, DRG4, 'Main Area Lower (under bridge)')
                                .connect(fortress4b)
                                .connect(fortress4c)
                                .connect(fortress4d);
const fortress4f            = location(0xb4, DRG4, 'Behind Iron Wall')
                                .connect(fortress4e, destroyIron); // 16, 29c
const fortress4g            = location(0xb5, DRG4, 'Lower')
                                .connect(fortress4f)
                                .chest(mimic, 0x0d)
                                .chest(mimic, 0x0e)
                                .chest(mimic, 0x0f)
                                .chest(magicRing, 0x17, 0x58)
                                .chest(warpBoots, 0x18, 0x6e);
const fortress4h            = location(0xb6, DRG4, 'Boss Corridor').connect(fortress4g);
const fortress4Boss         = location(0xb6, DRG4, 'Boss')
                                .connect(fortress4h, passShootingStatues)
                                .boss(karmine);
const fortress4End          = location(0xb6, DRG4, 'Behind Boss (stormBracelet)')
                                .connect(fortress4Boss)
                                .chest(stormBracelet, 0x12);
const fortressExit          = location(0xb7, DRG4, 'Exit Stairs');
const oasisCaveEntranceBack = location(0xb8, OASC, 'Entrance Back (behind river)')
                                .connect(fortressExit)
                                .chest(fruitOfPower, 0x0d, 0x5a);
const oasisCaveEntrance     = location(0xb8, OASC, 'Entrance Front')
                                .connect(oasisCaveEntranceBack, flight)
                                .connectTo(desert1)
                                .connectTo(oasisCave1);
const fortress3Boss         = location(0xb9, DRG3, 'Boss')
                                .connect(fortress3UpperPassage)
                                .boss(mado2);
const fortressAsina         = location(0xb9, DRG3, 'Asina')
                                .connect(fortress3Boss)
                                .connectTo(fortress4a);
const fortressKensu         = location(0xba, DRG4, 'Kensu')
                                .connect(fortress4f)
                                .connectTo(fortressExit)
                                .trigger(savedKensu, ivoryStatue);

// Inside Buildings

const goaHouse              = location(0xbb, GOA,  'House').connect(goa)
                                // TODO - consider removing ivory statue requirement?
                                .trigger(talkedToAkahanaFriend, change, ivoryStatue);
const goaInn                = location(0xbc, GOA,  'Inn').connect(goa, enteredShyron);
const goaToolShop           = location(0xbe, GOA,  'Tool Shop').connect(goa, enteredShyron);
const goaTavern             = location(0xbf, GOA,  'Tavern').connect(goa);
const leafElderHouse        = location(0xc0, LEAF, 'Elder House')
                                .connect(leaf)
                                .trigger(talkedToLeafElder);
const leafRabbitHut         = location(0xc1, LEAF, 'Rabbit Hut').connect(leaf)
                                .trigger(talkedToLeafRabbit, villagersAbducted, telepathy);
const leafInn               = location(0xc2, LEAF, 'Inn').connect(leaf);
const leafToolShop          = location(0xc3, LEAF, 'Tool Shop')
                                .connect(leaf)
                                .trigger(buyAlarmFlute);
const leafArmorShop         = location(0xc4, LEAF, 'Armor Shop').connect(leaf);
const leafStudentHouse      = location(0xc5, LEAF, 'Student House').connect(leaf)
                                .trigger(talkedToLeafStudent);
const brynmaerTavern        = location(0xc6, BRYN, 'Tavern').connect(brynmaer);
const brynmaerPawnShop      = location(0xc7, BRYN, 'Pawn Shop').connect(brynmaer);
const brynmaerInn           = location(0xc8, BRYN, 'Inn').connect(brynmaer);
const brynmaerArmorShop     = location(0xc9, BRYN, 'Armor Shop').connect(brynmaer);
const brynmaerToolShop      = location(0xcb, BRYN, 'Tool Shop').connect(brynmaer);
const oakElderHouse         = location(0xcd, OAK,  'Elder House')
                                .from(oak, telepathy)
                                .trigger(talkedToOakElder, rescuedOakChild);
const oakMotherHouse        = location(0xce, OAK,  'Mother\'s House')
                                .from(oak, telepathy)
                                .trigger(talkedToOakMother, telepathy)
                                .trigger(talkedToOakMothher2, rescuedOakChild);
const oakToolShop           = location(0xcf, OAK,  'Tool Shop')
                                .from(oak, telepathy);
const oakInn                = location(0xd0, OAK,  'Inn')
                                .from(oak, telepathy);
const amazonesInn           = location(0xd1, AMZN, 'Inn').connect(amazones);
const amazonesToolShop      = location(0xd2, AMZN, 'Tool Shop').connect(amazones);
const amazonesArmorShop     = location(0xd3, AMZN, 'Armor Shop').connect(amazones);
const aryllisHouse          = location(0xd4, AMZN, 'Queen\'s House')
                                .from(amazones, changeOrGlitch)
                                .trigger(talkedToAmazonesQueen, change, kirisaPlant);
const nadare                = location(0xd5, NADR, 'Nadare\'s')
                                .connect(mtSabreNorthEntrance)
                                .connectTo(nadareInn)
                                .connectTo(nadareToolShop)
                                .connectTo(nadareBackRoom);
const portoaFishermanHouse  = location(0xd6, PORT, 'Fisherman\'s House')
                                .connect(portoaFishermanIsland)
                                .trigger(returnedFogLamp, fogLamp, shellFlute);
const portoaPalaceEntrance  = location(0xd7, PORT, 'Palace Entrance').connect(portoa);
const portoaFortuneTeller1  = location(0xd8, PORT, 'Fortune Teller Front')
                                .connect(portoa)
                                .trigger(talkedToFortuneTeller, talkedToPortoaQueen);
const portoaFortuneTeller2  = location(0xd8, PORT, 'Fortune Teller Back')
                                .connect(undergroundChannel2)
                                .connect(undergroundChannel3);
const portoaPawnShop        = location(0xd9, PORT, 'Pawn Shop').connect(portoa);
const portoaArmorShop       = location(0xda, PORT, 'Armor Shop').connect(portoa);
const portoaInn             = location(0xdc, PORT, 'Inn').connect(portoa);
const portoaToolShop        = location(0xdd, PORT, 'Tool Shop').connect(portoa);
const portoaPalaceLeft      = location(0xde, PORT, 'Palace Left').connect(portoaPalaceEntrance);
const portoaThroneRoom      = location(0xdf, PORT, 'Palace Throne Room')
                                .connect(portoaPalaceEntrance)
                                .to(undergroundChannel1, paralysisOrAsina)
                                .from(undergroundChannel1)
                                .trigger(talkedToPortoaQueen)
                                .trigger(sentToWaterfallCave,
                                         talkedToFortuneTeller, visitedUndergroundChannel);
const portoaPalaceRight     = location(0xe0, PORT, 'Palace Right').connect(portoaPalaceEntrance);
const portoaAsinaRoom       = location(0xe1, PORT, 'Asina\'s Room')
                                .connect(undergroundChannel4)
                                .trigger(talkedToAsina, asinaTrigger); // TODO - trigger?
const aryllisDownstairs     = location(0xe2, AMZN, 'Queen Downstairs')
                                .connect(aryllisHouse)
                                .chest(blizzardBracelet, 0x0d);
const joelElderHouse        = location(0xe3, JOEL, 'Elder\'s House')
                                .connect(joel)
                                .trigger(talkedToJoelElder);
const joelShed              = location(0xe4, JOEL, 'Shed')
                                .connect(joel)
                                .to(joelSecretPassage, eyeGlasses);
const joelToolShop          = location(0xe5, JOEL, 'Tool Shop')
                                .connect(joel)
                                .trigger(buyAlarmFlute);
const joelInn               = location(0xe7, JOEL, 'Inn').connect(joel);
const zombieTownHouse       = location(0xe8, EVIL, 'Zombie Town House').connect(zombieTown);
const zombieTownBasement    = location(0xe9, EVIL, 'Zombie Town Basement')
                                .connect(zombieTownHouse)
                                // TODO - correct trigger when shuffling bosses?
                                .trigger(talkedToClark, sabera1);
const swanToolShop          = location(0xeb, SWAN, 'Tool Shop').connect(swan);
const swanStomHut           = location(0xec, SWAN, 'Stom\'s Hut')
                                .connect(swan)
                                .trigger(talkedToStomInSwan);
const swanInn               = location(0xed, SWAN, 'Inn').connect(swan);
const swanArmorShop         = location(0xee, SWAN, 'Armor Shop').connect(swan);
const swanTavern            = location(0xef, SWAN, 'Tavern')
                                .connect(swan)
                                .trigger(talkedToKensuInTavern, talkedToStomInSwan, paralysis);
const swanPawnShop          = location(0xf0, SWAN, 'Pawn Shop').connect(swan);
const swanDanceHall         = location(0xf1, SWAN, 'Dance Hall')
                                .connect(swan)
                                .trigger(talkedToKensuAtDance, talkedToKensuInTavern, paralysis)
                                .trigger(returnedLovePendant, talkedToKensuAtDance, lovePendant);
const shyronTemple1         = location(0xf2, SHYR, 'Temple (pre-massacre)')
                                .connect(shyron)
                                .from(start, swordOfThunder, teleportToShyron)
                                .trigger(talkedToZebuInShyron);
const shyronTemple2         = location(0xf2, SHYR, 'Temple (post-massacre)')
                                .connect(shyron, shyronMassacre)
                                .boss(mado1);
const shyronTrainingHall    = location(0xf3, SHYR, 'Training Hall').connect(shyron);
const shyronHospital        = location(0xf4, SHYR, 'Hospital').connect(shyron);
const shyronArmorShop       = location(0xf5, SHYR, 'Armor Shop').connect(shyron);
const shyronToolShop        = location(0xf6, SHYR, 'Tool Shop').connect(shyron);
const shyronInn             = location(0xf7, SHYR, 'Inn').connect(shyron);
const saharaInn             = location(0xf8, SHRA, 'Inn').connect(sahara);
const saharaToolShop        = location(0xf9, SHRA, 'Tool Shop').connect(sahara);
const saharaElderHouse      = location(0xfa, SHRA, 'Elder\'s House').connect(sahara);
const saharaPawnShop        = location(0xfb, SHRA, 'Pawn Shop').connect(sahara);

const wildWarpLocations = [
  leaf,
  valleyOfWind,
  sealedCave1,
  cordelPlainWest,
  swamp,
  mtSabreWestEntrance,
  waterfallValleySummit,
  limeTreeValley,
  angrySeaCabinBeach,
  // undergroundChannel6, // not useful
  swan,
  goaValley,
  mtHydra1,
  desert1,
  fortressEntrance,
  desert2,
];

if (assumeWildWarp.value) {
  for (const l of wildWarpLocations) {
    l.from(start);
  }
}

return graph;
};

export const shuffle = async (rom, random, log = []) => {
  const graph = generate();
  const allSlots = graph.slots();
  const buckets = {}
  for (const slot of graph.slots()) {
    if (!slot.slots) continue; // fixed, no shuffle
    const type = slot.type || 'item';
    (buckets[type] = buckets[type] || []).push(slot);
  }
  // For bonus and non-key items, just do a total shuffle.
  for (const bucket of ['item', 'bonus']) {
    const slots = buckets[bucket];
    const items = slots.map(slot => [slot.item, slot.index]);
    random.shuffle(items);
    for (let i = 0; i < slots.length; i++) {
      slots[i].set(...items[i]);
    }
  }

  // Initial attempt - start with vanilla and do 1-10 swaps at a time,
  // see if it still works.  Randomly swap wind/fire for initial diff (50/50).
  // Later would be nice to start fully shuffled and anneal, or do something
  // more targeted.
  const swordOfWind = graph.findSlot('Sword of Wind');
  const swordOfFire = graph.findSlot('Sword of Fire');
  const ballOfWind = graph.findSlot('Ball of Wind');
  const ballOfFire = graph.findSlot('Ball of Fire');
  const statueOfOnyx = graph.findSlot('Statue of Onyx');
  const gasMask = graph.findSlot('Gas Mask');
  const refresh = graph.findSlot('Refresh').item;
  const recover = graph.findSlot('Recover').item;
  if (random.nextInt(2)) {
    swordOfFire.swap(swordOfWind);
    ballOfFire.swap(ballOfWind);
  }
  if (!random.nextInt(3)) {
    // help out the shuffle to change up the early game a bit more.
    statueOfOnyx.swap(gasMask);
  }
  const counts = [1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 5, 5, 8, 13];
  const keys = [...buckets['key'], ...buckets['bonus']]; //, ...buckets['item']];
  const magics = buckets['magic'];
  const magicIndices = [0, 1, 2, 3, 4, 5, 6, 7];
  const both = [keys, magics];
  //const both = [keys, magicIndices];
  const which = [...keys.map(() => 0), ...magicIndices.map(() => 1)];
  let route = null;
  for (let i = 0; i < 1000; i++) {
    if (i % 100 == 0) await new Promise(requestAnimationFrame);
    random.shuffle(keys);
    random.shuffle(magics);
    //random.shuffle(magicIndices);
    random.shuffle(which);
    let count = counts[random.nextInt(counts.length)];
    const pos = [0, 0];

    let swap = (w, k) => both[w][pos[w] - 1 + k].swap(both[w][pos[w] + k]);
    // if (i == 250) {
    //   swap = (w, k) => {
    //     let a = both[w][pos[w] - 1 + k];
    //     let b = both[w][pos[w] + k];
    //     if (b.item == refresh || b.item == recover) [a, b] = [b, a];
    //     if (a.item == refresh || a.item == recover) {
    //       if (a.origIndex < b.origIndex) return;
    //       a.swap(b);
    //     }
    //   }
    // }

    // POSSIBLE FIXES - generate a true random distribution of magic
    // and then don't swap them any more after that - needs a full
    // MC approach, which we haven't proven yet.

    // const swap = (w, k) => {
    //   let a = both[w][pos[w] - 1 + k];
    //   let b = both[w][pos[w] + k];
    //   if (w) {
    //     if (Math.abs(a - b) < 4) {
    //       magics[a].swap(magics[b]);
    //       [magics[a], magics[b]] = [magics[b], magics[a]];
    //     }
    //   } else {
    //     a.swap(b);
    //   }
    // }    

    for (let j = 0; j < count; j++) {
      const w = which[j];
      pos[w] += 2;
      if (pos[w] > both[w].length) continue;
      swap(w, -1);
    }
    // test
    const {win, path} = graph.traverse();
    if (win) {
      //console.log(`successful shuffle of ${count} items`);
      route = path;
      continue;
    } else {
      //console.log(`shuffled ${count} items: fail`);
    }
    // unswap
    for (let i = count - 1; i >= 0; i--) {
      const w = which[i];
      pos[w] -= 2;
      if (pos[w] + 1 >= both[w].length) continue;
      swap(w, +1);
    }
  }

  // Commit everything
  const logdata = [];
  for (const slot of graph.slots()) {
    logdata.push(`Slot $${slot.origIndex.toString(16).padStart(2,0)} (${slot.orig}): ${slot.item.name}`);
    slot.write(rom);
  }
  logdata.sort();
  logdata.push('', 'Route:', ...route);

// logdata.splice(0,logdata.length);
// const m=graph.slots().filter(s=>s.item instanceof Magic);
// const xs=[0,3,1,2,4,5,6,7];
// logdata.push(...m.sort((x,y)=>xs[x.origIndex-65]-xs[y.origIndex-65]).map(x=>x.name2));

  log.push(...logdata, '', 'Route:', ...route);
};