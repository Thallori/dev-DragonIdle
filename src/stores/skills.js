import { defineStore } from 'pinia'

import { useDiaStore as diaStore } from '@/stores/dialog'
import { useItemStore as itemStore } from '@/stores/inventory'
import { useCombatStore as combatStore } from '@/stores/combat'

import { useMechanicsStore as mechanicsStore } from '@/stores/mechanics'
import { useExplorationStore as explorationStore } from '@/stores/exploration'
import { useScryingStore as scryingStore } from '@/stores/scrying'
import { useForagingStore as foragingStore } from '@/stores/foraging'
import { useHuntingStore as huntingStore } from '@/stores/hunting'
import { useMiningStore as miningStore } from '@/stores/mining'
import { useSmithingStore as smithingStore } from '@/stores/smithing'
import { useArtificeStore as artificeStore } from '@/stores/artifice'
import { useTailoringStore as tailoringStore } from '@/stores/tailoring'
import { useCookingStore as cookingStore } from '@/stores/cooking'

export const useSkillStore = defineStore('skillStore', {
  state: () => {
    return {
      dateLast: Date.now(),
      secondTimeout: null,
      totalOffline: 0,
      oneMinuteCounter: 0,
      warpAutomatically: true,

      maxLevel: 3,
      currentActivity: { name: 'Nothing' },
      currentCat: 'Currently Doing: ',
      currentColor: 'rgb(56, 86, 74)',
      activePercent: { a: 0 },

      inDialog: [false, 'none'],
      flags: {
        showCombat: false,
        showHug: false,
        showBest: false,
        showHoard: false,
        showMechanics: false,
        showAux: false,

        skipCount: 0,
        intro: false,
        loop1: false,
        dungeon0: false,
        dungeon1: false,
        dungeon2: false,//tower
        dungeon3: false,
        dungeon4: false,
        dungeon5: false,//republic
        dungeon6: false,
        dungeon7: false,
        dungeon8: false,//area9

        combatDummy: false,

        pacifist: true,
        ultraPacifist: true,
        flawedPacifist: false,
        genocide: true,
        ultraGenocide: true,
        startedGenocide: false,
      },
      skills: [
        {
          id: '0',
          name: 'Precision',
          image: 'assets/12x/precision.png',
          color: '#FFFFFF',
          isCombat: true,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Governs Accuracy of All Styles',
        },
        {
          id: '1',
          name: 'Strength',
          image: 'assets/12x/strength.png',
          color: '#FFFFFF',
          isCombat: true,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Governs Melee Damage',
        },
        {
          id: '2',
          name: 'Markship',
          image: 'assets/12x/ranged.png',
          color: '#FFFFFF',
          isCombat: true,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Governs Ranged Damage',
        },
        {
          id: '3',
          name: 'Spirit',
          image: 'assets/12x/spirit.png',
          color: '#FFFFFF',
          isCombat: true,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Governs Magic Damage',
        },
        {
          id: '4',
          name: 'Block',
          image: 'assets/12x/block.png',
          color: '#FFFFFF',
          isCombat: true,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Governs Melee Dodge',
        },
        {
          id: '5',
          name: 'Reflex',
          image: 'assets/12x/reflex.png',
          color: '#FFFFFF',
          isCombat: true,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Governs Ranged Dodge',
        },
        {
          id: '6',
          name: 'Acuity',
          image: 'assets/12x/acuity.png',
          color: '#FFFFFF',
          isCombat: true,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Governs Magic Dodge',
        },
        {
          id: '7',
          name: 'Vitality',
          image: 'assets/12x/vitality.png',
          color: '#FFFFFF',
          isCombat: true,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Governs Maximum HP',
        },
        {
          id: '8',
          name: 'Mechanics',
          image: 'assets/12x/mechanics.png',
          color: '#FFFFFF',
          isCombat: false,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Manipulate Time and Space',
        },
        {
          id: '9',
          name: 'Exploration',
          image: 'assets/12x/exploration.png',
          color: '#A7E0EB',
          isCombat: false,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: false,
          tip: 'Discover New Resources',
        },
        {
          id: '10',
          name: 'Ritual',
          image: 'assets/12x/strength.png',
          color: '#FFFFFF',
          isCombat: false,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Put Remains to Rest',
        },
        {
          id: '11',
          name: 'Slayer',
          image: 'assets/12x/strength.png',
          color: '#FFFFFF',
          isCombat: false,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Survive Special Encounters',
        },
        {
          id: '12',
          name: 'Scrying',
          image: 'assets/12x/scrying.png',
          color: '#CEBEAD',
          isCombat: false,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Gather Unstable Materials',
        },
        {
          id: '13',
          name: 'Foraging',
          image: 'assets/12x/foraging.png',
          color: '#FFFFFF',
          isCombat: false,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Gather Living Materials',
        },
        {
          id: '14',
          name: 'Hunting',
          image: 'assets/12x/hunting.png',
          color: '#FFFFFF',
          isCombat: false,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Gather Dead Materials',
        },
        {
          id: '15',
          name: 'Mining',
          image: 'assets/12x/mining.png',
          color: '#CFDFE9',
          isCombat: false,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Gather Hardened Materials',
        },
        {
          id: '16',
          name: 'Smithing',
          image: 'assets/12x/smithing.png',
          color: '#FFFFFF',
          isCombat: false,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Produce Melee Equipment',
        },
        {
          id: '17',
          name: 'Fletching',
          image: 'assets/12x/strength.png',
          color: '#FFFFFF',
          isCombat: false,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Produce Ranged Weapons',
        },
        {
          id: '18',
          name: 'Artifice',
          image: 'assets/12x/artiface.png',
          color: '#FFFFFF',
          isCombat: false,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Produce Magic Weapons',
        },
        {
          id: '19',
          name: 'Tailoring',
          image: 'assets/12x/strength.png',
          color: '#FFFFFF',
          isCombat: false,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Produce Ranged and Magic Armor',
        },
        {
          id: '20',
          name: 'Cooking',
          image: 'assets/12x/cooking.png',
          color: '#FFFFFF',
          isCombat: false,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Produce Healing Food',
        },
        {
          id: '21',
          name: 'Alchemy',
          image: 'assets/12x/strength.png',
          color: '#FFFFFF',
          isCombat: false,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Produce Potions and Oils',
        },
        {
          id: '22',
          name: 'Crafting',
          image: 'assets/12x/crafting.png',
          color: '#FFFFFF',
          isCombat: false,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Produce Jewelry and Tools',
        },
        {
          id: '23',
          name: 'Barony',
          image: 'assets/12x/strength.png',
          color: '#FFFFFF',
          isCombat: false,
          xp: 0,
          xpPrev: 0,
          xpNext: 600,
          level: 1,
          locked: true,
          tip: 'Produce Buildings',
        },
      ]
    };
  },
  getters: {
    categoryCombat() {
      return this.skills.filter(e => e.isCombat === true)
    },
    categorySkill() {
      return this.skills.filter(e => e.isCombat === false)
    },
  },
  actions: {
    saveAll() {
      localStorage.setItem('global-version', JSON.stringify('v1'))

      localStorage.setItem('skills-dateLast', JSON.stringify(this.dateLast))
      localStorage.setItem('skills-totalOffline', JSON.stringify(this.totalOffline))
      localStorage.setItem('skills-maxLevel', JSON.stringify(this.maxLevel))
      localStorage.setItem('skills-currentActivity', JSON.stringify(this.currentActivity))
      localStorage.setItem('skills-currentCat', JSON.stringify(this.currentCat))
      localStorage.setItem('skills-currentColor', JSON.stringify(this.currentColor))
      localStorage.setItem('skills-inDialog', JSON.stringify(this.inDialog))
      localStorage.setItem('skills-flags', JSON.stringify(this.flags))

      for (let i in this.skills) {
        localStorage.setItem('skills-xp' + i, JSON.stringify(this.skills[i].xp))
        localStorage.setItem('skills-xpPrev' + i, JSON.stringify(this.skills[i].xpPrev))
        localStorage.setItem('skills-xpNext' + i, JSON.stringify(this.skills[i].xpNext))
        localStorage.setItem('skills-level' + i, JSON.stringify(this.skills[i].level))
        localStorage.setItem('skills-locked' + i, JSON.stringify(this.skills[i].locked))
      }

      itemStore().saveAll()
      combatStore().saveAll()
      cookingStore().saveAll()
      explorationStore().saveAll()
      foragingStore().saveAll()
      huntingStore().saveAll()
      miningStore().saveAll()
      scryingStore().saveAll()
      smithingStore().saveAll()
      artificeStore().saveAll()
      mechanicsStore().saveAll()
      tailoringStore().saveAll()
      console.log('should be saved')
    },
    loadAll() {
      this.cancelCurrentActivity('all')

      this.dateLast = JSON.parse(localStorage.getItem('skills-dateLast'))
      this.totalOffline = JSON.parse(localStorage.getItem('skills-totalOffline'))
      this.maxLevel = JSON.parse(localStorage.getItem('skills-maxLevel'))
      this.currentActivity = JSON.parse(localStorage.getItem('skills-currentActivity'))
      this.currentCat = JSON.parse(localStorage.getItem('skills-currentCat'))
      this.currentColor = JSON.parse(localStorage.getItem('skills-currentColor'))
      this.inDialog = JSON.parse(localStorage.getItem('skills-inDialog')) ?? [false, 'none']

      let tempFlags = JSON.parse(localStorage.getItem('skills-flags'))
      Object.assign(this.flags, tempFlags)

      for (let i in this.skills) {
        this.skills[i].xp = JSON.parse(localStorage.getItem('skills-xp' + i)) ?? 0
        this.skills[i].xpPrev = JSON.parse(localStorage.getItem('skills-xpPrev' + i)) ?? 0
        this.skills[i].xpNext = JSON.parse(localStorage.getItem('skills-xpNext' + i)) ?? 600
        this.skills[i].level = JSON.parse(localStorage.getItem('skills-level' + i)) ?? 1
        this.skills[i].locked = JSON.parse(localStorage.getItem('skills-locked' + i)) ?? true
      }

      itemStore().loadAll()
      combatStore().loadAll()
      cookingStore().loadAll()
      explorationStore().loadAll()
      foragingStore().loadAll()
      huntingStore().loadAll()
      miningStore().loadAll()
      scryingStore().loadAll()
      smithingStore().loadAll()
      artificeStore().loadAll()
      mechanicsStore().loadAll()
      tailoringStore().loadAll()
      console.log('should be loaded')

      cookingStore().updateEfficency()
      explorationStore().updateEfficency()
      foragingStore().updateEfficency()
      huntingStore().updateEfficency()
      miningStore().updateEfficency()
      scryingStore().updateEfficency()
      smithingStore().updateEfficency()
      artificeStore().updateEfficency()
      mechanicsStore().updateEfficency()
      tailoringStore().updateEfficency()

      //resume doing things
      if (this.currentCat == 'Raiding: ' || this.currentCat == 'Fighting: ') {
        combatStore().onLoad()
      }
      if (this.currentCat == 'Cooking: ') {
        cookingStore().onLoad()
      }
      if (this.currentCat == 'Exploring: ') {
        explorationStore().onLoad()
      }
      if (this.currentCat == 'Foraging: ') {
        foragingStore().onLoad()
      }
      if (this.currentCat == 'Hunting: ') {
        huntingStore().onLoad()
      }
      if (this.currentCat == 'Mining: ') {
        miningStore().onLoad()
      }
      if (this.currentCat == 'Scrying: ') {
        scryingStore().onLoad()
      }
      if (this.currentCat == 'Smithing: ') {
        smithingStore().onLoad()
      }
      if (this.currentCat == 'Artificing: ') {
        artificeStore().onLoad()
      }
      if (this.currentCat == 'Machining: ') {
        mechanicsStore().onLoad()
      }
      if (this.currentCat == 'Tailoring: ') {
        tailoringStore().onLoad()
      }

      //resume dialog if somehow loading a save with dialog
      if (this.inDialog[0] == true) {
        this.diaThrow(this.inDialog[1])
      }
    },
    clearAll() {
      localStorage.clear()
      location.reload()
    },

    timeUpdate() {
      let offlineTime = Date.now() - this.dateLast

      //if more than 1.1 seconds have past, pretend the window reloaded
      if (offlineTime > 1100) {
        this.totalOffline += offlineTime
        //if less than 8 hours have passed make warping manual
        if (this.totalOffline > 28800000) {
          this.warpAutomatically = false
        }
        if (this.warpAutomatically == true) {
          this.warp()
        }
      }
      //increase offline time if doing nothing, or if combat is paused while fighting an enemy
      if (this.currentActivity.name == 'Nothing' || (combatStore().combatPaused == true && undefined != combatStore().activeObject.id)) {
        this.totalOffline += 1000
      }
      // else {
      //   this.totalOffline -= 1000
      // }
      //time bank cannot be less than zero
      if (this.totalOffline < 0) {
        this.totalOffline = 0
        // cookingStore().updateEfficency()
        // explorationStore().updateEfficency()
        // foragingStore().updateEfficency()
        // huntingStore().updateEfficency()
        // miningStore().updateEfficency()
        // scryingStore().updateEfficency()
        // smithingStore().updateEfficency()
        // artificeStore().updateEfficency()
      }

      if (this.oneMinuteCounter > 60) {
        this.oneMinuteCounter = 0
        this.saveAll()
      }

      this.dateLast = Date.now()
      this.oneMinuteCounter += 1
      this.secondTimeout = setTimeout(this.timeUpdate, 1000)
    },

    warp() {
      if (this.totalOffline > 28800000) { //8 hours
        this.warpTime(28800000)
      } else {
        this.warpTime(this.totalOffline)
      }
    },

    idk() {
      this.warpTime(this.totalOffline)
    },

    warpTime(ttime) {
      if (this.currentCat == 'Exploring: ') {
        explorationStore().warp(ttime)
        return
      }
      if (this.currentCat == 'Mining: ') {
        miningStore().warp(ttime)
        return
      }
      if (this.currentCat == 'Foraging: ') {
        foragingStore().warp(ttime)
        return
      }
      if (this.currentCat == 'Hunting: ') {
        huntingStore().warp(ttime)
        return
      }
      if (this.currentCat == 'Scrying: ') {
        scryingStore().warp(ttime)
        return
      }
      if (this.currentCat == 'Smithing: ') {
        smithingStore().warp(ttime)
        return
      }
      if (this.currentCat == 'Cooking: ') {
        cookingStore().warp(ttime)
        return
      }
      if (this.currentCat == 'Artificing: ') {
        artificeStore().warp(ttime)
        return
      }
      if (this.currentCat == 'Machining: ') {
        mechanicsStore().warp(ttime)
        return
      }
      if (this.currentCat == 'Tailoring: ') {
        tailoringStore().warp(ttime)
        return
      }
    },

    cancelCurrentActivity(temp) {
      //if doing nothing, then nothing needs doing TODO, only cancel current activity instead of all of them
      // if (this.currentCat == 'Currently Doing: ') {
      //   return
      // }

      if (temp != 'combat') {
        combatStore().cancelAction()
      }
      if (temp != 'explore') {
        explorationStore().cancelAction()
      }
      if (temp != 'scry') {
        scryingStore().cancelAction()
      }
      if (temp != 'forage') {
        foragingStore().cancelAction()
      }
      if (temp != 'hunt') {
        huntingStore().cancelAction()
      }
      if (temp != 'mine') {
        miningStore().cancelAction()
      }
      if (temp != 'smith') {
        smithingStore().cancelAction()
      }
      if (temp != 'artifice') {
        artificeStore().cancelAction()
      }
      if (temp != 'cook') {
        cookingStore().cancelAction()
      }
      if (temp != 'mechanics') {
        mechanicsStore().cancelAction()
      }
      if (temp != 'tailor') {
        tailoringStore().cancelAction()
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
        return console.error('xp just tried to be a NaN, silly')
      }

      let xp = this.skills[index].xp
      let level = this.skills[index].level

      //if level is maxed and xp is maxed, then do nothing
      if (level == this.maxLevel && xp == this.skills[index].xpNext) {
        return
      }

      xp += xpAmount // if xp brings you from (max level - 2) to max level, then it bugs out
      level = levelFromXP(xp)

      //you can have enough xp to level up once your regular max level goes up
      if (level > this.maxLevel) {
        level = this.maxLevel
        xp = xpFromLevel(this.maxLevel + 1)
        this.skills[index].xp = xp
        this.skills[index].level = level
        this.skills[index].xpPrev = xpFromLevel(level)
        this.skills[index].xpNext = xpFromLevel(level + 1)
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
          combatStore().onHealthUp()
        }
        itemStore().updateEquippedStats()
        //if mechanics, then update max areas
        if (index == 8) {
          explorationStore().updateMaxAreas()
        }
        this.checkGiveHug()
        this.checkGenocide()
        //on any level up, show more menus
        if (this.flags.showAux != true) {
          this.flags.showAux = true
        }
      }
    },

    unlockSkill(index) {
      this.skills[index].locked = false
    },
    unlockCombat() {
      this.skills[0].locked = false
      this.skills[1].locked = false
      this.skills[4].locked = false
      this.skills[7].locked = false
      this.flags.showCombat = true
    },
    unlockedWords() {
      //if we did this already, don't do this
      if (this.flags.words == true) {
        return
      }
      this.flags.showMechanics = true
      this.diaThrow('words')
    },

    unlockCombatPacifist() {
      this.diaThrow('showHug')
      this.flags.showHug = true

      //if you haven't killed anyone, don't show offensive skills
      if (this.flags.pacifist == true) {
        this.skills[4].locked = false
        this.skills[5].locked = false
        this.skills[6].locked = false
        this.skills[7].locked = false
        this.flags.showCombat = true
      } else {
        this.unlockCombat()
      }

      combatStore().currentStyle = 'hug'
      itemStore().preStance = 0
      itemStore().aggStance = 0
      itemStore().defStance = 10
      itemStore().updateEquippedStats()
    },

    //TODO all dungeons
    dungeonDone(temp) {
      this[temp]()
    },
    dungeon2() {
      this.flags.showBest = true
      this.maxLevel = 6
      this.unlockSkill(8)
      //did not even get exploration mxp
      if (this.flags.genocide == true) {
        this.flags.startedGenocide = true
        this.checkUltraGenocide()
      }
      //you have been told how to hug, killed someone anyway, and have now been told murder is wrong. if you murder again, some combat.js will remove this flag, making you just a murderer
      if (this.flags.pacifist == false && this.flags.showHug == true) {
        this.flags.flawedPacifist = true
      }
      //unlock remaining combat skills if not a pacifist
      if (this.flags.pacifist == false) {
        this.unlockSkill(2)
        this.unlockSkill(3)
        this.unlockSkill(5)
        this.unlockSkill(6)
      }
      this.diaThrow('dungeon2')
    },

    diaThrow(temp) {
      diaStore().startDia(temp)
    },

    checkGiveHug() {
      //if this check gave you a hug already, or you've completed sequence3, do nothing
      if (this.flags.showHug == true || this.flags.dungeon2 == true) {
        return
      }
      //add up all currently implimented non-combat skills (except hunting)
      let leveladder = 0
      leveladder += this.skills[9].level
      leveladder += this.skills[12].level
      leveladder += this.skills[13].level
      // leveladder += this.skills[14].level
      leveladder += this.skills[15].level
      leveladder += this.skills[16].level
      leveladder += this.skills[18].level
      leveladder += this.skills[20].level

      //if all levels are maxed out, then let hug
      if (leveladder >= 21) {
        this.unlockCombatPacifist()
      }
    },
    checkGenocide() {
      //if you already failed to genocide, do nothing
      if (this.flags.genocide == false) {
        return
      }
      //add up all non-combat skills
      let leveladder = 0
      leveladder += this.skills[12].level
      leveladder += this.skills[13].level
      leveladder += this.skills[14].level
      leveladder += this.skills[15].level
      leveladder += this.skills[16].level
      leveladder += this.skills[17].level
      leveladder += this.skills[18].level
      leveladder += this.skills[19].level
      leveladder += this.skills[20].level
      leveladder += this.skills[21].level
      leveladder += this.skills[22].level
      leveladder += this.skills[23].level

      if (leveladder > 12) {
        this.flags.genocide = false
        this.flags.ultraGenocide = false
      }
    },
    checkUltraGenocide() {
      //if you already failed to ultraGenocide, do nothing
      if (this.flags.ultraGenocide == false) {
        return
      }
      //add up all non-combat skills
      let xpadder = 0
      xpadder += explorationStore().activities[0].mxp
      xpadder += explorationStore().activities[1].mxp
      xpadder += explorationStore().activities[2].mxp
      xpadder += explorationStore().activities[3].mxp
      xpadder += explorationStore().activities[4].mxp
      xpadder += explorationStore().activities[5].mxp

      xpadder += this.skills[12].xp
      xpadder += this.skills[13].xp
      xpadder += this.skills[14].xp
      xpadder += this.skills[15].xp
      xpadder += this.skills[16].xp
      xpadder += this.skills[17].xp
      xpadder += this.skills[18].xp
      xpadder += this.skills[19].xp
      xpadder += this.skills[20].xp
      xpadder += this.skills[21].xp
      xpadder += this.skills[22].xp
      xpadder += this.skills[23].xp

      if (xpadder > 0) {
        this.flags.ultraGenocide = false
      }
    },
  },
});

export function levelFromXP(xp) {
  //first level is 600xp
  if (xp < 600) return 1; else if (xp < 800) return 2;

  let level = 1;
  while (xpFromLevel(level + 1) <= xp) {
    level++;
  }
  return level;
}

export function xpFromLevel(t) {
  if (t <= 1) return 0;
  if (t <= 2) return 600; //first level is 600xp
  return Math.floor(200 * (2 ** t)); // Doubles every level, starting at 400
}
