<template>
  <div>
    <h5>Yeah!{{bug.title}}</h5>
    <note v-for="note in notes" :note="note" :key="note.id"></note>
  </div>
</template>

<script>
import Note from "../components/Note";
export default {
  name: "BugDetails",
  props: ["bugId"],
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getById", this.$route.params.bugId);
    this.$store.dispatch("getNotesByBugId", this.$route.params.bugId);
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.activeNotes;
    },
  },
  methods: {},
  components: {
    Note,
  },
};
</script>

<style scoped>
</style>