<template>
  <div id="app-layout">
    <Splash v-if="showSplash"></Splash>
    <template v-else>
      <main class="container" id="container">
        <RegisterHeader/>
        <BaseLayout class="mb-5">
          <slot/>
        </BaseLayout>

      </main>
    </template>
    <DynamicDialog />
  </div>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import Splash from "~/page-components/common/Splash.vue";
import RegisterHeader from "~/components/headers/RegisterHeader.vue";
import BaseLayout from "~/components/BaseLayout.vue";
import Sidebar from "~/components/sidebar/Sidebar.vue";

let showSplash = ref();

const updateSize = () => {
  const style = document.getElementById('container');
  if (style) {
    style.style.height = String(parent.innerHeight) + 'px';
  }
}

onMounted(() => {
  if (JSON.parse(localStorage.getItem("splash")) === null) {
    localStorage.setItem('splash', JSON.stringify(true));
    showSplash.value = true;
  }
  setTimeout(() => {
    if (JSON.parse(localStorage.getItem("splash")) === true) {
      localStorage.setItem('splash', JSON.stringify(false));
      showSplash.value = false;
    }
  }, 3000)
  updateSize();
});

</script>

<style scoped>

</style>