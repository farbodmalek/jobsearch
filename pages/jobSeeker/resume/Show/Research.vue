<template>
  <Cvprogress/>
  <div class="col-12 px-1 bg-white container-fluid ">
    <!----------->
    <span>سوابق پژوهشی   </span>
    <div class="col-12 px-1 bg-white mt-accordion">
      <div v-for="(data, index) in UserData"
           :key="index"
           class="accordion-item col-12 border -font-1-25 bg-blue-6 mb-3 border-bottom-2 ">
        <div class="accordion-header d-flex justify-content-between my-1 mx-3 p-3"
             @click="toggleAccordion(index)">
          <span>{{ data.titleResearch }}</span>
          <img alt="logo"
               src="/img/icon/chevron-down.svg"
               width="17"/>
        </div>
        <div :class="{'active': data.active}"
             class="accordion-content d-flex  justify-content-between accordion-content  bg-gray-5  ">
          <div class="d-flex col-12 p-3 justify-content-between">
            <input-text v-model="data.description"/>
            <div class="d-flex gap-3">
              <img alt="logo"
                   src="/img/icon/delete.svg"
                   width="25"
                   @click="DeleteButton(data)"
              />
              <img alt="logo"
                      src="/img/icon/pen.svg"
                      width="25"
                      @click="EditButton(data)"
            />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!----------->
  </div>
  <div
      class=" col-10 mt-4 d-flex justify-content-between bg-green-3 px-3 py-2 gap-3 rounded-3 m-auto align-items-center  ">
    <span class="">
      <nuxt-link class=" col-10 font-1 text-white text-center "
                 to="/jobSeeker/resume/edit/ResearchRecord">
        افزدون سابقه پژوهشی
      </nuxt-link>
    </span>
    <img alt="logo"
         src="/img/icon/Group 621.svg"
         width="50"
         @click="EditButton()"/>
  </div>
</template>

<script lang="ts" setup>
import Cvprogress from "~/components/jobSeeker/Cvprogress.vue"
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {MakeResponse} from "~/composables/make-response";
import {BasePage} from "~/core/base/base-page";
import {ToastNotificationService} from "~/core/toast-notification-service";

definePageMeta({
  name: "سوابق پژوهشی "
});

const UserData = ref([])
const activeAccordion = ref(false)
const activeAccordion2 = ref(false)

onMounted(() => {
  GetPersonResearch()
})

const GetPersonResearch = () => {
  MakeResponse.makeServerResponse(JobSeekerServices.GetPersonResearch({nationalCode: BasePage.getLoggedUser().userName}), true, result => {
    if (result) {
      UserData.value = result.results
    }
  })
}

const toggleAccordion = (index: number) => {
  UserData.value[index].active = !UserData.value[index].active;
}

const EditButton = (data: any) => {
  const router = useRouter();
  router.push({path: "/jobSeeker/resume/edit/ResearchRecord", query: {id: data.id}});
}

const DeleteButton = (data: any) => {
  DeleteResearch(data.id)
}

const DeleteResearch = (data: number) => {
  MakeResponse.makeServerResponse(JobSeekerServices.DeletePersonResearch(data), true, result => {
    if (result && result.result == true) {
      ToastNotificationService.success('سابقه با موفقیت حذف شد ');
      GetPersonResearch()
    } else {
      ToastNotificationService.dark('عملیات با خطا روبرو شد')
    }
  })
}

</script>
<style>

.accordion-content {
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  max-height: 0;
}

.accordion-content.active {
  max-height: 794px; /* ارتفاع حداکثر برای نمایش کامل */
}</style>