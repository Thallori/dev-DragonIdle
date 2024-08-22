import { defineStore } from 'pinia'
import { useItemStore } from '@/stores/inventory';
import { useCombatStore } from '@/stores/combat';
import { useExplorationStore } from '@/stores/exploration';
import { useScryingStore } from '@/stores/scrying';
import { useForagingStore } from '@/stores/foraging';
import { useHuntingStore } from '@/stores/hunting';
import { useMiningStore } from '@/stores/mining';
import { useSmithingStore } from '@/stores/smithing';
import { useCookingStore } from '@/stores/cooking';

export const useSkillStore = defineStore('skillStore', {
  state: () => ({
    maxLevel: 3,
    absoluteMaxLevel: 16,
    currentActivity: { name: 'Nothing' },
    currentCat: 'Currently Doing: ',
    currentColor: 'rgb(56, 86, 74)',

    itemStore: useItemStore(),
    combatStore: useCombatStore(),
    explorationStore: useExplorationStore(),
    scryingStore: useScryingStore(),
    foragingStore: useForagingStore(),
    huntingStore: useHuntingStore(),
    miningStore: useMiningStore(),
    smithingStore: useSmithingStore(),
    cookingStore: useCookingStore(),

    skills: [
      {
        id: '0',
        name: 'Precision',
        image: 'src/assets/12x/precision.png',
        color: '#FFFFFF',
        isCombat: true,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: false,
      },
      {
        id: '1',
        name: 'Strength',
        image: 'src/assets/12x/strength.png',
        color: '#FFFFFF',
        isCombat: true,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: false,
      },
      {
        id: '2',
        name: 'Markship',
        image: 'src/assets/12x/ranged.png',
        color: '#FFFFFF',
        isCombat: true,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: false,
      },
      {
        id: '3',
        name: 'Spirit',
        image: 'src/assets/12x/spirit.png',
        color: '#FFFFFF',
        isCombat: true,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: false,
      },
      {
        id: '4',
        name: 'Block',
        image: 'src/assets/12x/block.png',
        color: '#FFFFFF',
        isCombat: true,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: false,
      },
      {
        id: '5',
        name: 'Reflex',
        image: 'src/assets/12x/reflex.png',
        color: '#FFFFFF',
        isCombat: true,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: false,
      },
      {
        id: '6',
        name: 'Acuity',
        image: 'src/assets/12x/acuity.png',
        color: '#FFFFFF',
        isCombat: true,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: false,
      },
      {
        id: '7',
        name: 'Vitality',
        image: 'src/assets/12x/vitality.png',
        color: '#FFFFFF',
        isCombat: true,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: false,
      },
      {
        id: '8',
        name: 'Mechanics',
        image: 'src/assets/12x/strength.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: true,
      },
      {
        id: '9',
        name: 'Exploration',
        image: 'src/assets/12x/exploration.png',
        color: '#A7E0EB',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: false,
      },
      {
        id: '10',
        name: 'Ritual',
        image: 'src/assets/12x/strength.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: true,
      },
      {
        id: '11',
        name: 'Slayer',
        image: 'src/assets/12x/strength.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: true,
      },
      {
        id: '12',
        name: 'Scrying',
        image: 'src/assets/12x/scrying.png',
        color: '#CEBEAD',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: false,
      },
      {
        id: '13',
        name: 'Foraging',
        image: 'src/assets/12x/foraging.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: false,
      },
      {
        id: '14',
        name: 'Hunting',
        image: 'src/assets/12x/hunting.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: false,
      },
      {
        id: '15',
        name: 'Mining',
        image: 'src/assets/12x/mining.png',
        color: '#CFDFE9',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: false,
      },
      {
        id: '16',
        name: 'Smithing',
        image: 'src/assets/12x/smithing.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: false,
      },
      {
        id: '17',
        name: 'Fletching',
        image: 'src/assets/12x/strength.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: true,
      },
      {
        id: '18',
        name: 'Artifice',
        image: 'src/assets/12x/strength.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: true,
      },
      {
        id: '19',
        name: 'Tailoring',
        image: 'src/assets/12x/strength.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: true,
      },
      {
        id: '20',
        name: 'Cooking',
        image: 'src/assets/12x/cooking.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: false,
      },
      {
        id: '21',
        name: 'Alchemy',
        image: 'src/assets/12x/strength.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: true,
      },
      {
        id: '22',
        name: 'Artisan',
        image: 'src/assets/12x/strength.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
        level: 1,
        locked: true,
      },
      {
        id: '23',
        name: 'Barony',
        image: 'src/assets/12x/strength.png',
        color: '#FFFFFF',
        isCombat: false,
        xp: 0,
        xpPrev: 0,
        xpNext: 800,
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
    cancelCurrentActivity(temp) {
      //TODO, only cancel current activity instead of all of them
      if (this.currentCat == 'Currently Doing: ') {
        return
      }

      if (temp != 'combat') {
        this.combatStore.cancelAction()
      }
      if (temp != 'explore') {
        this.explorationStore.cancelAction()
      }
      if (temp != 'scry') {
        this.scryingStore.cancelAction()
      }
      if (temp != 'forage') {
        this.foragingStore.cancelAction()
      }
      if (temp != 'hunt') {
        this.huntingStore.cancelAction()
      }
      if (temp != 'mine') {
        this.miningStore.cancelAction()
      }
      if (temp != 'smith') {
        this.smithingStore.cancelAction()
      }
      if (temp != 'cook') {
        this.cookingStore.cancelAction()
      }
    },
    setCurrentActivity(newActivity) {
      this.currentActivity = newActivity
    },
    setCurrentCat(newCat) {
      this.currentCat = newCat
    },

    addXP(index, xpAmount) {
      
      if (isNaN(xpAmount) == true) {
        return console.log('xp just tried to be a NaN, silly')
      }

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
      // console.log('gained ' + xpAmount + ' ' + this.skills[index].name + ' xp')

      //updating combat stats on level up is required
      if (level != this.skills[index].level) {
        this.skills[index].level = level
        this.skills[index].xpPrev = xpFromLevel(level)
        this.skills[index].xpNext = xpFromLevel(level + 1)

        //if vitality levels up, gain 5 health
        if (index == 7) {
          this.combatStore.onHealthUp()
        }
        this.itemStore.updateEquippedStats()
      }
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
  return Math.floor(200 * (2 ** t)); // Doubles every level, starting at 400
}