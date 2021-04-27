<template>
  <section>
  <header>
    <h1>Menu of the week</h1>
    <div class="header-line"></div>
  </header>

  <main>
    <week-table></week-table>
    <user-interactivity></user-interactivity>
  </main>
  </section>
</template>

<script>
import UserInteractivity from "@/components/UserInteractivity";
import WeekTable from "@/components/WeekTable";

export default {
  name: "App",
  components: {
    UserInteractivity,
    WeekTable
  },
  mounted() {
    this.$store.dispatch('loadRecipes')
  }
};
</script>

<style>

</style>
