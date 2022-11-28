import Vue from "vue";
import Vuex from "vuex";
import { cloneDeep } from "../utils/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentTodo: {
      id: null,
      title: "",
      desc: "",
      dueDate: "",
      reminderTimestamp: "",
      reminderTimeInProgress: false,
      dueDatePassed: false,
      alarmSnoozed: false,
      completed: false,
    },
    editMode: false,
    todoList: [],
    todoModalOpen: false,
    dltCnfModalData: null,
    searchText: "",
    selectedTab: "all",
    selectedOption: null
  },

  mutations: {
    updateStoreProperties: function (state, data) {
      Object.entries(data).map(([key, val]) => {
        state[key] = val;
      });
    },

    addTodoList: function (state, todo) {
      state.todoList.push(todo);
    },

    updateTodoList: function (state, targetTodo) {
      state.todoList = state.todoList.map((item) => {
        if (item.id === targetTodo.id) return targetTodo;
        return item;
      });
    },

    toggleCompleted: function (state, id) {
      state.todoList = state.todoList.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    },

    checkReminders: function (state) {
      state.todoList.forEach((todo) => {
        const { dueDate, reminderTimestamp } = todo;
        if (dueDate) {
          const dueDateTimestamp = new Date(dueDate).getTime();
          const snoozeTime = dueDateTimestamp - Number(reminderTimestamp);

          if (Date.now() >= snoozeTime) {
            todo.reminderTimeInProgress = true;
          }

          if (Date.now() >= dueDateTimestamp) {
            todo.dueDatePassed = true;
          } else {
            todo.dueDatePassed = false;
          }
        }
      });
    },

    openModal: function (state, todo) {
      let currentTodo = cloneDeep(todo);
      currentTodo.dueDatePassed = false;
      currentTodo.reminderTimeInProgress = false;
      currentTodo.alarmSnoozed = false;
      if (currentTodo.id) {
        state.editMode = true;
      }

      state.currentTodo = currentTodo;
      state.todoModalOpen = true;
    },
  },
});

export default store;
