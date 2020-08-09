<template>
  <h5>Yeah!{{bug.title}}</h5>
</template>

<script>
export default {
  name: "BugDetails",
  props: ["bugId"],
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getById", this.$route.params.bugId);
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>