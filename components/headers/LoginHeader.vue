<template>
  <div class="row p-0 m-0 justify-content-between align-items-center position-relative bg-gray-3">
    <div class="col-6 p-2 d-flex justify-content-center">
      <img src="/img/header/logo.svg" alt="logo" width="100"/>
    </div>

    <div class="col-6 p-0 d-flex justify-content-end">
      <img src="/img/header/header-side.svg" alt="" width="140"/>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.logo {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .ministry {
    width: 4rem;
  }
}
</style>