<template>
  <div class="cmp-dlt-cnf-modal" :class="dltCnfModalData ? '' : 'hidden'">
    <div
      class="cmp-t-modal__overlay flex z-10 fixed inset-0 p-4 overflow-auto bg-black/30 backdrop-blur-[1px]"
    >
      <div
        class="cmp-t-modal__content bg-white rounded-md m-auto px-12 py-8 shadow-lg w-1/2 max-w-md"
      >
        <p class="text-center mb-6">
          Are you sure you don't want to {{ dltCnfModalData && dltCnfModalData.title }} ?
        </p>
        <div class="flex items-center justify-center">
          <button
            @click="updateStoreProperties({ dltCnfModalData: null })"
            class="font-bold text-l px-5 py-2 bg-sky-300 rounded-sm right-0 border border-sky-300 mr-3"
          >
            No, Cancel
          </button>
          <button
            @click="removeTodo(dltCnfModalData.id)"
            class="font-bold text-l px-5 py-2 bg-red-300 rounded-sm right-0 border border-red-300"
          >
            Yes, Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "DeleteModal",

  methods: {
    ...mapMutations(["updateStoreProperties"]),

    removeTodo: function (id) {
      const filteredTodos = this.$store.state.todoList.filter((todo) => todo.id !== id);
      this.$store.commit("updateStoreProperties", {
        todoList: filteredTodos,
        dltCnfModalData: null,
      });
    },
  },

  computed: {
    ...mapState(["dltCnfModalData"]),
  },
};
</script>

<style scoped></style>
