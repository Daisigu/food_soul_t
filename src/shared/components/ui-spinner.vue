<template>
  <div v-if="props.loading" class="spinner" :class="{ center: props.center }">
    <div class="spinner-ring"></div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  loading: boolean;
  center?: boolean | undefined;
}
const props = defineProps<Props>();
</script>
<style scoped>
@keyframes spinner-ring {
  to {
    transform: rotate(360deg);
  }
}

.spinner-ring {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: -0.125em;
  border: 0.1em solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: 0.5s linear infinite spinner-ring;
  animation: 0.5s linear infinite spinner-ring;
}

.spinner {
  z-index: 1;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
