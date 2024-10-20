import { defineStore } from 'pinia'
import { useSkillStore as skillStore } from '@/stores/skills';
import { useMechanicsStore as mechanicsStore } from '@/stores/mechanics'
import { useItemStore as itemStore } from '@/stores/inventory';

export const useSmithingStore = defineStore('smithingStore', {
  state: () => ({
    heatFromUpgrades: 2,
    efficency: 2,

    activeObject: {},
    activeProgress: 0,
    activePercent: { a: 0, b: false, c: '#04AA6D' },
    currentTimeout: 0,

    progressInterval: 50,

    //smithing skill is stored as id 16 which is also its index, because I don't know how to do it otherwise
    skillID: 16,

    equipmentMastery: [
      {
        id: 'hatchet',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'claws',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'pickaxe',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'dagger',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'broadsword',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'mace',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'heavy',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'greaves',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'helmet',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'chainmail',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'plate',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'shield',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
    ],

    activities: [
      {
        id: 'copperBar',
        cat: 'bar',
        name: 'Copper Ingot',
        itemID: 'bar1',
        itemAmount: 1,
        neededItem1: ['ore1', 1],
        levelRequired: 1,
        xpGain: 3,
        heatNeeded: 5,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'bronzeBar',
        cat: 'bar',
        name: 'Bronze Ingot',
        itemID: 'bar2',
        itemAmount: 1,
        neededItem1: ['ore1', 1],
        neededItem2: ['ore2', 1],
        levelRequired: 2,
        xpGain: 5,
        heatNeeded: 7,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'ironBar',
        cat: 'bar',
        name: 'Iron Ingot',
        itemID: 'bar3',
        itemAmount: 1,
        neededItem1: ['ore4', 2],
        levelRequired: 4,
        xpGain: 8,
        heatNeeded: 9,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'silverBar',
        cat: 'bar',
        name: 'Silver Ingot',
        itemID: 'bar4',
        itemAmount: 1,
        neededItem1: ['ore5', 1],
        levelRequired: 5,
        xpGain: 9,
        heatNeeded: 6,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'glassBar',
        cat: 'bar',
        name: 'Glass',
        itemID: 'glassBar',
        itemAmount: 1,
        neededItem1: ['ore6', 1],
        levelRequired: 6,
        xpGain: 2,
        heatNeeded: 4,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'steelbar',
        cat: 'bar',
        name: 'Steel Ingot',
        itemID: 'bar5',
        itemAmount: 1,
        neededItem1: ['ore4', 1],
        neededItem2: ['ore7', 1],
        levelRequired: 7,
        xpGain: 10,
        heatNeeded: 11,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'mythrilbar',
        cat: 'bar',
        name: 'Mythril Ingot',
        itemID: 'bar6',
        itemAmount: 1,
        neededItem1: ['ore9', 1],
        neededItem2: ['rune5', 1],
        levelRequired: 9,
        xpGain: 14,
        heatNeeded: 12,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },

      //copper
      {
        id: 'copperHatchet',
        cat: 'copper',
        name: 'Copper Hatchet',
        itemID: 'copperHatchet',
        itemAmount: 1,
        neededItem1: ['bar1', 2],
        levelRequired: 1,
        xpGain: 20,
        heatNeeded: 7,
        mCat: 0,
      },
      {
        id: 'copperClaws',
        cat: 'copper',
        name: 'Copper Claws',
        itemID: 'copperClaws',
        itemAmount: 1,
        neededItem1: ['bar1', 2],
        levelRequired: 1,
        xpGain: 20,
        heatNeeded: 7,
        mCat: 1,
      },
      {
        id: 'copperPickaxe',
        cat: 'copper',
        name: 'Copper Pickaxe',
        itemID: 'copperPickaxe',
        itemAmount: 1,
        neededItem1: ['bar1', 2],
        levelRequired: 1,
        xpGain: 20,
        heatNeeded: 7,
        mCat: 2,
      },
      {
        id: 'copperDagger',
        cat: 'copper',
        name: 'Copper Dagger',
        itemID: 'copperDagger',
        itemAmount: 1,
        neededItem1: ['bar1', 1],
        levelRequired: 1,
        xpGain: 10,
        heatNeeded: 4,
        mCat: 3,
      },
      {
        id: 'copperGreaves',
        cat: 'copper',
        name: 'Copper Greaves',
        itemID: 'copperGreaves',
        itemAmount: 1,
        neededItem1: ['bar1', 2],
        levelRequired: 1,
        xpGain: 20,
        heatNeeded: 7,
        mCat: 7,
      },
      {
        id: 'copperHelmet',
        cat: 'copper',
        name: 'Copper Helmet',
        itemID: 'copperHelmet',
        itemAmount: 1,
        neededItem1: ['bar1', 2],
        levelRequired: 1,
        xpGain: 20,
        heatNeeded: 7,
        mCat: 8,
      },

      //bronze
      {
        id: 'bronzeHatchet',
        cat: 'bronze',
        name: 'Bronze Hatchet',
        itemID: 'bronzeHatchet',
        itemAmount: 1,
        neededItem1: ['bar2', 2],
        levelRequired: 2,
        xpGain: 60,
        heatNeeded: 11,
        mCat: 0,
      },
      {
        id: 'bronzeClaws',
        cat: 'bronze',
        name: 'Bronze Claws',
        itemID: 'bronzeClaws',
        itemAmount: 1,
        neededItem1: ['bar2', 2],
        levelRequired: 2,
        xpGain: 60,
        heatNeeded: 11,
        mCat: 1,
      },
      {
        id: 'bronzePickaxe',
        cat: 'bronze',
        name: 'Bronze Pickaxe',
        itemID: 'bronzePickaxe',
        itemAmount: 1,
        neededItem1: ['bar2', 2],
        levelRequired: 2,
        xpGain: 60,
        heatNeeded: 11,
        mCat: 2,
      },
      {
        id: 'bronzeDagger',
        cat: 'bronze',
        name: 'Bronze Dagger',
        itemID: 'bronzeDagger',
        itemAmount: 1,
        neededItem1: ['bar2', 1],
        levelRequired: 2,
        xpGain: 30,
        heatNeeded: 6,
        mCat: 3,
      },
      {
        id: 'bronzeBroadsword',
        cat: 'bronze',
        name: 'Bronze Broadsword',
        itemID: 'bronzeBroadsword',
        itemAmount: 1,
        neededItem1: ['bar2', 2],
        levelRequired: 3,
        xpGain: 60,
        heatNeeded: 11,
        mCat: 4,
      },
      {
        id: 'bronzeMace',
        cat: 'bronze',
        name: 'Bronze Mace',
        itemID: 'bronzeMace',
        itemAmount: 1,
        neededItem1: ['bar2', 2],
        levelRequired: 3,
        xpGain: 60,
        heatNeeded: 11,
        mCat: 5,
      },
      {
        id: 'bronzeHeavy',
        cat: 'bronze',
        name: 'Bronze Warhammer',
        itemID: 'bronzeHeavy',
        itemAmount: 1,
        neededItem1: ['bar2', 3],
        levelRequired: 3,
        xpGain: 90,
        heatNeeded: 16,
        mCat: 6,
      },
      {
        id: 'bronzeGreaves',
        cat: 'bronze',
        name: 'Bronze Greaves',
        itemID: 'bronzeGreaves',
        itemAmount: 1,
        neededItem1: ['bar2', 2],
        levelRequired: 2,
        xpGain: 60,
        heatNeeded: 11,
        mCat: 7,
      },
      {
        id: 'bronzeHelmet',
        cat: 'bronze',
        name: 'Bronze Helmet',
        itemID: 'bronzeHelmet',
        itemAmount: 1,
        neededItem1: ['bar2', 2],
        levelRequired: 2,
        xpGain: 60,
        heatNeeded: 11,
        mCat: 8,
      },
      {
        id: 'bronzeChainmail',
        cat: 'bronze',
        name: 'Bronze Chainmail',
        itemID: 'bronzeChainmail',
        itemAmount: 1,
        neededItem1: ['bar2', 4],
        levelRequired: 2,
        xpGain: 120,
        heatNeeded: 21,
        mCat: 9,
      },
      {
        id: 'bronzePlate',
        cat: 'bronze',
        name: 'Bronze Plate',
        itemID: 'bronzePlate',
        itemAmount: 1,
        neededItem1: ['bar2', 5],
        levelRequired: 3,
        xpGain: 150,
        heatNeeded: 26,
        mCat: 10,
      },
      {
        id: 'bronzeShield',
        cat: 'bronze',
        name: 'Bronze Wingshields',
        itemID: 'bronzeShield',
        itemAmount: 1,
        neededItem1: ['bar2', 3],
        levelRequired: 3,
        xpGain: 90,
        heatNeeded: 16,
        mCat: 11,
      },

      //iron
      {
        id: 'ironHatchet',
        cat: 'iron',
        name: 'Iron Hatchet',
        itemID: 'ironHatchet',
        itemAmount: 1,
        neededItem1: ['bar3', 2],
        levelRequired: 4,
        xpGain: 110,
        heatNeeded: 15,
        mCat: 0,
      },
      {
        id: 'ironClaws',
        cat: 'iron',
        name: 'Iron Claws',
        itemID: 'ironClaws',
        itemAmount: 1,
        neededItem1: ['bar3', 2],
        levelRequired: 4,
        xpGain: 110,
        heatNeeded: 15,
        mCat: 1,
      },
      {
        id: 'ironPickaxe',
        cat: 'iron',
        name: 'Iron Pickaxe',
        itemID: 'ironPickaxe',
        itemAmount: 1,
        neededItem1: ['bar3', 2],
        levelRequired: 4,
        xpGain: 110,
        heatNeeded: 15,
        mCat: 2,
      },
      {
        id: 'ironDagger',
        cat: 'iron',
        name: 'Iron Dagger',
        itemID: 'ironDagger',
        itemAmount: 1,
        neededItem1: ['bar3', 1],
        levelRequired: 4,
        xpGain: 55,
        heatNeeded: 8,
        mCat: 3,
      },
      {
        id: 'ironBroadsword',
        cat: 'iron',
        name: 'Iron Broadsword',
        itemID: 'ironBroadsword',
        itemAmount: 1,
        neededItem1: ['bar3', 2],
        levelRequired: 6,
        xpGain: 110,
        heatNeeded: 15,
        mCat: 4,
      },
      {
        id: 'ironMace',
        cat: 'iron',
        name: 'Iron Mace',
        itemID: 'ironMace',
        itemAmount: 1,
        neededItem1: ['bar3', 2],
        levelRequired: 6,
        xpGain: 110,
        heatNeeded: 15,
        mCat: 5,
      },
      {
        id: 'ironHeavy',
        cat: 'iron',
        name: 'Iron Battleaxe',
        itemID: 'ironHeavy',
        itemAmount: 1,
        neededItem1: ['bar3', 3],
        levelRequired: 6,
        xpGain: 165,
        heatNeeded: 22,
        mCat: 6,
      },
      {
        id: 'ironGreaves',
        cat: 'iron',
        name: 'Iron Greaves',
        itemID: 'ironGreaves',
        itemAmount: 1,
        neededItem1: ['bar3', 2],
        levelRequired: 4,
        xpGain: 110,
        heatNeeded: 15,
        mCat: 7,
      },
      {
        id: 'ironHelmet',
        cat: 'iron',
        name: 'Iron Helmet',
        itemID: 'ironHelmet',
        itemAmount: 1,
        neededItem1: ['bar3', 2],
        levelRequired: 4,
        xpGain: 110,
        heatNeeded: 15,
        mCat: 8,
      },
      {
        id: 'ironChainmail',
        cat: 'iron',
        name: 'Iron Chainmail',
        itemID: 'ironChainmail',
        itemAmount: 1,
        neededItem1: ['bar3', 4],
        levelRequired: 4,
        xpGain: 220,
        heatNeeded: 29,
        mCat: 9,
      },
      {
        id: 'ironPlate',
        cat: 'iron',
        name: 'Iron Plate',
        itemID: 'ironPlate',
        itemAmount: 1,
        neededItem1: ['bar3', 5],
        levelRequired: 6,
        xpGain: 275,
        heatNeeded: 36,
        mCat: 10,
      },
      {
        id: 'ironShield',
        cat: 'iron',
        name: 'Iron Wingshields',
        itemID: 'ironShield',
        itemAmount: 1,
        neededItem1: ['bar3', 3],
        levelRequired: 6,
        xpGain: 165,
        heatNeeded: 22,
        mCat: 11,
      },

      //steel
      {
        id: 'steelHatchet',
        cat: 'steel',
        name: 'Steel Hatchet',
        itemID: 'steelHatchet',
        itemAmount: 1,
        neededItem1: ['bar5', 2],
        levelRequired: 7,
        xpGain: 160,
        heatNeeded: 19,
        mCat: 0,
      },
      {
        id: 'steelClaws',
        cat: 'steel',
        name: 'Steel Claws',
        itemID: 'steelClaws',
        itemAmount: 1,
        neededItem1: ['bar5', 2],
        levelRequired: 7,
        xpGain: 160,
        heatNeeded: 19,
        mCat: 1,
      },
      {
        id: 'steelPickaxe',
        cat: 'steel',
        name: 'Steel Pickaxe',
        itemID: 'steelPickaxe',
        itemAmount: 1,
        neededItem1: ['bar5', 2],
        levelRequired: 7,
        xpGain: 160,
        heatNeeded: 19,
        mCat: 2,
      },
      {
        id: 'steelDagger',
        cat: 'steel',
        name: 'Steel Dagger',
        itemID: 'steelDagger',
        itemAmount: 1,
        neededItem1: ['bar5', 1],
        levelRequired: 7,
        xpGain: 80,
        heatNeeded: 10,
        mCat: 3,
      },
      {
        id: 'steelBroadsword',
        cat: 'steel',
        name: 'Steel Broadsword',
        itemID: 'steelBroadsword',
        itemAmount: 1,
        neededItem1: ['bar5', 2],
        levelRequired: 8,
        xpGain: 160,
        heatNeeded: 19,
        mCat: 4,
      },
      {
        id: 'steelMace',
        cat: 'steel',
        name: 'Steel Mace',
        itemID: 'steelMace',
        itemAmount: 1,
        neededItem1: ['bar5', 2],
        levelRequired: 8,
        xpGain: 160,
        heatNeeded: 19,
        mCat: 5,
      },
      {
        id: 'steelHeavy',
        cat: 'steel',
        name: 'Steel Greatsword',
        itemID: 'steelHeavy',
        itemAmount: 1,
        neededItem1: ['bar5', 3],
        levelRequired: 8,
        xpGain: 240,
        heatNeeded: 28,
        mCat: 6,
      },
      {
        id: 'steelGreaves',
        cat: 'steel',
        name: 'Steel Greaves',
        itemID: 'steelGreaves',
        itemAmount: 1,
        neededItem1: ['bar5', 2],
        levelRequired: 7,
        xpGain: 160,
        heatNeeded: 19,
        mCat: 7,
      },
      {
        id: 'steelHelmet',
        cat: 'steel',
        name: 'Steel Helmet',
        itemID: 'steelHelmet',
        itemAmount: 1,
        neededItem1: ['bar5', 2],
        levelRequired: 7,
        xpGain: 160,
        heatNeeded: 19,
        mCat: 8,
      },
      {
        id: 'steelChainmail',
        cat: 'steel',
        name: 'Steel Chainmail',
        itemID: 'steelChainmail',
        itemAmount: 1,
        neededItem1: ['bar5', 4],
        levelRequired: 7,
        xpGain: 320,
        heatNeeded: 37,
        mCat: 9,
      },
      {
        id: 'steelPlate',
        cat: 'steel',
        name: 'Steel Plate',
        itemID: 'steelPlate',
        itemAmount: 1,
        neededItem1: ['bar5', 5],
        levelRequired: 8,
        xpGain: 400,
        heatNeeded: 46,
        mCat: 10,
      },
      {
        id: 'steelShield',
        cat: 'steel',
        name: 'Steel Wingshields',
        itemID: 'steelShield',
        itemAmount: 1,
        neededItem1: ['bar5', 3],
        levelRequired: 8,
        xpGain: 240,
        heatNeeded: 28,
        mCat: 11,
      },

      //mythril
      {
        id: 'mythrilHatchet',
        cat: 'mythril',
        name: 'Mythril Hatchet',
        itemID: 'mythrilHatchet',
        itemAmount: 1,
        neededItem1: ['bar6', 2],
        levelRequired: 9,
        xpGain: 200,
        heatNeeded: 27,
        mCat: 0,
      },
      {
        id: 'mythrilClaws',
        cat: 'mythril',
        name: 'Mythril Claws',
        itemID: 'mythrilClaws',
        itemAmount: 1,
        neededItem1: ['bar6', 2],
        levelRequired: 9,
        xpGain: 200,
        heatNeeded: 27,
        mCat: 1,
      },
      {
        id: 'mythrilPickaxe',
        cat: 'mythril',
        name: 'Mythril Pickaxe',
        itemID: 'mythrilPickaxe',
        itemAmount: 1,
        neededItem1: ['bar6', 2],
        levelRequired: 9,
        xpGain: 200,
        heatNeeded: 27,
        mCat: 2,
      },
      {
        id: 'mythrilDagger',
        cat: 'mythril',
        name: 'Mythril Dagger',
        itemID: 'mythrilDagger',
        itemAmount: 1,
        neededItem1: ['bar6', 1],
        levelRequired: 9,
        xpGain: 100,
        heatNeeded: 14,
        mCat: 3,
      },
      {
        id: 'mythrilBroadsword',
        cat: 'mythril',
        name: 'Mythril Broadsword',
        itemID: 'mythrilBroadsword',
        itemAmount: 1,
        neededItem1: ['bar6', 2],
        levelRequired: 10,
        xpGain: 200,
        heatNeeded: 27,
        mCat: 4,
      },
      {
        id: 'mythrilMace',
        cat: 'mythril',
        name: 'Mythril Mace',
        itemID: 'mythrilMace',
        itemAmount: 1,
        neededItem1: ['bar6', 2],
        levelRequired: 10,
        xpGain: 200,
        heatNeeded: 27,
        mCat: 5,
      },
      {
        id: 'mythrilHeavy',
        cat: 'mythril',
        name: 'Mythril Greatsword',
        itemID: 'mythrilHeavy',
        itemAmount: 1,
        neededItem1: ['bar6', 3],
        levelRequired: 10,
        xpGain: 300,
        heatNeeded: 40,
        mCat: 6,
      },
      {
        id: 'mythrilGreaves',
        cat: 'mythril',
        name: 'Mythril Greaves',
        itemID: 'mythrilGreaves',
        itemAmount: 1,
        neededItem1: ['bar6', 2],
        levelRequired: 9,
        xpGain: 200,
        heatNeeded: 27,
        mCat: 7,
      },
      {
        id: 'mythrilHelmet',
        cat: 'mythril',
        name: 'Mythril Helmet',
        itemID: 'mythrilHelmet',
        itemAmount: 1,
        neededItem1: ['bar6', 2],
        levelRequired: 9,
        xpGain: 200,
        heatNeeded: 27,
        mCat: 8,
      },
      {
        id: 'mythrilChainmail',
        cat: 'mythril',
        name: 'Mythril Chainmail',
        itemID: 'mythrilChainmail',
        itemAmount: 1,
        neededItem1: ['bar6', 4],
        levelRequired: 9,
        xpGain: 400,
        heatNeeded: 53,
        mCat: 9,
      },
      {
        id: 'mythrilPlate',
        cat: 'mythril',
        name: 'Mythril Plate',
        itemID: 'mythrilPlate',
        itemAmount: 1,
        neededItem1: ['bar6', 5],
        levelRequired: 10,
        xpGain: 500,
        heatNeeded: 53,
        mCat: 10,
      },
      {
        id: 'mythrilShield',
        cat: 'mythril',
        name: 'Mythril Wingshields',
        itemID: 'mythrilShield',
        itemAmount: 1,
        neededItem1: ['bar6', 3],
        levelRequired: 10,
        xpGain: 300,
        heatNeeded: 40,
        mCat: 11,
      },
    ]
  }),
  getters: {
  },
  actions: {
    saveAll() {
      localStorage.setItem('smithing-efficency', JSON.stringify(this.efficency))
      localStorage.setItem('smithing-activeObject', JSON.stringify(this.activeObject))

      for (let i in this.equipmentMastery) {
        localStorage.setItem('smithing-equipmentMastery-mxp' + i, JSON.stringify(this.equipmentMastery[i].mxp))
        localStorage.setItem('smithing-equipmentMastery-mLevel' + i, JSON.stringify(this.equipmentMastery[i].mLevel))
        localStorage.setItem('smithing-equipmentMastery-mxpPrev' + i, JSON.stringify(this.equipmentMastery[i].mxpPrev))
        localStorage.setItem('smithing-equipmentMastery-mxpNext' + i, JSON.stringify(this.equipmentMastery[i].mxpNext))
      }

      let tempActivities = this.activities.filter(temp => temp.cat === 'bar')
      for (let i in tempActivities) {
        localStorage.setItem('smithing-bar-mxp' + i, JSON.stringify(tempActivities[i].mxp))
        localStorage.setItem('smithing-bar-mLevel' + i, JSON.stringify(tempActivities[i].mLevel))
        localStorage.setItem('smithing-bar-mxpPrev' + i, JSON.stringify(tempActivities[i].mxpPrev))
        localStorage.setItem('smithing-bar-mxpNext' + i, JSON.stringify(tempActivities[i].mxpNext))
      }
    },
    loadAll() {
      this.efficency = JSON.parse(localStorage.getItem('smithing-efficency'))

      for (let i in this.equipmentMastery) {
        this.equipmentMastery[i].mxp = JSON.parse(localStorage.getItem('smithing-equipmentMastery-mxp' + i)) ?? 0
        this.equipmentMastery[i].mLevel = JSON.parse(localStorage.getItem('smithing-equipmentMastery-mLevel' + i)) ?? 0
        this.equipmentMastery[i].mxpPrev = JSON.parse(localStorage.getItem('smithing-equipmentMastery-mxpPrev' + i)) ?? 0
        this.equipmentMastery[i].mxpNext = JSON.parse(localStorage.getItem('smithing-equipmentMastery-mxpNext' + i)) ?? 10
      }

      let tempActivities = this.activities.filter(temp => temp.cat === 'bar')
      for (let i in tempActivities) {
        tempActivities[i].mxp = JSON.parse(localStorage.getItem('smithing-bar-mxp' + i)) ?? 0
        tempActivities[i].mLevel = JSON.parse(localStorage.getItem('smithing-bar-mLevel' + i)) ?? 0
        tempActivities[i].mxpPrev = JSON.parse(localStorage.getItem('smithing-bar-mxpPrev' + i)) ?? 0
        tempActivities[i].mxpNext = JSON.parse(localStorage.getItem('smithing-bar-mxpNext' + i)) ?? 10
      }
    },

    onLoad() {
      //localstorage makes the active object a real boy instead of a reference to a real boy
      this.activeObject = JSON.parse(localStorage.getItem('smithing-activeObject'))
      this.activeObject = this.activities.find(t => t.id === this.activeObject.id)
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatActionHeat()
    },

    warp(ttime) {
      //if less than 2 seconds, do not attempt
      if (ttime < 2000) {
        return
      }
      if (this.activeObject.id == undefined) {
        return
      }
      let timeRemaining = ttime / 1000
      let timeNextLevel = -1
      let timeNextMLevel = -1
      let timeToUse = -1
      let avgInterval = 2

      if (this.activeObject.cat == 'bar') {
        avgInterval = Math.ceil((this.activeObject.heatNeeded / (this.heatFromUpgrades + (0.1 * this.activeObject.mLevel))) * 20) / 20
      } else {
        avgInterval = Math.ceil(((this.activeObject.heatNeeded / itemStore().equippedTools.smithingTool.toolStats.workPerAction) * (itemStore().equippedTools.smithingTool.toolStats.workSpeed)) + (this.activeObject.heatNeeded / this.heatFromUpgrades))
      }

      //if you can't smith in time, do not attempt
      if (avgInterval > timeRemaining) {
        return
      }

      //if not max level, do the calc
      if ((skillStore().skills[this.skillID].xpNext - skillStore().skills[this.skillID].xp) > 1) {
        //next level = action time * (xp to next level / xp per action)
        timeNextLevel = avgInterval * Math.ceil((skillStore().skills[this.skillID].xpNext - skillStore().skills[this.skillID].xp) / this.activeObject.xpGain)
      }

      //if not max mxp level, do the calc
      if ((this.activeObject.mxpNext - this.activeObject.mxp) > 1) {
        timeNextMLevel = avgInterval * (this.activeObject.mxpNext - this.activeObject.mxp)
      }

      //timeToUse = smallest time, or -1 if there is no smallest
      if (timeNextLevel != -1 && timeNextMLevel != -1) {
        timeToUse = Math.min(timeNextLevel, timeNextMLevel)
      } else if (timeNextLevel != -1) {
        timeToUse = timeNextLevel
      } else if (timeNextMLevel != -1) {
        timeToUse = timeNextMLevel
      }

      if (timeToUse < 1) {
        this.batchGain(timeRemaining, avgInterval)
        return
      }

      //if it will take longer to the next calc point than we have remaining time, use all of it
      if (timeToUse > timeRemaining) {
        this.batchGain(timeRemaining, avgInterval)
        return
      }

      this.batchGain(timeToUse, avgInterval)
      timeRemaining -= timeToUse
      this.warp(timeRemaining * 1000)
    },

    batchGain(ttime, tavg) {
      let item1 = itemStore().getItemCount(this.activeObject.neededItem1[0], 'resourceItems')
      let item2 = 90000
      if (this.activeObject.neededItem2) {
        item2 = itemStore().getItemCount(this.activeObject.neededItem2[0], 'resourceItems')
      }

      item1 = Math.floor(item1 / this.activeObject.neededItem1[1])
      if (this.activeObject.neededItem2) {
        item2 = Math.floor(item2 / this.activeObject.neededItem2[1])
      }

      if (item1 < 1 || item2 < 1) {
        this.cancelAction()
        return
      }

      let maxActions = Math.min(Math.min(item1, item2), Math.floor(ttime / tavg))
      let actions = Math.floor(maxActions * (1 + (this.efficency / 100)))

      //if bar
      if (this.activeObject.cat == 'bar') {
        if (itemStore().equippedTools.smithingTool.dcat == 'device') {
          mechanicsStore().addPendingXP(this.activeObject.xpGain * actions)
        } else {
          skillStore().addXP(this.skillID, (this.activeObject.xpGain * actions))
        }

        this.addMXP(actions)
        itemStore().changeItemCount(this.activeObject.itemID, (this.activeObject.itemAmount * actions), 'resourceItems')
      //if not-bar
      } else {
        if (itemStore().equippedTools.smithingTool.dcat == 'device') {
          mechanicsStore().addPendingXP(this.activeObject.xpGain * actions)
        } else {
          skillStore().addXP(this.skillID, (this.activeObject.xpGain * actions))
        }

        this.addMXPCat(actions, this.activeObject.mCat)
        itemStore().changeItemCount(this.activeObject.itemID, (this.activeObject.itemAmount * actions), 'equipmentItems')
      }

      //remove item(s)
      itemStore().changeItemCount(this.activeObject.neededItem1[0], (0 - (this.activeObject.neededItem1[1] * maxActions)), 'resourceItems')
      //second neededItem
      if (this.activeObject.neededItem2) {
        itemStore().changeItemCount(this.activeObject.neededItem2[0], (0 - (this.activeObject.neededItem2[1] * maxActions)), 'resourceItems')
      }
      skillStore().totalOffline -= (maxActions * tavg) * 1000

      this.updateEfficency()
      console.log('warp actions performed: ' + maxActions)
    },

    setActiveAction(newActiveActivity) {
      clearTimeout(this.currentTimeout)

      if (newActiveActivity.id == this.activeObject.id) {
        this.cancelAction()
        return
      }

      this.activeProgress = 0
      this.activePercent.a = 0
      this.activeObject = newActiveActivity

      skillStore().cancelCurrentActivity('smith')
      skillStore().setCurrentActivity(this.activeObject)
      skillStore().setCurrentCat('Smithing: ')
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatActionHeat()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.activeProgress = 0
      this.activePercent.a = 0
      this.activeObject = {}
      skillStore().setCurrentActivity({ name: 'Nothing' })
      skillStore().setCurrentCat('Currently Doing: ')
    },

    updateHeatProgress() {
      if (this.activeProgress >= (this.activeObject.heatNeeded * 1000)) {
        //if type bar, then succeed and repeat
        if (this.activeObject.cat == 'bar') {
          let wasEfficent = this.efficencyReturn()

          if (itemStore().equippedTools.smithingTool.dcat == 'device') {
            mechanicsStore().addPendingXP(this.activeObject.xpGain * wasEfficent)
          } else {
            skillStore().addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
          }

          this.addMXP(1 * wasEfficent)
          itemStore().changeItemCount(this.activeObject.itemID, (this.activeObject.itemAmount * wasEfficent), 'resourceItems')
          
          this.updateEfficency()

          //remove item(s)
          itemStore().changeItemCount(this.activeObject.neededItem1[0], (0 - this.activeObject.neededItem1[1]), 'resourceItems')
          //second neededItem
          if (this.activeObject.neededItem2) {
            itemStore().changeItemCount(this.activeObject.neededItem2[0], (0 - this.activeObject.neededItem2[1]), 'resourceItems')
          }

          this.activeProgress = 0
          this.tryRepeatActionHeat()
          return
        }
        //if not bar, then work
        this.activeProgress = this.activeObject.heatNeeded
        this.activePercent.a = 100 * this.activeProgress / this.activeObject.heatNeeded
        this.tryRepeatActionWork()
        return
      }
      //adds 0.1 more heat per masterylevel if a bar
      if (this.activeObject.cat == 'bar') {
        this.activeProgress += this.progressInterval * (this.heatFromUpgrades + (0.1 * this.activeObject.mLevel))
      }
      // if not bar, add heat
      else {
        this.activeProgress += this.progressInterval * this.heatFromUpgrades
      }

      this.activePercent.a = (this.activeProgress / (this.activeObject.heatNeeded * 10))
      this.tryRepeatActionHeat()
    },
    tryRepeatActionHeat() {
      //first neededItem
      if (itemStore().hasItemCount(this.activeObject.neededItem1[0], this.activeObject.neededItem1[1], 'resourceItems') == false) {
        this.cancelAction()
        return
      }

      //second neededItem
      if (this.activeObject.neededItem2) {
        if (itemStore().hasItemCount(this.activeObject.neededItem2[0], this.activeObject.neededItem2[1], 'resourceItems') == false) {
          this.cancelAction()
          return
        }
      }

      //we have enough boop
      this.currentTimeout = setTimeout(this.updateHeatProgress, this.progressInterval)
    },

    updateWorkProgress() {
      if (this.activeProgress <= 1) {
        let wasEfficent = this.efficencyReturn()

        if (itemStore().equippedTools.smithingTool.dcat == 'device') {
          mechanicsStore().addPendingXP(this.activeObject.xpGain * wasEfficent)
        } else {
          skillStore().addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
        }

        this.addMXPCat((1 * wasEfficent), this.activeObject.mCat)
        itemStore().changeItemCount(this.activeObject.itemID, (this.activeObject.itemAmount * wasEfficent), 'equipmentItems')
        
        this.updateEfficency()
        
        //remove item(s)
        itemStore().changeItemCount(this.activeObject.neededItem1[0], (0 - this.activeObject.neededItem1[1]), 'resourceItems')

        this.activeProgress = 0
        this.tryRepeatActionHeat()
        return
      }

      this.activeProgress -= itemStore().equippedTools.smithingTool.toolStats.workPerAction
      this.activeProgress = Math.max(0, this.activeProgress) //progress cannot be less than 0
      this.activePercent.a = 100 * this.activeProgress / this.activeObject.heatNeeded
      this.tryRepeatActionWork()
      return
    },
    tryRepeatActionWork() {
      this.currentTimeout = setTimeout(this.updateWorkProgress, itemStore().equippedTools.smithingTool.toolStats.workSpeed * 1000)
    },

    updateEfficency() {
      this.efficency = 2 * skillStore().skills[this.skillID].level
      this.efficency += itemStore().equippedStats.allEfficency
      if (itemStore().equippedTools.smithingTool.dcat == 'device') {
        this.efficency += mechanicsStore().activities[3].mLevel * 5
      }
      // if (skillStore().totalOffline >= 1000) {
      //   this.efficency += 50
      // }
    },
    efficencyReturn() {
      let a = 1 + Math.floor(this.efficency / 100)
      if (this.efficency % 100 >= (Math.random() * 100)) {
        a += 1
      }
      if (a == 2) {
        // console.log('efficent!')
      }
      if (a == 3) {
        console.log('double efficent!')
      }
      if (a == 4) {
        console.log('triple efficent!')
      }
      return a
    },

    addMXPCat(mxpAmount, mCatIndex) {
      let mxp = this.equipmentMastery[mCatIndex].mxp
      let mLevel = this.equipmentMastery[mCatIndex].mLevel
      let maxMLevel = 20
      if (this.activeObject.mLevel >= maxMLevel) {
        return
      }

      mxp += mxpAmount
      mLevel = levelFromMXP(mxp)

      if (mLevel >= maxMLevel) {
        this.equipmentMastery[mCatIndex].mxp = 28700
        this.equipmentMastery[mCatIndex].mxpNext = 28700
        this.equipmentMastery[mCatIndex].mLevel = 20
        return
      }

      this.equipmentMastery[mCatIndex].mxp = mxp

      // I should be able to just compute all of these, but I don't know how to get the data out.
      this.equipmentMastery[mCatIndex].mLevel = mLevel
      this.equipmentMastery[mCatIndex].mxpPrev = mxpFromLevel(mLevel)
      this.equipmentMastery[mCatIndex].mxpNext = mxpFromLevel(mLevel + 1)
    },
    addMXP(mxpAmount) {
      let maxMLevel = 20
      if (this.activeObject.mLevel >= maxMLevel) {
        return
      }

      this.activeObject.mxp += mxpAmount
      this.activeObject.mLevel = levelFromMXP(this.activeObject.mxp)

      if (this.activeObject.mLevel >= maxMLevel) {
        this.activeObject.mLevel = 20
        this.activeObject.mxp = 28700
        this.activeObject.mxpNext = 28700
        return
      }

      this.activeObject.mxpPrev = mxpFromLevel(this.activeObject.mLevel)
      this.activeObject.mxpNext = mxpFromLevel(this.activeObject.mLevel + 1)
    },
  }
})

export function levelFromMXP(mxp) {
  let mLevel = 0;
  while (mxpFromLevel(mLevel + 1) <= mxp) {
    mLevel++;
  }
  return mLevel;
}

export function mxpFromLevel(t) {
  if (t <= 0) return 0;
  t = t;

  const num = t;
  const summation = (num = 1) => {
    let res = 0;
    for (let i = 1; i <= num; i++) {
      res += (10 * (i ** 2));
    }
    return res;
  };
  return summation(num); // Sum of 10x^2, x=1 to 20 -> 28,700 actions
}