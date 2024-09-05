<script>
import { useSkillStore } from '@/stores/skills'
import { useItemStore } from '@/stores/inventory'

export default {
  setup() {
    const skillStore = useSkillStore()
    const itemStore = useItemStore()
    return { skillStore, itemStore }
  },
  data() {
    return {
      shownMenu: 0,
    }
  },
  methods: {
  },
}
</script>

<template>
  <div class="d-flex py-4 pe-2 main-window bg-transparent gap-1" style="width: 82rem;">
    <!-- All Items -->
    <div class="w-100 pb-5">

      <!-- Skills -->
      <div class="card card-big mb-2" style="min-height: 6rem;">
        <div class="m-auto">
          under construction, sorry
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped></style>
