<script>
import { useSmithingStore } from '@/stores/smithing'
import { useCookingStore } from '@/stores/cooking'

export default {
  name: 'tooltips',
  props: ['itemObject'],
  setup() {
    const smithingStore = useSmithingStore()
    const cookingStore = useCookingStore()
    return { smithingStore, cookingStore }
  },
  methods: {
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
  <!-- Name -->
  <div class="card-header py-1">{{ this.itemObject.name }} </div>
  <div class="py-1 px-3 little-levels">

    <!-- Tool Stats -->
    <div class="pb-1" v-if="this.itemObject.isTool">
      <div class="text-warning">Tool</div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.toolStats.explorationMulti">
        <span>Exploring: </span>
        <span>{{ (this.itemObject.toolStats.explorationMulti * 100) }}%</span>
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.toolStats.bonusSyphoningTime">
        <span>Syphoning: </span>
        <span>{{ this.itemObject.toolStats.bonusSyphoningTime.toFixed(2) }}s</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.toolStats.baseStabilityBonus">
        <span>Stability: </span>
        <span>{{ this.itemObject.toolStats.baseStabilityBonus * 100 }}%</span>
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.toolStats.locatingMultiplierAdd">
        <span>Locating: </span>
        <span>{{ (this.itemObject.toolStats.locatingMultiplierAdd * 100) }}%</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.toolStats.harvestingTimeBonus">
        <span>Harvesting: </span>
        <span>{{ this.itemObject.toolStats.harvestingTimeBonus.toFixed(2) }}s</span>
      </div>

      <div class="d-flex justify-content-between little-levels" v-if="this.itemObject.toolStats.bleeding">
        <span>Bleed: </span>
        <span>{{ this.itemObject.toolStats.bleeding }}</span>
      </div>
      <div class="d-flex justify-content-between little-levels" v-if="this.itemObject.toolStats.instaKill">
        <span>Fatal Strike: </span>
        <span>{{ (this.itemObject.toolStats.instaKill * 100) }}%</span>
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.toolStats.bonusDamage">
        <span>Hit: </span>
        <span>{{ this.itemObject.toolStats.bonusDamage }}</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.toolStats.bonusPen">
        <span>Hardness: </span>
        <span>{{ this.itemObject.toolStats.bonusPen }}</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.toolStats.bonusMiningSpeed">
        <span>Mining: </span>
        <span>{{ this.itemObject.toolStats.bonusMiningSpeed.toFixed(2) }}s</span>
      </div>
    </div>

    <!-- Combat Stats-->
    <div v-if="this.itemObject.isCombat">

      <div class="text-warning"
        v-if="this.itemObject.slot == 'meleeSlot' || this.itemObject.slot == 'rangedSlot' || this.itemObject.slot == 'magicSlot'">
        Weapon
      </div>
      <div class="text-warning" v-else-if="this.itemObject.slot == 'oilSlot'">
        Oil
      </div>
      <div class="text-warning" v-else-if="this.itemObject.slot == 'ammoSlot'">
        Ammo
      </div>
      <div class="text-warning" v-else-if="this.itemObject.slot == 'chargeSlot'">
        Charge
      </div>
      <div class="text-warning" v-else-if="this.itemObject.slot == 'trinketSlot'">
        Trinket
      </div>
      <div class="text-warning" v-else-if="this.itemObject.slot == 'ringSlot'">
        Ring
      </div>
      <div class="text-warning" v-else-if="this.itemObject.slot == 'ammySlot'">
        Amulet
      </div>
      <div class="text-warning" v-else>
        Armor
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.meleeAccuracy != null">
        <span>🗡️ Accuracy: </span>
        <span>
          {{ this.itemObject.stats.meleeAccuracy + bonusSmithingMastery(this.itemObject) }}
        </span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.rangedAccuracy != null">
        <span>🏹 Accuracy: </span>
        <span>
          {{ this.itemObject.stats.rangedAccuracy }}
        </span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.magicAccuracy != null">
        <span>🔥 Accuracy: </span>
        <span>
          {{ this.itemObject.stats.magicAccuracy }}
        </span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.accuracy != null">
        <span>🎯All Accuracy: </span>
        <span>
          {{ this.itemObject.stats.accuracy }}
        </span>
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.meleeDamage">
        <span>🗡️ Damage: </span>
        <span>{{ (this.itemObject.stats.meleeDamage * 100).toFixed() }}%</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.rangedDamage">
        <span>🏹 Damage: </span>
        <span>{{ (this.itemObject.stats.rangedDamage * 100).toFixed() }}%</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.magicDamage">
        <span>🔥 Damage: </span>
        <span>{{ (this.itemObject.stats.magicDamage * 100).toFixed() }}%</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.damage">
        <span>All Damage: </span>
        <span>{{ (this.itemObject.stats.damage * 100).toFixed() }}%</span>
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.meleePen">
        <span>🗡️ Penetration: </span>
        <span>{{ (this.itemObject.stats.meleePen * 100) }}%</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.rangedPen">
        <span>🏹 Penetration: </span>
        <span>{{ (this.itemObject.stats.rangedPen * 100) }}%</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.magicPen">
        <span>🔥 Penetration: </span>
        <span>{{ (this.itemObject.stats.magicPen * 100) }}%</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.pen">
        <span>All Penetration: </span>
        <span>{{ (this.itemObject.stats.pen * 100) }}%</span>
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.meleeSpeed">
        <span>🗡️ Speed: </span>
        <span>{{ this.itemObject.stats.meleeSpeed.toFixed(2) }}s</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.rangedSpeed">
        <span>🏹 Speed: </span>
        <span>{{ this.itemObject.stats.rangedSpeed.toFixed(2) }}s</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.magicSpeed">
        <span>🔥 Speed: </span>
        <span>{{ this.itemObject.stats.magicSpeed.toFixed(2) }}s</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.speed">
        <span>All Speed: </span>
        <span>{{ this.itemObject.stats.speed.toFixed(2) }}s</span>
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.meleeDodge != null">
        <span>🛡️🗡️ Defense: </span>
        <span>
          {{ this.itemObject.stats.meleeDodge + (bonusSmithingMastery(this.itemObject) / 4) }}
        </span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.rangedDodge != null">
        <span>🛡️🏹 Defense: </span>
        <span>
          {{ this.itemObject.stats.rangedDodge + (bonusSmithingMastery(this.itemObject) / 4) }}
        </span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.magicDodge != null">
        <span>🛡️🔥 Defense: </span>
        <span>
          {{ this.itemObject.stats.magicDodge }}
        </span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.dodge != null">
        <span>🛡️All Defense: </span>
        <span>
          {{ this.itemObject.stats.dodge }}
        </span>
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.physicalArmor">
        <span>Armor: </span>
        <span>{{ this.itemObject.stats.physicalArmor }}</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.energyArmor">
        <span>Barrier: </span>
        <span>{{ this.itemObject.stats.energyArmor }}</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.resist">
        <span>Resistance: </span>
        <span>{{ (this.itemObject.stats.resist * 100) }}%</span>
      </div>

      <!-- <div class="d-flex justify-content-between" v-if="this.itemObject.stats.precision">
        <span>Precision: </span>
        <span>{{ this.itemObject.stats.precision }}</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.strength">
        <span>Strength: </span>
        <span>{{ this.itemObject.stats.strength }}</span>
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.block">
        <span>Block: </span>
        <span>{{ this.itemObject.stats.block }}</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.reflex">
        <span>Reflex: </span>
        <span>{{ this.itemObject.stats.reflex }}</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.acuity">
        <span>Acuity: </span>
        <span>{{ this.itemObject.stats.acuity }}</span>
      </div> -->

    </div>

    <!-- Food and Potions -->
    <div class="text-warning" v-if="this.itemObject.heals">
      Food
    </div>
    <div class="text-warning" v-if="this.itemObject.isPotion">
      Potion
    </div>

    <div class="d-flex justify-content-between" v-if="this.itemObject.heals">
      <span>Heals: </span>
      <span>{{ this.itemObject.heals }}</span>
    </div>

    <div class="d-flex justify-content-between" v-if="this.itemObject.dcat == 'cookedFood'">
      <span>Bonus Healing: </span>
      <span>{{ bonusHeals(this.itemObject) }}</span>
    </div>

    <!-- Extra and Flavor Text -->
    <div class="info-text" v-if="this.itemObject.extra != null">
      {{ this.itemObject.extra }}
    </div>
    <div class="dark-text tiny-levels" v-if="this.itemObject.flavor != null">
      {{ this.itemObject.flavor }}
    </div>

    <!-- Sell Price -->
    <div v-if="this.itemObject.sellPrice != undefined">
      <div class=" d-flex justify-content-center align-items-center gap-1 pt-1">
        {{ this.itemObject.sellPrice }}
        <img src="src/assets/icons/coins.png" alt="">
      </div>
    </div>

  </div>
</template>

<style scoped></style>
