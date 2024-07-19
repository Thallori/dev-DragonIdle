<script>
import { useSkillStore } from '@/stores/skills';
import { useCookingStore } from '@/stores/cooking';
import { useItemStore } from '@/stores/inventory';

import tooltips from './panels/tooltips.vue';

export default {
  name: 'CookingTab',
  components: {
    tooltips,
  },
  setup() {
    const skillStore = useSkillStore()
    const cookingStore = useCookingStore()
    const itemStore = useItemStore()

    return { skillStore, cookingStore, itemStore }
  },
  data() {
    return {
      skillID: 20,
      itemIndexStart: 0, //itemStore.resourceItems.findIndex(t => t.id === this.cookingStore[0].resourceID) //this code will get the start index of itemIDs, but I don't know how to run it after everything is loaded. Also, it hardcodes all activity items which could limit further development.
      shownActivity: {},
      shownCat: 'meat',
    }
  },
  mounted() {
    // this.shownActivity = this.smithingStore.activities[0]
    this.shownActivity = this.cookingStore.activeObject
  },
  methods: {
    isNotValidActivity(activityObject) {
      // return false

      // if skill isn't up to snuff, is never valid
      if (activityObject.levelRequired > this.skillStore.skills[this.skillID].level) {
        return true
      }
      //is valid
      return false
    },
    shownActivityMeatItem1() {
      let temp
      temp = this.itemStore.consumableItems.find(({ id }) => id === this.shownActivity.neededMeatItem1)
      return temp.count
    },
    shownActivityItem1() {
      let temp
      temp = this.itemStore.resourceItems.find(({ id }) => id === this.shownActivity.neededItem1)
      return temp.count
    },
    shownActivityItem2() {
      let temp
      temp = this.itemStore.resourceItems.find(({ id }) => id === this.shownActivity.neededItem2)
      return temp.count
    },
    shownActivityMadeItemC() {
      let temp
      temp = this.itemStore.consumableItems.find(({ id }) => id === this.shownActivity.itemID)
      return temp.count
    },
    shownActivityHeals() {
      let temp
      temp = this.itemStore.consumableItems.find(({ id }) => id === this.shownActivity.itemID)
      return temp.heals
    },
  }
}
</script>

<template>
  <div class="card pt-4 align-items-center main-window bg-transparent" style="width: 77rem">

    <!-- Top Info -->
    <div class="px-5 pb-3 w-100" style="max-width: 64rem;">

      <!-- Leveling and Boost Info -->
      <div class="d-flex justify-content-center gap-1 pb-1">

        <!-- Skill Icon and Help Button -->
        <div class="card align-items-center" style="width: 67px; height: 67px;">
          <!-- <img src="src/assets/icons/testIcon32.png" alt="" width="64" height="64"> -->
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
            <div class="flex-grow-1 px-2">
              <span>
                <img src="src/assets/icons/testIcon16.png" alt="" width="32" height="32">
                <span> Fire Pit</span>
              </span>
            </div>

            <!-- Efficency % -->
            <div class="tooltip-br">
              {{ cookingStore.efficency }}%
              <img src="src/assets/icons/testIcon12.png" alt="" width="24" height="24">
              <div class="tooltip-text py-1 px-2">
                <div class="little-levels">
                  Chance of additional instant actions, without using extra resources.
                  <hr>
                  Typically gained from skill levels.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Boost -->
        <div class="card align-items-center" style="width: 50px; height: 50px;">
          <!-- <img src="src/assets/icons/testIcon32.png" alt="" width="64" height="64"> -->
        </div>
      </div>
    </div>

    <!-- All Activities -->
    <div style="max-width: 64rem">
      <!-- Activity Set Selector -->
      <div class="card py-1 px-1">
        <div class="d-flex flex-wrap justify-content-center gap-1">

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 150px"
            @click="shownCat = 'meat'">
            <div class="d-flex justify-content-start">
              <img src="src/assets/icons/testIcon16.png">Meat
            </div>
          </div>

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 150px"
            @click="shownCat = 'meal'">
            <div class="d-flex justify-content-start">
              <img src="src/assets/icons/testIcon16.png">Meals
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

                <img :src="itemStore.getItemImage(shownActivity.itemID, 'consumableItems')" alt="" width="64"
                  height="64">
                <div style="height: 0.0rem">
                  <span class="position-relative little-levels badge bg-secondary"
                    style="translate: -30px -76px; padding: 0.25rem;">
                    {{ shownActivityMadeItemC() }}
                  </span>
                </div>
              </div>

              <div class="little-levels pb-2">Requires</div>

              <!-- Image(s) of Required Items -->
              <div class="d-flex justify-content-center align-items-center gap-3 pb-3">

                <div v-if="shownActivity.neededMeatItem1">
                  <img :src="itemStore.getItemImage(shownActivity.neededMeatItem1, 'consumableItems')" alt="" width="48"
                    height="48">

                  <div style="height: 0.0rem">
                    <span class="position-relative little-levels badge bg-secondary"
                      style="translate: -20px -60px; padding: 0.25rem;">
                      {{ shownActivityMeatItem1() }}
                    </span>
                  </div>
                </div>

                <div v-if="shownActivity.neededItem1">
                  <img :src="itemStore.getItemImage(shownActivity.neededItem1, 'resourceItems')" alt="" width="48"
                    height="48">
                  <div style="height: 0.0rem">
                    <span class="position-relative little-levels badge bg-secondary"
                      style="translate: -20px -60px; padding: 0.25rem;">
                      {{ shownActivityItem1() }}
                    </span>
                  </div>
                </div>

                <div v-if="shownActivity.neededItem2">
                  <img :src="itemStore.getItemImage(shownActivity.neededItem2, 'resourceItems')" alt="" width="48"
                    height="48">
                  <div style="height: 0.0rem">
                    <span class="position-relative little-levels badge bg-secondary"
                      style="translate: -20px -60px; padding: 0.25rem;">
                      {{ shownActivityItem2() }}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            <!-- XP per Completion and Seconds per Complete -->
            <div class="little-levels">
              Heals: {{ shownActivityHeals() }}
            </div>
            <div class="little-levels pb-1">
              {{ shownActivity.xpGain }} XP / {{ shownActivity.cookTime.toFixed(2) }}s
            </div>

            <!-- Progress Bar for Activity Completion -->
            <div class="progress" role="progressbar" style="height: 12px;">
              <div class="progress-bar xp-progress" :style="`width: ${this.cookingStore.activePercent}%;`"
                v-if="this.cookingStore.activeObject.id == shownActivity.id">
              </div>
            </div>

            <!-- COOK! -->
            <div class="pt-2">
              <button type="button" class="btn activity" style="width: 100%;"
                @click="cookingStore.setActiveAction(shownActivity)">
                Cook
              </button>
            </div>
          </div>

        </div>

        <!-- Crafting and Activities Selector -->

        <!-- Crafting Options -->
        <div class="d-flex crafting-activities align-content-start flex-wrap gap-1 pb-3">

          <div class="card card-list flex-grow-1 border-dark text-center"
            v-for="(activity) in cookingStore.activities.filter(temp => temp.cat === this.shownCat)">

            <!-- Not Enough Levels or Area Access for Activity -->
            <div class="card-body pt-2 pb-0" v-if="isNotValidActivity(activity)">
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
                  <img :src="itemStore.getItemImage(activity.itemID, 'consumableItems')" alt="" width="32" height="32">
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
    </div>
  </div>
</template>