import { defineStore } from 'pinia'
import { useSkillStore as skillStore } from '@/stores/skills'
import { useCombatStore as combatStore } from '@/stores/combat'
import { useSmithingStore as smithingStore } from '@/stores/smithing'
import { useArtificeStore as artificeStore } from '@/stores/artifice'

export const useItemStore = defineStore('itemStore', {
  state: () => ({

    preStance: 5,
    aggStance: 0,
    defStance: 0,

    equippedStats: {
      meleeDamage: 1,
      rangedDamage: 1,
      magicDamage: 1,

      meleeAccuracy: 8,
      rangedAccuracy: 8,
      magicAccuracy: 8,

      meleePen: 0,
      rangedPen: 0,
      magicPen: 0,

      meleeSpeed: 2.0,
      rangedSpeed: 2.0,
      magicSpeed: 2.0,

      physicalArmor: 0,
      energyArmor: 0,
      resist: 0,

      meleeDodge: 3,
      rangedDodge: 3,
      magicDodge: 3,

      //device
      deviceArmorTotal: 0,
      deviceWeapons: [0, 0, 0],
      oilPreserve: 0,
      ammoPreserve: 0,
      chargePreserve: 0,

      //special
      poisonChance: [0, 0, 0],
      extraDropChance: 0,
      slayerMitigation: 0,

      //skills
      allEfficency: 0,
    },
    equippedCombat: {
      hatSlot: {},
      chestSlot: {},
      bodySlot: {},
      wingSlot: {},
      legSlot: {},
      ammySlot: {},
      ringSlot: {},
      trinketSlot: {},
      meleeSlot: {},
      oilSlot: {},
      rangedSlot: {},
      ammoSlot: {},
      magicSlot: {},
      chargeSlot: {},
      foodSlot: {},
    },
    equippedCivies: {
      hatSlot: {},
      chestSlot: {},
      bodySlot: {},
      wingSlot: {},
      legSlot: {},
      ammySlot: {},
      ringSlot: {},
      trinketSlot: {},
    },
    equippedTools: {
      explorationTool: {
        id: 'defaultMap',
        name: 'Old Map',
        image: 'assets/icons/defaultmap.png',
        toolStats: {
          explorationMulti: 0.0,
        },
      },
      scryingTool: {
        id: 'defaultStylus',
        name: 'Chalk',
        image: 'assets/icons/defaultstylus16.png',
        toolStats: {
          bonusSyphoningTime: 0,
          baseStabilityBonus: 0.0,
        },
      },
      foragingTool: {
        id: 'defaultAxe',
        name: 'Rock Axe',
        image: 'assets/icons/defaultaxe16.png',
        toolStats: {
          locatingMultiplierAdd: 0.0,
          harvestingTimeBonus: 0.0,
        },
      },
      huntingTool: {
        id: 'defaultClaws',
        name: 'Natural Claws',
        image: 'assets/icons/defaultclaws16.png',
        toolStats: {
          bleeding: 1,
          instaKill: 0.0,
        },
      },
      miningTool: {
        id: 'defaultPickaxe',
        name: 'Rock Pick',
        image: 'assets/icons/defaultpick16.png',
        toolStats: {
          bonusDamage: 3,
          bonusPen: 0,
          bonusMiningSpeed: 0,
        },
      },
      smithingTool: {
        id: 'defaultHammer',
        name: 'Hammer',
        image: 'assets/icons/defaulthammer16.png',
        toolStats: {
          workPerAction: 1,
          workSpeed: 2.0,
        },
      },
      cookingTool: {
        id: 'defaultCook',
        name: 'Fire Pit',
        image: 'assets/icons/defaultcook16.png',
        toolStats: {
          cookSpeed: 0,
          extraItems: 0,
        },
      },
    },
    defaultTools: {
      explorationTool: {
        id: 'defaultMap',
        name: 'Old Map',
        image: 'assets/icons/defaultmap.png',
        toolStats: {
          explorationMulti: 0.0,
        },
      },
      scryingTool: {
        id: 'defaultStylus',
        name: 'Chalk',
        image: 'assets/icons/defaultstylus16.png',
        toolStats: {
          bonusSyphoningTime: 0,
          baseStabilityBonus: 0.0,
        },
      },
      foragingTool: {
        id: 'defaultAxe',
        name: 'Rock Axe',
        image: 'assets/icons/defaultaxe16.png',
        toolStats: {
          locatingMultiplierAdd: 0.0,
          harvestingTimeBonus: 0.0,
        },
      },
      huntingTool: {
        id: 'defaultClaws',
        name: 'Natural Claws',
        image: 'assets/icons/defaultclaws16.png',
        toolStats: {
          bleeding: 1,
          instaKill: 0.0,
        },
      },
      miningTool: {
        id: 'defaultPickaxe',
        name: 'Rock Pick',
        image: 'assets/icons/defaultpick16.png',
        toolStats: {
          bonusDamage: 3,
          bonusPen: 0,
          bonusMiningSpeed: 0,
        },
      },
      smithingTool: {
        id: 'defaultHammer',
        name: 'Hammer',
        image: 'assets/icons/defaulthammer16.png',
        toolStats: {
          workPerAction: 1,
          workSpeed: 2.0,
        },
      },
      cookingTool: {
        id: 'defaultCook',
        name: 'Fire Pit',
        image: 'assets/icons/defaultcook16.png',
        toolStats: {
          cookSpeed: 0,
          extraItems: 0,
        },
      },
    },
    equipmentItems: [
      //devices
      {
        id: 'device1',
        name: 'Polypass',
        extra: 'Mechanics Device',
        flavor: 'Outputs multi-dimensional space-filling directions.',
        image: 'assets/icons/device1.png',
        dcat: 'device',
        dlvl: 1,
        toolSlot: 'explorationTool',
        isTool: true,
        onEquip: false,
        toolStats: {
          explorationMulti: 0.0,
          efficency: 0,
        },
        sellPrice: 30,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'device2',
        name: 'Loop Reloader',
        extra: 'Mechanics Device\n+60% ammo saving',
        flavor: "If it's nice, shoot it twice.",
        image: 'assets/icons/device2.png',
        dcat: 'device',
        dlvl: 1,
        slot: 'legSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          dodge: 0,
          resist: 0,
          ammoPreserve: 0.6,
        },
        sellPrice: 45,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'device3',
        name: 'Clockwork Pendant',
        extra: 'Mechanics Device\n+25% extra drop chance\n+10% all skill efficency',
        flavor: 'Recount the best seconds again and again.',
        image: 'assets/icons/device3.png',
        dcat: 'device',
        dlvl: 1,
        slot: 'ammySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          dodge: 0,
          resist: 0,
          extraDropChance: 25,
          allEfficency: 10,
        },
        sellPrice: 60,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'device4',
        name: 'Auto-Hammer',
        extra: 'Mechanics Device',
        flavor: 'Perfect hits without the guesswork.',
        image: 'assets/icons/device4.png',
        dcat: 'device',
        dlvl: 1,
        toolSlot: 'smithingTool',
        isTool: true,
        onEquip: false,
        toolStats: {
          workPerAction : 1,
          workSpeed: 1.2,
          efficency: 0,
        },
        sellPrice: 90,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'device5',
        name: 'Laminar Pump',
        extra: 'Mechanics Device\n+60% oil saving',
        flavor: 'Unmix oil and carnage.',
        image: 'assets/icons/device5.png',
        dcat: 'device',
        dlvl: 1,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          dodge: 0,
          resist: 0,
          oilPreserve: 0.6,
        },
        sellPrice: 120,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'device6',
        name: 'Thread Trimmer',
        extra: 'Mechanics Device',
        flavor: 'Free armor embroidering.',
        image: 'assets/icons/testIcon16.png',
        dcat: 'device',
        dlvl: 1,
        // toolSlot: 'tailoringTool',
        // isTool: true,
        // onEquip: false,
        // toolStats: {
        //   efficency: 0,
        // },
        sellPrice: 150,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'device7',
        name: 'Deja-View',
        extra: 'Mechanics Device',
        // flavor: 'b.',
        image: 'assets/icons/testIcon16.png',
        dcat: 'device',
        dlvl: 1,
        // toolSlot: 'explorationTool',
        // isTool: true,
        // onEquip: false,
        // toolStats: {
        //   explorationMulti: 0.1,
        // },
        sellPrice: 180,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'device8',
        name: 'Deliverator',
        extra: 'Mechanics Device',
        // flavor: 'b.',
        image: 'assets/icons/testIcon16.png',
        dcat: 'device',
        dlvl: 1,
        // toolSlot: 'explorationTool',
        // isTool: true,
        // onEquip: false,
        // toolStats: {
        //   explorationMulti: 0.1,
        // },
        sellPrice: 210,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'device9',
        name: 'Convector',
        extra: 'Mechanics Device',
        // flavor: 'b.',
        image: 'assets/icons/testIcon16.png',
        dcat: 'device',
        dlvl: 1,
        // toolSlot: 'explorationTool',
        // isTool: true,
        // onEquip: false,
        // toolStats: {
        //   explorationMulti: 0.1,
        // },
        sellPrice: 240,
        count: 0,
        totalCount: 0,
      },

      //tools
      {
        id: 'koboldMap',
        name: 'Kobold Map',
        extra: 'Provides exploration XP per combat kill',
        flavor: 'Depicts the approximate location of many things.',
        image: 'assets/icons/koboldmap.png',
        dcat: 'tool',
        dlvl: 2,
        toolSlot: 'explorationTool',
        isTool: true,
        onEquip: false,
        toolStats: {
          explorationMulti: 0.1,
        },
        sellPrice: 35,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'towerStylus',
        name: 'Heavy Stylus',
        flavor: 'Channel the crush of responsibilities.',
        image: 'assets/icons/heavystylus.png',
        dcat: 'tool',
        dlvl: 3,
        toolSlot: 'scryingTool',
        isTool: true,
        onEquip: false,
        toolStats: {
          bonusSyphoningTime: -0.4,
          baseStabilityBonus: 0.30,
        },
        sellPrice: 30,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bronzeCook',
        name: 'Bronze Oven',
        image: 'assets/icons/bronzecook.png',
        dcat: 'tool',
        dlvl: 1,
        toolSlot: 'cookingTool',
        isTool: true,
        onEquip: false,
        toolStats: {
          cookSpeed: 0.1,
          extraItems: 1,
        },
        sellPrice: 20,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ironCook',
        name: 'Iron Oven',
        image: 'assets/icons/ironcook.png',
        dcat: 'tool',
        dlvl: 2,
        toolSlot: 'cookingTool',
        isTool: true,
        onEquip: false,
        toolStats: {
          cookSpeed: 0.2,
          extraItems: 1,
        },
        sellPrice: 28,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'steelCook',
        name: 'Steel Oven',
        image: 'assets/icons/steelcook.png',
        dcat: 'tool',
        dlvl: 3,
        toolSlot: 'cookingTool',
        isTool: true,
        onEquip: false,
        toolStats: {
          cookSpeed: 0.25,
          extraItems: 1,
        },
        sellPrice: 45,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'mythrilCook',
        name: 'Mythril Oven',
        image: 'assets/icons/mythrilcook.png',
        dcat: 'tool',
        dlvl: 4,
        toolSlot: 'cookingTool',
        isTool: true,
        onEquip: false,
        toolStats: {
          cookSpeed: 0.3,
          extraItems: 2,
        },
        sellPrice: 80,
        count: 0,
        totalCount: 0,
      },

      //toolweapons
      {
        id: 'copperHatchet',
        name: 'Copper Hatchet',
        image: 'assets/icons/copperaxe16.png',
        mSmithing: 'hatchet',
        dcat: 'toolWeapon',
        dlvl: 1,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.45,
          meleeSpeed: 2.8,
        },
        toolSlot: 'foragingTool',
        isTool: true,
        toolStats: {
          locatingMultiplierAdd: 0.1,
          harvestingTimeBonus: 0.25,
        },
        sellPrice: 15,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bronzeHatchet',
        name: 'Bronze Hatchet',
        image: 'assets/icons/bronzeaxe16.png',
        mSmithing: 'hatchet',
        dcat: 'toolWeapon',
        dlvl: 2,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.50,
          meleeSpeed: 2.8,
        },
        toolSlot: 'foragingTool',
        isTool: true,
        toolStats: {
          locatingMultiplierAdd: 0.2,
          harvestingTimeBonus: 0.50,
        },
        sellPrice: 38,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ironHatchet',
        name: 'Iron Hatchet',
        image: 'assets/icons/ironaxe16.png',
        mSmithing: 'hatchet',
        dcat: 'toolWeapon',
        dlvl: 7,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.55,
          meleeSpeed: 2.8,
        },
        toolSlot: 'foragingTool',
        isTool: true,
        toolStats: {
          locatingMultiplierAdd: 0.3,
          harvestingTimeBonus: 0.50,
        },
        sellPrice: 60,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'steelHatchet',
        name: 'Steel Hatchet',
        image: 'assets/icons/steelaxe16.png',
        mSmithing: 'hatchet',
        dcat: 'toolWeapon',
        dlvl: 7,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.60,
          meleeSpeed: 2.8,
        },
        toolSlot: 'foragingTool',
        isTool: true,
        toolStats: {
          locatingMultiplierAdd: 0.4,
          harvestingTimeBonus: 0.75,
        },
        sellPrice: 72,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'farmerHatchet',
        name: 'Phoenix Axe',
        flavor: 'Unweildy, unclouth, unbreakable.',
        image: 'assets/icons/testIcon16.png',
        dcat: 'toolWeapon',
        dlvl: 4,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 10,
          meleeDamage: 0.60,
          meleeSpeed: 2.6,
          meleePen: 0.05,
        },
        toolSlot: 'foragingTool',
        isTool: true,
        toolStats: {
          locatingMultiplierAdd: 0.2,
          harvestingTimeBonus: 1.75,
        },
        sellPrice: 90,
        count: 0,
        totalCount: 0,
      },

      {
        id: 'copperClaws',
        name: 'Copper Claws',
        image: 'assets/icons/copperclaws16.png',
        mSmithing: 'claws',
        dcat: 'toolWeapon',
        dlvl: 1,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.25,
          meleeSpeed: 2.0,
        },
        toolSlot: 'huntingTool',
        isTool: true,
        toolStats: {
          bleeding: 2,
          instaKill: 0.05,
        },
        sellPrice: 13,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bronzeClaws',
        name: 'Bronze Claws',
        image: 'assets/icons/bronzeclaws16.png',
        mSmithing: 'claws',
        dcat: 'toolWeapon',
        dlvl: 2,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.30,
          meleeSpeed: 2.0,
        },
        toolSlot: 'huntingTool',
        isTool: true,
        toolStats: {
          bleeding: 2,
          instaKill: 0.10,
        },
        sellPrice: 30,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ironClaws',
        name: 'Iron Claws',
        image: 'assets/icons/ironclaws16.png',
        mSmithing: 'claws',
        dcat: 'toolWeapon',
        dlvl: 4,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.35,
          meleeSpeed: 2.0,
        },
        toolSlot: 'huntingTool',
        isTool: true,
        toolStats: {
          bleeding: 2,
          instaKill: 0.15,
        },
        sellPrice: 48,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'steelClaws',
        name: 'Steel Claws',
        image: 'assets/icons/steelclaws16.png',
        mSmithing: 'claws',
        dcat: 'toolWeapon',
        dlvl: 7,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.40,
          meleeSpeed: 2.0,
        },
        toolSlot: 'huntingTool',
        isTool: true,
        toolStats: {
          bleeding: 3,
          instaKill: 0.20,
        },
        sellPrice: 55,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'crystalAntler',
        name: 'Crystal Claws',
        flavor: 'A gnarled gnash of spikes.',
        image: 'assets/icons/crystalclaws.png',
        dcat: 'toolWeapon',
        dlvl: 3,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 10,
          meleeDamage: 0.30,
          meleePen: 0.05,
          meleeSpeed: 2.0,
        },
        toolSlot: 'huntingTool',
        isTool: true,
        toolStats: {
          bleeding: 2,
          instaKill: 0.50,
        },
        sellPrice: 55,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'copperPickaxe',
        name: 'Copper Pickaxe',
        image: 'assets/icons/copperpick16.png',
        mSmithing: 'pickaxe',
        dcat: 'toolWeapon',
        dlvl: 1,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.40,
          meleePen: 0.35,
          meleeSpeed: 2.8,
        },
        toolSlot: 'miningTool',
        isTool: true,
        toolStats: {
          bonusDamage: 4,
          bonusPen: 1,
          bonusMiningSpeed: 0,
        },
        sellPrice: 14,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bronzePickaxe',
        name: 'Bronze Pickaxe',
        image: 'assets/icons/bronzepick16.png',
        mSmithing: 'pickaxe',
        dcat: 'toolWeapon',
        dlvl: 2,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.45,
          meleePen: 0.35,
          meleeSpeed: 2.8,
        },
        toolSlot: 'miningTool',
        isTool: true,
        toolStats: {
          bonusDamage: 4,
          bonusPen: 2,
          bonusMiningSpeed: 0,
        },
        sellPrice: 36,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ironPickaxe',
        name: 'Iron Pickaxe',
        image: 'assets/icons/ironpick16.png',
        mSmithing: 'pickaxe',
        dcat: 'toolWeapon',
        dlvl: 4,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.50,
          meleePen: 0.35,
          meleeSpeed: 2.8,
        },
        toolSlot: 'miningTool',
        isTool: true,
        toolStats: {
          bonusDamage: 4,
          bonusPen: 3,
          bonusMiningSpeed: 0,
        },
        sellPrice: 56,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'steelPickaxe',
        name: 'Steel Pickaxe',
        image: 'assets/icons/steelpick16.png',
        mSmithing: 'pickaxe',
        dcat: 'toolWeapon',
        dlvl: 7,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.55,
          meleePen: 0.35,
          meleeSpeed: 2.8,
        },
        toolSlot: 'miningTool',
        isTool: true,
        toolStats: {
          bonusDamage: 5,
          bonusPen: 4,
          bonusMiningSpeed: 0,
        },
        sellPrice: 65,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'koboldPick',
        name: 'Boulder Breaker',
        flavor: "One swing through the other side.",
        image: 'assets/icons/koboldpick.png',
        mSmithing: 'pickaxe',
        dcat: 'toolWeapon',
        dlvl: 4,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 10,
          meleeDamage: 0.50,
          meleePen: 0.40,
          meleeSpeed: 2.6,
        },
        toolSlot: 'miningTool',
        isTool: true,
        toolStats: {
          bonusDamage: 4,
          bonusPen: 20,
          bonusMiningSpeed: 0.2,
        },
        sellPrice: 45,
        count: 0,
        totalCount: 0,
      },

      //daggers
      {
        id: 'copperDagger',
        name: 'Copper Dagger',
        image: 'assets/icons/copperdagger16.png',
        mSmithing: 'dagger',
        dcat: 'meleeWeapon',
        dlvl: 1,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.35,
          meleePen: 0.10,
          meleeSpeed: 2.2,
        },
        sellPrice: 7,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bronzeDagger',
        name: 'Bronze Dagger',
        image: 'assets/icons/bronzedagger16.png',
        mSmithing: 'dagger',
        dcat: 'meleeWeapon',
        dlvl: 2,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.40,
          meleePen: 0.10,
          meleeSpeed: 2.2,
        },
        sellPrice: 15,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ironDagger',
        name: 'Iron Dagger',
        image: 'assets/icons/irondagger16.png',
        mSmithing: 'dagger',
        dcat: 'meleeWeapon',
        dlvl: 4,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.45,
          meleePen: 0.10,
          meleeSpeed: 2.2,
        },
        sellPrice: 26,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'steelDagger',
        name: 'Steel Dagger',
        image: 'assets/icons/steeldagger16.png',
        mSmithing: 'dagger',
        dcat: 'meleeWeapon',
        dlvl: 7,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.50,
          meleePen: 0.10,
          meleeSpeed: 2.2,
        },
        sellPrice: 32,
        count: 0,
        totalCount: 0,
      },

      //swords
      {
        id: 'bronzeBroadsword',
        name: 'Bronze Broadsword',
        image: 'assets/icons/bronzesword16.png',
        mSmithing: 'broadsword',
        dcat: 'meleeWeapon',
        dlvl: 3,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.50,
          meleePen: 0.20,
          meleeSpeed: 2.4,
        },
        sellPrice: 34,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ironBroadsword',
        name: 'Iron Broadsword',
        image: 'assets/icons/ironsword16.png',
        mSmithing: 'broadsword',
        dcat: 'meleeWeapon',
        dlvl: 6,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.55,
          meleePen: 0.20,
          meleeSpeed: 2.4,
        },
        sellPrice: 58,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'steelBroadsword',
        name: 'Steel Broadsword',
        image: 'assets/icons/steelsword16.png',
        mSmithing: 'broadsword',
        dcat: 'meleeWeapon',
        dlvl: 8,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.60,
          meleePen: 0.20,
          meleeSpeed: 2.4,
        },
        sellPrice: 70,
        count: 0,
        totalCount: 0,
      },

      //maces
      {
        id: 'bronzeMace',
        name: 'Bronze Mace',
        image: 'assets/icons/bronzemace16.png',
        mSmithing: 'mace',
        dcat: 'meleeWeapon',
        dlvl: 3,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.55,
          meleePen: 0.30,
          meleeSpeed: 2.6,
        },
        sellPrice: 30,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ironMace',
        name: 'Iron Mace',
        image: 'assets/icons/ironmace16.png',
        mSmithing: 'mace',
        dcat: 'meleeWeapon',
        dlvl: 6,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.60,
          meleePen: 0.30,
          meleeSpeed: 2.6,
        },
        sellPrice: 52,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'steelMace',
        name: 'Steel Mace',
        image: 'assets/icons/steelmace16.png',
        mSmithing: 'mace',
        dcat: 'meleeWeapon',
        dlvl: 8,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.65,
          meleePen: 0.30,
          meleeSpeed: 2.6,
        },
        sellPrice: 62,
        count: 0,
        totalCount: 0,
      },

      //heavys
      {
        id: 'bronzeHeavy',
        name: 'Bronze Warhammer',
        image: 'assets/icons/bronzeheavy16.png',
        mSmithing: 'heavy',
        dcat: 'meleeWeapon',
        dlvl: 4,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.70,
          meleePen: 0.40,
          meleeSpeed: 3.0,
        },
        sellPrice: 50,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ironHeavy',
        name: 'Iron Warhammer',
        image: 'assets/icons/testIcon16.png',
        mSmithing: 'heavy',
        dcat: 'meleeWeapon',
        dlvl: 7,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.80,
          meleePen: 0.40,
          meleeSpeed: 3.0,
        },
        sellPrice: 85,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'steelHeavy',
        name: 'Steel Warhammer',
        image: 'assets/icons/testIcon16.png',
        mSmithing: 'heavy',
        dcat: 'meleeWeapon',
        dlvl: 9,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.90,
          meleePen: 0.40,
          meleeSpeed: 3.0,
        },
        sellPrice: 105,
        count: 0,
        totalCount: 0,
      },

      //copper set
      {
        id: 'copperHelmet',
        name: 'Copper Helmet',
        image: 'assets/icons/copperhelmet16.png',
        mSmithing: 'helmet',
        dcat: 'meleeArmor',
        dlvl: 1,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 3,
          rangedDodge: 2,
          magicDodge: -2,
          resist: 0.02,
        },
        sellPrice: 13,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'copperGreaves',
        name: 'Copper Greaves',
        image: 'assets/icons/coppergreaves16.png',
        mSmithing: 'greaves',
        dcat: 'meleeArmor',
        dlvl: 1,
        slot: 'legSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 1,
          meleeDodge: 2,
          rangedDodge: 1,
          resist: 0.02,
        },
        sellPrice: 12,
        count: 0,
        totalCount: 0,
      },

      //bronze set
      {
        id: 'bronzeHelmet',
        name: 'Bronze Helmet',
        image: 'assets/icons/bronzehelmet16.png',
        mSmithing: 'helmet',
        dcat: 'meleeArmor',
        dlvl: 2,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 4,
          rangedDodge: 3,
          magicDodge: -2,
          resist: 0.03,
        },
        sellPrice: 32,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bronzePlate',
        name: 'Bronze Plate',
        image: 'assets/icons/bronzeplate16.png',
        mSmithing: 'plate',
        dcat: 'meleeArmor',
        dlvl: 4,
        slot: 'chestSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 6,
          rangedDodge: 6,
          magicDodge: -8,
          physicalArmor: 1,
          resist: 0.03,
        },
        sellPrice: 80,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bronzeChainmail',
        name: 'Bronze Chainmail',
        image: 'assets/icons/bronzechain16.png',
        mSmithing: 'chainmail',
        dcat: 'meleeArmor',
        dlvl: 2,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 4,
          rangedDodge: 4,
          magicDodge: -3,
          resist: 0.03,
        },
        sellPrice: 65,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bronzeShield',
        name: 'Bronze Wingshields',
        image: 'assets/icons/bronzewing16.png',
        mSmithing: 'shield',
        dcat: 'meleeArmor',
        dlvl: 3,
        slot: 'wingSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 5,
          rangedDodge: 4,
          magicDodge: -5,
          resist: 0.03,
        },
        sellPrice: 44,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bronzeGreaves',
        name: 'Bronze Greaves',
        image: 'assets/icons/bronzegreaves16.png',
        mSmithing: 'greaves',
        dcat: 'meleeArmor',
        dlvl: 2,
        slot: 'legSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 2,
          meleeDodge: 3,
          rangedDodge: 2,
          resist: 0.03,
        },
        sellPrice: 30,
        count: 0,
        totalCount: 0,
      },

      //iron set
      {
        id: 'ironHelmet',
        name: 'Iron Helmet',
        image: 'assets/icons/ironhelmet16.png',
        mSmithing: 'helmet',
        dcat: 'meleeArmor',
        dlvl: 4,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 5,
          rangedDodge: 4,
          magicDodge: -2,
          resist: 0.04,
        },
        sellPrice: 55,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ironPlate',
        name: 'Iron Plate',
        image: 'assets/icons/ironplate16.png',
        mSmithing: 'plate',
        dcat: 'meleeArmor',
        dlvl: 7,
        slot: 'chestSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 7,
          rangedDodge: 7,
          magicDodge: -8,
          physicalArmor: 2,
          resist: 0.04,
        },
        sellPrice: 135,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ironChainmail',
        name: 'Iron Chainmail',
        image: 'assets/icons/ironchain16.png',
        mSmithing: 'chainmail',
        dcat: 'meleeArmor',
        dlvl: 4,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 5,
          rangedDodge: 5,
          magicDodge: -3,
          resist: 0.04,
        },
        sellPrice: 110,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ironShield',
        name: 'Iron Wingshields',
        image: 'assets/icons/ironwing16.png',
        mSmithing: 'shield',
        dcat: 'meleeArmor',
        dlvl: 6,
        slot: 'wingSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 6,
          rangedDodge: 5,
          magicDodge: -5,
          resist: 0.04,
        },
        sellPrice: 74,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ironGreaves',
        name: 'Iron Greaves',
        image: 'assets/icons/irongreaves16.png',
        mSmithing: 'greaves',
        dcat: 'meleeArmor',
        dlvl: 4,
        slot: 'legSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 3,
          meleeDodge: 4,
          rangedDodge: 3,
          resist: 0.04,
        },
        sellPrice: 50,
        count: 0,
        totalCount: 0,
      },

      //steel set
      {
        id: 'steelHelmet',
        name: 'Steel Helmet',
        image: 'assets/icons/steelhelmet16.png',
        mSmithing: 'helmet',
        dcat: 'meleeArmor',
        dlvl: 7,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 6,
          rangedDodge: 5,
          magicDodge: -2,
          resist: 0.05,
        },
        sellPrice: 65,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'steelPlate',
        name: 'Steel Plate',
        image: 'assets/icons/steelplate16.png',
        mSmithing: 'plate',
        dcat: 'meleeArmor',
        dlvl: 9,
        slot: 'chestSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 8,
          rangedDodge: 8,
          magicDodge: -8,
          physicalArmor: 3,
          resist: 0.05,
        },
        sellPrice: 185,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'steelChainmail',
        name: 'Steel Chainmail',
        image: 'assets/icons/steelchain16.png',
        mSmithing: 'chainmail',
        dcat: 'meleeArmor',
        dlvl: 7,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 6,
          rangedDodge: 6,
          magicDodge: -3,
          resist: 0.05,
        },
        sellPrice: 130,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'steelShield',
        name: 'Steel Wingshields',
        image: 'assets/icons/steelwing16.png',
        mSmithing: 'shield',
        dcat: 'meleeArmor',
        dlvl: 8,
        slot: 'wingSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 7,
          rangedDodge: 6,
          magicDodge: -5,
          resist: 0.05,
        },
        sellPrice: 90,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'steelGreaves',
        name: 'Steel Greaves',
        image: 'assets/icons/steelgreaves16.png',
        mSmithing: 'greaves',
        dcat: 'meleeArmor',
        dlvl: 7,
        slot: 'legSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 4,
          meleeDodge: 5,
          rangedDodge: 4,
          resist: 0.05,
        },
        sellPrice: 60,
        count: 0,
        totalCount: 0,
      },

      //mythril set
      {
        id: 'mythrilHelmet',
        name: 'Mythril Helmet',
        image: 'assets/icons/mythrilhelmet16.png',
        mSmithing: 'helmet',
        dcat: 'meleeArmor',
        dlvl: 9,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 7,
          rangedDodge: 6,
          magicDodge: 3,
          resist: 0.06,
        },
        sellPrice: 92,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'mythrilPlate',
        name: 'Mythril Plate',
        image: 'assets/icons/mythrilplate16.png',
        mSmithing: 'plate',
        dcat: 'meleeArmor',
        dlvl: 11,
        slot: 'chestSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 9,
          rangedDodge: 9,
          magicDodge: 3,
          physicalArmor: 4,
          resist: 0.06,
        },
        sellPrice: 260,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'mythrilChainmail',
        name: 'Mythril Chainmail',
        image: 'assets/icons/mythrilchain16.png',
        mSmithing: 'chainmail',
        dcat: 'meleeArmor',
        dlvl: 9,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 7,
          rangedDodge: 7,
          magicDodge: 3,
          resist: 0.06,
        },
        sellPrice: 185,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'mythrilShield',
        name: 'Mythril Wingshields',
        image: 'assets/icons/mythrilwing16.png',
        mSmithing: 'shield',
        dcat: 'meleeArmor',
        dlvl: 10,
        slot: 'wingSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 8,
          rangedDodge: 7,
          magicDodge: 3,
          resist: 0.06,
        },
        sellPrice: 135,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'mythrilGreaves',
        name: 'Mythril Greaves',
        image: 'assets/icons/mythrilgreaves16.png',
        mSmithing: 'greaves',
        dcat: 'meleeArmor',
        dlvl: 9,
        slot: 'legSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 5,
          meleeDodge: 6,
          rangedDodge: 5,
          magicDodge: 3,
          resist: 0.06,
        },
        sellPrice: 86,
        count: 0,
        totalCount: 0,
      },

      //ranged weapon set 1

      //ranged armor set 1
      {
        id: 'woolHood',
        name: 'Knitted Hood',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'hood',
        dcat: 'rangedArmor',
        dlvl: 1,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 2,
          rangedDodge: 2,
          magicDodge: 2,
          resist: 0.02,
        },
        sellPrice: 20,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'woolJacket',
        name: 'Knitted Jacket',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'jacket',
        dcat: 'rangedArmor',
        dlvl: 1,
        slot: 'chestSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 4,
          rangedDodge: 4,
          magicDodge: 4,
          resist: 0.02,
        },
        sellPrice: 36,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'woolVest',
        name: 'Knitted Vest',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'vest',
        dcat: 'rangedArmor',
        dlvl: 1,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 2,
          rangedDodge: 2,
          magicDodge: 2,
          resist: 0.02,
        },
        sellPrice: 28,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'woolWings',
        name: 'Knitted Wingcloak',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'wingcloak',
        dcat: 'rangedArmor',
        dlvl: 1,
        slot: 'wingSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 3,
          rangedDodge: 3,
          magicDodge: 3,
          resist: 0.02,
        },
        sellPrice: 24,
        count: 0,
        totalCount: 0,
      },

      //ranged armor set 2
      {
        id: 'furHood',
        name: 'Fur Hood',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'hood',
        dcat: 'rangedArmor',
        dlvl: 3,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 3,
          rangedDodge: 3,
          magicDodge: 3,
          resist: 0.03,
        },
        sellPrice: 30,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'furJacket',
        name: 'Fur Jacket',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'jacket',
        dcat: 'rangedArmor',
        dlvl: 3,
        slot: 'chestSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 5,
          rangedDodge: 5,
          magicDodge: 5,
          resist: 0.03,
        },
        sellPrice: 54,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'furVest',
        name: 'Fur Vest',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'vest',
        dcat: 'rangedArmor',
        dlvl: 3,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 3,
          rangedDodge: 3,
          magicDodge: 3,
          resist: 0.03,
        },
        sellPrice: 42,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'furWings',
        name: 'Fur Wingcloak',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'wingcloak',
        dcat: 'rangedArmor',
        dlvl: 3,
        slot: 'wingSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 4,
          rangedDodge: 4,
          magicDodge: 4,
          resist: 0.03,
        },
        sellPrice: 36,
        count: 0,
        totalCount: 0,
      },

      //ranged armor set 3
      {
        id: 'leatherHood',
        name: 'Leather Hood',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'hood',
        dcat: 'rangedArmor',
        dlvl: 5,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 4,
          rangedDodge: 4,
          magicDodge: 4,
          resist: 0.04,
        },
        sellPrice: 65,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'leatherJacket',
        name: 'Leather Jacket',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'jacket',
        dcat: 'rangedArmor',
        dlvl: 5,
        slot: 'chestSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 6,
          rangedDodge: 6,
          magicDodge: 6,
          resist: 0.04,
        },
        sellPrice: 120,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'leatherVest',
        name: 'Leather Vest',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'vest',
        dcat: 'rangedArmor',
        dlvl: 5,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 4,
          rangedDodge: 4,
          magicDodge: 4,
          resist: 0.04,
        },
        sellPrice: 90,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'leatherWings',
        name: 'Leather Wingcloak',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'wingcloak',
        dcat: 'rangedArmor',
        dlvl: 5,
        slot: 'wingSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 5,
          rangedDodge: 5,
          magicDodge: 5,
          resist: 0.04,
        },
        sellPrice: 78,
        count: 0,
        totalCount: 0,
      },

      //ranged armor set 4
      {
        id: 'hideHood',
        name: 'Hide Hood',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'hood',
        dcat: 'rangedArmor',
        dlvl: 7,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 5,
          rangedDodge: 5,
          magicDodge: 5,
          resist: 0.05,
        },
        sellPrice: 85,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'hideJacket',
        name: 'Hide Jacket',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'jacket',
        dcat: 'rangedArmor',
        dlvl: 7,
        slot: 'chestSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 7,
          rangedDodge: 7,
          magicDodge: 7,
          resist: 0.05,
        },
        sellPrice: 155,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'hideVest',
        name: 'Hide Vest',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'vest',
        dcat: 'rangedArmor',
        dlvl: 7,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 5,
          rangedDodge: 5,
          magicDodge: 5,
          resist: 0.05,
        },
        sellPrice: 110,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'hideWings',
        name: 'Hide Wingcloak',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'wingcloak',
        dcat: 'rangedArmor',
        dlvl: 7,
        slot: 'wingSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 6,
          rangedDodge: 6,
          magicDodge: 6,
          resist: 0.05,
        },
        sellPrice: 100,
        count: 0,
        totalCount: 0,
      },

      //ranged armor set 5
      {
        id: 'caraHood',
        name: 'Carapace Hood',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'hood',
        dcat: 'rangedArmor',
        dlvl: 9,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 6,
          rangedDodge: 6,
          magicDodge: 6,
          resist: 0.06,
        },
        sellPrice: 70,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'caraJacket',
        name: 'Carapace Jacket',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'jacket',
        dcat: 'rangedArmor',
        dlvl: 9,
        slot: 'chestSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 8,
          rangedDodge: 8,
          magicDodge: 8,
          resist: 0.06,
        },
        sellPrice: 105,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'caraVest',
        name: 'Carapace Vest',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'vest',
        dcat: 'rangedArmor',
        dlvl: 9,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 6,
          rangedDodge: 6,
          magicDodge: 6,
          resist: 0.06,
        },
        sellPrice: 85,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'caraWings',
        name: 'Carapace Wingcloak',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'wingcloak',
        dcat: 'rangedArmor',
        dlvl: 9,
        slot: 'wingSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 7,
          rangedDodge: 7,
          magicDodge: 7,
          resist: 0.06,
        },
        sellPrice: 75,
        count: 0,
        totalCount: 0,
      },

      //wands
      {
        id: 'wand1',
        name: 'Pale Wand',
        image: 'assets/icons/wand1.png',
        mArtifice: 'wand',
        dcat: 'magicWeapon',
        dlvl: 1,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 0,
          magicDamage: 0.05,
          magicPen: 0.05,
          magicSpeed: 2.2,
        },
        sellPrice: 12,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'wand2',
        name: 'Pure Wand',
        image: 'assets/icons/wand2.png',
        mArtifice: 'wand',
        dcat: 'magicWeapon',
        dlvl: 2,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 0,
          magicDamage: 0.10,
          magicPen: 0.05,
          magicSpeed: 2.2,
        },
        sellPrice: 30,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'wand3',
        name: 'Spelldew Wand',
        image: 'assets/icons/wand3.png',
        mArtifice: 'wand',
        dcat: 'magicWeapon',
        dlvl: 4,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 0,
          magicDamage: 0.15,
          magicPen: 0.05,
          magicSpeed: 2.2,
        },
        sellPrice: 85,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'wand4',
        name: 'Vis Wand',
        image: 'assets/icons/wand4.png',
        mArtifice: 'wand',
        dcat: 'magicWeapon',
        dlvl: 6,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 0,
          magicDamage: 0.20,
          magicPen: 0.05,
          magicSpeed: 2.2,
        },
        sellPrice: 120,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'wand5',
        name: 'Flux Wand',
        image: 'assets/icons/wand5.png',
        mArtifice: 'wand',
        dcat: 'magicWeapon',
        dlvl: 8,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 0,
          magicDamage: 0.25,
          magicPen: 0.05,
          magicSpeed: 2.2,
        },
        sellPrice: 170,
        count: 0,
        totalCount: 0,
      },

      //staffs
      {
        id: 'staff1',
        name: 'Pure Staff',
        image: 'assets/icons/staff1.png',
        mArtifice: 'staff',
        dcat: 'magicWeapon',
        dlvl: 2,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 0,
          magicDamage: 0.35,
          magicPen: 0.10,
          magicSpeed: 3.0,
        },
        sellPrice: 40,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'staff2',
        name: 'Nitor Staff',
        image: 'assets/icons/staff2.png',
        mArtifice: 'staff',
        dcat: 'magicWeapon',
        dlvl: 3,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 0,
          magicDamage: 0.40,
          magicPen: 0.10,
          magicSpeed: 3.0,
        },
        sellPrice: 40,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'staff3',
        name: 'Cinnabar Staff',
        image: 'assets/icons/staff3.png',
        mArtifice: 'staff',
        dcat: 'magicWeapon',
        dlvl: 5,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 0,
          magicDamage: 0.45,
          magicPen: 0.10,
          magicSpeed: 3.0,
        },
        sellPrice: 60,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'staff4',
        name: 'Sparksalt Staff',
        image: 'assets/icons/staff4.png',
        mArtifice: 'staff',
        dcat: 'magicWeapon',
        dlvl: 7,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 0,
          magicDamage: 0.50,
          magicPen: 0.10,
          magicSpeed: 3.0,
        },
        sellPrice: 90,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'staff5',
        name: 'Naptha Staff',
        image: 'assets/icons/staff5.png',
        mArtifice: 'staff',
        dcat: 'magicWeapon',
        dlvl: 9,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 0,
          magicDamage: 0.55,
          magicPen: 0.10,
          magicSpeed: 3.0,
        },
        sellPrice: 135,
        count: 0,
        totalCount: 0,
      },

      //books
      {
        id: 'book1',
        name: 'Pure Grimoire',
        image: 'assets/icons/book1.png',
        mArtifice: 'book',
        dcat: 'magicWeapon',
        dlvl: 4,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 0,
          magicDamage: 0.20,
          magicPen: 0.15,
          magicSpeed: 2.6,
        },
        sellPrice: 50,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'book2',
        name: 'Spelldew Grimoire',
        image: 'assets/icons/book2.png',
        mArtifice: 'book',
        dcat: 'magicWeapon',
        dlvl: 6,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 0,
          magicDamage: 0.25,
          magicPen: 0.15,
          magicSpeed: 2.6,
        },
        sellPrice: 90,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'book3',
        name: 'Sparksalt Grimoire',
        image: 'assets/icons/book3.png',
        mArtifice: 'book',
        dcat: 'magicWeapon',
        dlvl: 8,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 0,
          magicDamage: 0.30,
          magicPen: 0.15,
          magicSpeed: 2.6,
        },
        sellPrice: 198,
        count: 0,
        totalCount: 0,
      },

      //orbs
      {
        id: 'orb1',
        name: 'Amber Orb',
        image: 'assets/icons/orb1.png',
        mArtifice: 'orb',
        dcat: 'magicWeapon',
        dlvl: 3,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 0,
          magicDamage: 0.30,
          magicPen: -0.3,
          magicSpeed: 2.0,
        },
        sellPrice: 42,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'orb2',
        name: 'Silver Orb',
        image: 'assets/icons/orb2.png',
        mArtifice: 'orb',
        dcat: 'magicWeapon',
        dlvl: 5,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 0,
          magicDamage: 0.35,
          magicPen: -0.3,
          magicSpeed: 2.0,
        },
        sellPrice: 79,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'orb3',
        name: 'Spinel Orb',
        image: 'assets/icons/orb3.png',
        mArtifice: 'orb',
        dcat: 'magicWeapon',
        dlvl: 8,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 0,
          magicDamage: 0.40,
          magicPen: -0.3,
          magicSpeed: 2.0,
        },
        sellPrice: 160,
        count: 0,
        totalCount: 0,
      },

      //magic set 1
      {
        id: 'flaxGloves',
        name: 'Linen Gloves',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'glove',
        dcat: 'magicArmor',
        dlvl: 2,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 1,
          magicDodge: 2,
          resist: 0.02,
        },
        sellPrice: 15,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'flaxHat',
        name: 'Linen Hat',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'hat',
        dcat: 'magicArmor',
        dlvl: 2,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 1,
          magicDodge: 3,
          resist: 0.02,
        },
        sellPrice: 22,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'flaxTunic',
        name: 'Linen Tunic',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'tunic',
        dcat: 'magicArmor',
        dlvl: 2,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 1,
          magicDodge: 3,
          resist: 0.02,
        },
        sellPrice: 40,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'flaxRobe',
        name: 'Linen Robe',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'robe',
        dcat: 'magicArmor',
        dlvl: 2,
        slot: 'chestSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 1,
          magicDodge: 5,
          resist: 0.02,
        },
        sellPrice: 54,
        count: 0,
        totalCount: 0,
      },

      //magic set 2
      {
        id: 'cottonHat',
        name: 'Cotton Hat',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'hat',
        dcat: 'magicArmor',
        dlvl: 4,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 2,
          magicDodge: 4,
          resist: 0.03,
        },
        sellPrice: 45,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'cottonRobe',
        name: 'Cotton Robe',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'robe',
        dcat: 'magicArmor',
        dlvl: 4,
        slot: 'chestSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 2,
          magicDodge: 6,
          resist: 0.03,
        },
        sellPrice: 110,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'cottonTunic',
        name: 'Cotton Tunic',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'tunic',
        dcat: 'magicArmor',
        dlvl: 4,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 2,
          magicDodge: 4,
          resist: 0.03,
        },
        sellPrice: 80,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'wingward1',
        name: 'Nitor Wingwards',
        image: 'assets/icons/wing1.png',
        mArtifice: 'wing',
        dcat: 'magicArmor',
        dlvl: 3,
        slot: 'wingSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 2,
          magicDodge: 5,
          energyArmor: 1,
          resist: 0.03,
        },
        sellPrice: 95,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'cottonGloves',
        name: 'Cotton Gloves',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'glove',
        dcat: 'magicArmor',
        dlvl: 4,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 2,
          magicDodge: 3,
          resist: 0.03,
        },
        sellPrice: 30,
        count: 0,
        totalCount: 0,
      },

      //magic set 3
      {
        id: 'barkHat',
        name: 'Silverbark Hat',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'hat',
        dcat: 'magicArmor',
        dlvl: 6,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 3,
          meleeDodge: 2,
          rangedDodge: 2,
          magicDodge: 5,
          resist: 0.04,
        },
        sellPrice: 52,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'barkRobe',
        name: 'Silverbark Robe',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'robe',
        dcat: 'magicArmor',
        dlvl: 6,
        slot: 'chestSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 3,
          meleeDodge: 2,
          rangedDodge: 2,
          magicDodge: 7,
          resist: 0.04,
        },
        sellPrice: 70,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'barkTunic',
        name: 'Silverbark Tunic',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'tunic',
        dcat: 'magicArmor',
        dlvl: 6,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 3,
          meleeDodge: 2,
          rangedDodge: 2,
          magicDodge: 5,
          resist: 0.04,
        },
        sellPrice: 65,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'wingward2',
        name: 'Cinnabar Wingwards',
        image: 'assets/icons/wing2.png',
        mArtifice: 'wing',
        dcat: 'magicArmor',
        dlvl: 5,
        slot: 'wingSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 3,
          magicDodge: 6,
          energyArmor: 2,
          resist: 0.04,
        },
        sellPrice: 140,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'barkGloves',
        name: 'Silverbark Gloves',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'glove',
        dcat: 'magicArmor',
        dlvl: 6,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 3,
          meleeDodge: 2,
          rangedDodge: 2,
          magicDodge: 4,
          resist: 0.04,
        },
        sellPrice: 44,
        count: 0,
        totalCount: 0,
      },

      //magic set 4
      {
        id: 'silkHat',
        name: 'Silk Hat',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'hat',
        dcat: 'magicArmor',
        dlvl: 8,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 4,
          magicDodge: 6,
          resist: 0.05,
        },
        sellPrice: 90,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'silkRobe',
        name: 'Silk Robe',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'robe',
        dcat: 'magicArmor',
        dlvl: 8,
        slot: 'chestSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 4,
          magicDodge: 8,
          resist: 0.05,
        },
        sellPrice: 115,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'silkTunic',
        name: 'Silk Tunic',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'tunic',
        dcat: 'magicArmor',
        dlvl: 8,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 4,
          magicDodge: 6,
          resist: 0.05,
        },
        sellPrice: 200,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'wingward3',
        name: 'Sparksalt Wingswards',
        image: 'assets/icons/wing3.png',
        mArtifice: 'wing',
        dcat: 'magicArmor',
        dlvl: 8,
        slot: 'wingSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 4,
          magicDodge: 7,
          energyArmor: 3,
          resist: 0.05,
        },
        sellPrice: 195,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'silkGloves',
        name: 'Silk Gloves',
        image: 'assets/icons/testIcon16.png',
        mTailoring: 'glove',
        dcat: 'magicArmor',
        dlvl: 8,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 4,
          magicDodge: 5,
          resist: 0.05,
        },
        sellPrice: 60,
        count: 0,
        totalCount: 0,
      },

      //kobold set
      {
        id: 'koboldDagger',
        name: 'Kobold Nail',
        flavor: 'Not that kind of nail.',
        image: 'assets/icons/kobolddagger.png',
        dcat: 'meleeWeapon',
        dlvl: 2,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 5,
          meleeDamage: 0.40,
          meleePen: 0.05,
          meleeSpeed: 2.2,
        },
        sellPrice: 22,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'koboldSling',
        name: 'Kobold Sling',
        extra: 'Requires no ammo',
        flavor: "Shepherd's favourite.",
        image: 'assets/icons/koboldsling.png',
        dcat: 'rangedWeapon',
        dlvl: 2,
        slot: 'rangedSlot',
        requiredAmmo: 'none',
        isCombat: true,
        onEquip: false,
        stats: {
          rangedAccuracy: 5,
          rangedDamage: 0.20,
          rangedPen: 0.05,
          rangedSpeed: 2.2,
        },
        sellPrice: 8,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'koboldBow',
        name: 'Kobold Longbow',
        flavor: "Bigger than its maker.",
        image: 'assets/icons/koboldbow.png',
        dcat: 'rangedWeapon',
        dlvl: 2,
        slot: 'rangedSlot',
        requiredAmmo: 'arrow',
        isCombat: true,
        onEquip: false,
        stats: {
          rangedAccuracy: 5,
          rangedDamage: 0.05,
          rangedPen: 0.10,
          rangedSpeed: 2.6,
        },
        sellPrice: 36,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'koboldCowl',
        name: 'Kobold Cowl',
        flavor: 'Keeps ears from getting wet.',
        image: 'assets/icons/koboldcowl.png',
        dcat: 'rangedArmor',
        dlvl: 2,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          rangedDamage: 0.05,
          meleeDodge: 3,
          rangedDodge: 3,
          magicDodge: 3,
          resist: 0.03,
        },
        sellPrice: 16,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'koboldChest',
        name: 'Kobold Shield',
        flavor: 'Too small for wings, but may be a good chestplate.',
        image: 'assets/icons/koboldshield.png',
        dcat: 'rangedArmor',
        dlvl: 3,
        slot: 'chestSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          rangedDamage: 0.05,
          meleeDodge: 4,
          rangedDodge: 4,
          magicDodge: 4,
          physicalArmor: 1,
          resist: 0.03,
        },
        sellPrice: 29,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'koboldVest',
        name: 'Kobold Vest',
        flavor: 'Sleek and snazy.',
        image: 'assets/icons/koboldvest.png',
        dcat: 'rangedArmor',
        dlvl: 2,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          rangedDamage: 0.05,
          meleeDodge: 3,
          rangedDodge: 3,
          magicDodge: 3,
          resist: 0.03,
        },
        sellPrice: 34,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'koboldBracer',
        name: 'Kobold Armwraps',
        flavor: 'Also works with legs.',
        image: 'assets/icons/koboldarms.png',
        dcat: 'rangedArmor',
        dlvl: 2,
        slot: 'legSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          rangedDamage: 0.05,
          meleeDodge: 2,
          rangedDodge: 2,
          magicDodge: 2,
          resist: 0.03,
        },
        sellPrice: 25,
        count: 0,
        totalCount: 0,
      },

      //tower set
      {
        id: 'towerMace',
        name: 'Process Mace',
        flavor: 'The auto-abacus only processes smashing now.',
        image: 'assets/icons/towermace.png',
        dcat: 'meleeWeapon',
        dlvl: 5,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 10,
          meleeDamage: 0.65,
          meleePen: 0.35,
          meleeSpeed: 2.8,
        },
        sellPrice: 60,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'towerStaff',
        name: 'Ironbank Staff',
        flavor: 'Must have taken eons to get the magic in.',
        image: 'assets/icons/towerstaff.png',
        dcat: 'magicWeapon',
        dlvl: 8,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 10,
          magicDamage: 0.40,
          magicPen: 0.15,
          magicSpeed: 3.2,
        },
        sellPrice: 70,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'towerHelmet',
        name: 'Construct Helmet',
        flavor: 'Magically imbued iron headware.',
        image: 'assets/icons/towerhelmet.png',
        dcat: 'meleeArmor',
        dlvl: 4,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicDamage: 0.05,
          meleeDodge: 4,
          rangedDodge: 4,
          magicDodge: 3,
          resist: 0.04,
        },
        sellPrice: 50,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'towerPlate',
        name: 'Construct Plate',
        flavor: 'Once, it protected a protector.',
        image: 'assets/icons/towerplate.png',
        dcat: 'meleeArmor',
        dlvl: 5,
        slot: 'chestSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicDamage: 0.05,
          meleeDodge: 6,
          rangedDodge: 6,
          magicDodge: 5,
          physicalArmor: 2,
          energyArmor: 1,
          resist: 0.04,
        },
        sellPrice: 250,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'towerGreaves',
        name: 'Construct Legs',
        flavor: "Has walked thousands of miles without stepping out the front door.",
        image: 'assets/icons/towerlegs.png',
        dcat: 'meleeArmor',
        dlvl: 4,
        slot: 'legSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicDamage: 0.05,
          meleeDodge: 3,
          rangedDodge: 3,
          magicDodge: 2,
          resist: 0.04,
        },
        sellPrice: 45,
        count: 0,
        totalCount: 0,
      },

      //phoenix set
      {
        id: 'farmerBow',
        name: 'Phoenix Crossbow',
        flavor: "Former property of the phoenix farmers.",
        image: 'assets/icons/testIcon16.png',
        dcat: 'rangedWeapon',
        dlvl: 4,
        slot: 'rangedSlot',
        requiredAmmo: 'arrow',
        isCombat: true,
        onEquip: false,
        stats: {
          rangedAccuracy: 5,
          rangedDamage: 0.10,
          rangedPen: 0.25,
          rangedSpeed: 2.6,
        },
        sellPrice: 45,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'deviceFlamethrower',
        name: 'Phoenix Staff',
        extra: 'Mechanics Device\nNo combat XP',
        flavor: 'Anywhere it drips, it holes.',
        image: 'assets/icons/testIcon16.png',
        dcat: 'device',
        dlvl: 1,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 5,
          magicDamage: 0.30,
          magicPen: 0.05,
          magicSpeed: 2.8,
        },
        sellPrice: 55,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'farmerHelm',
        name: 'Phoenix Hood',
        flavor: 'Keeps hair safe from fire, keeps eyes safe from hair.',
        image: 'assets/icons/testIcon16.png',
        dcat: 'rangedArmor',
        dlvl: 4,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          rangedDamage: 0.05,
          meleeDodge: 2,
          rangedDodge: 4,
          magicDodge: 4,
          resist: 0.04,
        },
        sellPrice: 40,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'hotsuitBody',
        name: "Phoenix Apron",
        flavor: 'Heavy and ash resistant.',
        image: 'assets/icons/testIcon16.png',
        dcat: 'meleeArmor',
        dlvl: 4,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDamage: 0.05,
          meleeDodge: 3,
          rangedDodge: 5,
          magicDodge: 5,
          resist: 0.04,
        },
        sellPrice: 45,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'farmerWings',
        name: 'Phoenix Ashes',
        flavor: 'Remembers being wings, remembers burning steel.',
        image: 'assets/icons/testIcon16.png',
        dcat: 'magicArmor',
        dlvl: 5,
        slot: 'wingSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicDamage: 0.05,
          meleeDodge: 4,
          rangedDodge: 6,
          magicDodge: 6,
          energyArmor: 2,
          resist: 0.04,
        },
        sellPrice: 85,
        count: 0,
        totalCount: 0,
      },

      //setless
      {
        id: 'pitchingWand',
        name: 'Dripping Sprig',
        extra: '+20% acid chance',
        flavor: 'Try not to chew on its blood-curdling sap.',
        image: 'assets/icons/wandsprig.png',
        dcat: 'magicWeapon',
        dlvl: 3,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 5,
          magicDamage: -0.10,
          magicPen: 0.05,
          magicSpeed: 2.1,
        },
        special: {
          poisonChance: 0.20,
        },
        sellPrice: 23,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'spriteWings',
        name: 'Sprite Forms',
        flavor: 'Fallen letters from a sprite, can be written on wings.',
        image: 'assets/icons/spritewing.png',
        dcat: 'magicArmor',
        dlvl: 3,
        slot: 'wingSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicDamage: 0.05,
          meleeDodge: 5,
          magicDodge: 3,
          energyArmor: 1,
          resist: 0.03,
        },
        sellPrice: 18,
        count: 0,
        totalCount: 0,
      },

      //accessories
      {
        id: 'trinketSpice',
        name: 'Spice Pouch',
        flavor: "Adds a bit of pep to life.",
        extra: '+1 bonus healing',
        image: 'assets/icons/spicepouch.png',
        dcat: 'tool',
        dlvl: 1,
        slot: 'trinketSlot',
        isCombat: true,
        onEquip: false,
        stats: {},
        sellPrice: 120,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'copperRing',
        name: 'Ring of Copper',
        flavor: "Bends but doesn't break.",
        image: 'assets/icons/ringcopper.png',
        dcat: 'jewellery',
        dlvl: 1,
        slot: 'ringSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          dodge: 1,
        },
        sellPrice: 8,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'copperRingGlass',
        name: 'Ring of Glass (c)',
        flavor: "Inverted purpose.",
        image: 'assets/icons/ringcopperglass.png',
        dcat: 'jewellery',
        dlvl: 3,
        slot: 'ringSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          accuracy: 1,
        },
        sellPrice: 25,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'silverRing',
        name: 'Ring of Silver',
        image: 'assets/icons/ringsilver.png',
        dcat: 'jewellery',
        dlvl: 2,
        slot: 'ringSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          dodge: 2,
        },
        sellPrice: 45,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'yellowRing',
        name: 'Ring of Wealth',
        extra: "+10% extra drop chance",
        image: 'assets/icons/ringyellow.png',
        dcat: 'jewellery',
        dlvl: 5,
        slot: 'ringSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          extraDropChance: 0.10,
        },
        sellPrice: 115,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'goldRing',
        name: 'Ring of Gold',
        image: 'assets/icons/ringgold.png',
        dcat: 'jewellery',
        dlvl: 3,
        slot: 'ringSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          dodge: 3,
        },
        sellPrice: 95,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'copperAmmy',
        name: 'Amulet of Copper',
        flavor: "A hint of confidence.",
        image: 'assets/icons/ammycopper.png',
        dcat: 'jewellery',
        dlvl: 1,
        slot: 'ammySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          accuracy: 1,
        },
        sellPrice: 10,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'copperAmmyGlass',
        name: 'Amulet of Glass (c)',
        flavor: "Unsighted.",
        image: 'assets/icons/ammycopper.png',
        dcat: 'jewellery',
        dlvl: 3,
        slot: 'ammySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          dodge: 1,
        },
        sellPrice: 30,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'silverAmmy',
        name: 'Amulet of Silver',
        image: 'assets/icons/ammysilver.png',
        dcat: 'jewellery',
        dlvl: 2,
        slot: 'ammySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          accuracy: 2,
        },
        sellPrice: 50,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'pinkAmmy',
        name: 'Amulet of Slaying',
        image: 'assets/icons/ammypink.png',
        dcat: 'jewellery',
        dlvl: 5,
        slot: 'ammySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          slayerMitigation: 0.10,
        },
        sellPrice: 140,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'goldAmmy',
        name: 'Amulet of Gold',
        image: 'assets/icons/ammygold.png',
        dcat: 'jewellery',
        dlvl: 3,
        slot: 'ammySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          accuracy: 3,
        },
        sellPrice: 100,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'redAmmy',
        name: 'Amulet of Strength',
        image: 'assets/icons/ammymelee.png',
        dcat: 'jewellery',
        dlvl: 10,
        slot: 'ammySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDamage: 0.10,
          meleeAccuracy: 3,
        },
        sellPrice: 185,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'greenAmmy',
        name: 'Amulet of Markship',
        flavor: "Makes wind feel like an old friend.",
        image: 'assets/icons/ammyranged.png',
        dcat: 'jewellery',
        dlvl: 10,
        slot: 'ammySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          rangedDamage: 0.10,
          rangedAccuracy: 3,
        },
        sellPrice: 225,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'blueAmmy',
        name: 'Amulet of Spirit',
        image: 'assets/icons/ammymagic.png',
        dcat: 'jewellery',
        dlvl: 10,
        slot: 'ammySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicDamage: 0.10,
          magicAccuracy: 3,
        },
        sellPrice: 250,
        count: 0,
        totalCount: 0,
      },

      //oils
      {
        id: 'oil1',
        name: 'Slip Oil',
        flavor: "Greasing the way through victory.",
        image: 'assets/icons/oil1.png',
        dcat: 'oil',
        dlvl: 2,
        slot: 'oilSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 4,
        },
        sellPrice: 2,
        count: 0,
        totalCount: 0,
      },

      //arrows
      {
        id: 'copperArrow',
        name: 'Copper Arrows',
        flavor: "Pretty and sharp.",
        image: 'assets/icons/copperarrow.png',
        dcat: 'ammo',
        dlvl: 1,
        slot: 'ammoSlot',
        ammoType: 'arrow',
        isCombat: true,
        onEquip: false,
        stats: {
          rangedDamage: 0.45,
        },
        sellPrice: 1,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bronzeArrow',
        name: 'Bronze Arrows',
        flavor: "Better than flint.",
        image: 'assets/icons/bronzearrow.png',
        dcat: 'ammo',
        dlvl: 2,
        slot: 'ammoSlot',
        ammoType: 'arrow',
        isCombat: true,
        onEquip: false,
        stats: {
          rangedDamage: 0.50,
        },
        sellPrice: 2,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ironArrow',
        name: 'Iron Arrows',
        flavor: "Their broken heads are everywhere.",
        image: 'assets/icons/ironarrow.png',
        dcat: 'ammo',
        dlvl: 4,
        slot: 'ammoSlot',
        ammoType: 'arrow',
        isCombat: true,
        onEquip: false,
        stats: {
          rangedDamage: 0.55,
        },
        sellPrice: 4,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'steelArrow',
        name: 'Steel Arrows',
        flavor: "Try not to lose a thousand of these.",
        image: 'assets/icons/steelarrow.png',
        dcat: 'ammo',
        dlvl: 7,
        slot: 'ammoSlot',
        ammoType: 'arrow',
        isCombat: true,
        onEquip: false,
        stats: {
          rangedDamage: 0.60,
        },
        sellPrice: 6,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'mythrilArrow',
        name: 'Mythril Arrows',
        flavor: "If found, do not return to sender.",
        image: 'assets/icons/mythrilarrow.png',
        dcat: 'ammo',
        dlvl: 9,
        slot: 'ammoSlot',
        ammoType: 'arrow',
        isCombat: true,
        onEquip: false,
        stats: {
          rangedDamage: 0.65,
        },
        sellPrice: 8,
        count: 0,
        totalCount: 0,
      },

      //charges
      {
        id: 'charge1',
        name: 'Strike Charge',
        flavor: "Clay convinced to help.",
        image: 'assets/icons/charge1.png',
        dcat: 'charge',
        dlvl: 1,
        slot: 'chargeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicDamage: 0.30,
          magicPen: 0.15,
        },
        sellPrice: 2,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'charge2',
        name: 'Flash Charge',
        flavor: "Burnt up burning buffs.",
        image: 'assets/icons/charge2.png',
        dcat: 'charge',
        dlvl: 3,
        slot: 'chargeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicDamage: 0.25,
          magicPen: 0.20,
        },
        sellPrice: 3,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'charge3',
        name: 'Wave Charge',
        flavor: "Meet the morning dew.",
        image: 'assets/icons/charge3.png',
        dcat: 'charge',
        dlvl: 4,
        slot: 'chargeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicDamage: 0.20,
          magicPen: 0.25,
        },
        sellPrice: 5,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'charge4',
        name: 'Rush Charge',
        flavor: "Vis-a-vis some pain.",
        image: 'assets/icons/charge4.png',
        dcat: 'charge',
        dlvl: 6,
        slot: 'chargeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicDamage: 0.35,
          magicPen: 0.20,
        },
        sellPrice: 7,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'charge5',
        name: 'Bolt Charge',
        flavor: "Sparks of destruction.",
        image: 'assets/icons/charge5.png',
        dcat: 'charge',
        dlvl: 7,
        slot: 'chargeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicDamage: 0.40,
          magicPen: 0.15,
        },
        sellPrice: 10,
        count: 0,
        totalCount: 0,
      },
    ],
    consumableItems: [
      {
        id: 'stew',
        name: "Traveler's Stew",
        flavor: "It'll keep and keep.",
        image: 'assets/icons/stew.png',
        dcat: 'rawFood',
        isFood: true,
        onEquip: false,
        slot: 'foodSlot',
        heals: 3,
        dlvl: 1,
        sellPrice: 8,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meatChop',
        name: 'Raw Chop',
        image: 'assets/icons/rawchop.png',
        dcat: 'rawFood',
        isFood: true,
        onEquip: false,
        slot: 'foodSlot',
        heals: 1,
        dlvl: 1,
        sellPrice: 2,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meatGame',
        name: 'Raw Game',
        image: 'assets/icons/rawgame.png',
        dcat: 'rawFood',
        isFood: true,
        onEquip: false,
        slot: 'foodSlot',
        heals: 2,
        dlvl: 3,
        sellPrice: 3,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meatFlank',
        name: 'Raw Flank',
        image: 'assets/icons/rawsteak.png',
        dcat: 'rawFood',
        isFood: true,
        onEquip: false,
        slot: 'foodSlot',
        heals: 5,
        dlvl: 5,
        sellPrice: 14,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meatSpicy',
        name: 'Shell Meat',
        image: 'assets/icons/rawbug.png',
        dcat: 'rawFood',
        isFood: true,
        onEquip: false,
        slot: 'foodSlot',
        heals: 9,
        dlvl: 8,
        sellPrice: 22,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'friedChops',
        name: 'Fried Chops',
        image: 'assets/icons/cookedchop.png',
        dcat: 'rawFood',
        isFood: true,
        onEquip: false,
        slot: 'foodSlot',
        heals: 2,
        dlvl: 1,
        sellPrice: 4,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'searedGame',
        name: 'Seared Game',
        image: 'assets/icons/cookedgame.png',
        dcat: 'rawFood',
        isFood: true,
        onEquip: false,
        slot: 'foodSlot',
        heals: 3,
        dlvl: 3,
        sellPrice: 5,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'flankSteak',
        name: 'Flank Steak',
        image: 'assets/icons/cookedsteak.png',
        dcat: 'rawFood',
        isFood: true,
        onEquip: false,
        slot: 'foodSlot',
        heals: 7,
        dlvl: 5,
        sellPrice: 19,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'shelledCrisps',
        name: 'Shelled Crisps',
        image: 'assets/icons/cookedbug.png',
        dcat: 'rawFood',
        isFood: true,
        onEquip: false,
        slot: 'foodSlot',
        heals: 14,
        dlvl: 8,
        sellPrice: 27,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meal1',
        name: 'Barkchew',
        flavor: 'Fully of chewy goodness.',
        image: 'assets/icons/chew.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        slot: 'foodSlot',
        heals: 1,
        dlvl: 1,
        sellPrice: 1,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meal2',
        name: 'Flax Bread',
        flavor: 'Neither thick nor fried.',
        image: 'assets/icons/bread.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        slot: 'foodSlot',
        heals: 2,
        dlvl: 2,
        sellPrice: 5,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meal3',
        name: 'Berry Pie',
        flavor: 'Berries, now less portable.',
        image: 'assets/icons/berrypie.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        slot: 'foodSlot',
        heals: 4,
        dlvl: 3,
        sellPrice: 14,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meal4',
        name: 'Glazed Chops',
        image: 'assets/icons/meal4.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        slot: 'foodSlot',
        heals: 6,
        dlvl: 4,
        sellPrice: 29,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meal5',
        name: 'Flatcake',
        image: 'assets/icons/meal5.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        slot: 'foodSlot',
        heals: 8,
        dlvl: 5,
        sellPrice: 40,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meal6',
        name: 'Sticky Game',
        image: 'assets/icons/meal6.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        slot: 'foodSlot',
        heals: 10,
        dlvl: 6,
        sellPrice: 48,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meal7',
        name: 'Flank Bun',
        image: 'assets/icons/meal7.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        slot: 'foodSlot',
        heals: 12,
        dlvl: 7,
        sellPrice: 60,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meal8',
        name: 'Shell Cake',
        image: 'assets/icons/meal8.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        slot: 'foodSlot',
        heals: 15,
        dlvl: 8,
        sellPrice: 95,
        count: 0,
        totalCount: 0,
      },
    ],
    resourceItems: [
      {
        id: 'money',
        name: 'Argal Coins',
        flavor: 'Minted, but not minty.',
        image: 'assets/icons/coins.png',
        dcat: 'money',
        dlvl: 1,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'rune1',
        name: 'Pale Clay',
        flavor: 'Buzzing with anticipation of future shapes.',
        image: 'assets/icons/rune1.png',
        dcat: 'magic',
        dlvl: 1,
        sellPrice: 3,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'rune2',
        name: 'Pure Oil',
        flavor: 'Cleaner than rain, thicker than blood.',
        image: 'assets/icons/rune2.png',
        dcat: 'magic',
        dlvl: 2,
        sellPrice: 5,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'rune3',
        name: 'Nitor',
        flavor: 'Scarfs of fire, freshly caught.',
        image: 'assets/icons/rune3.png',
        dcat: 'magic',
        dlvl: 3,
        sellPrice: 11,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'rune4',
        name: 'Spelldew',
        image: 'assets/icons/rune4.png',
        dcat: 'magic',
        dlvl: 4,
        sellPrice: 13,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'rune5',
        name: 'Cinnabar',
        image: 'assets/icons/rune5.png',
        dcat: 'magic',
        dlvl: 5,
        sellPrice: 17,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'rune6',
        name: 'Vis',
        image: 'assets/icons/rune6.png',
        dcat: 'magic',
        dlvl: 6,
        sellPrice: 20,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'rune7',
        name: 'Sparksalt',
        image: 'assets/icons/rune7.png',
        dcat: 'magic',
        dlvl: 7,
        sellPrice: 24,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'rune8',
        name: 'Flux Crystal',
        image: 'assets/icons/rune8.png',
        dcat: 'magic',
        dlvl: 8,
        sellPrice: 30,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'plant1',
        name: 'Oakbark',
        flavor: 'More oak than bark.',
        image: 'assets/icons/oak.png',
        dcat: 'living',
        dlvl: 1,
        sellPrice: 2,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'plant2',
        name: 'Sunflax',
        flavor: 'Edible seeds and less edible stalks.',
        image: 'assets/icons/flax.png',
        dcat: 'living',
        dlvl: 2,
        sellPrice: 4,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'plant3',
        name: 'Mossberry',
        flavor: 'Sweet juice gathered from unrolled stones.',
        image: 'assets/icons/berry.png',
        dcat: 'living',
        dlvl: 3,
        sellPrice: 7,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'plant4',
        name: 'Snow Cotton',
        image: 'assets/icons/plant4.png',
        dcat: 'living',
        dlvl: 4,
        sellPrice: 10,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'plant5',
        name: 'Rosemilk',
        image: 'assets/icons/plant5.png',
        dcat: 'living',
        dlvl: 5,
        sellPrice: 12,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'plant6',
        name: 'Drip Maple',
        image: 'assets/icons/plant6.png',
        dcat: 'living',
        dlvl: 6,
        sellPrice: 15,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'plant7',
        name: 'Siris Silk',
        image: 'assets/icons/plant7.png',
        dcat: 'living',
        dlvl: 7,
        sellPrice: 18,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'plant8',
        name: 'Sweet Cane',
        image: 'assets/icons/plant8.png',
        dcat: 'living',
        dlvl: 8,
        sellPrice: 20,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ore1',
        name: 'Copper Ore',
        flavor: "Old green rocks.",
        image: 'assets/icons/copperore.png',
        dcat: 'ore',
        dlvl: 1,
        sellPrice: 4,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ore2',
        name: 'Tin Ore',
        flavor: "Bronze's best kept secret.",
        image: 'assets/icons/tinore.png',
        dcat: 'ore',
        dlvl: 2,
        sellPrice: 7,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ore3',
        name: 'Amber',
        flavor: 'Old plant blood.',
        image: 'assets/icons/amber.png',
        dcat: 'ore',
        dlvl: 3,
        sellPrice: 19,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ore4',
        name: 'Iron Ore',
        image: 'assets/icons/ore4.png',
        dcat: 'ore',
        dlvl: 4,
        sellPrice: 10,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ore5',
        name: 'Silver Ore',
        image: 'assets/icons/ore5.png',
        dcat: 'ore',
        dlvl: 5,
        sellPrice: 25,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ore6',
        name: 'Sandstone',
        image: 'assets/icons/ore6.png',
        dcat: 'ore',
        dlvl: 6,
        sellPrice: 14,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ore7',
        name: 'Coal',
        image: 'assets/icons/ore7.png',
        dcat: 'ore',
        dlvl: 7,
        sellPrice: 16,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ore8', //probably give mining an image: '' and use it if it has it
        name: 'fakegem',
        extra: 'buggy bud shudnt hav dis :(',
        image: 'assets/icons/ore8.png',
        dcat: 'ore',
        dlvl: 8,
        sellPrice: 1,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ore9',
        name: 'Cobalt Ore',
        image: 'assets/icons/ore7.png',
        dcat: 'ore',
        dlvl: 9,
        sellPrice: 22,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bar1',
        name: 'Copper Ingot',
        flavor: "The green means it's been aged properly.",
        image: 'assets/icons/copperingot16.png',
        dcat: 'bar',
        dlvl: 1,
        sellPrice: 5,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bar2',
        name: 'Bronze Ingot',
        flavor: "Once the height of metallurgy.",
        image: 'assets/icons/bronzeingot16.png',
        dcat: 'bar',
        dlvl: 2,
        sellPrice: 14,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bar3',
        name: 'Iron Ingot',
        image: 'assets/icons/ironingot16.png',
        dcat: 'bar',
        dlvl: 4,
        sellPrice: 24,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bar4',
        name: 'Silver Ingot',
        image: 'assets/icons/silveringot16.png',
        dcat: 'lux',
        dlvl: 5,
        sellPrice: 35,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bar5',
        name: 'Steel Ingot',
        image: 'assets/icons/steelingot16.png',
        dcat: 'bar',
        dlvl: 7,
        sellPrice: 28,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bar6',
        name: 'Mythril Ingot',
        image: 'assets/icons/mythrilingot16.png',
        dcat: 'bar',
        dlvl: 9,
        sellPrice: 40,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'yellowGem',
        name: 'Pyrite',
        flavor: 'Clever crystal.',
        image: 'assets/icons/gemyellow.png',
        dcat: 'lux',
        dlvl: 5,
        sellPrice: 65,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'pinkGem',
        name: 'Spinel',
        flavor: "Pink's best friend.",
        image: 'assets/icons/gempink.png',
        dcat: 'lux',
        dlvl: 5,
        sellPrice: 80,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'redGem',
        name: 'Ruby',
        flavor: 'Direct and feisty.',
        image: 'assets/icons/gemred.png',
        dcat: 'lux',
        dlvl: 10,
        sellPrice: 140,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'greenGem',
        name: 'Emerald',
        flavor: 'Imperial focus.',
        image: 'assets/icons/gemgreen.png',
        dcat: 'lux',
        dlvl: 10,
        sellPrice: 180,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'blueGem',
        name: 'Sapphire',
        flavor: 'Concentrated patience.',
        image: 'assets/icons/gemblue.png',
        dcat: 'lux',
        dlvl: 10,
        sellPrice: 210,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'glassBar',
        name: 'Glass',
        image: 'assets/icons/glassingot16.png',
        dcat: 'lux',
        dlvl: 1,
        sellPrice: 5,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'hide1',
        name: 'Wool',
        flavor: 'Yarn in a convenient ball.',
        image: 'assets/icons/wool.png',
        dcat: 'hide',
        dlvl: 1,
        sellPrice: 3,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'hide2',
        name: 'Fur',
        flavor: 'Tufts of tough fluff.',
        image: 'assets/icons/fur.png',
        dcat: 'hide',
        dlvl: 2,
        sellPrice: 5,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'hide3',
        name: 'Leather',
        image: 'assets/icons/hide3.png',
        dcat: 'hide',
        dlvl: 4,
        sellPrice: 12,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'hide4',
        name: 'Hide',
        image: 'assets/icons/hide4.png',
        dcat: 'hide',
        dlvl: 6,
        sellPrice: 15,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'hide5',
        name: 'Carapace',
        image: 'assets/icons/hide5.png',
        dcat: 'hide',
        dlvl: 8,
        sellPrice: 9,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'antler',
        name: 'Antlers',
        flavor: "The renewable part of the deer.",
        image: 'assets/icons/antler.png',
        dcat: 'ingredient',
        dlvl: 1,
        sellPrice: 6,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'hogTusk',
        name: 'Tusks',
        flavor: "Luxury teeth.",
        image: 'assets/icons/tusk.png',
        dcat: 'ingredient',
        dlvl: 2,
        sellPrice: 4,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'feather',
        name: 'Feathers',
        flavor: "The smallest kind of wing.",
        image: 'assets/icons/feather.png',
        dcat: 'ingredient',
        dlvl: 1,
        sellPrice: 1,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'goatHorn',
        name: 'Horns',
        flavor: "Sounds worse than its reputation suggests.",
        image: 'assets/icons/horn.png',
        dcat: 'ingredient',
        dlvl: 4,
        sellPrice: 9,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'oxTail',
        name: 'Oxtail',
        flavor: "Bulk stock of tail dock.",
        image: 'assets/icons/testIcon16.png',
        dcat: 'ingredient',
        dlvl: 5,
        sellPrice: 10,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'slothClaws',
        name: 'Claws',
        flavor: "A group of these is called a contract.",
        image: 'assets/icons/claw.png',
        dcat: 'ingredient',
        dlvl: 7,
        sellPrice: 24,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'carmine',
        name: 'Carmine',
        flavor: "The violent pigment.",
        image: 'assets/icons/testIcon16.png',
        dcat: 'ingredient',
        dlvl: 10,
        sellPrice: 32,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'scarabVenom',
        name: 'Acid Sac',
        flavor: "Fun to squish before the burning sets in.",
        image: 'assets/icons/venomsac.png',
        dcat: 'ingredient',
        dlvl: 3,
        sellPrice: 20,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bones1',
        name: 'Animal Bones',
        flavor: "Proof of death.",
        image: 'assets/icons/bones1.png',
        dcat: 'remains',
        dlvl: 1,
        sellPrice: 3,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bones2',
        name: 'Kin Bones',
        flavor: "Not the most pleasant collection.",
        image: 'assets/icons/bones2.png',
        dcat: 'remains',
        dlvl: 2,
        sellPrice: 2,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bones3',
        name: 'Noble Bones',
        flavor: "Hardened remains.",
        image: 'assets/icons/bones3.png',
        dcat: 'dust',
        dlvl: 4,
        sellPrice: 40,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'xylem1',
        name: 'Xylem Roots',
        flavor: "Memories of plants.",
        image: 'assets/icons/roots1.png',
        dcat: 'remains',
        dlvl: 2,
        sellPrice: 6,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ashes1',
        name: 'Fading Dust',
        flavor: "Barely better than normal dust.",
        image: 'assets/icons/dust1.png',
        dcat: 'dust',
        dlvl: 2,
        sellPrice: 7,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ashes2',
        name: 'Glowing Dust',
        flavor: "A pile of unstructured magic.",
        image: 'assets/icons/dust2.png',
        dcat: 'dust',
        dlvl: 5,
        sellPrice: 22,
        count: 0,
        totalCount: 0,
      },
    ],
    mechanicsItems: [
      {
        id: 'parts1',
        name: 'Simple Pieces',
        image: 'assets/icons/parts1.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'parts2',
        name: 'Organic Pieces',
        image: 'assets/icons/parts2.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'parts3',
        name: 'Metallic Pieces',
        image: 'assets/icons/parts3.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'parts4',
        name: 'Energetic Pieces',
        image: 'assets/icons/parts4.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'components1',
        name: 'Practical Components',
        image: 'assets/icons/components1.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'components2',
        name: 'Direct Components',
        image: 'assets/icons/components2.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'components3',
        name: 'Protective Components',
        image: 'assets/icons/components3.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'components4',
        name: 'Precious Components',
        image: 'assets/icons/components4.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'components5',
        name: 'Catalytic Components',
        image: 'assets/icons/components5.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'components6',
        name: 'Hearty Components',
        image: 'assets/icons/components6.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'components7',
        name: 'Ancient Components',
        image: 'assets/icons/components7.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'components8',
        name: 'Ethereal Components',
        image: 'assets/icons/components8.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'word1',
        name: 'Ac',
        extra: '+25% acid chance',
        image: 'assets/icons/testIcon16.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'word2',
        name: 'Mur',
        extra: '+10% damage and accuracy to kin',
        image: 'assets/icons/testIcon16.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'word3',
        name: 'Va',
        extra: '+10% catalyst preservation',
        image: 'assets/icons/testIcon16.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'word4',
        name: 'Kon',
        extra: '+5% max hit',
        image: 'assets/icons/testIcon16.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'word5',
        name: 'Lif',
        extra: '+5% attack speed',
        image: 'assets/icons/testIcon16.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'word6',
        name: 'Olo',
        extra: '+25% slow chance',
        image: 'assets/icons/testIcon16.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'word7',
        name: 'Un',
        extra: '+10% damage and accuracy to animals',
        image: 'assets/icons/testIcon16.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'word8',
        name: 'Hol',
        extra: '+10% potion preservation',
        image: 'assets/icons/testIcon16.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'word9',
        name: 'Sii',
        extra: '+5% min hit',
        image: 'assets/icons/testIcon16.png',
        count: 0,
        totalCount: 0,
      },
      {
        id: 'word10',
        name: 'Xr',
        extra: '+1 base damage',
        image: 'assets/icons/testIcon16.png',
        count: 0,
        totalCount: 0,
      },
    ],
    totaldcat: {
      device: 0,
      tool: 0,
      toolWeapon: 0,

      meleeWeapon: 0,
      meleeArmor: 0,
      rangedWeapon: 0,
      rangedArmor: 0,
      magicWeapon: 0,
      magicArmor: 0,
      jewellery: 0,
      prayer: 0,

      oil: 0,
      ammo: 0,
      charge: 0,

      rawFood: 0,
      cookedFood: 0,
      potion: 0,

      money: 0,
      magic: 0,
      living: 0,
      ore: 0,
      hide: 0,

      bar: 0,
      lux: 0,
      ingredient: 0,
      remains: 0,
      dust: 0,
    },
    pendingParts: [
      //simple, organic, metallic, energetic
      0,0,0,0,
      //practical, direct, protective, precious, catalytic, hearty, ancient, ethereal
      0,0,0,0,0,0,0,0,
    ],
  }),
  getters: {
    getAllEquipment() {
      return this.equipmentItems
    },
    getAllConsumable() {
      return this.consumableItems
    },
    getAllResources() {
      return this.resourceItems
    },
    getAllMechanics() {
      return this.mechanicsItems
    },
    getAllFoodWithCount() {
      return this.consumableItems.filter(e => e.isFood === true && e.count > 0)
    },
  },
  actions: {
    saveAll() {
      localStorage.setItem('item-preStance', JSON.stringify(this.preStance))
      localStorage.setItem('item-aggStance', JSON.stringify(this.aggStance))
      localStorage.setItem('item-defStance', JSON.stringify(this.defStance))

      localStorage.setItem('item-equippedCombat', JSON.stringify(this.equippedCombat))
      // localStorage.setItem('item-equippedCivies', JSON.stringify(this.equippedCivies))
      localStorage.setItem('item-equippedTools', JSON.stringify(this.equippedTools))

      let tempEquipmentItems = []
      for (let i in this.equipmentItems) {
        tempEquipmentItems[i] = {
          id: this.equipmentItems[i].id,
          count: this.equipmentItems[i].count,
          totalCount: this.equipmentItems[i].totalCount,
        }
      }
      localStorage.setItem('item-equipmentItems', JSON.stringify(tempEquipmentItems))
      tempEquipmentItems = null

      let tempConsumableItems = []
      for (let i in this.consumableItems) {
        tempConsumableItems[i] = {
          id: this.consumableItems[i].id,
          count: this.consumableItems[i].count,
          totalCount: this.consumableItems[i].totalCount,
        }
      }
      localStorage.setItem('item-consumableItems', JSON.stringify(tempConsumableItems))
      tempConsumableItems = null

      let tempResourceItems = []
      for (let i in this.resourceItems) {
        tempResourceItems[i] = {
          id: this.resourceItems[i].id,
          count: this.resourceItems[i].count,
          totalCount: this.resourceItems[i].totalCount,
        }
      }
      localStorage.setItem('item-resourceItems', JSON.stringify(tempResourceItems))
      tempResourceItems = null

      let tempMechanicsItems = []
      for (let i in this.mechanicsItems) {
        tempMechanicsItems[i] = {
          id: this.mechanicsItems[i].id,
          count: this.mechanicsItems[i].count,
          totalCount: this.mechanicsItems[i].totalCount,
        }
      }
      localStorage.setItem('item-mechanicsItems', JSON.stringify(tempMechanicsItems))
      tempMechanicsItems = null
    },
    loadAll() {
      this.preStance = JSON.parse(localStorage.getItem('item-preStance'))
      this.aggStance = JSON.parse(localStorage.getItem('item-aggStance'))
      this.defStance = JSON.parse(localStorage.getItem('item-defStance'))
      // this.equippedCivies = JSON.parse(localStorage.getItem('item-equippedCivies'))

      let tempObject = {}
      //loops sets makes the saved object a real object, fixing a double equip/old stats bug
      let tempEquippedCombat = JSON.parse(localStorage.getItem('item-equippedCombat'))
      for (let i in tempEquippedCombat) {
        this.quickEquipCombat(tempEquippedCombat[i])
      }
      tempEquippedCombat = null

      let tempEquippedTools = JSON.parse(localStorage.getItem('item-equippedTools'))
      for (let i in tempEquippedTools) {
        if (undefined != tempEquippedTools[i].dlvl) {
          this.quickEquipTool(tempEquippedTools[i])
        }
      }
      tempEquippedTools = null

      let tempEquipmentItems = JSON.parse(localStorage.getItem('item-equipmentItems'))
      for (let i in tempEquipmentItems) {
        tempObject = this.equipmentItems.find(t => t.id === tempEquipmentItems[i].id)
        if (undefined != tempEquipmentItems[i].count) {
          tempObject.count = tempEquipmentItems[i].count ?? 0
          tempObject.totalCount = tempEquipmentItems[i].totalCount ?? 0
        }
      }
      tempEquipmentItems = null

      let tempConsumableItems = JSON.parse(localStorage.getItem('item-consumableItems'))
      for (let i in tempConsumableItems) {
        tempObject = this.consumableItems.find(t => t.id === tempConsumableItems[i].id)
        if (undefined != tempConsumableItems[i].count) {
          tempObject.count = tempConsumableItems[i].count ?? 0
          tempObject.totalCount = tempConsumableItems[i].totalCount ?? 0
        }
      }
      tempConsumableItems = null

      let tempResourceItems = JSON.parse(localStorage.getItem('item-resourceItems'))
      for (let i in tempResourceItems) {
        tempObject = this.resourceItems.find(t => t.id === tempResourceItems[i].id)
        if (undefined != tempResourceItems[i].count) {
          tempObject.count = tempResourceItems[i].count ?? 0
          tempObject.totalCount = tempResourceItems[i].totalCount ?? 0
        }
      }
      tempResourceItems = null

      let tempMechanicsItems = JSON.parse(localStorage.getItem('item-mechanicsItems'))
      for (let i in tempMechanicsItems) {
        tempObject = this.mechanicsItems.find(t => t.id === tempMechanicsItems[i].id)
        if (undefined != tempMechanicsItems[i].count) {
          tempObject.count = tempMechanicsItems[i].count ?? 0
          tempObject.totalCount = tempMechanicsItems[i].totalCount ?? 0
        }
      }
      tempMechanicsItems = null

      tempObject = null
      this.updateEquippedStats()
    },
    
    changeItemCount(itemID, amount, itemCat) {
      //if no change, then do nothing
      if (amount == 0) {
        return
      }

      let itemToAddCount
      //if we got a category, use it
      if (itemCat) {
        itemToAddCount = this[itemCat].find(t => t.id === itemID)
      } else {
        //look in resource items
        itemToAddCount = this.resourceItems.find(t => t.id === itemID)
        //look in consumable items
        if (itemToAddCount == undefined) {
          itemToAddCount = this.consumableItems.find(t => t.id === itemID)
        }
        //look in equipment items
        if (itemToAddCount == undefined) {
          itemToAddCount = this.equipmentItems.find(t => t.id === itemID)
        }
        //look in mechanics items
        if (itemToAddCount == undefined) {
          itemToAddCount = this.mechanicsItems.find(t => t.id === itemID)
        }
      }

      //give up and report the error
      if (itemToAddCount == undefined) {
        console.error('failed to add item ' + itemID)
        return false
      }
      //let player see the hoard for the first time
      if (skillStore().flags.showHoard != true) {
        skillStore().flags.showHoard = true
      }

      //can't have negative apples
      if (itemToAddCount.count + amount < 0) { return false }

      //explain what you're doing
      if (amount > 0) {
        // console.log('hoarding ' + amount + ' ' + itemToAddCount.name)
      } else {
        // console.log('losing ' + amount + ' ' + itemToAddCount.name)
      }

      //finally add the item, and update its total count if its positive
      itemToAddCount.count += amount
      if (amount > 0) {
        itemToAddCount.totalCount += amount
      }
    },
    addWord(level) {
      skillStore().unlockedWords()
      this.changeItemCount('word' + Math.ceil(Math.random() * level), 1, 'mechanicsItems')
    },

    hasItemCount(itemID, amount, itemCat) {
      let itemToAddCount = this[itemCat].find(t => t.id === itemID)
      //not enough items
      if (itemToAddCount.count - amount < 0) { 
        // console.log('not enough boop')
        return false
      }
      return true
    },

    getItemImage(itemID, itemCat) {
      let temp

      if (itemCat) {
        temp = this[itemCat].find(t => t.id === itemID)
      } else {
        //look in resource items
        temp = this.resourceItems.find(t => t.id === itemID)
        //look in mechanics items
        if (temp == undefined) {
          temp = this.mechanicsItems.find(t => t.id === itemID)
        }
        //look in consumable items
        if (temp == undefined) {
          temp = this.consumableItems.find(t => t.id === itemID)
        }
        //look in equipment items
        if (temp == undefined) {
          temp = this.equipmentItems.find(t => t.id === itemID)
        }
      }

      //give up and report the error
      if (temp == undefined) {
        console.error('failed find item image: ' + itemID)
        return '/assets/icons/testIcon16.png'
      }
      return temp.image
    },
    getItemName(itemID, itemCat) {
      let temp

      if (itemCat) {
        temp = this[itemCat].find(t => t.id === itemID)
      } else {
        //look in resource items
        temp = this.resourceItems.find(t => t.id === itemID)
        //look in mechanics items
        if (temp == undefined) {
          temp = this.mechanicsItems.find(t => t.id === itemID)
        }
        //look in consumable items
        if (temp == undefined) {
          temp = this.consumableItems.find(t => t.id === itemID)
        }
        //look in equipment items
        if (temp == undefined) {
          temp = this.equipmentItems.find(t => t.id === itemID)
        }
      }

      //give up and report the error
      if (temp == undefined) {
        console.error('failed find item name: ' + itemID)
        return 'no name'
      }
      return temp.name
    },
    getItemCount(itemID, itemCat) {
      let temp

      if (itemCat) {
        temp = this[itemCat].find(t => t.id === itemID)
      } else {
        //look in resource items
        temp = this.resourceItems.find(t => t.id === itemID)
        //look in mechanics items
        if (temp == undefined) {
          temp = this.mechanicsItems.find(t => t.id === itemID)
        }
        //look in consumable items
        if (temp == undefined) {
          temp = this.consumableItems.find(t => t.id === itemID)
        }
        //look in equipment items
        if (temp == undefined) {
          temp = this.equipmentItems.find(t => t.id === itemID)
        }
      }

      //give up and report the error
      if (temp == undefined) {
        console.error('failed find item count: ' + itemID)
        return 0
      }
      return temp.count
    },
    getItemData(itemID, itemCat) {
      let temp

      if (itemCat) {
        temp = this[itemCat].find(t => t.id === itemID)
      } else {
        //look in resource items
        temp = this.resourceItems.find(t => t.id === itemID)
        //look in mechanics items
        if (temp == undefined) {
          temp = this.mechanicsItems.find(t => t.id === itemID)
        }
        //look in consumable items
        if (temp == undefined) {
          temp = this.consumableItems.find(t => t.id === itemID)
        }
        //look in equipment items
        if (temp == undefined) {
          temp = this.equipmentItems.find(t => t.id === itemID)
        }
      }

      //give up and report the error
      if (temp == undefined) {
        console.error('failed find item data: ' + itemID)
      }
      return temp
    },

    totalUpDCAT() {
      for (let i in this.totaldcat) {
        this.totaldcat[i] = 0
      }
      for (let i in this.equipmentItems) {
        if (this.equipmentItems[i].dcat != undefined) {
          this.totaldcat[this.equipmentItems[i].dcat] += this.equipmentItems[i].dlvl * this.equipmentItems[i].count
        }
      }
      for (let i in this.consumableItems) {
        if (this.consumableItems[i].dcat != undefined) {
          this.totaldcat[this.consumableItems[i].dcat] += this.consumableItems[i].dlvl * this.consumableItems[i].count
        }
      }
      for (let i in this.resourceItems) {
        if (this.resourceItems[i].dcat != undefined) {
          this.totaldcat[this.resourceItems[i].dcat] += this.resourceItems[i].dlvl * this.resourceItems[i].count
        }
      }
      this.pendingParts[0] = Math.ceil(this.totaldcat.money / 10) + this.totaldcat.device

      let organic = 0
      organic += Math.ceil(this.totaldcat.ingredient / 50)
      organic += Math.ceil(this.totaldcat.hide / 50)
      organic += Math.ceil(this.totaldcat.rawFood / 50)
      organic += Math.ceil(this.totaldcat.remains / 50)
      organic += Math.ceil(this.totaldcat.living / 10)
      organic += Math.ceil(this.totaldcat.cookedFood / 10)
      organic += this.totaldcat.rangedWeapon
      organic += this.totaldcat.rangedArmor
      organic += this.totaldcat.device
      this.pendingParts[1] = organic

      let metallic = 0
      metallic += Math.ceil(this.totaldcat.ammo / 100)
      metallic += Math.ceil(this.totaldcat.ore / 10)
      metallic += Math.ceil(this.totaldcat.lux / 5)
      metallic += Math.ceil(this.totaldcat.bar / 5)
      metallic += this.totaldcat.tool
      metallic += this.totaldcat.toolWeapon
      metallic += this.totaldcat.meleeWeapon
      metallic += this.totaldcat.meleeArmor
      metallic += this.totaldcat.device
      this.pendingParts[2] = metallic

      let energetic = 0
      energetic += Math.ceil(this.totaldcat.charge / 100)
      energetic += Math.ceil(this.totaldcat.oil / 100)
      energetic += Math.ceil(this.totaldcat.potion / 100)
      energetic += Math.ceil(this.totaldcat.dust / 50)
      energetic += Math.ceil(this.totaldcat.magic / 10)
      energetic += this.totaldcat.magicWeapon
      energetic += this.totaldcat.magicArmor
      energetic += this.totaldcat.jewellery
      energetic += this.totaldcat.device
      this.pendingParts[3] = energetic

      let practical = 0
      practical += Math.ceil(this.totaldcat.tool / 10)
      practical += Math.ceil(this.totaldcat.toolWeapon / 10)
      this.pendingParts[4] = practical

      let direct = 0
      direct += Math.ceil(this.totaldcat.meleeWeapon / 10)
      direct += Math.ceil(this.totaldcat.rangedWeapon / 10)
      direct += Math.ceil(this.totaldcat.magicWeapon / 10)
      this.pendingParts[5] = direct

      let protective = 0
      protective += Math.ceil(this.totaldcat.meleeArmor / 10)
      protective += Math.ceil(this.totaldcat.rangedArmor / 10)
      protective += Math.ceil(this.totaldcat.magicArmor / 10)
      this.pendingParts[6] = protective

      let precious = 0
      precious += Math.ceil(this.totaldcat.lux / 50)
      precious += Math.ceil(this.totaldcat.jewellery / 10)
      this.pendingParts[7] = precious

      let catalytic = 0
      catalytic += Math.ceil(this.totaldcat.potion / 1000)
      catalytic += Math.ceil(this.totaldcat.oil / 1000)
      catalytic += Math.ceil(this.totaldcat.ammo / 1000)
      catalytic += Math.ceil(this.totaldcat.charge / 1000)
      this.pendingParts[8] = catalytic

      let hearty = 0
      hearty += Math.ceil(this.totaldcat.rawFood / 5000)
      hearty += Math.ceil(this.totaldcat.cookedFood / 1000)
      this.pendingParts[9] = hearty

      let ancient = 0
      this.pendingParts[10] = ancient

      let ethereal = 0
      ethereal += Math.ceil(this.totaldcat.remains / 500)
      ethereal += Math.ceil(this.totaldcat.dust / 100)
      ethereal += Math.ceil(this.totaldcat.prayer / 10)
      this.pendingParts[11] = ethereal

    },
    resetTheLoop() {
      //unequip all items
      for (let i in this.equippedCombat) {
        this.equippedCombat[i].onEquip = false
        this.equippedCombat[i] = {}
      }
      for (let i in this.equippedTools) {
        this.equippedTools[i].onEquip = false
        this.equippedTools[i] = this.defaultTools[i]
      }
      this.updateEquippedStats()
      //give timeless items
      this.totalUpDCAT()
      for (let i in this.pendingParts) {
        this.mechanicsItems[i].count += this.pendingParts[i]
        this.mechanicsItems[i].totalCount += this.pendingParts[i]
      }
      //remove all other items
      for (let i in this.equipmentItems) {
        this.equipmentItems[i].count = 0
      }
      for (let i in this.consumableItems) {
        this.consumableItems[i].count = 0
      }
      for (let i in this.resourceItems) {
        this.resourceItems[i].count = 0
      }
      this.totalUpDCAT()
    },

    //does not update stats, does not swap, dangerous
    quickEquipCombat(item) {
      if (item.isCombat == true) {
        let itemIn = this.equipmentItems.find(t => t.id === item.id)
        itemIn.onEquip = true
        this.equippedCombat[itemIn.slot] = itemIn
        return
      }
      if (item.isFood == true) {
        let itemIn = this.consumableItems.find(t => t.id === item.id)
        itemIn.onEquip = true
        this.equippedCombat.foodSlot = itemIn
      }
    },
    quickEquipTool(item) {
      let itemIn = this.equipmentItems.find(t => t.id === item.id)
      itemIn.onEquip = true
      this.equippedTools[itemIn.toolSlot] = itemIn
    },
    //messy way to equip items, done before knowing how objects worked
    //very messy
    equipItem(item) {
      if (item.isTool == true) {
        let itemToSwap = item
        let itemOut = this.equippedTools[itemToSwap.toolSlot]
        //if itemOut is samed as equipped, unequip and equip default
        if (itemToSwap == itemOut) {
          this.equippedTools[itemToSwap.toolSlot] = this.defaultTools[itemToSwap.toolSlot]
          //if itemOut is also combat, check if equipped elsewhere, otherwise unequip
          if (itemOut.isCombat) {
            itemOut.onEquip = this.checkIfCombatToolEquipped(itemOut)
          } else {
            itemOut.onEquip = false
          }
          return
        }
        //replace itemOut
        this.equippedTools[itemToSwap.toolSlot] = itemToSwap
        //check if itemOut isTool and isCombat, check if still equipped elsewhere, otherwise unequip
        if (itemOut.isCombat != undefined) {
          itemOut.onEquip = this.checkIfCombatToolEquipped(itemOut)
        } else {
          itemOut.onEquip = false
        }
        //equip new item
        itemToSwap.onEquip = true
        return
      }

      if (item.isCombat == true) {
        let itemToSwap = item
        let itemOut = this.equippedCombat[itemToSwap.slot]

        //if item is samed as equipped, unequip and equip default
        if (itemToSwap == itemOut) {
          //if itemOut is also tool, check if equipped elsewhere, otherwise unequip
          if (itemOut.isTool) {
            itemOut.onEquip = this.checkIfCombatToolEquipped(itemOut)
          } else {
            itemOut.onEquip = false
          }
          this.equippedCombat[itemToSwap.slot] = {}
          this.updateEquippedStats()
          return
        }

        //replace itemOut
        this.equippedCombat[itemToSwap.slot] = itemToSwap
        //if itemOut is also tool, check if equipped elsewhere, otherwise unequip
        if (itemOut.isTool) {
          itemOut.onEquip = this.checkIfCombatToolEquipped(itemOut)
        } else {
          itemOut.onEquip = false
        }
        //equip new item
        itemToSwap.onEquip = true
        this.updateEquippedStats()
        return
      }

      if (item.isFood == true) {
        let itemToSwap = item
        let itemOut = this.equippedCombat.foodSlot

        //if item is samed as equipped, unequip
        if (itemToSwap == itemOut) {
          itemOut.onEquip = false
          this.equippedCombat.foodSlot = {}
          return
        }

        //unequip old item
        itemOut.onEquip = false
        itemToSwap.onEquip = true

        this.equippedCombat.foodSlot = itemToSwap
        return
      }
    },
    equipCombatTool(item) {
      if (item.isCombat == true) {
        let itemToSwap = item
        let itemOut = this.equippedCombat[itemToSwap.slot]

        //if item is samed as equipped, unequip and equip default
        if (itemToSwap == itemOut) {
          this.equippedCombat[itemToSwap.slot] = {}
          if (itemOut.isTool != undefined) {
            itemOut.onEquip = this.checkIfCombatToolEquipped(itemOut)
          } else {
            itemOut.onEquip = false
          }
          this.updateEquippedStats()
          return
        }

        this.equippedCombat[itemToSwap.slot] = itemToSwap
        //check if itemOut is still equipped elsewhere
        if (itemOut.isTool != undefined) {
          itemOut.onEquip = this.checkIfCombatToolEquipped(itemOut)
        } else {
          itemOut.onEquip = false
        }
        itemToSwap.onEquip = true
        this.updateEquippedStats()
        return
      }
      if (item.isFood == true) {
        let itemToSwap = item
        let itemOut = this.equippedCombat.foodSlot

        //if item is samed as equipped, unequip
        if (itemToSwap == itemOut) {
          itemOut.onEquip = false
          this.equippedCombat.foodSlot = {}
          return
        }

        //unequip old item
        itemOut.onEquip = false
        itemToSwap.onEquip = true

        this.equippedCombat.foodSlot = itemToSwap
        return
      }
    },
    checkIfCombatToolEquipped(item) {
      //if item equipped in combat
      if (item.id == this.equippedCombat[item.slot].id) {
        return true
      }
      //if item is equipped in tools
      if (item.id == this.equippedTools[item.toolSlot].id) {
        return true
      }
      //did not find the item anywhere
      return false
    },

    updateEquippedStats() {
      let item = {}

      this.equippedStats.meleeDamage = 0
      this.equippedStats.rangedDamage = 0
      this.equippedStats.magicDamage = 0

      this.equippedStats.meleeAccuracy = (3 * skillStore().skills[0].level) + this.preStance
      this.equippedStats.rangedAccuracy = (3 * skillStore().skills[0].level) + this.preStance
      this.equippedStats.magicAccuracy = (3 * skillStore().skills[0].level) + this.preStance

      this.equippedStats.meleePen = 0
      this.equippedStats.rangedPen = 0
      this.equippedStats.magicPen = 0

      this.equippedStats.meleeSpeed = 2.0
      this.equippedStats.rangedSpeed = 2.0
      this.equippedStats.magicSpeed = 2.0

      this.equippedStats.meleeDodge = (3 * skillStore().skills[4].level) + this.defStance
      this.equippedStats.rangedDodge = (3 * skillStore().skills[5].level) + this.defStance
      this.equippedStats.magicDodge = (3 * skillStore().skills[6].level) + this.defStance

      this.equippedStats.physicalArmor = 0
      this.equippedStats.energyArmor = 0
      this.equippedStats.resist = 0

      //devices
      this.equippedStats.deviceArmorTotal = 0
      this.equippedStats.deviceWeapons = [0, 0, 0]

      //special
      this.equippedStats.oilPreserve = 0
      this.equippedStats.ammoPreserve = 0
      this.equippedStats.chargePreserve = 0
      this.equippedStats.poisonChance = [0, 0, 0]
      this.equippedStats.extraDropChance = 0
      this.equippedStats.slayerMitigation = 0

      //skills
      this.equippedStats.allEfficency = 0

      for (item in this.equippedCombat) {
        if (this.equippedCombat[item].stats != null) {

          //damage
          //has melee damage
          if (this.equippedCombat[item].stats.meleeDamage != null) {
            this.equippedStats.meleeDamage += this.equippedCombat[item].stats.meleeDamage
          }

          //has ranged damage
          if (this.equippedCombat[item].stats.rangedDamage != null) {

            //is not a weapon and ammo
            if (this.equippedCombat[item].slot != 'rangedSlot' && this.equippedCombat[item].slot != 'ammoSlot') {
              this.equippedStats.rangedDamage += this.equippedCombat[item].stats.rangedDamage
            }

            //if it is a weapon
            if (this.equippedCombat[item].slot == 'rangedSlot') {
              
              //if the weapon does not have required ammo
              if (this.equippedCombat[item].requiredAmmo == 'none') {
                this.equippedStats.rangedDamage += this.equippedCombat[item].stats.rangedDamage
              }

              //if the weapon has required ammo and the required ammo is equipped
              if (this.equippedCombat[item].requiredAmmo == this.equippedCombat.ammoSlot.ammoType) {
                this.equippedStats.rangedDamage += this.equippedCombat[item].stats.rangedDamage
                this.equippedStats.rangedDamage += this.equippedCombat.ammoSlot.stats.rangedDamage ?? 0
              }
            }
          }

          //has magic damage
          if (this.equippedCombat[item].stats.magicDamage != null) {
            this.equippedStats.magicDamage += this.equippedCombat[item].stats.magicDamage
          }

          //accuracy
          //has melee accuracy
          if (this.equippedCombat[item].stats.meleeAccuracy != null) {
            this.equippedStats.meleeAccuracy += this.equippedCombat[item].stats.meleeAccuracy
            //gives bonus acc if melee weapon
            if (this.equippedCombat[item].slot == 'meleeSlot') {
              this.equippedStats.meleeAccuracy += this.bonusSmithingMastery(this.equippedCombat[item])
            }
          }

          //has ranged accuracy
          if (this.equippedCombat[item].stats.rangedAccuracy != null) {
            //is not a weapon and ammo
            if (this.equippedCombat[item].slot != 'rangedSlot' && this.equippedCombat[item].slot != 'ammoSlot') {
              this.equippedStats.rangedAccuracy += this.equippedCombat[item].stats.rangedAccuracy
            }

            //if it is a weapon
            if (this.equippedCombat[item].slot == 'rangedSlot') {

              //if the weapon does not have required ammo
              if (this.equippedCombat[item].requiredAmmo == 'none') {
                this.equippedStats.rangedAccuracy += this.equippedCombat[item].stats.rangedAccuracy
              }

              //if the weapon has required ammo and the required ammo is equipped
              if (this.equippedCombat[item].requiredAmmo == this.equippedCombat.ammoSlot.ammoType) {
                this.equippedStats.rangedAccuracy += this.equippedCombat[item].stats.rangedAccuracy
                this.equippedStats.rangedAccuracy += this.equippedCombat.ammoSlot.stats.rangedAccuracy ?? 0
              }
            }
          }

          //has magic accuracy
          if (this.equippedCombat[item].stats.magicAccuracy != null) {
            this.equippedStats.magicAccuracy += this.equippedCombat[item].stats.magicAccuracy
            //gives bonus acc if magic weapon
            if (this.equippedCombat[item].slot == 'magicSlot') {
              this.equippedStats.magicAccuracy += this.bonusArificeMastery(this.equippedCombat[item])
            }
          }

          //general accuracy stat for all attack styles
          if (this.equippedCombat[item].stats.accuracy != null) {
            this.equippedStats.meleeAccuracy += this.equippedCombat[item].stats.accuracy
            this.equippedStats.rangedAccuracy += this.equippedCombat[item].stats.accuracy
            this.equippedStats.magicAccuracy += this.equippedCombat[item].stats.accuracy
          }

          //penetration
          //has melee pen
          if (this.equippedCombat[item].stats.meleePen != null) {
            this.equippedStats.meleePen += this.equippedCombat[item].stats.meleePen
          }

          //has ranged pen
          if (this.equippedCombat[item].stats.rangedPen != null) {
            //is not a weapon and ammo
            if (this.equippedCombat[item].slot != 'rangedSlot' && this.equippedCombat[item].slot != 'ammoSlot') {
              this.equippedStats.rangedPen += this.equippedCombat[item].stats.rangedPen
            }

            //if it is a weapon
            if (this.equippedCombat[item].slot == 'rangedSlot') {

              //if the weapon does not have required ammo
              if (this.equippedCombat[item].requiredAmmo == 'none') {
                this.equippedStats.rangedPen += this.equippedCombat[item].stats.rangedPen
              }

              //if the weapon has required ammo and the required ammo is equipped
              if (this.equippedCombat[item].requiredAmmo == this.equippedCombat.ammoSlot.ammoType) {
                this.equippedStats.rangedPen += this.equippedCombat[item].stats.rangedPen
                this.equippedStats.rangedPen += this.equippedCombat.ammoSlot.stats.rangedPen ?? 0
              }
            }
          }

          //has magic pen
          if (this.equippedCombat[item].stats.magicPen != null) {
            this.equippedStats.magicPen += this.equippedCombat[item].stats.magicPen
          }

          //speed
          //has melee speed
          if (this.equippedCombat[item].stats.meleeSpeed != null) {
            if (this.equippedCombat[item].slot == 'meleeSlot') {
              this.equippedStats.meleeSpeed += this.equippedCombat[item].stats.meleeSpeed - 2
            } else {
              this.equippedStats.meleeSpeed -= this.equippedCombat[item].stats.meleeSpeed
            }
          }

          //has ranged speed
          if (this.equippedCombat[item].stats.rangedSpeed != null) {
            //is not a weapon and ammo
            if (this.equippedCombat[item].slot != 'rangedSlot' && this.equippedCombat[item].slot != 'ammoSlot') {
              this.equippedStats.rangedSpeed -= this.equippedCombat[item].stats.rangedSpeed
            }

            //if it is a weapon
            if (this.equippedCombat[item].slot == 'rangedSlot') {

              //if the weapon does not have required ammo
              if (this.equippedCombat[item].requiredAmmo == 'none') {
                this.equippedStats.rangedSpeed += this.equippedCombat[item].stats.rangedSpeed - 2
              }

              //if the weapon has required ammo and the required ammo is equipped
              if (this.equippedCombat[item].requiredAmmo == this.equippedCombat.ammoSlot.ammoType) {
                this.equippedStats.rangedSpeed += this.equippedCombat[item].stats.rangedSpeed - 2
                this.equippedStats.rangedSpeed -= this.equippedCombat.ammoSlot.stats.rangedSpeed ?? 0
              }
            }
          }

          //has magic speed
          if (this.equippedCombat[item].stats.magicSpeed != null) {
            if (this.equippedCombat[item].slot == 'magicSlot') {
              this.equippedStats.magicSpeed += this.equippedCombat[item].stats.magicSpeed - 2
            } else {
              this.equippedStats.magicSpeed -= this.equippedCombat[item].stats.magicSpeed
            }
          }

          //general speed stat for all attack styles
          if (this.equippedCombat[item].stats.speed != null) {
            this.equippedStats.meleeSpeed -= this.equippedCombat[item].stats.speed
            this.equippedStats.rangedSpeed -= this.equippedCombat[item].stats.speed
            this.equippedStats.magicSpeed -= this.equippedCombat[item].stats.speed
          }

          //dodge
          //has melee dodge
          if (this.equippedCombat[item].stats.meleeDodge != null) {
            this.equippedStats.meleeDodge += this.equippedCombat[item].stats.meleeDodge + (this.bonusSmithingMastery(this.equippedCombat[item]) / 4)
          }
          //has ranged dodge
          if (this.equippedCombat[item].stats.rangedDodge != null) {
            this.equippedStats.rangedDodge += this.equippedCombat[item].stats.rangedDodge + (this.bonusSmithingMastery(this.equippedCombat[item]) / 4)
          }
          //has magic dodge
          if (this.equippedCombat[item].stats.magicDodge != null) {
            this.equippedStats.magicDodge += this.equippedCombat[item].stats.magicDodge + (this.bonusArificeMastery(this.equippedCombat[item]) / 4)
          }

          //general speed stat for all defense styles
          if (this.equippedCombat[item].stats.dodge != null) {
            this.equippedStats.meleeDodge += this.equippedCombat[item].stats.dodge
            this.equippedStats.rangedDodge += this.equippedCombat[item].stats.dodge
            this.equippedStats.magicDodge += this.equippedCombat[item].stats.dodge
          }

          //armor
          if (this.equippedCombat[item].stats.physicalArmor != null) {
            this.equippedStats.physicalArmor += this.equippedCombat[item].stats.physicalArmor
          }
          if (this.equippedCombat[item].stats.energyArmor != null) {
            this.equippedStats.energyArmor += this.equippedCombat[item].stats.energyArmor
          }
          if (this.equippedCombat[item].stats.resist != null) {
            this.equippedStats.resist += this.equippedCombat[item].stats.resist
          }

          //devices
          if (this.equippedCombat[item].dcat == 'device') {
            if (this.equippedCombat[item].slot == 'meleeSlot') {
              this.equippedStats.deviceWeapons[0] += 1
            } else if (this.equippedCombat[item].slot == 'rangedSlot') {
              this.equippedStats.deviceWeapons[1] += 1
            } else if (this.equippedCombat[item].slot == 'magicSlot') {
              this.equippedStats.deviceWeapons[2] += 1
            } else { //potential bug: will work unless a device oil/ammo/charge type is made
              this.equippedStats.deviceArmorTotal += 1
            }
          }

          //catalyst preservation
          if (this.equippedCombat[item].stats.oilPreserve != null) {
            this.equippedStats.oilPreserve += this.equippedCombat[item].stats.oilPreserve
          }
          if (this.equippedCombat[item].stats.ammoPreserve != null) {
            this.equippedStats.ammoPreserve += this.equippedCombat[item].stats.ammoPreserve
          }
          if (this.equippedCombat[item].stats.chargePreserve != null) {
            this.equippedStats.chargePreserve += this.equippedCombat[item].stats.chargePreserve
          }

          //special TODO make ranged ammo work for this
          if (this.equippedCombat[item].special != null) {
            if (this.equippedCombat[item].slot == 'meleeSlot') {
              this.equippedStats.poisonChance[0] += this.equippedCombat[item].special.poisonChance ?? 0
            }
            if (this.equippedCombat[item].slot == 'rangedSlot') {
              this.equippedStats.poisonChance[1] += this.equippedCombat[item].special.poisonChance ?? 0
            }
            if (this.equippedCombat[item].slot == 'magicSlot') {
              this.equippedStats.poisonChance[2] += this.equippedCombat[item].special.poisonChance ?? 0
            }
          }

          //drops
          if (this.equippedCombat[item].stats.slayerMitigation != null) {
            this.equippedStats.slayerMitigation += this.equippedCombat[item].stats.slayerMitigation
          }

          //drops
          if (this.equippedCombat[item].stats.extraDropChance != null) {
            this.equippedStats.extraDropChance += this.equippedCombat[item].stats.extraDropChance
          }

          //skills
          if (this.equippedCombat[item].stats.allEfficency != null) {
            this.equippedStats.allEfficency += this.equippedCombat[item].stats.allEfficency
          }
        }
      }

      //adds bonus damage to base damage
      this.equippedStats.meleeDamage = (skillStore().skills[1].level + this.aggStance) * (1 + this.equippedStats.meleeDamage)
      this.equippedStats.rangedDamage = (skillStore().skills[2].level + this.aggStance) * (1 + this.equippedStats.rangedDamage)
      this.equippedStats.magicDamage = (skillStore().skills[3].level + this.aggStance) * (1 + this.equippedStats.magicDamage)

      combatStore().resetDragonAttack()
    },

    bonusSmithingMastery(temp) {
      if (temp.mSmithing) {
        temp = smithingStore().equipmentMastery.find(t => t.id === temp.mSmithing)
        return temp.mLevel
      }
      return 0
    },
    bonusArificeMastery(temp) {
      if (temp.mArtifice) {
        temp = artificeStore().equipmentMastery.find(t => t.id === temp.mArtifice)
        return temp.mLevel
      }
      return 0
    },
  }
})