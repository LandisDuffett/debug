<template>
  <tr class="Bug">
    <td>{{prof.name}}</td>
  </tr>
</template>


<script>
export default {
  name: "Bug",
  props: ["prof"],
  data() {
    return {};
  },
  mounted() {
    //  this.$store.dispatch("getBugs");
    this.$store.dispatch("getProfile");
  },
  computed: {
    //  bugs() {
    //    return this.$store.state.bugs;
    //  },
    prof() {
      return this.$store.state.profile;
    },
  },
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>