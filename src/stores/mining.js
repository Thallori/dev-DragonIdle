import { defineStore } from 'pinia'
import { useSkillStore } from '@/stores/skills';
import { useExplorationStore } from '@/stores/exploration';
import { useItemStore } from '@/stores/inventory';


export const useMiningStore = defineStore('miningStore', {
  state: () => ({
    pickaxeInterval: 2000, // 1 update per 2.0 seconds
    toRockDamage: 0,
    efficency: 2,

    activeObject: {},
    activeProgress: 0,
    activePercent: 0,
    currentTimeout: 0,

    //mining skill is stored as id 15 which is also its index, because I don't know how to do it otherwise
    skillID: 15,
    skillStore: useSkillStore(),
    explorationStore: useExplorationStore(),
    itemStore: useItemStore(),

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
        rockArmor: 3,
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
        rockArmor: 3,
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
        rockArmor: 4,
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
        rockHP: 38,
        rockArmor: 4,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '7',
        name: 'Gemstone',
        resourceID: 'ore8',
        resourceAmount: 1,
        image: 'src/assets/icons/testIcon16.png',
        levelRequired: 8,
        xpGain: 84,
        rockHP: 60,
        rockArmor: 5,
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

      this.toRockDamage = 0
      this.activePercent = 100
      this.activeObject = newActiveActivity
      this.activeProgress = this.activeObject.rockHP
      this.skillStore.setCurrentActivity(this.activeObject)
      this.skillStore.setCurrentCat('Mining: ')

      this.tryRepeatAction()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.toRockDamage = 0
      this.activeProgress = 0
      this.activePercent = 0
      this.activeObject = {}
      this.skillStore.setCurrentActivity({ name: 'Nothing' })
      this.skillStore.setCurrentCat('Currently Doing: ')

      console.log('canceling action')
    },

    updateProgress() {
      //pickaxe penetrates armor, overpenetration does nothing
      this.toRockDamage = Math.max(0, (this.activeObject.rockArmor - this.itemStore.equippedTools.miningTool.toolStats.bonusPen))

      //pickaxe does damage - remaining rock armor, no negative damage
      this.toRockDamage = Math.max(0, (this.itemStore.equippedTools.miningTool.toolStats.bonusDamage - this.toRockDamage))

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

        this.skillStore.addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
        this.addMXP(1 * wasEfficent)
        this.itemStore.changeItemCount(this.activeObject.resourceID, (this.activeObject.resourceAmount * wasEfficent), 'resourceItems')

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
      this.currentTimeout = setTimeout(this.updateProgress, this.pickaxeInterval)
    },

    updateEfficency() {
      this.efficency = 2 * this.skillStore.skills[this.skillID].level
      this.efficency += this.explorationStore.activities[1].mLevel //cassit canton
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