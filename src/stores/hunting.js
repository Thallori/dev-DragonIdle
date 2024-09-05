import { defineStore } from 'pinia'
import { useItemStore as itemStore } from '@/stores/inventory'
import { useSkillStore as skillStore } from '@/stores/skills'
import { useExplorationStore as explorationStore } from '@/stores/exploration'

export const useHuntingStore = defineStore('huntingStore', {
  state: () => ({
    progressInterval: 50, // 20 update per second
    efficency: 2,

    activeObject: {},
    activeProgress: 0,
    activePercent: { a: 0, b: false, c: '#04AA6D' },
    currentTimeout: 0,
    
    //hunting skill is stored as id 14 which is also its index, because I don't know how to do it otherwise
    skillID: 14,

    activities: [
      {
        id: '0',
        name: 'Sheep',
        itemMeatID: 'meatChop',
        itemMeatRange: [1, 1],
        itemHideID: 'hide1',
        itemHideRange: [0, 3],
        itemBonesID: 'bones1',
        image: 'assets/icons/sheep.png',
        levelRequired: 1,
        xpGain: 6,
        stalking: 4,
        hp: 4,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '1',
        name: 'Hog',
        itemMeatID: 'meatChop',
        itemMeatRange: [1, 2],
        itemHideID: 'hide2',
        itemHideRange: [1, 2],
        itemExtraID: 'hogTusk',
        itemExtraRange: [0, 2],
        itemBonesID: 'bones1',
        image: 'assets/icons/hog.png',
        levelRequired: 2,
        xpGain: 9,
        stalking: 5,
        hp: 5,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '2',
        name: 'Phesant',
        itemMeatID: 'meatGame',
        itemMeatRange: [1, 1],
        itemExtraID: 'feather',
        itemExtraRange: [2, 12],
        itemBonesID: 'bones1',
        image: 'assets/icons/bird.png',
        levelRequired: 3,
        xpGain: 14,
        stalking: 6,
        hp: 3,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '3',
        name: 'Goat',
        itemMeatID: 'meatGame',
        itemMeatRange: [1, 3],
        itemHideID: 'hide3',
        itemHideRange: [1, 2],
        itemExtraID: 'goatHorn',
        itemExtraRange: [0, 2],
        itemBonesID: 'bones1',
        image: 'assets/icons/animal4.png',
        levelRequired: 4,
        xpGain: 15,
        stalking: 4,
        hp: 8,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '4',
        name: 'Cow',
        itemMeatID: 'meatFlank',
        itemMeatRange: [3, 5],
        itemHideID: 'hide3',
        itemHideRange: [2, 5],
        itemBonesID: 'bones1',
        image: 'assets/icons/animal5.png',
        levelRequired: 5,
        xpGain: 25,
        stalking: 3,
        hp: 20,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '5',
        name: 'Horse',
        itemMeatID: 'meatFlank',
        itemMeatRange: [2, 3],
        itemHideID: 'hide4',
        itemHideRange: [2, 3],
        itemBonesID: 'bones1',
        image: 'assets/icons/animal6.png',
        levelRequired: 6,
        xpGain: 28,
        stalking: 7,
        hp: 12,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '6',
        name: 'Sloth',
        itemMeatID: 'meatFlank',
        itemMeatRange: [3, 5],
        itemHideID: 'hide4',
        itemHideRange: [2, 4],
        itemExtraID: 'slothClaws',
        itemExtraRange: [0, 4],
        itemBonesID: 'bones3',
        image: 'assets/icons/animal7.png',
        levelRequired: 7,
        xpGain: 40,
        stalking: 6,
        hp: 32,
        mxp: 0,
        mLevel: 0,
        mxpPrev: 0,
        mxpNext: 10,
      },
      {
        id: '7',
        name: 'Scarab',
        itemMeatID: 'meatSpicy',
        itemMeatRange: [2, 3],
        itemHideID: 'hide5',
        itemHideRange: [1, 2],
        itemExtraID: 'scarabVenom',
        itemExtraRange: [0, 2],
        image: 'assets/icons/animal8.png',
        levelRequired: 8,
        xpGain: 40,
        stalking: 8,
        hp: 18,
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
      localStorage.setItem('hunting-efficency', JSON.stringify(this.efficency))
      localStorage.setItem('hunting-activeObject', JSON.stringify(this.activeObject))

      for (let i in this.activities) {
        localStorage.setItem('hunting-mxp' + i, JSON.stringify(this.activities[i].mxp))
        localStorage.setItem('hunting-mLevel' + i, JSON.stringify(this.activities[i].mLevel))
        localStorage.setItem('hunting-mxpPrev' + i, JSON.stringify(this.activities[i].mxpPrev))
        localStorage.setItem('hunting-mxpNext' + i, JSON.stringify(this.activities[i].mxpNext))
      }
    },
    loadAll() {
      this.efficency = JSON.parse(localStorage.getItem('hunting-efficency'))

      for (let i in this.activities) {
        this.activities[i].mxp = JSON.parse(localStorage.getItem('hunting-mxp' + i))
        this.activities[i].mLevel = JSON.parse(localStorage.getItem('hunting-mLevel' + i))
        this.activities[i].mxpPrev = JSON.parse(localStorage.getItem('hunting-mxpPrev' + i))
        this.activities[i].mxpNext = JSON.parse(localStorage.getItem('hunting-mxpNext' + i))
      }
    },

    onLoad() {
      //localstorage makes the active object a real boy instead of a reference to a real boy
      this.activeObject = JSON.parse(localStorage.getItem('hunting-activeObject'))
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

      this.activeProgress = 0
      this.activePercent.a = 0
      this.activePercent.c = '#04AA6D'
      this.activeObject = newActiveActivity

      skillStore().cancelCurrentActivity('hunt')
      skillStore().setCurrentActivity(this.activeObject)
      skillStore().setCurrentCat('Hunting: ')
      skillStore().activePercent = this.activePercent
      this.updateEfficency()
      this.tryRepeatAction()
    },

    cancelAction() {
      clearTimeout(this.currentTimeout)
      this.activeProgress = 0
      this.activePercent.a = 0
      this.activePercent.c = '#04AA6D'
      this.activeObject = {}
      skillStore().setCurrentActivity({ name: 'Nothing' })
      skillStore().setCurrentCat('Currently Doing: ')
    },

    updateProgress() {
      if (this.activeProgress >= 1000 * this.activeObject.stalking) {

        if (this.instaKill() == true) {
          this.actionSuccess()
          return
        }

        this.activeProgress = this.activeObject.hp * 1000
        this.activePercent.a = 100
        this.activePercent.c = '#DC3545'

        this.tryRepeatJump()
        return
      }

      this.activeProgress += this.progressInterval
      this.activePercent.a = this.activeProgress / (10 * this.activeObject.stalking)
      this.tryRepeatAction()
    },
    tryRepeatAction() {
      this.currentTimeout = setTimeout(this.updateProgress, this.progressInterval)
    },

    updateJumpProgress() {
      if (this.activeProgress <= 0) {
        this.actionSuccess()
        return
      }

      this.activeProgress -= this.progressInterval * itemStore().equippedTools.huntingTool.toolStats.bleeding

      this.activePercent.a = this.activeProgress / (10 * this.activeObject.hp)

      this.tryRepeatJump()
    },
    tryRepeatJump() {
      this.currentTimeout = setTimeout(this.updateJumpProgress, this.progressInterval)
    },

    actionSuccess() {
      let wasEfficent = this.efficencyReturn()
      
      skillStore().addXP(this.skillID, (this.activeObject.xpGain * wasEfficent))
      this.addMXP(1 * wasEfficent)

      //there is always a meat
      //two range rolls are required to get odd numbers of items
      let rangeRoll = this.randomIntRange(this.activeObject.itemMeatRange[0], this.activeObject.itemMeatRange[1])
      let rangeRoll2 = this.randomIntRange(this.activeObject.itemMeatRange[0], this.activeObject.itemMeatRange[1])

      itemStore().changeItemCount(this.activeObject.itemMeatID, (rangeRoll + (rangeRoll2 * (wasEfficent - 1))), 'consumableItems')

      //if there are bones, there is only one
      if (this.activeObject.itemBonesID) {
        itemStore().changeItemCount(this.activeObject.itemBonesID, (1 * wasEfficent), 'resourceItems')
      }

      // if there is a hide, there is a range for hide, roll and give it
      if (this.activeObject.itemHideID) {
        let rangeRoll = this.randomIntRange(this.activeObject.itemHideRange[0], this.activeObject.itemHideRange[1])
        let rangeRoll2 = this.randomIntRange(this.activeObject.itemHideRange[0], this.activeObject.itemHideRange[1])

        itemStore().changeItemCount(this.activeObject.itemHideID, (rangeRoll + (rangeRoll2 * (wasEfficent - 1))), 'resourceItems')
      }

      // if there is an extra, there is a range for extra, roll and give it
      if (this.activeObject.itemExtraID) {
        let rangeRoll = this.randomIntRange(this.activeObject.itemExtraRange[0], this.activeObject.itemExtraRange[1])
        let rangeRoll2 = this.randomIntRange(this.activeObject.itemExtraRange[0], this.activeObject.itemExtraRange[1])

        itemStore().changeItemCount(this.activeObject.itemExtraID, (rangeRoll + (rangeRoll2 * (wasEfficent - 1))), 'resourceItems')
      }

      this.activeProgress = 0
      this.activePercent.a = 0
      this.activePercent.c = '#04AA6D'
      this.updateEfficency()
      this.tryRepeatAction()
    },

    instaKill() {
      if (((this.activeObject.mLevel * 0.02) + itemStore().equippedTools.huntingTool.toolStats.instaKill) >= Math.random()) {
        console.log('fatal strike!')
        return true
      }
      return false
    },

    updateEfficency() {
      this.efficency = 2 * skillStore().skills[this.skillID].level
      this.efficency += explorationStore().activities[0].mLevel //gleaming glade
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

    randomIntRange(min, max) {
      return Math.floor(Math.random() * (1 + max - min)) + min;
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