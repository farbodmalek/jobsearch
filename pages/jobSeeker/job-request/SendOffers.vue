<template>
  <div class="bg-gray-3 p-3">
    <template v-for="(item, index) of offeredList" :key="index">
      <div class="box-layouts">
        <p class="d-flex justify-content-between">
          <span class="text-blue-3 font-1">
            {{ item.opportunityIscoTitle ? item.opportunityIscoTitle : item.opportunityJobTitle }}
          </span>
          <span class="text-black-2">
            {{ item.requestDate }}
            <i class="pi pi-calendar"></i>
          </span>
        </p>

        <p class="d-flex justify-content-between mt-3">
          <span class="text-black-2">
            <i class="pi pi-building"></i>
            کاریابی {{ item.opportunityPlacementTitle || '---' }}
          </span>
          <span class="text-blue-2 cursor-pointer" @click="onShowDetail(item)">مشاهده جزئیات</span>
        </p>

        <p class="d-flex mt-3">
          <i class="pi pi-clock"></i>
          <span class="text-black-2 me-2">{{ item.opportunityCooperativeTypeTitle }}</span>
        </p>

        <p class="d-flex mt-3">
          <i class="pi pi-map-marker"></i>
          <span class="text-black-2 me-2">{{ item.opportunityProvinceName + ' - ' + item.opportunityCityName }}</span>
        </p>

        <p class="d-flex mt-3 mb-2">
          <span class="tag" :class="{'bg-orange-3': item.statusID === 6,
                                     'bg-green-3': item.statusID === 2,
                                     'bg-blue-5': item.statusID === 3,
                                     'bg-red-2': item.statusID === 4 || item.statusID === 5}">
              <img src="/img/icon/job-corner-icon.svg" alt="" width="17"/>
            </span>
          <span class="text-black-2">وضعیت</span>
          <span class="text-black-2 me-2">{{ item.statusTitle }}</span>
        </p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {useDialog} from "primevue/usedialog";
import {MakeResponse} from "~/composables/make-response";
import OpportunityDetail from "../../../page-components/common/OpportunityDetail.vue";
import {BasePage} from "~/core/base/base-page";

definePageMeta({
  name: "پیشنهادات ارسالی"
});

const route = useRoute();
const jobId = ref<number>(0);
const offeredList = ref([]);
const dialog = useDialog();

const getOffers = () => {
  const body = {
    jobRequestID: jobId.value,
    sendType: 1,
    take: 100,
    pageNumber: 1,
    personID: !jobId.value ? BasePage.getPersonId() : null,
  }
  MakeResponse.makeServerResponse(JobSeekerServices.getSendOfferList(body), true, result => {
    if (result.results) {
      offeredList.value = result.results;
    }
  });
}

const onShowDetail = (item) => {
  dialog.open(OpportunityDetail, {
    props: {
      header: 'نمایش جزئیات فرصت شغلی',
      modal: true,
      style: {
        width: '60%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    data: item,
  });
}

onMounted(() => {
  jobId.value = +route.query.id;
  getOffers();
});
</script>

<style scoped>

</style>