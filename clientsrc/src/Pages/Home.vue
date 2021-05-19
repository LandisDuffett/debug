<template>
  <div>
    <div class="row justify-content-center">
      <button
        type="button"
        class="col-4 mb-3 btn btn-danger text-white btn-small m-1 mt-2"
        data-toggle="modal"
        data-target="#bug-modal"
      >
        Report Bug
      </button>
    </div>
    <!--Modal-->
    <div
      class="modal"
      id="bug-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Report Bug</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <form @submit.prevent="addBug">
                <div class="form-group row">
                  <label for="inputName" class="col-sm-1-12 col-form-label mr-2"
                    >Bug name</label
                  >
                  <div class="col-sm-1-12">
                    <input
                      type="text"
                      class="form-control"
                      name="inputName"
                      id="inputName"
                      placeholder="Name the bug..."
                      v-model="newBug.title"
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="inputDesc" class="col-sm-1-12 col-form-label mr-2"
                    >Description</label
                  >
                  <div class="col-sm-1-12">
                    <textarea
                      type="text"
                      class="form-control"
                      name="inputDesc"
                      id="inputDesc"
                      cols="30"
                      v-model="newBug.description"
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="offset-sm-2 col-sm-10">
                    <button type="submit" class="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="home container-fluid">
      <div class="col-12">
        <div
          class="row border border-success text-info align-items-center bg-secondary"
        >
          <div
            class="col-3 border-right border-success pl-4 bg-secondary text-danger"
          >
            Title (click for details)
          </div>
          <div
            class="col-3 border-right border-success bg-secondary text-danger"
          >
            Reported By
          </div>
          <div
            class="col-3 border-right border-success bg-secondary text-danger"
          >
            Status
            <button
              @click="sortBugs = !sortBugs"
              class="btn-small btn-info text-white m-1"
            >
              sort
            </button>
          </div>
          <div class="col-3 bg-secondary text-danger">Last Modified</div>
        </div>
        <bug v-for="bug in bugs" :bug="bug" :key="bug.id"></bug>
      </div>
    </div>
  </div>
</template>

<script>
import Bug from "../components/Bug";
import Profile from "../components/Prof";
export default {
  name: "home",
  data() {
    return {
      newBug: {},
      sortBugs: false,
    };
  },
  mounted() {
    this.$store.dispatch("getBugs");
    this.$store.dispatch("getProfile");
  },
  computed: {
    profile() {
      return this.$store.state.Profile;
    },
    bugs() {
      let bugs = this.$store.state.bugs;
      let displayBugs = [];
      for (let x = 0; x < bugs.length; x++) {
        if (bugs[x].closed == true) {
          bugs[x].closed == 2;
          displayBugs.push(bugs[x]);
        } else {
          bugs[x].closed == 1;
          displayBugs.push(bugs[x]);
        }
      }
      if (this.sortBugs) {
        displayBugs = displayBugs.sort((a, b) => a.closed - b.closed);
        console.log(displayBugs);
      }

      return displayBugs;
    },
  },
  methods: {
    addBug() {
      this.$store.dispatch("addBug", this.newBug);
      $("#bug-modal").modal("hide");
    },
  },
  components: {
    Bug,
  },
};
</script>