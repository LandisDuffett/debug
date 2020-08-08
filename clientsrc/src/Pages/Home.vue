<template>
  <div class="home">
    <div class="row">
      <img alt="Vue logo" class="image-fluid" src="../assets/logo.png" />
      <h1>bugger</h1>
    </div>
    <table style="width: 90%">
      <tr>
        <th>Bugtitle</th>
        <th>Reported By</th>
        <th>Status</th>
        <th>Last Modified</th>
        <bug v-for="bugItem in bugs" :bug="bugItem" :key="bugItem.id"></bug>
      </tr>
    </table>
  </div>
</template>

<script>
import Bug from "../components/Bug";
export default {
  name: "home",
  props: ["bug", "profile"],
  data() {
    return {
      newBug: {},
    };
  },
  mounted() {
    this.$store.dispatch("getBugs");
    this.$store.dispatch("getProfile");
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
    prof() {
      return this.$store.state.profile;
    },
  },
  methods: {
    addBug() {
      this.$store.dispatch("addBug", {
        title: this.newBug.title,
        description: this.newBug.description,
      });
      console.log(this.newBug.title, this.newBug.description);
    },
  },
  components: {
    Bug,
  },
};
</script>