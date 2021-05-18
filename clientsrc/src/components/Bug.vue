<template >
  <div
    class="row border-bottom border-right border-left border-success bg-white text-black"
  >
    <div class="col-3 border-right border-success">
      <router-link :to="{ name: 'BugDetails', params: { bugId: bug.id } }">
        <h5 class="pl-2">{{ bug.title }}</h5>
      </router-link>
    </div>
    <div class="col-3 border-right border-success">
      <router-link :to="{ name: 'BugDetails', params: { bugId: bug.id } }">
        <h5 class="pl-2">{{ bug.creatorEmail }}</h5>
      </router-link>
    </div>
    <div class="col-3 border-right border-success" v-if="bug.closed == true">
      <h5 class="text-danger">closed</h5>
    </div>
    <div class="col-3 border-right border-success" v-else>
      <h5 class="text-success">open</h5>
    </div>
    <div class="col-3 border-right border-success">
      <h5>{{ convertDate }}</h5>
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