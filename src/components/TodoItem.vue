<template>
  <div
    class="flex justify-between mb-4 rounded-sm p-px relative"
    :class="todo.dueDatePassed ? 'bg-red-200' : 'bg-sky-200'"
  >
    <div class="w-2/3 p-3 text-lg truncate" :class="todo.completed ? 'line-through' : ''">
      {{ todo.title }}
    </div>
    <div class="todo__options p-3 flex items-center">
      <img
        v-if="todo.dueDate && !todo.reminderTimeInProgress && todo.reminderTimestamp"
        class="block w-4 h-4"
        src="../assets/clock.png"
        alt="clock"
      />
      <img
        v-if="todo.dueDate && todo.reminderTimeInProgress && !todo.alarmSnoozed"
        class="block w-4 h-4 cursor-pointer"
        src="../assets/clock-ringing.gif"
        alt="clock-ringing"
        @click="snoozeAlarm(todo.id)"
      />
      <audio
        v-if="todo.dueDate && todo.reminderTimeInProgress && !todo.alarmSnoozed"
        src="../assets/mixkit-scanning-sci-fi-alarm-905.wav"
        autoplay
        loop
      ></audio>

      <img
        title="Delete task"
        class="block w-4 h-4 mx-4 cursor-pointer"
        src="../assets/trash3.svg"
        @click="updateStoreProperties({ dltCnfModalData: todo })"
      />

      <div title="More options" class="cursor-pointer todo__options">
        <img
          class="block w-4 h-4 mr-2"
          src="../assets/three-dots-vertical.svg"
          alt="More options"
          @click.stop="updateStoreProperties({ selectedOption: todo.id })"
        />
        <div
          v-if="selectedOption === todo.id"
          class="todo__options-container flex flex-col absolute z-10 right-5 top-2.5 py-2 bg-white shadow-lg shadow-black-500/40"
        >
          <span
            class="flex items-center py-1 px-4 hover:bg-slate-100"
            @click="
              updateStoreProperties({ selectedOption: null });
              openModal(todo);
            "
          >
            <img class="block w-4 h-4 mr-4 cursor-pointer" src="../assets/pencil.svg" />
            Edit</span
          >
          <span
            class="flex items-center py-1 px-4 hover:bg-slate-100"
            @click="
              updateStoreProperties({ selectedOption: null });
              toggleCompleted(todo.id);
            "
          >
            <img
              class="block w-4 h-4 mr-4 cursor-pointer"
              src="../assets/check-square.svg"
            />
            {{ todo.completed ? "Mark Incomplete" : "Mark Complete" }}</span
          >
          <span
            class="flex items-center py-1 px-4 hover:bg-slate-100"
            @click="
              updateStoreProperties({ selectedOption: null });
              duplicateTask(todo);
            "
          >
            <img
              class="block w-4 h-4 mr-4 cursor-pointer"
              src="../assets/clipboard.svg"
              alt="duplicate task"
            />Duplicate</span
          >
        </div>
      </div>
    </div>
    <div
      v-if="todo.dueDate && !todo.dueDatePassed"
      class="absolute -bottom-2.5 left-3 text-violet-600 text-sm right"
    >
      <span class="text-violet-600">Due:</span>
      {{ formattedDate(todo.dueDate) }}
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "TodoItem",
  props: ["todo", "snoozeAlarm", "duplicateTask", "formattedDate"],
  data() {
    return {
      optionsActive: false,
    };
  },
  computed: {
    ...mapState(["selectedOption"]),
  },
  methods: {
    ...mapMutations(["openModal", "toggleCompleted", "updateStoreProperties"]),
  },
};
</script>

