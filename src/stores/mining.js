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
    activePercent: 0,
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
        image: 'src/assets/icons/testIcon16.png',
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
        image: 'src/assets/icons/testIcon16.png',
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
        image: 'src/assets/icons/testIcon16.png',
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
        image: 'src/assets/icons/testIcon16.png',
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
        image: 'src/assets/icons/testIcon16.png',
        levelRequired: 5,
        xpGain: 37,
        rockHP: 28,
        rockArmor: 3,
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
        image: 'src/assets/icons/testIcon16.png',
        levelRequired: 6,
        xpGain: 25,
        rockHP: 20,
        rockArmor: 1,
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
        image: 'src/assets/icons/testIcon16.png',
        levelRequired: 7,
        xpGain: 46,
        rockHP: 35,
        rockArmor: 5,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '7',
        name: 'Beadstone',
        resourceID: 'ore8',
        resourceAmount: 1,
        image: 'src/assets/icons/testIcon16.png',
        levelRequired: 8,
        xpGain: 84,
        rockHP: 48,
        rockArmor: 7,
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
        this.activities[i].mxp = JSON.parse(localStorage.getItem('mining-mxp' + i))
        this.activities[i].mLevel = JSON.parse(localStorage.getItem('mining-mLevel' + i))
        this.activities[i].mxpPrev = JSON.parse(localStorage.getItem('mining-mxpPrev' + i))
        this.activities[i].mxpNext = JSON.parse(localStorage.getItem('mining-mxpNext' + i))
      }
    },

    onLoad() {
      //localstorage makes the active object a real boy instead of a reference to a real boy
      this.activeObject = JSON.parse(localStorage.getItem('mining-activeObject'))
      this.activeObject = this.activities[this.activeObject.id]
      this.activeProgress = this.activeObject.rockHP
      this.activePercent = 100
      this.tryRepeatAction()
    },

    setActiveAction(newActiveActivity) {
      clearTimeout(this.currentTimeout)
      if (newActiveActivity.id == this.activeObject.id) {
        this.cancelAction()
        return
      }

      this.toRockDamage = 0
      this.activePercent = 100
      this.activeObject = newActiveActivity
      this.activeProgress = this.activeObject.rockHP

      skillStore().cancelCurrentActivity('mine')
      skillStore().setCurrentActivity(this.activeObject)
      skillStore().setCurrentCat('Mining: ')

      this.tryRepeatAction()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.toRockDamage = 0
      this.activeProgress = 0
      this.activePercent = 0
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
        console.log('crit')
      }

      //if dealing no damage, sometimes deal 1 damage anyways
      if (this.toRockDamage == 0) {
        this.toRockDamage = Math.floor(Math.random() * 2);
        console.log('randomly gives 1 damage')
      }

      //finally, deal damage to rock
      this.activeProgress -= this.toRockDamage

      //yay, you did it
      if (this.activeProgress <= 0) {
        let wasEfficent = this.efficencyReturn()

        skillStore().addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
        this.addMXP(1 * wasEfficent)
        itemStore().changeItemCount(this.activeObject.resourceID, (this.activeObject.resourceAmount * wasEfficent), 'resourceItems')

        //gemchance, ugly TODO rewrite maybe
        this.gemChance()
        if (wasEfficent > 1) {
          this.gemChance()
        }

        this.updateEfficency()
        console.log('boop')

        //this should be first, then there should be a marked carry over to perform 'multiple' actions in a single tick, and probably make the line go all swirrly to tell the player that they're getting one resource per swing. TODO
        this.activeProgress += this.activeObject.rockHP
        //if it's still less than 0, then set to 1
        if (this.activeProgress < 0) {
          this.activeProgress = 1
        }
      }

      this.activePercent = 100 * this.activeProgress / this.activeObject.rockHP
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
      this.efficency += explorationStore().activities[1].mLevel //cassit canton
    },
    //TODO make efficency > 100 meaningful
    efficencyReturn() {
      if (this.efficency >= (Math.random() * 100)) {
        console.log('efficent!')
        return 2
      }
      return 1
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