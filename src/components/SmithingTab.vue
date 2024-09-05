<script>
import { useSkillStore } from '@/stores/skills';
import { useSmithingStore } from '@/stores/smithing';
import { useItemStore } from '@/stores/inventory';

import tooltips from './panels/tooltips.vue';

export default {
  name: 'SmithingTab',
  components: {
    tooltips,
  },
  setup() {
    const skillStore = useSkillStore()
    const smithingStore = useSmithingStore()
    const itemStore = useItemStore()

    return { skillStore, smithingStore, itemStore }
  },
  data() {
    return {
      skillID: 16,
      itemIndexStart: 0, //itemStore.resourceItems.findIndex(t => t.id === this.smithingStore[0].resourceID) //this code will get the start index of itemIDs, but I don't know how to run it after everything is loaded. Also, it hardcodes all activity items which could limit further development.
      shownActivity: {},
      shownCat: 'bar',
      showGuideModal: false,
    }
  },
  mounted() {
    this.shownActivity = this.smithingStore.activeObject
    if (this.smithingStore.activeObject.cat != undefined) {
      this.shownCat = this.smithingStore.activeObject.cat
    }
  },
  methods: {
    isNotValidActivity(activityObject) {
      // return false

      //if skill isn't up to snuff, is never valid
      if (activityObject.levelRequired > this.skillStore.skills[this.skillID].level) {
        return true
      }
      //if heavy weapon, is never valid
      if (activityObject.mCat == 6) {
        return true
      }
      //is valid
      return false
    },
    shownActivityItems1() {
      let temp
      temp = this.itemStore.resourceItems.find(({ id }) => id === this.shownActivity.neededItem1[0])
      return temp.count
    },
    shownActivityItems2() {
      let temp
      temp = this.itemStore.resourceItems.find(({ id }) => id === this.shownActivity.neededItem2[0])
      return temp.count
    },
    shownActivityItems3() {
      let temp
      temp = this.itemStore.resourceItems.find(({ id }) => id === this.shownActivity.neededItem3[0])
      return temp.count
    },
    shownActivityMadeItemR() {
      let temp
      temp = this.itemStore.resourceItems.find(({ id }) => id === this.shownActivity.itemID)
      return temp.count
    },
    shownActivityMadeItemE() {
      let temp
      temp = this.itemStore.equipmentItems.find(({ id }) => id === this.shownActivity.itemID)
      return temp.count
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
            Smithing Guide
          </div>

          <!-- Page 1 -->
          <div class="little-levels">
            Metals may not be alive, but they will certainly outlive everything else.
            <br><br>

            <!-- locating/harvesting -->
            <span class="text-warning">Forge</span>
            <br>
            The art of refining <span class="info-text">ore</span> begins with the excessive application of <span
              class="info-text">heat</span>. Melting stone into <span class="info-text">ingots</span> takes time. <span
              class="info-text">Working</span> those ingots into shape takes considerably more time.
            <br><br>
            Each ingot <span class="info-text">mastery level</span> increases its <span class="info-text">heat
              rate</span>
            by 0.1 (from a base rate of 2 per second).
            <br><br>

            <span class="text-warning">Equipment</span>
            <br>
            To work an ingot, hit it with a <span class="info-text">hammer</span> when it's glowing hot. The amount of
            <span class="info-text">heat</span> required is always equal to its <span class="info-text">work</span>.
            <br><br>
            Equipment <span class="info-text">mastery levels</span> increase a <span class="info-text">weapon's
              accuracy</span> by 1, and an <span class="info-text">armor's melee/ranged dodge</span> stats by 0.25 per
            level.

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
                  <img src="/src/assets/icons/defaulthammer16.png" alt="" width="32" height="32">
                  <span> Hammer</span>

                  <!-- Tooltip -->
                  <div class="tooltip-text py-1 px-4">
                    <!-- <div class="d-flex justify-content-between little-levels">
                      <span>Striking:</span>
                      <span>0.20s</span>
                    </div> -->
                    <div class="d-flex justify-content-between little-levels">
                      <span>Work Time:</span>
                      <span>2.00s</span>
                    </div>
                    <div class="d-flex justify-content-between little-levels">
                      <span>Work:</span>
                      <span>1</span>
                    </div>
                  </div>

                </div>
              </span>
            </div>

            <!-- Efficency % -->
            <div class="tooltip-bl">
              {{ smithingStore.efficency }}%
              <img src="/src/assets/12x/eff.png" alt="" width="24" height="24">
              <div class="tooltip-text py-1 px-2">
                <div class="little-levels">
                  Chance of additional instant actions, without using extra resources.
                  <br><br>
                  Typically gained from skill levels.
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
    <div style="max-width: 64rem">
      <!-- Activity Set Selector -->
      <div class="card py-1 px-1">
        <div class="d-flex flex-wrap justify-content-center gap-1">

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 150px"
            @click="shownCat = 'bar'">
            <div class="d-flex justify-content-start">
              <img src="/src/assets/icons/tempkiln16.png">Ingots
            </div>
          </div>

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 150px"
            @click="shownCat = 'copper'">
            <div class="d-flex justify-content-start">
              <img src="/src/assets/icons/copperingot16.png">Copper
            </div>
          </div>

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 150px"
            @click="shownCat = 'bronze'">
            <div class=" d-flex justify-content-start">
              <img src="/src/assets/icons/bronzeingot16.png">Bronze
            </div>
          </div>

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 150px"
            @click="shownCat = 'iron'">
            <div class="d-flex justify-content-start">
              <img src="/src/assets/icons/ironingot16.png">Iron
            </div>
          </div>

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 150px"
            @click="shownCat = 'steel'">
            <div class="d-flex justify-content-start">
              <img src="/src/assets/icons/steelingot16.png">Steel
            </div>
          </div>
        </div>
      </div>

      <!-- Subset Activities -->
      <div class="d-flex gap-1 flex-wrap justify-content-center pt-1">

        <!-- Crafting Card -->
        <div class="card text-center" style="width: 17rem; height: 22rem;">
          <div class="card-body pt-2" v-if="shownActivity.name">

            <!-- Title of Activity -->
            <h4 class="card-title pt-1">
              {{ shownActivity.name }}
            </h4>
            <div class="pb-1">

              <!-- Image of Activity -->
              <div class="pt-1 pb-3 tooltip-be2">

                <div class="tooltip-text" v-if="shownActivity.mCat != undefined">
                  <tooltips :itemObject="itemStore.getItemData(shownActivity.itemID)" />
                </div>

                <img :src="itemStore.getItemImage(shownActivity.itemID, 'resourceItems')" alt="" width="64" height="64"
                  v-if="shownActivity.cat == 'bar'">
                <img :src="itemStore.getItemImage(shownActivity.itemID, 'equipmentItems')" alt="" width="64" height="64"
                  v-else>


                <div style="height: 0.0rem">
                  <span class="position-relative little-levels badge bg-secondary"
                    style="translate: -30px -76px; padding: 0.25rem;" v-if="shownActivity.cat == 'bar'">
                    {{ shownActivityMadeItemR() }}
                  </span>
                  <span class="position-relative little-levels badge bg-secondary"
                    style="translate: -30px -76px; padding: 0.25rem;" v-else>
                    {{ shownActivityMadeItemE() }}
                  </span>
                </div>
              </div>

              <!-- Image(s) of Required Items -->
              <div class="d-flex justify-content-center align-items-center gap-3 pb-3">

                <div v-if="shownActivity.neededItem1">
                  <img :src="itemStore.getItemImage(shownActivity.neededItem1[0], 'resourceItems') " alt="" width="48"
                    height="48">

                  <div style="height: 0.0rem">
                    <span class="position-relative little-levels badge bg-secondary"
                      style="translate: -20px -60px; padding: 0.25rem;">
                      {{ shownActivityItems1() }}
                    </span>
                  </div>

                  <div style="height: 0.0rem; translate: 0px -12px;" v-if="shownActivity.neededItem1[1] > 1">
                    <div class="badge smol-badge">
                      x{{ shownActivity.neededItem1[1] }}
                    </div>
                  </div>

                </div>

                <div v-if="shownActivity.neededItem2">
                  <img :src="itemStore.getItemImage(shownActivity.neededItem2[0], 'resourceItems') " alt="" width="48"
                    height="48">
                  <div style="height: 0.0rem">
                    <span class="position-relative little-levels badge bg-secondary"
                      style="translate: -20px -60px; padding: 0.25rem;">
                      {{ shownActivityItems2() }}
                    </span>
                  </div>

                  <div style="height: 0.0rem; translate: 0px -12px;" v-if="shownActivity.neededItem2[1] > 1">
                    <div class="badge smol-badge">
                      x{{ shownActivity.neededItem2[1] }}
                    </div>
                  </div>

                </div>

                <div v-if="shownActivity.neededItem3">
                  <img :src="itemStore.getItemImage(shownActivity.neededItem3[0], 'resourceItems') " alt="" width="48"
                    height="48">
                  <div style="height: 0.0rem">
                    <span class="position-relative little-levels badge bg-secondary"
                      style="translate: -20px -60px; padding: 0.25rem;">
                      x{{ shownActivityItems3() }}
                    </span>
                  </div>

                  <div style="height: 0.0rem; translate: 0px -12px;" v-if="shownActivity.neededItem3[1] > 1">
                    <div class="badge smol-badge">
                      {{ shownActivity.neededItem3[1] }}
                    </div>
                  </div>

                </div>
              </div>

              <div class="little-levels pb-2">Requires</div>

            </div>

            <!-- Derived Time to Complete -->
            <div class="little-levels" v-if="shownActivity.cat == 'bar'">
              Time: {{ (Math.ceil((shownActivity.heatNeeded / (this.smithingStore.heatFromUpgrades + (0.1 *
              shownActivity.mLevel))) * 20) / 20).toFixed(2) }} Seconds
            </div>

            <div class="little-levels" v-else>
              Time: {{ (((shownActivity.heatNeeded / this.smithingStore.workFromTools) *
              (this.smithingStore.workInterval / 1000)) + (shownActivity.heatNeeded /
              this.smithingStore.heatFromUpgrades)).toFixed(2) }} Seconds
            </div>

            <!-- XP and Heat/Work Needed -->
            <div class="little-levels pb-1" v-if="shownActivity.cat == 'bar'">
              Forge: {{ shownActivity.xpGain }} XP / {{ shownActivity.heatNeeded }}
              Heat
            </div>
            <div class="little-levels pb-1" v-else>
              Forge: {{ shownActivity.xpGain }} XP / {{ shownActivity.heatNeeded }} Work
            </div>

            <!-- Progress Bar for Activity Completion -->
            <div class="progress" role="progressbar" style="height: 12px;">
              <div class="progress-bar xp-progress" :style="`width: ${this.smithingStore.activePercent.a}%;`"
                v-if="this.smithingStore.activeObject.id == shownActivity.id">
              </div>
            </div>

            <!-- SMITH! -->
            <div class="pt-2">
              <button type="button" class="btn activity" style="width: 100%;"
                @click="smithingStore.setActiveAction(shownActivity)">
                Smith
              </button>
            </div>
          </div>

        </div>

        <!-- Crafting Options -->
        <div class="d-flex crafting-activities align-content-start flex-wrap gap-1 pb-3">

          <div class="card card-list flex-grow-1 border-dark text-center"
            v-for="(activity, index) in smithingStore.activities.filter(temp => temp.cat === this.shownCat)">

            <!-- Not Enough Levels or Area Access for Activity -->
            <div class="card-body pt-2 pb-0 tooltip-be3" v-if="isNotValidActivity(activity)">

              <!-- Heavy Weapon Tooltip -->
              <div class="tooltip-text bg-secondary py-2 w-100"
                v-if="activity.mCat == 6 && activity.levelRequired <= skillStore.skills[this.skillID].level">
                Recipe Located in Sequence 8
              </div>

              <div class="d-flex justify-content-around align-items-center">

                <div class="d-flex flex-grow-1">
                  <h5 class="mt-1 px-2">{{ activity.name }}</h5>
                </div>

                <!-- Level Not Met -->
                <span class="badge bg-secondary" v-if="activity.levelRequired > skillStore.skills[this.skillID].level">
                  LEVEL {{ activity.levelRequired }}
                </span>
              </div>
            </div>

            <!-- Can Do Activity -->
            <div class="card-body card-activity pt-2 pb-0" v-else>

              <!-- Title of Activity -->
              <div class="d-flex justify-content-around align-items-center">

                <div class="d-flex align-items-center flex-grow-1">

                  <img :src="itemStore.getItemImage(activity.itemID, 'resourceItems')" alt="" width="32" height="32"
                    v-if="activity.cat == 'bar'">
                  <img :src="itemStore.getItemImage(activity.itemID, 'equipmentItems') " alt="" width="32" height="32"
                    v-else>

                  <h5 class="mt-1 px-2">{{ activity.name }}</h5>
                </div>

                <span class="little-levels flex-shrink-1">
                  {{ activity.xpGain }} XP
                </span>
              </div>

              <div class="stretched-link" @click="shownActivity = activity">
              </div>
            </div>

            <!-- Mastery Level and XP Footer for Bars-->
            <div class="card-footer pt-0" v-if="shownCat == 'bar'">

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

            <!-- Mastery Level and XP Footer for General Equipment -->
            <div class="card-footer pt-0" v-else>

              <div class="d-flex justify-content-between little-levels">
                <div>LVL: {{ smithingStore.equipmentMastery[activity.mCat].mLevel }}</div>

                <div>
                  {{ smithingStore.equipmentMastery[activity.mCat].mxp }}/{{
                  smithingStore.equipmentMastery[activity.mCat].mxpNext }}
                </div>
              </div>

              <div class="progress" role="progressbar" style="height: 8px">
                <div class="progress-bar mastery-progress"
                  :style="`width: ${(smithingStore.equipmentMastery[activity.mCat].mxp - smithingStore.equipmentMastery[activity.mCat].mxpPrev) / (smithingStore.equipmentMastery[activity.mCat].mxpNext - smithingStore.equipmentMastery[activity.mCat].mxpPrev) * 100}%;`">
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>