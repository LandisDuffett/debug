<template>
  <div class="col">
    <div class="row">
      <div class="col-4 border-right border-success p-1">
        <h5>{{note.creatorEmail}}</h5>
      </div>
      <div class="col-4 border-right border-success p-1">
        <h5>{{note.content}}</h5>
      </div>
      <div class="col-4 border-right border-success p-1">
        <button @click="deleteNote(note.id)" class="btn btn-danger btn-small">Delete</button>
      </div>
    </div>
  </div>
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