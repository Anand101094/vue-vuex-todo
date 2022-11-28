<template>
  <div id="app">
    <div
      class="app__wrapper w-full mx-4 md:m-0 md:w-1/2 p-2 border border-solid rounded-lg border-slate-300 relative"
    >
      <todo-bar></todo-bar>
      <todo-list></todo-list>
      <todo-filter></todo-filter>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TodoBarVue from "./components/TodoBar.vue";
import TodoList from "./components/TodoList.vue";
import TodoFilter from "./components/TodoFilter.vue";

export default {
  name: "App",

  components: {
    "todo-bar": TodoBarVue,
    "todo-list": TodoList,
    "todo-filter": TodoFilter,
  },

  computed: {
    ...mapState(["searchText", "selectedTab"]),
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-word;
}

.app__wrapper {
  height: 600px;
  max-width: 600px;
  max-height: 80vh;
}
</style>
