<template>

  <div class="container-fluid" >
    <div class="col-12 mt-2">
      <Cvprogress/>
      <div class="d-flex justify-content-between my-4">
        <span>تکمیل اطلاعات  </span>
        <img alt="logo" src="/img/icon/pen.svg" width="25" @click="EditButton(UserData.jobSeeker)"/>
      </div><p class="mt-3">اطلاعات هویتی</p>
      <div v-if="UserData.jobSeeker" class="m-auto px-1  bg-gray-3 ">

        <div class="d-flex justify-content-between p-3">
          <span>نام و نام خانوادگی</span>
          <span>{{ UserData.jobSeeker.firstName +" " + UserData.jobSeeker.lastName}}</span>
        </div>
        <div class="d-flex  justify-content-between p-3">
          <span>شماره ملی </span>
          <span>{{ UserData.jobSeeker.nationalCode }} </span>
        </div>
        <div class="d-flex  justify-content-between p-3">
          <span>نام پدر</span>
          <span>{{ UserData.jobSeeker.fatherName }}</span>
        </div>
        <div class="d-flex  justify-content-between p-3">
          <span>تاریخ تولد</span>
          <span>{{ UserData.jobSeeker.birthDate }}</span>
        </div>
        <div class="d-flex  justify-content-between p-3">
          <span> جنسیت</span>
          <span>{{ UserData.jobSeeker.genderTitle }}</span>
        </div>
        <div class="d-flex  justify-content-between p-3">
          <span>تلفن همراه</span>
          <span>{{ UserData.jobSeeker.mobile }}</span>
        </div>
      </div>
      <p class="mt-3">اطلاعات فردی</p>
      <div v-if="UserData.jobSeeker" class="m-auto px-1   bg-gray-3 ">
        <div class="d-flex  justify-content-between p-3">
          <span>وضعیت تاهل</span>
          <span>{{ UserData.jobSeeker.marriedTypeTitle }}</span>
        </div>
        <div class="d-flex  justify-content-between p-3">
        <span>دین </span>
        <span>{{ UserData.jobSeeker.religionTitle }}</span>
      </div>
        <div class="d-flex  justify-content-between p-3">
        <span>قد </span>
        <span>{{ UserData.jobSeeker.height }}</span>
      </div>
        <div class="d-flex  justify-content-between p-3">
        <span>وزن </span>
        <span>{{ UserData.jobSeeker.weight }}</span>
      </div>
        <div class="d-flex  justify-content-between p-3">
        <span>وضعیت فعلی اشتغال</span>
        <span>{{ UserData.jobSeeker.activityStatusTitle }}</span>
      </div>
        <div class="d-flex  justify-content-between p-3">
          <span>وضعیت ایثارگری </span>
          <span>{{ UserData.jobSeeker.sacrificeStateTitle }}</span>
        </div>
        <div class="d-flex  justify-content-between p-3">
          <span>وضعیت جسمانی </span>
          <span>{{ UserData.jobSeeker.isDisabilityTitle }}</span>
        </div>
      </div>
    </div>
  </div>


</template>
<script lang="ts" setup>
import Cvprogress from "~/components/jobSeeker/Cvprogress.vue"
import {CommonServices} from "~/core/common/common-services";
import {MakeResponse} from "~/composables/make-response";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";

definePageMeta({
  name: "اطلاعات هویتی و فردی"
});
const UserData = ref([])
const router = useRouter()

onMounted(() => {
  const userData = JSON.parse(<string>localStorage.getItem('user-data'));
  MakeResponse.makeServerResponse(JobSeekerServices.getPersonResume({nationalCode: userData.userName}), true, result => {
    if (result && result.result) {
      UserData.value = result.data
    }
  })
})


const EditButton= (data:any)=>{

  const router = useRouter();
  router.push({path: "/jobSeeker/resume/Edit/Information",query:{id:data.id}});
}


</script>
<style>
.p-accordion-header-link {
  justify-content: space-between;
}

</style>