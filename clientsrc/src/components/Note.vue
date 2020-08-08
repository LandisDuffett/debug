<template>
  <tr class="Note">
    <td>{{note.creatorEmail}}</td>
    <td>{{note.content}}</td>
  </tr>
</template>


<script>
export default {
  name: "Note",
  props: ["note"],
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
</style>