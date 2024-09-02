<script>
import { useSkillStore } from '@/stores/skills'
import { useItemStore } from '@/stores/inventory'

export default {
  name: 'ShopTab',
  setup() {
    const skillStore = useSkillStore()
    const itemStore = useItemStore()
    return { skillStore, itemStore }
  },
  data() {
    return {
      shownMenu: 0,
      showGuideModal: false,
    }
  },
  methods: {
    hasCount(temp) {
      return temp.filter(blep => blep.count > 0)
    },

    tryBuyCombat() {
      if (this.itemStore.hasItemCount('money', 10, 'resourceItems') == true && this.itemStore.hasItemCount('meatChop', 1, 'consumableItems') == true) {
        this.skillStore.unlockCombat()
        this.itemStore.changeItemCount('money', -10, 'resourceItems')
        this.itemStore.changeItemCount('meatChop', -1, 'consumableItems')
      }
    },
    tryBuyRanged() {
      if (this.itemStore.hasItemCount('money', 400, 'resourceItems') == true && this.itemStore.hasItemCount('copperArrow', 1, 'equipmentItems') == true) {
        this.skillStore.unlockSkill(2)
        this.skillStore.unlockSkill(5)
        this.itemStore.changeItemCount('money', -400, 'resourceItems')
        this.itemStore.changeItemCount('copperArrow', -1, 'equipmentItems')
      }
    },
    tryBuyMagic() {
      if (this.itemStore.hasItemCount('money', 800, 'resourceItems') == true && this.itemStore.hasItemCount('charge1', 1, 'equipmentItems') == true) {
        this.skillStore.unlockSkill(3)
        this.skillStore.unlockSkill(6)
        this.itemStore.changeItemCount('money', -800, 'resourceItems')
        this.itemStore.changeItemCount('charge1', -1, 'equipmentItems')
      }
    },

    tryBuySmithing() {
      if (this.itemStore.hasItemCount('money', 10, 'resourceItems') == true && this.itemStore.hasItemCount('ore1', 1, 'resourceItems') == true) {
        this.skillStore.unlockSkill(16)
        this.itemStore.changeItemCount('money', -10, 'resourceItems')
        this.itemStore.changeItemCount('ore1', -1, 'resourceItems')
      }
    },
    tryBuyCooking() {
      if (this.itemStore.hasItemCount('money', 80, 'resourceItems') == true && this.itemStore.hasItemCount('plant1', 5, 'resourceItems') == true) {
        this.skillStore.unlockSkill(20)
        this.itemStore.changeItemCount('money', -80, 'resourceItems')
        this.itemStore.changeItemCount('plant1', -5, 'resourceItems')
      }
    },

  },
}
</script>

