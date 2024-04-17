<template>
  <div class="loading-parent" v-if="loading">
    <span class="loader"></span>
  </div>
</template>

<script setup lang="ts">
import {loadingStore} from "../../store/loading-store";

const isLoading = loadingStore();
const loading = computed(() => isLoading.showLoading());

</script>

<style scoped lang="scss">

.loading-parent {
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1108;
  position: fixed;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, .5);
}

.loader {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
}

.loader::after,
.loader::before {
  content: '';
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 4px solid var(--blue-3);
  position: absolute;
  left: 0;
  top: 0;
  animation: animloader 2s linear infinite;
}

.loader::after {
  animation-delay: 1s;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>