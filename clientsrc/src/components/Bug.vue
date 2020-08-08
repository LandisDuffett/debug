<template>
  <div class="Bug">{{prof.name}}{{bug.title}}</div>
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