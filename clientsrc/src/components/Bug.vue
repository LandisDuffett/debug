<template>
  <h3>
    <router-link :to="{name: 'BugDetails', params: {bugId: bug.id}}">
      <h3>{{bug.title}}</h3>
    </router-link>
    <profile :profile="profile"></profile>
    {{bug.closed}}
    {{bug.updatedAt}}
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