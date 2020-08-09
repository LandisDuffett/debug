<template>
  <h5>Yeah!{{bugId}}</h5>
</template>

<script>
export default {
  name: "BugDetails",
  props: ["bugId"],
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  methods: {},
  components: {},
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>