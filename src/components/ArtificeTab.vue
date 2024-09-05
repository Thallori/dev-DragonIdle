<script>
import { useSkillStore } from '@/stores/skills'
import { useArtificeStore } from '@/stores/artifice'
import { useItemStore } from '@/stores/inventory'

import tooltips from './panels/tooltips.vue'

export default {
  name: 'ArtificeTab',
  components: {
    tooltips,
  },
  setup() {
    const skillStore = useSkillStore()
    const artificeStore = useArtificeStore()
    const itemStore = useItemStore()

    return { skillStore, artificeStore, itemStore }
  },
  data() {
    return {
      skillID: 18,
      shownActivity: {},
      shownCat: 'charge',
      showGuideModal: false,
    }
  },
  mounted() {
    this.shownActivity = this.artificeStore.activeObject
    if (this.artificeStore.activeObject.cat != undefined) {
      this.shownCat = this.artificeStore.activeObject.cat
    }
  },
  methods: {
    isNotValidActivity(activityObject) {
      // return false

      // if skill isn't up to snuff, is never valid
      if (activityObject.levelRequired > this.skillStore.skills[this.skillID].level) {
        return true
      }
      //if orb weapon, is never valid
      if (activityObject.mCat == 3) {
        return true
      }
      //is valid
      return false
    },
    shownActivityItem1() {
      let temp = this.itemStore.resourceItems.find(({ id }) => id === this.shownActivity.neededItem1[0])
      return temp.count
    },
    shownActivityItem2() {
      let temp = this.itemStore.resourceItems.find(({ id }) => id === this.shownActivity.neededItem2[0])
      return temp.count
    },
    shownActivityItem3() {
      let temp = this.itemStore.resourceItems.find(({ id }) => id === this.shownActivity.neededItem3[0])
      return temp.count
    },
    shownActivityMadeItemC() {
      let temp = this.itemStore.equipmentItems.find(({ id }) => id === this.shownActivity.itemID)
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
            Artificing Guide
          </div>

          <!-- Page 1 -->
          <div class="little-levels">
            at last, a use for scrying
            <br><br>

            <!-- locating/harvesting -->
            <span class="text-warning">Charges</span>
            <br>

            <span class="info-text">apells and magic things</span> mastery makes more spell charges per craft
            <br><br>
            mastery of other things give extra accuracy for equipment. the wings will also give extra accuracy, spooky.

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
                  <img src="/src/assets/icons/testIcon16.png" alt="" width="32" height="32">
                  <span> Quill</span>

                  <!-- Tooltip -->
                  <div class="tooltip-text py-1 px-4">
                    <div class="d-flex justify-content-between little-levels ">
                      <span>Setting Time:</span>
                      <span>1.00s</span>
                    </div>
                    <div class="d-flex justify-content-between little-levels ">
                      <span>Typing Time:</span>
                      <span>0%</span>
                    </div>
                  </div>

                </div>
              </span>
            </div>

            <!-- Efficency % -->
            <div class="tooltip-bl">
              {{ artificeStore.efficency }}%
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
            @click="shownCat = 'charge'">
            <div class="d-flex justify-content-start">
              <img src="/src/assets/icons/charge1.png">Charges
            </div>
          </div>

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 150px"
            @click="shownCat = 'wand'">
            <div class="d-flex justify-content-start">
              <img src="/src/assets/icons/testIcon16.png">Wands
            </div>
          </div>

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 150px"
            @click="shownCat = 'staff'">
            <div class="d-flex justify-content-start">
              <img src="/src/assets/icons/testIcon16.png">Staffs
            </div>
          </div>

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 150px"
            @click="shownCat = 'book'">
            <div class="d-flex justify-content-start">
              <img src="/src/assets/icons/testIcon16.png">Books
            </div>
          </div>

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 150px"
            @click="shownCat = 'orb'">
            <div class="d-flex justify-content-start">
              <img src="/src/assets/icons/testIcon16.png">Orbs
            </div>
          </div>

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 150px"
            @click="shownCat = 'wing'">
            <div class="d-flex justify-content-start">
              <img src="/src/assets/icons/testIcon16.png">Wings
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

                <div class="tooltip-text">
                  <tooltips :itemObject="itemStore.getItemData(shownActivity.itemID) " />
                </div>

                <img :src="itemStore.getItemImage(shownActivity.itemID, 'equipmentItems')" alt="" width="64"
                  height="64">
                <div style="height: 0.0rem">
                  <span class="position-relative little-levels badge bg-secondary"
                    style="translate: -30px -76px; padding: 0.25rem;">
                    {{ shownActivityMadeItemC() }}
                  </span>
                </div>

                <div style="height: 0.0rem; translate: 0px -24px;" v-if="shownActivity.amountGiven > 1">
                  <div class="badge smol-badge">
                    x{{ shownActivity.amountGiven + shownActivity.mLevel }}
                  </div>
                </div>

              </div>

              <!-- Image(s) of Required Items -->
              <div class="d-flex justify-content-center align-items-center gap-3 pb-3">

                <div v-if="shownActivity.neededItem1">
                  <img :src="itemStore.getItemImage(shownActivity.neededItem1[0], 'resourceItems')" alt="" width="48"
                    height="48">
                  <div style="height: 0.0rem">
                    <span class="position-relative little-levels badge bg-secondary"
                      style="translate: -20px -60px; padding: 0.25rem;">
                      {{ shownActivityItem1() }}
                    </span>
                  </div>

                  <div style="height: 0.0rem; translate: 0px -12px;" v-if="shownActivity.neededItem1[1] > 1">
                    <div class="badge smol-badge">
                      x{{ shownActivity.neededItem1[1] }}
                    </div>
                  </div>

                </div>

                <div v-if="shownActivity.neededItem2">
                  <img :src="itemStore.getItemImage(shownActivity.neededItem2[0], 'resourceItems')" alt="" width="48"
                    height="48">
                  <div style="height: 0.0rem">
                    <span class="position-relative little-levels badge bg-secondary"
                      style="translate: -20px -60px; padding: 0.25rem;">
                      {{ shownActivityItem2() }}
                    </span>
                  </div>

                  <div style="height: 0.0rem; translate: 0px -12px;" v-if="shownActivity.neededItem2[1] > 1">
                    <div class="badge smol-badge">
                      x{{ shownActivity.neededItem2[1] }}
                    </div>
                  </div>
                </div>

                <div v-if="shownActivity.neededItem3">
                  <img :src="itemStore.getItemImage(shownActivity.neededItem3[0], 'resourceItems')" alt="" width="48"
                    height="48">
                  <div style="height: 0.0rem">
                    <span class="position-relative little-levels badge bg-secondary"
                      style="translate: -20px -60px; padding: 0.25rem;">
                      {{ shownActivityItem3() }}
                    </span>
                  </div>

                  <div style="height: 0.0rem; translate: 0px -12px;" v-if="shownActivity.neededItem3[1] > 1">
                    <div class="badge smol-badge">
                      x{{ shownActivity.neededItem3[1] }}
                    </div>
                  </div>

                </div>
              </div>
              <div class="little-levels pb-2">Requires</div>
            </div>

            <!-- XP per Completion and Seconds per Complete -->
            <div class="little-levels">
              Typeset: {{ shownActivity.typingNeeded.toFixed(2) }}s / {{ shownActivity.settingNeeded }}
            </div>
            <div class="little-levels pb-1">
              {{ shownActivity.xpGain }} XP / {{ (shownActivity.typingNeeded + shownActivity.settingNeeded).toFixed(2)
              }}s
            </div>
            <!-- {{ (Math.ceil(shownActivity.cookTime * 20) / 20).toFixed(2) }}s -->

            <!-- Progress Bar for Activity Completion -->
            <div class="progress" role="progressbar" style="height: 12px;">
              <div class="progress-bar xp-progress" :style="`width: ${this.artificeStore.activePercent.a}%;`"
                v-if="this.artificeStore.activeObject.id == shownActivity.id">
              </div>
            </div>

            <!-- SET! -->
            <div class="pt-2">
              <button type="button" class="btn activity" style="width: 100%;"
                @click="artificeStore.setActiveAction(shownActivity)">
                Set
              </button>
            </div>
          </div>
        </div>

        <!-- Crafting Options -->
        <div class="d-flex crafting-activities align-content-start flex-wrap gap-1 pb-3">

          <!-- Mastery Card Wand -->
          <div class="card flex-grow-1 border-dark text-center card-list2" v-if="shownCat == 'wand'">
            <div class="card-body p-0">
              Wand Mastery
            </div>

            <div class="card-footer pt-0">
              <div class="d-flex justify-content-between little-levels">
                <div>LVL: {{ artificeStore.equipmentMastery[0].mLevel }}</div>
                <div>{{ artificeStore.equipmentMastery[0].mxp }}/{{ artificeStore.equipmentMastery[0].mxpNext }}</div>
              </div>

              <div class="progress" role="progressbar" style="height: 8px">
                <div class="progress-bar mastery-progress"
                  :style="`width: ${(artificeStore.equipmentMastery[0].mxp - artificeStore.equipmentMastery[0].mxpPrev) / (artificeStore.equipmentMastery[0].mxpNext - artificeStore.equipmentMastery[0].mxpPrev) * 100}%;`">
                </div>
              </div>
            </div>
          </div>

          <!-- Mastery Card Staff -->
          <div class="card flex-grow-1 border-dark text-center card-list2" v-if="shownCat == 'staff'">
            <div class="card-body p-0">
              Staff Mastery
            </div>

            <div class="card-footer pt-0">
              <div class="d-flex justify-content-between little-levels">
                <div>LVL: {{ artificeStore.equipmentMastery[1].mLevel }}</div>
                <div>{{ artificeStore.equipmentMastery[1].mxp }}/{{ artificeStore.equipmentMastery[1].mxpNext }}</div>
              </div>

              <div class="progress" role="progressbar" style="height: 8px">
                <div class="progress-bar mastery-progress"
                  :style="`width: ${(artificeStore.equipmentMastery[1].mxp - artificeStore.equipmentMastery[1].mxpPrev) / (artificeStore.equipmentMastery[1].mxpNext - artificeStore.equipmentMastery[1].mxpPrev) * 100}%;`">
                </div>
              </div>
            </div>
          </div>

          <!-- Mastery Card Book -->
          <div class="card flex-grow-1 border-dark text-center card-list2" v-if="shownCat == 'book'">
            <div class="card-body p-0">
              Book Mastery
            </div>

            <div class="card-footer pt-0">
              <div class="d-flex justify-content-between little-levels">
                <div>LVL: {{ artificeStore.equipmentMastery[2].mLevel }}</div>
                <div>{{ artificeStore.equipmentMastery[2].mxp }}/{{ artificeStore.equipmentMastery[2].mxpNext }}</div>
              </div>

              <div class="progress" role="progressbar" style="height: 8px">
                <div class="progress-bar mastery-progress"
                  :style="`width: ${(artificeStore.equipmentMastery[2].mxp - artificeStore.equipmentMastery[2].mxpPrev) / (artificeStore.equipmentMastery[2].mxpNext - artificeStore.equipmentMastery[2].mxpPrev) * 100}%;`">
                </div>
              </div>
            </div>
          </div>

          <!-- Mastery Card Orb -->
          <div class="card flex-grow-1 border-dark text-center card-list2" v-if="shownCat == 'orb'">
            <div class="card-body p-0">
              Orb Mastery
            </div>

            <div class="card-footer pt-0">
              <div class="d-flex justify-content-between little-levels">
                <div>LVL: {{ artificeStore.equipmentMastery[3].mLevel }}</div>
                <div>{{ artificeStore.equipmentMastery[3].mxp }}/{{ artificeStore.equipmentMastery[3].mxpNext }}</div>
              </div>

              <div class="progress" role="progressbar" style="height: 8px">
                <div class="progress-bar mastery-progress"
                  :style="`width: ${(artificeStore.equipmentMastery[3].mxp - artificeStore.equipmentMastery[3].mxpPrev) / (artificeStore.equipmentMastery[3].mxpNext - artificeStore.equipmentMastery[3].mxpPrev) * 100}%;`">
                </div>
              </div>
            </div>
          </div>

          <!-- Mastery Card Wing -->
          <div class="card flex-grow-1 border-dark text-center card-list2" v-if="shownCat == 'wing'">
            <div class="card-body p-0">
              Wingwards Mastery
            </div>

            <div class="card-footer pt-0">
              <div class="d-flex justify-content-between little-levels">
                <div>LVL: {{ artificeStore.equipmentMastery[4].mLevel }}</div>
                <div>{{ artificeStore.equipmentMastery[4].mxp }}/{{ artificeStore.equipmentMastery[4].mxpNext }}</div>
              </div>

              <div class="progress" role="progressbar" style="height: 8px">
                <div class="progress-bar mastery-progress"
                  :style="`width: ${(artificeStore.equipmentMastery[4].mxp - artificeStore.equipmentMastery[4].mxpPrev) / (artificeStore.equipmentMastery[4].mxpNext - artificeStore.equipmentMastery[4].mxpPrev) * 100}%;`">
                </div>
              </div>
            </div>
          </div>

          <!-- Activity Cards -->
          <div class="card flex-grow-1 border-dark text-center"
            :class="(shownCat != 'charge') ? 'card-list2' : 'card-list'"
            v-for="(activity) in artificeStore.activities.filter(temp => temp.cat === this.shownCat)">

            <!-- Not Enough Levels or Area Access for Activity -->
            <div class="card-body pb-0" :class="(shownCat != 'charge') ? '' : 'pt-2'"
              v-if="isNotValidActivity(activity)">
              <div class="d-flex justify-content-around align-items-center tooltip-be3">

                <!-- Orb Weapon Tooltip -->
                <div class="tooltip-text bg-secondary py-2 w-100"
                  v-if="activity.mCat == 3 && activity.levelRequired <= skillStore.skills[this.skillID].level">
                  Recipe Located in Sequence 8
                </div>

                <!-- Title of Activity -->
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
            <div class="card-body card-activity pb-0" :class="(shownCat != 'charge') ? '' : 'pt-2'" v-else>
              <div class="d-flex justify-content-around align-items-center">

                <!-- Title of Activity -->
                <div class="d-flex align-items-center flex-grow-1">
                  <img :src="itemStore.getItemImage(activity.itemID, 'equipmentItems')" alt="" width="32" height="32">
                  <h5 class="mt-1 px-2">{{ activity.name }}</h5>
                </div>

                <span class="little-levels flex-shrink-1">
                  {{ activity.xpGain }} XP
                </span>
              </div>

              <div class="stretched-link" @click="shownActivity = activity">
              </div>
            </div>

            <!-- Mastery Level and XP Footer -->
            <div class="card-footer pt-0" v-if="shownCat == 'charge'">

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
    </div>
  </div>
</template>