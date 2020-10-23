<template>
  <section>
    <base-card>
      <h2>Register as a Coach</h2>
      <coach-form @save-data="saveData" />
    </base-card>
  </section>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm.vue";

export default {
  components: {
    CoachForm,
  },
  methods: {
    saveData(data) {
      console.log(data);
      this.$store.dispatch("coaches/registerCoach", data);
    },
  },
};
</script>

<style scoped>
</style>