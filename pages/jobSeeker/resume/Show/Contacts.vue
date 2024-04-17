<template>
  <Cvprogress/>
  <div class=" col-12  border px-1 -font-1-25 bg-gray-3" v-for="data in UserData.jobSeekerAddresses">
    <div class="d-flex  justify-content-between p-3">
      <span>استان</span>
      <span>{{ data.provinceTitle }}</span>
    </div>
    <div class="d-flex  justify-content-between p-3">
      <span>شهرستان  </span>
      <span>{{ data.cityTitle }} </span>
    </div>
    <div class="d-flex  justify-content-between p-3">
      <span>تلفن همراه</span>
      <span>{{ data.mobile }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import Cvprogress from "~/components/jobSeeker/Cvprogress.vue"
import {CommonServices} from "~/core/common/common-services";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";

definePageMeta({
  name:"اطلاعات تماس "
});


const UserData = ref([])

onMounted(() => {
  const userData = JSON.parse(<string>localStorage.getItem('user-data'));
  MakeResponse.makeServerResponse(JobSeekerServices.getPersonResume({nationalCode: userData.userName}), true, result => {
    if (result && result.result) {
      UserData.value = result.data
    }
  })
})

</script>
<style >

</style>