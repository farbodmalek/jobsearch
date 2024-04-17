<template>
  <div class="container-fluid">
    <template v-for="(item , index) of oppList" :key="index">
      <div class="bg-gray-3 mt-2 p-3 border-r-0-75">

        <div class="position-relative">
          <p class="d-flex justify-content-between">
            <span class="text-blue-3 font-1 cursor-pointer" @click="showDetail(item)">
              <i class="pi pi-user me-1"></i>
              {{ item.iscoTitle }}
            </span>
            <span class="cursor-pointer ellipsis" @click="onShowActions('A'+index)">
              <i class="pi pi-ellipsis-h text-blue-2"></i>
            </span>
          </p>
          <div class="actions button-shadow" :id="'A'+index">
            <span class="cursor-pointer" @click="showDetail(item)">
              <img alt="detail" src="/img/icon/details.svg" class="ms-1"/>
              جزئیات
            </span>

            <span class="mt-2 cursor-pointer" @click="onCloseRequest(item.id)">
              <img src="/img/icon/closed.svg" alt="closed" class="ms-1"/>
                بستن
            </span>

            <span class="mt-2 cursor-pointer" @click="placementList(item)">
              <img src="/img/icon/placement-list.svg" alt="placement" class="ms-1"/>
                لیست کاریابی ها
            </span>
          </div>
        </div>

        <p class="d-flex align-items-center mt-2">
            <span class="tag" :class="{'bg-orange-3': item.status === 6,
                                        'bg-green-3': item.status === 4 || item.status === 5,
                                        'bg-blue-5': item.status === 3,
                                        'bg-red-2': item.status === 2}">
              <img src="/img/icon/job-corner-icon.svg" alt="" width="17"/>
            </span>
          <span>آخرین وضعیت:</span>
          <span class="me-1">{{ item.statusTitle }}</span>
        </p>

        <p class="mt-2 text-black-50">
          <span class="">{{ item.lastUpdateDate }}</span>
        </p>

        <div class="row">
          <div class="col-6 d-flex justify-content-between mt-2 align-items-center position-relative px-2 bg-white border-r-1-5">
           <nuxt-link :to="{path: 'introList', query: {id: item.id}}">
              <span class="me-2">
              <span class="letter-notification" v-if="item.letterCount > 0">
                <i class="pi pi-circle-fill text-red-1 position-absolute font-0-5"></i>
              </span>
              <img src="/img/icon/file.svg" alt="file" width="14"/>
              <span class="me-2 cursor-pointer">معرفی نامه</span>
            </span>
           </nuxt-link>
          </div>

          <div class="col-6 d-flex justify-content-between align-items-center px-2 bg-white border-r-1-5 mt-2">
            <span class="position-relative">
              <i v-if="item.receiveOfferCount > 0 || item.sendOfferCount > 0"
                 class="pi pi-circle-fill text-red-1 position-absolute font-0-5"></i>
              <img src="/img/icon/offers.svg" alt="offer" width="18"/>
            </span>

            <div class="position-relative select w-100">
              <Dropdown
                  option-value="id"
                  dataKey="id"
                  @change="onRoute($event.value, item)"
                  :options="offerList"
                  class="select border-0 text-blue-3"
                  optionLabel="title"
                  placeholder="پیشنهادات">
                <template #option="slotProps">
                  <div class="d-flex align-items-center" v-if="slotProps.index === 0">
                    <img src="/img/icon/file.svg" alt="file" width="14"/>
                    <div class="me-2 font-0-9 text-black-2">{{ slotProps.option.title }}</div>
                    <span class="letter-notification">({{ item.sendOfferCount }})</span>
                  </div>

                  <div class="d-flex align-items-center" v-if="slotProps.index === 1">
                    <img src="/img/icon/file.svg" alt="file" width="14"/>
                    <div class="me-2 font-0-9 text-black-2">{{ slotProps.option.title }}</div>
                    <span class="letter-notification">({{ item.receiveOfferCount }})</span>
                  </div>
                </template>
              </Dropdown>
            </div>
            <i class="pi pi-caret-left text-blue-3"></i>
          </div>
        </div>

      </div>
    </template>

    <div class="text-center mt-3 font-0-8 cursor-pointer" style="margin-bottom: 3rem" @click="showMoreResult()"
         v-if="counter < totalRows">
      بیشتر ...
    </div>
  </div>
</template>

<script setup lang="ts">
import {EmployerService} from "~/core/employer/employer-service";
import {BasePage} from "~/core/base/base-page";
import PublishedPlacementList from "../../../page-components/common/PublishedPlacementList.vue";
import {useDialog} from "primevue/usedialog";
import OpportunityDetail from "../../../page-components/common/OpportunityDetail.vue";
import type {JobOpportunityList} from "~~/core/models/common/job-opportunity-list";
import CloseOpportunity from "../../../page-components/employer/CloseOpportunity.vue";
import {MakeResponse} from "~/composables/make-response";

definePageMeta({
  name: 'فرصت های شغلی'
});

const pageNumber = ref<number>(1);
const oppList = ref<JobOpportunityList[]>();
const totalRows = ref<number>(0);
const counter = ref<number>(3);
const dialog = useDialog();
const offerList = ref([
  {id: 1, title: 'ارسالی'},
  {id: 2, title: 'دریافتی'},
]);

const getJobOpportunity = () => {
  const body = {
    employerID: BasePage.getBusinessId(),
    pageNumber: pageNumber.value,
    take: counter.value
  }
  MakeResponse.makeServerResponse(EmployerService.getJobOpportunityList(body), true, result => {
    if (result.results) {
      oppList.value = result.results;
      totalRows.value = result.totalRows;
    }
  });
}

const showMoreResult = () => {
  counter.value = counter.value + 10;
  getJobOpportunity();
}

const placementList = (data: JobOpportunityList) => {
  dialog.open(PublishedPlacementList, {
    props: {
      header: 'لیست کاریابی های منتشر شده',
      modal: true,
      style: {
        width: '60%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    data: {
      data: data,
      mode: 'employer'
    },
  });
}

const showDetail = (item: JobOpportunityList) => {
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
    data: {
      jobOpportunityID: item.id
    },
  });
}

const onCloseRequest = (id: number) => {
  dialog.open(CloseOpportunity, {
    props: {
      header: 'بستن فرصت شغلی',
      modal: true,
      style: {
        width: '60%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    data: id,
    onClose: (opt) => {
      if (opt && opt.data) {
        getJobOpportunity();
      }
    },
  });
}

const onShowActions = (id: any) => {
  const action = document.getElementById(id);
  if (action?.style.display === 'flex') {
    action.style.display = 'none';
  } else {
    action.style.transition = '1s';
    action.style.display = 'flex';
  }
}

onMounted(() => {
  getJobOpportunity();
});
</script>

<style scoped lang="scss">


</style>