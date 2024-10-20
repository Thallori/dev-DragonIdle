import { defineStore } from 'pinia'
import { useSkillStore as skillStore } from '@/stores/skills'
import { useExplorationStore as explorationStore } from '@/stores/exploration'
import { useItemStore as itemStore } from '@/stores/inventory'

export const useScryingStore = defineStore('scryingStore', {
  state: () => ({
    progressInterval: 200, //will get randomized
    baseSyphoningInterval: 2, //seconds
    efficency: 2,

    activeObject: {},
    activeProgress: 0,
    activePercent: { a: 0, b: false, c: '#04AA6D' },
    currentTimeout: 0,

    //scrying skill is stored as id 12 which is also its index, because I don't know how to do it otherwise
    skillID: 12,

    activities: [
      {
        id: '0',
        name: 'Pale Clay',
        resourceID: 'rune1',
        resourceAmount: 1,
        levelRequired: 1,
        xpGain: 3,
        fortifyTime: 2,
        baseStability: 0.50,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '1',
        name: 'Pure Oil',
        resourceID: 'rune2',
        resourceAmount: 1,
        levelRequired: 2,
        xpGain: 6,
        fortifyTime: 4,
        baseStability: 0.45,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '2',
        name: 'Nitor',
        resourceID: 'rune3',
        resourceAmount: 1,
        levelRequired: 3,
        xpGain: 11,
        fortifyTime: 8,
        baseStability: 0.40,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '3',
        name: 'Spelldew',
        resourceID: 'rune4',
        resourceAmount: 1,
        levelRequired: 4,
        xpGain: 9,
        fortifyTime: 6,
        baseStability: 0.45,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '4',
        name: 'Cinnabar',
        resourceID: 'rune5',
        resourceAmount: 1,
        levelRequired: 5,
        xpGain: 15,
        fortifyTime: 10,
        baseStability: 0.40,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '5',
        name: 'Vis',
        resourceID: 'rune6',
        resourceAmount: 1,
        levelRequired: 6,
        xpGain: 20,
        fortifyTime: 12,
        baseStability: 0.35,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '6',
        name: 'Sparksalt',
        resourceID: 'rune7',
        resourceAmount: 1,
        levelRequired: 7,
        xpGain: 25,
        fortifyTime: 14,
        baseStability: 0.35,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '7',
        name: 'Flux Crystal',
        resourceID: 'rune8',
        resourceAmount: 1,
        levelRequired: 8,
        xpGain: 22,
        fortifyTime: 10,
        baseStability: 0.30,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '8',
        name: 'Naptha',
        resourceID: 'rune9',
        resourceAmount: 1,
        levelRequired: 9,
        xpGain: 32,
        fortifyTime: 14,
        baseStability: 0.25,
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
      localStorage.setItem('scrying-efficency', JSON.stringify(this.efficency))
      localStorage.setItem('scrying-activeObject', JSON.stringify(this.activeObject))

      for (let i in this.activities) {
        localStorage.setItem('scrying-mxp' + i, JSON.stringify(this.activities[i].mxp))
        localStorage.setItem('scrying-mLevel' + i, JSON.stringify(this.activities[i].mLevel))
        localStorage.setItem('scrying-mxpPrev' + i, JSON.stringify(this.activities[i].mxpPrev))
        localStorage.setItem('scrying-mxpNext' + i, JSON.stringify(this.activities[i].mxpNext))
      }
    },
    loadAll() {
      this.efficency = JSON.parse(localStorage.getItem('scrying-efficency'))

      for (let i in this.activities) {
        this.activities[i].mxp = JSON.parse(localStorage.getItem('scrying-mxp' + i)) ?? 0
        this.activities[i].mLevel = JSON.parse(localStorage.getItem('scrying-mLevel' + i)) ?? 0
        this.activities[i].mxpPrev = JSON.parse(localStorage.getItem('scrying-mxpPrev' + i)) ?? 0
        this.activities[i].mxpNext = JSON.parse(localStorage.getItem('scrying-mxpNext' + i)) ?? 10
      }
    },

    onLoad() {
      //localstorage makes the active object a real boy instead of a reference to a real boy
      this.activeObject = JSON.parse(localStorage.getItem('scrying-activeObject'))
      this.activeObject = this.activities[this.activeObject.id]
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatAction()
    },

    warp(ttime) {
      //if less than 5 seconds, do not attempt
      if (ttime < 5000) {
        return
      }
      if (this.activeObject.id == undefined) {
        return console.error('tried to warp without a target')
      }
      let timeRemaining = ttime / 1000
      let timeNextLevel = -1
      let timeNextMLevel = -1
      let timeToUse = -1

      let avgInterval = 10

      //avg interval = syphoning time + (fortify time / avg yield)
      avgInterval = (this.baseSyphoningInterval - itemStore().equippedTools.scryingTool.toolStats.bonusSyphoningTime) + (this.activeObject.fortifyTime / (1 / (1 - Math.min(0.9999999, (this.activeObject.baseStability + itemStore().equippedTools.scryingTool.toolStats.baseStabilityBonus + (this.activeObject.mLevel * 0.02)))) ))

      //if you can't syphon in time, do not attempt
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

      //if both xp and mxp are maxed out, then 
      if (timeToUse < 1) {
        this.batchGain(timeRemaining, avgInterval)
        skillStore().totalOffline -= timeRemaining * 1000
        return
      }

      if (timeToUse > timeRemaining) {
        this.batchGain(timeRemaining, avgInterval)
        skillStore().totalOffline -= timeRemaining * 1000
        return
      }

      this.batchGain(timeToUse, avgInterval)
      timeRemaining -= timeToUse
      skillStore().totalOffline -= timeToUse * 1000
      this.warp(timeRemaining * 1000)
    },

    batchGain(ttime, tavg) {
      let actions = Math.floor(ttime * (1 + (this.efficency / 100)) / tavg)

      skillStore().addXP(this.skillID, (this.activeObject.xpGain * actions))
      this.addMXP(actions)

      itemStore().changeItemCount(this.activeObject.resourceID, actions, 'resourceItems')

      this.updateEfficency()
      console.log('warp actions performed: ' + actions)
    },

    setActiveAction(newActiveActivity) {
      clearTimeout(this.currentTimeout)

      if (newActiveActivity.id == this.activeObject.id) {
        this.cancelAction()
        return
      }

      this.activeProgress = 0
      this.activePercent.a = 0
      this.activePercent.b = false
      this.activeObject = newActiveActivity

      skillStore().cancelCurrentActivity('scry')
      skillStore().setCurrentActivity(this.activeObject)
      skillStore().setCurrentCat('Scrying: ')
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatAction()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.activeProgress = 0
      this.activePercent.a = 0
      this.activePercent.b = false
      this.activeObject = {}
      skillStore().setCurrentActivity({ name: 'Nothing' })
      skillStore().setCurrentCat('Currently Doing: ')
    },

    updateProgress() {
      if (this.activeProgress >= (1000 * this.activeObject.fortifyTime)) {

        this.activePercent.a = 100
        this.activePercent.b = true
        this.tryRepeatGather()
        return
      }

      this.activeProgress += this.progressInterval
      this.activePercent.a = (this.activeProgress / (10 * this.activeObject.fortifyTime))
      this.progressInterval = (Math.random() * 450) + 150

      //don't wait longer than you have to
      if (this.progressInterval + this.activeProgress >= 1000 * this.activeObject.fortifyTime) {
        this.progressInterval = (1000 * this.activeObject.fortifyTime) - this.activeProgress
      }
      this.tryRepeatAction()
    },
    tryRepeatAction() {
      this.currentTimeout = setTimeout(this.updateProgress, this.progressInterval)
    },

    updateGatherProgress() {
      let wasEfficent = this.efficencyReturn()

      skillStore().addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
      this.addMXP(1 * wasEfficent)
      itemStore().changeItemCount(this.activeObject.resourceID, (this.activeObject.resourceAmount * wasEfficent), 'resourceItems')

      //if a random number between 0 and 1 is greater than stability, crash
      if (Math.random() > (this.activeObject.baseStability + itemStore().equippedTools.scryingTool.toolStats.baseStabilityBonus + (this.activeObject.mLevel * 0.02))) {

        this.activeProgress = 0
        this.activePercent.a = 0
        this.activePercent.b = false
        this.tryRepeatAction()
        return
      }

      this.tryRepeatGather()
    },
    tryRepeatGather() {
      this.currentTimeout = setTimeout(this.updateGatherProgress, (this.baseSyphoningInterval - itemStore().equippedTools.scryingTool.toolStats.bonusSyphoningTime) * 1000)
    },

    updateEfficency() {
      this.efficency = 2 * skillStore().skills[this.skillID].level
      this.efficency += itemStore().equippedStats.allEfficency
      this.efficency += explorationStore().activities[2].mLevel //vibrant vale
      this.efficency += explorationStore().activities[4].mLevel //brecciated bluff
      // if (skillStore().totalOffline >= 1000) {
      //   this.efficency += 75
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