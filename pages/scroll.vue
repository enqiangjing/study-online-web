<template>
  <div
    class="infinite-list"
    v-infinite-scroll="load"
    infinite-scroll-distance="10"
    style="overflow: auto"
  >
    <div v-for="i in count" class="infinite-list-item" :key="i">{{ i }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 100,
    }
  },
  methods: {
    load() {
      this.count += 6
    },
  },
}
</script>

<style>
.infinite-list {
  height: 100%;
}
</style>
