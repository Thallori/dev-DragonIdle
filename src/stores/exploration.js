import { defineStore } from 'pinia'
import { useItemStore as itemStore } from '@/stores/inventory'
import { useSkillStore as skillStore } from '@/stores/skills'
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

    activities: [
      {
        id: '0',
        name: 'Gleaming Glade',
        image: 'src/assets/icons/area1.png',
        levelRequired: 1,
        xpGain: 2,
        interval: 2.0,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
        isSealed: true,
        requiresAnyFlags: 'tbd',
        efficencySkill: 'Hunting',
        uniqueFeature1: ['Foraging', 0, 'src/assets/icons/oak.png'], //oak
        uniqueFeature2: ['Hunting', 2, 'src/assets/icons/bird.png'], //phesant
      },
      {
        id: '1',
        name: 'Cassit Canton',
        image: 'src/assets/icons/area2.png',
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
        image: 'src/assets/icons/area3.png',
        levelRequired: 3,
        xpGain: 6,
        interval: 3.5,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
        isSealed: true,
        efficencySkill: 'Scrying',
        uniqueFeature1: ['Scrying', 0, 'src/assets/icons/rune1.png'], //pale clay
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
      // },
      // {
      //   id: '5',
      //   name: 'Sixth Area',
      //   image: 'src/assets/icons/testIcon16.png',
      //   levelRequired: 6,
      //   xpGain: 88,
      //   interval: 88.0,
      //   mxp: 0,
      //   mLevel: 0,
      //   mxpPrev: 0,
      //   mxpNext: 10,
      //   isSealed: true,
      // },
      // {
      //   id: '6',
      //   name: 'Seventh Area',
      //   image: 'src/assets/icons/testIcon16.png',
      //   levelRequired: 7,
      //   xpGain: 88,
      //   interval: 88.0,
      //   mxp: 0,
      //   mLevel: 0,
      //   mxpPrev: 0,
      //   mxpNext: 10,
      //   isSealed: true,
      // },
      // {
      //   id: '7',
      //   name: 'Eighth Area',
      //   image: 'src/assets/icons/testIcon16.png',
      //   levelRequired: 8,
      //   xpGain: 88,
      //   interval: 88.0,
      //   mxp: 0,
      //   mLevel: 0,
      //   mxpPrev: 0,
      //   mxpNext: 10,
      //   isSealed: true,
      // },
    ]
  }),
  getters: {
  },
  actions: {
    saveAll() {
      localStorage.setItem('exploration-efficency', JSON.stringify(this.efficency))
      localStorage.setItem('exploration-maxUnsealedAreas', JSON.stringify(this.maxUnsealedAreas))
      localStorage.setItem('exploration-currentUnsealedAreas', JSON.stringify(this.currentUnsealedAreas))
      localStorage.setItem('exploration-activeObject', JSON.stringify(this.activeObject))

      for (let i in this.activities) {
        localStorage.setItem('exploration-xpGain' + i, JSON.stringify(this.activities[i].xpGain))
        localStorage.setItem('exploration-mxp' + i, JSON.stringify(this.activities[i].mxp))
        localStorage.setItem('exploration-mLevel' + i, JSON.stringify(this.activities[i].mLevel))
        localStorage.setItem('exploration-mxpPrev' + i, JSON.stringify(this.activities[i].mxpPrev))
        localStorage.setItem('exploration-mxpNext' + i, JSON.stringify(this.activities[i].mxpNext))
        localStorage.setItem('exploration-isSealed' + i, JSON.stringify(this.activities[i].isSealed))
      }
    },
    loadAll() {
      this.efficency = JSON.parse(localStorage.getItem('exploration-efficency'))
      this.maxUnsealedAreas = JSON.parse(localStorage.getItem('exploration-maxUnsealedAreas'))
      this.currentUnsealedAreas = JSON.parse(localStorage.getItem('exploration-currentUnsealedAreas'))

      for (let i in this.activities) {
        this.activities[i].mxp = JSON.parse(localStorage.getItem('exploration-mxp' + i))
        this.activities[i].mLevel = JSON.parse(localStorage.getItem('exploration-mLevel' + i))
        this.activities[i].mxpPrev = JSON.parse(localStorage.getItem('exploration-mxpPrev' + i))
        this.activities[i].mxpNext = JSON.parse(localStorage.getItem('exploration-mxpNext' + i))
        this.activities[i].isSealed = JSON.parse(localStorage.getItem('exploration-isSealed' + i))
      }
    },

    onLoad() {
      //localstorage makes the active object a real boy instead of a reference to a real boy
      this.activeObject = JSON.parse(localStorage.getItem('exploration-activeObject'))
      this.activeObject = this.activities[this.activeObject.id]
      this.tryRepeatAction()
    },
    
    setActiveAction(newActiveActivity) {
      clearTimeout(this.currentTimeout)
      if (newActiveActivity.id == this.activeObject.id) {
        this.cancelAction()
        return
      }

      this.activePercent = 0
      this.activeProgress = 0
      this.activeObject = newActiveActivity

      skillStore().cancelCurrentActivity('explore')
      skillStore().setCurrentActivity(this.activeObject)
      skillStore().setCurrentCat('Exploring: ')
      this.updateEfficency()

      this.tryRepeatAction()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.activeProgress = 0
      this.activePercent = 0
      this.activeObject = {}
      skillStore().setCurrentActivity({ name: 'Nothing' })
      skillStore().setCurrentCat('Currently Doing: ')
    },

    updateProgress() {

      if (this.activeProgress >= (1000 * this.activeObject.interval * (1 - itemStore().equippedTools.explorationTool.toolStats.explorationMulti))) {
        let wasEfficent = this.efficencyReturn()

        skillStore().addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
        this.addMXP(1 * wasEfficent)

        this.updateFlags()
        this.updateEfficency()
        // console.log('boop, action done')

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
      this.efficency = 2 * skillStore().skills[this.skillID].level
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

    updateFlags() {
      //hunting
      if (this.activeObject.id == 0 && this.activeObject.mLevel == 1) {
        skillStore().unlockSkill(14)
        return
      }
      //mining
      if (this.activeObject.id == 0 && this.activeObject.mLevel == 2) {
        skillStore().unlockSkill(15)
        return
      }
      //foraging
      if (this.activeObject.id == 0 && this.activeObject.mLevel == 3) {
        skillStore().unlockSkill(13)
        return
      }
      //scrying
      if (this.activeObject.id == 2 && this.activeObject.mLevel == 1) {
        skillStore().unlockSkill(12)
        return
      }
      //backup to unlock gathering skills
      if (skillStore().skills[13].locked == true && skillStore().skills[this.skillID].level > 1) {
        skillStore().unlockSkill(13)
        skillStore().unlockSkill(15)
        skillStore().unlockSkill(14)
        return
      }
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
  },
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