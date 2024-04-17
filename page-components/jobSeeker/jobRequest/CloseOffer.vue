<template>
  <div class="bg-gray-3 p-3">
    <p>
      آیا از بستن پیشنهاد شغلی اطمینان دارید؟
    </p>

    <div class="d-flex justify-content-evenly mt-4">
      <button class="btn btn-success" type="button" @click="accept()">بله</button>
      <button class="btn btn-danger" type="button" @click="reject()">خیر</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {JobRequest} from "~~/core/models/jobSeeker/job-request";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {MakeResponse} from "~/composables/make-response";

const dialogRef = inject('dialogRef');
const params = ref<JobRequest>();

const accept = () => {
  MakeResponse.makeServerResponse(JobSeekerServices.closeJobOffer({id: params.value?.id}), true, result => {
    if (result.result) {
      ToastNotificationService.success( 'بستن پیشنهاد با موفقیت انجام شد');
    } else {
      ToastNotificationService.error(result.serverErrors[0].hint)
    }
  });
}

const reject = () => {
  dialogRef.value.close();
}

onMounted(() => {
  params.value = dialogRef.value.data;
});
</script>

<style scoped>

</style>