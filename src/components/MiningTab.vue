<script>
import { useSkillStore } from '@/stores/skills';
import { useExplorationStore } from '@/stores/exploration';
import { useMiningStore } from '@/stores/mining';
import { useItemStore } from '@/stores/inventory';
import areaRequirements from '@/data/areaRequirements';

export default {
  name: 'MiningTab',
  setup() {
    const skillStore = useSkillStore()
    const explorationStore = useExplorationStore()
    const miningStore = useMiningStore()
    const itemStore = useItemStore()
    const areaData = { ...areaRequirements }

    return { skillStore, explorationStore, miningStore, itemStore, areaData }
  },
  data() {
    return {
      skillID: 15,
      itemIndexStart: 17, //itemStore.resourceItems.findIndex(t => t.id === this.miningStore[0].resourceID) //this code will get the start index of itemIDs, but I don't know how to run it after everything is loaded. Also, it hardcodes all activity items which could limit further development.
      showGuideModal: false,
    }
  },
  methods: {
    isNotValidArea(activityObject, activityIndex) {
      // return false

      // if skill isn't up to snuff, is never valid
      if (activityObject.levelRequired > this.skillStore.skills[this.skillID].level) {
        return true
      }

      //check each activity's relevant areas, if any are valid, return valid
      for (let loopCheckAreaIndex in this.areaData.miningArea) {
        if (this.areaData.miningArea[loopCheckAreaIndex].requiresMastery[activityIndex] <= this.explorationStore.activities[loopCheckAreaIndex].mLevel && this.explorationStore.activities[loopCheckAreaIndex].isSealed == false) {
          return false
        }
      }

      //did not find any valid areas
      return true
    },
    isSealed(activityIndex) {
      //check each activity's relevant areas, if any are valid, return valid
      for (let loopCheckAreaIndex in this.areaData.miningArea) {
        if (this.areaData.miningArea[loopCheckAreaIndex].requiresMastery[activityIndex] > this.explorationStore.activities[loopCheckAreaIndex].mLevel && this.explorationStore.activities[loopCheckAreaIndex].isSealed == false) {
          return false
        }
      }

      //did not find any valid areas
      return true
    },
  }
}
</script>

