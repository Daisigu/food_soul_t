<template>
  <div class="location-list" v-if="locations.length && !searchLoading">
    <location-list-item
      v-for="location in locations"
      :key="location.osm_id"
      :location="location"
    />
  </div>
  <div v-else-if="!locations.length && !searchLoading" class="empty-data">
    No locations found
  </div>
  <ui-spinner :loading="searchLoading" :center="true" />
</template>

<script setup lang="ts">
import uiSpinner from "../../shared/components/ui-spinner.vue";
import locationListItem from "./location-list-item.vue";
import { useLocationsStore } from "@/stores/location";
import { storeToRefs } from "pinia";
const searchStore = useLocationsStore();
const { locations, searchLoading } = storeToRefs(searchStore);
</script>
