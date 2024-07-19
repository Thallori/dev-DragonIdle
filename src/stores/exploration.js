import { defineStore } from 'pinia'
import { useSkillStore } from '@/stores/skills';
import { useItemStore } from '@/stores/inventory';
//exploration skill is stored as id 9 which is also its index, because I don't know how to do it otherwise

export const useExplorationStore = defineStore('explorationStore', {
  state: () => ({
    progressInterval: 50, // 20 update per second
    efficency: 2,

    maxUnsealedAreas: 3,
    currentUnsealedAreas: 0,

    activeObject: {},
    activeProgress: 0,
    activePercent: 0,
    currentTimeout: 0,

    //exploration skill is stored as id 9 which is also its index, because I don't know how to do it otherwise
    skillID: 9,
    skillStore: useSkillStore(),
    itemStore: useItemStore(),

    activities: [
      {
        id: '0',
        name: 'Gleaming Glade',
        image: 'src/assets/icons/testIcon16.png',
        levelRequired: 1,
        xpGain: 2,
        interval: 2.0,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
        isSealed: true,
        requiresAnyFlags: 'tbd',
        efficencySkill: 'Foraging',
        uniqueFeature1: ['Foraging', 0, 'src/assets/icons/oak.png'], //oak
        uniqueFeature2: ['Hunting', 2, 'src/assets/icons/bird.png'], //phesant
      },
      {
        id: '1',
        name: 'Cassit Canton',
        image: 'src/assets/icons/testIcon16.png',
        levelRequired: 2,
        xpGain: 4,
        interval: 3.0,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
        isSealed: true,
        requiresAnyFlags: 'tbd',
        efficencySkill: 'Mining',
        uniqueFeature1: ['Mining', 1, 'src/assets/icons/tinore.png'], //tin
      },
      {
        id: '2',
        name: 'Vibrant Vale',
        image: 'src/assets/icons/testIcon16.png',
        levelRequired: 3,
        xpGain: 6,
        interval: 3.5,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
        isSealed: true,
        efficencySkill: 'Scrying',
        uniqueFeature1: ['Scrying', 0], //bone clay
        uniqueFeature2: ['Mining', 2, 'src/assets/icons/amber.png'], //amber
      },
      // {
      //   id: '3',
      //   name: 'Fourth Area',
      //   image: 'src/assets/icons/testIcon16.png',
      //   levelRequired: 4,
      //   xpGain: 8,
      //   interval: 4.0,
      //   mxp: 0,
      //   mLevel: 0,
      //   mxpPrev: 0,
      //   mxpNext: 10,
      //   isSealed: true,
      //   requiresAnyFlags: 'tbd',
      // },
      // {
      //   id: '4',
      //   name: 'Fifth Area',
      //   image: 'src/assets/icons/testIcon16.png',
      //   levelRequired: 5,
      //   xpGain: 7,
      //   interval: 3.0,
      //   mxp: 0,
      //   mLevel: 0,
      //   mxpPrev: 0,
      //   mxpNext: 10,
      //   isSealed: true,
      //   requiresAnyFlags: 'tbd',
      // },
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

      this.activePercent = 0
      this.activeProgress = 0
      this.activeObject = newActiveActivity
      this.skillStore.setCurrentActivity(this.activeObject)
      this.skillStore.setCurrentCat('Exploring: ')
      this.updateEfficency()

      this.tryRepeatAction()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.activeProgress = 0
      this.activePercent = 0
      this.activeObject = {}
      this.skillStore.setCurrentActivity({ name: 'Nothing' })
      this.skillStore.setCurrentCat('Currently Doing: ')

      console.log('canceling action')
    },

    updateProgress() {
      if (this.activeProgress >= (1000 * this.activeObject.interval * (1 - itemStore.equippedTools.explorationTool.toolStats.explorationMulti))) {
        let wasEfficent = this.efficencyReturn()

        this.skillStore.addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
        this.addMXP(1 * wasEfficent)

        this.updateEfficency()
        console.log('boop')

        this.activeProgress = 0
      }

      this.activeProgress += this.progressInterval
      this.activePercent = this.activeProgress / (this.activeObject.interval * 10)
      this.tryRepeatAction()
    },
    tryRepeatAction() {
      this.currentTimeout = setTimeout(this.updateProgress, this.progressInterval)
    },

    updateEfficency() {
      this.efficency = 2 * this.skillStore.skills[this.skillID].level
    },
    //TODO make efficency > 100 meaningful
    efficencyReturn() {
      if (this.efficency >= (Math.random() * 100)) {
        console.log('efficent!')
        return 2
      }
      return 1
    },

    unsealArea(area) {
      area.isSealed = false
      this.currentUnsealedAreas += 1
    },
    sealAllAreas() {
      for (area in this.activities) {
        area.isSealed = true
      }
      this.currentUnsealedAreas = 0
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