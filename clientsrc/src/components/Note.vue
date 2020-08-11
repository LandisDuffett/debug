<template>
  <tr class="Note">
    <td>{{note.creatorEmail}}</td>
    <td>{{note.content}}</td>
    <td>
      <button @click="deleteNote(note.id)" class="btn btn-danger">Delete</button>
    </td>
  </tr>
</template>


<script>
export default {
  name: "Note",
  props: ["note"],
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("getNotesByBugId", this.$route.params.bugId);
  },
  computed: {
    notes() {
      return this.$store.state.activeNotes;
    },
  },
  methods: {
    deleteNote(noteId) {
      confirm("Are you sure you want to delete this note?");
      this.$store.dispatch("deleteNote", {
        id: noteId,
        bugId: this.note.bugId,
        creatorEmail: this.note.creatorEmail,
      });
    },
  },
  components: {},
};
</script>


<style scoped>
</style>