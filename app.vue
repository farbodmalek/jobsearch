<template>
  <div>
    <VitePwaManifest />
    <Loading/>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import Loading from "./components/loading/Loading.vue";
</script>
