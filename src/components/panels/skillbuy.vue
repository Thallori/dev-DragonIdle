<script>
import { useItemStore } from '@/stores/inventory'
import { useSkillStore } from '@/stores/skills'

export default {
  name: 'skillbuy',
  props: ['buyObject'],
  setup() {
    const itemStore = useItemStore()
    const skillStore = useSkillStore()
    return { itemStore, skillStore }
  },
  methods: {
    isDisabled() {
      if (this.buyObject.isInGame == false || (this.buyObject.sequence == 3 && this.skillStore.flags.dungeon2 == false) || (this.buyObject.requiresCombat == true && this.skillStore.flags.showCombat == false)) {
        return true
      }
      return false
    },
  },
}
</script>

<template>
  <div class="btn darkequipment-card sidenav-item2 text-white py-2" :class="(isDisabled()) ? 'disabled' : ''"
    style="font-size: 1.2rem; font-weight: 500; width: 250px">

    <div class="d-flex">
      <img style="width: 60px; height: 60px;" :src="this.buyObject.image">
      <div>
        {{ this.buyObject.name }}

        <!-- can buy anytime -->
        <div class="d-flex little-levels"
          v-if="buyObject.sequence == 0 && this.buyObject.isInGame == true && (buyObject.requiresCombat == false || skillStore.flags.showCombat == true)">

          <div style="width: 90px;">
            {{ this.buyObject.price1[1] }}
            <img style="width: 32px; height: 32px;"
              :src="itemStore.getItemImage(this.buyObject.price1[0], this.buyObject.price1[2])" alt="">
          </div>

          <div style="width: 60px;">
            {{ this.buyObject.price2[1] }}
            <img style="width: 32px; height: 32px;"
              :src="itemStore.getItemImage(this.buyObject.price2[0], this.buyObject.price2[2])" alt="">
          </div>
        </div>

        <!-- can buy only if sequence 3 is done -->
        <div class="d-flex little-levels"
          v-if="buyObject.sequence == 3 && skillStore.flags.dungeon2 == true && this.buyObject.isInGame == true">

          <div style="width: 90px;">
            {{ this.buyObject.price1[1] }}
            <img style="width: 32px; height: 32px;"
              :src="itemStore.getItemImage(this.buyObject.price1[0], this.buyObject.price1[2])" alt="">
          </div>

          <div style="width: 60px;">
            {{ this.buyObject.price2[1] }}
            <img style="width: 32px; height: 32px;"
              :src="itemStore.getItemImage(this.buyObject.price2[0], this.buyObject.price2[2]) " alt="">
          </div>
        </div>

        <div class="little-levels px-2"
          v-else-if="buyObject.sequence == 3 && skillStore.flags.dungeon2 == false && this.buyObject.isInGame == true">
          requires sequence 3
        </div>

        <div class="little-levels px-3" v-if="buyObject.isInGame == false">
          future update
        </div>

        <div class="little-levels px-3" v-if="buyObject.requiresCombat == true && skillStore.flags.showCombat == false">
          requires combat
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped></style>
