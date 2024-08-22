<script>
import { useSkillStore } from './stores/skills';

import InventoryTab from './components/InventoryTab.vue';
import CombatTab from './components/CombatTab.vue';
import ExplorationTab from './components/ExplorationTab.vue';
import ScryingTab from './components/ScryingTab.vue';
import ForagingTab from './components/ForagingTab.vue';
import HuntingTab from './components/HuntingTab.vue';
import MiningTab from './components/MiningTab.vue';
import SmithingTab from './components/SmithingTab.vue';
import CookingTab from './components/CookingTab.vue';

export default {
  components: {
    InventoryTab, CombatTab, ExplorationTab, ScryingTab, ForagingTab, HuntingTab, MiningTab, SmithingTab, CookingTab
  },
  setup() {
    const skillStore = useSkillStore()
    return { skillStore }
  },
  data() {
    return {
      window: {
        width: 0,
        height: 0
      },
      showSidenav: true,
      showAllAffinities: true,
      showAllSkills: true,
      // currentViewedWindow: 'ExplorationTab'

      currentViewedWindow: 'CombatTab'
    }
  },

  mounted() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },
  unmounted() {
    window.removeEventListener('resize', this.onResize);
  },

  methods: {
    toggleSidenav: function () {
      this.showSidenav = !this.showSidenav
      if (this.showSidenav == true && this.window.width > 920) {
        document.getElementById("idSidenav").style.transform = "translate(0px, 0px)";
        document.getElementById("idBacking").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        document.getElementById("idBacking").style.pointerEvents = "all";
        document.getElementById("idMain").style.marginLeft = "240px";
      } else if (this.showSidenav == true && this.window.width <= 920) {
        document.getElementById("idSidenav").style.transform = "translate(0px, 0px)";
        document.getElementById("idBacking").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        document.getElementById("idBacking").style.pointerEvents = "all";
        document.getElementById("idMain").style.marginLeft = "0px";
      } else {
        document.getElementById("idSidenav").style.transform = "translate(-240px, 0px)";
        document.getElementById("idBacking").style.backgroundColor = "rgba(0, 0, 0, 0)";
        document.getElementById("idBacking").style.pointerEvents = "none";
        document.getElementById("idMain").style.marginLeft = "0px";
      }
    },
    onResize: function () {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      if (this.window.width <= 920 && this.showSidenav == true) {
        this.toggleSidenav()
      }
    },
    debuggingBoop: function () {
      console.log('boop')
    },
  }
}
</script>