<template>
  <div class="card py-4 align-items-center main-window bg-transparent" style="width: 77rem">

    <!-- Guide Modal -->
    <div class="modal show-modal" v-if="showGuideModal == true">
      <div class="modal-backing" @click="showGuideModal = false"></div>

      <!-- Guide Content -->
      <div class="modal-content py-4 px-2" style="width: 23rem;">

        <div class="text-center pb-2">
          <div class="pb-1">
            Mining Guide
          </div>

          <!-- Page 1 -->
          <div class="little-levels">
            Certain walls gleam with hidden treasure.
            <br><br>

            <span class="text-warning">Rocks</span>
            <br>
            Stones have <span class="info-text">hitpoints</span> (how much damage needs to be done to break one open)
            and <span class="info-text">hardness</span> (how much less damage a <span class="info-text">pickaxe</span>
            of weaker hardness does). Don't worry about hitting too hard, <span class="info-text">excess damage
              overflows</span> to the next rock.
            <br><br>
            If a swing would <span class="info-text">not damage</span> a rock, it will be marked by an ❌ and still have
            a 50% chance of doing 1 point of damage anyway.
            <br><br>
            Each <span class="info-text">mastery level</span> increases the chance of a <span class="info-text">critical
              swing</span> by 3%, hitting for +3 damage.
            <br><br>

            <span class="text-warning">Treasure</span>
            <br>
            Mining will generally reward <span class="info-text">ore (used for smithing metals and equipment)</span> or
            other minerals which will have their own uses. Rarely, a <span class="info-text">gem</span> one set higher
            than usual can be found.

          </div>
        </div>

      </div>
    </div>

    <!-- Top Info -->
    <div class="px-5 pb-3 w-100" style="max-width: 64rem;">

      <!-- Leveling and Boost Info -->
      <div class="d-flex justify-content-center gap-1 pb-1">

        <!-- Skill Icon and Help Button -->
        <div class="card card-activity align-items-center py-2" style="width: 67px; height: 67px;">
          <img src="/src/assets/12x/questionmark.png" alt="" width="48" height="48">
          <div class="stretched-link" @click="showGuideModal = true"></div>
        </div>

        <!-- Level and XP Card -->
        <div class="card flex-grow-1 px-0">

          <div class="d-flex justify-content-between py-1 px-2">

            <!-- Level -->
            <div class="px-2">
              LEVEL <span class="badge bg-secondary">{{ skillStore.skills[this.skillID].level }}</span>
            </div>

            <!-- XP -->
            <div class="px-2">
              <span class="badge bg-secondary">{{ skillStore.skills[this.skillID].xp }} / {{
                skillStore.skills[this.skillID].xpNext }}</span> XP
            </div>
          </div>

          <!-- XP to Next Level -->
          <div class="card-footer">
            <div class="progress" role="progressbar" style="height: 12px;">
              <div class="progress-bar xp-progress"
                :style="`width: ${(skillStore.skills[this.skillID].xp - skillStore.skills[this.skillID].xpPrev) / (skillStore.skills[this.skillID].xpNext - skillStore.skills[this.skillID].xpPrev) * 100}%;`">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bonuses and Boosts -->
      <div class="d-flex justify-content-center gap-1 pb-1">

        <!-- Tools and Bonuses -->
        <div class="card flex-grow-1 px-0">
          <div class="d-flex justify-content-between py-2 px-2">

            <!-- Tool -->
            <div class="px-2">
              <span>
                <div class="tooltip-b">
                  <img :src="itemStore.equippedTools.miningTool.image" alt="" width="32" height="32">
                  {{ itemStore.equippedTools.miningTool.name }}

                  <!-- Tooltip -->
                  <div class="tooltip-text py-1 px-3">
                    <div class="d-flex justify-content-between little-levels"
                      v-if="undefined != itemStore.equippedTools.miningTool.toolStats.bonusMiningSpeed">
                      <span>Mining Time: </span>
                      <span>
                        {{ (2 - itemStore.equippedTools.miningTool.toolStats.bonusMiningSpeed).toFixed(2) }}s
                      </span>
                    </div>
                    <div class="d-flex justify-content-between little-levels">
                      <span>Hit: </span>
                      <span>{{ itemStore.equippedTools.miningTool.toolStats.bonusDamage }}</span>
                    </div>
                    <div class="d-flex justify-content-between little-levels">
                      <span>Hardness: </span>
                      <span>{{ itemStore.equippedTools.miningTool.toolStats.bonusPen }}</span>
                    </div>
                  </div>
                </div>
              </span>
            </div>

            <!-- Efficency % -->
            <div class="tooltip-bl">
              {{ miningStore.efficency }}%
              <img src="/src/assets/12x/eff.png" alt="" width="24" height="24">
              <div class="tooltip-text py-1 px-2">
                <div class="little-levels">
                  Chance of additional instant actions, without using extra resources.
                  <br><br>
                  Typically gained from skill levels and area unlocks.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Boost -->
        <div class="card align-items-center" style="width: 50px; height: 50px;">
          <!-- <img src="/src/assets/icons/testIcon32.png" alt="" width="64" height="64"> -->
        </div>
      </div>
    </div>

    <!-- All Activities -->
    <div class="d-flex align-self-center flex-wrap gap-1" style="max-width: 61rem">
      <div class="card border-dark text-center px-0" style="width: 12rem; height: 14rem;"
        v-for="(activity, index) in miningStore.activities">

        <!-- Not Enough Levels or Area Access for Activity -->
        <div class="card-body pt-2" v-if="isNotValidArea(activity, index)">
          <h4 class="mb-0">{{ activity.name }}</h4>

          <!-- Level Not Met -->
          <div class="badge bg-secondary" v-if="activity.levelRequired > skillStore.skills[this.skillID].level">LEVEL {{
            activity.levelRequired }}</div>

          <!-- Area Frozen -->
          <div class="badge bg-secondary" v-else-if="isSealed(index) ">
            SEALED
          </div>

          <!-- Area Mastery not Met -->
          <div class="badge bg-secondary" v-else>
            EXPLORE AREA
          </div>

          <!-- Area Requirements -->
          <div class="pt-1"></div>
          <div class="little-levels pt-0" v-for="(area, areaIndex) in areaData.miningArea">

            <!-- Area Exists -->
            <div v-if="area.requiresMastery[index]">
              <span>{{ explorationStore.activities[areaIndex].name }}: </span>

              <!-- Area Mastery Met or Not -->
              <span v-if="area.requiresMastery[index] > (explorationStore.activities[areaIndex].mLevel)">
                {{ area.requiresMastery[index] }}
              </span>
              <span v-else>✔</span>
            </div>
          </div>
        </div>

        <!-- Can Do Activity -->
        <div class="card-body card-activity pt-2 pb-0" v-else>

          <!-- Title of Activity -->
          <h4 class="card-title">{{ activity.name }}</h4>
          <div class="pb-1">

            <!-- Image of Activity -->
            <div>
              <img :src="itemStore.resourceItems[index + itemIndexStart].image" alt="" width="64" height="64">
              <div style="height: 0.0rem">
                <span class="position-relative little-levels badge bg-secondary"
                  style="translate: -30px -76px; padding: 0.25rem;">
                  {{ itemStore.resourceItems[index + itemIndexStart].count.toLocaleString() }}
                </span>
              </div>
            </div>
          </div>

          <div class="little-levels">

            <div>Hardness: {{ activity.rockArmor }}<span
                v-if="(itemStore.equippedTools.miningTool.toolStats.bonusPen + itemStore.equippedTools.miningTool.toolStats.bonusDamage - activity.rockArmor) > 0 && (itemStore.equippedTools.miningTool.toolStats.bonusPen - activity.rockArmor) < 0 && itemStore.equippedTools.miningTool.toolStats.bonusPen != 0">({{
                Math.max(0, (activity.rockArmor - itemStore.equippedTools.miningTool.toolStats.bonusPen))
                }})</span><span
                v-if="(itemStore.equippedTools.miningTool.toolStats.bonusPen + itemStore.equippedTools.miningTool.toolStats.bonusDamage - activity.rockArmor) <= 0">❌</span>
            </div>

            <div class="pb-1">{{ activity.xpGain }} XP / {{ activity.rockHP }} HP</div>

            <div class="progress" role="progressbar" style="height: 12px;">
              <div class="progress-bar xp-progress" :style="`width: ${this.miningStore.activePercent.a}%;`"
                v-if="activity.id == miningStore.activeObject.id">
              </div>
            </div>
          </div>

          <div class="stretched-link" @click="miningStore.setActiveAction(activity)"></div>
        </div>

        <!-- Mastery Level and XP Footer -->
        <div class="card-footer pt-0">
          <div class="d-flex justify-content-between little-levels">
            <div>LVL: {{ activity.mLevel }}</div>
            <div>{{ activity.mxp }}/{{ activity.mxpNext }}</div>
          </div>
          <div class="progress" role="progressbar" style="height: 8px">
            <div class="progress-bar mastery-progress"
              :style="`width: ${(activity.mxp - activity.mxpPrev) / (activity.mxpNext - activity.mxpPrev) * 100}%;`">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>