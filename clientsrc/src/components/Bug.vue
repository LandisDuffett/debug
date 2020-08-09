<template>
  <h3>
    <router-link :to="{name: 'BugDetails', params: {bugId: bug.id}}">
      <h3>{{bug.title}}</h3>
    </router-link>
    <profile :profile="profile"></profile>
    {{bug.closed}}
    {{convertDate}}
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
    convertDate() {
      let iso = this.bug.updatedAt;
      let newDate = iso.substring(0, 10);
      newDate = newDate.split("-");
      let newnewDate = [newDate[1], newDate[2], newDate[0]];
      newnewDate = newnewDate.join("-");
      return newnewDate;
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