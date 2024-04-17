<template>
  <div class="bg-gray-2 p-2">
    <template v-for="(item, index) of offeredList" :key="index">
      <div class="box-layouts">
        <p class="d-flex justify-content-between">
          <span class="text-blue-3 font-0-9 w-70">{{ item.opportunityJobTitle }}</span>
          <span class="text-black-2 w-30 text-end">
            {{ item.offerDate }}
            <i class="pi pi-calendar-times"></i>
          </span>
        </p>

        <p class="d-flex justify-content-between mt-3">
          <span class="text-black-2">
            <i class="pi pi-building"></i>
            {{ item.publishedPlacementTitle || 'کارفرما' }}
          </span>
          <span class="text-blue-2 cursor-pointer" @click="onShowJobOpportunityDetail(item)">
            مشاهده جزئیات
            <img src="/img/icon/details.svg" width="14" alt=""/>
          </span>
        </p>

        <p class="d-flex justify-content-between mt-3">
          <span class="text-black-2 me-2">
            <i class="pi pi-clock"></i>
            {{ item.opportunityCooperativeTypeTitle }}
          </span>

          <span class="text-red-2 cursor-pointer" @click="onCloseRequest(item)" v-if="!item.closeDate">
            بستن پیشنهاد
            <img src="/img/icon/closeRequest.svg" width="14" alt=""/>
          </span>
        </p>

        <p class="d-flex mt-3">
          <i class="pi pi-map-marker"></i>
          <span class="text-black-2 me-2">{{ item.opportunityProvinceName }}</span>
        </p>

        <p class="d-flex mt-3 mb-2">
          <span class="tag" :class="'bg-'+item.statusColor">
              <img src="/img/icon/job-corner-icon.svg" alt="" width="17"/>
            </span>
          <span class="text-black-2">وضعیت</span>
          <span class="me-2" :class="'text-'+item.statusColor">{{ item.status }}</span>
        </p>

        <div class="d-flex justify-content-evenly" v-if="item.resultType === 0">
          <button @click="onAccept(item.id, 1)"
                  class="bg-green-3 border-0 border-r-1-75 py-2 px-3 text-white d-flex justify-content-between align-items-center w-50">
            <span class="text-white">می پذیرم</span>
            <i class="pi pi-check-circle"></i>
          </button>
          <button
              @click="onAccept(item.id, 2)"
              class="bg-red-2 border-0 border-r-1-75 px-3 py-2 text-white d-flex justify-content-between align-items-center w-50 me-1">
            <span class="text-white">نمی پذیرم</span>
            <i class="pi pi-times-circle"></i>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {PublishResultTypeEnum} from "~~/core/enum/publish-result-type-enum";
import {useDialog} from "primevue/usedialog";
import type {JobRequestList} from "~~/core/models/jobSeeker/jobRequestDetail";
import OpportunityDetail from "../../../page-components/common/OpportunityDetail.vue";
import {ToastNotificationService} from "~/core/toast-notification-service";
import CloseOffer from "../../../page-components/jobSeeker/jobRequest/CloseOffer.vue";
import {MakeResponse} from "~/composables/make-response";
import {BasePage} from "~/core/base/base-page";

definePageMeta({
  name: "پیشنهادات دریافتی"
});

const route = useRoute();
const jobId = ref<number>(0);
const offeredList = ref([]);
const dialog = useDialog();

const getOffers = () => {
  const filter = {
    jobRequestID: jobId.value,
    personID: !jobId.value ? BasePage.getPersonId() : null,
    take: 10,
    pageNumber: 1
  }
  MakeResponse.makeServerResponse(JobSeekerServices.getJobRequestOfferList(filter), true, result => {
    if (result.results) {
      offeredList.value = result.results.map((p: any) => {
        return {
          ...p,
          opportunityProvinceName: p.opportunityProvinceName + ' - ' + p.opportunityCityName,
          status: p.closeDateEn ? PublishResultTypeEnum.closed : p.publishedPlacementTitle ? (
                  p.sendTypeID === 1 ? (
                      p.resultType === 1 && p.letterID === 0 ? PublishResultTypeEnum.employerAcceptWaitToIntro
                          : p.resultType === 0 ? PublishResultTypeEnum.waitingToEmployerAccept
                              : PublishResultTypeEnum.rejectByEmployer
                  ) : (
                      p.resultType === 1 && p.letterID === 0 ? PublishResultTypeEnum.jobSeekerAcceptWaitToIntro
                          : p.resultType === 1 && p.letterID > 0 ? PublishResultTypeEnum.introSend
                              : p.resultType === 0 ? PublishResultTypeEnum.waitingToJobSeekerAccept
                                  : PublishResultTypeEnum.rejectByJobSeeker
                  )
              )
              :
              (
                  p.sendTypeID === 1 ?
                      (
                          (p.employerOfferResult === 0 || !p.employerOfferResult) ? (!p.isPublic && p.letterID === 0 ?
                                  PublishResultTypeEnum.employerAcceptWaitToIntro
                                  : (!p.isPublic && p.letterID > 0 ? PublishResultTypeEnum.introSend
                                      : PublishResultTypeEnum.waitingToEmployerAccept))
                              : p.employerOfferResult === 1 ? PublishResultTypeEnum.acceptByEmployer
                                  : PublishResultTypeEnum.rejectByEmployer
                      )
                      :
                      (
                          p.resultType === 0 ? PublishResultTypeEnum.waitingToJobSeekerAccept
                              : p.resultType === 1 ? PublishResultTypeEnum.acceptByJobSeeker
                                  : PublishResultTypeEnum.rejectByJobSeeker
                      )
              ),

          statusColor: p.closeDateEn ? 'red-2' : p.resultType === 0 ? 'yellow-2' : (p.resultType === 1 && p.letterID === 0) ? 'green-3'
              : (p.resultType === 1 && p.letterID > 0) ? 'green-3' : 'red-2',

        }
      });
    }
  });
}

const onShowJobOpportunityDetail = (item: JobRequestList) => {
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

const onAccept = (id: number, type: number) => {
  const acceptResult = {
    id: id,
    resultType: type
  };
  MakeResponse.makeServerResponse(JobSeekerServices.addJobRequestOfferResult(acceptResult), true, result => {
    if (result.result) {
      if (type === 2)
        ToastNotificationService.success( 'رد درخواست با موفقیت انجام شد');
      else if (type === 1)
        ToastNotificationService.success( 'پذیرش درخواست با موفقیت انجام شد');
    } else {
      ToastNotificationService.error(result.serverErrors[0].hint)
    }
  });
}

const onCloseRequest = (data: any) => {
  dialog.open(CloseOffer, {
    props: {
      header: 'بستن پیشنهاد شغلی',
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
        getOffers();
      }
    },
  });
}

onMounted(() => {
  jobId.value = +route.query.id;
  getOffers();
});
</script>

<style scoped>

</style>