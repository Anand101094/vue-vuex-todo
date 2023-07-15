<template>
  <div class="flex relative">
    <input
      type="text"
      placeholder="Search Todos..."
      :value="searchText"
      @input="updateSearchText"
      class="border rounded-sm border-slate-300 p-2 w-full mb-8"
    />

    <button
      class="font-bold text-l px-5 py-2 bg-sky-300 rounded-sm absolute right-0 border border-sky-300"
      @click="openModal(currentTodo)"
    >
      + Add Todos
    </button>

    <todo-create-modal></todo-create-modal>
    <delete-conf-modal></delete-conf-modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import TodoCreateModal from "./TodoCreateModal.vue";
import DeleteModal from "./DeleteModal.vue";

export default {
  name: "TodoBar",

  components: {
    "todo-create-modal": TodoCreateModal,
    "delete-conf-modal": DeleteModal,
  },

  data() {
    return {};
  },

  computed: {
    ...mapState(["searchText", "currentTodo"]),
  },

  methods: {
    ...mapMutations(["openModal"]),

    updateSearchText: function (e) {
      this.$store.commit("updateStoreProperties", {
        searchText: e.target.value,
      });
    },
  },
};
</script>
