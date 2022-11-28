<template>
  <div
    class="absolute bottom-0 left-0 right-0 border-t border-slate-300 flex border-sky-200"
  >
    <button
      @click="updateStoreProperties({ selectedTab: 'all' })"
      class="w-1/3 text-center border-r py-2"
      :class="selectedTab === 'all' ? 'bg-sky-300' : ''"
    >
      All
    </button>
    <button
      @click="updateStoreProperties({ selectedTab: 'pending' })"
      class="w-1/3 text-center border-r py-2"
      :class="selectedTab === 'pending' ? 'bg-sky-300' : ''"
    >
      Pending
    </button>
    <button
      @click="updateStoreProperties({ selectedTab: 'completed' })"
      class="w-1/3 text-center py-2"
      :class="selectedTab === 'completed' ? 'bg-sky-300' : ''"
    >
      Completed
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "TodoFilter",

  methods: {
    ...mapMutations(["updateStoreProperties"]),
  },

  computed: {
    ...mapState(["selectedTab"]),
  },
};
</script>

<style scoped></style>
