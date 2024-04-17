<template>
  <div class="container-fluid">

    <div class="filter row m-0">
      <div class="col-6 p-0">{{}}
        <button id="active" class="border-0 p-2 w-100" @click="onFilter(1)">
           فعال ({{ store.activeRequest }})
        </button>
      </div>

      <div class="col-6 p-0">
        <button id="all" class="border-0 p-2 w-100" @click="onFilter(2)">
          همه ({{ store.allRequest }})
        </button>
      </div>
    </div>

<!--    <div class="bg-gray-3 d-flex align-items-center p-2 mt-2 border-r-1-5">-->
<!--      <span class="font-0-8">تاریخ ثبت</span>-->
<!--      <div class="w-40 me-1">-->
<!--        <InputText-->
<!--            class="custom-input w-100"-->
<!--            placeholder="از"-->
<!--            type="text"-->
<!--        />-->
<!--        <date-picker-->
<!--            v-model="date"-->
<!--            color="#00acc1"-->
<!--            custom-input=".custom-input"-->
<!--            display-format="jYYYY/jMM/jDD"-->
<!--            format="YYYY-MM-DD"-->
<!--        />-->
<!--      </div>-->

<!--      <span class="font-0-8"> - </span>-->
<!--      <div class="w-40 me-1">-->
<!--        <InputText-->
<!--            class="custom-input2 w-100"-->
<!--            placeholder="تا"-->
<!--            type="text"-->
<!--        />-->
<!--        <date-picker-->
<!--            v-model="date2"-->
<!--            color="#00acc1"-->
<!--            custom-input=".custom-input2"-->
<!--            display-format="jYYYY/jMM/jDD"-->
<!--            format="YYYY-MM-DD"-->
<!--        />-->
<!--      </div>-->

<!--    </div>-->

    <div class="mt-2">
      <template v-for="(item , index) of jobRequestList" :key="index">
        <div class="bg-gray-3 mt-2 p-3 border-r-0-75">

          <div class="position-relative">
            <p class="d-flex justify-content-between">
              <span class="text-blue-3 font-0-9 cursor-pointer" @click="showDetail(item)">
<!--                <i class="pi pi-user me-1"></i>-->
                {{ index + 1 }})
                {{ item.iscoTitle }}
              </span>
              <span class="cursor-pointer ellipsis" @click="onShowActions('A'+index)">
                <i class="pi pi-ellipsis-h text-blue-2"></i>
              </span>
            </p>
            <div :id="'A'+index" class="actions button-shadow">
              <span class="cursor-pointer" @click="showDetail(item)">
                <img alt="detail" class="ms-1" src="/img/icon/details.svg"/>
                جزئیات
              </span>

              <span v-if="!item.closeDate" class="mt-2 cursor-pointer" @click="onCloseRequest(item)">
                <img alt="closed" class="ms-1" src="/img/icon/closed.svg"/>
                بستن
              </span>

              <span class="mt-2 cursor-pointer" @click="placementList(item)">
                <img alt="placement" class="ms-1" src="/img/icon/placement-list.svg"/>
                لیست کاریابی ها
              </span>
            </div>
          </div>

          <p class="d-flex align-items-center mt-2">
            <span :class="{'bg-orange-3': item.status === 6,
                                        'bg-green-3': item.status === 4 || item.status === 5,
                                        'bg-blue-5': item.status === 3,
                                        'bg-red-2': item.status === 2 || item.status === 1}" class="tag">
              <img alt="" src="/img/icon/job-corner-icon.svg" width="17"/>
            </span>
            <span class="font-0-8">وضعیت انتشار:</span>
            <span class="me-1 font-0-7">{{ item.statusTitle }}</span>
          </p>

          <p class="d-flex justify-content-between mt-3 position-relative">
            <span class="">{{ item.lastUpdateDate }}</span>
          </p>
          <div class="d-flex">
            <div class="d-flex justify-content-center align-items-center px-2 bg-white border-r-1-5 mt-2 col-6 ">
              <span class="me-2" @click="onRoute(3, item)">
                <span class="letter-notification" v-if="item.letterCount > 0">
                  <i class="pi pi-circle-fill text-red-1 position-absolute font-0-5"></i>
                </span>
                <img src="/img/icon/file.svg" alt="file" width="14"/>
                <span class="me-2 cursor-pointer">معرفی نامه</span>
              </span>
            </div>
            <div class="d-flex justify-content-between align-items-center px-2 bg-white border-r-1-5 mt-2 col-6">
            <span class="position-relative">
              <i v-if="item.receiveOfferCount > 0 || item.sendOfferCount > 0"
                 class="pi pi-circle-fill text-red-1 position-absolute font-0-5"></i>
              <img alt="offer" src="/img/icon/offers.svg" width="18"/>
            </span>
              <div class="position-relative select w-100">
                <Dropdown
                    :options="offerList"
                    class="select border-0 text-blue-3"
                    dataKey="id"
                    option-value="id"
                    optionLabel="title"
                    placeholder="پیشنهادات"
                    @change="onRoute($event.value, item)">
                  <template #option="slotProps">
                    <div v-if="slotProps.index === 0" class="d-flex align-items-center">
                      <img alt="file" src="/img/icon/file.svg" width="14"/>
                      <div class="me-2 font-0-9 text-black-2">{{ slotProps.option.title }}</div>
                      <span class="letter-notification">({{ item.sendOfferCount }})</span>
                    </div>

                    <div v-if="slotProps.index === 1" class="d-flex align-items-center">
                      <img alt="file" src="/img/icon/file.svg" width="14"/>
                      <div class="me-2 font-0-9 text-black-2">{{ slotProps.option.title }}</div>
                      <span class="letter-notification">({{ item.receiveOfferCount }})</span>
                    </div>
                  </template>
                </Dropdown>
              </div>
              <img src="/img/icon/Group 111.svg" alt="">
            </div>
          </div>
        </div>
      </template>
      <div v-if="counter < totalRows" class="text-center mt-3 font-0-8 cursor-pointer" style="margin-bottom: 3rem"
           @click="showMoreResult()">
        بیشتر ...
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {BasePage} from "~/core/base/base-page";
import type {JobRequestList} from "~~/core/models/jobSeeker/jobRequestDetail";
import JobRequestDetail from "../../../page-components/jobSeeker/jobRequest/JobRequestDetail.vue";
import {useDialog} from 'primevue/usedialog';
import CloseRequest from "../../../page-components/jobSeeker/jobRequest/CloseRequest.vue";
import type {JobRequest} from "~~/core/models/jobSeeker/job-request";
import PublishedPlacementList from "../../../page-components/common/PublishedPlacementList.vue";
import {MakeResponse} from "~/composables/make-response";
import DatePicker from 'vue3-persian-datetime-picker';
import {jobSeeker} from "~/store/jobSeeker";
import {JobsPublishTypeEnum} from "~/core/enum/jobs-publish-type-enum";

