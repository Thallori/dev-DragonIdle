import { defineStore } from 'pinia'
import { useSkillStore } from '@/stores/skills';
import { useItemStore } from '@/stores/inventory';


export const useSmithingStore = defineStore('smithingStore', {
  state: () => ({
    heatFromUpgrades: 2,
    workFromTools: 1,
    workInterval: 2000, // 2 seconds per update
    efficency: 2,

    activeObject: {},
    activeProgress: 0,
    activePercent: 0,
    currentTimeout: 0,

    progressInterval: 50,

    //smithing skill is stored as id 16 which is also its index, because I don't know how to do it otherwise
    skillID: 16,
    skillStore: useSkillStore(),
    itemStore: useItemStore(),

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
        mCat: 4,
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
        mCat: 5,
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
        mCat: 7,
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
        mCat: 8,
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
        mCat: 9,
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
        mCat: 4,
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
        mCat: 5,
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
        mCat: 6,
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
      },
    ]
  }),
  getters: {
  },
  actions: {
    setActiveAction(newActiveActivity) {
      clearTimeout(this.currentTimeout)

      if (newActiveActivity.id == this.activeObject.id) {
        this.cancelAction()
        return
      }

      this.activeProgress = 0
      this.activePercent = 0
      this.activeObject = newActiveActivity
      this.skillStore.setCurrentActivity(this.activeObject)
      this.skillStore.setCurrentCat('Smithing: ')
      this.tryRepeatActionHeat()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.activeProgress = 0
      this.activePercent = 0
      this.activeObject = {}
      this.skillStore.setCurrentActivity({ name: 'Nothing' })
      this.skillStore.setCurrentCat('Currently Doing: ')

      console.log('canceling action')
    },

    updateHeatProgress() {
      if (this.activeProgress >= (this.activeObject.heatNeeded * 1000)) {
        //if type bar, then succeed and repeat
        if (this.activeObject.cat == 'bar') {
          let wasEfficent = this.efficencyReturn()

          this.skillStore.addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
          this.addMXP(1 * wasEfficent)
          this.itemStore.changeItemCount(this.activeObject.itemID, (this.activeObject.itemAmount * wasEfficent), 'resourceItems')
          
          this.updateEfficency()

          //remove item(s)
          this.itemStore.changeItemCount(this.activeObject.neededItem1[0], (0 - this.activeObject.neededItem1[1]), 'resourceItems')
          //second neededItem
          if (this.activeObject.neededItem2) {
            this.itemStore.changeItemCount(this.activeObject.neededItem2[0], (0 - this.activeObject.neededItem2[1]), 'resourceItems')
          }


          console.log('boop')
          this.activeProgress = 0
          this.tryRepeatActionHeat()
          return
        }
        //if not bar, then work
        this.activeProgress = this.activeObject.heatNeeded
        this.activePercent = 100 * this.activeProgress / this.activeObject.heatNeeded
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

      this.activePercent = (this.activeProgress / (this.activeObject.heatNeeded * 10))
      this.tryRepeatActionHeat()
    },
    tryRepeatActionHeat() {

      //first neededItem
      if (this.itemStore.hasItemCount(this.activeObject.neededItem1[0], this.activeObject.neededItem1[1], 'resourceItems') == false) {
        this.cancelAction()
        return
      }

      //second neededItem
      if (this.activeObject.neededItem2) {
        if (this.itemStore.hasItemCount(this.activeObject.neededItem2[0], this.activeObject.neededItem2[1], 'resourceItems') == false) {
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

        this.skillStore.addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
        this.addMXPCat((1 * wasEfficent), this.activeObject.mCat)
        this.itemStore.changeItemCount(this.activeObject.itemID, (this.activeObject.itemAmount * wasEfficent), 'equipmentItems')
        
        this.updateEfficency()
        
        //remove item(s)
        this.itemStore.changeItemCount(this.activeObject.neededItem1[0], (0 - this.activeObject.neededItem1[1]), 'resourceItems')

        console.log('boop')
        this.activeProgress = 0
        this.tryRepeatActionHeat()
        return
      }

      this.activeProgress -= this.workFromTools
      this.activePercent = 100 * this.activeProgress / this.activeObject.heatNeeded
      this.tryRepeatActionWork()
      return
    },
    tryRepeatActionWork() {
      this.currentTimeout = setTimeout(this.updateWorkProgress, this.workInterval)
    },

    updateEfficency() {
      this.efficency = 2 * this.skillStore.skills[this.skillID].level
    },
    //TODO make efficency > 100 meaningful
    efficencyReturn() {
      if (this.efficency >= (Math.random() * 100)) {
        console.log('efficent!')
        return 2
      }
      return 1
    },

    addMXPCat(mxpAmount, mCatIndex) {
      let mxp = this.equipmentMastery[mCatIndex].mxp
      let mLevel = this.equipmentMastery[mCatIndex].mLevel
      let maxMLevel = 20

      mxp += mxpAmount
      mLevel = levelFromMXP(mxp)
      if (mLevel >= maxMLevel) {
        mLevel = maxMLevel
        mxp = mxpFromLevel(maxMLevel)
        this.equipmentMastery[mCatIndex].mxp = mxp
        this.equipmentMastery[mCatIndex].mLevel = mLevel
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
        this.activeObject.mLevel = maxMLevel
        this.activeObject.mxp = mxpFromLevel(maxMLevel)
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