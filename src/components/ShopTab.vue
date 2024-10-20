<script>
import { useSkillStore } from '@/stores/skills'
import { useItemStore } from '@/stores/inventory'
import { useShopStore } from '@/stores/shop'

import skillbuy from './panels/skillbuy.vue'
import tooltips from './panels/tooltips.vue'

export default {
  name: 'ShopTab',
  components: {
    tooltips,
    skillbuy,
  },
  setup() {
    const skillStore = useSkillStore()
    const itemStore = useItemStore()
    const shopStore = useShopStore()
    return { skillStore, itemStore, shopStore }
  },
  data() {
    return {
      shownMenu: 0,
      shownGuideModal: 0,
      buyAmount: 1,
    }
  },
  methods: {
    tryBuyCoins(temp) {
      if (this.buyAmount == '') {
        this.buyAmount = 1
      }
      //if has money
      if (temp.price != undefined) {
        if (this.itemStore.hasItemCount('money', temp.price * this.buyAmount, 'resourceItems')) {

          this.itemStore.changeItemCount('money', 0 - (temp.price * this.buyAmount), 'resourceItems')
          this.itemStore.changeItemCount(temp.id, this.buyAmount)
        }
        return
      }
    },
    tryBuy1(temp) {
      //if has items
      if (temp.price1 != undefined && temp.price2 != undefined) {
        if (this.itemStore.hasItemCount(temp.price1[0], temp.price1[1], temp.price1[2]) && this.itemStore.hasItemCount(temp.price2[0], temp.price2[1], temp.price2[2])) {

          this.itemStore.changeItemCount(temp.price1[0], 0 - temp.price1[1], temp.price1[2])
          this.itemStore.changeItemCount(temp.price2[0], 0 - temp.price2[1], temp.price2[2])
          this.itemStore.changeItemCount(temp.id, 1)
        }
        return
      }
      //if has item
      if (temp.price1 != undefined) {
        if (this.itemStore.hasItemCount(temp.price1[0], temp.price1[1], temp.price1[2])) {

          this.itemStore.changeItemCount(temp.price1[0], 0 - temp.price1[1], temp.price1[2])
          this.itemStore.changeItemCount(temp.id, 1)
        }
        return
      }
    },
    tryBuy2(temp) {
      //if has items
      if (this.itemStore.hasItemCount(temp.price1[0], temp.price1[1], temp.price1[2]) && this.itemStore.hasItemCount(temp.price2[0], temp.price2[1], temp.price2[2])) {
        if (temp.requiresCombat == true) {
          this.skillStore.flags.showCombat = true
          this.skillStore.unlockSkill(0)
          this.skillStore.unlockSkill(7)
        }
        let unlockA = temp.unlocks[0] ?? 9 //exploration if there is no first unlock
        let unlockB = temp.unlocks[1] ?? 9 //exploration if there is no second unlock
        this.skillStore.unlockSkill(unlockA)
        this.skillStore.unlockSkill(unlockB)
        
        this.itemStore.changeItemCount(temp.price1[0], 0 - temp.price1[1], temp.price1[2])
        this.itemStore.changeItemCount(temp.price2[0], 0 - temp.price2[1], temp.price2[2])
      }
    },
  },
}
</script>