<template>
  <div class="main" id="idMain">

    <!-- Sidenav -->
    <div class="sidenav position-relatives" id="idSidenav">

      <!-- Logo (240x80) -->
      <div class="sidenav-logo">
        <img src="" alt="">
        <span>Dragon Idle RPG</span>
      </div>

      <!-- Inventory -->
      <div class="sidenav-item d-flex align-items-center" @click="currentViewedWindow = 'InventoryTab'">
        <img src="src/assets/12x/coins.png" alt="" style="height: 24px; width: 24px;">
        <span>Hoard</span>
      </div>
      <div class="sidenav-item d-flex align-items-center">
        <img src="src/assets/12x/shop.png" alt="" style="height: 24px; width: 24px;">
        <span>Shops</span>
      </div>

      <!-- Combat -->
      <div class="sidenav-category card-button" @click="showAllAffinities = !showAllAffinities">
        <span>Affinities </span>
      </div>

      <div class="sidenav-item d-flex align-items-center" @click="currentViewedWindow = 'CombatTab'">
        <img src="src/assets/12x/combat.png" alt="" style="height: 24px; width: 24px;">
        <span>Combat</span>
      </div>
      <div v-if="showAllAffinities == true">

        <div v-for="skill in skillStore.categoryCombat">

          <div class="sidenav-item d-flex align-items-center hover-box" v-if="skill.locked == false"
            @click="currentViewedWindow = 'CombatTab'">

            <img :src="skill.image" alt="" style="height: 24px; width: 24px;">

            <div class="flex-grow-1" style="translate: 0px -4px;">

              <div class="d-flex justify-content-between align-items-center" style="min-height: 1.8rem;">
                <div class="hover-show">
                  {{ skill.name }}
                </div>
                <div class="hover-hide little-levels">
                  ({{ skill.xp }}/{{ skill.xpNext }})
                </div>
                <div class="little-levels">
                  {{ skill.level }}/{{ skillStore.maxLevel }}
                </div>
              </div>

              <div class="progress sidenav-progress" role="attack time bar">
                <div class="progress-bar attack-progress"
                  :style="`width: ${(skill.xp - skill.xpPrev) / (skill.xpNext - skill.xpPrev) * 100}%;`">
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Skills -->
      <div class="sidenav-category card-button" @click="showAllSkills = !showAllSkills">
        <span>Skills </span>
      </div>

      <div v-if="showAllSkills == true">
        <!-- Skills and Skilling Accessories -->
        <div v-for="skill in skillStore.categorySkill">

          <div class="sidenav-item d-flex align-items-center justify-content-start hover-box"
            @click="currentViewedWindow = skill.name + 'Tab'" v-if="skill.locked == false">

            <img :src="skill.image" alt="" style="height: 24px; width: 24px;">

            <div class="d-flex flex-grow-1 justify-content-between align-items-center" style="min-height: 1.8rem;">
              <div class="hover-show">
                {{ skill.name }}
              </div>
              <div class="hover-hide little-levels">
                ({{ skill.xp }}/{{ skill.xpNext }})
              </div>
              <div class="little-levels">
                {{ skill.level }}/{{ skillStore.maxLevel }}
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Auxiliary -->
      <div class="sidenav-category">
        <span>Auxiliary </span>
      </div>

      <!-- <div class="sidenav-item d-flex align-items-center justify-content-start">
        <img src="src/assets/icons/testIcon12.png" alt="" style="height: 24px; width: 24px;">
        <span>Statistics</span>
      </div>
      <div class="sidenav-item d-flex align-items-center justify-content-start">
        <img src="src/assets/icons/testIcon12.png" alt="" style="height: 24px; width: 24px;">
        <span>Wiki</span>
      </div> -->
      <div class="sidenav-item d-flex align-items-center justify-content-start">
        <img src="src/assets/12x/discord.png" alt="" style="height: 24px; width: 24px;">
        <span>Discord</span>
      </div>
      <div class="sidenav-item d-flex align-items-center justify-content-start">
        <img src="src/assets/12x/about.png" alt="" style="height: 24px; width: 24px;">
        <span>About</span>
      </div>

      <!-- Settings Footer -->
      <div class="sidenav-category"></div>

      <div class="sidenav-footer rounded-top">
        <div class="content-container d-flex align-items-center justify-content-start">
          <img src="src/assets/12x/settings.png" alt="" style="height: 24px; width: 24px;">
          <span>Settings</span>
        </div>
      </div>
    </div>

    <div class="backing" id="idBacking" @click="toggleSidenav"></div>

    <!-- Current Activity Header -->
    <header class="content-header d-flex px-3 flex-row align-items-center justify-content-between sticky"
      :style="{ 'background-color': this.skillStore.currentColor }">
      <div class="d-flex align-items-center gap-3">

        <button type="button" class="btn btn-dark shadow-none" @click="toggleSidenav">☰</button>

        <div class="current-activity">
          <span>
            {{ this.skillStore.currentCat }} {{ this.skillStore.currentActivity.name }}
          </span>
        </div>
      </div>
    </header>

    <!-- Main Window -->
    <div class="d-flex justify-content-center px-3">
      <component :is="currentViewedWindow" />
    </div>
  </div>
</template>

<style>
.main {
  padding: 0px;
  height: 100vh;
  font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 1.2rem;
  font-weight: 600;
  margin-left: 240px;
  transition: margin-left 0.3s;
  animation-timing-function: ease-out;
  background-color: rgb(56, 67, 87);
  overflow-y: scroll;
}
.main-window {
  border-width: 0;
}
.content-container {
  padding: 1rem;
}

.content-header {
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
}

.collapsing {
  -webkit-transition: none;
  transition: unset !important;
  display: none;
}

