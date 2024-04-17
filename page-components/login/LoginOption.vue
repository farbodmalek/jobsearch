<template>
  <div class="p-2">
    <div>
      وارد کدوم پنل میخوایی بشی؟
    </div>

    <div class="d-flex justify-content-around mt-3">
      <div class="box">
        <nuxt-link to="/employer/template">
          <span class="text-white">کارفرمایی</span>
        </nuxt-link>
      </div>

      <div class="box">
        <nuxt-link to="/jobseeker/dashboard">
          <span class="text-white">کارجویی</span>
        </nuxt-link>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.box {
  padding: .75rem 1.25rem;
  border-radius: .5rem;
  background-color: var(--blue-5);
  color: white;
}
</style>