<template>
  <div class="d-flex py-4 pe-2 main-window bg-transparent gap-1" style="width: 82rem;">

    <!-- All Cards -->
    <div class="w-100 pb-5">

      <!-- Menu Menu -->
      <div class="px-5 pb-1 w-100">
        <div class="d-flex flex-wrap justify-content-center gap-1">

          <!-- Talk Button -->
          <!-- <div class="card card-activity align-items-center py-2" style="width: 67px; height: 67px;">
            <img src="/src/assets/12x/questionmark.png" alt="" width="48" height="48">
            <div class="stretched-link" @click="shownGuideModal = true"></div>
          </div> -->

          <!-- Menu Selector -->
          <div class="card flex-grow-1">
            <div class="d-flex m-auto">

              <span>
                Buy Something Will Ya?
              </span>

              <!-- <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 150px"
              @click="toggleMenus(0)">
              <div class="d-flex justify-content-start">
                <img src="/src/assets/icons/defaultmap.png" alt="" width="32" height="32">Areas
              </div>
            </div>

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 150px"
              @click="toggleMenus(1)">
              <div class="d-flex justify-content-start">
                <img src="/src/assets/icons/steelsword16.png" alt="" width="32" height="32">Sequences
              </div>
            </div> -->

            </div>
          </div>

          <!-- Buy X Button -->
          <div class="card" style="max-width: 6rem;">
            <div class="dropdown">
              <button class="btn text-white activity dropdown-toggle w-100" type="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Buy X
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item text-end" @click="buyAmount = 1">x1</a></li>
                <li><a class="dropdown-item text-end" @click="buyAmount = 10">x10</a></li>
                <li><a class="dropdown-item text-end" @click="buyAmount = 50">x50</a></li>
                <li><a class="dropdown-item text-end" @click="buyAmount = 100">x100</a></li>
                <li><a class="dropdown-item text-end" @click="buyAmount = 1000">x1,000</a></li>
                <!-- <li><a class="dropdown-item text-end" @click="buyAmount = 'Max'">Max</a></li> -->
              </ul>
            </div>

            <div>
              <input class="little-levels text-end form-control mt-1 py-0" type="number"
                @input="() => { if (buyAmount < 1) { buyAmount = '' } if (buyAmount > 100000) { buyAmount = 100000 } buyAmount = Math.floor(buyAmount) }"
                @click="buyAmount = ''" v-model="buyAmount">
            </div>
          </div>
        </div>
      </div>

      <!-- Items -->
      <div class="card card-big mb-2" style="min-height: 6rem;">

        <!-- Title Header -->
        <div class="card-header little-levels dark-text py-0">
          Items
        </div>

        <!-- Actual Data -->
        <div class="d-flex flex-wrap gap-1 pt-2 px-2">
          <div v-for="itembuy in shopStore.items">
            <div v-if="this.skillStore.maxLevel >= itembuy.sequence + 1">

              <div class="card darkequipment-card sidenav-item2 little-levels tooltip-b" style="width: 200px"
                @click="tryBuyCoins(itembuy)">

                <div class="tooltip-text">
                  <tooltips :itemObject="itemStore.getItemData(itembuy.id)" :money="false" />
                </div>

                <div class="d-flex">
                  <img style="width: 48px; height: 48px;" :src="itemStore.getItemImage(itembuy.id)">
                  <div class="ms-2 text-white">
                    {{ itemStore.getItemName(itembuy.id) }}

                    <div class="d-flex">
                      <div>
                        {{ (itembuy.price * Math.max(1, this.buyAmount)).toLocaleString() }}
                        <img class="mx-1" style="width: 24px; height: 24px;" src="/src/assets/12x/coins.png" alt="">
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card-img-overlay my-4">
                  <span class="position-relative little-levels badge bg-secondary"
                    style="translate: -10px -45px; padding: 0.25rem;">
                    {{ itemStore.getItemCount(itembuy.id).toLocaleString(undefined, { notation: 'compact' }) }}
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div class="dark-text little-levels mx-3 mb-1">
          Shop will expand after
          <span v-if="skillStore.maxLevel < 4">
            completing sequence 3
          </span>
          <span v-else-if="skillStore.maxLevel < 19">
            a future update
          </span>
        </div>
      </div>

      <!-- Equipment -->
      <div class="card card-big mb-2" style="min-height: 6rem;">

        <!-- Title Header -->
        <div class="card-header little-levels dark-text py-0">
          Equipment
        </div>

        <!-- Actual Data -->
        <div class="d-flex flex-wrap gap-1 p-2">
          <div v-for="itembuy in shopStore.equipment">
            <div v-if="this.skillStore.maxLevel >= itembuy.sequence + 1">

              <div class="card darkequipment-card sidenav-item2 little-levels tooltip-b" style="width: 200px"
                @click="tryBuy1(itembuy)">

                <div class="tooltip-text">
                  <tooltips :itemObject="itemStore.getItemData(itembuy.id)" :money="false" />
                </div>

                <div class="d-flex align-items-center">
                  <img style="width: 48px; height: 48px;" :src="itemStore.getItemImage(itembuy.id)">
                  <div class="ms-2 text-white">
                    {{ itemStore.getItemName(itembuy.id) }}

                    <div class="d-flex gap-2">
                      <div>
                        {{ itembuy.price1[1] }}
                        <img style="width: 32px; height: 32px;"
                          :src="itemStore.getItemImage(itembuy.price1[0], itembuy.price1[2])" alt="">
                      </div>

                      <div v-if="itembuy.price2">
                        {{ itembuy.price2[1] }}
                        <img style="width: 32px; height: 32px;"
                          :src="itemStore.getItemImage(itembuy.price2[0], itembuy.price2[2]) " alt="">
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card-img-overlay my-4">
                  <span class="position-relative little-levels badge bg-secondary"
                    style="translate: -10px -45px; padding: 0.25rem;">
                    {{ itemStore.getItemCount(itembuy.id).toLocaleString(undefined, { notation: 'compact' }) }}
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div class="card card-big mb-2" style="min-height: 6rem;">

        <!-- Title Header -->
        <div class="card-header little-levels dark-text py-0">
          Skills
        </div>

        <!-- Actual Data -->
        <div class="d-flex flex-wrap p-1">
          <!-- rest -->
          <div v-for="nthing in shopStore.skills">
            <skillbuy class="m-1" :buyObject="nthing" @click="tryBuy2(nthing)"
              v-if="skillStore.skills[nthing.unlocks[0]].locked == true" />
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped></style>
