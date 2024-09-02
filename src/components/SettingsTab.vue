<script>
import { useSkillStore } from '@/stores/skills'
import { useItemStore } from '@/stores/inventory'

export default {
  name: 'SettingsTab',
  setup() {
    const skillStore = useSkillStore()
    const itemStore = useItemStore()
    return { skillStore, itemStore }
  },
  data() {
    return {
      showConfirmModal: false,
      saveDisplay: '',
      debugFlags: false,
    }
  },
  methods: {
    select: function (event) {
      event.target.setSelectionRange(0, this.saveDisplay.length)
    },
    exportSave() {
      this.saveDisplay = JSON.stringify(localStorage)
    },
    importSave(data) {
      //https://stackoverflow.com/a/25063720/26419157
      var o = JSON.parse(data);
      for (var property in o) {
        if (o.hasOwnProperty(property)) {
          localStorage.setItem(property, o[property]);
        }
      }
      location.reload()
    },

    dumpAllItems() {
      let temp = this.itemStore.getAllEquipment
      for (let i in temp) {
        temp[i].count += 20
      }
      temp = this.itemStore.getAllConsumable
      for (let i in temp) {
        temp[i].count += 20
      }
      temp = this.itemStore.getAllResources
      for (let i in temp) {
        temp[i].count += 20
      }
      temp = this.itemStore.getAllMechanics
      for (let i in temp) {
        temp[i].count += 20
      }
    },
  },
}
</script>

<template>
  <!-- Main Window -->
  <div class="card pt-4 align-items-center main-window bg-transparent" style="width: 77rem">

    <!-- Confirm Modal -->
    <div class="modal show-modal" v-if="showConfirmModal == true">
      <div class="modal-backing" @click="showConfirmModal = false"></div>

      <!-- Confirm Content -->
      <div class="modal-content p-2" style="width: 23rem;">
        <div class="text-center m-4">
          Are you sure you want to delete all save data?
          <br>
          This action is irreversable.
        </div>
        <!-- Choice Buttons -->
        <div class="d-flex justify-content-around gap-2 p-2">
          <div class="card equipment-card text-center mx-auto w-50" @click="showConfirmModal = false">
            Cancel
          </div>
          <div class="card equipment-card bg-danger text-white  text-center mx-auto w-50" @click="skillStore.clearAll">
            Yes, Delete All
          </div>
        </div>
      </div>
    </div>

    <!-- All Menus -->
    <div class="px-4 pb-1 w-100" style="max-width: 64rem;">

      <!-- Save Menu -->
      <div class="d-flex justify-content-center gap-1 pb-1">

        <!-- Menu Selector -->
        <div class="card flex-grow-1 px-0">
          <div class="d-flex flex-wrap justify-content-center gap-2 p-1">

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 150px"
              @click="skillStore.saveAll">
              Save Game
            </div>

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 150px"
              @click="exportSave()">
              Export Save
            </div>

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 150px"
              @click="importSave(saveDisplay)">
              Import Save
            </div>

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 150px"
              @click="showConfirmModal = true">
              Delete Save
            </div>

          </div>
        </div>
      </div>

      <div>
        <input class="little-levels w-100" type="text" @click="select" v-model="saveDisplay">
      </div>


      <!-- Debug Menu -->
      <div class="d-flex justify-content-center gap-1 pt-2">

        <!-- Menu Selector -->
        <div class="card flex-grow-1 px-0">
          <div class="d-flex flex-wrap justify-content-center gap-2 p-1">

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 200px"
              @click="debugFlags = !debugFlags">
              Toggle Debug Flags
            </div>

            <div class="btn sidenav-item px-2 py-1" style="font-size: 1.2rem; font-weight: 500; width: 200px"
              @click="dumpAllItems()">
              Get All Items
            </div>

          </div>
        </div>
      </div>
    </div>

    <div v-if="debugFlags == true">
      {{ skillStore.flags }}
    </div>
  </div>
</template>

<style scoped></style>
