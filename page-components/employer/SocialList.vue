<template>
  <template v-for="(item , index) of employerSocial" :key="index">

    <div class="d-flex justify-content-between">
      <nuxt-link :to="{path: 'contact/social', query: {id: item.id}}"><i class="pi pi-pencil text-blue-3"></i></nuxt-link>
      <i class="pi pi-trash text-red-1" @click="onDeleteSocial(item.id, $event)"></i>
    </div>

    <div class="d-flex justify-content-between">
      <span class="font-0-8">نوع آدرس:</span>
      <span class="font-0-9 text-blue-3">{{ item.networkTypeTitle || '---' }}</span>
    </div>

    <div class="d-flex justify-content-between">
      <span class="font-0-8">آدرس اینترنتی:</span>
      <span class="font-0-9 text-blue-3">{{ item.link || '---' }}</span>
    </div>

    <div class="d-flex justify-content-between">
      <span class="font-0-8">توضیحات:</span>
      <span class="font-0-9 text-blue-3">{{ item.description || '---' }}</span>
    </div>
  </template>

</template>

<script setup lang="ts">
import {EmployerService} from "~/core/employer/employer-service";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {MakeResponse} from "~/composables/make-response";

const confirm = useConfirm();
const props = defineProps({
  employerId: {
    type: Number,
    default: null
  }
});

const getSocial = (id: number) => {
  MakeResponse.makeServerResponse(EmployerService.getEmployerSocialInfo(id), false, result => {
    if (result.results) {
      employerSocial.value = result.results;
    }
  });
}

const onDeleteSocial = (id: number, event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: 'آیا از حذف آدرس اینترنتی اطمینان دارید؟',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-danger',
    acceptClass: 'p-button-success',
    rejectLabel: 'خیر',
    acceptLabel: 'بلی',
    accept: () => {
      MakeResponse.makeServerResponse(EmployerService.deleteSocial(id), true, result => {
        if (result.result) {
          ToastNotificationService.success('حذف با موفقیت انجام شد');
          getSocial(props.employerId);
        }
      });
    }
  });

}

onMounted(() => {
  getSocial(props.employerId);
});

const employerSocial = ref<[]>([]);
</script>

<style scoped>

</style>