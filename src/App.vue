<script setup>
import searchBar from "./components/location/search-bar.vue";
import locationList from "./components/location/location-list.vue";
</script>

<template>
  <div class="search">
    <search-bar />
    <location-list />
  </div>
</template>

<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.search {
  margin-top: 5rem;
  width: 70%;
}
</style>
