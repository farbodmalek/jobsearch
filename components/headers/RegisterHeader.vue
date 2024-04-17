<template>
  <div>
    <div class="d-flex justify-content-between align-items-center container-fluid">
      <div class="col-3">
        <img src="/img/header/logo.svg" alt="logo" width=90 />
      </div>
      <div class="col-6 text-center">
        <img v-if="!route.meta.name" src="/img/header/logo.svg" alt="logo" width="100"/>
        <div class="d-flex" v-if="route.meta.name">
        <span class="fw-bold text-blue-3 col-12">
          {{ route.meta.name }}
        </span>
        </div>
      </div>
      <div class="col-3 d-flex justify-content-center">
        <img src="/img/icon/chevron.svg" alt="logo" width="10" @click="BackHandler"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const route = useRoute();
const router = useRouter()
import {useStore} from "~/store/menu-store";

let {toggleSidebar} = useStore();
const BackHandler = () => {
  router.back()
}

</script>

<style scoped>

</style>