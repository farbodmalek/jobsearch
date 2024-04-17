<template>
  <Cvprogress/>
  <span class="text-center col-12">سوابق تحصیلی اخذ شده از نظام اطلاعات بازار کار  </span>
  <div class="col-12 px-1 bg-white mt-accordion">
    <div class="accordion-item col-12 border  -font-1-25 bg-orange-2 mb-3">
      <div class="accordion-header d-flex justify-content-between my-1 mx-3 p-3"
           @click="toggleJobAccordion(2)">
        <span>{{  }}کارشناسی ارشد تصویر سازی</span>
        <img alt="logo"
             src="/img/icon/chevron-down.svg"
             width="17"
             @click="EditButton()"/>

      </div>
      <div :class="{'active': activeAccordion2}" class="accordion-content bg-gray-5">
        <div class="d-flex  justify-content-end p-3">
          <img alt="logo"
               src="/img/icon/chevron-down.svg"
               width="25"
               @click="EditButton()"/>
        </div>
        <div class="d-flex  justify-content-between p-3">
          <span>نوع موسسه/سازمان : </span>

        </div>
        <div class="d-flex justify-content-between p-3">
          <span>میزان حقوق</span>

        </div>
        <div class="d-flex justify-content-between p-3">
          <span>تاریخ پایان</span>

        </div>
        <div class="d-flex justify-content-between p-3">
          <span>تاریخ شروع</span>
        </div>
        <div class="d-flex justify-content-between p-3">
          <span>نام موسسه/سازمان : </span>
          <span>نیکان </span>
        </div>
        <div class="d-flex justify-content-between p-3">
          <span>نوع همکاری : </span>
        </div>
      </div>
    </div>
  </div>
  <span class="text-center col-12">سوابق تحصیلی اظهار شده   </span>
  <div class="col-12 px-1 bg-white mt-accordion">
    <div v-for="(data, index) in UserData"
         :key="index"
         class="accordion-item col-12 border -font-1-25 bg-blue-6 mb-3 border-bottom-2 ">
      <div class="accordion-header d-flex justify-content-between my-1 mx-3 p-3"
           @click="toggleAccordion(index)">
        <span>{{ data.eduLevelTitle ? data.eduLevelTitle : data.educationFieldTitle}}</span>
        <img alt="logo"
             src="/img/icon/chevron-down.svg"
             width="17"
            />
      </div
      >
      <div :class="{'active': data.active}"
           class="accordion-content  bg-gray-5">
        <div class="d-flex col-12 p-3 justify-content-between">
          <div>
            <span> مقطع تحصیلی: </span>
            <span>{{ data.eduLevelTitle }}</span>
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
        <div class="d-flex  justify-content-between p-3">
          <span>رشته ی تحصیلی :  </span>
          <span>{{ data.educationFieldTitle }} </span>
        </div>
        <div>
          <span class="d-flex  justify-content-between p-3">نوع موسسه/سازمان : </span>
          <span>{{ data.organTypeTitle }} </span>
        </div>
        <div class="d-flex  justify-content-between p-3">
          <span>نام محل تحصیل :</span>
          <span>{{ data.universityTitle }}</span>
        </div>
        <div class="d-flex  justify-content-between p-3">
        <span>معدل :</span>
        <span>{{ data.average }} </span>
      </div>
         <div class="d-flex  justify-content-between p-3">
          <span>تاریخ فراغت : </span>
          <span>{{ data.expireEduDate }}</span>
        </div>
        <div class="d-flex  justify-content-between p-3">
          <span>تاریخ شروع : </span>
          <span>{{ data.revocationEduDate }}</span>
        </div>

      </div>
    </div>
  </div>
  <div
      class=" col-10 mt-4 d-flex justify-content-between bg-green-3 px-3 py-2 gap-3 rounded-3 m-auto align-items-center  ">
    <span class="">
      <nuxt-link class=" col-10 font-1 text-white text-center " to="/jobSeeker/resume/edit/EduRecord">
        افزودن سوابق تحصیلی
      </nuxt-link>
    </span>
    <img alt="logo"
         src="/img/icon/Group 621.svg"
         width="50"/>
  </div>
</template>
<script lang="ts" setup>
import Cvprogress from "~/components/jobSeeker/Cvprogress.vue"
import {CommonServices} from "~/core/common/common-services";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {MakeResponse} from "~/composables/make-response";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {BasePage} from "~/core/base/base-page";

definePageMeta({
  name:" نمایش اطلاعات تحصیلات "
});

const UserData = ref([])
const activeAccordion = ref(false)
const activeAccordion2 = ref(false)
const toggleAccordion = (index: number) => {
  UserData.value[index].active = !UserData.value[index].active;
}

onMounted(() => {
    GetEduction()
})

const GetEduction = ()=>{
  MakeResponse.makeServerResponse(JobSeekerServices.GetEducation({nationalCode: BasePage.getLoggedUser().userName}), true, result => {
    if (result) {
      UserData.value = result.results
    }
})
}

const EditButton= (data:any)=>{
  const router = useRouter();
  router.push({path: "/jobSeeker/resume/edit/EduRecord",query:{id:data.id}});
}

const DeleteButton= (data:any)=>{
  DeleteEduRec(data.id)
}

const DeleteEduRec=(data:number) =>{
  MakeResponse.makeServerResponse(JobSeekerServices.DeleteEducation(data), true, result => {
    if (result && result.result==true) {
      ToastNotificationService.success('سابقه با موفقیت حذف شد ');
      GetEduction()
    }
    else {
      ToastNotificationService.error('عملیات با خطا روبرو شد')
    }
  })
}

const toggleJobAccordion = (num: number) => {
  if (num === 1) {
    activeAccordion.value = !activeAccordion.value;
  } else if (num === 2) {
    activeAccordion2.value = !activeAccordion2.value;
  }
}

</script>
<style scoped>
.accordion-content {
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  max-height: 0;
}

.accordion-content.active {
  max-height: 500px;
}

</style>