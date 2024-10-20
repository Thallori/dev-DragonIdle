<script>
import { useSkillStore } from '@/stores/skills'
import { useExplorationStore } from '@/stores/exploration'
import { useScryingStore } from '@/stores/scrying'
import { useForagingStore } from '@/stores/foraging'
import { useHuntingStore } from '@/stores/hunting'
import { useMiningStore } from '@/stores/mining'
import { useMechanicsStore } from '@/stores/mechanics'
import { useItemStore } from '@/stores/inventory'
import areaRequirements from '@/data/areaRequirements'

export default {
  name: 'ExplorationTab',
  setup() {
    const skillStore = useSkillStore()
    const explorationStore = useExplorationStore()
    const scryingStore = useScryingStore()
    const foragingStore = useForagingStore()
    const huntingStore = useHuntingStore()
    const miningStore = useMiningStore()
    const mechanicsStore = useMechanicsStore()
    const itemStore = useItemStore()
    const areaData = { ...areaRequirements }

    return { skillStore, explorationStore, scryingStore, foragingStore, huntingStore, miningStore, mechanicsStore, itemStore, areaData }
  },
  data() {
    return {
      skillID: 9,
      showGuideModal: false,
      showResourcesModal: false,
      resourcesObject: {}
    }
  },
  mounted() {
    this.explorationStore.updateEfficency()
    this.explorationStore.updateMaxAreas()
  },
  methods: {
    isNotValidActivity(activityObject) {
      // return false

      // if skill isn't up to snuff, is never valid
      if (activityObject.levelRequired > this.skillStore.skills[this.skillID].level) {
        return true
      }

      if (activityObject.isSealed == true) {
        return true
      }

      //is valid
      return false
    },
    findUniqueFeatureObject(storeName, findId) {
      if (storeName == 'Scrying') {
        return this.scryingStore.activities[findId]
      }
      if (storeName == 'Foraging') {
        return this.foragingStore.activities[findId]
      }
      if (storeName == 'Hunting') {
        return this.huntingStore.activities[findId]
      }
      if (storeName == 'Mining') {
        return this.miningStore.activities[findId]
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
            Exploration Guide
          </div>

          <!-- Page 1 -->
          <div class="little-levels">
            The world is full of possibilities, just waiting to be found.
            <br><br>

            <span class="text-warning">Areas</span>
            <br>

            Regions begin frozen, <span class="info-text">sealed</span> away in time. They are easy enough to release,
            but as the flow of time returns, the <span class="info-text">stability</span> of this fragile existance will
            become threatened. Limiting the options for what can be accessed, leaving the rest locked.
            <br><br>

            <span class="text-warning">Resources</span>
            <br>
            <span class="info-text">Exploring</span> each area unlocks unique resources, enemies, and a <span class="info-text">sequence</span> of encounters that
            guard something <span class="info-text">special</span>. These unlocks will stay accessible as long as the area remains <span class="info-text">released</span>.
            <br><br>

            Area unlocks are represented by its <span class="info-text">mastery level</span>, each level providing something new to
            <span class="info-text">gather</span> and +2% <span class="info-text">efficency</span> for that region's
            <span class="info-text">efficency skill</span>.
            <br><br>

            <span class="text-warning">Efficency</span>
            <br>

            The chance that an action will <span class="info-text">instantly repeat</span> without using any extra
            resources.
          </div>
        </div>

      </div>
    </div>

    
    <!-- Resources Modal -->
    <div class="modal show-modal" v-if="showResourcesModal == true">
      <div class="modal-backing" @click="showResourcesModal = false"></div>

      <!-- Resources Content -->
      <div class="modal-content py-4 px-5" style="width: 23rem;">

        <div class="text-center pb-2">
          <div class="pb-3">
            {{ resourcesObject.name }}
          </div>
          <img :src="resourcesObject.image" alt="" width="128" height="128">
        </div>

        <div class="text-center">
          <div class="little-levels dark-text">Efficency Skill</div>
           {{ resourcesObject.efficencySkill }}
        </div>

        <div class="d-flex justify-content-between align-items-center dark-text py-2 little-levels" v-if="true">
          <span>Resources</span>
          <span>Mastery LVL</span>
        </div>

        <!-- Resources List -->
        <div class="d-flex justify-content-between align-items-center gap-2 pb-1" v-for="resources in resourcesObject.resourcesList">
          <!-- <img :src="itemStore.getItemData(resources.itemID).image" alt="" width="32" height="32">
          <span class="flex-grow-1">
            {{ itemStore.getItemData(resources.itemID).name }}
          </span> -->
          <span>
            {{ resources[0] }}
          </span>
          <span class="little-levels dark-text flex-grow-1">
            ({{ resources[1] }})
          </span>
          <span>
            {{ resources[2] }}
          </span>
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
                  <img :src="itemStore.equippedTools.explorationTool.image" alt="" width="32" height="32">
                  {{ itemStore.equippedTools.explorationTool.name }}

                  <!-- Tooltip -->
                  <div class="tooltip-text py-1 px-3">
                    <div class="d-flex justify-content-between little-levels">
                      <span>Explore Time: </span>
                      <span>
                        {{ itemStore.equippedTools.explorationTool.toolStats.explorationMulti * 100 }}%
                      </span>
                    </div>
                    <div class="d-flex justify-content-between little-levels"
                      v-if="itemStore.equippedTools.explorationTool.dcat == 'device'">
                      <span>Efficency: </span>
                      <span>
                        {{ mechanicsStore.activities[0].mLevel * 5 }}%
                      </span>
                    </div>
                  </div>
                </div>
              </span>
            </div>

            <!-- Efficency % -->
            <div class="tooltip-bl">
              {{ explorationStore.efficency }}%
              <img src="/src/assets/12x/eff.png" alt="" width="24" height="24">
              <div class="tooltip-text pt-1 pb-2 px-2">
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
    <div style="max-width: 80rem">

      <!-- Stability Display -->
      <div class="card py-1 px-1">
        <div class="d-flex justify-content-center gap-1">

          <div v-if="0 == explorationStore.maxUnsealedAreas - explorationStore.currentUnsealedAreas">
            <span v-if="skillStore.skills[8].locked == true">
              Stability Exhausted: Complete Sequence 3 to Restore
            </span>
            <span v-else>
              Stability Exhausted: Use Mechanics to Reset the Loop
            </span>
          </div>
          <div v-else>
            Stability: {{ explorationStore.maxUnsealedAreas - explorationStore.currentUnsealedAreas }}
          </div>

        </div>
      </div>

      <!-- Activity Cards -->
      <div class="d-flex gap-1 flex-wrap pt-1">
        <div class="card border-dark text-center" style="width: 15.2rem; height: 20.5rem;"
          v-for="activity in explorationStore.activities">

          <!-- Not Enough Levels for Activity -->
          <div class="card-body" v-if="isNotValidActivity(activity)">
            <h4 class="card-title">{{ activity.name }}</h4>

            <!-- Level Not Met -->
            <div class="badge bg-secondary" v-if="activity.levelRequired > skillStore.skills[this.skillID].level">
              LEVEL {{ activity.levelRequired }}
            </div>

            <!-- Sealed -->
            <div v-else-if="activity.isSealed == true">
              <div class="badge mb-3 bg-secondary">
                SEALED
              </div>

              <!-- Unique Resources -->
              <div class="pt-4 pb-1">
                <span>Unique Resources</span>
              </div>

              <div class="d-flex justify-content-center gap-3">

                <!-- Image and Tooltip of Dungeon -->
                <span class="tooltip-be" v-if="activity.dungeon">

                </span>

                <!-- Image and Tooltip of Activity 1 -->
                <span class="tooltip-be" v-if="activity.uniqueFeature1">
                  <img :src="activity.uniqueFeature1[2]" alt="" width="32" height="32">

                  <!-- Name of Activity 1 -->
                  <div class="tooltip-text">
                    <div class="card-header py-1">
                      <span>
                        {{ findUniqueFeatureObject(activity.uniqueFeature1[0], activity.uniqueFeature1[1]).name }}
                      </span>
                    </div>

                    <!-- Subtext Skill and Level Needed -->
                    <div class="py-1 mx-4 little-levels">
                      <div class="d-flex justify-content-between">
                        <span>Skill: </span>
                        <span>
                          {{ activity.uniqueFeature1[0] }}
                        </span>
                      </div>

                      <!-- <div class="d-flex justify-content-between">
                        <span>Level: </span>
                        <span>
                          {{ findUniqueFeatureObject(activity.uniqueFeature1[0],
                          activity.uniqueFeature1[1]).levelRequired
                          }}
                        </span>
                      </div> -->

                    </div>
                  </div>
                </span>

                <!-- Image and Tooltip of Activity 2 -->
                <span class="tooltip-be" v-if="activity.uniqueFeature2">
                  <img :src="activity.uniqueFeature2[2]" alt="" width="32" height="32">

                  <!-- Name of Activity 2 -->
                  <div class="tooltip-text">
                    <div class="card-header py-1">
                      <span>
                        {{ findUniqueFeatureObject(activity.uniqueFeature2[0], activity.uniqueFeature2[1]).name }}
                      </span>
                    </div>

                    <!-- Subtext Skill and Level Needed -->
                    <div class="py-1 mx-4 little-levels">
                      <div class="d-flex justify-content-between">
                        <span>Skill: </span>
                        <span>
                          {{ activity.uniqueFeature2[0] }}
                        </span>
                      </div>

                      <!-- <div class="d-flex justify-content-between">
                        <span>Level: </span>
                        <span>
                          {{ findUniqueFeatureObject(activity.uniqueFeature2[0],
                          activity.uniqueFeature2[1]).levelRequired
                          }}
                        </span>
                      </div> -->

                    </div>
                  </div>
                </span>
              </div>

              <div class="pt-4 px-4" v-if="explorationStore.currentUnsealedAreas < explorationStore.maxUnsealedAreas">
                <button type="button" class="btn activity w-100"
                  @click="explorationStore.unsealArea(activity)">RELEASE</button>
              </div>
            </div>
          </div>

          <!-- Can Do Activity -->
          <div class="card-body" v-else>

            <!-- Title of Activity -->
            <h4 class="card-title">{{ activity.name }}</h4>
            <div class="pb-1">

              <!-- Image of Activity -->
              <img :src="activity.image" alt="" width="64" height="64">
            </div>

            <!-- Unique Resources -->
            <div class="pb-1">
              <span>Unique Resources</span>
            </div>

            <div class="d-flex justify-content-center gap-3 pb-1">

              <!-- Image and Tooltip of Dungeon -->
              <span class="tooltip-be" v-if="activity.dungeon">

              </span>

              <!-- Image and Tooltip of Activity 1 -->
              <span class="tooltip-be" v-if="activity.uniqueFeature1">
                <img :src="activity.uniqueFeature1[2]" alt="" width="32" height="32">

                <!-- Name of Activity 1 -->
                <div class="tooltip-text">
                  <div class="card-header py-1">
                    <span>
                      {{ findUniqueFeatureObject(activity.uniqueFeature1[0], activity.uniqueFeature1[1]).name }}
                    </span>
                  </div>

                  <!-- Subtext Skill and Level Needed -->
                  <div class="py-1 mx-4 little-levels">
                    <div class="d-flex justify-content-between">
                      <span>Skill: </span>
                      <span>
                        {{ activity.uniqueFeature1[0] }}
                      </span>
                    </div>

                    <!-- <div class="d-flex justify-content-between">
                      <span>Level: </span>
                      <span>
                        {{ findUniqueFeatureObject(activity.uniqueFeature1[0],
                        activity.uniqueFeature1[1]).levelRequired
                        }}
                      </span>
                    </div> -->

                  </div>
                </div>
              </span>

              <!-- Image and Tooltip of Activity 2 -->
              <span class="tooltip-be" v-if="activity.uniqueFeature2">
                <img :src="activity.uniqueFeature2[2]" alt="" width="32" height="32">

                <!-- Name of Activity 2 -->
                <div class="tooltip-text">
                  <div class="card-header py-1">
                    <span>
                      {{ findUniqueFeatureObject(activity.uniqueFeature2[0], activity.uniqueFeature2[1]).name }}
                    </span>
                  </div>

                  <!-- Subtext Skill and Level Needed -->
                  <div class="py-1 mx-4 little-levels">
                    <div class="d-flex justify-content-between">
                      <span>Skill: </span>
                      <span>
                        {{ activity.uniqueFeature2[0] }}
                      </span>
                    </div>

                    <!-- <div class="d-flex justify-content-between">
                      <span>Level: </span>
                      <span>
                        {{ findUniqueFeatureObject(activity.uniqueFeature2[0],
                        activity.uniqueFeature2[1]).levelRequired
                        }}
                      </span>
                    </div> -->

                  </div>
                </div>
              </span>
            </div>

            <!-- XP per Completion and Seconds per Complete -->
            <div class="little-levels pb-2">
              <div class="pb-1">{{ activity.xpGain }} XP / {{ (activity.interval * (1 -
                itemStore.equippedTools.explorationTool.toolStats.explorationMulti)).toFixed(2) }} Seconds</div>

              <!-- Progress Bar for Activity Completion -->
              <div class="progress" role="progressbar" style="height: 12px;">
                <div class="progress-bar xp-progress" :style="`width: ${explorationStore.activePercent.a}%;`"
                  v-if="activity.id == explorationStore.activeObject.id">
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-center gap-1">

              <!-- Explore and Display Common Resources -->
              <button type="button" class="btn activity w-100"
                @click="explorationStore.setActiveAction(activity)">Explore</button>

              <!-- It's a button, but it's also going to be a tooltip? Maybe I need to rethink this. -->
              <button type="button" class="btn activity w-100" @click="showResourcesModal = true; resourcesObject = activity">Resources</button>
            </div>
          </div>

          <!-- Mastery Level and XP Footer -->
          <div class="card-footer pt-0">
            <div class="d-flex justify-content-between little-levels">
              <div>
                <span v-if="activity.mLevel == 0">Unexplored</span>
                <span v-else>LVL: {{ activity.mLevel }}</span>
              </div>
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
  </div>
</template>
