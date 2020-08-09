<template>
  <div class="home">
    <bug v-for="bug in bugs" :bug="bug" :key="bug.id"></bug>
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