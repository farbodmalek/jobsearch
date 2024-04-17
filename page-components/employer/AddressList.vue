<template>
  <template v-for="(address , index) of employerAddress" :key="index">

    <div class="d-flex justify-content-between">
      <nuxt-link :to="{path: 'contact/address', query: {id: address.id}}"><i class="pi pi-pencil text-blue-3"></i></nuxt-link>
      <i class="pi pi-trash text-red-1" @click="onDeleteAddress(address.id, $event)"></i>
    </div>

    <div class="d-flex justify-content-between">
      <span class="font-0-8">تاریخ آخرین به روز رسانی:</span>
      <span class="font-0-9 text-blue-3">{{ address?.modifiedDate || '---' }}</span>
    </div>

    <div class="d-flex justify-content-between mt-2">
      <span class="font-0-8">استان:</span>
      <span class="font-0-9 text-blue-3">{{ address?.provinceName || '---' }}</span>
    </div>

    <div class="d-flex justify-content-between mt-2">
      <span class="font-0-8">شهر:</span>
      <span class="font-0-9 text-blue-3">{{ address?.cityName || '---' }}</span>
    </div>

    <div class="d-flex justify-content-between mt-2">
      <span class="font-0-8">تلفن:</span>
      <span class="font-0-9 text-blue-3">{{ address?.phoneNo || '---' }}</span>
    </div>

    <div class="d-flex justify-content-between mt-2">
      <span class="font-0-8">موبایل:</span>
      <span class="font-0-9 text-blue-3">{{ address?.mobileNo || '---' }}</span>
    </div>

    <div class="d-flex justify-content-between mt-2">
      <span class="font-0-8">فکس:</span>
      <span class="font-0-9 text-blue-3">{{ address?.faxNo || '---' }}</span>
    </div>

    <div class="d-flex justify-content-between mt-2">
      <span class="font-0-8">کد پستی:</span>
      <span class="font-0-9 text-blue-3">{{ address?.postalCode || '---' }}</span>
    </div>

    <div class="d-flex justify-content-between mt-2">
      <span class="font-0-8">آدرس:</span>
      <span class="font-0-9 text-blue-3">{{ address?.address || '---' }}</span>
    </div>

    <hr/>
  </template>
</template>

<script setup lang="ts">
import {EmployerService} from "~/core/employer/employer-service";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {MakeResponse} from "~/composables/make-response";

const employerAddress = ref<[]>([]);
const confirm = useConfirm();
const props = defineProps({
  employerId: {
    type: Number,
    default: null
  }
});

const getAddress = (id: number) => {
  MakeResponse.makeServerResponse(EmployerService.getEmployerAddress(id), false, result => {
    if (result) {
      employerAddress.value = result;
    }
  });
}

const onDeleteAddress = (id: number, event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: 'آیا از حذف آدرس اطمینان دارید؟',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-danger',
    acceptClass: 'p-button-success',
    rejectLabel: 'خیر',
    acceptLabel: 'بلی',
    accept: () => {
      MakeResponse.makeServerResponse(EmployerService.deleteAddress(id), true, result => {
        if (result.result) {
          ToastNotificationService.success('حذف با موفقیت انجام شد');
          getAddress(props.employerId);
        }
      });
    }
  });
}

onMounted(() => {
  getAddress(props.employerId);
});
</script>

<style scoped>

</style>