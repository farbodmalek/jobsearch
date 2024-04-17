<template>
  <div class="nav-box bg-white h-6" id="nav-box">
    <div class="row m-0 p-0 justify-content-center gap-2">

      <div class="col-2 text-center position-relative align-items-center d-flex justify-content-center">
        <nuxt-link class="d-flex flex-column align-items-center cursor-pointer" to="/jobSeeker/search/Opportunity">
          <img class="text-center cursor-pointer" alt="" src="/img/icon/job%20search%20on.svg" width="50">
          <p class="font-0-8 position-absolute " style="top:45px">جستجوی شغل </p>
        </nuxt-link>
      </div>

      <div class="col-2  text-center position-relative align-items-center d-flex justify-content-center">
        <nuxt-link class="d-flex flex-column align-items-center cursor-pointer" to="/jobSeeker/resume/cv">
          <img class="text-center cursor-pointer" alt="" src="/img/icon/resume%20on.svg" width="50">
          <p class="font-0-8 position-absolute " style="top:45px">رزومه</p>
        </nuxt-link>
      </div>

      <div class="col-2 position-relative align-items-center d-flex justify-content-center">
        <nuxt-link class="d-flex flex-column align-items-center cursor-pointer" to="/jobSeeker/job-request/Add">
          <img class="cursor-pointer" alt="" src="/img/icon/request%20on.svg" width="50">
          <p class="font-0-8 position-absolute text-center " style="top:45px">درخواست‌ شغل </p>
        </nuxt-link>
      </div>

      <div class="col-2 text-center position-relative align-items-center d-flex justify-content-center">
        <nuxt-link class="d-flex flex-column align-items-center cursor-pointer" to="/jobSeeker/job-request/List">
          <img class="cursor-pointer" alt="" src="/img/icon/history%20on.svg" width="50">
          <p class="font-0-8 position-absolute " style="top:45px">سوابق درخواست  </p>
        </nuxt-link>
      </div>

      <div class="col-2 text-center position-relative align-items-center d-flex justify-content-center">
        <nuxt-link class="cursor-pointer d-flex flex-column align-items-center" to="/jobSeeker/Dashboard">
          <img class="cursor-pointer" alt="" src="/img/icon/home%20on.svg" width="50">
          <p class="font-0-8 position-absolute " style="top:45px">خانه</p>
        </nuxt-link>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
</script>