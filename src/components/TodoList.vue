<template>
  <div class="max-h-[460px] overflow-auto min-h-[450px]">
    <todo-item
      v-for="todo in displayResults"
      :key="todo.id"
      v-bind:todo="todo"
      v-bind:duplicate-task="duplicateTask"
      v-bind:formatted-date="formattedDate"
      v-bind:snooze-alarm="snoozeAlarm"
    ></todo-item>

    <div v-if="!todoList.length" class="text-lg w-48 text-center m-auto mt-24">
      Nothing create yet. Click on Create Todos to get started on your list.
    </div>

    <div
      v-if="todoList.length && !displayResults.length"
      class="text-lg w-48 text-center m-auto mt-24"
    >
      No valid results found...
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { cloneDeep } from "../utils/index";
import TodoItem from "./TodoItem.vue";

export default {
  name: "TodoList",

  components: {
    "todo-item": TodoItem,
  },

  methods: {
    ...mapMutations([
      "openModal",
      "toggleCompleted",
      "updateStoreProperties",
      "checkReminders",
    ]),

    formattedDate: function (dueDate) {
      let ddStr = new Date(dueDate).toDateString();
      let ddArr = ddStr.split(" ");
      let date = `${ddArr[1]} ${ddArr[2]}`;
      if (new Date().toDateString() === ddStr) {
        date = "Today";
      }

      let ts = new Date(dueDate).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${date} - ${ts}`;
    },

    duplicateTask: function (todo) {
      let currentTodo = cloneDeep(todo);
      currentTodo.id = null;
      currentTodo.completed = false;
      currentTodo.dueDatePassed = false;
      currentTodo.alarmSnoozed = false;
      this.$store.commit("openModal", currentTodo);
    },

    snoozeAlarm: function (id) {
      let todoList = this.$store.state.todoList.map((todo) => {
        if (todo.id === id) {
          todo.alarmSnoozed = true;
        }
        return todo;
      });
      this.$store.commit("updateStoreProperties", { todoList });
    },
  },

  computed: {
    ...mapState(["todoList", "selectedTab", "dltCnfModalData"]),

    displayResults: function () {
      let results = cloneDeep(this.$store.state.todoList);

      switch (this.$store.state.selectedTab) {
        case "pending":
          results = results.filter((todo) => !todo.completed);
          break;
        case "completed":
          results = results.filter((todo) => todo.completed);
          break;
        default:
          break;
      }

      const searchedResults = results.filter((todo) =>
        todo.title.toLowerCase().includes(this.$store.state.searchText.toLowerCase())
      );
      return searchedResults;
    },
  },

  watch: {
    todoList: function (newVal) {
      localStorage.setItem("todoItems", JSON.stringify(newVal));
    },
  },

  mounted: function () {
    const todoList = JSON.parse(localStorage.getItem("todoItems"));
    if (todoList && todoList.length) {
      this.$store.commit("updateStoreProperties", { todoList });
    }
    this.$store.commit("checkReminders");

    setInterval(() => {
      this.$store.commit("checkReminders");
    }, 15000);

    document.addEventListener("click", () => {
      this.$store.commit("updateStoreProperties", { selectedOption: null });
    });
  },
};
</script>
