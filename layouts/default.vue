<template>
  <div id="app-layout">
    <Splash v-if="showSplash"></Splash>
    <template v-else>
      <main class="container" id="container">
        <Sidebar></Sidebar>
        <BaseLayout class="mb-5">
          <slot/>
        </BaseLayout>
        <Navbar/>
      </main>
    </template>
    <DynamicDialog/>
    <ConfirmPopup></ConfirmPopup>
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/Navbar.vue";
import Splash from "../page-components/common/Splash.vue";
import BaseLayout from "../components/BaseLayout.vue";
import Sidebar from "../components/sidebar/Sidebar.vue";

let showSplash = ref();

const updateSize = () => {
  const style = document.getElementById('container');
  if (style) {
    style.style.height = String(parent.innerHeight) + 'px';
  }
}

window.addEventListener('touchmove', function (event) {
  // console.log(event.touches);

// if (scroll > event.touches[0].clientY) {
  //   console.log(1)
  // }
  // const scroll = event.touches[0].clientY;
  // if (scroll)
  // console.log(event)
});

onMounted(() => {
  if (JSON.parse(<string>localStorage.getItem("splash")) === null) {
    localStorage.setItem('splash', JSON.stringify(true));
    showSplash.value = true;
  }
  setTimeout(() => {
    if (JSON.parse(<string>localStorage.getItem("splash")) === true) {
      localStorage.setItem('splash', JSON.stringify(false));
      showSplash.value = false;
    }
  }, 3000);
  updateSize();
});
</script>

<style scoped>

</style>

<!--<template>-->
<!--  <div id="app-layout">-->
<!--    <Splash v-if="showSplash"></Splash>-->
<!--    <template v-else>-->
<!--      <main class="container" id="container" ref="container">-->
<!--        <Sidebar></Sidebar>-->
<!--        <Header />-->
<!--        <BaseLayout class="mb-5" id="base">-->
<!--          <slot />-->
<!--        </BaseLayout>-->
<!--        <Navbar v-if="!hideNavbar" />-->
<!--      </main>-->
<!--    </template>-->
<!--    <DynamicDialog />-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref, onMounted, onBeforeUnmount } from "vue";-->
<!--import Navbar from "~/components/Navbar.vue";-->
<!--import Splash from "~/page-components/common/Splash.vue";-->
<!--import Header from "~/components/headers/Header.vue";-->
<!--import BaseLayout from "~/components/BaseLayout.vue";-->
<!--import Sidebar from "~/components/sidebar/Sidebar.vue";-->

<!--let showSplash = ref();-->
<!--let container = ref<HTMLElement | null>(null);-->
<!--let hideNavbar = ref(false);-->

<!--const updateSize = () => {-->
<!--  const style = document.getElementById("container");-->
<!--  if (style) {-->
<!--    style.style.height = String(parent.innerHeight) + "px";-->
<!--  }-->
<!--};-->

<!--// const created = () => {-->
<!--//   console.log(2)-->
<!--//   if (process.client) {-->
<!--//     window.addEventListener("scroll", handleScroll);-->
<!--//   }-->
<!--// }-->

<!--// const handleScroll = () => {-->

<!--// if (process.client) {-->
<!--//   var currentScrollPosition = window.scrollY-->
<!--//   console.log(1)-->
<!--//   // if(currentScrollPosition < this.scrollPosition){-->
<!--//   //   console.log("Scrolling up");-->
<!--//   //   this.showFullNav = true-->
<!--//   //   //your desire logic-->
<!--//   // }-->
<!--//   // else{-->
<!--//   //   this.showFullNav = false-->
<!--//   //   console.log("Scrolling down");-->
<!--//   //   //your desire logic-->
<!--//   //-->
<!--//   // }-->
<!--//   //-->
<!--//   // this.scrollPosition = window.scrollY-->
<!--// }-->
<!--// }-->

<!--onMounted(() => {-->
<!--  container.value = document.getElementById("base");-->

<!--  if (container.value) {-->
<!--    window.addEventListener("scroll", handleScroll);-->
<!--  }-->
<!--});-->

<!--onBeforeUnmount(() => {-->
<!--  if (container.value) {-->
<!--    window.removeEventListener("scroll", handleScroll);-->
<!--  }-->
<!--});-->

<!--const handleScroll = () => {-->
<!--  if (container.value) {-->
<!--    hideNavbar.value = window.scrollY > 0;-->
<!--  }-->
<!--};-->

<!--onMounted(() => {-->
<!--  if (JSON.parse(<string>localStorage.getItem("splash")) === null) {-->
<!--    localStorage.setItem("splash", JSON.stringify(true));-->
<!--    showSplash.value = true;-->
<!--  }-->
<!--  setTimeout(() => {-->
<!--    if (JSON.parse(<string>localStorage.getItem("splash")) === true) {-->
<!--      localStorage.setItem("splash", JSON.stringify(false));-->
<!--      showSplash.value = false;-->
<!--    }-->
<!--  }, 3000);-->
<!--  updateSize();-->
<!--  // created();-->
<!--});-->
<!--</script>-->

<!--<style scoped></style>-->