<template>
  <div class="d-flex pt-3 pb-4 pe-2 main-window bg-transparent gap-1" style="width: 82rem;">

    <!-- Skill Shop -->
    <div class="pb-5 w-100" v-if="shownMenu == 0">
      <div class="d-flex flex-wrap gap-1 pb-1">
        <div class="card pb-1">

          <!-- Title Header -->
          <div class="p-0">
            <div class="px-3">Skills</div>
          </div>

          <!-- Actual Data -->
          <div class="d-flex flex-wrap gap-1 pt-1 px-2" style="min-height: 4rem;">

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 250px"
              v-if="skillStore.flags.showCombat == false" @click="tryBuyCombat()">
              <div class="d-flex justify-content-start">
                <img style="width: 60px; height: 60px;" src="src/assets/12x/combat.png">
                <div>
                  Combat
                  <div class="little-levels">
                    10 <img style="width: 32px; height: 32px;" src="src/assets/icons/coins.png" alt="">
                    1 <img style="width: 32px; height: 32px;" src="src/assets/icons/rawchop.png" alt="">
                  </div>
                </div>
              </div>
            </div>

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 250px"
              v-if="skillStore.flags.showCombat == true && skillStore.skills[2].locked == true && ((skillStore.flags.showHug == false && skillStore.flags.pacifist == true) || skillStore.flags.pacifist == false)"
              @click="tryBuyRanged()">
              <div class="d-flex justify-content-start">
                <img style="width: 60px; height: 60px;" src="src/assets/12x/ranged.png">
                <div>
                  Ranged
                  <div class="little-levels">
                    400 <img style="width: 32px; height: 32px;" src="src/assets/icons/coins.png" alt="">
                    1 <img style="width: 32px; height: 32px;" src="src/assets/icons/copperarrow.png" alt="">
                  </div>
                </div>
              </div>
            </div>

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 250px"
              v-if="skillStore.flags.showCombat == true && skillStore.skills[3].locked == true && ((skillStore.flags.showHug == false && skillStore.flags.pacifist == true) || skillStore.flags.pacifist == false)"
              @click="tryBuyMagic()">
              <div class="d-flex justify-content-start">
                <img style="width: 60px; height: 60px;" src="src/assets/12x/spirit.png">
                <div>
                  Magic
                  <div class="little-levels">
                    800 <img style="width: 32px; height: 32px;" src="src/assets/icons/coins.png" alt="">
                    1 <img style="width: 32px; height: 32px;" src="src/assets/icons/charge1.png" alt="">
                  </div>
                </div>
              </div>
            </div>

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 250px"
              v-if="skillStore.skills[16].locked == true" @click="tryBuySmithing()">
              <div class="d-flex justify-content-start">
                <img style="width: 60px; height: 60px;" src="src/assets/12x/smithing.png">
                <div>
                  Smithing
                  <div class="little-levels">
                    10 <img style="width: 32px; height: 32px;" src="src/assets/icons/coins.png" alt="">
                    1 <img style="width: 32px; height: 32px;" src="src/assets/icons/copperore.png" alt="">
                  </div>
                </div>
              </div>
            </div>

            <div class="btn sidenav-item px-2 py-1 disabled" style="font-size: 1.2rem; font-weight: 500; width: 250px">
              <div class="d-flex justify-content-start">
                <img style="width: 60px; height: 60px;" src="src/assets/12x/fletching.png">
                <div>
                  Fletching
                  <div class="little-levels">
                    400 <img style="width: 32px; height: 32px;" src="src/assets/icons/coins.png" alt="">
                    15 <img style="width: 32px; height: 32px;" src="src/assets/icons/feather.png" alt="">
                  </div>
                </div>
              </div>
            </div>

            <div class="btn sidenav-item px-2 py-1 disabled" style="font-size: 1.2rem; font-weight: 500; width: 250px">
              <div class="d-flex justify-content-start">
                <img style="width: 60px; height: 60px;" src="src/assets/12x/artiface.png">
                <div>
                  Artifice
                  <div class="little-levels">
                    800 <img style="width: 32px; height: 32px;" src="src/assets/icons/coins.png" alt="">
                    1 <img style="width: 32px; height: 32px;" src="src/assets/icons/rune1.png" alt="">
                  </div>
                </div>
              </div>
            </div>

            <div class="btn sidenav-item px-2 py-1 disabled" style="font-size: 1.2rem; font-weight: 500; width: 250px">
              <div class="d-flex justify-content-start">
                <img style="width: 60px; height: 60px;" src="src/assets/12x/tailoring.png">
                <div>
                  Tailoring
                  <div class="little-levels">
                    200 <img style="width: 32px; height: 32px;" src="src/assets/icons/coins.png" alt="">
                    1 <img style="width: 32px; height: 32px;" src="src/assets/icons/wool.png" alt="">
                  </div>
                </div>
              </div>
            </div>

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 250px"
              v-if="skillStore.skills[20].locked == true" @click="tryBuyCooking()">
              <div class="d-flex justify-content-start">
                <img style="width: 60px; height: 60px;" src="src/assets/12x/cooking.png">
                <div>
                  Cooking
                  <div class="little-levels">
                    50 <img style="width: 32px; height: 32px;" src="src/assets/icons/coins.png" alt="">
                    5 <img style="width: 32px; height: 32px;" src="src/assets/icons/oak.png" alt="">
                  </div>
                </div>
              </div>
            </div>

            <div class="btn sidenav-item px-2 py-1 disabled" style="font-size: 1.2rem; font-weight: 500; width: 250px">
              <div class="d-flex justify-content-start">
                <img style="width: 60px; height: 60px;" src="src/assets/12x/alchemy.png">
                <div>
                  Alchemy
                  <div class="little-levels">
                    2000 <img style="width: 32px; height: 32px;" src="src/assets/icons/coins.png" alt="">
                    1 <img style="width: 32px; height: 32px;" src="src/assets/icons/rune2.png" alt="">
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<style scoped></style>
