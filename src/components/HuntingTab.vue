<script>
import { useSkillStore } from '@/stores/skills';
import { useExplorationStore } from '@/stores/exploration';
import { useHuntingStore } from '@/stores/hunting';
import { useItemStore } from '@/stores/inventory';
import areaRequirements from '@/data/areaRequirements';

export default {
  name: 'HuntingTab',
  setup() {
    const skillStore = useSkillStore()
    const explorationStore = useExplorationStore()
    const huntingStore = useHuntingStore()
    const itemStore = useItemStore()
    const areaData = { ...areaRequirements }

    return { skillStore, explorationStore, huntingStore, itemStore, areaData }
  },
  data() {
    return {
      skillID: 14,
      itemIndexStart: 0, //itemStore.resourceItems.findIndex(t => t.id === this.huntingStore[0].resourceID) //this code will get the start index of itemIDs, but I don't know how to run it after everything is loaded. Also, it hardcodes all activity items which could limit further development.
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
      for (let loopCheckAreaIndex in this.areaData.huntingArea) {
        if (this.areaData.huntingArea[loopCheckAreaIndex].requiresMastery[activityIndex] <= this.explorationStore.activities[loopCheckAreaIndex].mLevel && this.explorationStore.activities[loopCheckAreaIndex].isSealed == false) {
          return false
        }
      }

      //did not find any valid areas
      return true
    },
    isSealed(activityIndex) {
      //check each activity's relevant areas, if any are valid, return valid
      for (let loopCheckAreaIndex in this.areaData.huntingArea) {
        if (this.areaData.huntingArea[loopCheckAreaIndex].requiresMastery[activityIndex] > this.explorationStore.activities[loopCheckAreaIndex].mLevel && this.explorationStore.activities[loopCheckAreaIndex].isSealed == false) {
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
            Hunting Guide
          </div>

          <!-- Page 1 -->
          <div class="little-levels">
            For animals are quite tasty and most are made of meat.
            <br><br>

            <span class="text-warning">Prey</span>
            <br>
            First, a target must be stalked until they're at their most vulnerable. That is the moment to strike. A
            perfect hit will be <span class="info-text">fatal</span>, otherwise it will take time for them to <span
              class="info-text">bleed out</span>.
            <br><br>
            Each <span class="info-text">mastery level</span> increases the chance of a fatal strike by 2%.
            <br><br>

            <span class="text-warning">Strippings</span>
            <br>
            A successful hunt will always reward <span class="info-text">food (used for healing or cooking)</span> and
            usually some manner of <span class="info-text">skin or shell (used for tailoring armor)</span>.
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
                  <img :src="itemStore.equippedTools.huntingTool.image" alt="" width="32" height="32">
                  {{ itemStore.equippedTools.huntingTool.name }}

                  <!-- Tooltip -->
                  <div class="tooltip-text py-1 px-3">
                    <div class="d-flex justify-content-between little-levels ">
                      <span>Bleed: </span>
                      <span>
                        {{ itemStore.equippedTools.huntingTool.toolStats.bleeding }} HP/s
                      </span>
                    </div>
                    <div class="d-flex justify-content-between little-levels ">
                      <span>Fatal Strike: </span>
                      <span>
                        {{ (itemStore.equippedTools.huntingTool.toolStats.instaKill * 100) }}%
                      </span>
                    </div>
                  </div>

                </div>
              </span>
            </div>

            <!-- Efficency % -->
            <div class="tooltip-bl">
              {{ huntingStore.efficency }}%
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
    <div class="d-flex flex-wrap gap-1" style="max-width: 61rem">
      <div class="card border-dark text-center px-0" style="width: 12rem; height: 14rem;"
        v-for="(activity, index) in huntingStore.activities">

        <!-- Not Enough Levels or Area Access for Activity -->
        <div class="card-body pt-2" v-if="isNotValidArea(activity, index)">
          <h4 class="mb-0">{{ activity.name }}</h4>

          <!-- Level Not Met -->
          <div class="badge bg-secondary" v-if="activity.levelRequired > skillStore.skills[this.skillID].level">LEVEL
            {{
            activity.levelRequired }}</div>

          <!-- Area Frozen -->
          <div class="badge bg-secondary" v-else-if="isSealed(index)">
            SEALED
          </div>

          <!-- Area Mastery not Met -->
          <div class="badge bg-secondary" v-else>
            EXPLORE AREA
          </div>

          <!-- Area Requirements -->
          <div class="pt-1"></div>
          <div class="little-levels pt-0" v-for="(area, areaIndex) in areaData.huntingArea">

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
              <img :src="activity.image" alt="" width="64" height="64">
            </div>
          </div>

          <!-- XP per Completion and Seconds per Complete -->
          <div class="little-levels pb-0">
            <div>
              Stalking: {{ activity.xpGain }} XP / {{ activity.stalking }}s
            </div>
            <div class="pb-1">
              Strike: {{ activity.hp }} HP / {{ ((itemStore.equippedTools.huntingTool.toolStats.instaKill +
              (activity.mLevel * 0.02)) * 100).toFixed() }}%
            </div>

            <!-- Progress Bar for Activity Completion -->
            <div class="progress" role="progressbar" style="height: 12px;">
              <div class="progress-bar xp-progress"
                :style="`width: ${huntingStore.activePercent.a}%; background-color: ${huntingStore.activePercent.c};`"
                v-if="activity.id == huntingStore.activeObject.id">
              </div>
            </div>
          </div>

          <div class="stretched-link tooltip-be3" @click="huntingStore.setActiveAction(activity)">

            <!-- Tooltip of Items Given -->
            <div class="tooltip-text">
              <div class="card-header py-1">Field Dressings</div>
              <div class="py-1 px-3 little-levels">

                <div class="d-flex justify-content-between dark-text tiny-levels"
                  v-if="activity.itemMeatID != undefined">
                  <span>
                    Strippings
                  </span>
                  <span>
                    up to
                  </span>
                </div>

                <div class="d-flex justify-content-between" v-if="activity.itemMeatID != undefined">
                  <span>
                    {{ itemStore.getItemData(activity.itemMeatID).name }}
                  </span>
                  <span>
                    x{{ activity.itemMeatRange[1] }}
                  </span>
                </div>

                <div class="d-flex justify-content-between" v-if="activity.itemHideID != undefined">
                  <span>
                    {{ itemStore.getItemData(activity.itemHideID).name }}
                  </span>
                  <span>
                    x{{ activity.itemHideRange[1] }}
                  </span>
                </div>

                <div class="d-flex justify-content-between" v-if="activity.itemExtraID != undefined">
                  <span>
                    {{ itemStore.getItemData(activity.itemExtraID).name }}
                  </span>
                  <span>
                    x{{ activity.itemExtraRange[1] }}
                  </span>
                </div>

                <div class="d-flex justify-content-between" v-if="activity.itemBonesID != undefined">
                  <span>
                    {{ itemStore.getItemData(activity.itemBonesID).name }}
                  </span>
                  <span>
                    x1
                  </span>
                </div>

              </div>

            </div>
          </div>
        </div>

        <!-- Mastery Level and XP Footer -->
        <div class=" card-footer pt-0">
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