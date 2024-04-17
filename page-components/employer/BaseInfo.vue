<template>
  <div class="container-fluid" v-if="employerId">
    <Accordion :activeIndex="0">

      <AccordionTab>

        <template #header>
          <div class="d-flex justify-content-between w-100">
            <span class="font-0-9">اطلاعات اصلی کارفرما</span>
            <span @click="onEditEmployerInfo()"><i class="pi pi-pencil"></i></span>
          </div>
        </template>

        <template v-if="employerInfo && employerInfo.isLegal">

          <div class="d-flex justify-content-between">
            <span>نام و نام خانوادگی نماینده مدیر عامل:</span>
            <span>{{ employerInfo?.persons[0]?.fullName }}</span>
          </div>

        </template>
        <template v-if="employerInfo && !employerInfo.isLegal">

          <template v-if="employerInfo.persons && employerInfo.persons.length > 0">
            <div class="d-flex justify-content-between">
              <span class="font-0-8">نام کارفرما:</span>
              <span class="font-0-9 text-blue-3">{{ employerInfo?.persons[0]?.fullName || '---' }}</span>
            </div>

            <div class="d-flex justify-content-between mt-2">
              <span class="font-0-8">کد ملی کارفرما:</span>
              <span class="font-0-9 text-blue-3">{{ employerInfo?.persons[0]?.nationalCode || '---' }}</span>
            </div>

            <div class="d-flex justify-content-between mt-2">
              <span class="font-0-8">تاریخ تولد کارفرما:</span>
              <span class="font-0-9 text-blue-3">{{ employerInfo?.persons[0]?.birthDate || '---' }}</span>
            </div>

            <div class="d-flex justify-content-between mt-2">
              <span class="font-0-8">شماره موبایل کارفرما:</span>
              <span class="font-0-9 text-blue-3">{{ employerInfo?.persons[0]?.mobile || '---' }}</span>
            </div>
          </template>

          <div class="d-flex justify-content-between mt-2">
            <span class="font-0-8">نوع مالکیت:</span>
            <span class="font-0-9 text-blue-3">{{ employerInfo?.activitySectionTitle || '---' }}</span>
          </div>

          <div class="d-flex justify-content-between mt-2">
            <span class="font-0-8">نوع فعالیت:</span>
            <span class="font-0-9 text-blue-3">{{ employerInfo?.sectorTitle || '---' }}</span>
          </div>

          <div class="d-flex justify-content-between mt-2">
            <span class="font-0-8">کد کارگاه تامین اجتماعی:</span>
            <span class="font-0-9 text-blue-3">{{ employerInfo?.insuranceCode || '---' }}</span>
          </div>

          <div class="d-flex justify-content-between mt-2">
            <span class="font-0-8">نام کارگاه:</span>
            <span class="font-0-9 text-blue-3">{{ employerInfo?.title || '---' }}</span>
          </div>

          <div class="d-flex justify-content-between mt-2">
            <span class="font-0-8">شماره ثبت:</span>
            <span class="font-0-9 text-blue-3">{{ employerInfo?.registerNumber || '---' }}</span>
          </div>

          <div class="d-flex justify-content-between mt-2">
            <span class="font-0-8">استان:</span>
            <span class="font-0-9 text-blue-3">{{ employerInfo?.provinceName || '---' }}</span>
          </div>

          <div class="d-flex justify-content-between mt-2">
            <span class="font-0-8">شهرستان:</span>
            <span class="font-0-9 text-blue-3">{{ employerInfo?.cityName || '---' }}</span>
          </div>

        </template>
      </AccordionTab>

      <AccordionTab>
        <template #header>
          <div class="d-flex justify-content-between w-100">
            <span class="font-0-9">آدرس ها</span>
            <nuxt-link to="contact/address"><i class="pi pi-plus"></i></nuxt-link>
          </div>
        </template>

        <AddressList :employer-id="employerId"/>

      </AccordionTab>

      <AccordionTab>
        <template #header>
          <div class="d-flex justify-content-between w-100">
            <span class="font-0-9">شبکه های اجتماعی</span>
            <nuxt-link to="contact/social"><i class="pi pi-plus"></i></nuxt-link>
          </div>
        </template>

        <SocialList :employer-id="employerId"/>
      </AccordionTab>

    </Accordion>
  </div>
</template>

<script setup lang="ts">
import {EmployerService} from "~/core/employer/employer-service";
import {BasePage} from "~/core/base/base-page";
import SocialList from "./SocialList.vue";
import AddressList from "./AddressList.vue";
import {MakeResponse} from "~/composables/make-response";

const employerId = ref<number>();
const employerInfo = ref({});

const getEmployerId = () => {
  const nationalCode = BasePage.getLoggedUser().userName;
  MakeResponse.makeServerResponse(EmployerService.getEmployerBusinessId(nationalCode), false, result => {
    if (result.result) {
      employerId.value = +result.data;
      localStorage.setItem('businessId', JSON.stringify(employerId.value));
      getInfo(employerId.value);
    }
  });
}

const getInfo = (id: number) => {
  MakeResponse.makeServerResponse(EmployerService.getEmployerInfo(id), true, result => {
    if (result.result) {
      employerInfo.value = result.data;
    }
  });
}

const onEditEmployerInfo = () => {
  const route = useRouter();
  route.push('edit');
}

onMounted(() => {
  getEmployerId();
});
</script>

<style scoped>

</style>