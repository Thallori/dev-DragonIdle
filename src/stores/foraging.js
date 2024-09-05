import { defineStore } from 'pinia'
import { useItemStore as itemStore } from '@/stores/inventory'
import { useSkillStore as skillStore } from '@/stores/skills'
import { useExplorationStore as explorationStore } from '@/stores/exploration'

export const useForagingStore = defineStore('foragingStore', {
  state: () => ({
    progressInterval: 50, // 20 update per second
    gatherCounter: 0,
    efficency: 2,

    activeObject: {},
    activeProgress: 0,
    activePercent: { a: 0, b: false, c: '#04AA6D' },
    currentTimeout: 0,

    //foraging skill is stored as id 13 which is also its index, because I don't know how to do it otherwise
    skillID: 13,

    activities: [
      {
        id: '0',
        name: 'Oakbark',
        resourceID: 'plant1',
        resourceAmount: 1,
        levelRequired: 1,
        xpGain: 4,
        searchDifficulty: 4.0,
        gatherDifficulty: 3.0,
        baseYield: 3,
        currentYield: 3,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '1',
        name: 'Sunflax',
        resourceID: 'plant2',
        resourceAmount: 1,
        levelRequired: 2,
        xpGain: 7,
        searchDifficulty: 8.0,
        gatherDifficulty: 4.0,
        baseYield: 3,
        currentYield: 3,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '2',
        name: 'Mossberry',
        resourceID: 'plant3',
        resourceAmount: 1,
        levelRequired: 3,
        xpGain: 6,
        searchDifficulty: 9.0,
        gatherDifficulty: 3.0,
        baseYield: 3,
        currentYield: 3,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '3',
        name: 'Snow Cotton',
        resourceID: 'plant4',
        resourceAmount: 1,
        levelRequired: 4,
        xpGain: 11,
        searchDifficulty: 5.0,
        gatherDifficulty: 5.0,
        baseYield: 3,
        currentYield: 3,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '4',
        name: 'Rosemilk',
        resourceID: 'plant5',
        resourceAmount: 1,
        levelRequired: 5,
        xpGain: 10,
        searchDifficulty: 14.0,
        gatherDifficulty: 3.0,
        baseYield: 3,
        currentYield: 3,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '5',
        name: 'Drip Maple',
        resourceID: 'plant6',
        resourceAmount: 1,
        levelRequired: 6,
        xpGain: 14,
        searchDifficulty: 16.0,
        gatherDifficulty: 4.0,
        baseYield: 3,
        currentYield: 3,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '6',
        name: 'Siris Silk',
        resourceID: 'plant7',
        resourceAmount: 1,
        levelRequired: 7,
        xpGain: 12,
        searchDifficulty: 18.0,
        gatherDifficulty: 3.0,
        baseYield: 3,
        currentYield: 3,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '7',
        name: 'Sweet Cane',
        resourceID: 'plant8',
        resourceAmount: 1,
        levelRequired: 8,
        xpGain: 18,
        searchDifficulty: 12.0,
        gatherDifficulty: 5.0,
        baseYield: 3,
        currentYield: 3,
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
      localStorage.setItem('foraging-efficency', JSON.stringify(this.efficency))
      localStorage.setItem('foraging-activeObject', JSON.stringify(this.activeObject))

      for (let i in this.activities) {
        localStorage.setItem('foraging-currentYield' + i, JSON.stringify(this.activities[i].currentYield))
        localStorage.setItem('foraging-mxp' + i, JSON.stringify(this.activities[i].mxp))
        localStorage.setItem('foraging-mLevel' + i, JSON.stringify(this.activities[i].mLevel))
        localStorage.setItem('foraging-mxpPrev' + i, JSON.stringify(this.activities[i].mxpPrev))
        localStorage.setItem('foraging-mxpNext' + i, JSON.stringify(this.activities[i].mxpNext))
      }
    },
    loadAll() {
      this.efficency = JSON.parse(localStorage.getItem('foraging-efficency'))

      for (let i in this.activities) {
        this.activities[i].currentYield = JSON.parse(localStorage.getItem('foraging-currentYield' + i))
        this.activities[i].mxp = JSON.parse(localStorage.getItem('foraging-mxp' + i))
        this.activities[i].mLevel = JSON.parse(localStorage.getItem('foraging-mLevel' + i))
        this.activities[i].mxpPrev = JSON.parse(localStorage.getItem('foraging-mxpPrev' + i))
        this.activities[i].mxpNext = JSON.parse(localStorage.getItem('foraging-mxpNext' + i))
      }
    },

    onLoad() {
      //localstorage makes the active object a real boy instead of a reference to a real boy
      this.activeObject = JSON.parse(localStorage.getItem('foraging-activeObject'))
      this.activeObject = this.activities[this.activeObject.id]
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatAction()
    },

    setActiveAction(newActiveActivity) {
      clearTimeout(this.currentTimeout)

      if (newActiveActivity.id == this.activeObject.id) {
        this.cancelAction()
        return
      }

      this.gatherCounter = 0
      this.activeProgress = 0
      this.activePercent.a = 0
      this.activeObject = newActiveActivity

      skillStore().cancelCurrentActivity('forage')
      skillStore().setCurrentActivity(this.activeObject)
      skillStore().setCurrentCat('Foraging: ')
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatAction()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.gatherCounter = 0
      this.activeProgress = 0
      this.activePercent.a = 0
      this.activeObject = {}
      skillStore().setCurrentActivity({ name: 'Nothing' })
      skillStore().setCurrentCat('Currently Doing: ')
    },

    updateProgress() {
      if (this.activeProgress >= (1000 * this.activeObject.searchDifficulty * (1 - itemStore().equippedTools.foragingTool.toolStats.locatingMultiplierAdd))) {

        this.activeProgress = this.activeObject.gatherDifficulty
        this.activePercent.a = 100
        this.gatherCounter = this.activeObject.currentYield
        this.actionSuccess()

        this.tryRepeatGather()
        return
      }

      this.activeProgress += this.progressInterval
      this.activePercent.a = this.activeProgress / (10 * this.activeObject.searchDifficulty * (1 - itemStore().equippedTools.foragingTool.toolStats.locatingMultiplierAdd))

      this.tryRepeatAction()
    },
    tryRepeatAction() {
      this.currentTimeout = setTimeout(this.updateProgress, this.progressInterval)
    },

    updateGatherProgress() {
      this.actionSuccess()

      if (this.gatherCounter <= 0) {
        this.gatherCounter = 0
        this.activeProgress = 0
        this.tryRepeatAction()
        return
      }
      this.tryRepeatGather()
    },
    tryRepeatGather() {
      //gather difficult - tool bonus in seconds
      this.currentTimeout = setTimeout(this.updateGatherProgress, ((this.activeObject.gatherDifficulty - itemStore().equippedTools.foragingTool.toolStats.harvestingTimeBonus) * 1000))
    },

    actionSuccess() {
      let wasEfficent = this.efficencyReturn()

      skillStore().addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
      this.addMXP(1 * wasEfficent)
      itemStore().changeItemCount(this.activeObject.resourceID, (this.activeObject.resourceAmount * wasEfficent), 'resourceItems')

      this.updateEfficency()
      this.updateYield()

      this.gatherCounter -= 1
      this.activePercent.a = 100 * this.gatherCounter / this.activeObject.currentYield
    },

    updateEfficency() {
      this.efficency = 2 * skillStore().skills[this.skillID].level
      this.efficency += explorationStore().activities[3].mLevel //area4
      if (skillStore().totalOffline >= 1000) {
        this.efficency += 75
      }
    },
    efficencyReturn() {
      let a = 1 + Math.floor(this.efficency / 100)
      if (this.efficency % 100 >= (Math.random() * 100)) {
        a += 1
      }
      if (a == 2) {
        console.log('efficent!')
      }
      if (a == 3) {
        console.log('double efficent!')
      }
      if (a == 4) {
        console.log('triple efficent!')
      }
      return a
    },
    updateYield() {
      //if mLevel is maxed, then yield is 25 instead of 20 + mLevel
      if (this.activeObject.mLevel >= 20) {
        this.activeObject.currentYield = 25
        return
      }
      
      //add 1 to the counter if you level up mid-harvest, this results in a small bug when mLevel reaches 20, losing you a single harvest, but it means less math is done every check at max mLevel.
      if (this.activeObject.currentYield < this.activeObject.baseYield + this.activeObject.mLevel) {
        this.activeObject.currentYield = this.activeObject.baseYield + this.activeObject.mLevel
        this.gatherCounter += 1
      }
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