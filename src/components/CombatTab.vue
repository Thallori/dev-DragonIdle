<script>
import { useSkillStore } from '@/stores/skills';
import { useExplorationStore } from '@/stores/exploration';
import { useCombatStore } from '@/stores/combat';
import { useSmithingStore } from '@/stores/smithing';
import { useCookingStore } from '@/stores/cooking';
import { useItemStore } from '@/stores/inventory';

import equipstats from './panels/equipstats.vue';

export default {
  name: 'CombatTab',
  components: {
    equipstats
  },
  setup() {
    const skillStore = useSkillStore()
    const explorationStore = useExplorationStore()
    const combatStore = useCombatStore()
    const smithingStore = useSmithingStore()
    const cookingStore = useCookingStore()
    const itemStore = useItemStore()
    return { skillStore, explorationStore, combatStore, smithingStore, cookingStore, itemStore }
  },
  data() {
    return {
      shownMenu: 0,
      shownLocation: -1,
      showAllStyles: false,
      showAllStances: false,
      showAllFood: false,
      
      dropsObject: {},
      showDropsModal: false,
      showGuideModal: false,
      guidePage: 0,
    }
  },
  methods: {
    scrollToTop() {
      this.$refs.topEl?.scrollIntoView({ behavior: 'smooth' })
    },

    toggleMenus(temp) {
      if (this.shownMenu == temp) {
        this.shownMenu = 0
        return
      }
      this.shownMenu = temp
    },
    
    toggleStyles() {
      this.showAllStyles = !this.showAllStyles
      this.showAllStances = false
    },
    toggleStances() {
      this.showAllStances = !this.showAllStances
      this.showAllStyles = false
    },

    cycleStyles() {
      //if ranged is unlocked, then range
      if (this.combatStore.currentStyle == 'melee' && this.skillStore.skills[2].locked == false) {
        this.combatStore.currentStyle = 'ranged'
        this.combatStore.resetDragonAttack()
        return
      }

      //if ranged and magic are unlocked, then magic, else back to melee
      if (this.combatStore.currentStyle == 'ranged' && this.skillStore.skills[3].locked == false) {
        this.combatStore.currentStyle = 'magic'
        this.combatStore.resetDragonAttack()
        return
      } else if (this.combatStore.currentStyle == 'ranged') {
        this.combatStore.currentStyle = 'melee'
        this.combatStore.resetDragonAttack()
        return
      }

      //if magic, then melee, no additional checks
      if (this.combatStore.currentStyle == 'magic') {
        this.combatStore.currentStyle = 'melee'
        this.combatStore.resetDragonAttack()
        return
      }
    },

    maybeShowDrops() {
      if (this.combatStore.activeObject.id != undefined) {
        this.dropsObject = this.combatStore.activeObject
        this.showDropsModal = true
      }
    },

    bonusSmithingMastery(temp) {
      if (temp.mSmithing) {
        temp = this.smithingStore.equipmentMastery.find(blep => blep.id === temp.mSmithing)
        return temp.mLevel
      }
      return 0
    },
    bonusHeals(temp) {
      temp = this.cookingStore.activities.find(blep => blep.itemID === temp.id)
      return temp.mLevel
    },
  },
}
</script>

