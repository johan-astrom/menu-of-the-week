<template>
  <div id="new-weekday">
    <h4 v-if="currentRecipe.weekday">Change weekday:</h4>
    <h4 v-else>Assign to weekday:</h4>
    <select id="new-weekday-select" name="new-weekday-select" v-model="assignedWeekday">
      <option v-if="currentRecipe.weekday">-- none --</option>
      <option v-for="(weekday, index) in weekdays"
              :key="index">{{ weekday }}
      </option>
    </select>
    <button @click="assignWeekday">Assign</button>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";

export default {
  name: "ChangeWeekday",
  data() {
    return {}
  },
  methods: {
    ...mapMutations([
      'removeDuplicates'
    ]),
    ...mapActions([
      'assignWeekday'
    ])
  },
  computed: {
    ...mapState([
      'weekdays', 'currentRecipe'
    ]),
    assignedWeekday: {
      get() {
        return this.$store.state.currentRecipe.weekday
      },
      set(weekday) {
        this.$store.commit('setAssignedWeekday', weekday)
      }
    }
  }
};
</script>

<style scoped>

</style>