import { defineStore } from 'pinia'
import { useItemStore as itemStore } from '@/stores/inventory'
import { useSkillStore as skillStore } from '@/stores/skills'

export const useCookingStore = defineStore('cookingStore', {
  state: () => ({
    progressInterval: 50, // 20 update per second
    efficency: 2,

    activeObject: {},
    activeProgress: 0,
    activePercent: { a: 0, b: false, c: '#04AA6D' },
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
        xpGain: 4,
        cookTime: 3.00,
        baseCookTime: 3.00,
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
        xpGain: 8,
        cookTime: 4.75,
        baseCookTime: 4.75,
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
        xpGain: 15,
        cookTime: 6.50,
        baseCookTime: 6.50,
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
        xpGain: 20,
        cookTime: 8.25,
        baseCookTime: 8.25,
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
        neededItem1: 'plant2',
        neededItem2: 'plant5',
        levelRequired: 5,
        xpGain: 25,
        cookTime: 10.00,
        baseCookTime: 10.00,
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
        xpGain: 30,
        cookTime: 11.75,
        baseCookTime: 11.75,
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
        xpGain: 36,
        cookTime: 13.50,
        baseCookTime: 13.50,
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
        xpGain: 42,
        cookTime: 15.25,
        baseCookTime: 15.25,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'meal9',
        cat: 'meal',
        name: 'Maple Jerk',
        itemID: 'meal9',
        neededMeatItem1: 'meatFlank',
        neededItem1: 'plant6',
        neededItem2: 'rune7',
        levelRequired: 9,
        xpGain: 45,
        cookTime: 17.0,
        baseCookTime: 17.0,
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
        tempActivities[i].cookTime = JSON.parse(localStorage.getItem('cooking-meat-cookTime' + i)) ?? this.activities[i].baseCookTime
        tempActivities[i].mxp = JSON.parse(localStorage.getItem('cooking-meat-mxp' + i)) ?? 0
        tempActivities[i].mLevel = JSON.parse(localStorage.getItem('cooking-meat-mLevel' + i)) ?? 0
        tempActivities[i].mxpPrev = JSON.parse(localStorage.getItem('cooking-meat-mxpPrev' + i)) ?? 0
        tempActivities[i].mxpNext = JSON.parse(localStorage.getItem('cooking-meat-mxpNext' + i)) ?? 10
      }

      tempActivities = this.activities.filter(temp => temp.cat === 'meal')
      for (let i in tempActivities) {
        tempActivities[i].cookTime = JSON.parse(localStorage.getItem('cooking-meal-cookTime' + i)) ?? this.activities[i].baseCookTime
        tempActivities[i].mxp = JSON.parse(localStorage.getItem('cooking-meal-mxp' + i)) ?? 0
        tempActivities[i].mLevel = JSON.parse(localStorage.getItem('cooking-meal-mLevel' + i)) ?? 0
        tempActivities[i].mxpPrev = JSON.parse(localStorage.getItem('cooking-meal-mxpPrev' + i)) ?? 0
        tempActivities[i].mxpNext = JSON.parse(localStorage.getItem('cooking-meal-mxpNext' + i)) ?? 10
      }
    },
    
    onLoad() {
      //localstorage makes the active object a real boy instead of a reference to a real boy
      this.activeObject = JSON.parse(localStorage.getItem('cooking-activeObject'))
      this.activeObject = this.activities.find(t => t.id === this.activeObject.id)
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatActionCook()
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
      
      if (this.activeObject.cat == 'meat') {
        this.activeObject.cookTime = this.activeObject.baseCookTime * (1 - (this.activeObject.mLevel * 0.02))
      }

      avgInterval = (Math.ceil(this.activeObject.cookTime * (1 - itemStore().equippedTools.cookingTool.toolStats.cookSpeed) * 20) / 20)

      //if you can't cook in time, do not attempt
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
      let meat1 = 90000
      let item1 = 90000
      let item2 = 90000

      //first meat item
      if (this.activeObject.neededMeatItem1) {
        meat1 = itemStore().getItemCount(this.activeObject.neededMeatItem1, 'consumableItems')
      }
      //first resource item
      if (this.activeObject.neededItem1) {
        item1 = itemStore().getItemCount(this.activeObject.neededItem1, 'resourceItems')
      }
      //second resource item
      if (this.activeObject.neededItem2) {
        item2 = itemStore().getItemCount(this.activeObject.neededItem2, 'resourceItems')
      }

      if (meat1 < 1 || item1 < 1 || item2 < 1) {
        this.cancelAction()
        return
      }

      let maxActions = Math.min(Math.min(meat1, item1, item2), Math.floor(ttime / tavg))
      let actions = Math.floor(maxActions * (1 + (this.efficency / 100)))

      if (itemStore().equippedTools.cookingTool.dcat == 'device') {
        mechanicsStore().addPendingXP(this.activeObject.xpGain * actions)
      } else {
        skillStore().addXP(this.skillID, (this.activeObject.xpGain * actions))
      }

      this.addMXP(actions)
      itemStore().changeItemCount(this.activeObject.itemID, actions * (itemStore().equippedTools.cookingTool.toolStats.extraItems + 1), 'consumableItems')

      //first meat item
      if (this.activeObject.neededMeatItem1) {
        itemStore().changeItemCount(this.activeObject.neededMeatItem1, (-1 * maxActions), 'consumableItems')
      }
      //first resource item
      if (this.activeObject.neededItem1) {
        itemStore().changeItemCount(this.activeObject.neededItem1, (-1 * maxActions), 'resourceItems')
      }
      //second resource item
      if (this.activeObject.neededItem2) {
        itemStore().changeItemCount(this.activeObject.neededItem2, (-1 * maxActions), 'resourceItems')
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

      skillStore().cancelCurrentActivity('cook')
      skillStore().setCurrentActivity(this.activeObject)
      skillStore().setCurrentCat('Cooking: ')
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatActionCook()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.activeProgress = 0
      this.activePercent.a = 0
      this.activeObject = {}
      skillStore().setCurrentActivity({ name: 'Nothing' })
      skillStore().setCurrentCat('Currently Doing: ')
    },

    updateCookProgress() {
      if (this.activeProgress >= (this.activeObject.cookTime * (1 - itemStore().equippedTools.cookingTool.toolStats.cookSpeed) * 1000)) {
        let wasEfficent = this.efficencyReturn()

        skillStore().addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
        this.addMXP(1 * wasEfficent)
        itemStore().changeItemCount(this.activeObject.itemID, (1 * wasEfficent) + itemStore().equippedTools.cookingTool.toolStats.extraItems, 'consumableItems')
        this.updateEfficency()

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

        this.activeProgress = 0
        this.activePercent.a = 0
        this.tryRepeatActionCook()
        return
      }

      this.activeProgress += this.progressInterval
      this.activePercent.a = this.activeProgress / (this.activeObject.cookTime * (1 - itemStore().equippedTools.cookingTool.toolStats.cookSpeed) * 10)
      this.tryRepeatActionCook()
    },
    tryRepeatActionCook() {
      //update meat cook time
      if (this.activeObject.cat == 'meat') {
        this.activeObject.cookTime = this.activeObject.baseCookTime * (1 - (this.activeObject.mLevel * 0.02))
      }
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
      this.efficency += itemStore().equippedStats.allEfficency
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