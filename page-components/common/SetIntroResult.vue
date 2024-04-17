<template>
  <div class="p-3">
    <form @submit.prevent>
      <div class="form-group">
        <label>نتیجه معرفی نامه ی خود را انتخاب کنید</label>
        <Dropdown
            show-clear
            v-model="form.resultType"
            class="w-100"
            :options="resultList"
            option-value="id"
            option-label="title"/>
      </div>

      <div class="form-group">
        <label>توضیحات</label>
        <Textarea class="w-100" v-model="form.description" />
      </div>

      <div class="d-flex justify-content-evenly">
        <div class="btn btn-success" @click="onSubmit()">ثبت</div>
        <div class="btn btn-danger" @click="onClose()">انصراف</div>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {MakeResponse} from "~/composables/make-response";
const params = ref();
const dialogRef = inject('dialogRef');

const form = ref({
  resultType: null,
  description: null
});

const resultList = ref([
  {id: 1, title: 'پذیرش'},
  {id: 2, title: 'عدم پذیرش'},
  {id: 3, title:  'انصراف'},
]);

const onSubmit = () => {
  const body = {
    letterID: params.value.data.id,
    employerID: params.value.mode === 'employer' ? params.value.data.employerID : null,
    jobSeekerID: params.value.mode === 'jobSeeker' ? params.value.data.jobSeekerID : null,
    resultType: form.value.resultType,
    description: form.value.description,
    // jobOpportunityResumeID: this.config.data.jobOpportunityResumeID
  };
  if (form.value.resultType) {
    MakeResponse.makeServerResponse(JobSeekerServices.addLetterOtherResult(body), true, result => {
      if (result.result) {
        ToastNotificationService.success( 'ثبت نتیجه معرفی نامه با موفقیت انجام شد');
        onClose(true);
      } else {
        ToastNotificationService.error(result.serverErrors[0].hint);
      }
    });
  }
}

const onClose = (data: boolean = false) => {
  dialogRef.value.close(data);
}

onMounted(() => {
  params.value = dialogRef.value.data;
});
</script>

<style scoped>

</style>