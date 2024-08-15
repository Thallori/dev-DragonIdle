<script>
import { useSmithingStore } from '@/stores/smithing';
import { useCookingStore } from '@/stores/cooking';

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

      <div class="d-flex justify-content-between" v-if="this.itemObject.toolStats.locatingMultiplierAdd">
        <span>Locating: </span>
        <span>{{ (this.itemObject.toolStats.locatingMultiplierAdd * 100) }}%</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.toolStats.harvestingTimeBonus">
        <span>Harvesting: </span>
        <span>{{ this.itemObject.toolStats.harvestingTimeBonus }}s</span>
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
      <div class="d-flex justify-content-between" v-if="this.itemObject.toolStats.miningInterval">
        <span>Speed Bonus: </span>
        <span>{{ this.itemObject.toolStats.miningInterval.toFixed(2) }}s</span>
      </div>
    </div>

    <!-- Combat Stats if not a Tool -->
    <div v-if="this.itemObject.isCombat && this.itemObject.isTool != true">

      <div class="text-warning"
        v-if="this.itemObject.slot == 'meleeSlot' || this.itemObject.slot == 'rangedSlot' || this.itemObject.slot == 'magicSlot'">
        Weapon
      </div>
      <div class="text-warning"
        v-else-if="this.itemObject.slot == 'oilSlot' || this.itemObject.slot == 'ammoSlot' || this.itemObject.slot == 'chargeSlot'">
        Catalyst
      </div>
      <div class="text-warning" v-else>
        Armor
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.meleeAccuracy != null">
        <span>🎯 Melee: </span>
        <span>
          {{ this.itemObject.stats.meleeAccuracy + bonusSmithingMastery(this.itemObject) }}
        </span>
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.rangedAccuracy != null">
        <span>🎯 Ranged: </span>
        <span>
          {{ this.itemObject.stats.rangedAccuracy }}
        </span>
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.magicAccuracy != null">
        <span>🎯 Magic: </span>
        <span>
          {{ this.itemObject.stats.magicAccuracy }}
        </span>
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.meleeDamage">
        <span>💥 Melee: </span>
        <span>{{ (this.itemObject.stats.meleeDamage * 100).toFixed() }}%</span>
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.rangedDamage">
        <span>💥 Ranged: </span>
        <span>{{ this.itemObject.stats.rangedDamage * 100 }}%</span>
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.magicDamage">
        <span>💥 Magic: </span>
        <span>{{ this.itemObject.stats.magicDamage * 100 }}%</span>
      </div>


      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.meleeDodge != null">
        <span>🛡️ Melee: </span>
        <span>
          {{ this.itemObject.stats.meleeDodge + (bonusSmithingMastery(this.itemObject) / 4) }}
        </span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.rangedDodge != null">
        <span>🛡️ Ranged: </span>
        <span>
          {{ this.itemObject.stats.rangedDodge + (bonusSmithingMastery(this.itemObject) / 4) }}
        </span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.magicDodge != null">
        <span>🛡️ Magic: </span>
        <span>
          {{ this.itemObject.stats.magicDodge + (bonusSmithingMastery(this.itemObject) / 4) }}
        </span>
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.precision">
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
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.critDefense">
        <span>Crit Defense: </span>
        <span>{{ (this.itemObject.stats.critDefense * 100) }}</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.physicalArmor">
        <span>Armor: </span>
        <span>{{ this.itemObject.stats.physicalArmor }}</span>
      </div>
      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.resist">
        <span>Resistance: </span>
        <span>{{ (this.itemObject.stats.resist * 100) }}%</span>
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.pen">
        <span>Penetration: </span>
        <span>{{ (this.itemObject.stats.pen * 100) }}%</span>
      </div>

      <div class="d-flex justify-content-between" v-if="this.itemObject.stats.speed">
        <span>Speed: </span>
        <span>{{ this.itemObject.stats.speed.toFixed(2) }}s</span>
      </div>
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
