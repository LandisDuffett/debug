<template>
  <div>
    <h5>Yeah!{{bug.title}}</h5>
    <h5>{{bug.description}}</h5>
    <note v-for="note in notes" :note="note" :key="note.id"></note>
    <button
      type="button"
      class="col-4 mb-3 btn btn-primary btn-lg"
      data-toggle="modal"
      data-target="#note-modal"
    >Add Note</button>
    <button
      type="button"
      class="col-4 mb-3 btn btn-primary btn-lg"
      data-toggle="modal"
      data-target="#edit-modal"
    >Edit Bug</button>
    <!--note-modal begin-->
    <div
      class="modal"
      id="note-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Note</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <form @submit.prevent="addNote(bug.id)">
                <div class="form-group row">
                  <label
                    for="inputName"
                    class="col-sm-1-12 col-form-label"
                  >Reported by: {{profile.name}}</label>
                  <div class="col-sm-1-12">
                    <textarea
                      type="text"
                      class="form-control"
                      placeholder="Add comment on bug..."
                      name="inputNote"
                      id="inputNote"
                      cols="30"
                      v-model="newNote.content"
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="offset-sm-2 col-sm-10">
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!--notemodal end-->
    <!--editbugmodal begin-->
    <div
      class="modal"
      id="edit-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Bug</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <form @submit.prevent="editBug(bug.id)">
                <div class="form-group row">
                  <label
                    for="inputName"
                    class="col-sm-1-12 col-form-label"
                  >Reported by: {{profile.name}}</label>
                  <div class="col-sm-1-12">
                    <textarea
                      type="text"
                      class="form-control"
                      name="inputNote"
                      id="inputNote"
                      cols="30"
                      v-model.lazy="bug.description"
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="offset-sm-2 col-sm-10">
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!--editbugmodal end-->
  </div>
</template>

<script>
import Note from "../components/Note";
export default {
  name: "BugDetails",
  props: ["bugId"],
  data() {
    return {
      newNote: {},
    };
  },
  mounted() {
    this.$store.dispatch("getById", this.$route.params.bugId);
    this.$store.dispatch("getNotesByBugId", this.$route.params.bugId);
    this.$store.dispatch("getProfile");
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.activeNotes;
    },
    profile() {
      return this.$store.state.profile;
    },
  },
  methods: {
    addNote(currentBugId) {
      this.$store.dispatch("addNote", {
        content: this.newNote.content,
        bugId: currentBugId,
      });
      $("#note-modal").modal("hide");
    },
    editBug(currentBugId) {
      this.$store.dispatch("editBug", this.bug);
      $("#edit-modal").modal("hide");
    },
  },
  components: {
    Note,
  },
};
</script>

<style scoped>
</style>