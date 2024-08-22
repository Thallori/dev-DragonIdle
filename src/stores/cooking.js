import { defineStore } from 'pinia'
import { useSkillStore } from '@/stores/skills';
import { useItemStore } from '@/stores/inventory';

export const useCookingStore = defineStore('cookingStore', {
  state: () => ({
    progressInterval: 50, // 20 update per second
    efficency: 2,

    activeObject: {},
    activeProgress: 0,
    activePercent: 0,
    currentTimeout: 0,

    //cooking skill is stored as id 20 which is also its index, because I don't know how to do it otherwise
    skillID: 20,
    skillStore: useSkillStore(),
    itemStore: useItemStore(),

    activities: [
      {
        id: '0',
        cat: 'meat',
        name: 'Fried Chops',
        itemID: 'friedChops',
        neededMeatItem1: 'meatChop',
        levelRequired: 1,
        xpGain: 3,
        cookTime: 2.75,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '1',
        cat: 'meat',
        name: 'Seared Game',
        itemID: 'searedGame',
        neededMeatItem1: 'meatGame',
        levelRequired: 3,
        xpGain: 5,
        cookTime: 4.25,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '2',
        cat: 'meat',
        name: 'Flank Steak',
        itemID: 'flankSteak',
        neededMeatItem1: 'meatFlank',
        levelRequired: 5,
        xpGain: 7,
        cookTime: 5.50,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '3',
        cat: 'meat',
        name: 'Shelled Crisps',
        itemID: 'shelledCrisps',
        neededMeatItem1: 'meatSpicy',
        levelRequired: 8,
        xpGain: 10,
        cookTime: 6.75,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '4',
        cat: 'meal',
        name: 'Barkchew',
        itemID: 'meal1',
        neededItem1: 'plant1',
        levelRequired: 1,
        xpGain: 3,
        cookTime: 2.00,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '5',
        cat: 'meal',
        name: 'Flax Bread',
        itemID: 'meal2',
        neededItem1: 'plant2',
        levelRequired: 2,
        xpGain: 5,
        cookTime: 3.25,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '6',
        cat: 'meal',
        name: 'Berry Pie',
        itemID: 'meal3',
        neededItem1: 'plant2',
        neededItem2: 'plant3',
        levelRequired: 3,
        xpGain: 9,
        cookTime: 4.50,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '7',
        cat: 'meal',
        name: 'Glazed Chops',
        itemID: 'meal4',
        neededMeatItem1: 'meatChop',
        neededItem1: 'plant3',
        levelRequired: 4,
        xpGain: 12,
        cookTime: 5.75,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '8',
        cat: 'meal',
        name: 'Flatcake',
        itemID: 'meal5',
        neededItem1: 'plant3',
        neededItem2: 'plant5',
        levelRequired: 5,
        xpGain: 17,
        cookTime: 7.00,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '9',
        cat: 'meal',
        name: 'Sticky Game',
        itemID: 'meal6',
        neededMeatItem1: 'meatGame',
        neededItem1: 'plant6',
        levelRequired: 6,
        xpGain: 22,
        cookTime: 8.25,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '10',
        cat: 'meal',
        name: 'Flank Bun',
        itemID: 'meal7',
        neededMeatItem1: 'meatFlank',
        neededItem1: 'plant2',
        levelRequired: 7,
        xpGain: 25,
        cookTime: 9.50,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '11',
        cat: 'meal',
        name: 'Shell Cake',
        itemID: 'meal8',
        neededMeatItem1: 'meatSpicy',
        neededItem1: 'plant2',
        neededItem2: 'plant8',
        levelRequired: 8,
        xpGain: 32,
        cookTime: 10.75,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
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

      this.skillStore.cancelCurrentActivity('cook')
      this.skillStore.setCurrentActivity(this.activeObject)
      this.skillStore.setCurrentCat('Cooking: ')
      this.tryRepeatActionCook()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.activeProgress = 0
      this.activePercent = 0
      this.activeObject = {}
      this.skillStore.setCurrentActivity({ name: 'Nothing' })
      this.skillStore.setCurrentCat('Currently Doing: ')
    },

    updateCookProgress() {
      if (this.activeProgress >= (this.activeObject.cookTime * 1000)) {
        let wasEfficent = this.efficencyReturn()

        this.skillStore.addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
        this.addMXP(1 * wasEfficent)
        this.itemStore.changeItemCount(this.activeObject.itemID, (1 * wasEfficent), 'consumableItems')

        this.updateEfficency()

        //first meat item
        if (this.activeObject.neededMeatItem1) {
          this.itemStore.changeItemCount(this.activeObject.neededMeatItem1, -1, 'consumableItems')
        }
        //first resource item
        if (this.activeObject.neededItem1) {
          this.itemStore.changeItemCount(this.activeObject.neededItem1, -1, 'resourceItems')
        }
        //second resource item
        if (this.activeObject.neededItem2) {
          this.itemStore.changeItemCount(this.activeObject.neededItem2, -1, 'resourceItems')
        }

        console.log('boop')
        this.activeProgress = 0
        this.activePercent = 0
        this.tryRepeatActionCook()
        return
      }

      this.activeProgress += this.progressInterval
      this.activePercent = this.activeProgress / (this.activeObject.cookTime * 10)
      this.tryRepeatActionCook()
    },
    tryRepeatActionCook() {

      //first meat item
      if (this.activeObject.neededMeatItem1) {
        if (this.itemStore.hasItemCount(this.activeObject.neededMeatItem1, 1, 'consumableItems') == false) {
          this.cancelAction()
          return
        }
      }
      //first resource item
      if (this.activeObject.neededItem1) {
        if (this.itemStore.hasItemCount(this.activeObject.neededItem1, 1, 'resourceItems') == false) {
          this.cancelAction()
          return
        }
      }
      //second resource item
      if (this.activeObject.neededItem2) {
        if (this.itemStore.hasItemCount(this.activeObject.neededItem2, 1, 'resourceItems') == false) {
          this.cancelAction()
          return
        }
      }

      //we have enough boop
      this.currentTimeout = setTimeout(this.updateCookProgress, this.progressInterval)
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