<script>
import { useItemStore } from '@/stores/inventory';
import { useSmithingStore } from '@/stores/smithing';
import { useCookingStore } from '@/stores/cooking';

export default {
  name: 'equipstats',
  setup() {
    const itemStore = useItemStore()
    const smithingStore = useSmithingStore()
    const cookingStore = useCookingStore()
    return { itemStore, smithingStore, cookingStore }
  },
  data() {
    return {
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
  <!-- Equipment and Stats Panel -->
  <div class="card text-center align-items-center my-1 py-2" style="min-width: 18rem; min-height: 22rem;">

    <!-- Armor and Accessories Equipped -->
    <div class="d-flex flex-wrap gap-1 p-2" style="width: 16.3rem;">

      <!-- wingSlot -->
      <div class="card tooltip-b equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.wingSlot)">

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.wingSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.wingSlot.image">
        <div class="little-levels text-center" v-else>
          Wings
        </div>
      </div>

      <!-- bodySlot -->
      <div class="card tooltip-b equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.bodySlot)">

        <img class=" mx-auto my-auto" :src="itemStore.equippedCombat.bodySlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.bodySlot.image">
        <div class="little-levels text-center" v-else>
          Body
        </div>
      </div>

      <!-- chestSlot -->
      <div class="card tooltip-b equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.chestSlot)">

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.chestSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.chestSlot.image">
        <div class="little-levels text-center" v-else>
          Chest
        </div>
      </div>

      <!-- hatSlot -->
      <div class="card tooltip-b equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.hatSlot)">

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.hatSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.hatSlot.image">
        <div class="little-levels text-center" v-else>
          Head
        </div>
      </div>

      <!-- trinketSlot -->
      <div class="card tooltip-b equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.trinketSlot)">

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.trinketSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.trinketSlot.image">
        <div class="little-levels text-center" v-else>
          Trinket
        </div>
      </div>

      <!-- ringSlot -->
      <div class="card tooltip-b equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.ringSlot)">

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.ringSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.ringSlot.image">
        <div class="little-levels text-center" v-else>
          Ring
        </div>
      </div>

      <!-- ammySlot -->
      <div class="card tooltip-b equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.ammySlot)">

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.ammySlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.ammySlot.image">
        <div class="little-levels text-center" v-else>
          Amulet
        </div>
      </div>

      <!-- legSlot -->
      <div class="card tooltip-b equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.legSlot)">

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.legSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.legSlot.image">
        <div class="little-levels text-center" v-else>
          Legs
        </div>
      </div>

    </div>

    <!-- Weapons and Catalysts Equipped -->
    <div class="d-flex flex-wrap gap-1 p-2" style="width: 12.4rem;">

      <!-- meleeSlot -->
      <div class="card tooltip-b equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.meleeSlot)">

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.meleeSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.meleeSlot.image">
        <div class="little-levels text-center" v-else>
          Melee
        </div>
      </div>

      <!-- rangedSlot -->
      <div class="card tooltip-b equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.rangedSlot)">

        <img class=" mx-auto my-auto" :src="itemStore.equippedCombat.rangedSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.rangedSlot.image">
        <div class="little-levels text-center" v-else>
          Range
        </div>
      </div>

      <!-- mageSlot -->
      <div class="card tooltip-b equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.mageSlot)">

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.mageSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.mageSlot.image">
        <div class="little-levels text-center" v-else>
          Magic
        </div>
      </div>

      <!-- oilSlot -->
      <div class="card tooltip-b equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.oilSlot)">

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.oilSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.oilSlot.image">
        <div class="little-levels text-center" v-else>
          Oil
        </div>
      </div>

      <!-- ammoSlot -->
      <div class="card tooltip-b equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.ammoSlot)">

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.ammoSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.ammoSlot.image">
        <div class="little-levels text-center" v-else>
          Ammo
        </div>
      </div>

      <!-- chargeSlot -->
      <div class="card tooltip-b equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.chargeSlot)">

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.chargeSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.chargeSlot.image">
        <div class="little-levels text-center" v-else>
          Charge
        </div>
      </div>

    </div>

    <!-- Combined Stats -->
    <div class="text-center little-levels" style="width: 14rem;">
      <div class="py-2">
        <div class="text-warning">Melee / Ranged / Magic</div>
        <div class="d-flex justify-content-between">
          <span>Max Hit: </span>
          <span>{{ itemStore.equippedStats.meleeDamage }} /
            {{ itemStore.equippedStats.rangedDamage }} /
            {{ itemStore.equippedStats.magicDamage }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Accuracy: </span>
          <span>{{ itemStore.equippedStats.meleeAccuracy }} /
            {{ itemStore.equippedStats.rangedAccuracy }} /
            {{ itemStore.equippedStats.rangedAccuracy }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Penetration: </span>
          <span>{{ 100 * itemStore.equippedStats.meleePen }}% /
            {{ 100 * itemStore.equippedStats.rangedPen }}% /
            {{ 100 * itemStore.equippedStats.magicPen }}%</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Speed: </span>
          <span>{{ itemStore.equippedStats.meleeSpeed.toFixed(2) }}s /
            {{ itemStore.equippedStats.rangedSpeed.toFixed(2) }}s /
            {{ itemStore.equippedStats.magicSpeed.toFixed(2) }}s
          </span>
        </div>
      </div>

      <div class="py-2">
        <div class="d-flex justify-content-between">
          <span>Armor: </span>
          <span>{{ itemStore.equippedStats.physicalArmor }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Barrier: </span>
          <span>{{ itemStore.equippedStats.energyArmor }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Resistance: </span>
          <span>{{ 100 * itemStore.equippedStats.resist }}%</span>
        </div>
      </div>

      <div class="py-2">
        <div class="d-flex justify-content-between">
          <span>Melee Dodge: </span>
          <span>{{ Math.ceil(itemStore.equippedStats.meleeDodge) }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Ranged Dodge: </span>
          <span>{{ Math.ceil(itemStore.equippedStats.rangedDodge) }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Magic Dodge: </span>
          <span>{{ Math.ceil(itemStore.equippedStats.magicDodge) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
