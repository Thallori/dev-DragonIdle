<script>
import { useSkillStore } from '@/stores/skills';
import { useTailoringStore } from '@/stores/tailoring';
import { useMechanicsStore } from '@/stores/mechanics'
import { useItemStore } from '@/stores/inventory';

import tooltips from './panels/tooltips.vue';

export default {
  name: 'TailoringTab',
  components: {
    tooltips,
  },
  setup() {
    const skillStore = useSkillStore()
    const tailoringStore = useTailoringStore()
    const mechanicsStore = useMechanicsStore()
    const itemStore = useItemStore()

    return { skillStore, tailoringStore, mechanicsStore, itemStore }
  },
  data() {
    return {
      skillID: 19,
      itemIndexStart: 0, //itemStore.resourceItems.findIndex(t => t.id === this.tailoringStore[0].resourceID) //this code will get the start index of itemIDs, but I don't know how to run it after everything is loaded. Also, it hardcodes all activity items which could limit further development.
      shownActivity: {},
      shownCat: 1,
      showGuideModal: false,
    }
  },
  mounted() {
    this.shownActivity = this.tailoringStore.activeObject
    if (this.tailoringStore.activeObject.cat != undefined) {
      this.shownCat = this.tailoringStore.activeObject.cat
    }
  },
  methods: {
    isNotValidActivity(activityObject) {
      return false

      //if skill isn't up to snuff, is never valid
      if (activityObject.levelRequired > this.skillStore.skills[this.skillID].level) {
        return true
      }
      //if heavy weapon, has additional requirements
      if (activityObject.mCat == 6 && this.skillStore.flags.dungeon2 == false) {
        return true
      }
      //is valid
      return false
    },
    shownActivityItems1() {
      let temp
      temp = this.itemStore.resourceItems.find(({ id }) => id === this.shownActivity.neededItem1[0])
      return temp.count.toLocaleString()
    },
    shownActivityItems2() {
      let temp
      temp = this.itemStore.resourceItems.find(({ id }) => id === this.shownActivity.neededItem2[0])
      return temp.count.toLocaleString()
    },
    shownActivityItems3() {
      let temp
      temp = this.itemStore.resourceItems.find(({ id }) => id === this.shownActivity.neededItem3[0])
      return temp.count.toLocaleString()
    },
    shownActivityMadeItemE() {
      let temp
      temp = this.itemStore.equipmentItems.find(({ id }) => id === this.shownActivity.itemID)
      return temp.count.toLocaleString()
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
            Tailoring Guide
          </div>

          <!-- Page 1 -->
          <div class="little-levels">
            quote
            <br><br>

            <!-- forging -->
            <span class="text-warning">Weave</span>
            <br>
            trim and stitch
            <br><br>

            <span class="text-warning">Equipment</span>
            <br>
            mastery levels do
          </div>
        </div>

      </div>
    </div>

    <!-- Top Info -->
    <div class="px-5 pb-3 w-100" style="max-width: 64rem;">

      <!-- Leveling and Boost Info -->
      <div class="d-flex justify-content-center gap-1 pb-1">

        <!-- Skill Icon and Help Button -->
        <div class="card card-activity align-items-center pt-1" style="width: 67px; height: 67px;">
          <img src="/src/assets/12x/questionmark.png" alt="" width="36" height="36">
          <div class="little-levels my-auto">
            Guide
          </div>
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
              <span class="badge bg-secondary">{{ (skillStore.skills[this.skillID].xp).toLocaleString() }} / {{
                (skillStore.skills[this.skillID].xpNext).toLocaleString() }}</span> XP
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
                  {{ 'Needle' }}

                  <!-- Tooltip -->
                  <div class="tooltip-text py-1 px-4">
                    <div class="d-flex justify-content-between little-levels">
                      <span>Trimming: </span>
                      <span>{{ 0 }}%</span>
                    </div>
                    <div class="d-flex justify-content-between little-levels">
                      <span>Stitch Time: </span>
                      <span>{{ (1).toFixed(2) }}s</span>
                    </div>
                    <!-- <div class="d-flex justify-content-between little-levels"
                      v-if="itemStore.equippedTools.tailoringTool.dcat == 'device'">
                      <span>Efficency: </span>
                      <span>
                        {{ mechanicsStore.activities[3].mLevel * 5 }}%
                      </span>
                    </div> -->

                  </div>
                </div>
              </span>
            </div>

            <!-- Efficency % -->
            <div class="tooltip-bl">
              {{ tailoringStore.efficency }}%
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

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 185px"
            @click="shownCat = 1">
            <div class="d-flex justify-content-start">
              <img src="/src/assets/icons/testIcon16.png">Wool/Flax
            </div>
          </div>

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 185px"
            @click="shownCat = 2">
            <div class="d-flex justify-content-start">
              <img src="/src/assets/icons/testIcon16.png">Fur/Cotton
            </div>
          </div>

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 185px"
            @click="shownCat = 3">
            <div class=" d-flex justify-content-start">
              <img src="/src/assets/icons/testIcon16.png">Leather/Bark
            </div>
          </div>

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 185px"
            @click="shownCat = 4">
            <div class=" d-flex justify-content-start">
              <img src="/src/assets/icons/testIcon16.png">Hide/Silk
            </div>
          </div>

          <div class="btn sidenav-item disabled" style="font-size: 1.2rem; font-weight: 500; width: 185px"
            @click="shownCat = 5">
            <div class=" d-flex justify-content-start">
              <img src="/src/assets/icons/testIcon16.png">Cara/Shellac
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

            <!-- Trim and Stitch -->
            <div class="little-levels">
              Trim/Stitch: {{ (this.shownActivity.baseTrim * this.shownActivity.neededItem1[1]).toFixed(2) }}s / {{ (this.shownActivity.baseStitch * this.shownActivity.neededItem1[1]) - this.shownActivity.stitchDiscount }}
            </div>

            <!-- XP / Time -->
            <div class="little-levels pb-1">
              {{ this.shownActivity.baseXP * this.shownActivity.neededItem1[1] }} XP / {{ ((this.shownActivity.baseTrim * this.shownActivity.neededItem1[1]) + (this.shownActivity.baseStitch * this.shownActivity.neededItem1[1]) - this.shownActivity.stitchDiscount).toFixed(2) }}s
              
            </div>

            <!-- Progress Bar for Activity Completion -->
            <div class="progress" role="progressbar" style="height: 12px;">
              <div class="progress-bar xp-progress" :style="`width: ${this.tailoringStore.activePercent.a}%;`"
                v-if="this.tailoringStore.activeObject.id == shownActivity.id">
              </div>
            </div>

            <!-- WEAVE! -->
            <div class="pt-2">
              <button type="button" class="btn activity" style="width: 100%;"
                @click="tailoringStore.setActiveAction(shownActivity)">
                Weave
              </button>
            </div>
          </div>

        </div>

        <!-- Crafting Options -->
        <div class="d-flex crafting-activities align-content-start flex-wrap gap-1 pb-3">

          <div class="card card-list flex-grow-1 border-dark text-center"
            v-for="(activity, index) in tailoringStore.activities.filter(temp => temp.cat === this.shownCat)">

            <!-- Not Enough Levels or Area Access for Activity -->
            <div class="card-body pt-2 pb-0 tooltip-be3" v-if="isNotValidActivity(activity)">
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

            <!-- Mastery Level and XP Footer for General Equipment -->
            <div class="card-footer pt-0">
              <div class="d-flex justify-content-between little-levels">
                <div>LVL: {{ tailoringStore.equipmentMastery[activity.mCat].mLevel }}</div>

                <div>
                  {{ (tailoringStore.equipmentMastery[activity.mCat].mxp).toLocaleString() }}/{{
                  (tailoringStore.equipmentMastery[activity.mCat].mxpNext).toLocaleString() }}
                </div>
              </div>

              <div class="progress" role="progressbar" style="height: 8px">
                <div class="progress-bar mastery-progress"
                  :style="`width: ${(tailoringStore.equipmentMastery[activity.mCat].mxp - tailoringStore.equipmentMastery[activity.mCat].mxpPrev) / (tailoringStore.equipmentMastery[activity.mCat].mxpNext - tailoringStore.equipmentMastery[activity.mCat].mxpPrev) * 100}%;`">
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>