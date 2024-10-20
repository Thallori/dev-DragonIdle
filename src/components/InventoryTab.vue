<script>
import { useSkillStore } from '@/stores/skills'
import { useItemStore } from '@/stores/inventory'
import { useSmithingStore } from '@/stores/smithing'
import { useCookingStore } from '@/stores/cooking'

import equipstats from './panels/equipstats.vue'
import tooltips from './panels/tooltips.vue'

export default {
  name: 'InventoryTab',
  components: {
    equipstats,
    tooltips,
  },
  setup() {
    const skillStore = useSkillStore()
    const itemStore = useItemStore()
    const smithingStore = useSmithingStore()
    const cookingStore = useCookingStore()
    return { skillStore, itemStore, smithingStore, cookingStore }
  },
  data() {
    return {
      sideMenu: 2,
      activeObject: {},
      sellAmount: 1,
    }
  },
  methods: {
    hasCount(temp) {
      return temp.filter(t => t.count > 0)
    },
    sellItem(temp, tempAmount) {
      if (tempAmount == '') {
        tempAmount = 1
      }
      if (temp.count > 0) {
        temp.count -= tempAmount
        this.itemStore.changeItemCount('money', (temp.sellPrice * tempAmount), 'resourceItems')
      }
    },

    bonusSmithingMastery(temp) {
      if (temp.mSmithing) {
        temp = this.smithingStore.equipmentMastery.find(t => t.id === temp.mSmithing)
        return temp.mLevel
      }
      return 0
    },
    bonusHeals(temp) {
      temp = this.cookingStore.activities.find(t => t.itemID === temp.id)
      return temp.mLevel
    },
  },
}
</script>

