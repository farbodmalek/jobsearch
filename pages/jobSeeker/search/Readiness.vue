<template>
  <div class="p-2">

    <div class="alert alert-warning font-0-9">
      * در صورت انتخاب نکردن یا نداشتن درخواست شغلی مرتبط، به صورت خودکار برای شما درخواست شغلی مرتبط با فرصت شغلی انتخاب شده ایجاد می شود.
    </div>

   <div class="form-group">
     <label>
       مشاغل درخواستی
     </label>
     <Dropdown
         show-clear
         option-label="iscoTitle"
         option-value="id"
         :options="requestedJobList"
         v-model="iscoId"
         class="w-100"/>
   </div>

    <div class="d-flex justify-content-evenly align-items-center mt-3">
      <button class="btn btn-success" @click="onSetReadiness()">ثبت</button>
      <button class="btn btn-danger" @click="onClose()">انصراف</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {BasePage} from "~/core/base/base-page";
import type {JobRequest} from "~~/core/models/jobSeeker/job-request";
import {CommonServices} from "~/core/common/common-services";
import {ToastNotificationService} from "~/core/toast-notification-service";


const requestedJobList = ref<JobRequest[]>([]);
const iscoId = ref<number>();
const dialogRef = inject('dialogRef');
const params = dialogRef.value.data;

const getJobRequests = () => {
  const body = {
    nationalCode: BasePage.loggedUserInfo.userName
  }
  MakeResponse.makeServerResponse(JobSeekerServices.getJobSeekerRequests(body), true, result => {
    if (result.results) {
      requestedJobList.value = result.results.map((p: JobRequest) => {
        return {
          ...p,
          iscoTitle: (p.iscoTitle ? p.iscoTitle : (p.iscoDesc ? p.iscoDesc : '')) + ' - ' +
              p.cooperationTypeList.map(x => x.title).join(', ') + ' - ' + p.provinceList.map(x => x.title).join(', ')
        }
      });
    }
  });
}

const onSetReadiness = () => {
  const body = {
    personId: BasePage.getPersonId(),
    jobOpportunitieId: params,
    sendType: 1,
    status: 0,
    //jobRequestID: this.jobRequestId ? this.jobRequestId : null
  };
  MakeResponse.makeServerResponse(CommonServices.setJobResume(body), true, result => {
    if (result && result.result) {
      ToastNotificationService.success('اعلام آمادگی با موفقیت انجام شد');
      onClose(true);
    } else {
      ToastNotificationService.error(result.serverErrors[0].hint);
    }
  });
}

const onClose = (data: boolean = false) => {
  dialogRef.value.close(data);
}

onMounted(() => {
  getJobRequests();
});
</script>

<style scoped>

</style>