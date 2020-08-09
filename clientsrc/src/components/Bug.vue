<template>
  <h3>
    {{bug.title}}
    <profile :profile="profile"></profile>
  </h3>
</template>

<script>
import Profile from "../components/Prof.vue";
export default {
  name: "Bug",
  props: ["bug"],
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getProfile");
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {},
  components: {
    Profile,
  },
};
</script>


<style scoped>
</style>