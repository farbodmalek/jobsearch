<template>
  <div class="container h-100 ">
    <div class="bg-splash d-flex flex-column align-items-center justify-content-evenly position-relative">

      <div class="icons">
        <span class="text-white"><i class="pi pi-chevron-right"></i></span>
        <span class="text-white"><i class="pi pi-chevron-left"></i></span>
      </div>

      <div class="mt-5">
        <p class="text-white mt-5">کمی درباره ما</p>
        <p class="text-white">سامانه جستجوی شغل کل کشور</p>
      </div>
      <img src="/img/header/walkTroughLogo.svg" alt="walkTroughLogo" width="130"/>
    </div>
    <div>
      <p class="p-4 text-justify">
        لورم ایپسوم متن ساختگی با تولید
        سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون
        و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی
        می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.bg-splash {
  background-image: linear-gradient(var(--blue-4), var(--blue-3));
  height: 75%;
  border-radius: 0 0 11rem 11rem;
}

.icons {
  position: absolute;
  display: flex;
  top: 65%;
  width: 100%;
  justify-content: space-between;
  padding: 0 2rem;
}
</style>