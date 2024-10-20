import { defineStore } from 'pinia'
import { useSkillStore as skillStore } from '@/stores/skills';
import { useMechanicsStore as mechanicsStore } from '@/stores/mechanics'
import { useItemStore as itemStore } from '@/stores/inventory';

export const useTailoringStore = defineStore('tailoringStore', {
  state: () => ({
    efficency: 2,

    activeObject: {},
    activeProgress: 0,
    activePercent: { a: 0, b: false, c: '#04AA6D' },
    currentTimeout: 0,

    progressInterval: 50,

    //tailoring skill is stored as id 19 which is also its index, because I don't know how to do it otherwise
    skillID: 19,

    equipmentMastery: [
      {
        id: 'hood',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'jacket',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'vest',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'wingcloak',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'hat',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'robe',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'tunic',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: 'glove',
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
    ],
    activities: [
      //wool flax
      {
        id: 'woolHood',
        cat: 1,
        name: 'Knitted Hood',
        itemID: 'woolHood',
        neededItem1: ['hide1', 5],
        stitchDiscount: 0,
        levelRequired: 1,
        baseXP: 5,
        baseTrim: 2.00,
        baseStitch: 2,
        mCat: 0,
      },
      {
        id: 'woolJacket',
        cat: 1,
        name: 'Knitted Jacket',
        itemID: 'woolJacket',
        neededItem1: ['hide1', 9],
        stitchDiscount: 3,
        levelRequired: 1,
        baseXP: 5,
        baseTrim: 2.00,
        baseStitch: 2,
        mCat: 1,
      },
      {
        id: 'woolVest',
        cat: 1,
        name: 'Knitted Vest',
        itemID: 'woolVest',
        neededItem1: ['hide1', 6],
        stitchDiscount: 1,
        levelRequired: 1,
        baseXP: 5,
        baseTrim: 2.00,
        baseStitch: 2,
        mCat: 2,
      },
      {
        id: 'woolWings',
        cat: 1,
        name: 'Knitted Wingcloak',
        itemID: 'woolWings',
        neededItem1: ['hide1', 7],
        stitchDiscount: 2,
        levelRequired: 1,
        baseXP: 5,
        baseTrim: 2.00,
        baseStitch: 2,
        mCat: 3,
      },
      {
        id: 'flaxHat',
        cat: 1,
        name: 'Linen Hat',
        itemID: 'flaxHat',
        neededItem1: ['plant2', 4],
        stitchDiscount: 1,
        levelRequired: 2,
        baseXP: 8,
        baseTrim: 4.00,
        baseStitch: 1,
        mCat: 4,
      },
      {
        id: 'flaxRobe',
        cat: 1,
        name: 'Linen Robe',
        itemID: 'flaxRobe',
        neededItem1: ['plant2', 10],
        stitchDiscount: 3,
        levelRequired: 2,
        baseXP: 8,
        baseTrim: 4.00,
        baseStitch: 1,
        mCat: 5,
      },
      {
        id: 'flaxTunic',
        cat: 1,
        name: 'Linen Tunic',
        itemID: 'flaxTunic',
        neededItem1: ['plant2', 8],
        stitchDiscount: 2,
        levelRequired: 2,
        baseXP: 8,
        baseTrim: 4.00,
        baseStitch: 1,
        mCat: 6,
      },
      {
        id: 'flaxGloves',
        cat: 1,
        name: 'Linen Gloves',
        itemID: 'flaxGloves',
        neededItem1: ['plant2', 3],
        stitchDiscount: 0,
        levelRequired: 2,
        baseXP: 8,
        baseTrim: 4.00,
        baseStitch: 1,
        mCat: 7,
      },

      //fur cotton
      {
        id: 'furHood',
        cat: 2,
        name: 'Fur Hood',
        itemID: 'furHood',
        neededItem1: ['hide2', 5],
        stitchDiscount: 0,
        levelRequired: 3,
        baseXP: 14,
        baseTrim: 4.00,
        baseStitch: 3,
        mCat: 0,
      },
      {
        id: 'furJacket',
        cat: 2,
        name: 'Fur Jacket',
        itemID: 'furJacket',
        neededItem1: ['hide2', 9],
        stitchDiscount: 3,
        levelRequired: 3,
        baseXP: 14,
        baseTrim: 4.00,
        baseStitch: 3,
        mCat: 1,
      },
      {
        id: 'furVest',
        cat: 2,
        name: 'Fur Vest',
        itemID: 'furVest',
        neededItem1: ['hide2', 6],
        stitchDiscount: 1,
        levelRequired: 3,
        baseXP: 14,
        baseTrim: 4.00,
        baseStitch: 3,
        mCat: 2,
      },
      {
        id: 'furWings',
        cat: 2,
        name: 'Fur Wingcloak',
        itemID: 'furWings',
        neededItem1: ['hide2', 7],
        stitchDiscount: 2,
        levelRequired: 3,
        baseXP: 14,
        baseTrim: 4.00,
        baseStitch: 3,
        mCat: 3,
      },
      {
        id: 'cottonHat',
        cat: 2,
        name: 'Cotton Hat',
        itemID: 'cottonHat',
        neededItem1: ['plant4', 4],
        stitchDiscount: 1,
        levelRequired: 4,
        baseXP: 18,
        baseTrim: 6.00,
        baseStitch: 2,
        mCat: 4,
      },
      {
        id: 'cottonRobe',
        cat: 2,
        name: 'Cotton Robe',
        itemID: 'cottonRobe',
        neededItem1: ['plant4', 10],
        stitchDiscount: 3,
        levelRequired: 4,
        baseXP: 18,
        baseTrim: 6.00,
        baseStitch: 2,
        mCat: 5,
      },
      {
        id: 'cottonTunic',
        cat: 2,
        name: 'Cotton Tunic',
        itemID: 'cottonTunic',
        neededItem1: ['plant4', 8],
        stitchDiscount: 2,
        levelRequired: 4,
        baseXP: 18,
        baseTrim: 6.00,
        baseStitch: 2,
        mCat: 6,
      },
      {
        id: 'cottonGloves',
        cat: 2,
        name: 'Cotton Gloves',
        itemID: 'cottonGloves',
        neededItem1: ['plant4', 3],
        stitchDiscount: 0,
        levelRequired: 4,
        baseXP: 18,
        baseTrim: 6.00,
        baseStitch: 2,
        mCat: 7,
      },

      //leather bark
      {
        id: 'leatherHood',
        cat: 3,
        name: 'Leather Hood',
        itemID: 'leatherHood',
        neededItem1: ['hide3', 5],
        neededItem2: ['plant1', 1],
        stitchDiscount: 0,
        levelRequired: 5,
        baseXP: 25,
        baseTrim: 5.00,
        baseStitch: 4,
        mCat: 0,
      },
      {
        id: 'leatherJacket',
        cat: 3,
        name: 'Leather Jacket',
        itemID: 'leatherJacket',
        neededItem1: ['hide3', 9],
        neededItem2: ['plant1', 1],
        stitchDiscount: 3,
        levelRequired: 5,
        baseXP: 25,
        baseTrim: 5.00,
        baseStitch: 4,
        mCat: 1,
      },
      {
        id: 'leatherVest',
        cat: 3,
        name: 'Leather Vest',
        itemID: 'leatherVest',
        neededItem1: ['hide3', 6],
        neededItem2: ['plant1', 1],
        stitchDiscount: 1,
        levelRequired: 5,
        baseXP: 25,
        baseTrim: 5.00,
        baseStitch: 4,
        mCat: 2,
      },
      {
        id: 'leatherWings',
        cat: 3,
        name: 'Leather Wingcloak',
        itemID: 'leatherWings',
        neededItem1: ['hide3', 7],
        neededItem2: ['plant1', 1],
        stitchDiscount: 2,
        levelRequired: 5,
        baseXP: 25,
        baseTrim: 5.00,
        baseStitch: 4,
        mCat: 3,
      },
      {
        id: 'barkHat',
        cat: 3,
        name: 'Silverbark Hat',
        itemID: 'barkHat',
        neededItem1: ['plant1', 4],
        neededItem2: ['bar4', 1],
        stitchDiscount: 1,
        levelRequired: 6,
        baseXP: 28,
        baseTrim: 6.00,
        baseStitch: 3,
        mCat: 4,
      },
      {
        id: 'barkRobe',
        cat: 3,
        name: 'Silverbark Robe',
        itemID: 'barkRobe',
        neededItem1: ['plant1', 10],
        neededItem2: ['bar4', 1],
        stitchDiscount: 3,
        levelRequired: 6,
        baseXP: 28,
        baseTrim: 6.00,
        baseStitch: 3,
        mCat: 5,
      },
      {
        id: 'barkTunic',
        cat: 3,
        name: 'Silverbark Tunic',
        itemID: 'barkTunic',
        neededItem1: ['plant1', 8],
        neededItem2: ['bar4', 1],
        stitchDiscount: 2,
        levelRequired: 6,
        baseXP: 28,
        baseTrim: 6.00,
        baseStitch: 3,
        mCat: 6,
      },
      {
        id: 'barkGloves',
        cat: 3,
        name: 'Silverbark Gloves',
        itemID: 'barkGloves',
        neededItem1: ['plant1', 3],
        neededItem2: ['bar4', 1],
        stitchDiscount: 0,
        levelRequired: 6,
        baseXP: 28,
        baseTrim: 6.00,
        baseStitch: 3,
        mCat: 7,
      },

      //hide silk
      {
        id: 'hideHood',
        cat: 4,
        name: 'Hide Hood',
        itemID: 'hideHood',
        neededItem1: ['hide4', 5],
        neededItem2: ['rune2', 1],
        stitchDiscount: 0,
        levelRequired: 7,
        baseXP: 32,
        baseTrim: 5.00,
        baseStitch: 5,
        mCat: 0,
      },
      {
        id: 'hideJacket',
        cat: 4,
        name: 'Hide Jacket',
        itemID: 'hideJacket',
        neededItem1: ['hide4', 9],
        neededItem2: ['rune2', 1],
        stitchDiscount: 3,
        levelRequired: 7,
        baseXP: 32,
        baseTrim: 5.00,
        baseStitch: 5,
        mCat: 1,
      },
      {
        id: 'hideVest',
        cat: 4,
        name: 'Hide Vest',
        itemID: 'hideVest',
        neededItem1: ['hide4', 6],
        neededItem2: ['rune2', 1],
        stitchDiscount: 1,
        levelRequired: 7,
        baseXP: 32,
        baseTrim: 5.00,
        baseStitch: 5,
        mCat: 2,
      },
      {
        id: 'hideWings',
        cat: 4,
        name: 'Hide Wingcloak',
        itemID: 'hideWings',
        neededItem1: ['hide4', 7],
        neededItem2: ['rune2', 1],
        stitchDiscount: 2,
        levelRequired: 7,
        baseXP: 32,
        baseTrim: 5.00,
        baseStitch: 5,
        mCat: 3,
      },
      {
        id: 'silkHat',
        cat: 4,
        name: 'Silk Hat',
        itemID: 'silkHat',
        neededItem1: ['plant7', 4],
        neededItem2: ['rune4', 1],
        stitchDiscount: 1,
        levelRequired: 8,
        baseXP: 38,
        baseTrim: 7.00,
        baseStitch: 4,
        mCat: 4,
      },
      {
        id: 'silkRobe',
        cat: 4,
        name: 'Silk Robe',
        itemID: 'silkRobe',
        neededItem1: ['plant7', 10],
        neededItem2: ['rune4', 1],
        stitchDiscount: 3,
        levelRequired: 8,
        baseXP: 38,
        baseTrim: 7.00,
        baseStitch: 4,
        mCat: 5,
      },
      {
        id: 'silkTunic',
        cat: 4,
        name: 'Silk Tunic',
        itemID: 'silkTunic',
        neededItem1: ['plant7', 8],
        neededItem2: ['rune4', 1],
        stitchDiscount: 2,
        levelRequired: 8,
        baseXP: 38,
        baseTrim: 7.00,
        baseStitch: 4,
        mCat: 6,
      },
      {
        id: 'silkGloves',
        cat: 4,
        name: 'Silk Gloves',
        itemID: 'silkGloves',
        neededItem1: ['plant7', 3],
        neededItem2: ['rune4', 1],
        stitchDiscount: 0,
        levelRequired: 8,
        baseXP: 38,
        baseTrim: 7.00,
        baseStitch: 4,
        mCat: 7,
      },
    ]
  }),
  getters: {
  },
  actions: {
    saveAll() {
      localStorage.setItem('tailoring-efficency', JSON.stringify(this.efficency))
      localStorage.setItem('tailoring-activeObject', JSON.stringify(this.activeObject))

      for (let i in this.equipmentMastery) {
        localStorage.setItem('tailoring-equipmentMastery-mxp' + i, JSON.stringify(this.equipmentMastery[i].mxp))
        localStorage.setItem('tailoring-equipmentMastery-mLevel' + i, JSON.stringify(this.equipmentMastery[i].mLevel))
        localStorage.setItem('tailoring-equipmentMastery-mxpPrev' + i, JSON.stringify(this.equipmentMastery[i].mxpPrev))
        localStorage.setItem('tailoring-equipmentMastery-mxpNext' + i, JSON.stringify(this.equipmentMastery[i].mxpNext))
      }
    },
    loadAll() {
      this.efficency = JSON.parse(localStorage.getItem('tailoring-efficency'))

      for (let i in this.equipmentMastery) {
        this.equipmentMastery[i].mxp = JSON.parse(localStorage.getItem('tailoring-equipmentMastery-mxp' + i)) ?? 0
        this.equipmentMastery[i].mLevel = JSON.parse(localStorage.getItem('tailoring-equipmentMastery-mLevel' + i)) ?? 0
        this.equipmentMastery[i].mxpPrev = JSON.parse(localStorage.getItem('tailoring-equipmentMastery-mxpPrev' + i)) ?? 0
        this.equipmentMastery[i].mxpNext = JSON.parse(localStorage.getItem('tailoring-equipmentMastery-mxpNext' + i)) ?? 10
      }
    },

    onLoad() {
      //localstorage makes the active object a real boy instead of a reference to a real boy
      this.activeObject = JSON.parse(localStorage.getItem('tailoring-activeObject'))
      this.activeObject = this.activities.find(t => t.id === this.activeObject.id)
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatActionTrim()
    },

    warp(ttime) {
      //if less than 20 seconds, do not attempt
      if (ttime < 20000) {
        return
      }
      if (this.activeObject.id == undefined) {
        return
      }
      let timeRemaining = ttime / 1000
      let timeNextLevel = -1
      let timeNextMLevel = -1
      let timeToUse = -1
      let avgInterval = 7

      avgInterval = (this.activeObject.baseTrim * this.activeObject.neededItem1[1]) + (this.activeObject.baseStitch * this.activeObject.neededItem1[1]) - this.activeObject.stitchDiscount

      //if you can't weave in time, do not attempt
      if (avgInterval > timeRemaining) {
        return
      }

      //if not max level, do the calc
      if ((skillStore().skills[this.skillID].xpNext - skillStore().skills[this.skillID].xp) > 1) {
        //next level = action time * (xp to next level / xp per action)
        timeNextLevel = avgInterval * Math.ceil((skillStore().skills[this.skillID].xpNext - skillStore().skills[this.skillID].xp) / (this.activeObject.baseXP * this.activeObject.neededItem1[1]))
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

      // if (itemStore().equippedTools.tailoringTool.dcat == 'device') {
      //   mechanicsStore().addPendingXP(this.activeObject.baseXP * this.activeObject.neededItem1[1] * actions)
      // } else {
      skillStore().addXP(this.skillID, (this.activeObject.baseXP * this.activeObject.neededItem1[1] * actions))
      // }

      this.addMXPCat(actions, this.activeObject.mCat)
      itemStore().changeItemCount(this.activeObject.itemID, (1 * actions), 'equipmentItems')

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

      skillStore().cancelCurrentActivity('tailor')
      skillStore().setCurrentActivity(this.activeObject)
      skillStore().setCurrentCat('Tailoring: ')
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatActionTrim()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.activeProgress = 0
      this.activePercent.a = 0
      this.activeObject = {}
      skillStore().setCurrentActivity({ name: 'Nothing' })
      skillStore().setCurrentCat('Currently Doing: ')
    },

    updateTrimProgress() {
      if (this.activeProgress >= (this.activeObject.baseTrim * 1000 * this.activeObject.neededItem1[1])) { //TODO Tool bonus
        this.activeProgress = 1
        this.activePercent.a = 100 / ((this.activeObject.baseStitch * this.activeObject.neededItem1[1]) - this.activeObject.stitchDiscount)
        this.tryRepeatActionStitch()
        return
      }
      this.activeProgress += this.progressInterval
      this.activePercent.a = 100 - (this.activeProgress / (this.activeObject.baseTrim * 10 * this.activeObject.neededItem1[1]))
      this.tryRepeatActionTrim()
    },
    tryRepeatActionTrim() {
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
      this.currentTimeout = setTimeout(this.updateTrimProgress, this.progressInterval)
    },

    updateWorkProgress() {
      if (this.activeProgress + 1 >= (this.activeObject.baseStitch * this.activeObject.neededItem1[1]) - this.activeObject.stitchDiscount) {
        let wasEfficent = this.efficencyReturn()

        // if (itemStore().equippedTools.tailoringTool.dcat == 'device') {
        //   mechanicsStore().addPendingXP(this.activeObject.xpGain * wasEfficent)
        // } else {
        skillStore().addXP(this.skillID, (this.activeObject.baseXP * this.activeObject.neededItem1[1] * wasEfficent))
        // }

        this.addMXPCat((1 * wasEfficent), this.activeObject.mCat)
        itemStore().changeItemCount(this.activeObject.itemID, (1 * wasEfficent), 'equipmentItems')
        
        this.updateEfficency()
        
        //remove item(s)
        itemStore().changeItemCount(this.activeObject.neededItem1[0], (0 - this.activeObject.neededItem1[1]), 'resourceItems')
        //second neededItem
        if (this.activeObject.neededItem2) {
          itemStore().changeItemCount(this.activeObject.neededItem2[0], (0 - this.activeObject.neededItem2[1]), 'resourceItems')
        }

        this.activeProgress = 0
        this.tryRepeatActionTrim()
        return
      }

      this.activeProgress += 1 //TODO tool bonus +stitchs per action
      this.activePercent.a = 100 * this.activeProgress / ((this.activeObject.baseStitch * this.activeObject.neededItem1[1]) - this.activeObject.stitchDiscount)
      this.tryRepeatActionStitch()
      return
    },
    tryRepeatActionStitch() {
      this.currentTimeout = setTimeout(this.updateWorkProgress, 1000) //TODO tool bonus itemStore().equippedTools.tailoringTool.toolStats.workRate
    },

    updateEfficency() {
      this.efficency = 2 * skillStore().skills[this.skillID].level
      this.efficency += itemStore().equippedStats.allEfficency
      // if (itemStore().equippedTools.tailoringTool.dcat == 'device') {
      //   this.efficency += mechanicsStore().activities[3].mLevel * 5
      // }
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