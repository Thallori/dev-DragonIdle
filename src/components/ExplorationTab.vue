<script>
import { useSkillStore } from '@/stores/skills';
import { useExplorationStore } from '@/stores/exploration';
import { useScryingStore } from '@/stores/scrying';
import { useForagingStore } from '@/stores/foraging';
import { useHuntingStore } from '@/stores/hunting';
import { useMiningStore } from '@/stores/mining';
import areaRequirements from '@/data/areaRequirements';

export default {
  name: 'ExplorationTab',
  setup() {
    const skillStore = useSkillStore()
    const explorationStore = useExplorationStore()
    const scryingStore = useScryingStore()
    const foragingStore = useForagingStore()
    const huntingStore = useHuntingStore()
    const miningStore = useMiningStore()
    const areaData = { ...areaRequirements }

    return { skillStore, explorationStore, scryingStore, foragingStore, huntingStore, miningStore, areaData }
  },
  data() {
    return {
      skillID: 9,
      blep: true,
    }
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
  <div class="card pt-4 align-items-center main-window bg-transparent" style="width: 77rem">

    <button id="myBtn" @click="blep = false">Open Modal</button>

    <!-- The Modal -->
    <div class="modal" :class="blep ? 'hide-modal' : 'show-modal'">

      <div class="modal-backing" @click="blep = true"></div>
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" @click="blep = true">&times;</span>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.</p>
      </div>

    </div>

    <!-- Top Info -->
    <div class="px-5 pb-3 w-100" style="min-width: 500px;">

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
                <span> Old Map</span>
              </span>
            </div>

            <!-- Efficency % -->
            <div class="tooltip-be">
              {{ explorationStore.efficency }}%
              <img src="src/assets/icons/testIcon12.png" alt="" width="24" height="24">
              <div class="tooltip-text pt-1 pb-2 px-2">
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
        <div class="d-flex justify-content-center gap-1">

          <div v-if="0 == explorationStore.maxUnsealedAreas - explorationStore.currentUnsealedAreas">
            Stability: NONE
          </div>
          <div v-else>
            Stability: {{ explorationStore.maxUnsealedAreas - explorationStore.currentUnsealedAreas }}
          </div>
        </div>
      </div>

      <!-- Activity Cards -->
      <div class="d-flex gap-1 flex-wrap justify-content-center pt-1">
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
              <div class="badge bg-secondary">
                SEALED
              </div>
              <div class="p-5" v-if="explorationStore.currentUnsealedAreas < explorationStore.maxUnsealedAreas">
                <button type="button" class="btn activity w-100 mt-4 p-3"
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
              <img src="src/assets/icons/testIcon32.png" alt="" width="64" height="64">
            </div>

            <!-- Unique Features -->
            <div class="pb-1">
              <span>Unique Features</span>
            </div>

            <div class="d-flex justify-content-center gap-3 pb-1">

              <!-- Image and Tooltip of Dungeon -->
              <span class="tooltip-be" v-if="activity.dungeon">

              </span>

              <!-- Image and Tooltip of Activity 1 -->
              <span class="tooltip-be" v-if="activity.uniqueFeature1">
                <img :src="findUniqueFeatureObject(activity.uniqueFeature1[0], activity.uniqueFeature1[1]).image" alt=""
                  width="32" height="32">

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

                    <div class="d-flex justify-content-between">
                      <span>Level: </span>
                      <span>
                        {{ findUniqueFeatureObject(activity.uniqueFeature1[0],
                        activity.uniqueFeature1[1]).levelRequired
                        }}
                      </span>
                    </div>
                  </div>
                </div>
              </span>

              <!-- Image and Tooltip of Activity 2 -->
              <span class="tooltip-be" v-if="activity.uniqueFeature2">
                <img :src="findUniqueFeatureObject(activity.uniqueFeature2[0], activity.uniqueFeature2[1]).image" alt=""
                  width="32" height="32">

                <!-- Name of Activity 1 -->
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

                    <div class="d-flex justify-content-between">
                      <span>Level: </span>
                      <span>
                        {{ findUniqueFeatureObject(activity.uniqueFeature2[0],
                        activity.uniqueFeature2[1]).levelRequired
                        }}
                      </span>
                    </div>
                  </div>
                </div>
              </span>
            </div>

            <!-- XP per Completion and Seconds per Complete -->
            <div class="little-levels pb-2">
              <div class="pb-1">{{ activity.xpGain }} XP / {{ activity.interval.toFixed(2) }} Seconds</div>

              <!-- Progress Bar for Activity Completion -->
              <div class="progress" role="progressbar" style="height: 12px;">
                <div class="progress-bar xp-progress" :style="`width: ${explorationStore.activePercent}%;`"
                  v-if="activity.id == explorationStore.activeObject.id">
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-center gap-1">

              <!-- Explore and Display Common Resources -->
              <button type="button" class="btn activity" style="width: 50%;"
                @click="explorationStore.setActiveAction(activity)">Explore</button>

              <!-- It's a button, but it's also going to be a tooltip? Maybe I need to rethink this. -->
              <button type="button" class="btn activity" style="width: 50%;">Resources</button>
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
</template>
