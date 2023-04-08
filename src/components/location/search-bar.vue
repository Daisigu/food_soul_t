<template>
  <input
    v-model="searchQuery"
    type="text"
    placeholder="Type to search location"
    class="search-bar-input"
    @keyup="handleKeyup"
  />
</template>

<script setup lang="ts">
import { useLocationsStore } from "@/stores/location";
import { storeToRefs } from "pinia";
import debounce from "lodash.debounce";
const searchStore = useLocationsStore();
const { getLocation } = searchStore;
const { searchQuery } = storeToRefs(searchStore);
const handleKeyup = debounce(async (event) => {
  const keyLength = event.key.length;
  const keyCode = event.keyCode;
  if (keyLength === 1 || keyCode === 13 || keyCode === 8 || keyCode===32) {
    await getLocation();
  }
}, 500);
</script>

<style scoped lang="scss">
.search-bar-input {
  width: 100%;
  margin-bottom: 2rem;
  border: 1px solid lightgray;
  padding: 0.6rem 0.5rem;
  border-radius: 0.25rem;
  transition: transform 0.3s ease;

  &:focus {
    outline: none;
    border: 1px solid rgb(30, 149, 222);
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    transform: scale3d(1.1, 1.1, 1.1);
    font-size: 20px;
  }
}
</style>
