<template>
  <tr class="Bug">
    <td>{{bug.title}}</td>
    <td>{{prof.name}}</td>
    <td>{{bug.closed}}</td>
    <td>{{bug.updatedAt}}</td>
  </tr>
</template>


<script>
export default {
  name: "Bug",
  props: ["prof", "bug"],
  data() {
    return {};
  },
  mounted() {
    //  this.$store.dispatch("getBugs");
    this.$store.dispatch("getProfile");
  },
  computed: {
    //   bugs() {
    //     return this.$store.state.bugs;
    //   },
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