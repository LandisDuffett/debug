<template >
  <div>
    <div v-if="bug.closed == true">
      <router-link :to="{name: 'BugDetails', params: {bugId: bug.id}}">
        <h3>{{bug.title}}</h3>
      </router-link>
      <!--<profile :profile="profile"></profile>-->
      <h5>{{bug.creatorEmail}}</h5>
      <h5 class="text-danger">closed</h5>
      {{convertDate}}
    </div>
    <div v-else>
      <router-link :to="{name: 'BugDetails', params: {bugId: bug.id}}">
        <h3>{{bug.title}}</h3>
      </router-link>
      <!--<profile :profile="profile"></profile>-->
      <h5>{{bug.creatorEmail}}</h5>
      <h5 class="text-secondary">open</h5>
      {{convertDate}}
    </div>
  </div>
</template>


<script>
import Profile from "../components/Prof.vue";
export default {
  name: "Bug",
  props: ["bug"],
  data() {
    return {
      isActive: true,
    };
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
    colorClass() {
      return {
        "text-danger": this.isActive && this.bug.closed,
      };
    },
  },
  methods: {},
  components: {
    Profile,
  },
};
</script>


<style>
</style>