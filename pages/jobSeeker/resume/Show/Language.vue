<template>
  <Cvprogress/>
  <div class="container-fluid">
    <div class="col-12 px-1 bg-white">
      <!----------->
      <span>سوابق زبان ها  </span>
      <div class="col-12 px-1 bg-white mt-accordion">
        <div v-for="(data, index) in UserData"
             :key="index"
             class="accordion-item col-12 border -font-1-25 bg-blue-6 mb-3 border-bottom-2 ">
          <div class="accordion-header d-flex justify-content-between my-1 mx-3 p-3"
               @click="toggleAccordion(index)">
            <span>{{ data.languageTitle }}</span>
            <img alt="logo"
                 src="/img/icon/chevron-down.svg"
                 width="17"/>
          </div>
          <div :class="{'active': data.active}"
               class="accordion-content d-flex align-items-center justify-content-between flex-wrap   bg-gray-5">
            <div class="d-flex col-12 p-3 justify-content-between">
              <div class="d-flex col-6  p-3">
                <span>نوع زبان:</span>
                <span>{{ data.certificateLanguage }}</span>
              </div>
              <div class="d-flex gap-3">
                <img alt="logo"
                     src="/img/icon/delete.svg"
                     width="25"
                     @click="DeleteButton(data)"
                />  <img alt="logo"

                         src="/img/icon/pen.svg"
                         width="25"
                         @click="EditButton(data)"
              />
              </div>
            </div>
            <div class="d-flex col-6   p-3">
              <span>نوع مدرک زبان:</span>
              <span>{{ data.languguageTypeTitle }} </span>
            </div>
            <div class="d-flex col-6   p-3">
              <span>سطح ترجمه: </span>
              <span>{{ data.levelTranslateTitle }}</span>
            </div>
            <div class="d-flex col-6   p-3">
              <span>سطح نوشتن:</span>
              <span>{{ data.levelWritingTitle }}</span>
            </div>
            <div class="d-flex col-6   p-3">
              <span>سطح خواندن:</span>
              <span>{{ data.levelReadingTitle }}</span>
            </div>
            <div class="d-flex col-6   p-3">
              <span>نمره ی کسب شده: </span>
              <span>{{ data.degreeLanguage }}</span>
            </div>
            <div class="d-flex col-6   p-3">
              <span>سطح مکالمه:</span>
              <span>{{ data.levelConversationTitle }}</span>
            </div>
            <div class="d-flex col-6   p-3">
              <span>سطح شنیدن:</span>
              <span>{{ data.levelListeningTitle }}</span>
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
                 to="/jobSeeker/resume/edit/LanguageRecord">
        افزودن زبان
      </nuxt-link>
    </span>
      <img alt="logo" src="/img/icon/Group 621.svg"
           width="50"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Cvprogress from "~/components/jobSeeker/Cvprogress.vue"
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {MakeResponse} from "~/composables/make-response";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {BasePage} from "~/core/base/base-page";

definePageMeta({
  name: " نمایش زبان ها"
});


const UserData = ref([])

const activeAccordion = ref(false)
const activeAccordion2 = ref(false)
onMounted(() => {

  GetForeignLanguage()
})

const GetForeignLanguage = ()=>{
  MakeResponse.makeServerResponse(JobSeekerServices.GetForeignLanguage({nationalCode: BasePage.getLoggedUser().userName}), true, result => {
    if (result && result.result) {
      UserData.value = result.data
    }
  })
}



const toggleAccordion = (index: number) => {
  UserData.value[index].active = !UserData.value[index].active;
}


const EditButton = (data: any) => {
  const router = useRouter();
  router.push({path: "/jobSeeker/resume/edit/LanguageRecord", query: {id: data.id}});
}


const DeleteButton= (data:any)=>{
  DeleteEduRec(data.id)
}


const DeleteEduRec=(data:number) =>{
  MakeResponse.makeServerResponse(JobSeekerServices.DeleteForeignLanguage(data), true, result => {
    if (result && result.result==true) {
      ToastNotificationService.success('سابقه با موفقیت حذف شد ');
      GetForeignLanguage()
    }
    else {
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
  max-height: 500px; /* ارتفاع حداکثر برای نمایش کامل */
}</style>