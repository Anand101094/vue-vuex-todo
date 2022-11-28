<template>
  <div class="cmp-t-modal" :class="todoModalOpen ? '' : 'hidden'">
    <div
      class="cmp-t-modal__overlay flex fixed z-20 inset-0 p-4 overflow-auto bg-black/30 backdrop-blur-[1px]"
    >
      <div
        class="cmp-t-modal__content bg-white rounded-md m-auto px-12 py-8 shadow-lg w-1/2 max-w-lg"
      >
        <form class="flex flex-col">
          <label for="todo-title" class="font-bold text-sm mb-0.5"
            >Title <sup class="text-red-600">*</sup></label
          >
          <input
            type="text"
            v-model="localTodo.title"
            class="border rounded-sm border-slate-300 p-2 w-full mb-6"
            name="todo-title"
            placeholder="What's on your mind..."
          />

          <label for="todo-desc" class="font-bold text-sm mb-0.5">Description</label>
          <textarea
            type="text"
            v-model="localTodo.desc"
            class="border rounded-sm border-slate-300 p-2 w-full mb-8 h-40 max-h-40"
            name="todo-desc"
            placeholder="Add Description..."
          ></textarea>

          <label for="todo-date-picker" class="font-bold text-sm mb-0.5">Due Date</label>
          <input
            type="datetime-local"
            class="border rounded-sm border-slate-300 p-2 w-full mb-6"
            name="todo-date-picker"
            v-model="localTodo.dueDate"
          />

          <label for="todo-reminder-interval" class="font-bold text-sm mb-0.5"
            >Reminder Interval</label
          >
          <select
            v-model="localTodo.reminderTimestamp"
            class="border rounded-sm border-slate-300 p-2 w-full mb-6"
          >
            <option disabled value="">Please select one</option>
            <option value="300000">5 minutes</option>
            <option value="600000">10 minutes</option>
            <option value="900000">15 minutes</option>
            <option value="1800000">30 minutes</option>
            <option value="2700000">45 minutes</option>
            <option value="3600000">1 hour</option>
          </select>
          <button
            @click.prevent="addAndUpdateTodo(localTodo)"
            class="font-bold text-l px-5 py-3 bg-sky-300 rounded-sm mb-2"
          >
            {{ editMode ? "Update Todo" : "Add Todo" }}
          </button>
          <button
            @click.prevent="resetToInitialState"
            class="font-bold text-l px-5 py-3 bg-sky-300 rounded-sm"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep, generateUID } from "../utils/index";
import { mapState } from "vuex";

export default {
  name: "TodoCreateModal",
  data() {
    return {
      localTodo: {
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
    };
  },

  computed: {
    ...mapState(["todoModalOpen", "editMode", "currentTodo"]),
  },

  methods: {
    addAndUpdateTodo: function (todo) {
      // Add todo
      if (todo.id === null) {
        if (!todo.title) return;

        const newTodo = {
          id: generateUID(),
          title: this.localTodo.title,
          desc: this.localTodo.desc,
          completed: false,
          dueDate: this.localTodo.dueDate,
          reminderTimestamp: this.localTodo.reminderTimestamp,
          dueDatePassed: this.localTodo.dueDatePassed,
          reminderTimeInProgress: this.localTodo.reminderTimeInProgress,
          alarmSnoozed: this.localTodo.alarmSnoozed,
        };
        this.$store.commit("addTodoList", newTodo);
      } else {
        // Update todo
        this.$store.commit("updateTodoList", todo);
      }

      this.$store.commit("checkReminders");
      this.resetToInitialState();
    },

    resetToInitialState: function () {
      let localTodo = {
        id: null,
        title: "",
        desc: "",
        dueDate: "",
        reminderTimestamp: "",
        reminderTimeInProgress: false,
        dueDatePassed: false,
        alarmSnoozed: false,
        completed: false,
      };

      this.localTodo = cloneDeep(localTodo);
      this.$store.commit("updateStoreProperties", {
        todoModalOpen: false,
        editMode: false,
        currentTodo: localTodo,
      });
    },
  },

  watch: {
    currentTodo: function (updatedTodo) {
      this.localTodo = cloneDeep(updatedTodo);
    },
  },
};
</script>

<style scoped></style>
