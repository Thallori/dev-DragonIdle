<script>
import { useItemStore } from '@/stores/inventory';
import { useSmithingStore } from '@/stores/smithing';
import { useCookingStore } from '@/stores/cooking';

import equipstats from './panels/equipstats.vue';
import tooltips from './panels/tooltips.vue';

export default {
  name: 'InventoryTab',
  components: {
    equipstats,
    tooltips,
  },
  setup() {
    const itemStore = useItemStore()
    const smithingStore = useSmithingStore()
    const cookingStore = useCookingStore()
    return { itemStore, smithingStore, cookingStore }
  },
  data() {
    return {
      skillID: 13,
      equippedback: { width: '400px' }
    }
  },
  methods: {
    hasCount(temp) {
      return temp.filter(blep => blep.count > 0)
    },
    bonusSmithingMastery(temp) {
      if (temp.mSmithing) {
        temp = this.smithingStore.equipmentMastery.find(blep => blep.id === temp.mSmithing)
        return temp.mLevel
      }
      return 0
    },
    bonusHeals(temp) {
      temp = this.cookingStore.activities.find(blep => blep.itemID === temp.id)
      return temp.mLevel
    },
  },
}
</script>

<template>
  <div class="d-flex py-3 pe-3 main-window bg-transparent gap-1" style="width: 85rem;">

    <!-- All Items -->
    <div class="w-100">
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
            <div class="card tooltip-b"
              :class="inventoryItem.onToolbar || inventoryItem.onEquip ? 'equipped-card' : 'equipment-card'"
              style="width: 58px; height: 58px;" @dblclick="itemStore.equipItem(inventoryItem)">

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
              style="width: 58px; height: 58px;" @dblclick="itemStore.equipItem(inventoryItem)">

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

      <!-- Resources -->
      <div class="card w-100 my-1" style="min-height: 6rem;">
        <div class="p-0">
          <div class="px-3">Resources</div>
        </div>

        <div class="d-flex justify-content-start flex-wrap gap-2 p-2">
          <div v-for="inventoryItem in hasCount(itemStore.resourceItems)">

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
    <equipstats />

  </div>
</template>

<style scoped></style>
