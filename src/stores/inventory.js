import { defineStore } from 'pinia'
import { useSkillStore } from '@/stores/skills';
import { useSmithingStore } from '@/stores/smithing';

export const useItemStore = defineStore('itemStore', {
  state: () => ({

    skillStore: useSkillStore(),
    smithingStore: useSmithingStore(),

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

      //special
      poisonChance: [0, 0, 0],
      moneyDrop: 0,
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
        image: 'src/assets/icons/defaultmap.png',
        dcat: 'tool',
        toolStats: {
          explorationMulti: 0.0,
        },
      },
      scryingTool: {
        id: 'defaultStylus',
        name: 'Chalk Stylus',
        image: 'src/assets/icons/defaultstylus16.png',
        toolStats: {
          syphoningTime: 2.0,
          baseStabilityBonus: 0.0,
        },
      },
      foragingTool: {
        id: 'defaultAxe',
        name: 'Rock Axe',
        image: 'src/assets/icons/defaultaxe16.png',
        toolStats: {
          locatingMultiplierAdd: 0.0,
          harvestingTimeBonus: 0.0,
        },
      },
      huntingTool: {
        id: 'defaultClaws',
        name: 'Natural Claws',
        image: 'src/assets/icons/defaultclaws16.png',
        toolStats: {
          bleeding: 1,
          instaKill: 0.0,
        },
      },
      miningTool: {
        id: 'defaultPickaxe',
        name: 'Rock Pick',
        image: 'src/assets/icons/defaultpick16.png',
        toolStats: {
          bonusDamage: 3,
          bonusPen: 0,
        },
      },
      smithingTool: {},
      cookingTool: {},
      alchemyTool: {},
    },
    defaultTools: {
      explorationTool: {
        id: 'defaultMap',
        name: 'Old Map',
        image: 'src/assets/icons/defaultmap.png',
        dcat: 'tool',
        toolStats: {
          explorationMulti: 0.0,
        },
      },
      scryingTool: {
        id: 'defaultStylus',
        name: 'Chalk Stylus',
        image: 'src/assets/icons/defaultstylus16.png',
        toolStats: {
          syphoningTime: 2.0,
          baseStabilityBonus: 0.0,
        },
      },
      foragingTool: {
        id: 'defaultAxe',
        name: 'Rock Axe',
        image: 'src/assets/icons/defaultaxe16.png',
        toolStats: {
          locatingMultiplierAdd: 0.0,
          harvestingTimeBonus: 0.0,
        },
      },
      huntingTool: {
        id: 'defaultClaws',
        name: 'Natural Claws',
        image: 'src/assets/icons/defaultclaws16.png',
        toolStats: {
          bleeding: 1,
          instaKill: 0.0,
        },
      },
      miningTool: {
        id: 'defaultPickaxe',
        name: 'Rock Pick',
        image: 'src/assets/icons/defaultpick16.png',
        toolStats: {
          bonusDamage: 3,
          bonusPen: 0,
        },
      },
      smithingTool: {},
      cookingTool: {},
      alchemyTool: {},
    },
    equipmentItems: [
      {
        id: 'koboldMap',
        name: 'Kobold Map',
        extra: 'Provides exploration XP per combat kill',
        flavor: 'Depicts the approximate location of many things.',
        image: 'src/assets/icons/koboldmap.png',
        dcat: 'tool',
        dlvl: 2,
        toolSlot: 'explorationTool',
        isTool: true,
        onToolbar: false,
        toolStats: {
          explorationMulti: 0.1,
        },
        sellPrice: 35,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'towerStylus',
        name: 'Heavy Stylus',
        flavor: 'Channel the crush of responsibilities.',
        image: 'src/assets/icons/heavystylus.png',
        dcat: 'tool',
        dlvl: 3,
        toolSlot: 'scryingTool',
        isTool: true,
        onToolbar: false,
        toolStats: {
          syphoningTime: 2.4,
          baseStabilityBonus: 0.30,
        },
        sellPrice: 30,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'copperHatchet',
        name: 'Copper Hatchet',
        image: 'src/assets/icons/copperaxe16.png',
        mSmithing: 'hatchet',
        dcat: 'meleeTool',
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
        onToolbar: false,
        toolStats: {
          locatingMultiplierAdd: 0.1,
          harvestingTimeBonus: 0.25,
        },
        sellPrice: 15,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'bronzeHatchet',
        name: 'Bronze Hatchet',
        image: 'src/assets/icons/bronzeaxe16.png',
        mSmithing: 'hatchet',
        dcat: 'meleeTool',
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
        onToolbar: false,
        toolStats: {
          locatingMultiplierAdd: 0.2,
          harvestingTimeBonus: 0.50,
        },
        sellPrice: 38,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'ironHatchet',
        name: 'Iron Hatchet',
        image: 'src/assets/icons/ironaxe16.png',
        mSmithing: 'hatchet',
        dcat: 'meleeTool',
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
        onToolbar: false,
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
        image: 'src/assets/icons/steelaxe16.png',
        mSmithing: 'hatchet',
        dcat: 'meleeTool',
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
        onToolbar: false,
        toolStats: {
          locatingMultiplierAdd: 0.4,
          harvestingTimeBonus: 0.75,
        },
        sellPrice: 72,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'copperClaws',
        name: 'Copper Claws',
        image: 'src/assets/icons/copperclaws16.png',
        mSmithing: 'claws',
        dcat: 'meleeTool',
        dlvl: 1,
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
        onToolbar: false,
        toolStats: {
          bleeding: 2,
          instaKill: 0.05,
        },
        sellPrice: 13,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'bronzeClaws',
        name: 'Bronze Claws',
        image: 'src/assets/icons/bronzeclaws16.png',
        mSmithing: 'claws',
        dcat: 'meleeTool',
        dlvl: 2,
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
        onToolbar: false,
        toolStats: {
          bleeding: 2,
          instaKill: 0.10,
        },
        sellPrice: 30,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'ironClaws',
        name: 'Iron Claws',
        image: 'src/assets/icons/ironclaws16.png',
        mSmithing: 'claws',
        dcat: 'meleeTool',
        dlvl: 4,
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
        onToolbar: false,
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
        name: 'Iron Claws',
        image: 'src/assets/icons/steelclaws16.png',
        mSmithing: 'claws',
        dcat: 'meleeTool',
        dlvl: 7,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 0,
          meleeDamage: 0.45,
          meleeSpeed: 2.0,
        },
        toolSlot: 'huntingTool',
        isTool: true,
        onToolbar: false,
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
        image: 'src/assets/icons/crystalclaws.png',
        dcat: 'meleeTool',
        dlvl: 3,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 10,
          meleeDamage: 0.35,
          meleePen: 0.10,
          meleeSpeed: 2.0,
        },
        toolSlot: 'huntingTool',
        isTool: true,
        onToolbar: false,
        toolStats: {
          bleeding: 1,
          instaKill: 0.50,
        },
        sellPrice: 55,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'copperPickaxe',
        name: 'Copper Pickaxe',
        image: 'src/assets/icons/copperpick16.png',
        mSmithing: 'pickaxe',
        dcat: 'meleeTool',
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
        onToolbar: false,
        toolStats: {
          bonusDamage: 4,
          bonusPen: 1,
        },
        sellPrice: 14,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'bronzePickaxe',
        name: 'Bronze Pickaxe',
        image: 'src/assets/icons/bronzepick16.png',
        mSmithing: 'pickaxe',
        dcat: 'meleeTool',
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
        onToolbar: false,
        toolStats: {
          bonusDamage: 4,
          bonusPen: 2,
        },
        sellPrice: 36,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'ironPickaxe',
        name: 'Iron Pickaxe',
        image: 'src/assets/icons/ironpick16.png',
        mSmithing: 'pickaxe',
        dcat: 'meleeTool',
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
        onToolbar: false,
        toolStats: {
          bonusDamage: 4,
          bonusPen: 3,
        },
        sellPrice: 56,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'steelPickaxe',
        name: 'Steel Pickaxe',
        image: 'src/assets/icons/steelpick16.png',
        mSmithing: 'pickaxe',
        dcat: 'meleeTool',
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
        onToolbar: false,
        toolStats: {
          bonusDamage: 5,
          bonusPen: 4,
        },
        sellPrice: 65,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'koboldPick',
        name: 'Boulder Breaker',
        image: 'src/assets/icons/koboldpick.png',
        mSmithing: 'pickaxe',
        dcat: 'meleeTool',
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
        onToolbar: false,
        toolStats: {
          bonusDamage: 4,
          bonusPen: 10,
          miningInterval: 0.20,
        },
        sellPrice: 45,
        count: 20, //debug
        totalCount: 0,
      },

      //copper set
      {
        id: 'copperDagger',
        name: 'Copper Dagger',
        image: 'src/assets/icons/copperdagger16.png',
        mSmithing: 'dagger',
        dcat: 'meleeBlade',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'copperHelmet',
        name: 'Copper Helmet',
        image: 'src/assets/icons/copperhelmet16.png',
        mSmithing: 'helmet',
        dcat: 'meleeArmor',
        dlvl: 1,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 3,
          rangedDodge: 2,
          magicDodge: -1,
          resist: 0.02,
        },
        sellPrice: 13,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'copperGreaves',
        name: 'Copper Greaves',
        image: 'src/assets/icons/coppergreaves16.png',
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
        count: 20, //debug
        totalCount: 0,
      },

      //bronze set
      {
        id: 'bronzeDagger',
        name: 'Bronze Dagger',
        image: 'src/assets/icons/bronzedagger16.png',
        mSmithing: 'dagger',
        dcat: 'meleeBlade',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'bronzeBroadsword',
        name: 'Bronze Broadsword',
        image: 'src/assets/icons/bronzesword16.png',
        mSmithing: 'broadsword',
        dcat: 'meleeBlade',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'bronzeMace',
        name: 'Bronze Mace',
        image: 'src/assets/icons/bronzemace16.png',
        mSmithing: 'mace',
        dcat: 'meleeBlunt',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'bronzeHeavy',
        name: 'Bronze Warhammer',
        image: 'src/assets/icons/bronzeheavy16.png',
        mSmithing: 'heavy',
        dcat: 'meleeBlunt',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'bronzeHelmet',
        name: 'Bronze Helmet',
        image: 'src/assets/icons/bronzehelmet16.png',
        mSmithing: 'helmet',
        dcat: 'meleeArmor',
        dlvl: 2,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 4,
          rangedDodge: 3,
          magicDodge: -1,
          resist: 0.03,
        },
        sellPrice: 32,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'bronzePlate',
        name: 'Bronze Plate',
        image: 'src/assets/icons/bronzeplate16.png',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'bronzeChainmail',
        name: 'Bronze Chainmail',
        image: 'src/assets/icons/bronzechain16.png',
        mSmithing: 'chainmail',
        dcat: 'meleeArmor',
        dlvl: 2,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 4,
          rangedDodge: 4,
          magicDodge: -2,
          resist: 0.03,
        },
        sellPrice: 65,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'bronzeShield',
        name: 'Bronze Wingshields',
        image: 'src/assets/icons/bronzewing16.png',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'bronzeGreaves',
        name: 'Bronze Greaves',
        image: 'src/assets/icons/bronzegreaves16.png',
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
        count: 20, //debug
        totalCount: 0,
      },

      //iron set
      {
        id: 'ironDagger',
        name: 'Iron Dagger',
        image: 'src/assets/icons/irondagger16.png',
        mSmithing: 'dagger',
        dcat: 'meleeBlade',
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
        id: 'ironBroadsword',
        name: 'Iron Broadsword',
        image: 'src/assets/icons/ironsword16.png',
        mSmithing: 'broadsword',
        dcat: 'meleeBlade',
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
        id: 'ironMace',
        name: 'Iron Mace',
        image: 'src/assets/icons/ironmace16.png',
        mSmithing: 'mace',
        dcat: 'meleeBlunt',
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
        id: 'ironHeavy',
        name: 'Iron Warhammer',
        image: 'src/assets/icons/testIcon16.png',
        mSmithing: 'heavy',
        dcat: 'meleeBlunt',
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
        id: 'ironHelmet',
        name: 'Iron Helmet',
        image: 'src/assets/icons/ironhelmet16.png',
        mSmithing: 'helmet',
        dcat: 'meleeArmor',
        dlvl: 4,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 5,
          rangedDodge: 4,
          magicDodge: -1,
          resist: 0.04,
        },
        sellPrice: 55,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ironPlate',
        name: 'Iron Plate',
        image: 'src/assets/icons/ironplate16.png',
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
        image: 'src/assets/icons/ironchain16.png',
        mSmithing: 'chainmail',
        dcat: 'meleeArmor',
        dlvl: 4,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 5,
          rangedDodge: 5,
          magicDodge: -2,
          resist: 0.04,
        },
        sellPrice: 110,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ironShield',
        name: 'Iron Wingshields',
        image: 'src/assets/icons/ironwing16.png',
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
        image: 'src/assets/icons/irongreaves16.png',
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
        id: 'steelDagger',
        name: 'Steel Dagger',
        image: 'src/assets/icons/steeldagger16.png',
        mSmithing: 'dagger',
        dcat: 'meleeBlade',
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
      {
        id: 'steelBroadsword',
        name: 'Steel Broadsword',
        image: 'src/assets/icons/steelsword16.png',
        mSmithing: 'broadsword',
        dcat: 'meleeBlade',
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
      {
        id: 'steelMace',
        name: 'Steel Mace',
        image: 'src/assets/icons/steelmace16.png',
        mSmithing: 'mace',
        dcat: 'meleeBlunt',
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
      {
        id: 'steelHeavy',
        name: 'Steel Warhammer',
        image: 'src/assets/icons/testIcon16.png',
        mSmithing: 'heavy',
        dcat: 'meleeBlunt',
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
      {
        id: 'steelHelmet',
        name: 'Steel Helmet',
        image: 'src/assets/icons/steelhelmet16.png',
        mSmithing: 'helmet',
        dcat: 'meleeArmor',
        dlvl: 7,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 6,
          rangedDodge: 5,
          magicDodge: -1,
          resist: 0.05,
        },
        sellPrice: 65,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'steelPlate',
        name: 'Steel Plate',
        image: 'src/assets/icons/steelplate16.png',
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
        image: 'src/assets/icons/steelchain16.png',
        mSmithing: 'chainmail',
        dcat: 'meleeArmor',
        dlvl: 7,
        slot: 'bodySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeDodge: 6,
          rangedDodge: 6,
          magicDodge: -2,
          resist: 0.05,
        },
        sellPrice: 130,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'steelShield',
        name: 'Steel Wingshields',
        image: 'src/assets/icons/steelwing16.png',
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
        image: 'src/assets/icons/steelgreaves16.png',
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

      //kobold set
      {
        id: 'koboldDagger',
        name: 'Kobold Nail',
        flavor: 'Not that kind of nail.',
        image: 'src/assets/icons/kobolddagger.png',
        dcat: 'meleeBlade',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'koboldSling',
        name: 'Kobold Sling',
        extra: 'Requires no ammo.',
        flavor: "Shepherd's favourite.",
        image: 'src/assets/icons/koboldsling.png',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'koboldBow',
        name: 'Kobold Longbow',
        flavor: "Bigger than its maker.",
        image: 'src/assets/icons/koboldbow.png',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'koboldCowl',
        name: 'Kobold Cowl',
        flavor: 'Keeps ears from getting wet.',
        image: 'src/assets/icons/koboldcowl.png',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'koboldChest',
        name: 'Kobold Shield',
        flavor: 'Too small for wings, but may be a good chestplate.',
        image: 'src/assets/icons/koboldshield.png',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'koboldVest',
        name: 'Kobold Vest',
        flavor: 'Sleek and snazy.',
        image: 'src/assets/icons/koboldvest.png',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'koboldBracer',
        name: 'Kobold Armwraps',
        flavor: 'Also works with legs.',
        image: 'src/assets/icons/koboldarms.png',
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
        count: 20, //debug
        totalCount: 0,
      },

      //tower set
      {
        id: 'towerMace',
        name: 'Process Mace',
        flavor: 'The auto-abacus only processes smashing now.',
        image: 'src/assets/icons/towermace.png',
        dcat: 'meleeBlunt',
        dlvl: 5,
        slot: 'meleeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          meleeAccuracy: 10,
          meleeDamage: 0.60,
          meleePen: 0.35,
          meleeSpeed: 2.6,
        },
        sellPrice: 60,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'towerStaff',
        name: 'Ironbank Staff',
        flavor: 'Must have taken eons to get the magic in.',
        image: 'src/assets/icons/towerstaff.png',
        dcat: 'magicWeapon',
        dlvl: 8,
        slot: 'magicSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicAccuracy: 10,
          magicDamage: 0.40,
          magicPen: 0.10,
          magicSpeed: 2.8,
        },
        sellPrice: 70,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'towerHelmet',
        name: 'Construct Helmet',
        flavor: 'Magically imbued iron headware.',
        image: 'src/assets/icons/towerhelmet.png',
        dcat: 'meleeArmor',
        dlvl: 4,
        slot: 'hatSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicDamage: 0.05,
          meleeDodge: 5,
          rangedDodge: 4,
          magicDodge: 4,
          resist: 0.04,
        },
        sellPrice: 50,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'towerPlate',
        name: 'Construct Plate',
        flavor: 'Once, it protected a protector.',
        image: 'src/assets/icons/towerplate.png',
        dcat: 'meleeArmor',
        dlvl: 5,
        slot: 'chestSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicDamage: 0.05,
          meleeDodge: 7,
          rangedDodge: 6,
          magicDodge: 6,
          physicalArmor: 1,
          energyArmor: 1,
          resist: 0.04,
        },
        sellPrice: 270,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'towerGreaves',
        name: 'Construct Legs',
        flavor: "Has walked thousands of miles without stepping out the front door.",
        image: 'src/assets/icons/towerlegs.png',
        dcat: 'meleeArmor',
        dlvl: 4,
        slot: 'legSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicDamage: 0.05,
          meleeDodge: 4,
          rangedDodge: 3,
          magicDodge: 3,
          resist: 0.04,
        },
        sellPrice: 45,
        count: 20, //debug
        totalCount: 0,
      },

      //setless
      {
        id: 'pitchingWand',
        name: 'Dripping Sprig',
        extra: '+20% acid chance',
        flavor: 'Try not to chew on its blood-curdling sap.',
        image: 'src/assets/icons/wandsprig.png',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'spriteWings',
        name: 'Sprite Forms',
        flavor: 'Fallen letters from a sprite, can be written on wings.',
        image: 'src/assets/icons/spritewing.png',
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
        count: 20, //debug
        totalCount: 0,
      },


      //accessories
      {
        id: 'copperRing',
        name: 'Ring of Copper',
        image: 'src/assets/icons/ringcopper.png',
        dcat: 'jewellery',
        dlvl: 1,
        slot: 'ringSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          dodge: 1,
        },
        sellPrice: 8,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'silverRing',
        name: 'Ring of Silver',
        image: 'src/assets/icons/ringsilver.png',
        dcat: 'jewellery',
        dlvl: 5,
        slot: 'ringSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          dodge: 2,
        },
        sellPrice: 45,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'yellowRing',
        name: 'Ring of Wealth',
        extra: "+50% argal coin drops",
        image: 'src/assets/icons/ringyellow.png',
        dcat: 'jewellery',
        dlvl: 5,
        slot: 'ringSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          moneyDrop: 0.50,
        },
        sellPrice: 115,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'goldRing',
        name: 'Ring of Gold',
        image: 'src/assets/icons/ringgold.png',
        dcat: 'jewellery',
        dlvl: 10,
        slot: 'ringSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          dodge: 3,
        },
        sellPrice: 95,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'copperAmmy',
        name: 'Amulet of Copper',
        image: 'src/assets/icons/ammycopper.png',
        dcat: 'jewellery',
        dlvl: 1,
        slot: 'ammySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          accuracy: 1,
        },
        sellPrice: 10,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'silverAmmy',
        name: 'Amulet of Silver',
        image: 'src/assets/icons/ammysilver.png',
        dcat: 'jewellery',
        dlvl: 5,
        slot: 'ammySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          accuracy: 2,
        },
        sellPrice: 50,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'goldAmmy',
        name: 'Amulet of Gold',
        image: 'src/assets/icons/ammygold.png',
        dcat: 'jewellery',
        dlvl: 10,
        slot: 'ammySlot',
        isCombat: true,
        onEquip: false,
        stats: {
          accuracy: 3,
        },
        sellPrice: 100,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'redAmmy',
        name: 'Amulet of Strength',
        image: 'src/assets/icons/ammymelee.png',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'greenAmmy',
        name: 'Amulet of Markship',
        image: 'src/assets/icons/ammyranged.png',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'blueAmmy',
        name: 'Amulet of Spirit',
        image: 'src/assets/icons/ammymagic.png',
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
        count: 20, //debug
        totalCount: 0,
      },

      //arrows
      {
        id: 'copperArrow',
        name: 'Copper Arrows',
        image: 'src/assets/icons/copperarrow.png',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'bronzeArrow',
        name: 'Bronze Arrows',
        image: 'src/assets/icons/bronzearrow.png',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'ironArrow',
        name: 'Iron Arrows',
        image: 'src/assets/icons/ironarrow.png',
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
        image: 'src/assets/icons/steelarrow.png',
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

      //charges
      {
        id: 'charge1',
        name: 'Strike Charge',
        image: 'src/assets/icons/charge1.png',
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
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'charge2',
        name: 'Flash Charge',
        image: 'src/assets/icons/charge2.png',
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
        image: 'src/assets/icons/charge3.png',
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
        image: 'src/assets/icons/charge4.png',
        dcat: 'charge',
        dlvl: 4,
        slot: 'chargeSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicDamage: 0.35,
          magicPen: 0.20,
        },
        sellPrice: 7,
        count: 20, //debug
        totalCount: 0,
      },
    ],
    consumableItems: [
      {
        id: 'meatChop',
        name: 'Raw Chop',
        image: 'src/assets/icons/rawchop.png',
        dcat: 'rawFood',
        isFood: true,
        onEquip: false,
        heals: 1,
        dlvl: 1,
        sellPrice: 2,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'meatGame',
        name: 'Raw Game',
        image: 'src/assets/icons/rawgame.png',
        dcat: 'rawFood',
        isFood: true,
        onEquip: false,
        heals: 2,
        dlvl: 2,
        sellPrice: 3,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'meatFlank',
        name: 'Raw Flank',
        image: 'src/assets/icons/rawsteak.png',
        dcat: 'rawFood',
        isFood: true,
        onEquip: false,
        heals: 3,
        dlvl: 3,
        sellPrice: 14,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'meatSpicy',
        name: 'Shell Meat',
        image: 'src/assets/icons/rawbug.png',
        dcat: 'rawFood',
        isFood: true,
        onEquip: false,
        heals: 4,
        dlvl: 4,
        sellPrice: 22,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'friedChops',
        name: 'Fried Chops',
        image: 'src/assets/icons/cookedchop.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 2,
        dlvl: 1,
        sellPrice: 4,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'searedGame',
        name: 'Seared Game',
        image: 'src/assets/icons/cookedgame.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 3,
        dlvl: 2,
        sellPrice: 5,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'flankSteak',
        name: 'Flank Steak',
        image: 'src/assets/icons/cookedsteak.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 4,
        dlvl: 3,
        sellPrice: 19,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'shelledCrisps',
        name: 'Shelled Crisps',
        image: 'src/assets/icons/cookedbug.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 5,
        dlvl: 4,
        sellPrice: 27,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'meal1',
        name: 'Barkchew',
        flavor: 'Fully of chewy goodness.',
        image: 'src/assets/icons/chew.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 1,
        dlvl: 1,
        sellPrice: 1,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'meal2',
        name: 'Flax Bread',
        flavor: 'Neither thick nor fried.',
        image: 'src/assets/icons/bread.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 2,
        dlvl: 2,
        sellPrice: 9,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'meal3',
        name: 'Berry Pie',
        flavor: 'Berries, now less portable.',
        image: 'src/assets/icons/berrypie.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 4,
        dlvl: 3,
        sellPrice: 21,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'meal4',
        name: 'Glazed Chops',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 6,
        dlvl: 4,
        sellPrice: 34,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meal5',
        name: 'Flatcake',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 8,
        dlvl: 5,
        sellPrice: 40,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meal6',
        name: 'Sticky Game',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 10,
        dlvl: 6,
        sellPrice: 48,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meal7',
        name: 'Flank Bun',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 12,
        dlvl: 7,
        sellPrice: 60,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meal8',
        name: 'Shell Cake',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
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
        image: 'src/assets/icons/coins.png',
        dcat: 'money',
        dlvl: 1,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'rune1',
        name: 'Pale Clay',
        flavor: 'Buzzing with anticipation of future shapes.',
        image: 'src/assets/icons/rune1.png',
        dcat: 'magic',
        dlvl: 1,
        sellPrice: 3,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'rune2',
        name: 'Pure Oil',
        flavor: 'Cleaner than rain, thicker than blood.',
        image: 'src/assets/icons/rune2.png',
        dcat: 'magic',
        dlvl: 2,
        sellPrice: 5,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'rune3',
        name: 'Nitor',
        flavor: 'Scarfs of fire, freshly caught.',
        image: 'src/assets/icons/rune3.png',
        dcat: 'magic',
        dlvl: 3,
        sellPrice: 11,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'rune4',
        name: 'Spelldew',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'magic',
        dlvl: 4,
        sellPrice: 99,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'rune5',
        name: 'Cinnabar',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'magic',
        dlvl: 5,
        sellPrice: 99,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'rune6',
        name: 'Vis',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'magic',
        dlvl: 6,
        sellPrice: 99,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'rune7',
        name: 'Spark Salt',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'magic',
        dlvl: 7,
        sellPrice: 99,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'rune8',
        name: 'Flux Crystal',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'magic',
        dlvl: 8,
        sellPrice: 99,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'plant1',
        name: 'Oakbark',
        flavor: 'More oak than bark.',
        image: 'src/assets/icons/oak.png',
        dcat: 'living',
        dlvl: 1,
        sellPrice: 2,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'plant2',
        name: 'Sunflax',
        flavor: 'Edible seeds and less edible stalks.',
        image: 'src/assets/icons/flax.png',
        dcat: 'living',
        dlvl: 2,
        sellPrice: 4,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'plant3',
        name: 'Mossberry',
        flavor: 'Sweet juice gathered from unrolled stones.',
        image: 'src/assets/icons/berry.png',
        dcat: 'living',
        dlvl: 3,
        sellPrice: 7,
        count: 20, //debug,
        totalCount: 0,
      },
      {
        id: 'plant4',
        name: 'Snow Cotton',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'living',
        dlvl: 4,
        sellPrice: 10,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'plant5',
        name: 'Rosemilk',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'living',
        dlvl: 5,
        sellPrice: 12,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'plant6',
        name: 'Liquor Maple',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'living',
        dlvl: 6,
        sellPrice: 15,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'plant7',
        name: 'Siris Silk',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'living',
        dlvl: 7,
        sellPrice: 18,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'plant8',
        name: 'Sweet Cane',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'living',
        dlvl: 8,
        sellPrice: 20,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ore1',
        name: 'Copper Ore',
        image: 'src/assets/icons/copperore.png',
        dcat: 'ore',
        dlvl: 1,
        sellPrice: 4,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'ore2',
        name: 'Tin Ore',
        image: 'src/assets/icons/tinore.png',
        dcat: 'ore',
        dlvl: 2,
        sellPrice: 7,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'ore3',
        name: 'Amber',
        flavor: 'Old plant blood.',
        image: 'src/assets/icons/amber.png',
        dcat: 'ore',
        dlvl: 3,
        sellPrice: 19,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'ore4',
        name: 'Iron Ore',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'ore',
        dlvl: 4,
        sellPrice: 10,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ore5',
        name: 'Silver Ore',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'ore',
        dlvl: 5,
        sellPrice: 25,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ore6',
        name: 'Sandstone',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'ore',
        dlvl: 6,
        sellPrice: 14,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ore7',
        name: 'Coal',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'ore',
        dlvl: 7,
        sellPrice: 16,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ore8', //oops, this should be so many gems, TODO
        name: 'Gem Dust',
        extra: 'buggy bud shudnt hav dis :(',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'ore',
        dlvl: 8,
        sellPrice: 20,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bar1',
        name: 'Copper Ingot',
        image: 'src/assets/icons/copperingot16.png',
        dcat: 'bar',
        dlvl: 1,
        sellPrice: 5,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'bar2',
        name: 'Bronze Ingot',
        image: 'src/assets/icons/bronzeingot16.png',
        dcat: 'bar',
        dlvl: 2,
        sellPrice: 14,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'bar3',
        name: 'Iron Ingot',
        image: 'src/assets/icons/ironingot16.png',
        dcat: 'bar',
        dlvl: 4,
        sellPrice: 24,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bar4',
        name: 'Silver Ingot',
        image: 'src/assets/icons/silveringot16.png',
        dcat: 'luxbar',
        dlvl: 5,
        sellPrice: 35,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'bar5',
        name: 'Steel Ingot',
        image: 'src/assets/icons/steelingot16.png',
        dcat: 'ore',
        dlvl: 7,
        sellPrice: 28,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'yellowGem',
        name: 'Pyrite',
        flavor: 'Clever crystal.',
        image: 'src/assets/icons/gemyellow.png',
        dcat: 'gem',
        dlvl: 5,
        sellPrice: 65,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'pinkGem',
        name: 'Spinel',
        flavor: "Pink's best friend.",
        image: 'src/assets/icons/gempink.png',
        dcat: 'gem',
        dlvl: 5,
        sellPrice: 80,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'redGem',
        name: 'Ruby',
        flavor: 'Direct and feisty.',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'gem',
        dlvl: 10,
        sellPrice: 140,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'greenGem',
        name: 'Emerald',
        flavor: 'Imperial focus.',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'gem',
        dlvl: 10,
        sellPrice: 180,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'blueGem',
        name: 'Sapphire',
        flavor: 'Concentrated patience.',
        image: 'src/assets/icons/gemblue.png',
        dcat: 'gem',
        dlvl: 10,
        sellPrice: 210,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'glassBar',
        name: 'Glass',
        image: 'src/assets/icons/glassingot16.png',
        dcat: 'luxbar',
        dlvl: 1,
        sellPrice: 5,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'hide1',
        name: 'Wool',
        flavor: 'Yarn in a convenient ball.',
        image: 'src/assets/icons/wool.png',
        dcat: 'hide',
        dlvl: 1,
        sellPrice: 3,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'hide2',
        name: 'Fur',
        flavor: 'Tufts of tough fluff.',
        image: 'src/assets/icons/fur.png',
        dcat: 'hide',
        dlvl: 2,
        sellPrice: 5,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'hide3',
        name: 'Leather',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'hide',
        dlvl: 4,
        sellPrice: 12,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'hide4',
        name: 'Hide',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'hide',
        dlvl: 6,
        sellPrice: 15,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'hide5',
        name: 'Carapace',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'hide',
        dlvl: 8,
        sellPrice: 9,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'antler',
        name: 'Antlers',
        image: 'src/assets/icons/antler.png',
        dcat: 'ingredient',
        dlvl: 1,
        sellPrice: 6,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'hogTusk',
        name: 'Hog Tusk',
        image: 'src/assets/icons/tusk.png',
        dcat: 'ingredient',
        dlvl: 2,
        sellPrice: 4,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'feather',
        name: 'Feathers',
        image: 'src/assets/icons/feather.png',
        dcat: 'ingredient',
        dlvl: 3,
        sellPrice: 1,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'goatHorn',
        name: 'Goat Horn',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'ingredient',
        dlvl: 4,
        sellPrice: 9,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'slothClaws',
        name: 'Sloth Claws',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'ingredient',
        dlvl: 7,
        sellPrice: 24,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'scarabVenom',
        name: 'Acid Sac',
        image: 'src/assets/icons/venomsac.png',
        dcat: 'ingredient',
        dlvl: 3,
        sellPrice: 20,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'bones1',
        name: 'Animal Bones',
        image: 'src/assets/icons/bones1.png',
        dcat: 'remains',
        dlvl: 1,
        sellPrice: 3,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'bones2',
        name: 'Kin Bones',
        image: 'src/assets/icons/bones2.png',
        dcat: 'remains',
        dlvl: 2,
        sellPrice: 2,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'bones3',
        name: 'Noble Bones',
        image: 'src/assets/icons/bones3.png',
        dcat: 'remains',
        dlvl: 4,
        sellPrice: 40,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'ashes1',
        name: 'Fading Dust',
        image: 'src/assets/icons/dust1.png',
        dcat: 'remains',
        dlvl: 2,
        sellPrice: 7,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'ashes2',
        name: 'Glowing Dust',
        image: 'src/assets/icons/dust2.png',
        dcat: 'remains',
        dlvl: 5,
        sellPrice: 22,
        count: 20, //debug
        totalCount: 0,
      },
      {
        id: 'xylem1',
        name: 'Xylem Roots',
        image: 'src/assets/icons/roots1.png',
        dcat: 'remains',
        dlvl: 2,
        sellPrice: 6,
        count: 20, //debug
        totalCount: 0,
      },
    ],
  }),
  getters: {
    getAllFoodWithCount() {
      return this.consumableItems.filter(e => e.isFood === true && e.count > 0)
    },
  },
  actions: {
    changeItemCount(itemID, amount, itemCat) {
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
      }

      //give up and report the error
      if (itemToAddCount == undefined) {
        console.log('failed to add item ' + itemID)
        return false
      }

      //can't have negative apples
      if (itemToAddCount.count + amount < 0) { return false }

      //explain what you're doing
      if (amount > 0) {
        console.log('hoarding ' + amount + ' ' + itemToAddCount.name)
      } else {
        // console.log('losing ' + amount + ' ' + itemToAddCount.name)
      }

      itemToAddCount.count += amount
      if (amount > 0) {
        itemToAddCount.totalCount += amount
      }
    },

    hasItemCount(itemID, amount, itemCat) {
      let itemToAddCount = this[itemCat].find(t => t.id === itemID)
      //not enough items
      if (itemToAddCount.count - amount < 0) { 
        console.log('not enough boop')
        return false
      }
      return true
    },

    getItemCount(itemID, itemCat) {

    },
    getItemImage(itemID, itemCat) {
      let temp

      if (itemCat) {
        temp = this[itemCat].find(t => t.id === itemID)
      } else {
        //look in resource items
        temp = this.resourceItems.find(t => t.id === itemID)
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
        console.log('failed find item image' + itemID)
        return 'src/assets/icons/testIcon16.png'
      }
      return temp.image
    },
    getItemData(itemID, itemCat) {
      let temp

      if (itemCat) {
        temp = this[itemCat].find(t => t.id === itemID)
      } else {
        //look in resource items
        temp = this.resourceItems.find(t => t.id === itemID)
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
        console.log('failed find item data' + itemID)
      }
      return temp
    },

    equipItem(item) {
      if (item.isTool == true) {
        let itemToSwap = this.equipmentItems.find(t => t.id === item.id)
        let itemOut = this.equippedTools[itemToSwap.toolSlot]

        //if item is samed as equipped, unequip and equip default
        if (itemToSwap == itemOut) {
          itemOut.onToolbar = false
          this.equippedTools[itemToSwap.toolSlot] = this.defaultTools[itemToSwap.toolSlot]
          return
        }

        //unequip old item
        itemOut.onToolbar = false
        itemToSwap.onToolbar = true

        this.equippedTools[itemToSwap.toolSlot] = itemToSwap
        return
      }

      if (item.isCombat == true) {
        let itemToSwap = this.equipmentItems.find(t => t.id === item.id)
        let itemOut = this.equippedCombat[itemToSwap.slot]

        //if item is samed as equipped, unequip and equip default
        if (itemToSwap == itemOut) {
          itemOut.onEquip = false
          this.equippedCombat[itemToSwap.slot] = {}
          this.updateEquippedStats()
          return
        }

        //unequip old item
        itemOut.onEquip = false
        itemToSwap.onEquip = true

        this.equippedCombat[itemToSwap.slot] = itemToSwap
        this.updateEquippedStats()
        return
      }

      if (item.isFood == true) {
        let itemToSwap = this.consumableItems.find(t => t.id === item.id)
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

    updateEquippedStats() {
      let item = {}

      this.equippedStats.meleeDamage = 0
      this.equippedStats.rangedDamage = 0
      this.equippedStats.magicDamage = 0

      this.equippedStats.meleeAccuracy = (3 * this.skillStore.skills[0].level) + this.preStance
      this.equippedStats.rangedAccuracy = (3 * this.skillStore.skills[0].level) + this.preStance
      this.equippedStats.magicAccuracy = (3 * this.skillStore.skills[0].level) + this.preStance

      this.equippedStats.meleePen = 0
      this.equippedStats.rangedPen = 0
      this.equippedStats.magicPen = 0

      this.equippedStats.meleeSpeed = 2.0
      this.equippedStats.rangedSpeed = 2.0
      this.equippedStats.magicSpeed = 2.0

      this.equippedStats.meleeDodge = (3 * this.skillStore.skills[4].level) + this.defStance
      this.equippedStats.rangedDodge = (3 * this.skillStore.skills[5].level) + this.defStance
      this.equippedStats.magicDodge = (3 * this.skillStore.skills[6].level) + this.defStance

      this.equippedStats.physicalArmor = 0
      this.equippedStats.energyArmor = 0
      this.equippedStats.resist = 0

      //special
      this.equippedStats.poisonChance = [0, 0, 0]
      this.moneyDrop = 0

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
          if (this.equippedCombat[item].stats.meleeAccuracy != null) {
            this.equippedStats.meleeAccuracy += this.equippedCombat[item].stats.meleeAccuracy + this.bonusSmithingMastery(this.equippedCombat[item])
          }

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

          if (this.equippedCombat[item].stats.magicAccuracy != null) {
            this.equippedStats.magicAccuracy += this.equippedCombat[item].stats.magicAccuracy
          }

          //penetration
          if (this.equippedCombat[item].stats.meleePen != null) {
            this.equippedStats.meleePen += this.equippedCombat[item].stats.meleePen
          }

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

          if (this.equippedCombat[item].stats.magicPen != null) {
            this.equippedStats.magicPen += this.equippedCombat[item].stats.magicPen
          }

          //speed
          if (this.equippedCombat[item].stats.meleeSpeed != null) {
            if (this.equippedCombat[item].slot == 'meleeSlot') {
              this.equippedStats.meleeSpeed += this.equippedCombat[item].stats.meleeSpeed - 2
            } else {
              this.equippedStats.meleeSpeed -= this.equippedCombat[item].stats.meleeSpeed
            }
          }

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
          if (this.equippedCombat[item].stats.meleeDodge != null) {
            this.equippedStats.meleeDodge += this.equippedCombat[item].stats.meleeDodge + (this.bonusSmithingMastery(this.equippedCombat[item]) / 4)
          }
          if (this.equippedCombat[item].stats.rangedDodge != null) {
            this.equippedStats.rangedDodge += this.equippedCombat[item].stats.rangedDodge + (this.bonusSmithingMastery(this.equippedCombat[item]) / 4)
          }
          if (this.equippedCombat[item].stats.magicDodge != null) {
            this.equippedStats.magicDodge += this.equippedCombat[item].stats.magicDodge
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

          //money
          if (this.equippedCombat[item].stats.moneyDrop != null) {
            this.equippedStats.moneyDrop += this.equippedCombat[item].stats.moneyDrop
          }
        }
      }

      //adds bonus damage to base damage
      this.equippedStats.meleeDamage = (this.skillStore.skills[1].level + this.aggStance) * (1 + this.equippedStats.meleeDamage)
      this.equippedStats.rangedDamage = (this.skillStore.skills[2].level + this.aggStance) * (1 + this.equippedStats.rangedDamage)
      this.equippedStats.magicDamage = (this.skillStore.skills[3].level + this.aggStance) * (1 + this.equippedStats.magicDamage)

    },

    bonusSmithingMastery(temp) {
      if (temp.mSmithing) {
        temp = this.smithingStore.equipmentMastery.find(blep => blep.id === temp.mSmithing)
        return temp.mLevel
      }
      return 0
    },
  }
})