.little-levels {
  font-size: 0.9rem;
  font-weight: 500;
}
.tiny-levels {
  font-size: 0.8rem;
  font-weight: 500;
}
.dark-text {
  color: gray;
  font-weight: 500;
}
.info-text {
  color: rgb(146, 186, 255);
  font-weight: 500;
}

.sidenav {
  height: 100vh;
  width: 240px;
  position: fixed;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  z-index: 10;
  top: 0;
  left: 0;
  padding-top: 0;
  background-color: rgb(30, 38, 51);
  transition: transform 0.3s;
  animation-timing-function: ease-out;
}
.sidenav-logo {
  color: gray;
  background-color: rgb(37, 46, 61);
  display: flex;
  align-items: center;
  height: 79px;
  margin-bottom: 0.5rem;
  padding-top: 40px;
  padding-bottom: 39px;
}
.sidenav-logo img {
  width: 32px;
  margin-right: 10px;
}
.sidenav-logo:hover {
  color: white;
}
.sidenav-category {
  padding: 0.3rem 1rem;
  margin-top: 0.5rem;
  color: gray;
  display: block;
  font-size: smaller;
}
.sidenav-item {
  padding: 0.2rem 0.8rem 0.2rem 1rem;
  color: lightgray;
  display: block;
  cursor: pointer;
}
.sidenav-item:not(.locked):hover {
  background-color: #04AA6D;
  color: white;
}
.sidenav-item img {
  width: 32px;
  margin-right: 10px;
}
.sidenav-footer {
  margin-top: auto;
  width: 234px;
  background-color: rgb(37, 46, 61);
  color: #b8b8b8;
}
.sidenav-footer img {
  width: 32px;
  margin-right: 10px;
}
.sidenav-footer:hover {
  background-color: #04AA6D;
  color: white;
}
.sidenav::-webkit-scrollbar {
  width: 6px;
}
.sidenav::-webkit-scrollbar-track {
  background: #2c343f;
}
.sidenav::-webkit-scrollbar-thumb {
  background: rgba(109, 109, 109, 0.5);
}
.sidenav::-webkit-scrollbar-thumb:hover {
  background: #727272;
}

@media (max-width: 920px) {
  .backing {
    display: inline-block;
    left: 0;
    width: 925px;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0);
    position: fixed;
    z-index: 5;
    pointer-events: none;
  }
}

.current-activity {
  font-size: 1rem;
  color: white;
}

.top-info {
  max-width: 64rem;
}

.card {
  background-color: rgb(37, 46, 61);
  color: gray;
}
.card-footer {
  background-color: rgb(30, 38, 51);
  color: gray;
}
.card-big {
  background-color: rgb(30, 38, 51);
  color: lightgray;
}
.card-activity:hover {
  background-color: #187379;
  color: white;
  border-top-right-radius: 0.3rem;
  border-top-left-radius: 0.3rem;
  cursor: pointer;
}

.btn.activity {
  background-color: rgb(94, 120, 165);
  border: none;
  font-weight: 600;
}
.btn:hover {
  background-color: #04AA6D;
  color: white;
}

.disabled {
  border-style: none;
}

.xp-progress {
  background-color: #04AA6D;
}
.mastery-progress {
  background-color: rgb(94, 120, 165);
}
.attack-progress {
  background-color: rgb(110, 144, 204);
}
.health-progress {
  background-color: rgb(211, 101, 101);
}
.sidenav-progress {
  height: 5px;
  background-color: rgb(52, 62, 80);
  translate: 0px -2px;
  margin-bottom: -2px;
}
.progress-bar {
  transition: 0.10s;
}

.hover-box {
  position: relative;
}
.hover-box .hover-hide {
  display: none;
}
.hover-box:hover .hover-hide {
  display: block;
}
.hover-box:hover .hover-show {
  display: none;
}

.smol-badge{
  background-color: rgb(94, 120, 165);
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}

.bigger-levels {
  font-size: smaller;
}
.card-button:hover {
  background-color: rgb(94, 120, 165);
  color: white;
  cursor: pointer;
}

