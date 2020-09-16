<template>
  <div class="home container-fluid bg-info vh-100">
    <div class="row justify-content-center p-2">
      <h3 class="text-center bg-primary border border-rounded p-2" style="width: 50%">BUG DETAILS</h3>
    </div>
    <div class="row justify-content-center">
      <h5>
        <strong>
          <u>Bug title: {{bug.title}}</u>
        </strong>
      </h5>
    </div>
    <div class="row">
      <h1 class="pl-2"></h1>
    </div>
    <div class="row" style="justify-content: space-between;">
      <span class="ml-2">
        <h5>Reported by: {{bug.creatorEmail}}</h5>
      </span>
    </div>
    <div class="row pl-2">
      <h5>
        Status:
        <span v-if="bug.closed == true" class="text-danger mr-2">closed</span>
        <span v-else class="mr-2">open</span>
      </h5>
    </div>

    <div class="row pl-2">
      <h5>Description of bug:</h5>
    </div>
    <div class="container-fluid">
      <div class="row border border-success text-info bg-light mb-3">
        <div class="col-12">
          <p class="text-dark">{{bug.description}}</p>
        </div>
      </div>
    </div>
    <div class="row" style="justify-content: space-between">
      <button
        type="button"
        class="mb-3 ml-3 btn btn-primary btn-sm"
        data-toggle="modal"
        data-target="#edit-modal"
        v-show="!bug.closed"
      >Edit Bug</button>
      <div>
        <button
          @click="deleteBug(bug.id)"
          v-show="!bug.closed"
          class="btn btn-danger btn-sm mr-3 border"
        >Close Bug</button>
      </div>
    </div>
    <div class="col-12">
      <div class="row border border-success text-info align-items-center bg-secondary">
        <div class="col-4 border-right border-success bg-secondary text-danger p-1">User</div>
        <div class="col-4 border-right border-success bg-secondary text-danger p-1">Comment</div>
        <div class="col-4 border-right border-success bg-secondary text-danger p-1">Delete Comment</div>
      </div>
      <div class="row bg-light">
        <note v-for="note in notes" :note="note" :key="note.id"></note>
      </div>
    </div>
    <div>
      <button
        type="button"
        class="col-4 m-3 btn btn-primary btn-sm"
        data-toggle="modal"
        data-target="#note-modal"
      >Add Note</button>
    </div>
    <div>
      <button
        type="button"
        class="col-4 m-3 btn btn-primary btn-sm"
        @click="$router.push({name: 'Home'})"
      >See all bugs</button>
    </div>
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
            <button type="button" class="close btn-small" data-dismiss="modal" aria-label="Close">
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
                  >Reported by: {{bug.creatorEmail}}</label>
                  <div class="col-sm-1-12 ml-2">
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
                    <button type="submit" class="btn btn-primary btn-small">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-small" data-dismiss="modal">Close</button>
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
            <button type="button" class="close btn-small" data-dismiss="modal" aria-label="Close">
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
                  >Reported by: {{bug.creatorEmail}}</label>
                  <div class="col-sm-1-12 ml-2">
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
                    <button type="submit" class="btn btn-primary btn-small">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-small" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!--editbugmodal end-->
  </div>
</template>

<script>
import Note from "../components/Note";
import router from "../router";
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

    deleteBug(bugId) {
      confirm("Are you sure you want to close this bug report?");
      this.$store.dispatch("editBug", {
        id: bugId,
        creatorEmail: this.bug.creatorEmail,
        closed: true,
      });
    },
  },
  components: {
    Note,
  },
};
</script>

<style scoped>
</style>