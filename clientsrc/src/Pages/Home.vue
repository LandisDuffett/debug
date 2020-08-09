<template>
  <div>
    <div class="row">
      <img alt="Vue logo" class="image-fluid" src="../assets/logo.png" />
      <h1>bugger</h1>
    </div>
    <button
      type="button"
      class="col-4 mb-3 btn btn-primary btn-lg"
      data-toggle="modal"
      data-target="#bug-modal"
    >Report</button>
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
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <form @submit.prevent="addBug">
                <div class="form-group row">
                  <label for="inputName" class="col-sm-1-12 col-form-label">Bug name</label>
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
                  <label for="inputDesc" class="col-sm-1-12 col-form-label">Description</label>
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
    <div class="home">
      <bug v-for="bug in bugs" :bug="bug" :key="bug.id"></bug>
    </div>
    <div class="div">
      <router-link :to="{name: 'BugDetails'}">BugDetails</router-link>
    </div>
  </div>
</template>

<script>
import Bug from "../components/Bug";
export default {
  name: "home",
  data() {
    return {
      newBug: {},
    };
  },
  mounted() {
    this.$store.dispatch("getBugs");
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
  },
  methods: {},
  components: {
    Bug,
  },
};
</script>