.equipment-card {
  background-color: rgb(52, 62, 80);
}
.equipment-card:hover {
  background-color: rgb(94, 120, 165);
  color: white;
  cursor: pointer;
}

.equipped-card {
  background-color: #585440;
  cursor: pointer;
}
.equipped-card:hover {
  background-color: #8b8668;
}

.tooltip-b .tooltip-text {
  visibility: hidden;
  background-color: #212529;
  color: lightgray;
  font-size: 1rem;
  text-align: center;
  margin-top: 5px;
  padding-bottom: 3px;
  border-radius: 4px;
  cursor: default;
  pointer-events: none;

  position: absolute;
  z-index: 1;
  width: 12rem;
  top: 100%;
  margin-left: -1rem;
}
.tooltip-b:hover .tooltip-text {
  visibility: visible;
}

.tooltip-bcf .tooltip-text {
  visibility: hidden;
  background-color: #212529;
  color: lightgray;
  font-size: 1rem;
  text-align: center;
  margin-top: 5px;
  padding-bottom: 3px;
  border-radius: 4px;
  cursor: default;
  pointer-events: none;

  position: absolute;
  z-index: 1;
  width: 10rem;
  top: 100%;
  left: 50%;
  transform: translate(-50%);
}
.tooltip-bcf:hover .tooltip-text {
  visibility: visible;
}

.tooltip-br .tooltip-text {
  visibility: hidden;
  background-color: #212529;
  color: lightgray;
  font-size: 1rem;
  text-align: center;
  margin-top: 5px;
  padding-bottom: 3px;
  border-radius: 4px;
  cursor: default;
  pointer-events: none;

  position: absolute;
  z-index: 1;
  width: 12rem;
  top: 100%;
  margin-left: -6rem;
}
.tooltip-br:hover .tooltip-text {
  visibility: visible;
}

.tooltip-be .tooltip-text {
  visibility: hidden;
  background-color: #212529;
  color: lightgray;
  font-size: 1rem;
  text-align: center;
  margin-top: 5px;
  padding-bottom: 3px;
  border-radius: 4px;
  cursor: default;
  pointer-events: none;

  position: absolute;
  z-index: 1;
  width: 10rem;
  top: calc(55% + 5px);
  left: 50%;
  transform: translate(-50%);
}
.tooltip-be:hover .tooltip-text {
  visibility: visible;
}

.tooltip-be2 .tooltip-text {
  visibility: hidden;
  background-color: #212529;
  color: lightgray;
  font-size: 1rem;
  text-align: center;
  margin-top: 5px;
  padding-bottom: 3px;
  border-radius: 4px;
  cursor: default;
  pointer-events: none;

  position: absolute;
  z-index: 1;
  width: 12rem;
  top: calc(35%);
  left: 50%;
  transform: translate(-50%);
}
.tooltip-be2:hover .tooltip-text {
  visibility: visible;
}

.tooltip-be3 .tooltip-text {
  visibility: hidden;
  background-color: #212529;
  color: lightgray;
  font-size: 1rem;
  text-align: center;
  margin-top: 5px;
  padding-bottom: 3px;
  border-radius: 4px;
  cursor: default;
  pointer-events: none;

  position: absolute;
  z-index: 1;
  width: 12rem;
  left: 50%;
  transform: translate(-50%);
}
.tooltip-be3:hover .tooltip-text {
  visibility: visible;
}

.crafting-activities {
  max-width: 46.5rem;
}
.card-list {
  height: 5.5rem;
  width: 23rem;
  min-width: 23rem;
}

@media (max-width: 82rem) {
  .crafting-activities {
    max-width: calc(100% - 17.3rem);
  }
}

@media (max-width: 44rem) {
  .crafting-activities {
    max-width: 25rem;
  }
}

.modal {
  position: fixed;
  z-index: 20;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.modal-backing {
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  pointer-events: all;
}

.hide-modal {
  display: none;
}
.show-modal {
  display: block;
}

/* Modal Content/Box */
.modal-content {
  background-color: rgb(37, 46, 61);
  color: lightgray;
  border: 1px solid gray;
  max-width: 95%;
  margin: 5% auto;
  z-index: 1
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

</style>
