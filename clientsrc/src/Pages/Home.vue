<template>
  <div>
    <div class="row">
      <img alt="Vue logo" class="image-fluid" src="../assets/logo.png" />
      <h1>bugger</h1>
    </div>
    <div class="home">
      <bug v-for="bug in bugs" :bug="bug" :key="bug.id"></bug>
    </div>
    <div class="div">
      <router-link :to="{name: 'BugDetails'}">BugDetails</router-link>
    </div>
  </div>
</template>

<script>
import Bug from "../components/Bug";
export default {
  name: "home",
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getBugs");
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
  },
  methods: {},
  components: {
    Bug,
  },
};
</script>