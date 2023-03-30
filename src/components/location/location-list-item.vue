<template>
  <div class="location-card">
    <div class="location-card-header">{{ location.display_name }}</div>
    <div class="location-card-body">
      <p>Coordinates: {{ location.lat }}, {{ location.lon }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from "vue";

interface Location {
  lat: string;
  lon: string;
  display_name: string;
}
interface Props {
  location: Location;
}
const props = defineProps<Props>();
const { location } = toRefs(props);
</script>
<style scoped lang="scss">
.location-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgb(248, 248, 248);
    cursor: pointer;
    transform: scale3d(1.1, 1.1, 1.1);
  }

  &-header {
    font-weight: 500;
    font-size: 20px;
    margin-bottom: 1rem;
  }
}
</style>
