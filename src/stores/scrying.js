import { defineStore } from 'pinia'
import { useSkillStore } from '@/stores/skills';
import { useExplorationStore } from '@/stores/exploration';
import { useItemStore } from '@/stores/inventory';

export const useScryingStore = defineStore('scryingStore', {
  state: () => ({
    progressInterval: 200, // 20 update per second
    syphoningInterval: 2000, // 1 update per 2.0 seconds
    efficency: 2,

    activeObject: {},
    activeProgress: 0,
    activePercent: 0,
    currentTimeout: 0,

    //scrying skill is stored as id 12 which is also its index, because I don't know how to do it otherwise
    skillID: 12,
    skillStore: useSkillStore(),
    explorationStore: useExplorationStore(),
    itemStore: useItemStore(),

    activities: [
      {
        id: '0',
        name: 'Pale Clay',
        resourceID: 'rune1',
        resourceAmount: 1,
        image: 'src/assets/icons/testIcon16.png',
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
        image: 'src/assets/icons/testIcon16.png',
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
        image: 'src/assets/icons/testIcon16.png',
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
        image: 'src/assets/icons/testIcon16.png',
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
        image: 'src/assets/icons/testIcon16.png',
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
        image: 'src/assets/icons/testIcon16.png',
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
        name: 'Spark Salt',
        resourceID: 'rune7',
        resourceAmount: 1,
        image: 'src/assets/icons/testIcon16.png',
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
        image: 'src/assets/icons/testIcon16.png',
        levelRequired: 8,
        xpGain: 22,
        fortifyTime: 10,
        baseStability: 0.30,
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

      this.activeProgress = 0
      this.activePercent = 0
      this.activeObject = newActiveActivity

      this.skillStore.cancelCurrentActivity('scry')
      this.skillStore.setCurrentActivity(this.activeObject)
      this.skillStore.setCurrentCat('Scrying: ')

      this.tryRepeatAction()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.activeProgress = 0
      this.activePercent = 0
      this.activeObject = {}
      this.skillStore.setCurrentActivity({ name: 'Nothing' })
      this.skillStore.setCurrentCat('Currently Doing: ')
    },

    updateProgress() {
      if (this.activeProgress >= (1000 * this.activeObject.fortifyTime)) {

        this.activePercent = 100
        this.tryRepeatGather()
        return
      }

      this.activeProgress += this.progressInterval
      this.activePercent = (this.activeProgress / (10 * this.activeObject.fortifyTime))
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

      this.skillStore.addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
      this.addMXP(1 * wasEfficent)
      this.itemStore.changeItemCount(this.activeObject.resourceID, (this.activeObject.resourceAmount * wasEfficent), 'resourceItems')

      //if a random number between 0 and 1 is greater than stability, crash
      if (Math.random() > (this.activeObject.baseStability + this.itemStore.equippedTools.scryingTool.toolStats.baseStabilityBonus + (this.activeObject.mLevel * 0.02))) {

        this.activeProgress = 0
        this.activePercent = 0
        this.tryRepeatAction()
        return
      }

      this.tryRepeatGather()
    },
    tryRepeatGather() {
      this.currentTimeout = setTimeout(this.updateGatherProgress, this.itemStore.equippedTools.scryingTool.toolStats.syphoningTime * 1000)
    },

    updateEfficency() {
      this.efficency = 2 * this.skillStore.skills[this.skillID].level
      this.efficency += this.explorationStore.activities[2].mLevel //vibrant vale
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