<template>
  <div class="bg-gray-3 p-3">
    <p>
      آیا از بستن فرصت شغلی اطمینان دارید؟
    </p>

    <div class="d-flex justify-content-evenly mt-4">
      <button class="btn btn-success" type="button" @click="accept()">بله</button>
      <button class="btn btn-danger" type="button" @click="reject()">خیر</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {JobRequest} from "~~/core/models/jobSeeker/job-request";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {EmployerService} from "~/core/employer/employer-service";
import {MakeResponse} from "~/composables/make-response";


const dialogRef = inject('dialogRef');
const params = ref<JobRequest>();

const accept = () => {
  MakeResponse.makeServerResponse(EmployerService.closeOpportunity(params.value), true, result => {
    if (result.result) {
      ToastNotificationService.success('حذف فرصت شغلی با موفقیت انجام شد');
      dialogRef.value.close(true);
    } else {
      ToastNotificationService.error(result.serverErrors[0].hint);
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