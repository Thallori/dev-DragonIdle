import { defineStore } from 'pinia'
import { useSkillStore as skillStore } from '@/stores/skills';
import { useItemStore as itemStore } from '@/stores/inventory';

export const useMechanicsStore = defineStore('mechanicsStore', {
  state: () => ({
    progressInterval: 50, // 1 second per update
    efficency: 2,

    activeObject: {},
    activeProgress: 0,
    activePercent: { a: 0, b: false, c: '#04AA6D' },
    currentTimeout: null,

    //mechanics skill is stored as id 18 which is also its index, because I don't know how to do it otherwise
    skillID: 8,
    pendingXP: 0,

    activities: [
      //tools
      {
        id: 'device1',
        cat: 'tool',
        name: 'Polypass',
        itemID: 'device1',
        neededItem1: ['components1', 1],
        neededItem2: ['components8', 1],
        neededItem3: ['parts1', 20],
        levelRequired: 1,
        xpGain: 2,
        timeNeeded: 10,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'device3',
        cat: 'tool',
        name: 'Clockwork Pendant',
        itemID: 'device3',
        neededItem1: ['components4', 1],
        neededItem2: ['components2', 1],
        neededItem3: ['parts1', 40],
        levelRequired: 3,
        xpGain: 3,
        timeNeeded: 11,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'device4',
        cat: 'tool',
        name: 'Auto-Hammer',
        itemID: 'device4',
        neededItem1: ['components1', 1],
        neededItem2: ['components6', 1],
        neededItem3: ['parts1', 60],
        levelRequired: 4,
        xpGain: 4,
        timeNeeded: 12,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'device6',
        cat: 'tool',
        name: 'Thread Trimmer',
        itemID: 'device6',
        neededItem1: ['components1', 1],
        neededItem2: ['components4', 1],
        neededItem3: ['parts1', 100],
        levelRequired: 6,
        xpGain: 4,
        timeNeeded: 8,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'device9',
        cat: 'tool',
        name: 'Convector',
        itemID: 'device9',
        neededItem1: ['components1', 1],
        neededItem2: ['components6', 1],
        neededItem3: ['parts1', 160],
        levelRequired: 9,
        xpGain: 10,
        timeNeeded: 12,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },

      //equipment
      {
        id: 'device2',
        cat: 'equipment',
        name: 'Loop Reloader',
        itemID: 'device2',
        neededItem1: ['components3', 1],
        neededItem2: ['components5', 1],
        neededItem3: ['parts1', 30],
        levelRequired: 2,
        xpGain: 3,
        timeNeeded: 12,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'device5',
        cat: 'equipment',
        name: 'Laminar Pump',
        itemID: 'device5',
        neededItem1: ['components3', 1],
        neededItem2: ['components5', 1],
        neededItem3: ['parts1', 80],
        levelRequired: 5,
        xpGain: 5,
        timeNeeded: 12,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'device7',
        cat: 'equipment',
        name: 'Deja-View',
        itemID: 'device7',
        neededItem1: ['components3', 1],
        neededItem2: ['components5', 1],
        neededItem3: ['parts1', 120],
        levelRequired: 7,
        xpGain: 6,
        timeNeeded: 10,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'device8',
        cat: 'equipment',
        name: 'Deliverator',
        itemID: 'device8',
        neededItem1: ['components2', 1],
        neededItem2: ['components8', 1],
        neededItem3: ['parts1', 140],
        levelRequired: 8,
        xpGain: 8,
        timeNeeded: 11,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },

      //elements
      // {
      //   id: 'ele0',
      //   cat: 'component',
      //   name: 'Simple Parts',
      //   itemID: 'parts1',
      //   recipes: [
      //     ['parts1', 25],
      //     ['parts2', 25],
      //     ['parts3', 25],
      //   ],
      //   levelRequired: 1,
      //   xpGain: 1,
      //   timeNeeded: 5,
      //   mxp: 0,
      //   mLevel: 0,
      //   mxpPrev: 0,
      //   mxpNext: 10,
      // },
      {
        id: 'ele1',
        cat: 'component',
        name: 'Practical',
        itemID: 'components1',
        neededItem1: ['parts3', 30],
        neededItem2: ['parts4', 20],
        levelRequired: 1,
        xpGain: 1,
        timeNeeded: 5,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'ele2',
        cat: 'component',
        name: 'Direct',
        itemID: 'components2',
        neededItem1: ['parts1', 30],
        neededItem2: ['parts3', 20],
        levelRequired: 1,
        xpGain: 1,
        timeNeeded: 5,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'ele3',
        cat: 'component',
        name: 'Protective',
        itemID: 'components3',
        neededItem1: ['parts1', 30],
        neededItem2: ['parts2', 20],
        levelRequired: 1,
        xpGain: 1,
        timeNeeded: 5,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'ele4',
        cat: 'component',
        name: 'Precious',
        itemID: 'components4',
        neededItem1: ['parts2', 30],
        neededItem2: ['parts1', 20],
        levelRequired: 1,
        xpGain: 1,
        timeNeeded: 5,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'ele5',
        cat: 'component',
        name: 'Catalytic',
        itemID: 'components5',
        neededItem1: ['parts4', 30],
        neededItem2: ['parts1', 20],
        levelRequired: 1,
        xpGain: 1,
        timeNeeded: 5,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'ele6',
        cat: 'component',
        name: 'Hearty',
        itemID: 'components6',
        neededItem1: ['parts2', 30],
        neededItem2: ['parts4', 20],
        levelRequired: 1,
        xpGain: 1,
        timeNeeded: 5,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'ele8',
        cat: 'component',
        name: 'Ethereal',
        itemID: 'components8',
        neededItem1: ['parts4', 30],
        neededItem2: ['parts2', 20],
        levelRequired: 1,
        xpGain: 1,
        timeNeeded: 5,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
    ],
  }),
  getters: {
  },
  actions: {
    saveAll() {
      localStorage.setItem('mechanics-efficency', JSON.stringify(this.efficency))
      localStorage.setItem('mechanics-activeObject', JSON.stringify(this.activeObject))
      localStorage.setItem('mechanics-pendingXP', JSON.stringify(this.pendingXP))

      for (let i in this.activities) {
        localStorage.setItem('mechanics-mxp' + i, JSON.stringify(this.activities[i].mxp))
        localStorage.setItem('mechanics-mLevel' + i, JSON.stringify(this.activities[i].mLevel))
        localStorage.setItem('mechanics-mxpPrev' + i, JSON.stringify(this.activities[i].mxpPrev))
        localStorage.setItem('mechanics-mxpNext' + i, JSON.stringify(this.activities[i].mxpNext))
      }
    },
    loadAll() {
      this.efficency = JSON.parse(localStorage.getItem('mechanics-efficency'))
      this.pendingXP = JSON.parse(localStorage.getItem('mechanics-pendingXP'))

      for (let i in this.activities) {
        this.activities[i].mxp = JSON.parse(localStorage.getItem('mechanics-mxp' + i)) ?? 0
        this.activities[i].mLevel = JSON.parse(localStorage.getItem('mechanics-mLevel' + i)) ?? 0
        this.activities[i].mxpPrev = JSON.parse(localStorage.getItem('mechanics-mxpPrev' + i)) ?? 0
        this.activities[i].mxpNext = JSON.parse(localStorage.getItem('mechanics-mxpNext' + i)) ?? 10
      }
    },

    onLoad() {
      //localstorage makes the active object a real boy instead of a reference to a real boy
      this.activeObject = JSON.parse(localStorage.getItem('mechanics-activeObject'))
      this.activeObject = this.activities.find(t => t.id === this.activeObject.id)
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatAction()
    },

    warp(ttime) {
      //if less than 6 seconds, do not attempt
      if (ttime < 6000) {
        return
      }
      if (this.activeObject.id == undefined) {
        return
      }
      let timeRemaining = ttime / 1000
      let timeNextLevel = -1
      let timeNextMLevel = -1
      let timeToUse = -1
      let avgInterval = 4

      avgInterval = this.activeObject.timeNeeded

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

    batchGain(ttime, tavg, timeRemaining) {
      let item1 = itemStore().getItemCount(this.activeObject.neededItem1[0], 'mechanicsItems')
      let item2 = 90000
      let item3 = 90000
      if (this.activeObject.neededItem2) {
        item2 = itemStore().getItemCount(this.activeObject.neededItem2[0], 'mechanicsItems')
      }
      if (this.activeObject.neededItem3) {
        item3 = itemStore().getItemCount(this.activeObject.neededItem3[0], 'mechanicsItems')
      }

      item1 = Math.floor(item1 / this.activeObject.neededItem1[1])
      if (this.activeObject.neededItem2) {
        item2 = Math.floor(item2 / this.activeObject.neededItem2[1])
      }
      if (this.activeObject.neededItem3) {
        item3 = Math.floor(item3 / this.activeObject.neededItem3[1])
      }

      if (item1 < 1 || item2 < 1 || item3 < 1) {
        this.cancelAction()
        return
      }

      let maxActions = Math.min(Math.min(item1, item2, item3), Math.floor(ttime / tavg))
      let actions = Math.floor(maxActions * (1 + (this.efficency / 100)))

      skillStore().addXP(this.skillID, (this.activeObject.xpGain * actions))
      this.addMXP(actions)
      //if a component, then making mechanics items
      if (this.activeObject.cat == 'component') {
        itemStore().changeItemCount(this.activeObject.itemID, actions, 'mechanicsItems')
        //else, making equipment items
      } else {
        itemStore().changeItemCount(this.activeObject.itemID, actions, 'equipmentItems')
      }

      //remove item(s)
      itemStore().changeItemCount(this.activeObject.neededItem1[0], (0 - (this.activeObject.neededItem1[1] * maxActions)), 'mechanicsItems')
      if (this.activeObject.neededItem2) {
        itemStore().changeItemCount(this.activeObject.neededItem2[0], (0 - (this.activeObject.neededItem2[1] * maxActions)), 'mechanicsItems')
      }
      if (this.activeObject.neededItem3) {
        itemStore().changeItemCount(this.activeObject.neededItem3[0], (0 - (this.activeObject.neededItem3[1] * maxActions)), 'mechanicsItems')
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

      skillStore().cancelCurrentActivity('mechanics')
      skillStore().setCurrentActivity(this.activeObject)
      skillStore().setCurrentCat('Machining: ')
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatAction()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.activeProgress = 0
      this.activePercent.a = 0
      this.activeObject = {}
      skillStore().setCurrentActivity({ name: 'Nothing' })
      skillStore().setCurrentCat('Currently Doing: ')
    },

    updateMachineProgress() {
      if (this.activeProgress >= (this.activeObject.timeNeeded * 1000)) {
        //if a component, then mLevel applies
        let componentCheck = 0
        if (this.activeObject.cat == 'component') {
          componentCheck = this.activeObject.mLevel
        }
        //remove item(s)
        itemStore().changeItemCount(this.activeObject.neededItem1[0], (componentCheck - this.activeObject.neededItem1[1]), 'mechanicsItems')
        if (this.activeObject.neededItem2) {
          itemStore().changeItemCount(this.activeObject.neededItem2[0], (componentCheck - this.activeObject.neededItem2[1]), 'mechanicsItems')
        }
        if (this.activeObject.neededItem3) {
          itemStore().changeItemCount(this.activeObject.neededItem3[0], (componentCheck - this.activeObject.neededItem3[1]), 'mechanicsItems')
        }

        let wasEfficent = this.efficencyReturn()
        skillStore().addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
        this.addMXP(1 * wasEfficent)

        //if a component, then making mechanics items
        if (this.activeObject.cat == 'component') {
          itemStore().changeItemCount(this.activeObject.itemID, (1 * wasEfficent), 'mechanicsItems')
        //else, making equipment items
        } else {
          itemStore().changeItemCount(this.activeObject.itemID, (1 * wasEfficent), 'equipmentItems')
        }

        this.updateEfficency()
        this.activeProgress = 0
        this.activePercent.a = 0
        this.tryRepeatAction()
        return
      }
      
      this.activeProgress += this.progressInterval
      this.activePercent.a = (this.activeProgress / (this.activeObject.timeNeeded * 10))
      this.tryTypeTimer()
    },
    tryRepeatAction() {
      //if a component, then mLevel applies
      let componentCheck = 0
      if (this.activeObject.cat == 'component') {
        componentCheck = this.activeObject.mLevel
      }

      //first neededItem
      if (itemStore().hasItemCount(this.activeObject.neededItem1[0], this.activeObject.neededItem1[1] - componentCheck, 'mechanicsItems') == false) {
        this.cancelAction()
        return
      }
      //second neededItem
      if (this.activeObject.neededItem2) {
        if (itemStore().hasItemCount(this.activeObject.neededItem2[0], this.activeObject.neededItem2[1] - componentCheck, 'mechanicsItems') == false) {
          this.cancelAction()
          return
        }
      }
      //third neededItem
      if (this.activeObject.neededItem3) {
        if (itemStore().hasItemCount(this.activeObject.neededItem3[0], this.activeObject.neededItem3[1], 'mechanicsItems') == false) {
          this.cancelAction()
          return
        }
      }
      //we have enough boop
      this.tryTypeTimer()
    },
    tryTypeTimer() {
      this.currentTimeout = setTimeout(this.updateMachineProgress, this.progressInterval)
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
    addPendingXP(temp) {
      this.pendingXP += temp
      // console.log('gained ' + temp + ' pending mechanics xp')
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