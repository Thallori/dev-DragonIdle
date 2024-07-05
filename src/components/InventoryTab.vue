<script>
import { useItemStore } from '@/stores/inventory';
import { useSmithingStore } from '@/stores/smithing';
import { useCookingStore } from '@/stores/cooking';

export default {
  name: 'InventoryTab',
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
    bonusMastery(temp) {
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
  <div class="d-flex pt-3 main-window bg-transparent gap-1" style="width: 85rem;">

    <!-- All Items -->
    <div>
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
                <div class="card-header py-1">{{ inventoryItem.name }} </div>

                <div class="py-1 mx-3 little-levels">

                  <!-- Tool Stats -->
                  <div class="pb-1" v-if="inventoryItem.isTool">
                    <div class="text-warning">Tool</div>

                    <div class="d-flex justify-content-between" v-if="inventoryItem.toolStats.locatingMultiplierAdd">
                      <span>Locating: </span>
                      <span>{{ (inventoryItem.toolStats.locatingMultiplierAdd * 100) }}%</span>
                    </div>
                    <div class="d-flex justify-content-between" v-if="inventoryItem.toolStats.harvestingTimeBonus">
                      <span>Harvesting: </span>
                      <span>{{ inventoryItem.toolStats.harvestingTimeBonus}}s</span>
                    </div>

                    <div class="d-flex justify-content-between little-levels" v-if="inventoryItem.toolStats.bleeding">
                      <span>Bleed: </span>
                      <span>{{ inventoryItem.toolStats.bleeding }}</span>
                    </div>
                    <div class="d-flex justify-content-between little-levels" v-if="inventoryItem.toolStats.instaKill">
                      <span>Fatal Strike: </span>
                      <span>{{ (inventoryItem.toolStats.instaKill * 100) }}%</span>
                    </div>

                    <div class="d-flex justify-content-between" v-if="inventoryItem.toolStats.bonusDamage">
                      <span>Hit: </span>
                      <span>{{ inventoryItem.toolStats.bonusDamage }}</span>
                    </div>
                    <div class="d-flex justify-content-between" v-if="inventoryItem.toolStats.bonusPen">
                      <span>Hardness: </span>
                      <span>{{ inventoryItem.toolStats.bonusPen }}</span>
                    </div>
                  </div>

                  <!-- Combat Stats if not a Tool -->
                  <div v-if="inventoryItem.isCombat && inventoryItem.isTool != true">
                    <div class="text-warning" v-if="inventoryItem.slot == 'meleeSlot'">
                      Weapon
                    </div>
                    <div class="text-warning" v-else>
                      Armor
                    </div>

                    <div class="d-flex justify-content-between" v-if="inventoryItem.stats.meleeAccuracy != null">
                      <span>Accuracy: </span>
                      <span>
                        {{ inventoryItem.stats.meleeAccuracy + bonusMastery(inventoryItem) }}
                      </span>
                    </div>
                    <div class="d-flex justify-content-between" v-if="inventoryItem.stats.meleeDamage">
                      <span>Damage: </span>
                      <span>{{ inventoryItem.stats.meleeDamage }}</span>
                    </div>

                    <div class="d-flex justify-content-between" v-if="inventoryItem.stats.meleeDodge != null">
                      <span>Melee Dodge: </span>
                      <span>
                        {{ inventoryItem.stats.meleeDodge + (bonusMastery(inventoryItem) / 4) }}
                      </span>
                    </div>
                    <div class="d-flex justify-content-between" v-if="inventoryItem.stats.rangedDodge != null">
                      <span>Ranged Dodge: </span>
                      <span>
                        {{ inventoryItem.stats.rangedDodge + (bonusMastery(inventoryItem) / 4) }}
                      </span>
                    </div>

                    <div class="d-flex justify-content-between" v-if="inventoryItem.stats.precision">
                      <span>Precision: </span>
                      <span>{{ inventoryItem.stats.precision }}</span>
                    </div>
                    <div class="d-flex justify-content-between" v-if="inventoryItem.stats.strength">
                      <span>Strength: </span>
                      <span>{{ inventoryItem.stats.strength }}</span>
                    </div>

                    <div class="d-flex justify-content-between" v-if="inventoryItem.stats.block">
                      <span>Block: </span>
                      <span>{{ inventoryItem.stats.block }}</span>
                    </div>
                    <div class="d-flex justify-content-between" v-if="inventoryItem.stats.reflex">
                      <span>Reflex: </span>
                      <span>{{ inventoryItem.stats.reflex }}</span>
                    </div>
                    <div class="d-flex justify-content-between" v-if="inventoryItem.stats.acuity">
                      <span>Acuity: </span>
                      <span>{{ inventoryItem.stats.acuity }}</span>
                    </div>

                    <div class="d-flex justify-content-between" v-if="inventoryItem.stats.critDefense">
                      <span>Crit Defense: </span>
                      <span>{{ (inventoryItem.stats.critDefense * 100) }}</span>
                    </div>
                    <div class="d-flex justify-content-between" v-if="inventoryItem.stats.physicalArmor">
                      <span>Armor: </span>
                      <span>{{ inventoryItem.stats.physicalArmor }}</span>
                    </div>
                    <div class="d-flex justify-content-between" v-if="inventoryItem.stats.resist">
                      <span>Resistance: </span>
                      <span>{{ (inventoryItem.stats.resist * 100) }}%</span>
                    </div>

                    <div class="d-flex justify-content-between" v-if="inventoryItem.stats.pen">
                      <span>Penetration: </span>
                      <span>{{ (inventoryItem.stats.pen * 100) }}%</span>
                    </div>

                    <div class="d-flex justify-content-between" v-if="inventoryItem.stats.speed">
                      <span>Speed: </span>
                      <span>{{ inventoryItem.stats.speed.toFixed(2) }}s</span>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center align-items-center gap-1 pt-1">
                    {{ inventoryItem.sellPrice }}
                    <img src="src/assets/icons/testIcon16.png" alt="">
                  </div>
                </div>
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
                <div class="card-header py-1">{{ inventoryItem.name }} </div>
                <div class="py-1 mx-3 little-levels">

                  <div class="text-warning" v-if="inventoryItem.heals">
                    Food
                  </div>
                  <div class="text-warning" v-else>
                    Potion
                  </div>

                  <div v-if="inventoryItem.heals">
                    <span>Heals: </span>
                    <span>{{ inventoryItem.heals }}</span>
                    <div v-if="inventoryItem.dcat == 'cookedFood'">
                      <span>Bonus Healing: </span>
                      <span>{{ bonusHeals(inventoryItem) }}</span>
                    </div>
                  </div>

                  <div class="py-1 little-levels">
                    <div class="d-flex justify-content-center align-items-center gap-1 pt-1">
                      {{ inventoryItem.sellPrice }}
                      <img src="src/assets/icons/testIcon16.png" alt="">
                    </div>
                  </div>
                </div>
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
                <div class="card-header py-1">{{ inventoryItem.name }} </div>

                <div class="py-1 little-levels">
                  <div class="d-flex justify-content-center align-items-center gap-1 pt-1">
                    {{ inventoryItem.sellPrice }}
                    <img src="src/assets/icons/testIcon16.png" alt="">
                  </div>
                </div>
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
    <div class="card align-items-center my-1 pb-2" style="min-width: 18rem; min-height: 22rem;">

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
  </div>
</template>

<style scoped></style>
