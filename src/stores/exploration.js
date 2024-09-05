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
    activePercent: { a: 0, b: false, c: '#04AA6D' },
    currentTimeout: 0,

    //exploration skill is stored as id 9 which is also its index, because I don't know how to do it otherwise
    skillID: 9,

    activities: [
      {
        id: '0',
        name: 'Gleaming Glade',
        image: 'assets/icons/area1.png',
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
        uniqueFeature2: ['Hunting', 2, 'assets/icons/bird.png'], //phesant
        uniqueFeature1: ['Foraging', 0, 'assets/icons/oak.png'], //oak
      },
      {
        id: '1',
        name: 'Cassit Canton',
        image: 'assets/icons/area2.png',
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
        uniqueFeature1: ['Mining', 1, 'assets/icons/tinore.png'], //tin
        uniqueFeature2: ['Hunting', 1, 'assets/icons/hog.png'], //hog
      },
      {
        id: '2',
        name: 'Vibrant Vale',
        image: 'assets/icons/area3.png',
        levelRequired: 3,
        xpGain: 6,
        interval: 3.5,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
        isSealed: true,
        efficencySkill: 'Scrying',
        uniqueFeature1: ['Scrying', 0, 'assets/icons/rune1.png'], //pale clay
        uniqueFeature2: ['Mining', 2, 'assets/icons/amber.png'], //amber
      },
      {
        id: '3',
        name: 'area4',
        image: 'assets/icons/area4.png',
        levelRequired: 4,
        xpGain: 6,
        interval: 3.0,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
        isSealed: true,
        efficencySkill: 'Foraging',
        uniqueFeature1: ['Foraging', 3, 'assets/icons/plant4.png'], //cotton
        uniqueFeature2: ['Scrying', 3, 'assets/icons/rune4.png'], //spelldew
      },
      // {
      //   id: '4',
      //   name: 'Fifth Area',
      //   image: 'assets/icons/testIcon16.png',
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
      //   image: 'assets/icons/testIcon16.png',
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
      //   image: 'assets/icons/testIcon16.png',
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
      //   image: 'assets/icons/testIcon16.png',
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
        this.activities[i].mxp = JSON.parse(localStorage.getItem('exploration-mxp' + i)) ?? 0
        this.activities[i].mLevel = JSON.parse(localStorage.getItem('exploration-mLevel' + i)) ?? 0
        this.activities[i].mxpPrev = JSON.parse(localStorage.getItem('exploration-mxpPrev' + i)) ?? 0
        this.activities[i].mxpNext = JSON.parse(localStorage.getItem('exploration-mxpNext' + i)) ?? 10
        this.activities[i].isSealed = JSON.parse(localStorage.getItem('exploration-isSealed' + i)) ?? true
      }
    },

    onLoad() {
      //localstorage makes the active object a real boy instead of a reference to a real boy
      this.activeObject = JSON.parse(localStorage.getItem('exploration-activeObject'))
      this.activeObject = this.activities[this.activeObject.id]
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatAction()
    },
    
    setActiveAction(newActiveActivity) {
      clearTimeout(this.currentTimeout)
      if (newActiveActivity.id == this.activeObject.id) {
        this.cancelAction()
        return
      }

      this.activePercent.a = 0
      this.activeProgress = 0
      this.activeObject = newActiveActivity

      skillStore().cancelCurrentActivity('explore')
      skillStore().setCurrentActivity(this.activeObject)
      skillStore().setCurrentCat('Exploring: ')
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

    updateProgress() {

      if (this.activeProgress >= (1000 * this.activeObject.interval * (1 - itemStore().equippedTools.explorationTool.toolStats.explorationMulti))) {
        let wasEfficent = this.efficencyReturn()

        skillStore().addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
        this.addMXP(1 * wasEfficent)

        this.updateFlags()
        this.updateEfficency()

        this.activeProgress = 0
      }

      this.activeProgress += this.progressInterval
      this.activePercent.a = this.activeProgress / (this.activeObject.interval * 10)
      this.tryRepeatAction()
    },
    tryRepeatAction() {
      this.currentTimeout = setTimeout(this.updateProgress, this.progressInterval)
    },

    updateEfficency() {
      this.efficency = 2 * skillStore().skills[this.skillID].level
      if (skillStore().totalOffline >= 1000) {
        this.efficency += 75
      }
    },
    efficencyReturn() {
      let a = 1 + Math.floor(this.efficency / 100)
      if (this.efficency % 100 >= (Math.random() * 100)) {
        a += 1
      }
      if (a == 2) {
        console.log('efficent!')
      }
      if (a == 3) {
        console.log('double efficent!')
      }
      if (a == 4) {
        console.log('triple efficent!')
      }
      return a
    },

    unsealArea(area) {
      area.isSealed = false
      this.currentUnsealedAreas += 1
    },
    sealAllAreas() {
      for (let i in this.activities) {
        this.activities[i].isSealed = true
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