<template>
  <div>
    <p>پیامکی حاوی رمز یکبار مصرف برای شما ارسال شده است.</p>

    <div class="mx-4 p-2">

      <form @submit.prevent>
        <Otp v-model="wayTwo.otp"/>

        <div class="mt-3">
          <button type="button" class="btn btn-primary bg-blue-3 w-100 border-r-1-25 p-3" @click="onSubmit2()">
            ورود
          </button>
          <p class="mt-2 font-0-8">برای دریافت مجدد رمز یکبار مصرف کلیک کنید</p>
        </div>
      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import Otp from "~/page-components/Otp.vue";

const wayTwo = reactive({
  otp: ''
});

const onSubmit2 = () => {
}
</script>

<style scoped>

</style>