<template>
  <div class="title position-relative bg-white">
    <h1 class="text-center text-green-3 font-1-3">خوش آمدید</h1>
    <div class="d-flex col-12">
      <span class="font-0-8 col-12 text-center">ورود با نام کاربری و رمز عبور</span>
    </div>

    <MethodOne/>

    <div class="mx-4 mb-3" @click="onRout()">
      <div class="bg-blue-7 col-12 mt-1 px-3  border-r-1-25 d-flex justify-content-between">
        <p class="btn text-blue-3 text-start">
          ورود از طریق دولت من
        </p>
        <img src="/img/icon/Group 689.svg" alt="" width="20">
      </div>
    </div>

  </div>

  <div class="d-flex bg-green-3 p-2">

    <img src="/img/icon/Group 670.svg" alt="" width="110">

    <div class="col-5 py-4 flex-column justify-content-start text-white ">
      <nuxt-link to="/authorization/jobSeeker/register">
        <span class="font-1-3 text-white">ثبت نام</span>
        <p class="text-white">در سامانه جست جوی شغل</p>
      </nuxt-link>
    </div>

    <nuxt-link class="col-3 d-flex justify-content-end">
      <img src="/img/icon/Group 987.svg" alt="" width="50">
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
import MethodOne from "../../page-components/login/MethodOne.vue";

definePageMeta({
  layout: "login"
});

const onRout = () => {
  const twoDigit = (digit: any) => digit > 9 ? digit : "0" + digit;
  const [month, day, year] = new Date().toLocaleDateString().split("\/").map(e => twoDigit(e));
  const [hour, min, sec] = new Date().toLocaleTimeString().split("\:").map(e => twoDigit(e));
  const milliSec = sec.split(' ')[0];
  const state = (year + month + day + hour + min + milliSec).toString();
  window.open(
      `http://sso.mcls.gov.ir/auth/realms/sso/protocol/openid-connect/auth?response_type=code&client_id=shoghl&scope=openid%20profile%20email&state=${state}&redirect_uri=${window.location.origin}/ssoLogin`)
}

</script>

<style lang="scss" scoped>

label {
  display: block;
  overflow: hidden;
  border-bottom: 1px solid #E4E4E7;
  background: #FFF;
  transition: .5s;
}

.title {
  padding: 0.75rem 1rem;
  z-index: 599;
  background: #fbfbfb;
  transition: .5s;
  color: var(--blue-3);

  &:hover {
    cursor: pointer;
    background: #f5f5f5;
  }

  & i {
    color: rgba(0, 0, 0, .5);
  }

  .pi-chevron-down {
    position: absolute;
    left: 2rem;
    color: var(--blue-3);
    transform: rotate(0deg);
    transition: .5s;
  }
}

.content {
  position: relative;
  padding: 0;
  max-height: 0;
  border-bottom: 1px solid #eee;
  transition: .5s;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"]:checked + .title {

  background-color: white;
  border-bottom: dashed 1px #dadada;
  color: var(--black-2);

  .pi-chevron-down {
    transform: rotate(268deg);
    transition: .5s;
    color: var(--black-2);
  }
}

input[type="checkbox"]:checked + .title + .content {
  max-height: fit-content;
}

input[type="checkbox"]:checked + .title + .content {
  transform: scale(1);
  opacity: 1;
  padding: .5rem
}

</style>