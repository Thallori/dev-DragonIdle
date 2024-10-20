import { defineStore } from 'pinia'
import { useSkillStore as skillStore } from '@/stores/skills'
import { useExplorationStore as explorationStore } from '@/stores/exploration'
import { useItemStore as itemStore } from '@/stores/inventory'

export const useMiningStore = defineStore('miningStore', {
  state: () => ({
    baseMiningInterval: 2, //seconds
    toRockDamage: 0,
    efficency: 2,

    activeObject: {},
    activeProgress: 0,
    activePercent: { a: 0, b: false, c: '#04AA6D' },
    currentTimeout: 0,

    //mining skill is stored as id 15 which is also its index, because I don't know how to do it otherwise
    skillID: 15,
    gems1: ['yellowGem', 'pinkGem'],
    gems2: ['redGem', 'greenGem', 'blueGem'],

    activities: [
      {
        id: '0',
        name: 'Copper Ore',
        resourceID: 'ore1',
        resourceAmount: 1,
        levelRequired: 1,
        xpGain: 10,
        rockHP: 16,
        rockArmor: 1,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '1',
        name: 'Tin Ore',
        resourceID: 'ore2',
        resourceAmount: 1,
        levelRequired: 2,
        xpGain: 18,
        rockHP: 24,
        rockArmor: 2,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '2',
        name: 'Amber',
        resourceID: 'ore3',
        resourceAmount: 1,
        levelRequired: 3,
        xpGain: 14,
        rockHP: 12,
        rockArmor: 4,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '3',
        name: 'Iron Ore',
        resourceID: 'ore4',
        resourceAmount: 1,
        levelRequired: 4,
        xpGain: 32,
        rockHP: 32,
        rockArmor: 4,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '4',
        name: 'Silver Ore',
        resourceID: 'ore5',
        resourceAmount: 1,
        levelRequired: 5,
        xpGain: 37,
        rockHP: 28,
        rockArmor: 5,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '5',
        name: 'Sandstone',
        resourceID: 'ore6',
        resourceAmount: 1,
        levelRequired: 6,
        xpGain: 25,
        rockHP: 20,
        rockArmor: 0,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '6',
        name: 'Coal',
        resourceID: 'ore7',
        resourceAmount: 1,
        levelRequired: 7,
        xpGain: 46,
        rockHP: 35,
        rockArmor: 6,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '7',
        name: 'Beadstone',
        resourceID: 'gem',
        resourceAmount: 1,
        levelRequired: 8,
        xpGain: 84,
        rockHP: 48,
        rockArmor: 7,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '8',
        name: 'Cobalt Ore',
        resourceID: 'ore9',
        resourceAmount: 1,
        levelRequired: 9,
        xpGain: 65,
        rockHP: 40,
        rockArmor: 6,
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
      localStorage.setItem('mining-efficency', JSON.stringify(this.efficency))
      localStorage.setItem('mining-activeObject', JSON.stringify(this.activeObject))

      for (let i in this.activities) {
        localStorage.setItem('mining-mxp' + i, JSON.stringify(this.activities[i].mxp))
        localStorage.setItem('mining-mLevel' + i, JSON.stringify(this.activities[i].mLevel))
        localStorage.setItem('mining-mxpPrev' + i, JSON.stringify(this.activities[i].mxpPrev))
        localStorage.setItem('mining-mxpNext' + i, JSON.stringify(this.activities[i].mxpNext))
      }
    },
    loadAll() {
      this.efficency = JSON.parse(localStorage.getItem('mining-efficency'))

      for (let i in this.activities) {
        this.activities[i].mxp = JSON.parse(localStorage.getItem('mining-mxp' + i)) ?? 0
        this.activities[i].mLevel = JSON.parse(localStorage.getItem('mining-mLevel' + i)) ?? 0
        this.activities[i].mxpPrev = JSON.parse(localStorage.getItem('mining-mxpPrev' + i)) ?? 0
        this.activities[i].mxpNext = JSON.parse(localStorage.getItem('mining-mxpNext' + i)) ?? 10
      }
    },

    onLoad() {
      //localstorage makes the active object a real boy instead of a reference to a real boy
      this.activeObject = JSON.parse(localStorage.getItem('mining-activeObject'))
      this.activeObject = this.activities[this.activeObject.id]
      this.activeProgress = this.activeObject.rockHP
      this.activePercent.a = 100
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatAction()
    },


    warp(ttime) {
      //if less than 11 seconds, do not attempt
      if (ttime < 11000) {
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

      if (this.activeObject.rockArmor > (itemStore().equippedTools.miningTool.toolStats.bonusDamage + itemStore().equippedTools.miningTool.toolStats.bonusPen)) {
        //TODO not actually a good equation for criticals
        //average time to rock = rock hp * 2 * crit help * tool interval
        avgInterval = this.activeObject.rockHP * 2 * (1 - (this.activeObject.mLevel * 0.03)) * (this.baseMiningInterval - itemStore().equippedTools.miningTool.toolStats.bonusMiningSpeed)
      } else {

        //remaining rock armor = rock armor - pen
        avgInterval = Math.max(0, (this.activeObject.rockArmor - itemStore().equippedTools.miningTool.toolStats.bonusPen))

        //avg damage = damage - rock armor
        avgInterval = itemStore().equippedTools.miningTool.toolStats.bonusDamage - avgInterval

        //avg damage of crits
        avgInterval += (6 * this.activeObject.mLevel) / 100

        //avg interval = (rock hp / avg damage) * action interval
        avgInterval = (this.activeObject.rockHP / avgInterval) * (this.baseMiningInterval - itemStore().equippedTools.miningTool.toolStats.bonusMiningSpeed)
      }

      //if you can't kill a rock in time, do not attempt
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
      this.addMXP(1 * actions)
      
      if (this.activeObject.resourceID != 'gem') {
        itemStore().changeItemCount(this.activeObject.resourceID, actions, 'resourceItems')
      }
      if (this.activeObject.id < 7) {
        itemStore().changeItemCount(this.gems1[0], Math.round(actions * 0.01 * Math.sqrt(Math.random())), 'resourceItems')
        itemStore().changeItemCount(this.gems1[1], Math.round(actions * 0.01 * Math.sqrt(Math.random())), 'resourceItems')
      }

      this.updateEfficency()
      console.log('warp actions performed: ' + actions)
    },

    setActiveAction(newActiveActivity) {
      clearTimeout(this.currentTimeout)
      if (newActiveActivity.id == this.activeObject.id) {
        this.cancelAction()
        return
      }

      this.toRockDamage = 0
      this.activePercent.a = 100
      this.activeObject = newActiveActivity
      this.activeProgress = this.activeObject.rockHP

      skillStore().cancelCurrentActivity('mine')
      skillStore().setCurrentActivity(this.activeObject)
      skillStore().setCurrentCat('Mining: ')
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatAction()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.toRockDamage = 0
      this.activeProgress = 0
      this.activePercent.a = 0
      this.activeObject = {}
      skillStore().setCurrentActivity({ name: 'Nothing' })
      skillStore().setCurrentCat('Currently Doing: ')
    },

    updateProgress() {
      //pickaxe penetrates armor, overpenetration does nothing
      this.toRockDamage = Math.max(0, (this.activeObject.rockArmor - itemStore().equippedTools.miningTool.toolStats.bonusPen))

      //pickaxe does damage - remaining rock armor, no negative damage
      this.toRockDamage = Math.max(0, (itemStore().equippedTools.miningTool.toolStats.bonusDamage - this.toRockDamage))

      //crit chance, 3*mLevel / 100
      //TODO make way to increase crit damage later?
      if ((Math.random() * 100) < (this.activeObject.mLevel * 3)) {
        this.toRockDamage += 3
        // console.log('crit')
      }

      //if dealing no damage, sometimes deal 1 damage anyways
      if (this.toRockDamage == 0) {
        this.toRockDamage = Math.floor(Math.random() * 2);
        // console.log('randomly gives 1 damage')
      }

      //finally, deal damage to rock
      this.activeProgress -= this.toRockDamage

      //yay, you did it
      if (this.activeProgress <= 0) {
        let wasEfficent = this.efficencyReturn()

        skillStore().addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
        this.addMXP(1 * wasEfficent)

        //if not a gem rock, then give ore
        if (this.activeObject.resourceID != 'gem') {
          itemStore().changeItemCount(this.activeObject.resourceID, (this.activeObject.resourceAmount * wasEfficent), 'resourceItems')
        }
        //gemchance, ugly TODO rewrite maybe
        this.gemChance()
        if (wasEfficent > 1) {
          this.gemChance()
        }

        this.updateEfficency()

        //this should be first, then there should be a marked carry over to perform 'multiple' actions in a single tick, and probably make the line go all swirrly to tell the player that they're getting one resource per swing. TODO
        this.activeProgress += this.activeObject.rockHP
        //if it's still less than 0, then set to 1
        if (this.activeProgress < 0) {
          this.activeProgress = 1
        }
      }

      this.activePercent.a = 100 * this.activeProgress / this.activeObject.rockHP
      this.tryRepeatAction()
    },
    tryRepeatAction() {
      this.currentTimeout = setTimeout(this.updateProgress, (this.baseMiningInterval - itemStore().equippedTools.miningTool.toolStats.bonusMiningSpeed) * 1000)
    },

    //ugly TODO rewrite maybe
    gemChance() {
      //if beadstone
      if (this.activeObject.id == 7) {
        //15% of the time, give okay gem
        if (Math.random() < 0.15) {
          itemStore().changeItemCount(this.gems2[Math.floor(Math.random() * this.gems2.length)], 1, 'resourceItems')
          return
        }
        //otherwise, give bad gem
        itemStore().changeItemCount(this.gems1[Math.floor(Math.random() * this.gems1.length)], 1, 'resourceItems')
        return
      }

      //99% of the time, do nothing
      if (Math.random() < 0.99) {
        return
      }
      if (this.activeObject.id < 7) {
        itemStore().changeItemCount(this.gems1[Math.floor(Math.random() * this.gems1.length)], 1, 'resourceItems')
        return
      }
    },

    updateEfficency() {
      this.efficency = 2 * skillStore().skills[this.skillID].level
      this.efficency += itemStore().equippedStats.allEfficency
      this.efficency += explorationStore().activities[1].mLevel //cassit canton
      this.efficency += explorationStore().activities[5].mLevel //rackish republic
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