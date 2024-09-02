import { defineStore } from 'pinia'
import { useItemStore as itemStore } from '@/stores/inventory'
import { useSkillStore as skillStore } from '@/stores/skills'

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

    activities: [
      {
        id: 'friedChops',
        cat: 'meat',
        name: 'Fried Chops',
        itemID: 'friedChops',
        neededMeatItem1: 'meatChop',
        levelRequired: 1,
        xpGain: 3,
        cookTime: 2.75,
        baseCookTime: 2.75,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'searedGame',
        cat: 'meat',
        name: 'Seared Game',
        itemID: 'searedGame',
        neededMeatItem1: 'meatGame',
        levelRequired: 3,
        xpGain: 5,
        cookTime: 4.25,
        baseCookTime: 4.25,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'flankSteak',
        cat: 'meat',
        name: 'Flank Steak',
        itemID: 'flankSteak',
        neededMeatItem1: 'meatFlank',
        levelRequired: 5,
        xpGain: 7,
        cookTime: 5.50,
        baseCookTime: 5.50,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'shelledCrisps',
        cat: 'meat',
        name: 'Shelled Crisps',
        itemID: 'shelledCrisps',
        neededMeatItem1: 'meatSpicy',
        levelRequired: 8,
        xpGain: 10,
        cookTime: 6.75,
        baseCookTime: 6.75,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'meal1',
        cat: 'meal',
        name: 'Barkchew',
        itemID: 'meal1',
        neededItem1: 'plant1',
        levelRequired: 1,
        xpGain: 3,
        cookTime: 2.00,
        baseCookTime: 2.00,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'meal2',
        cat: 'meal',
        name: 'Flax Bread',
        itemID: 'meal2',
        neededItem1: 'plant2',
        levelRequired: 2,
        xpGain: 5,
        cookTime: 3.25,
        baseCookTime: 3.25,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'meal3',
        cat: 'meal',
        name: 'Berry Pie',
        itemID: 'meal3',
        neededItem1: 'plant2',
        neededItem2: 'plant3',
        levelRequired: 3,
        xpGain: 9,
        cookTime: 4.50,
        baseCookTime: 4.50,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'meal4',
        cat: 'meal',
        name: 'Glazed Chops',
        itemID: 'meal4',
        neededMeatItem1: 'meatChop',
        neededItem1: 'plant3',
        levelRequired: 4,
        xpGain: 12,
        cookTime: 5.75,
        baseCookTime: 5.75,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'meal5',
        cat: 'meal',
        name: 'Flatcake',
        itemID: 'meal5',
        neededItem1: 'plant3',
        neededItem2: 'plant5',
        levelRequired: 5,
        xpGain: 17,
        cookTime: 7.00,
        baseCookTime: 7.00,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'meal6',
        cat: 'meal',
        name: 'Sticky Game',
        itemID: 'meal6',
        neededMeatItem1: 'meatGame',
        neededItem1: 'plant6',
        levelRequired: 6,
        xpGain: 22,
        cookTime: 8.25,
        baseCookTime: 8.25,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'meal7',
        cat: 'meal',
        name: 'Flank Bun',
        itemID: 'meal7',
        neededMeatItem1: 'meatFlank',
        neededItem1: 'plant2',
        levelRequired: 7,
        xpGain: 25,
        cookTime: 9.50,
        baseCookTime: 9.50,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'meal8',
        cat: 'meal',
        name: 'Shell Cake',
        itemID: 'meal8',
        neededMeatItem1: 'meatSpicy',
        neededItem1: 'plant2',
        neededItem2: 'plant8',
        levelRequired: 8,
        xpGain: 32,
        cookTime: 10.75,
        baseCookTime: 10.75,
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
    saveAll() {
      localStorage.setItem('cooking-efficency', JSON.stringify(this.efficency))
      localStorage.setItem('cooking-activeObject', JSON.stringify(this.activeObject))

      let tempActivities = this.activities.filter(temp => temp.cat === 'meat')
      for (let i in tempActivities) {
        localStorage.setItem('cooking-meat-cookTime' + i, JSON.stringify(tempActivities[i].cookTime))
        localStorage.setItem('cooking-meat-mxp' + i, JSON.stringify(tempActivities[i].mxp))
        localStorage.setItem('cooking-meat-mLevel' + i, JSON.stringify(tempActivities[i].mLevel))
        localStorage.setItem('cooking-meat-mxpPrev' + i, JSON.stringify(tempActivities[i].mxpPrev))
        localStorage.setItem('cooking-meat-mxpNext' + i, JSON.stringify(tempActivities[i].mxpNext))
      }

      tempActivities = this.activities.filter(temp => temp.cat === 'meal')
      for (let i in tempActivities) {
        localStorage.setItem('cooking-meal-cookTime' + i, JSON.stringify(tempActivities[i].cookTime))
        localStorage.setItem('cooking-meal-mxp' + i, JSON.stringify(tempActivities[i].mxp))
        localStorage.setItem('cooking-meal-mLevel' + i, JSON.stringify(tempActivities[i].mLevel))
        localStorage.setItem('cooking-meal-mxpPrev' + i, JSON.stringify(tempActivities[i].mxpPrev))
        localStorage.setItem('cooking-meal-mxpNext' + i, JSON.stringify(tempActivities[i].mxpNext))
      }
    },
    loadAll() {
      this.efficency = JSON.parse(localStorage.getItem('cooking-efficency'))

      let tempActivities = this.activities.filter(temp => temp.cat === 'meat')
      for (let i in tempActivities) {
        tempActivities[i].cookTime = JSON.parse(localStorage.getItem('cooking-meat-cookTime' + i))
        tempActivities[i].mxp = JSON.parse(localStorage.getItem('cooking-meat-mxp' + i))
        tempActivities[i].mLevel = JSON.parse(localStorage.getItem('cooking-meat-mLevel' + i))
        tempActivities[i].mxpPrev = JSON.parse(localStorage.getItem('cooking-meat-mxpPrev' + i))
        tempActivities[i].mxpNext = JSON.parse(localStorage.getItem('cooking-meat-mxpNext' + i))
      }

      tempActivities = this.activities.filter(temp => temp.cat === 'meal')
      for (let i in tempActivities) {
        tempActivities[i].cookTime = JSON.parse(localStorage.getItem('cooking-meal-cookTime' + i))
        tempActivities[i].mxp = JSON.parse(localStorage.getItem('cooking-meal-mxp' + i))
        tempActivities[i].mLevel = JSON.parse(localStorage.getItem('cooking-meal-mLevel' + i))
        tempActivities[i].mxpPrev = JSON.parse(localStorage.getItem('cooking-meal-mxpPrev' + i))
        tempActivities[i].mxpNext = JSON.parse(localStorage.getItem('cooking-meal-mxpNext' + i))
      }
    },
    
    onLoad() {
      //localstorage makes the active object a real boy instead of a reference to a real boy
      this.activeObject = JSON.parse(localStorage.getItem('cooking-activeObject'))
      this.activeObject = this.activities.find(t => t.id === this.activeObject.id)
      this.tryRepeatActionCook()
    },

    setActiveAction(newActiveActivity) {
      clearTimeout(this.currentTimeout)

      if (newActiveActivity.id == this.activeObject.id) {
        this.cancelAction()
        return
      }

      this.activeProgress = 0
      this.activePercent = 0
      this.activeObject = newActiveActivity

      skillStore().cancelCurrentActivity('cook')
      skillStore().setCurrentActivity(this.activeObject)
      skillStore().setCurrentCat('Cooking: ')
      this.tryRepeatActionCook()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.activeProgress = 0
      this.activePercent = 0
      this.activeObject = {}
      skillStore().setCurrentActivity({ name: 'Nothing' })
      skillStore().setCurrentCat('Currently Doing: ')
    },

    updateCookProgress() {
      if (this.activeProgress >= (this.activeObject.cookTime * 1000)) {
        let wasEfficent = this.efficencyReturn()

        skillStore().addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
        this.addMXP(1 * wasEfficent)
        itemStore().changeItemCount(this.activeObject.itemID, (1 * wasEfficent), 'consumableItems')

        this.updateEfficency()
        //update meat cook time
        if (this.activeObject.cat == 'meat') {
          this.activeObject.cookTime = this.activeObject.baseCookTime * (1 - (this.activeObject.mLevel * 0.02))
        }

        //first meat item
        if (this.activeObject.neededMeatItem1) {
          itemStore().changeItemCount(this.activeObject.neededMeatItem1, -1, 'consumableItems')
        }
        //first resource item
        if (this.activeObject.neededItem1) {
          itemStore().changeItemCount(this.activeObject.neededItem1, -1, 'resourceItems')
        }
        //second resource item
        if (this.activeObject.neededItem2) {
          itemStore().changeItemCount(this.activeObject.neededItem2, -1, 'resourceItems')
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
        if (itemStore().hasItemCount(this.activeObject.neededMeatItem1, 1, 'consumableItems') == false) {
          this.cancelAction()
          return
        }
      }
      //first resource item
      if (this.activeObject.neededItem1) {
        if (itemStore().hasItemCount(this.activeObject.neededItem1, 1, 'resourceItems') == false) {
          this.cancelAction()
          return
        }
      }
      //second resource item
      if (this.activeObject.neededItem2) {
        if (itemStore().hasItemCount(this.activeObject.neededItem2, 1, 'resourceItems') == false) {
          this.cancelAction()
          return
        }
      }

      //we have enough boop
      this.currentTimeout = setTimeout(this.updateCookProgress, this.progressInterval)
    },

    updateEfficency() {
      this.efficency = 2 * skillStore().skills[this.skillID].level
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