<template>
  <div class="Bug">
    <div class="bg-light text-success border rounded p-3">
      <div class="row justify-content-between ml-2 mt-1 mr-3">
        <tr>
          <router-link :to="{name: 'Bug', params: {id: bugData._id}}">
            <td>{{bug.title}}</td>
          </router-link>
          <td>{{prof.name}}</td>
          <td>{{bug.closed}}</td>
          <td>{{bug.updatedAt}}</td>
        </tr>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Bug",
  props: [],
  data() {
    return {
      newBug: {},
    };
  },
  mounted() {},
  computed: {},
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>