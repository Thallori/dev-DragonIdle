import { defineStore } from 'pinia'

export const useSkillStore = defineStore('skillStore', {
  state: () => ({
    maxLevel: 3,
    absoluteMaxLevel: 8,
    currentActivity: { name: 'Nothing' },
    currentCat: 'Currently Doing: ',

    skills: [
      {
        id: '0',
        name: 'Precision',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: true,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: false,
      },
      {
        id: '1',
        name: 'Strength',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: true,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: false,
      },
      {
        id: '2',
        name: 'Markship',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: true,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: true,
      },
      {
        id: '3',
        name: 'Spirit',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: true,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: true,
      },
      {
        id: '4',
        name: 'Block',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: true,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: false,
      },
      {
        id: '5',
        name: 'Reflex',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: true,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: true,
      },
      {
        id: '6',
        name: 'Acuity',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: true,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: true,
      },
      {
        id: '7',
        name: 'Vitality',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: true,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: false,
      },
      {
        id: '8',
        name: 'Mechanics',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: true,
      },
      {
        id: '9',
        name: 'Exploration',
        image: 'src/assets/icons/testIcon16.png',
        color: '#A7E0EB',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: false,
      },
      {
        id: '10',
        name: 'Ritual',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: true,
      },
      {
        id: '11',
        name: 'Slayer',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: true,
      },
      {
        id: '12',
        name: 'Scrying',
        image: 'src/assets/icons/testIcon16.png',
        color: '#CEBEAD',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: true,
      },
      {
        id: '13',
        name: 'Foraging',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: false,
      },
      {
        id: '14',
        name: 'Hunting',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: false,
      },
      {
        id: '15',
        name: 'Mining',
        image: 'src/assets/icons/testIcon16.png',
        color: '#CFDFE9',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: false,
      },
      {
        id: '16',
        name: 'Smithing',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: false,
      },
      {
        id: '17',
        name: 'Fletching',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: true,
      },
      {
        id: '18',
        name: 'Artifice',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: true,
      },
      {
        id: '19',
        name: 'Tailoring',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: true,
      },
      {
        id: '20',
        name: 'Cooking',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: false,
      },
      {
        id: '21',
        name: 'Alchemy',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: true,
      },
      {
        id: '22',
        name: 'Artisan',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: true,
      },
      {
        id: '23',
        name: 'Barony',
        image: 'src/assets/icons/testIcon16.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 400,
        level: 1,
        locked: true,
      },
    ]
  }),
  getters: {
    categoryCombat() {
      return this.skills.filter(e => e.isCombat === true)
    },
    categorySkill() {
      return this.skills.filter(e => e.isCombat === false)
    },
    // getXP: (state) => {
    //   return state.skills.length
    // },
    // currentLevel: (state) => {
    //   return ()
    // },
    // currentLevel(state) {
    //   return levelFromXP(state.xp);
    // }
  },
  actions: {
    setCurrentActivity(newActivity) {
      this.currentActivity = newActivity
    },
    setCurrentCat(newCat) {
      this.currentCat = newCat
    },

    addXP(index, xpAmount) {
      let xp = this.skills[index].xp
      let level = this.skills[index].level

      xp += xpAmount // if xp brings you from (max level - 2) to max level, then it bugs out
      level = levelFromXP(xp)

      // the final max level is also the maximum xp you can have
      if (level >= this.absoluteMaxLevel && this.maxLevel == this.absoluteMaxLevel) {
        level = this.absoluteMaxLevel
        xp = xpFromLevel(this.absoluteMaxLevel)
        this.skills[index].xp = xp
        this.skills[index].level = level
        return
      }

      //you can have enough xp to level up once your regular max level goes up
      if (level > this.maxLevel) {
        level = this.maxLevel
        xp = xpFromLevel(this.maxLevel + 1)
        this.skills[index].xp = xp
        this.skills[index].level = level
        return
      }

      this.skills[index].xp = xp

      // I should be able to just compute all of these, but I don't know how to get the data out.
      this.skills[index].level = level
      this.skills[index].xpPrev = xpFromLevel(level)
      this.skills[index].xpNext = xpFromLevel(level + 1)
    },
    unlockSkill(index) {
      this.skills[index].locked = false
    }
  }
})

export function levelFromXP(xp) {
  let level = 1;
  while (xpFromLevel(level + 1) <= xp) {
    level++;
  }
  return level;
}

export function xpFromLevel(t) {
  if (t <= 1) return 0;
  return Math.floor(100 * (2 ** t)); // Doubles every level, starting at 400
}