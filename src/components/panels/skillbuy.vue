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
      if (this.buyObject.isInGame == false || (this.skillStore.maxLevel < this.buyObject.sequence + 1)) {
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

        <!-- Can Buy -->
        <div class="d-flex little-levels" v-if="(this.skillStore.maxLevel >= buyObject.sequence + 1) && this.buyObject.isInGame == true">

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

        <div class="little-levels px-3" v-if="buyObject.isInGame == false">
          future update
        </div>
        <div class="little-levels px-2"
          v-else-if="this.skillStore.maxLevel < buyObject.sequence + 1">
          requires sequence {{ buyObject.sequence }}
        </div>


      </div>
    </div>
  </div>
</template>

<style scoped></style>
