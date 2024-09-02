import { defineStore } from 'pinia'

import { useSkillStore as skillStore } from '@/stores/skills'
import { useCombatStore as combatStore } from '@/stores/combat'
// import { useItemStore as itemStore } from '@/stores/inventory'
// import { useExplorationStore as explorationStore } from '@/stores/exploration'
// import { useScryingStore as scryingStore } from '@/stores/scrying'
// import { useForagingStore as foragingStore } from '@/stores/foraging'
// import { useHuntingStore as huntingStore } from '@/stores/hunting'
// import { useMiningStore as miningStore } from '@/stores/mining'
// import { useSmithingStore as smithingStore } from '@/stores/smithing'
// import { useCookingStore as cookingStore } from '@/stores/cooking'

import dias from '@/data/dias';
const diasData = { ...dias }

export const useDiaStore = defineStore('diaStore', {
  state: () => {
    return {
      activeStep: {},
      currentDia: [],
      currentLine: 1,
      currentMessage: "",
      showOK: true,
      showDia: false,
    };
  },
  getters: {
  },
  actions: {
    startDia(temp) {
      if (undefined == diasData[temp]) {
        return console.error('tried to start non-existant dialog: ' + temp)
      }
      this.currentLine = 1
      this.currentMessage = ""
      this.showOK = true
      this.showSkip = true
      this.activeStep = {}
      this.currentDia = []

      this.currentDia = diasData[temp]
      this.showDia = true
      this.dialogue()
    },
    dialogue() {
      this.activeStep = this.currentDia[this.currentLine]
      //if has flags, then make sure all are true, otherwise skip
      if (undefined !== this.activeStep.f) {
        if (this.allFlagsMatch(this.activeStep.f) == false) {
          this.currentLine += 1
          this.activeStep = this.currentDia[this.currentLine]
          this.dialogue()
          return
        }
      }
      //if e, then hide skip button
      if (undefined !== this.activeStep.e) {
        this.showSkip = false
      }
      //if activeStep is a message
      if (undefined !== this.activeStep.m) {
        this.currentMessage = this.activeStep.m
        this.showOK = true
        return
      //if activeStep is an auto advance message
      } else if (undefined !== this.activeStep.ma) {
        this.currentMessage = this.activeStep.ma[0]
        this.showOK = false
        this.showSkip = false
        setTimeout(this.nextDia, this.activeStep.ma[1])
        return
      //if activeStep is a question
      } else if (undefined !== this.activeStep.q) {
        this.currentMessage = this.activeStep.q
        this.showOK = false
        return
      }
      //if all else fails, just end the dialog
      this.clearDia()
    },
    nextDia(temp) {
      //if there is no more dialog, set flag and escape
      if (undefined !== this.activeStep.e) {
        this.clearDia()
        return
      }
      //if there's a response
      if (undefined !== temp) {
        //if there's a function, run it
        if (undefined !== temp[2]) {
          skillStore()[temp[2]]()
        }
        //then go to label
        this.currentLine = this.currentDia.findIndex(t => t.label === temp[1])
      //if there is a next, go to it
      } else if (undefined !== this.activeStep.next) {
        this.currentLine = this.currentDia.findIndex(t => t.label === this.activeStep.next)
      //else, increment line
      } else {
        this.currentLine += 1
      }
      //display new line
      this.showSkip = true
      this.dialogue()
    },
    skipDia() {
      skillStore().flags.skipCount += 1
      this.clearDia()
    },

    clearDia() {
      skillStore().flags[this.currentDia[0].id] = true
      if (undefined !== this.currentDia[0].combat) {
        combatStore().cancelAction()
        combatStore().combatPaused = false
      }
      this.showDia = false
    },

    allFlagsMatch(temp) {
      //if any flags do not match, then return false, otherwise return true
      for (let [key, value] of Object.entries(temp)) {
        if (skillStore().flags[key] != temp[key]) {
          return false
        }
      }
      return true
    },
  },
});