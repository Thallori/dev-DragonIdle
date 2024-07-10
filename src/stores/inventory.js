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
      mageSlot: {},
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
      explorationTool: {},
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
      explorationTool: {},
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
          meleeAccuracy: -10,
          meleeDamage: 2,
          speed: 2.8,
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
          meleeAccuracy: -10,
          meleeDamage: 3,
          speed: 2.8,
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
          meleeDamage: 0,
          speed: 2.0,
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
          meleeDamage: 1,
          speed: 2.0,
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
          meleeAccuracy: -10,
          meleeDamage: 1,
          pen: 0.35,
          speed: 2.8,
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
          meleeAccuracy: -10,
          meleeDamage: 2,
          pen: 0.35,
          speed: 2.8,
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
          meleeAccuracy: -5,
          meleeDamage: 1,
          pen: 0.10,
          speed: 2.2,
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
        },
        sellPrice: 20,
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
          meleeDodge: 2,
          rangedDodge: 1,
        },
        sellPrice: 18,
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
          meleeAccuracy: -5,
          meleeDamage: 2,
          pen: 0.10,
          speed: 2.2,
        },
        sellPrice: 18,
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
          meleeAccuracy: -5,
          meleeDamage: 3,
          pen: 0.15,
          speed: 2.4,
        },
        sellPrice: 42,
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
          meleeAccuracy: -5,
          meleeDamage: 3,
          pen: 0.25,
          speed: 2.6,
        },
        sellPrice: 40,
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
          meleeAccuracy: -5,
          meleeDamage: 4,
          pen: 0.30,
          speed: 3.0,
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
        },
        sellPrice: 38,
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
          speed: -0.3,
        },
        sellPrice: 94,
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
          resist: 0.05,
          speed: -0.10,
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
          magicDodge: -3,
          physicalArmor: 1,
          speed: -0.2,
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
          meleeDodge: 3,
          rangedDodge: 2,
        },
        sellPrice: 32,
        count: 20, //debug
        totalCount: 0,
      },

      //accessories
      {
        id: 'copperRing',
        name: 'Copper Ring',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'jewellery',
        dlvl: 1,
        slot: 'ringSlot',
        isCombat: true,
        onEquip: false,
        stats: {
          magicDodge: 5,
        },
        sellPrice: 8,
        count: 0,
        totalCount: 0,
      },
    ],
    consumableItems: [
      {
        id: 'meatChop',
        name: 'Raw Chop',
        image: 'src/assets/icons/testIcon16.png',
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
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'rawFood',
        isFood: true,
        onEquip: false,
        heals: 2,
        dlvl: 2,
        sellPrice: 3,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meatFlank',
        name: 'Raw Flank',
        image: 'src/assets/icons/testIcon16.png',
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
        image: 'src/assets/icons/testIcon16.png',
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
        image: 'src/assets/icons/testIcon16.png',
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
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 3,
        dlvl: 2,
        sellPrice: 5,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'flankSteak',
        name: 'Flank Steak',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 4,
        dlvl: 3,
        sellPrice: 19,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'shelledCrisps',
        name: 'Shelled Crisps',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 5,
        dlvl: 4,
        sellPrice: 27,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meal1',
        name: 'Barkchew',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 1,
        dlvl: 1,
        sellPrice: 1,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meal2',
        name: 'Flax Bread',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 2,
        dlvl: 2,
        sellPrice: 9,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meal3',
        name: 'Berry Pie',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 3,
        dlvl: 3,
        sellPrice: 21,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'meal4',
        name: 'Glazed Chops',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'cookedFood',
        isFood: true,
        onEquip: false,
        heals: 4,
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
        heals: 5,
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
        heals: 6,
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
        heals: 7,
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
        heals: 8,
        dlvl: 8,
        sellPrice: 95,
        count: 0,
        totalCount: 0,
      },
    ],
    resourceItems: [
      {
        id: 'plant1',
        name: 'Oakbark',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'living', //deconstruction category
        dlvl: 1, //deconstruction level
        sellPrice: 2,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'plant2',
        name: 'Sunflax',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'living',
        dlvl: 2,
        sellPrice: 4,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'plant3',
        name: 'Mossberry',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'living',
        dlvl: 3,
        sellPrice: 7,
        count: 0,
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
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'ore',
        dlvl: 1,
        sellPrice: 4,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ore2',
        name: 'Tin Ore',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'ore',
        dlvl: 2,
        sellPrice: 7,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'ore3',
        name: 'Amber',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'ore',
        dlvl: 3,
        sellPrice: 12,
        count: 0,
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
        sellPrice: 6,
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
        count: 0,
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
        id: 'hide1',
        name: 'Wool',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'hide',
        dlvl: 1,
        sellPrice: 3,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'hide2',
        name: 'Fur',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'hide',
        dlvl: 2,
        sellPrice: 5,
        count: 0,
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
        id: 'hogTusk',
        name: 'Hog Tusk',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'ingredient',
        dlvl: 2,
        sellPrice: 4,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'feather',
        name: 'Feathers',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'ingredient',
        dlvl: 3,
        sellPrice: 1,
        count: 0,
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
        sellPrice: 45,
        count: 0,
        totalCount: 0,
      },
      {
        id: 'scarabVenom',
        name: 'Venom Sac',
        image: 'src/assets/icons/testIcon16.png',
        dcat: 'ingredient',
        dlvl: 8,
        sellPrice: 20,
        count: 0,
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

      if (amount > 0) {
        console.log('hoarding ' + amount + ' ' + itemToAddCount.name)
      } else {
        // console.log('losing ' + amount + ' ' + itemToAddCount.name)
      }

      if (itemToAddCount.count + amount < 0) { return false } //can't have negative apples

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
      if (itemToAddCount == undefined) {
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

      this.equippedStats.meleeDamage = this.skillStore.skills[1].level + this.aggStance
      this.equippedStats.rangedDamage = this.skillStore.skills[2].level + this.aggStance
      this.equippedStats.magicDamage = this.skillStore.skills[3].level + this.aggStance

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

      for (item in this.equippedCombat) {
        if (this.equippedCombat[item].stats) {

          //damage
          if (this.equippedCombat[item].stats.meleeDamage != null) {
            this.equippedStats.meleeDamage += this.equippedCombat[item].stats.meleeDamage
          }
          if (this.equippedCombat[item].stats.rangedDamage != null) {
            this.equippedStats.rangedDamage += this.equippedCombat[item].stats.rangedDamage
          }
          if (this.equippedCombat[item].stats.magicDamage != null) {
            this.equippedStats.magicDamage += this.equippedCombat[item].stats.magicDamage
          }

          //accuracy
          if (this.equippedCombat[item].stats.meleeAccuracy != null) {
            this.equippedStats.meleeAccuracy += this.equippedCombat[item].stats.meleeAccuracy + this.bonusSmithingMastery(this.equippedCombat[item])
          }
          if (this.equippedCombat[item].stats.rangedAccuracy != null) {
            this.equippedStats.rangedAccuracy += this.equippedCombat[item].stats.rangedAccuracy
          }
          if (this.equippedCombat[item].stats.rangedAccuracy != null) {
            this.equippedStats.rangedAccuracy += this.equippedCombat[item].stats.rangedAccuracy
          }

          //penetration
          if (this.equippedCombat[item].stats.pen != null) {
            if (this.equippedCombat[item].slot == 'meleeSlot') {
              this.equippedStats.meleePen += this.equippedCombat[item].stats.pen
            }
            if (this.equippedCombat[item].slot != 'meleeSlot' && this.equippedCombat[item].slot != 'rangedSlot' && this.equippedCombat[item].slot != 'mageSlot') {
              this.equippedStats.meleePen -= this.equippedCombat[item].stats.pen
            }
          }

          if (this.equippedCombat[item].stats.pen != null) {
            if (this.equippedCombat[item].slot == 'rangedSlot') {
              this.equippedStats.rangedPen += this.equippedCombat[item].stats.pen
            }
            if (this.equippedCombat[item].slot != 'meleeSlot' && this.equippedCombat[item].slot != 'rangedSlot' && this.equippedCombat[item].slot != 'mageSlot') {
              this.equippedStats.rangedPen -= this.equippedCombat[item].stats.pen
            }
          }

          if (this.equippedCombat[item].stats.pen != null) {
            if (this.equippedCombat[item].slot == 'mageSlot') {
              this.equippedStats.magicPen += this.equippedCombat[item].stats.pen
            }
            if (this.equippedCombat[item].slot != 'meleeSlot' && this.equippedCombat[item].slot != 'rangedSlot' && this.equippedCombat[item].slot != 'mageSlot') {
              this.equippedStats.magicPen -= this.equippedCombat[item].stats.pen
            }
          }

          //speed
          if (this.equippedCombat[item].stats.speed != null) {
            if (this.equippedCombat[item].slot == 'meleeSlot') {
              this.equippedStats.meleeSpeed += this.equippedCombat[item].stats.speed - 2
            }
            if (this.equippedCombat[item].slot != 'meleeSlot' && this.equippedCombat[item].slot != 'rangedSlot' && this.equippedCombat[item].slot != 'mageSlot') {
              this.equippedStats.meleeSpeed -= this.equippedCombat[item].stats.speed
            }
          }

          if (this.equippedCombat[item].stats.speed != null) {
            if (this.equippedCombat[item].slot == 'rangedSlot') {
              this.equippedStats.rangedSpeed += this.equippedCombat[item].stats.speed - 2
            }
            if (this.equippedCombat[item].slot != 'meleeSlot' && this.equippedCombat[item].slot != 'rangedSlot' && this.equippedCombat[item].slot != 'mageSlot') {
              this.equippedStats.rangedSpeed -= this.equippedCombat[item].stats.speed
            }
          }

          if (this.equippedCombat[item].stats.speed != null) {
            if (this.equippedCombat[item].slot == 'mageSlot') {
              this.equippedStats.magicSpeed += this.equippedCombat[item].stats.speed - 2
            }
            if (this.equippedCombat[item].slot != 'meleeSlot' && this.equippedCombat[item].slot != 'rangedSlot' && this.equippedCombat[item].slot != 'mageSlot') {
              this.equippedStats.magicSpeed -= this.equippedCombat[item].stats.speed
            }
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

        }
      }

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