<template>
  <div class="d-flex py-4 pe-2 main-window bg-transparent gap-1" style="width: 82rem;">

    <!-- All Items -->
    <div class="w-100 pb-5">

      <!-- Equipment -->
      <div class="card w-100 my-1" style="min-height: 6rem;">

        <!-- Title Header -->
        <div class="p-0">
          <div class="px-3">Equipment</div>
        </div>

        <!-- Actual Data -->
        <div class="d-flex justify-content-start flex-wrap gap-2 p-2">
          <div v-for="inventoryItem in hasCount(itemStore.equipmentItems)">

            <!-- Card of Item -->
            <div class="card tooltip-b" :class="inventoryItem.onEquip ? 'equipped-card' : 'equipment-card'"
              style="width: 58px; height: 58px;" @dblclick="itemStore.equipItem(inventoryItem)"
              @click="activeObject = inventoryItem;">

              <!-- Tooltip -->
              <div class="tooltip-text">
                <tooltips :itemObject="inventoryItem" />
              </div>

              <!-- Image of Item -->
              <img class="mx-auto my-auto" :src="inventoryItem.image" alt="" width="48" height="48">

              <!-- Count of Item -->
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

      <!-- Consumables -->
      <div class="card w-100 my-1" style="min-height: 6rem;">
        <div class="p-0">
          <div class="px-3">Consumables</div>
        </div>

        <div class="d-flex justify-content-start flex-wrap gap-2 p-2">
          <div v-for="inventoryItem in hasCount(itemStore.consumableItems)">

            <!-- Card of Item -->
            <div class="card tooltip-b" :class="inventoryItem.onEquip ? 'equipped-card' : 'equipment-card'"
              style="width: 58px; height: 58px;" @dblclick="itemStore.equipItem(inventoryItem)"
              @click="activeObject = inventoryItem; sideMenu = 1;">

              <!-- Tooltip -->
              <div class=" tooltip-text">
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

      <!-- Resources -->
      <div class="card w-100 my-1" style="min-height: 6rem;">
        <div class="p-0">
          <div class="px-3">Resources</div>
        </div>

        <div class="d-flex justify-content-start flex-wrap gap-2 p-2">
          <div v-for="inventoryItem in hasCount(itemStore.resourceItems)">

            <!-- Card of Item -->
            <div class="card tooltip-b equipment-card" style="width: 58px; height: 58px;"
              @click="activeObject = inventoryItem; sideMenu = 1;">

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

      <!-- Mechanics -->
      <div class="card w-100 my-1" style="min-height: 6rem;" v-if="skillStore.flags.showMechanics == true">
        <div class="p-0">
          <div class="px-3">Timeless</div>
        </div>

        <div class="d-flex justify-content-start flex-wrap gap-2 p-2">
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

    <!-- Side Panel -->
    <div>
      <div class="d-flex gap-2 pt-1" style="min-width: 18rem;">
        <div class="card equipment-card text-center w-50" @click="sideMenu = 1">
          Item
        </div>
        <div class="card equipment-card text-center w-50" @click="sideMenu = 2">
          Stats
        </div>
      </div>

      <!-- Item Panel -->
      <!-- messy stuff -->
      <div class="card text-center align-items-center my-1 py-2" style="min-width: 18rem; min-height: 15rem;"
        v-if="sideMenu == 1">

        <div class="pb-2">
          {{ activeObject.name }}
          <span v-if="activeObject.count > 1">
            ({{ (activeObject.count).toLocaleString() }})
          </span>
        </div>

        <!-- Equip Tool -->
        <div class="btn sidenav-item px-2 py-1 activity mb-2" style="font-size: 1.2rem; font-weight: 500; width: 200px"
          :class="activeObject.id == itemStore.equippedTools[activeObject.toolSlot].id ? 'bg-secondary' : ''"
          v-if="activeObject.isTool && activeObject.count > 0" @click="itemStore.equipItem(activeObject)">

          <span v-if="activeObject.id == itemStore.equippedTools[activeObject.toolSlot].id == false">Use Tool</span>
          <span v-if="activeObject.id == itemStore.equippedTools[activeObject.toolSlot].id == true">Store Tool</span>
        </div>

        <!-- Equip Combat -->
        <div class="btn sidenav-item px-2 py-1 activity mb-2" style="font-size: 1.2rem; font-weight: 500; width: 200px"
          :class="activeObject.id == itemStore.equippedCombat[activeObject.slot].id ? 'bg-secondary' : ''"
          v-if="(activeObject.isCombat || activeObject.isFood) && activeObject.count > 0"
          @click="itemStore.equipCombatTool(activeObject)">

          <span v-if="activeObject.id == itemStore.equippedCombat[activeObject.slot].id == false">Equip Combat</span>
          <span v-if="activeObject.id == itemStore.equippedCombat[activeObject.slot].id == true">Unequip Combat</span>
        </div>

        <!-- Sell if Not Equipped -->
        <div v-if="activeObject.sellPrice && activeObject.onEquip != true">

          <!-- Sell X Button -->
          <div v-if="activeObject.sellPrice && activeObject.count > 2">
            <div class="btn sidenav-item px-2 py-1 bg-danger mt-1"
              style="font-size: 1.2rem; font-weight: 500; width: 200px" @click="sellItem(activeObject, sellAmount)">

              Sell

              <span v-if="sellAmount < activeObject.count">X</span>
              <span v-else>All</span>

              ({{ (activeObject.sellPrice * Math.max(1, sellAmount)).toLocaleString() }}<img class="mx-0"
                src="/src/assets/icons/coins.png" alt="">)
            </div>

            <input class="little-levels text-end form-control mt-1 py-0" type="number"
              @input="() => { if (sellAmount > activeObject.count || sellAmount < 0) { sellAmount = activeObject.count } sellAmount = Math.floor(sellAmount) }"
              v-model="sellAmount" @click="sellAmount = ''">
          </div>

          <div class="btn sidenav-item px-2 py-1 bg-danger my-1"
            style="font-size: 1.2rem; font-weight: 500; width: 200px" v-if="activeObject.count > 1"
            @click="sellItem(activeObject, 1)">

            Sell ({{ (activeObject.sellPrice).toLocaleString() }}<img class="mx-0" src="/src/assets/icons/coins.png"
              alt="">)
          </div>

          <div class="btn sidenav-item px-2 py-1 bg-danger my-1"
            style="font-size: 1.2rem; font-weight: 500; width: 200px" v-if="activeObject.count > 0"
            @click="sellItem(activeObject, activeObject.count); activeObject = {}">

            Sell All ({{ (activeObject.sellPrice * activeObject.count).toLocaleString() }}<img class="mx-0"
              src="/src/assets/icons/coins.png" alt="">)
          </div>
        </div>

        <!-- Sell If Equipped, All But One -->
        <div v-if="activeObject.sellPrice && activeObject.onEquip == true">

          <!-- Sell X Button -->
          <div v-if="activeObject.sellPrice && activeObject.count > 3">
            <div class="btn sidenav-item px-2 py-1 bg-danger" style="font-size: 1.2rem; font-weight: 500; width: 200px"
              @click="sellItem(activeObject, sellAmount)">

              Sell

              <span v-if="sellAmount < activeObject.count - 1">X</span>
              <span v-else>All</span>

              ({{ (activeObject.sellPrice * Math.max(1, sellAmount)).toLocaleString() }}<img class="mx-0"
                src="/src/assets/icons/coins.png" alt="">)

            </div>

            <input class="little-levels text-end form-control mt-1 py-0" type="number"
              @input="() => { if (sellAmount > (activeObject.count - 1) || sellAmount < 0) { sellAmount = (activeObject.count - 1) } sellAmount = Math.floor(sellAmount) }"
              v-model="sellAmount" @click="sellAmount = ''">
          </div>

          <div class="btn sidenav-item px-2 py-1 bg-danger my-1"
            style="font-size: 1.2rem; font-weight: 500; width: 200px" @click="sellItem(activeObject, 1)"
            v-if="activeObject.count > 1">

            Sell ({{ (activeObject.sellPrice).toLocaleString() }}<img class="mx-0" src="/src/assets/icons/coins.png"
              alt="">)

          </div>

          <div class="btn sidenav-item px-2 py-1 bg-danger my-1"
            style="font-size: 1.2rem; font-weight: 500; width: 200px" v-if="activeObject.count > 2"
            @click="sellItem(activeObject, activeObject.count - 1);">

            Sell All ({{ (activeObject.sellPrice * (activeObject.count - 1)).toLocaleString() }}<img class="mx-0"
              src="/src/assets/icons/coins.png" alt="">)
          </div>
        </div>

        <div class="btn sidenav-item px-2 py-1 bg-secondary my-2"
          style="font-size: 1.2rem; font-weight: 500; width: 220px" @click="sideMenu = 2">
          Cancel
        </div>

      </div>

      <!-- Equip Panel -->
      <equipstats v-if="sideMenu == 2" />
    </div>

  </div>
</template>

<style scoped></style>