definePageMeta({
  name: 'درخواست های شغلی'
});

const jobRequestList = ref<JobRequest[]>([]);
const totalRows = ref<number>(0);
const counter = ref<number>(10);
const dialog = useDialog();
const date = ref();
const date2 = ref();
const isActive = ref<boolean>();
const store = jobSeeker()
const offerList = ref([
  {id: 1, title: 'ارسالی'},
  {id: 2, title: 'دریافتی'},
]);

const onRoute = (id: number, item: JobRequest) => {
  const router = useRouter();
  if (id === 1 && item.sendOfferCount > 0) {
    router.push({path: '/jobSeeker/job-request/SendOffers', query: {id: item.id}});
  } else if (id === 2 && item.receiveOfferCount > 0) {
    router.push({path: '/jobSeeker/job-request/receiveoffers', query: {id: item.id}});
  } else if (id === 3 && item.letterCount > 0) {
    router.push({path: '/jobSeeker/job-request/introList', query: {id: item.id}});
  }
}

const getRequestedJobs = () => {
  const userName = BasePage.getLoggedUser().userName;
  const filter = {
    isActive: isActive.value,
    nationalCode: userName
  }
  MakeResponse.makeServerResponse(JobSeekerServices.getJobSeekerRequests(filter), true, result => {
    if (result.results) {
      result.results = result.results.map((p: JobRequest) => {
        return {
          ...p,
          iscoTitle: p.iscoTitle ? p.iscoTitle : p.iscoDesc,
          statusTitle: p.status === 5 ? `${JobsPublishTypeEnum.publishedByPlacement} ${p.placementTitle}`
              : p.status === 4 ? JobsPublishTypeEnum.publishToPlacement : p.status === 3 ? JobsPublishTypeEnum.published
                  : p.status === 2 ? JobsPublishTypeEnum.expired
                      : p.status === 1 ? JobsPublishTypeEnum.closed
                          : p.status === 6 ? p.statusTitle : '',
        }
      });
      if (filter.isActive)
        store.activeRequest = result.totalRows;
      else
        store.allRequest = result.totalRows;
      jobRequestList.value = result.results.slice(0, counter.value);
      totalRows.value = result.totalRows;
    }
  });
}

const showMoreResult = () => {
  counter.value = counter.value + 10;
  getRequestedJobs();
}

const showDetail = (item: JobRequestList) => {
  dialog.open(JobRequestDetail, {
    props: {
      header: 'نمایش جزئیات درخواست شغلی',
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

const onCloseRequest = (data: JobRequest) => {
  dialog.open(CloseRequest, {
    props: {
      header: 'بستن درخواست شغلی',
      modal: true,
      style: {
        width: '60%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    data: data,
    onClose: (opt) => {
      if (opt && opt.data) {
        getRequestedJobs();
      }
    },
  });
}

const placementList = (data: JobRequest) => {
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
      mode: 'jobSeeker'
    },
  });
}

const onFilter = (id: number) => {
  if (id === 1) {
    document.getElementById('all')?.classList.remove('active');
    document.getElementById('active')?.classList.add('active');
    isActive.value = true;
    counter.value = 3;
    getRequestedJobs();
  } else if (id === 2) {
    document.getElementById('active')?.classList.remove('active');
    document.getElementById('all')?.classList.add('active');
    isActive.value = null;
    counter.value = 3;
    getRequestedJobs();
  }
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
  isActive.value = true;
  getRequestedJobs();
  document.getElementById('active')?.classList.add('active');
});

</script>

<style lang="scss" scoped>
.filter {
  border-radius: var(--border-r-1);

  .active {
    background-color: white;
    box-shadow: var(--button-shadow);
    color: var(--blue-3);
  }

  button {
    border-radius: var(--border-r-1);
    font-size: var(--font-0-8);
    color: var(--black-2);
    background-color: var(--gray-3);
  }
}
</style>