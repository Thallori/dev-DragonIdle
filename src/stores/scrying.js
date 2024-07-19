import { defineStore } from 'pinia'
import { useSkillStore } from '@/stores/skills';
import { useExplorationStore } from '@/stores/exploration';
import { useItemStore } from '@/stores/inventory';

export const useScryingStore = defineStore('scryingStore', {
  state: () => ({
    progressInterval: 50, // 20 update per second
    gatherCounter: 0,
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
        xpGain: 4,
        searchDifficulty: 4.0,
        gatherDifficulty: 3.0,
        baseYield: 2,
        currentYield: 3,
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
        xpGain: 7,
        searchDifficulty: 8.0,
        gatherDifficulty: 4.0,
        baseYield: 2,
        currentYield: 3,
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
        xpGain: 6,
        searchDifficulty: 10.0,
        gatherDifficulty: 3.0,
        baseYield: 2,
        currentYield: 3,
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
        xpGain: 11,
        searchDifficulty: 5.0,
        gatherDifficulty: 5.0,
        baseYield: 2,
        currentYield: 3,
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
        xpGain: 10,
        searchDifficulty: 14.0,
        gatherDifficulty: 3.0,
        baseYield: 2,
        currentYield: 3,
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
        xpGain: 14,
        searchDifficulty: 16.0,
        gatherDifficulty: 4.0,
        baseYield: 2,
        currentYield: 3,
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
        xpGain: 12,
        searchDifficulty: 18.0,
        gatherDifficulty: 3.0,
        baseYield: 2,
        currentYield: 3,
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
        xpGain: 18,
        searchDifficulty: 12.0,
        gatherDifficulty: 5.0,
        baseYield: 2,
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
    setActiveAction(newActiveActivity) {
      clearTimeout(this.currentTimeout)

      if (newActiveActivity.id == this.activeObject.id) {
        this.cancelAction()
        return
      }

      this.gatherCounter = 0
      this.activeProgress = 0
      this.activePercent = 0
      this.activeObject = newActiveActivity
      this.skillStore.setCurrentActivity(this.activeObject)
      this.skillStore.setCurrentCat('Scrying: ')

      this.tryRepeatAction()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.gatherCounter = 0
      this.activeProgress = 0
      this.activePercent = 0
      this.activeObject = {}
      this.skillStore.setCurrentActivity({ name: 'Nothing' })
      this.skillStore.setCurrentCat('Currently Doing: ')

      console.log('canceling action') //debug
    },

    updateProgress() {

      if (this.activeProgress >= (1000 * this.activeObject.searchDifficulty * (1 - this.itemStore.equippedTools.scryingTool.toolStats))) {  //toolstats todo

        this.activeProgress = this.activeObject.gatherDifficulty
        this.gatherCounter = this.activeObject.currentYield

        this.tryRepeatGather()
        return
      }

      this.activeProgress += this.progressInterval
      this.activePercent = this.activeProgress / (10 * this.activeObject.searchDifficulty * (1 - this.itemStore.equippedTools.scryingTool.toolStats)) //toolstats todo
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

      this.updateEfficency()
      this.updateYield()
      console.log('boop')

      this.gatherCounter -= 1
      this.activePercent = 100 * this.gatherCounter / this.activeObject.currentYield

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
      this.currentTimeout = setTimeout(this.updateGatherProgress, ((this.activeObject.gatherDifficulty - this.itemStore.equippedTools.scryingTool.toolStats) * 1000)) //toolstats todo
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
    updateYield() {
      this.activeObject.currentYield = this.activeObject.baseYield + this.activeObject.mLevel
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