<template>
  <!-- Spooky Top Scroll Target -->
  <div style="translate: 0 -200px" ref="topEl"></div>

  <!-- Main Window -->
  <div class="card py-4 align-items-center main-window bg-transparent" style="width: 85rem;">

    <!-- Drops Modal -->
    <div class="modal show-modal" v-if="showDropsModal == true">
      <div class="modal-backing" @click="showDropsModal = false"></div>

      <!-- Drops Content -->
      <div class="modal-content py-4 px-5" style="width: 23rem;">

        <div class="text-center pb-2">
          <div class="pb-1">
            {{ dropsObject.name }}
          </div>
          <img :src="dropsObject.image" alt="" width="128" height="128">
        </div>

        <div class="text-center dark-text py-2"
          v-if="dropsObject.alwaysDrops[0] == undefined && dropsObject.randomDrops[0] == undefined">
          No Drops
        </div>

        <div class="d-flex justify-content-between align-items-center dark-text py-2" v-if="dropsObject.alwaysDrops[0]">
          <span>Always Drops</span>
          <span class="little-levels">up to</span>
        </div>

        <!-- Always Drops -->
        <div class="d-flex justify-content-between gap-2 pb-1" v-for="always in dropsObject.alwaysDrops">
          <img :src="itemStore.getItemData(always.itemID).image" alt="" width="32" height="32">
          <span class="flex-grow-1">
            {{ itemStore.getItemData(always.itemID).name }}
          </span>
          <span v-if="always.itemRange">
            x{{ always.itemRange[1] }}
          </span>
          <span v-else>
            x1
          </span>
        </div>

        <div class="d-flex justify-content-between align-items-center dark-text py-2" v-if="dropsObject.randomDrops[0]">
          <span>Randomly Drops</span>
          <span class="little-levels">up to</span>
        </div>

        <!-- Random Drops -->
        <div v-for="sometimes in dropsObject.randomDrops">
          <div class="d-flex justify-content-between gap-2 pb-1" v-if="sometimes.itemID">
            <img :src="itemStore.getItemData(sometimes.itemID).image" alt="" width="32" height="32">
            <span class="flex-grow-1">
              {{ itemStore.getItemData(sometimes.itemID).name }}
            </span>
            <span v-if="sometimes.itemRange">
              x{{ sometimes.itemRange[1] }}
            </span>
            <span v-else>
              x1
            </span>
          </div>
        </div>
      </div>

    </div>

    <!-- Guide Modal -->
    <div class="modal show-modal" v-if="showGuideModal == true">
      <div class="modal-backing" @click="showGuideModal = false"></div>

      <!-- Guide Content -->
      <div class="modal-content py-4 px-2" style="width: 23rem;">

        <div class="text-center pb-2">
          <div class="pb-1">
            Combat Guide
          </div>

          <!-- Page 1 -->
          <div class="little-levels" v-if="guidePage == 0">
            Life and death are in a dance, eating at each other in an endless stalemate.
            <br><br>

            <span class="text-warning">Vitality</span>
            <br>
            The essense of life. It grows with every blow taken. <span class="info-text">Food</span> is a primary
            assitant, <span class="info-text">equipped meals</span> will be automatically eaten when health reaches
            the
            <span class="info-text">meal's base heal stat</span>. If a dragon recieves more damage than this, the
            dragon
            will be <span class="info-text">maimed</span>.
            <br><br>

            <span class="text-warning">Style</span>
            <br>
            When attacking, <span class="info-text">style (precise, aggressive, defensive)</span> determines what kind
            of <span class="info-text">combat XP</span> is awarded, along with some bonus stats. <span
              class="info-text">Precision</span> is shared among all styles, but <span class="info-text">damage
              and dodge</span> are their own skill.
            <br><br>

            <span class="text-warning">Max Hit</span>
            <br>
            The worst a creature can do. Damage comes from an <span class="info-text">affinity (strength, markship,
              or
              spirit)</span> multiplied by equipment bonuses.
            <br><br>

            <span class="text-warning">Chance to Hit</span>
            <br>
            Not every attempt to harm lands. Each round, a d100 is rolled to determine what happens.
            <br>
            <br>

            <div class="px-4">
              <div class="d-flex justify-content-between">
                <span>
                  <span class="badge">*</span>
                  Miss = 0-24
                </span>
                <span>Zero 💥</span>
              </div>
              <div class="d-flex justify-content-between">
                <span>
                  <span class="badge bg-secondary">*</span>
                  Graze = 25-49
                </span>
                <span>Deals 1% to 25% 💥</span>
              </div>
              <div class="d-flex justify-content-between">
                <span>
                  <span class="badge" style="background-color: #dc3644;">*</span>
                  Hit = 50-99
                </span>
                <span>Deals 25% to 100% 💥</span>
              </div>
              <div class="d-flex justify-content-between">
                <span>
                  <span class="badge" style="background-color: #dca936;">*</span>
                  Crit = 100+
                </span>
                <span>Deals 125% 💥</span>
              </div>
            </div>

            <br>
            The final roll is directly buffed by <span class="info-text">accuracy (precision)</span> and countered
            by
            <span class="info-text">dodge (block, reflex, acuity)</span>. As such, advice: anything with at least a
            <span class="info-text">75% chance to hit</span> can <span class="info-text">crit</span>.
            <br><br>

            <span class="text-warning">Damage Mitigation</span>
            <br>
            When all else fails, reduce harm. Incoming damage is first multiplied by <span
              class="info-text">resistance</span>, then subtracted by <span class="info-text">armor
              (physical)</span>
            or
            <span class="info-text">barrier (energy)</span>. Conversely, if a creature is protected by <span
              class="info-text">resistance</span>, it is directly countered by <span
              class="info-text">penetration</span>.
            <br><br>

            <span class="text-warning">Rocks and Fire</span>
            <br>
            Some weapons <span class="info-text">require ammo</span>, others do not. When without, targets can always be
            bit with <span class="info-text">fangs</span>,
            hit by <span class="info-text">rocks</span>, or puffed in <span class="info-text">flame</span>.

          </div>
        </div>

      </div>
    </div>

    <!-- Activity Selector -->
    <div class="px-5 pb-1 w-100" style="max-width: 64rem;">

      <!-- Top Help and Menu -->
      <div class="d-flex flex-wrap justify-content-center gap-1">

        <!-- Skill Icon and Help Button -->
        <div class="card card-activity align-items-center py-2" style="width: 67px; height: 67px;">
          <img src="src/assets/12x/questionmark.png" alt="" width="48" height="48">
          <div class="stretched-link" @click="showGuideModal = true"></div>
        </div>

        <!-- Menu Selector -->
        <div class="card flex-grow-1 align-items-center py-2 px-0">
          <div class="d-flex flex-wrap gap-1 pt-1 px-2">

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 150px"
              @click="toggleMenus(1)">
              <div class="d-flex justify-content-start">
                <img src="src/assets/icons/defaultmap.png" alt="" width="32" height="32">Areas
              </div>
            </div>

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 150px"
              @click="toggleMenus(2)">
              <div class="d-flex justify-content-start">
                <img src="src/assets/icons/steelsword16.png" alt="" width="32" height="32">Sequences
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Area Selector -->
    <div class="px-5 pb-1 w-100" style="max-width: 64rem;" v-if="shownMenu == 1">

      <div class="d-flex flex-wrap gap-1 pb-1">
        <!-- Area Selector -->
        <div class="card pb-1" style="max-width: 630px;">
          <div class="card-header text-center little-levels py-0">
            Areas
          </div>

          <div class="d-flex flex-wrap gap-1 pt-1 px-2">

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 150px"
              @click="shownLocation = -1">
              <div class="d-flex justify-content-start">
                <img src="src/assets/icons/area0.png" alt="" width="32" height="32">Home
              </div>
            </div>

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 150px"
              @click="shownLocation = 0">
              <div class="d-flex justify-content-start">
                <img src="src/assets/icons/area1.png" alt="" width="32" height="32">Glade
              </div>
            </div>

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 150px"
              @click="shownLocation = 1">
              <div class="d-flex justify-content-start">
                <img src="src/assets/icons/area2.png" alt="" width="32" height="32">Canton
              </div>
            </div>

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 150px"
              @click="shownLocation = 2">
              <div class="d-flex justify-content-start">
                <img src="src/assets/icons/area3.png" alt="" width="32" height="32">Vale
              </div>
            </div>

          </div>
        </div>

        <!-- Enemy Selector -->
        <div class="card pb-1 flex-grow-1" style="min-width: 270px; max-width: 300px;">
          <div class="card-header text-center little-levels py-0">
            Encounters
          </div>

          <div class="pt-1 px-1">

            <!-- Common Enemies -->
            <div class="d-flex gap-1"
              v-for="activity in combatStore.enemies.filter(temp => temp.location === this.shownLocation)">

              <!-- disabled -->

              <div class="btn sidenav-item px-2 py-1"
                :class="(explorationStore.activities[activity.location].isSealed) ? '' : ''"
                style="font-size: 1.2rem; font-weight: 500; width: 100%;" @click="combatStore.setActiveAction(activity)"
                v-if="activity.location != -1">

                <div class="d-flex justify-content-start">
                  <img :src="activity.image" alt="" width="32" height="32">{{ activity.name }}
                </div>
              </div>

              <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 100%;"
                @click="combatStore.setActiveAction(activity)" v-if="activity.location == -1">

                <div class="d-flex justify-content-start">
                  <img :src="activity.image" alt="" width="32" height="32">{{ activity.name }}
                </div>
              </div>

              <div class="btn align-content-center px-1 py-1" @click="dropsObject = activity; showDropsModal = true">
                🎁
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>

    <!-- Dungeon Selector -->
    <div class="px-5 pb-2 w-100" style="max-width: 64rem;" v-if="shownMenu == 2">

      <div class="card pb-1">
        <div class="card-header text-center little-levels py-0">
          Sequences
        </div>

        <div class="d-flex flex-wrap gap-4 pt-1 px-2">

          <!-- Dungeons -->
          <div style="width: 285px;" v-for="dungeon in combatStore.dungeons">
            <div class="d-flex gap-1">

              <!-- disabled -->

              <div class="btn sidenav-item px-2 py-1"
                :class="(explorationStore.activities[dungeon.location].isSealed) ? 'disabled-goes-here' : ''"
                style="font-size: 1.2rem; font-weight: 500; width: 100%;"
                @click="combatStore.setActiveDungeon(dungeon)">

                <div class="d-flex justify-content-start">
                  <img :src="dungeon.image" alt="" width="32" height="32">{{ dungeon.name }}
                </div>
              </div>

            </div>
            <div class="little-levels px-2">
              <span class="btn px-1 py-1" @click="dropsObject = dungeon; showDropsModal = true">
                🎁
              </span>
              <span>
                Encounters: {{ dungeon.rounds.reduce((n, { amount }) => n + amount, 0) }}
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>

    <!-- Main Battle -->
    <div class="d-flex flex-wrap justify-content-center gap-1">

      <!-- Extra Dragon Info -->
      <div class="card card-big px-0 pb-1 mb-1" style="width: 40%; min-width: 19.1rem;">

        <div class="card-header text-center little-levels dark-text py-0">
          Style
        </div>
        <!-- Style -->
        <div class="px-2">
          <div class="d-flex gap-1">

            <!-- Style Selector -->
            <div class="card equipment-card flex-grow-1 mt-1"
              v-if="combatStore.currentStyle == 'hug' && showAllStyles == false">

              <div class="d-flex justify-content-center py-2">
                <span>❤️ Act</span>
              </div>
            </div>

            <div class="card equipment-card flex-grow-1 mt-1"
              v-if="combatStore.currentStyle == 'best' && showAllStyles == false">

              <div class="d-flex justify-content-center py-2">
                <span>🐉 Best</span>
              </div>
            </div>

            <div class="card equipment-card flex-grow-1 mt-1" @click="cycleStyles()"
              v-if="combatStore.currentStyle == 'melee' && showAllStyles == false">

              <div class="d-flex justify-content-center py-2">
                <span>🗡️ Melee</span>
              </div>
            </div>

            <div class="card equipment-card flex-grow-1 mt-1" @click="cycleStyles()"
              v-if="combatStore.currentStyle == 'ranged' && showAllStyles == false">

              <div class="d-flex justify-content-center py-2">
                <span>🏹 Range</span>
              </div>
            </div>

            <div class="card equipment-card flex-grow-1 mt-1" @click="cycleStyles()"
              v-if="combatStore.currentStyle == 'magic' && showAllStyles == false">

              <div class="d-flex justify-content-center py-2">
                <span>🔥 Magic</span>
              </div>
            </div>

            <!-- All Styles -->
            <div class="flex-grow-1 mt-1" v-if="showAllStyles == true">

              <div class="card equipment-card mb-1"
                @click="combatStore.currentStyle = 'hug'; showAllStyles = false; combatStore.resetDragonAttack()"
                v-if="skillStore.flags.showHug == true">

                <div class="d-flex justify-content-center py-2">
                  <span>❤️ Act</span>
                </div>
              </div>

              <div class="card equipment-card mb-1"
                @click="combatStore.currentStyle = 'best'; showAllStyles = false; combatStore.resetDragonAttack()"
                v-if="skillStore.flags.sequence3 == true">

                <div class="d-flex justify-content-center py-2">
                  <span>🐉 Best</span>
                </div>
              </div>

              <div class="card equipment-card mb-1"
                @click="combatStore.currentStyle = 'melee'; showAllStyles = false; combatStore.resetDragonAttack()">

                <div class="d-flex justify-content-center py-2">
                  <span>🗡️ Melee</span>
                </div>
              </div>

              <div class="card equipment-card mb-1"
                @click="combatStore.currentStyle = 'ranged'; showAllStyles = false; combatStore.resetDragonAttack()"
                v-if="skillStore.skills[2].locked == false">

                <div class="d-flex justify-content-center py-2">
                  <span>🏹 Range</span>
                </div>
              </div>

              <div class="card equipment-card mb-2"
                @click="combatStore.currentStyle = 'magic'; showAllStyles = false; combatStore.resetDragonAttack()"
                v-if="skillStore.skills[3].locked == false">

                <div class="d-flex justify-content-center py-2">
                  <span>🔥 Magic</span>
                </div>
              </div>
            </div>

            <!-- Show All Styles -->
            <div class="card equipment-card mt-1" style="min-width: 2rem; height: fit-content" @click="toggleStyles()"
              v-if="skillStore.skills[2].locked == false || skillStore.skills[3].locked == false || skillStore.flags.showHug == true">
              <div class="d-flex justify-content-center align-content-center py-2">
                ▼
              </div>
            </div>

          </div>
        </div>

        <!-- Stance -->
        <div class="px-2 mb-1" style="min-height: 61px;">
          <div class="d-flex gap-1">

            <!-- Stance Selector -->
            <div class="card equipment-card flex-grow-1 my-1"
              @click="itemStore.aggStance = 1; itemStore.preStance = 0; itemStore.updateEquippedStats()"
              v-if="itemStore.preStance != 0 && showAllStances == false">

              <div class="d-flex justify-content-center py-2">
                <span>🎯 Precise</span>
              </div>
            </div>

            <div class="card equipment-card flex-grow-1 my-1"
              @click="itemStore.defStance = 10; itemStore.aggStance = 0; itemStore.updateEquippedStats()"
              v-if="itemStore.aggStance != 0 && showAllStances == false">

              <div class="d-flex justify-content-center py-2">
                <span>💥 Aggressive</span>
              </div>
            </div>

            <div class="card equipment-card flex-grow-1 my-1"
              @click="itemStore.preStance = 5; itemStore.defStance = 0; itemStore.updateEquippedStats()"
              v-if="itemStore.defStance != 0 && showAllStances == false">

              <div class="d-flex justify-content-center py-2">
                <span>🛡️ Defensive</span>
              </div>
            </div>

            <!-- All Stances -->
            <div class="flex-grow-1 my-1" v-if="showAllStances == true">
              <div class="card equipment-card mb-1"
                @click="itemStore.preStance = 5; itemStore.aggStance = 0; itemStore.defStance = 0; itemStore.updateEquippedStats(); showAllStances = false;">

                <div class="d-flex justify-content-center py-2">
                  <span>🎯 Precise</span>
                </div>
              </div>

              <div class="card equipment-card mb-1"
                @click="itemStore.preStance = 0; itemStore.aggStance = 1; itemStore.defStance = 0; itemStore.updateEquippedStats(); showAllStances = false;">

                <div class="d-flex justify-content-center py-2">
                  <span>💥 Aggressive</span>
                </div>
              </div>

              <div class="card equipment-card mb-1"
                @click="itemStore.preStance = 0; itemStore.aggStance = 0; itemStore.defStance = 10; itemStore.updateEquippedStats(); showAllStances = false;">

                <div class="d-flex justify-content-center py-2">
                  <span>🛡️ Defensive</span>
                </div>
              </div>
            </div>

            <!-- Show All Stances -->
            <div class="card equipment-card my-1" style="min-width: 2rem; height: fit-content" @click="toggleStances()">
              <div class="d-flex justify-content-center py-2">
                ▼
              </div>
            </div>

          </div>
        </div>

        <!-- Info Stuff -->
        <div class="px-2 pt-1">

          <!-- Component Selector -->
          <div class="d-flex justify-content-center gap-1 my-1">
            <div class="card equipment-card px-2">
              🧪
            </div>
            <div class="card equipment-card px-2">
              ✨
            </div>
            <div class="card equipment-card px-2">
              🔮
            </div>
          </div>

          <!-- Info Panel -->
          <div class="card text-center little-levels my-1 p-2">
            UNDER CONSTRUCTION BLEPBLEPBLEPBLEPBLEPBLEPBLEP
          </div>
        </div>
      </div>

      <!-- Dragon and Opponent -->
      <div class="d-flex flex-wrap justify-content-center gap-1">
        <!-- Dragon Panel -->
        <div class="card card-big px-0 pb-1 mb-1">

          <div class="card-header text-center little-levels dark-text py-0">
            Stats
          </div>

          <!-- Healing -->
          <div class="px-2">
            <div class="d-flex gap-1 justify-content-center">

              <!-- Equipped Food Item -->
              <div class="card equipment-card flex-grow-1 my-1"
                @click="combatStore.healByObject(itemStore.equippedCombat.foodSlot); combatStore.resetDragonAttack()"
                v-if="itemStore.equippedCombat.foodSlot.heals">
                <div class="d-flex justify-content-center align-items-center gap-1 py-2">

                  <span class="align-content-center little-levels px-1 mt-1">
                    ({{ itemStore.equippedCombat.foodSlot.count }})
                  </span>

                  <span>
                    <img :src="itemStore.equippedCombat.foodSlot.image" alt="" width="32" height="32"
                      style="margin-top: -16px; margin-bottom: -8px;">

                    +{{ itemStore.equippedCombat.foodSlot.heals }} HP
                  </span>
                </div>
              </div>

              <!-- No Food Equipped Button -->
              <div class="card equipment-card flex-grow-1 my-1" @click="showAllFood = !showAllFood" v-else>
                <div class="d-flex justify-content-center py-2">
                  <span>No Food</span>
                </div>
              </div>

              <!-- Food Selector -->
              <div class="card equipment-card my-1" @click="showAllFood = !showAllFood" style="min-width: 2rem;">
                <div class="d-flex justify-content-center py-2">
                  ▼
                </div>
              </div>
            </div>
          </div>

          <!-- Dragon Stuff -->
          <div class="px-2">

            <!-- Attack Time and Health -->
            <div style="min-height: 61px;">
              <div class="d-flex">

                <div class="w-100">
                  <!-- Attack Time -->
                  <div class="progress my-1" role="attack time bar" style="height: 9px;">
                    <div class="progress-bar attack-progress" :style="`width: ${this.combatStore.attackPercent}%;`">
                    </div>
                  </div>

                  <!-- Health -->
                  <div class="progress my-1" role="health bar" style="height: 14px;">
                    <div class="progress-bar health-progress"
                      :style="`width: ${this.combatStore.currentHealthPercent}%;`">
                    </div>
                  </div>
                </div>

                <!-- Attacking With -->
                <div class="d-flex align-items-center justify-content-center ps-2" style="min-width: 2rem">
                  <span v-if="combatStore.bestStyle == 'hug'">
                    ❤️
                  </span>
                  <span v-if="combatStore.bestStyle == 'melee'">
                    🗡️
                  </span>
                  <span v-if="combatStore.bestStyle == 'ranged'">
                    🏹
                  </span>
                  <span v-if="combatStore.bestStyle == 'magic'">
                    🔥
                  </span>
                </div>
              </div>

              <!-- CtH and Health -->
              <div class="d-flex justify-content-between px-1 pb-1">
                <div class="little-levels align-content-center">
                  <span v-if="combatStore.currentStyle != 'hug'">
                    Chance to Hit:
                  </span>
                  <span v-else>
                    Chance to Act:
                  </span>
                  <span v-if="combatStore.activeObject.stats">

                    <span v-if="combatStore.currentStyle == 'hug'">
                      100%
                    </span>

                    <span v-if="combatStore.currentStyle == 'melee'">
                      {{ 75 + itemStore.equippedStats.meleeAccuracy -
                      combatStore.activeObject.stats.meleeDodge }}%
                    </span>

                    <span v-if="combatStore.currentStyle == 'ranged'">
                      {{ 75 + itemStore.equippedStats.rangedAccuracy -
                      combatStore.activeObject.stats.rangedDodge }}%
                    </span>

                    <span v-if="combatStore.currentStyle == 'magic'">
                      {{ 75 + itemStore.equippedStats.magicAccuracy -
                      combatStore.activeObject.stats.magicDodge }}%
                    </span>

                  </span>
                  <span v-else>—%</span>

                </div>
                <div class="tooltip-be3">
                  <div class="badge py-1 px-2" :style="{ 'background-color': this.combatStore.dragonHitColor }"
                    v-if="combatStore.dragonHit != -1">
                    {{ combatStore.dragonHit }}
                  </div>

                  <span v-if="combatStore.currentStatus.maimed > 0">
                    🩹
                    <div class="tooltip-text py-1 px-3">
                      <div class="d-flex justify-content-center little-levels ">
                        <span>
                          <span class="text-warning">Maimed</span>
                          <br>
                          Damaged halved for 5 minutes ({{ combatStore.currentStatus.maimed /1000 }}s)
                        </span>
                      </div>
                    </div>
                  </span>

                  <span v-if="combatStore.currentStatus.poison[0] > 0">
                    ☣️
                    <div class="tooltip-text py-1 px-3">
                      <div class="d-flex justify-content-center little-levels ">
                        <span>
                          <span class="text-warning">Acid</span>
                          <br>
                          Lose 1 HP per second for 8 seconds
                        </span>
                      </div>
                    </div>
                  </span>

                  <span v-if="combatStore.currentStatus.shock > 0">
                    ⚡
                    <div class="tooltip-text py-1 px-3">
                      <div class="d-flex justify-content-center little-levels ">
                        <span>
                          <span class="text-warning">Shock</span>
                          <br>
                          Pauses attacks for 0.5 seconds
                        </span>
                      </div>
                    </div>
                  </span>

                  <span> ♥ {{ combatStore.currentHealth }}</span>
                  <span class="little-levels">/{{ skillStore.skills[7].level * 5 }}</span>
                </div>
              </div>
            </div>

            <!-- Run Away -->
            <div class="card equipment-card text-center px-2" @click="combatStore.cancelAction()">
              🏃‍♀️ Scamper
            </div>

            <!-- All Food -->
            <div class="card align-items-center my-1 pb-2" style="min-width: 18rem;" v-if="showAllFood == true">

              <div class="d-flex flex-wrap gap-1" style="width: 16rem; padding-left: 0.5rem;">

                <div class="mx-auto mt-2" v-if="itemStore.getAllFoodWithCount.length == 0">
                  NO FOOD IN HOARD
                </div>

                <div class="mt-2" v-for="inventoryItem in itemStore.getAllFoodWithCount">

                  <!-- Card of Food -->
                  <div class="card tooltip-bcf" :class="inventoryItem.onEquip ? 'equipped-card' : 'equipment-card'"
                    style="width: 58px; height: 58px;" @click="itemStore.equipItem(inventoryItem); showAllFood = false">

                    <!-- Tooltip -->
                    <div class="tooltip-text">
                      <div class="card-header py-1">{{ inventoryItem.name }} </div>
                      <div class="py-1 mx-3 little-levels">

                        <div class="text-warning">
                          Food
                        </div>

                        <div>
                          <span>Heals: </span>
                          <span>{{ inventoryItem.heals }}</span>

                          <div v-if="inventoryItem.dcat == 'cookedFood'">
                            <span>Bonus Healing: </span>
                            <span>{{ bonusHeals(inventoryItem) }}</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    <!-- Image of Food -->
                    <img class="mx-auto my-auto" :src="inventoryItem.image" alt="" width="48" height="48">
                    <div class="card-img-overlay my-4">

                      <!-- make a better number formater, TODO -->
                      <span class="position-relative little-levels badge bg-secondary"
                        style="translate: -20px -50px; padding: 0.25rem;">
                        {{ inventoryItem.count.toLocaleString(undefined, { notation: 'compact' }) }}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <equipstats v-if="showAllFood == false" />

          </div>
        </div>

        <!-- Opponent Panel -->
        <div class="card card-big px-0 mb-1">

          <div class="card-header text-center little-levels dark-text py-0">
            Creature
          </div>

          <!-- Location -->
          <div class="px-2">
            <div class="d-flex gap-1 justify-content-center">

              <!-- Toggle Pause -->
              <div class="card equipment-card flex-grow-1 my-1"
                @click="combatStore.combatPaused = !combatStore.combatPaused">
                <div class="d-flex justify-content-center py-2">
                  <span v-if="combatStore.combatPaused == false">
                    ⏱️ Pause Combat
                  </span>
                  <span v-if="combatStore.combatPaused == true">
                    ▶️ Resume Combat
                  </span>
                </div>
              </div>

            </div>
          </div>

          <!-- Opponent Stuff -->
          <div class="px-2">

            <!-- Opponent Attack Time and Health -->
            <div style="min-height: 61px;">
              <div class="d-flex">

                <!-- Attacking With -->
                <div class="d-flex align-items-center justify-content-center pe-2" style="min-width: 2rem">
                  <span v-if="combatStore.eBestStyle == 'melee'">
                    🗡️
                  </span>
                  <span v-if="combatStore.eBestStyle == 'ranged'">
                    🏹
                  </span>
                  <span v-if="combatStore.eBestStyle == 'magic'">
                    🔥
                  </span>
                </div>

                <div class="w-100">
                  <!-- Opponent Attack Time -->
                  <div class="progress my-1" role="opponent attack time bar" style="height: 9px;">
                    <div class="progress-bar attack-progress" :style="`width: ${this.combatStore.eAttackPercent}%;`">
                    </div>
                  </div>

                  <!-- Opponent Health -->
                  <div class="progress my-1" role="opponent health bar" style="height: 14px;">
                    <div class="progress-bar health-progress" :style="`width: ${this.combatStore.eHealthPercent}%;`">
                    </div>
                  </div>
                </div>
              </div>

              <!-- CtH and Health -->
              <div class="d-flex justify-content-between px-1 pb-1">
                <div class="tooltip-be3">

                  <span v-if="combatStore.activeObject.stats">
                    {{ combatStore.eHealth }}
                  </span>
                  <span v-else>-</span>

                  <span class="little-levels" v-if="combatStore.activeObject.stats">/{{
                    combatStore.activeObject.stats.health }}
                  </span>
                  <span class="little-levels" v-else>/-</span>

                  <span> ♥ </span>

                  <span v-if="combatStore.eStatus.poison[0] > 0">
                    ☣️

                    <div class="tooltip-text py-1 px-3">
                      <div class="d-flex justify-content-center little-levels ">
                        <span>
                          <span class="text-warning">Acid</span>
                          <br>
                          Lose 1 HP per second for 8 seconds
                        </span>
                      </div>
                    </div>
                  </span>

                  <span v-if="combatStore.eStatus.shock > 0">
                    ⚡

                    <div class="tooltip-text py-1 px-3">
                      <div class="d-flex justify-content-center little-levels ">
                        <span>
                          <span class="text-warning">Shock</span>
                          <br>
                          Pauses attacks for 0.5 seconds
                        </span>
                      </div>
                    </div>
                  </span>

                  <div class="badge py-1 px-2" :style="{ 'background-color': this.combatStore.eHitColor }"
                    v-if="combatStore.eHit != -1">
                    {{ combatStore.eHit }}
                  </div>

                  <div class="badge py-1 px-2 bg-success" v-if="combatStore.hugHealth > 0">
                    {{ combatStore.hugHealth }}
                  </div>
                </div>

                <div class="little-levels align-content-center">
                  <span>Chance to Hit: </span>
                  <span v-if="combatStore.activeObject.stats">

                    <span v-if="combatStore.eBestStyle == 'melee'">
                      {{ 75 + Math.ceil(combatStore.activeObject.stats.meleeAccuracy -
                      itemStore.equippedStats.meleeDodge) }}%
                    </span>

                    <span v-if="combatStore.eBestStyle == 'ranged'">
                      {{ 75 + Math.ceil(combatStore.activeObject.stats.rangedAccuracy -
                      itemStore.equippedStats.rangedDodge) }}%
                    </span>

                    <span v-if="combatStore.eBestStyle == 'magic'">
                      {{ 75 + Math.ceil(combatStore.activeObject.stats.magicAccuracy -
                      itemStore.equippedStats.magicDodge) }}%
                    </span>

                  </span>
                  <span v-else>—%</span>

                </div>
              </div>
            </div>

            <!-- Drops -->
            <div class="card equipment-card text-center" @click="maybeShowDrops()">
              Drops 🎁
            </div>

            <!-- Enemy Picture and Stats -->
            <div class="card text-center align-items-center my-1 py-2" style="min-width: 18rem; min-height: 22rem;">

              <!-- Enemy Picture -->
              <div style="height: 17rem;">
                <div class="pb-1 tooltip-be3" v-if="combatStore.activeObject.stats">
                  {{ combatStore.activeObject.name }}

                  <span class="little-levels" v-if="combatStore.activeDungeon.id != null">
                    ({{ combatStore.dungeonEnemyCounter + ' of ' + combatStore.activeDungeon.rounds.reduce((n, { amount
                    }) => n + amount, 0)}})
                  </span>

                  <div class="tooltip-text py-1 px-3">
                    <div class="d-flex justify-content-between little-levels ">
                      <span>
                        {{ combatStore.activeObject.flavor }}
                      </span>
                    </div>
                  </div>

                </div>
                <div class="pb-1" v-else>—</div>

                <div class="py-1" v-if="combatStore.activeObject.image">

                  <div class="position-absolute" v-if="combatStore.isFinding == true">
                    <div class="spinner-border text-secondary"
                      style="width: 7rem; height: 7rem; border-width: 8px; margin: 50%;"></div>
                  </div>

                  <img :src="combatStore.activeObject.image" alt="" style="height: 224px; width: 224px; opacity: 0.05;"
                    v-if="combatStore.isFinding == true">

                  <img :src="combatStore.activeObject.image" alt="" style="height: 224px; width: 224px;" v-else>

                </div>
              </div>

              <!-- Enemy Stats -->
              <div class="text-center little-levels" style="width: 14rem;">
                <div class="py-2">

                  <div class="text-warning">
                    <span v-if="combatStore.activeObject.stats">

                      <span v-if="combatStore.activeObject.stats.meleeDamage">
                        Melee
                      </span>

                      <span
                        v-if="combatStore.activeObject.styles[0] == 'melee' && combatStore.activeObject.styles[1] != null">
                        /
                      </span>

                      <span v-if="combatStore.activeObject.stats.rangedDamage">
                        Ranged
                      </span>

                      <span v-if="combatStore.activeObject.stats.magicDamage">
                        Magic
                      </span>
                    </span>
                    <span v-else>Combat Style</span>
                  </div>

                  <div class="d-flex justify-content-between">
                    <span>Max Hit: </span>
                    <span v-if="combatStore.activeObject.stats">

                      <!-- Melee Max Hit, Calculated -->
                      <span
                        v-if="combatStore.activeObject.stats.meleeDamage && combatStore.activeObject.stats.meleeAccuracy - itemStore.equippedStats.meleeDodge >= 0">

                        *{{ Math.max(1, Math.ceil((((1 - itemStore.equippedStats.resist) *
                        combatStore.activeObject.stats.meleeDamage)
                        - itemStore.equippedStats.physicalArmor) * 1.25)) }}

                      </span>
                      <!-- No Crit -->
                      <span v-else-if="combatStore.activeObject.stats.meleeDamage">

                        {{ Math.max(1, Math.ceil((1 - itemStore.equippedStats.resist) *
                        combatStore.activeObject.stats.meleeDamage)
                        - itemStore.equippedStats.physicalArmor) }}

                      </span>

                      <span
                        v-if="combatStore.activeObject.styles[0] == 'melee' && combatStore.activeObject.styles[1] != null">
                        /
                      </span>

                      <!-- Ranged Max Hit, Calculated -->
                      <span
                        v-if="combatStore.activeObject.stats.rangedDamage && combatStore.activeObject.stats.rangedAccuracy - itemStore.equippedStats.rangedDodge >= 0">

                        *{{ Math.max(1, Math.ceil((((1 - itemStore.equippedStats.resist) *
                        combatStore.activeObject.stats.rangedDamage)
                        - itemStore.equippedStats.physicalArmor) * 1.25)) }}

                      </span>
                      <!-- No Crit -->
                      <span v-else-if="combatStore.activeObject.stats.rangedDamage">

                        {{ Math.max(1, Math.ceil((1 - itemStore.equippedStats.resist) *
                        combatStore.activeObject.stats.rangedDamage)
                        - itemStore.equippedStats.physicalArmor) }}

                      </span>

                      <!-- Magic Max Hit, Calculated -->
                      <span
                        v-if="combatStore.activeObject.stats.magicDamage && combatStore.activeObject.stats.magicAccuracy - itemStore.equippedStats.magicDodge >= 0">

                        *{{ Math.max(1, Math.ceil((((1 - itemStore.equippedStats.resist) *
                        combatStore.activeObject.stats.magicDamage)
                        - itemStore.equippedStats.energyArmor) * 1.25)) }}

                      </span>
                      <!-- No Crit -->
                      <span v-else-if="combatStore.activeObject.stats.magicDamage">

                        {{ Math.max(1, Math.ceil((1 - itemStore.equippedStats.resist) *
                        combatStore.activeObject.stats.magicDamage)
                        - itemStore.equippedStats.energyArmor) }}

                      </span>
                    </span>
                    <span v-else>—</span>
                  </div>

                  <div class="d-flex justify-content-between">
                    <span>Accuracy: </span>
                    <span v-if="combatStore.activeObject.stats">

                      <span v-if="combatStore.activeObject.stats.meleeAccuracy">
                        {{ combatStore.activeObject.stats.meleeAccuracy }}
                      </span>

                      <span v-else-if="combatStore.activeObject.stats.rangedAccuracy">
                        {{ combatStore.activeObject.stats.rangedAccuracy }}
                      </span>

                      <span v-else-if="combatStore.activeObject.stats.magicAccuracy">
                        {{ combatStore.activeObject.stats.magicAccuracy }}
                      </span>
                    </span>
                    <span v-else>—</span>
                  </div>

                  <div class="d-flex justify-content-between">
                    <span>Penetration: </span>
                    <span v-if="combatStore.activeObject.stats">
                      {{ combatStore.activeObject.stats.meleePen * 100 }}%
                    </span>
                    <span v-else>—</span>
                  </div>

                  <div class="d-flex justify-content-between">
                    <span>Speed: </span>
                    <span v-if="combatStore.activeObject.stats">
                      {{ combatStore.activeObject.stats.speed.toFixed(2) }}s
                    </span>
                    <span v-else>—</span>
                  </div>
                </div>

                <div class="py-2">
                  <div class="d-flex justify-content-between">
                    <span>Slayer: </span>
                    <span class="tooltip-be3" v-if="combatStore.activeObject.stats">
                      <span v-if="combatStore.activeObject.stats.slayer[0] == 0">
                        🐌 Gooey

                        <div class="tooltip-text py-1 px-3">
                          <div class="d-flex justify-content-center little-levels ">
                            <span>
                              Slows attack speed
                            </span>
                          </div>
                        </div>

                      </span>
                      <span v-if="combatStore.activeObject.stats.slayer[0] == 1">
                        ☣️ Acidic

                        <div class="tooltip-text py-1 px-3">
                          <div class="d-flex justify-content-center little-levels ">
                            <span>
                              <span class="text-warning">Acid Chance</span>
                              <br>
                              Lose 1 HP per second for 8 seconds
                            </span>
                          </div>
                        </div>

                      </span>
                      <span v-if="combatStore.activeObject.stats.slayer[0] == 2">
                        ⚡ Electric

                        <div class="tooltip-text py-1 px-3">
                          <div class="d-flex justify-content-center little-levels ">
                            <span>
                              <span class="text-warning">Shock Chance</span>
                              <br>
                              Pauses attacks for 0.5 seconds
                            </span>
                          </div>
                        </div>

                      </span>

                      <span v-if="combatStore.activeObject.stats.slayer[0] == -1">—</span>
                    </span>
                    <span v-else>—</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>Intensity: </span>
                    <span v-if="combatStore.activeObject.stats">
                      <span v-if="combatStore.activeObject.stats.slayer[1] > 0">
                        {{ combatStore.activeObject.stats.slayer[1] * 100 }}%
                      </span>

                      <span v-else>—</span>
                    </span>
                    <span v-else>—</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>Resistance: </span>
                    <span v-if="combatStore.activeObject.stats">

                      <span v-if="combatStore.activeObject.stats.resist != 0">
                        {{ (100 * Math.max(0, combatStore.activeObject.stats.resist -
                        itemStore.equippedStats.meleePen)).toFixed() }}% /
                        {{ (100 * Math.max(0, combatStore.activeObject.stats.resist -
                        itemStore.equippedStats.rangedPen)).toFixed() }}% /
                        {{ (100 * Math.max(0, combatStore.activeObject.stats.resist -
                        itemStore.equippedStats.magicPen)).toFixed() }}%
                      </span>

                      <span v-else>—</span>
                    </span>
                    <span v-else>—</span>
                  </div>
                </div>

                <div class="py-2">
                  <div class="d-flex justify-content-between">
                    <span>Melee Dodge: </span>
                    <span v-if="combatStore.activeObject.stats">
                      {{ combatStore.activeObject.stats.meleeDodge }}
                    </span>
                    <span v-else>—</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>Range Dodge: </span>
                    <span v-if="combatStore.activeObject.stats">
                      {{ combatStore.activeObject.stats.rangedDodge }}
                    </span>
                    <span v-else>—</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>Magic Dodge: </span>
                    <span v-if="combatStore.activeObject.stats">
                      {{ combatStore.activeObject.stats.magicDodge }}
                    </span>
                    <span v-else>—</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<style scoped></style>
