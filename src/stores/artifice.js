import { defineStore } from 'pinia'
import { useSkillStore as skillStore } from '@/stores/skills';
import { useItemStore as itemStore } from '@/stores/inventory';

export const useArtificeStore = defineStore('artificeStore', {
  state: () => ({
    settingInterval: 1000, // 1 second per update
    efficency: 2,

    activeObject: {},
    activeProgress: 0,
    activePercent: { a: 0, b: false, c: '#04AA6D' },
    currentTimeout: null,

    progressInterval: 50,

    //artifice skill is stored as id 18 which is also its index, because I don't know how to do it otherwise
    skillID: 18,

    equipmentMastery: [
      {
        id: 'wand',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'staff',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'book',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'orb',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'wing',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
    ],
    activities: [
      //charges
      {
        id: 'charge1',
        cat: 'charge',
        name: 'Strike Charge',
        itemID: 'charge1',
        amountGiven: 5,
        neededItem1: ['rune1', 1],
        levelRequired: 1,
        xpGain: 2,
        typingNeeded: 1.5,
        settingNeeded: 2,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'charge2',
        cat: 'charge',
        name: 'Flash Charge',
        itemID: 'charge2',
        amountGiven: 5,
        neededItem1: ['rune3', 1],
        levelRequired: 3,
        xpGain: 4,
        typingNeeded: 1.5,
        settingNeeded: 2,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'charge3',
        cat: 'charge',
        name: 'Wave Charge',
        itemID: 'charge3',
        amountGiven: 5,
        neededItem1: ['rune4', 1],
        levelRequired: 4,
        xpGain: 5,
        typingNeeded: 1.5,
        settingNeeded: 2,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'charge4',
        cat: 'charge',
        name: 'Rush Charge',
        itemID: 'charge4',
        amountGiven: 5,
        neededItem1: ['rune6', 1],
        levelRequired: 6,
        xpGain: 7,
        typingNeeded: 1.5,
        settingNeeded: 2,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'charge5',
        cat: 'charge',
        name: 'Bolt Charge',
        itemID: 'charge5',
        amountGiven: 5,
        neededItem1: ['rune7', 1],
        levelRequired: 7,
        xpGain: 8,
        typingNeeded: 1.5,
        settingNeeded: 2,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },

      //wands
      {
        id: 'wand1',
        cat: 'wand',
        mCat: 0,
        name: 'Pale Wand',
        itemID: 'wand1',
        neededItem1: ['rune1', 3],
        neededItem2: ['plant1', 1],
        levelRequired: 1,
        xpGain: 20,
        typingNeeded: 10,
        settingNeeded: 5,
      },
      {
        id: 'wand2',
        cat: 'wand',
        mCat: 0,
        name: 'Pure Wand',
        itemID: 'wand2',
        neededItem1: ['rune2', 3],
        neededItem2: ['plant1', 1],
        levelRequired: 2,
        xpGain: 30,
        typingNeeded: 15,
        settingNeeded: 5,
      },
      {
        id: 'wand3',
        cat: 'wand',
        mCat: 0,
        name: 'Spelldew Wand',
        itemID: 'wand3',
        neededItem1: ['rune4', 3],
        neededItem2: ['plant1', 1],
        levelRequired: 4,
        xpGain: 60,
        typingNeeded: 25,
        settingNeeded: 5,
      },
      {
        id: 'wand4',
        cat: 'wand',
        mCat: 0,
        name: 'Vis Wand',
        itemID: 'wand4',
        neededItem1: ['rune6', 3],
        neededItem2: ['plant6', 1],
        levelRequired: 6,
        xpGain: 110,
        typingNeeded: 35,
        settingNeeded: 5,
      },
      {
        id: 'wand5',
        cat: 'wand',
        mCat: 0,
        name: 'Flux Wand',
        itemID: 'wand5',
        neededItem1: ['rune8', 3],
        neededItem2: ['plant6', 1],
        levelRequired: 8,
        xpGain: 170,
        typingNeeded: 45,
        settingNeeded: 5,
      },

      //staffs
      {
        id: 'staff1',
        cat: 'staff',
        mCat: 1,
        name: 'Pure Staff',
        itemID: 'staff1',
        neededItem1: ['rune2', 5],
        neededItem2: ['plant1', 2],
        neededItem3: ['bar1', 1],
        levelRequired: 2,
        xpGain: 55,
        typingNeeded: 25,
        settingNeeded: 10,
      },
      {
        id: 'staff2',
        cat: 'staff',
        mCat: 1,
        name: 'Nitor Staff',
        itemID: 'staff2',
        neededItem1: ['rune3', 5],
        neededItem2: ['plant1', 2],
        neededItem3: ['ore3', 1],
        levelRequired: 3,
        xpGain: 80,
        typingNeeded: 30,
        settingNeeded: 10,
      },
      {
        id: 'staff3',
        cat: 'staff',
        mCat: 1,
        name: 'Cinnabar Staff',
        itemID: 'staff3',
        neededItem1: ['rune5', 5],
        neededItem2: ['plant1', 2],
        neededItem3: ['bar4', 1],
        levelRequired: 5,
        xpGain: 120,
        typingNeeded: 40,
        settingNeeded: 10,
      },
      {
        id: 'staff4',
        cat: 'staff',
        mCat: 1,
        name: 'Sparksalt Staff',
        itemID: 'staff4',
        neededItem1: ['rune7', 5],
        neededItem2: ['plant6', 2],
        neededItem3: ['glassBar', 1],
        levelRequired: 7,
        xpGain: 205,
        typingNeeded: 50,
        settingNeeded: 10,
      },
      {
        id: 'staff5',
        cat: 'staff',
        mCat: 1,
        name: 'Naptha Staff',
        itemID: 'staff5',
        neededItem1: ['rune9', 5],
        neededItem2: ['plant6', 2],
        neededItem3: ['bar6', 1],
        levelRequired: 9,
        xpGain: 290,
        typingNeeded: 60,
        settingNeeded: 10,
      },

      //books
      {
        id: 'book1',
        cat: 'book',
        mCat: 2,
        name: 'Pure Grimoire',
        itemID: 'book1',
        neededItem1: ['rune2', 6],
        neededItem2: ['plant2', 3],
        levelRequired: 2,
        xpGain: 90,
        typingNeeded: 30,
        settingNeeded: 20,
      },
      {
        id: 'book2',
        cat: 'book',
        mCat: 2,
        name: 'Spelldew Grimoire',
        itemID: 'book2',
        neededItem1: ['rune4', 6],
        neededItem2: ['plant4', 3],
        levelRequired: 4,
        xpGain: 180,
        typingNeeded: 50,
        settingNeeded: 20,
      },
      {
        id: 'book3',
        cat: 'book',
        mCat: 2,
        name: 'Sparksalt Grimoire',
        itemID: 'book3',
        neededItem1: ['rune7', 6],
        neededItem2: ['plant7', 3],
        levelRequired: 7,
        xpGain: 415,
        typingNeeded: 80,
        settingNeeded: 20,
      },

      //orbs
      {
        id: 'orb1',
        cat: 'orb',
        mCat: 3,
        name: 'Amber Orb',
        itemID: 'orb1',
        neededItem1: ['rune3', 2],
        neededItem2: ['ore3', 1],
        levelRequired: 3,
        xpGain: 35,
        typingNeeded: 15,
        settingNeeded: 5,
      },
      {
        id: 'orb2',
        cat: 'orb',
        mCat: 3,
        name: 'Silver Orb',
        itemID: 'orb2',
        neededItem1: ['rune5', 2],
        neededItem2: ['ore5', 1],
        levelRequired: 5,
        xpGain: 65,
        typingNeeded: 25,
        settingNeeded: 5,
      },
      {
        id: 'orb3',
        cat: 'orb',
        mCat: 3,
        name: 'Spinel Orb',
        itemID: 'orb3',
        neededItem1: ['rune8', 2],
        neededItem2: ['pinkGem', 1],
        levelRequired: 8,
        xpGain: 150,
        typingNeeded: 40,
        settingNeeded: 5,
      },

      //wings
      {
        id: 'wingward1',
        cat: 'wing',
        mCat: 4,
        name: 'Nitor Wingwards',
        itemID: 'wingward1',
        neededItem1: ['rune3', 4],
        neededItem2: ['rune1', 2],
        levelRequired: 3,
        xpGain: 95,
        typingNeeded: 35,
        settingNeeded: 15,
      },
      {
        id: 'wingward2',
        cat: 'wing',
        mCat: 4,
        name: 'Cinnabar Wingwards',
        itemID: 'wingward2',
        neededItem1: ['rune5', 4],
        neededItem2: ['rune1', 2],
        levelRequired: 5,
        xpGain: 160,
        typingNeeded: 55,
        settingNeeded: 15,
      },
      {
        id: 'wingward3',
        cat: 'wing',
        mCat: 4,
        name: 'Sparksalt Wingwards',
        itemID: 'wingward3',
        neededItem1: ['rune8', 4],
        neededItem2: ['rune6', 2],
        levelRequired: 8,
        xpGain: 350,
        typingNeeded: 85,
        settingNeeded: 15,
      },
      // {
      //   id: 'wingward4',
      //   cat: 'wing',
      //   mCat: 4,
      //   name: 'wingward4',
      //   itemID: 'wingward4',
      //   neededItem1: ['rune11', 4],
      //   neededItem2: ['rune10', 2],
      //   levelRequired: 11,
      //   xpGain: 650,
      //   typingNeeded: 115,
      //   settingNeeded: 15,
      // },
    ],
  }),
  getters: {
  },
  actions: {
    saveAll() {
      localStorage.setItem('artifice-efficency', JSON.stringify(this.efficency))
      localStorage.setItem('artifice-activeObject', JSON.stringify(this.activeObject))

      for (let i in this.equipmentMastery) {
        localStorage.setItem('artifice-equipmentMastery-mxp' + i, JSON.stringify(this.equipmentMastery[i].mxp))
        localStorage.setItem('artifice-equipmentMastery-mLevel' + i, JSON.stringify(this.equipmentMastery[i].mLevel))
        localStorage.setItem('artifice-equipmentMastery-mxpPrev' + i, JSON.stringify(this.equipmentMastery[i].mxpPrev))
        localStorage.setItem('artifice-equipmentMastery-mxpNext' + i, JSON.stringify(this.equipmentMastery[i].mxpNext))
      }

      let tempActivities = this.activities.filter(temp => temp.cat === 'charge')
      for (let i in tempActivities) {
        localStorage.setItem('artifice-charge-mxp' + i, JSON.stringify(tempActivities[i].mxp))
        localStorage.setItem('artifice-charge-mLevel' + i, JSON.stringify(tempActivities[i].mLevel))
        localStorage.setItem('artifice-charge-mxpPrev' + i, JSON.stringify(tempActivities[i].mxpPrev))
        localStorage.setItem('artifice-charge-mxpNext' + i, JSON.stringify(tempActivities[i].mxpNext))
      }
    },
    loadAll() {
      this.efficency = JSON.parse(localStorage.getItem('artifice-efficency'))

      for (let i in this.equipmentMastery) {
        this.equipmentMastery[i].mxp = JSON.parse(localStorage.getItem('artifice-equipmentMastery-mxp' + i)) ?? 0
        this.equipmentMastery[i].mLevel = JSON.parse(localStorage.getItem('artifice-equipmentMastery-mLevel' + i)) ?? 0
        this.equipmentMastery[i].mxpPrev = JSON.parse(localStorage.getItem('artifice-equipmentMastery-mxpPrev' + i)) ?? 0
        this.equipmentMastery[i].mxpNext = JSON.parse(localStorage.getItem('artifice-equipmentMastery-mxpNext' + i)) ?? 10
      }

      let tempActivities = this.activities.filter(temp => temp.cat === 'charge')
      for (let i in tempActivities) {
        tempActivities[i].mxp = JSON.parse(localStorage.getItem('artifice-charge-mxp' + i)) ?? 0
        tempActivities[i].mLevel = JSON.parse(localStorage.getItem('artifice-charge-mLevel' + i)) ?? 0
        tempActivities[i].mxpPrev = JSON.parse(localStorage.getItem('artifice-charge-mxpPrev' + i)) ?? 0
        tempActivities[i].mxpNext = JSON.parse(localStorage.getItem('artifice-charge-mxpNext' + i)) ?? 10
      }
    },

    onLoad() {
      //localstorage makes the active object a real boy instead of a reference to a real boy
      this.activeObject = JSON.parse(localStorage.getItem('artifice-activeObject'))
      this.activeObject = this.activities.find(t => t.id === this.activeObject.id)
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatActionType()
    },

    warp(ttime) {
      //if less than 4 seconds, do not attempt
      if (ttime < 4000) {
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

      avgInterval = this.activeObject.typingNeeded + this.activeObject.settingNeeded

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
      let item3 = 90000
      if (this.activeObject.neededItem2) {
        item2 = itemStore().getItemCount(this.activeObject.neededItem2[0], 'resourceItems')
      }
      if (this.activeObject.neededItem3) {
        item3 = itemStore().getItemCount(this.activeObject.neededItem3[0], 'resourceItems')
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

      //if charge
      if (this.activeObject.cat == 'charge') {
        skillStore().addXP(this.skillID, (this.activeObject.xpGain * actions))
        this.addMXP(actions)
        itemStore().changeItemCount(this.activeObject.itemID, ((this.activeObject.amountGiven + this.activeObject.mLevel) * actions), 'equipmentItems')

        //if not-charge
      } else {
        skillStore().addXP(this.skillID, (this.activeObject.xpGain * actions))
        this.addMXPCat(actions, this.activeObject.mCat)
        itemStore().changeItemCount(this.activeObject.itemID, actions, 'equipmentItems')
      }

      //remove item(s)
      itemStore().changeItemCount(this.activeObject.neededItem1[0], (0 - (this.activeObject.neededItem1[1] * maxActions)), 'resourceItems')
      if (this.activeObject.neededItem2) {
        itemStore().changeItemCount(this.activeObject.neededItem2[0], (0 - (this.activeObject.neededItem2[1] * maxActions)), 'resourceItems')
      }
      if (this.activeObject.neededItem3) {
        itemStore().changeItemCount(this.activeObject.neededItem3[0], (0 - (this.activeObject.neededItem3[1] * maxActions)), 'resourceItems')
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

      skillStore().cancelCurrentActivity('artifice')
      skillStore().setCurrentActivity(this.activeObject)
      skillStore().setCurrentCat('Artificing: ')
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatActionType()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.activeProgress = 0
      this.activePercent.a = 0
      this.activeObject = {}
      skillStore().setCurrentActivity({ name: 'Nothing' })
      skillStore().setCurrentCat('Currently Doing: ')
    },

    updateTypeProgress() {
      if (this.activeProgress + this.progressInterval >= (this.activeObject.typingNeeded * 1000)) {
        this.activeProgress = 0
        this.activePercent.a = 50
        this.tryRepeatActionSet()
        return
      }
      
      this.activeProgress += this.progressInterval
      this.activePercent.a = (this.activeProgress / (this.activeObject.typingNeeded * 20))
      this.tryTypeTimer()
    },
    tryRepeatActionType() {
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
      //third neededItem
      if (this.activeObject.neededItem3) {
        if (itemStore().hasItemCount(this.activeObject.neededItem3[0], this.activeObject.neededItem3[1], 'resourceItems') == false) {
          this.cancelAction()
          return
        }
      }
      //we have enough boop
      this.tryTypeTimer()
    },
    //make sure a timeout isn't already in progress
    tryTypeTimer() {
      this.currentTimeout = setTimeout(this.updateTypeProgress, this.progressInterval)
    },

    updateSetProgress() {
      if (this.activeProgress + 1 >= this.activeObject.settingNeeded) {
        //remove item(s)
        itemStore().changeItemCount(this.activeObject.neededItem1[0], (0 - this.activeObject.neededItem1[1]), 'resourceItems')
        if (this.activeObject.neededItem2) {
          itemStore().changeItemCount(this.activeObject.neededItem2[0], (0 - this.activeObject.neededItem2[1]), 'resourceItems')
        }
        if (this.activeObject.neededItem3) {
          itemStore().changeItemCount(this.activeObject.neededItem3[0], (0 - this.activeObject.neededItem3[1]), 'resourceItems')
        }
        let wasEfficent = this.efficencyReturn()
        skillStore().addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))

        //if it's a charge, add five and 
        if (this.activeObject.cat == 'charge') {
          this.addMXP(1 * wasEfficent)
          itemStore().changeItemCount(this.activeObject.itemID, ((this.activeObject.amountGiven + this.activeObject.mLevel) * wasEfficent), 'equipmentItems')
        } else {
          this.addMXPCat((1 * wasEfficent), this.activeObject.mCat)
          itemStore().changeItemCount(this.activeObject.itemID, (1 * wasEfficent), 'equipmentItems')
        }
        this.updateEfficency()
        this.activePercent.a = 100
        this.activeProgress = 0
        this.tryRepeatActionType()
        return
      }

      this.activeProgress += 1
      this.activePercent.a = 50 + (50 * this.activeProgress / this.activeObject.settingNeeded)
      this.tryRepeatActionSet()
      return
    },
    tryRepeatActionSet() {
      this.currentTimeout = setTimeout(this.updateSetProgress, this.settingInterval)
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

    addMXPCat(mxpAmount, mCatIndex) {
      let mxp = this.equipmentMastery[mCatIndex].mxp
      let mLevel = this.equipmentMastery[mCatIndex].mLevel
      let maxMLevel = 20

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