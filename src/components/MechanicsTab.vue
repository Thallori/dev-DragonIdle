<script>
import { useSkillStore } from '@/stores/skills'
import { useItemStore } from '@/stores/inventory'
import { useMechanicsStore } from '@/stores/mechanics'
import { useExplorationStore } from '@/stores/exploration'

import tooltips from './panels/tooltips.vue'

export default {
  components: {
    tooltips,
  },
  setup() {
    const skillStore = useSkillStore()
    const itemStore = useItemStore()
    const mechanicsStore = useMechanicsStore()
    const explorationStore = useExplorationStore()
    return { skillStore, itemStore, mechanicsStore, explorationStore }
  },
  data() {
    return {
      skillID: 8,
      shownCat: 0,
      shownActivity: {},
      showAllItems: false,
      showGuideModal: false,
    }
  },
  mounted() {
    //if never looped before, always open reset cat
    if (this.skillStore.flags.loop1 == false) {
      this.shownCat = 'reset'
      this.itemStore.totalUpDCAT()
      return
    }

    this.shownActivity = this.mechanicsStore.activeObject
    if (this.mechanicsStore.activeObject.cat != undefined) {
      this.shownCat = this.mechanicsStore.activeObject.cat
    } else {
      this.shownCat = 'reset'
      this.itemStore.totalUpDCAT()
    }
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
    shownActivityItem1() {
      let temp = this.itemStore.mechanicsItems.find(({ id }) => id === this.shownActivity.neededItem1[0])
      return temp.count.toLocaleString()
    },
    shownActivityItem2() {
      let temp = this.itemStore.mechanicsItems.find(({ id }) => id === this.shownActivity.neededItem2[0])
      return temp.count.toLocaleString()
    },
    shownActivityItem3() {
      let temp = this.itemStore.mechanicsItems.find(({ id }) => id === this.shownActivity.neededItem3[0])
      return temp.count.toLocaleString()
    },
    shownActivityMadeItemC() {
      let temp = this.itemStore.equipmentItems.find(({ id }) => id === this.shownActivity.itemID)
      if (temp == undefined) {
        temp = this.itemStore.mechanicsItems.find(({ id }) => id === this.shownActivity.itemID)
      }
      return temp.count.toLocaleString()
    },

    hasCount(temp) {
      return temp.filter(t => t.count > 0)
    },
    resettheloop() {
      this.skillStore.flags.showMechanics = true
      //add device xp
      this.skillStore.addXP(this.skillID, Math.ceil(this.mechanicsStore.pendingXP / 20))
      this.mechanicsStore.pendingXP = 0

      this.skillStore.cancelCurrentActivity('all')
      this.explorationStore.sealAllAreas()
      this.itemStore.resetTheLoop()
      if (this.skillStore.flags.loop1 == false) {
        this.skillStore.diaThrow('loop1')
      }
    },
  },
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
            Mechanics Guide
          </div>

          <!-- Page 1 -->
          <div class="little-levels">
            reset the loop
            <br><br>

            <span class="text-warning">stabilize</span>
            <br>
            
            when the loop is reset, the world stabilizes and exploration areas can be unsealed once more
            <br><br>

            <span class="text-warning">devices</span>
            <br>

            <span class="info-text">special tools</span> don't give regular xp, but instead gain device xp. device xp is
            stored until the loop is reset again, at which point it's converted in to mechanics xp at a 1:20 ratio. in
            the future, this ratio will increase over time, reaching a 1:10 ratio eight hours after a loop reset, but that hasn't been coded yet 
            <br><br>
            device mastery gives more efficency on its tool, more defense on armor, or more damage on weapons. component mastery makes the component cost less to make
            <br><br>

            <span class="text-warning">deconstruction</span>
            <br>

            items have various cateories and item levels (which aren't displayed anywhere yet). on a loop reset, all
            of these are added up, then divided out to make pieces and components. every item can give a pieces, but only
            processed items (and gems) can give a component.
            <br><br>

            simple: money
            <br>
            organic: living, ingredient, hide, ranged armor/weapon, raw/cooked food, remains
            <br>
            metallic: bar, ore, ammo, melee weapons/armor, tools, gem/lux
            <br>
            energetic: magic, charge, magic weapons/armor, jewellery, oil, potion, dusts
            <br><br>
            practical: tools
            <br>
            direct: weapons
            <br>
            protective: armor
            <br>
            precious: jewellery, gem/lux
            <br>
            catalytic: potion/oil/charge/ammo
            <br>
            hearty: raw/cooked food
            <br>
            ethereal: remains, dusts
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
                  <span> Spanner</span>

                  <!-- Tooltip -->
                  <div class="tooltip-text py-1 px-4">
                    <div class="d-flex justify-content-between little-levels ">
                      <span>Machining Time:</span>
                      <span>0%</span>
                    </div>
                  </div>

                </div>
              </span>
            </div>

            <!-- Efficency % -->
            <div class="tooltip-bl">
              {{ mechanicsStore.efficency }}%
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

    <!-- All Items -->
    <div style="max-width: 64rem">

      <!-- Activity Set Selector -->
      <div class="card p-1">
        <div class="d-flex flex-wrap justify-content-center gap-1">

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 190px"
            @click="shownCat = 'tool'">
            <div class="d-flex justify-content-start">
              <img src="/src/assets/icons/testIcon16.png">Devices
            </div>
          </div>

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 190px"
            @click="shownCat = 'equipment'">
            <div class="d-flex justify-content-start">
              <img src="/src/assets/icons/testIcon16.png">Equipment
            </div>
          </div>

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 190px"
            @click="shownCat = 'component'">
            <div class="d-flex justify-content-start">
              <img src="/src/assets/icons/testIcon16.png">Components
            </div>
          </div>

          <div class="btn sidenav-item" style="font-size: 1.2rem; font-weight: 500; width: 190px"
            @click="shownCat = 'reset'; this.itemStore.totalUpDCAT()">
            <div class="d-flex justify-content-start">
              <img src="/src/assets/icons/testIcon16.png">Reset Loop
            </div>
          </div>

        </div>
      </div>

      <!-- Subset Activities -->
      <div class="d-flex gap-1 flex-wrap justify-content-center pt-1" v-if="shownCat != 'reset'">

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
                  <tooltips :itemObject="itemStore.getItemData(shownActivity.itemID)" />
                </div>

                <img :src="itemStore.getItemImage(shownActivity.itemID)" alt="" width="64"
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
              <div class="d-flex justify-content-center align-items-center gap-3 mb-3">

                <div v-if="shownActivity.neededItem1">
                  <img :src="itemStore.getItemImage(shownActivity.neededItem1[0], 'mechanicsItems')" alt="" width="48"
                    height="48">
                  <div style="height: 0.0rem">
                    <span class="position-relative little-levels badge bg-secondary"
                      style="translate: -20px -60px; padding: 0.25rem;">
                      {{ shownActivityItem1() }}
                    </span>
                  </div>

                  <div style="height: 0.0rem; translate: 0px -12px;" v-if="shownActivity.neededItem1[1] > 1">
                    <div class="badge smol-badge">

                      <span v-if="shownActivity.cat != 'component'">x{{ shownActivity.neededItem1[1] }}</span>
                      <span v-else>x{{ shownActivity.neededItem1[1] - shownActivity.mLevel }}</span>

                    </div>
                  </div>
                </div>

                <!-- If activity is a component and mlevel is 20, then don't render -->
                <div
                  v-if="shownActivity.neededItem2 && (shownActivity.cat != 'component' || shownActivity.mLevel < 20)">
                  <img :src="itemStore.getItemImage(shownActivity.neededItem2[0], 'mechanicsItems')" alt="" width="48"
                    height="48">
                  <div style="height: 0.0rem">
                    <span class="position-relative little-levels badge bg-secondary"
                      style="translate: -20px -60px; padding: 0.25rem;">
                      {{ shownActivityItem2() }}
                    </span>
                  </div>

                  <div style="height: 0.0rem; translate: 0px -12px;" v-if="shownActivity.neededItem2[1] > 1">
                    <div class="badge smol-badge">

                      <span v-if="shownActivity.cat != 'component'">x{{ shownActivity.neededItem2[1] }}</span>
                      <span v-else>x{{ shownActivity.neededItem2[1] - shownActivity.mLevel }}</span>

                    </div>
                  </div>
                </div>

                <div v-if="shownActivity.neededItem3">
                  <img :src="itemStore.getItemImage(shownActivity.neededItem3[0], 'mechanicsItems')" alt="" width="48"
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
            <div class="little-levels mb-1">
              {{ shownActivity.xpGain }} XP / {{ shownActivity.timeNeeded.toFixed(2) }}s
            </div>
            <!-- {{ (Math.ceil(shownActivity.cookTime * 20) / 20).toFixed(2) }}s -->

            <!-- Progress Bar for Activity Completion -->
            <div class="progress" role="progressbar" style="height: 12px;">
              <div class="progress-bar xp-progress" :style="`width: ${this.mechanicsStore.activePercent.a}%;`"
                v-if="this.mechanicsStore.activeObject.id == shownActivity.id">
              </div>
            </div>

            <!-- MACHINE! -->
            <div class="pt-2">
              <button type="button" class="btn activity" style="width: 100%;"
                @click="mechanicsStore.setActiveAction(shownActivity)">
                Machine
              </button>
            </div>
          </div>
        </div>

        <!-- Crafting Options -->
        <div class="d-flex crafting-activities align-content-start flex-wrap gap-1 pb-3">

          <!-- Activity Cards -->
          <div class="card flex-grow-1 border-dark text-center card-list"
            v-for="(activity) in mechanicsStore.activities.filter(temp => temp.cat === this.shownCat) ">

            <!-- Not Enough Levels or Area Access for Activity -->
            <div class="card-body pb-0 pt-2" v-if="isNotValidActivity(activity)">
              <div class="d-flex justify-content-around align-items-center tooltip-be3">

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
            <div class="card-body card-activity pb-0 pt-2" v-else>
              <div class="d-flex justify-content-around align-items-center">

                <!-- Title of Activity -->
                <div class="d-flex align-items-center flex-grow-1">
                  <img :src="itemStore.getItemImage(activity.itemID)" alt="" width="32" height="32">
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
                <div>{{ (activity.mxp).toLocaleString() }}/{{ (activity.mxpNext).toLocaleString() }}</div>
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

      <!-- Reset Loop Card -->
      <div class="card card-big text-center mx-auto m-2 p-3" style="max-width: 32rem;" v-if="shownCat == 'reset'">

        <!-- binding slot -->
        <!-- <div class="card tooltip-br equipment-card" style="width: 58px; height: 58px;"
          @dblclick="itemStore.equipCombatTool(itemStore.equippedCombat.meleeSlot)">

          <div class="tooltip-text" v-if="itemStore.equippedCombat.meleeSlot.id">
            <tooltips :itemObject="itemStore.equippedCombat.meleeSlot" />
          </div>

          <img class="mx-auto my-auto" :src="itemStore.equippedCombat.meleeSlot.image" alt="" width="48" height="48"
            v-if="itemStore.equippedCombat.meleeSlot.image">
          <div class="little-levels text-center" v-else>
            Melee
          </div>
        </div> -->

        <div>

          <div class="mb-2" v-if="skillStore.flags.loop1 == true">
            +{{ (Math.ceil(mechanicsStore.pendingXP / 20)).toLocaleString() }} Stored Device XP
          </div>

          <!-- RESET! -->
          <button type="button" class="btn btn-lg activity bg-danger m-auto w-50" @click="resettheloop">Reset the
            Loop</button>

          <div class="pt-3">
            Keep all skills and experience.
            <br>
            Return to a time before any areas were released.
            <br>
            Deconstruct all items into their timeless elements.
          </div>

          <div class="d-flex flex-wrap justify-content-center gap-5 pt-2">

            <div>
              Pieces
              <div class="little-levels">
                Simple: {{ itemStore.pendingParts[0] }}
              </div>
              <div class="little-levels">
                Organic: {{ itemStore.pendingParts[1] }}
              </div>
              <div class="little-levels">
                Metallic: {{ itemStore.pendingParts[2] }}
              </div>
              <div class="little-levels">
                Energetic: {{ itemStore.pendingParts[3] }}
              </div>
            </div>

            <div>
              Components
              <div class="little-levels">
                Practical: {{ itemStore.pendingParts[4] }}
              </div>
              <div class="little-levels">
                Direct: {{ itemStore.pendingParts[5] }}
              </div>
              <div class="little-levels">
                Protective: {{ itemStore.pendingParts[6] }}
              </div>
              <div class="little-levels">
                Precious: {{ itemStore.pendingParts[7] }}
              </div>
              <div class="little-levels">
                Catalytic: {{ itemStore.pendingParts[8] }}
              </div>
              <div class="little-levels">
                Hearty: {{ itemStore.pendingParts[9] }}
              </div>
              <!-- <div class="little-levels">
                Ancient: {{ itemStore.pendingParts[10] }}
              </div> -->
              <div class="little-levels">
                Ethereal: {{ itemStore.pendingParts[11] }}
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Mechanics Items -->
      <div class="card card-big m-2 mx-auto" style="min-height: 6rem; max-width: 32rem;"
        v-if="skillStore.flags.showMechanics == true">
        <div class="card-header dark-text little-levels py-0">
          Timeless
        </div>

        <div class="d-flex flex-wrap gap-1 p-2">
          <div v-for="inventoryItem in hasCount(itemStore.mechanicsItems)">

            <!-- Card of Item -->
            <div class="card tooltip-b equipment-card" style="width: 58px; height: 58px;">

              <!-- Tooltip -->
              <div class="tooltip-text">
                <tooltips :itemObject="inventoryItem" />
              </div>

              <!-- Image of Item -->
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

    </div>
  </div>
</template>

<style scoped></style>
