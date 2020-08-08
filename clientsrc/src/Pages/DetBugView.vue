<template>
  <div class="detbugview">
    <div class="row">
      <img alt="Vue logo" class="image-fluid" src="../assets/logo.png" />
      <h1>bugger</h1>
    </div>
    <div class="row">
        <h1>{{bug.title}}</h1>
    </div>
    <div class="row">
        <h5>Reported by:<h5>
        <h3>{{bug.name}}</h3>
        <h5>status:</h5>
        <h3>{{bug.status}}</h3>
    </div>
    <div>
      <h1>{{bug.description}}</h1>
    </div>
    <table style="width: 90%">
      <tr>
        <th>Name</th>
        <th>Message</th>
        <th>Delete</th>
      </tr>
      <note v-for="noteItem in notes" :note="noteItem" :key="noteItem.id"></note>
    </table>
  </div>
</template>

<script>
import Note from "../components/Note";
export default {
  name: "detbugview",
  props: ["bugDesc", "note"],
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getBugs");
    this.$store.dispatch("getNotes")
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
    notes() {
        return this.$store.state.notes;
    }
  },
  methods: {},
  components: {
    Note,
  },
};
</script>