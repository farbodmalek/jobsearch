<template>
  <div class="" v-if="jobDetail">

    <p class="d-flex justify-content-between bg-gray-3 p-2">
      <span class="text-black-2">شغل درخواستی</span>
      <span class="text-dark">{{ jobDetail.iscoTitle ? jobDetail.iscoTitle : jobDetail.iscoDesc }}</span>
    </p>

    <p class="d-flex justify-content-between p-2">
      <span class="text-black-2">استان</span>
      <span class="text-dark">
        <template v-for="(p, index) of jobDetail.provinceList" :key="index">{{ p.title + ' , ' }}</template>
      </span>
    </p>

    <p class="d-flex justify-content-between p-2 bg-gray-3">
      <span class="text-black-2">شهرستان</span>
      <span class="text-dark">
        <template v-for="(p, index) of jobDetail.cityList" :key="index">{{ p.title + ' , ' }}</template>
      </span>
    </p>

    <p class="d-flex justify-content-between p-2" v-if="jobDetail.cooperationTypeTitle">
      <span class="text-black-2">نوع همکاری</span>
      <span class="text-dark">{{ jobDetail.cooperationTypeTitle }}</span>
    </p>

    <p class="d-flex justify-content-between p-2" v-if="jobDetail.cooperationTypeList?.length > 0">
      <span class="text-black-2">نوع همکاری</span>
      <span class="text-dark">
        <template v-for="(p, index) of jobDetail.cooperationTypeList" :key="index">{{ p.title + ' , ' }}</template>
      </span>
    </p>

    <p class="d-flex justify-content-between p-2 bg-gray-3">
      <span class="text-black-2">نوع دستمزد</span>
      <span class="text-dark">{{ jobDetail.salaryTypeTitle }}</span>
    </p>

    <p class="d-flex justify-content-between p-2">
      <span class="text-black-2">تاریخ ثبت</span>
      <span class="text-dark">{{ jobDetail.regMoment }}</span>
    </p>

    <p class="d-flex justify-content-between p-2 bg-gray-3">
      <span class="text-black-2">تاریخ اعتبار</span>
      <span class="text-dark">{{ jobDetail.expireDate }}</span>
    </p>

    <p class="d-flex justify-content-between p-2">
      <span class="text-black-2">وضعیت</span>
      <span class="text-dark">{{ jobDetail.statusTitle }}</span>
    </p>

  </div>
</template>

<script setup lang="ts">
import type {JobRequest} from "~~/core/models/jobSeeker/job-request";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {MakeResponse} from "~/composables/make-response";
const dialogRef = inject('dialogRef');
const params = ref();
const jobDetail = ref<JobRequest>();

const getJobRequestDetail = () => {
  const body = {
    id: params.value?.jobRequestID ? params.value.jobRequestID : params.value.id,
    nationalCode: params.value?.nationalCode
  }
  MakeResponse.makeServerResponse(JobSeekerServices.getJobSeekerRequests(body), true, result => {
    if (result.results) {
      jobDetail.value = result.results[0];
    }
  });
}
onMounted(() => {
  params.value = dialogRef.value.data;
  getJobRequestDetail();
});
</script>

<style scoped>

</style>