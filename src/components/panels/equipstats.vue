<script>
import { useItemStore } from '@/stores/inventory';
import { useCombatStore } from '@/stores/combat';
import { useSmithingStore } from '@/stores/smithing';
import { useCookingStore } from '@/stores/cooking';

import tooltips from './tooltips.vue'

export default {
  name: 'equipstats',
  components: {
    tooltips,
  },
  setup() {
    const itemStore = useItemStore()
    const combatStore = useCombatStore()
    const smithingStore = useSmithingStore()
    const cookingStore = useCookingStore()
    return { itemStore, combatStore, smithingStore, cookingStore }
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
      <div class="card tooltip-br equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.wingSlot)">

        <div class="tooltip-text" v-if="itemStore.equippedCombat.wingSlot.id">
          <tooltips :itemObject="itemStore.equippedCombat.wingSlot" />
        </div>

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.wingSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.wingSlot.image">
        <div class="little-levels text-center" v-else>
          Wings
        </div>
      </div>

      <!-- bodySlot -->
      <div class="card tooltip-br equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.bodySlot)">

        <div class="tooltip-text" v-if="itemStore.equippedCombat.bodySlot.id">
          <tooltips :itemObject="itemStore.equippedCombat.bodySlot" />
        </div>

        <img class=" mx-auto my-auto" :src="itemStore.equippedCombat.bodySlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.bodySlot.image">
        <div class="little-levels text-center" v-else>
          Body
        </div>
      </div>

      <!-- chestSlot -->
      <div class="card tooltip-br equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.chestSlot)">

        <div class="tooltip-text" v-if="itemStore.equippedCombat.chestSlot.id">
          <tooltips :itemObject="itemStore.equippedCombat.chestSlot" />
        </div>

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.chestSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.chestSlot.image">
        <div class="little-levels text-center" v-else>
          Chest
        </div>
      </div>

      <!-- hatSlot -->
      <div class="card tooltip-br equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.hatSlot)">

        <div class="tooltip-text" v-if="itemStore.equippedCombat.hatSlot.id">
          <tooltips :itemObject="itemStore.equippedCombat.hatSlot" />
        </div>

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.hatSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.hatSlot.image">
        <div class="little-levels text-center" v-else>
          Head
        </div>
      </div>

      <!-- trinketSlot -->
      <div class="card tooltip-br equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.trinketSlot)">

        <div class="tooltip-text" v-if="itemStore.equippedCombat.trinketSlot.id">
          <tooltips :itemObject="itemStore.equippedCombat.trinketSlot" />
        </div>

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.trinketSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.trinketSlot.image">
        <div class="little-levels text-center" v-else>
          Trinket
        </div>
      </div>

      <!-- ringSlot -->
      <div class="card tooltip-br equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.ringSlot)">

        <div class="tooltip-text" v-if="itemStore.equippedCombat.ringSlot.id">
          <tooltips :itemObject="itemStore.equippedCombat.ringSlot" />
        </div>

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.ringSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.ringSlot.image">
        <div class="little-levels text-center" v-else>
          Ring
        </div>
      </div>

      <!-- ammySlot -->
      <div class="card tooltip-br equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.ammySlot)">

        <div class="tooltip-text" v-if="itemStore.equippedCombat.ammySlot.id">
          <tooltips :itemObject="itemStore.equippedCombat.ammySlot" />
        </div>

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.ammySlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.ammySlot.image">
        <div class="little-levels text-center" v-else>
          Amulet
        </div>
      </div>

      <!-- legSlot -->
      <div class="card tooltip-br equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.legSlot)">

        <div class="tooltip-text" v-if="itemStore.equippedCombat.legSlot.id">
          <tooltips :itemObject="itemStore.equippedCombat.legSlot" />
        </div>

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
      <div class="card tooltip-br equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipCombatTool(itemStore.equippedCombat.meleeSlot)">

        <div class="tooltip-text" v-if="itemStore.equippedCombat.meleeSlot.id">
          <tooltips :itemObject="itemStore.equippedCombat.meleeSlot" />
        </div>

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.meleeSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.meleeSlot.image">
        <div class="little-levels text-center" v-else>
          Melee
        </div>
      </div>

      <!-- rangedSlot -->
      <div class="card tooltip-br equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipCombatTool(itemStore.equippedCombat.rangedSlot)">

        <div class="tooltip-text" v-if="itemStore.equippedCombat.rangedSlot.id">
          <tooltips :itemObject="itemStore.equippedCombat.rangedSlot" />
        </div>

        <img class=" mx-auto my-auto" :src="itemStore.equippedCombat.rangedSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.rangedSlot.image">
        <div class="little-levels text-center" v-else>
          Range
        </div>
      </div>

      <!-- magicSlot -->
      <div class="card tooltip-br equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipCombatTool(itemStore.equippedCombat.magicSlot)">

        <div class="tooltip-text" v-if="itemStore.equippedCombat.magicSlot.id">
          <tooltips :itemObject="itemStore.equippedCombat.magicSlot" />
        </div>

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.magicSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.magicSlot.image">
        <div class="little-levels text-center" v-else>
          Magic
        </div>
      </div>

      <!-- oilSlot -->
      <div class="card tooltip-br equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.oilSlot)">

        <div class="tooltip-text" v-if="itemStore.equippedCombat.oilSlot.id">
          <tooltips :itemObject="itemStore.equippedCombat.oilSlot" />
        </div>

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.oilSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.oilSlot.image">
        <div class="little-levels text-center" v-else>
          Oil
        </div>
      </div>

      <!-- ammoSlot -->
      <div class="card tooltip-br equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.ammoSlot)">

        <div class="tooltip-text" v-if="itemStore.equippedCombat.ammoSlot.id">
          <tooltips :itemObject="itemStore.equippedCombat.ammoSlot" />
        </div>

        <img class="mx-auto my-auto" :src="itemStore.equippedCombat.ammoSlot.image" alt="" width="48" height="48"
          v-if="itemStore.equippedCombat.ammoSlot.image">
        <div class="little-levels text-center" v-else>
          Ammo
        </div>
      </div>

      <!-- chargeSlot -->
      <div class="card tooltip-br equipment-card" style="width: 58px; height: 58px;"
        @dblclick="itemStore.equipItem(itemStore.equippedCombat.chargeSlot)">

        <div class="tooltip-text" v-if="itemStore.equippedCombat.chargeSlot.id">
          <tooltips :itemObject="itemStore.equippedCombat.chargeSlot" />
        </div>

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

          <!-- Max Hit, Calculated -->
          <!-- <span v-if="combatStore.activeObject.stats">
            <span v-if="combatStore.activeObject.stats.resist != 0">
              {{ (itemStore.equippedStats.meleeDamage * (1 - Math.max(0, combatStore.activeObject.stats.resist - itemStore.equippedStats.meleePen))).toFixed(2).replace(/\.00$/, '') }} /
              {{ (itemStore.equippedStats.rangedDamage * (1 - Math.max(0, combatStore.activeObject.stats.resist - itemStore.equippedStats.rangedPen))).toFixed(2).replace(/\.00$/, '') }} /
              {{ (itemStore.equippedStats.magicDamage * (1 - Math.max(0, combatStore.activeObject.stats.resist - itemStore.equippedStats.magicPen))).toFixed(2).replace(/\.00$/, '') }}
            </span>
          </span> -->

          <span>
            {{ (itemStore.equippedStats.meleeDamage * (1 - (0.5 * Math.min(1,
            combatStore.currentStatus.maimed)))).toFixed(2).replace(/\.00$/, '') }} /
            {{ (itemStore.equippedStats.rangedDamage * (1 - (0.5 * Math.min(1,
            combatStore.currentStatus.maimed)))).toFixed(2).replace(/\.00$/, '') }} /
            {{ (itemStore.equippedStats.magicDamage * (1 - (0.5 * Math.min(1,
            combatStore.currentStatus.maimed)))).toFixed(2).replace(/\.00$/, '') }}
          </span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Accuracy: </span>
          <span>{{ itemStore.equippedStats.meleeAccuracy.toFixed() }} /
            {{ itemStore.equippedStats.rangedAccuracy.toFixed() }} /
            {{ itemStore.equippedStats.magicAccuracy.toFixed() }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Penetration: </span>
          <span>{{ (100 * itemStore.equippedStats.meleePen).toFixed() }}% /
            {{ (100 * itemStore.equippedStats.rangedPen).toFixed() }}% /
            {{ (100 * itemStore.equippedStats.magicPen).toFixed() }}%</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Speed: </span>
          <span>
            {{ (Math.ceil(itemStore.equippedStats.meleeSpeed * combatStore.currentSpeedMod * 20) / 20).toFixed(2) }}s /
            {{ (Math.ceil(itemStore.equippedStats.rangedSpeed * combatStore.currentSpeedMod * 20) / 20).toFixed(2) }}s /
            {{ (Math.ceil(itemStore.equippedStats.magicSpeed * combatStore.currentSpeedMod * 20) / 20).toFixed(2) }}s
          </span>
        </div>
      </div>

      <div class="py-2">
        <div class="d-flex justify-content-between">
          <span>Armor: </span>
          <span>{{ itemStore.equippedStats.physicalArmor.toFixed() }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Barrier: </span>
          <span>{{ itemStore.equippedStats.energyArmor.toFixed() }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Resistance: </span>
          <span>{{ (100 * itemStore.equippedStats.resist).toFixed() }}%</span>
        </div>
      </div>

      <div class="py-2">
        <div class="d-flex justify-content-between">
          <span>Melee Dodge: </span>
          <span>{{ Math.ceil(itemStore.equippedStats.meleeDodge).toFixed() }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Ranged Dodge: </span>
          <span>{{ Math.ceil(itemStore.equippedStats.rangedDodge).toFixed() }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span>Magic Dodge: </span>
          <span>{{ Math.ceil(itemStore.equippedStats.magicDodge).toFixed() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
