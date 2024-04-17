<template>
  <div class="p-2" v-if="introList && introList.length > 0">
    <template v-for="(item, index) of introList" :key="index">
      <div class="box-layouts bg-gray-3 shadow-none">

        <p class="d-flex justify-content-between">
          <span class="text-blue-3 w-70" v-if="item.jobOpportunityTitle">{{ item.jobOpportunityTitle }}</span>
          <span class="text-black-2 w-30">{{ item.regMoment }}
            <i class="pi pi-calendar"></i>
          </span>
        </p>

        <p class="d-flex justify-content-between mt-3">
          <span>
            <i class="pi pi-building ms-1"></i>
            <span class="text-black-2">کاریابی {{ item.placementTitle || '---' }}</span>
          </span>
          <span class="text-blue-3 cursor-pointer" @click="onDownload(item.id)">
            دریافت
            <i class="pi pi-download text-blue-3"></i>
          </span>
        </p>

        <p class="d-flex justify-content-between mt-3">
          <span>
            <i class="pi pi-map-marker ms-1"></i>
            <span class="text-black-2"> {{ item.countryDivisionTitle || '---' }}</span>
          </span>

          <template v-if="item.resultOtherDTOs.length === 0 ||
             (item.resultOtherDTOs.length === 1 && item.resultOtherDTOs.find(p => p.jobSeekerID === null))">
            <span class="text-blue-3 cursor-pointer" @click="onSetIntroResult(item)">
              ثبت نتیجه
              <i class="pi pi-check-square text-blue-3"></i>
            </span>
          </template>

          <template v-if="item.resultOtherDTOs.length > 0">
            <span class="text-blue-3 cursor-pointer" @click="onShowIntroResult(item)">
              مشاهده نتیجه
              <img src="/img/icon/file.svg" alt="file" width="14"/>
            </span>
          </template>
        </p>

        <p class="d-flex mt-3">
          <i class="pi pi-phone ms-1"></i>
          <span class="text-black-2"> {{ item.placementPhone || '---' }}</span>
        </p>

        <p class="d-flex align-items-center mb-2 mt-2">
          <span class="tag" :class="'bg-'+item.resultColor">
            <img src="/img/icon/job-corner-icon.svg" alt="" width="17"/>
          </span>
          <span class="text-black-2">وضعیت</span>
          <span class="me-2" :class="'text-'+item.resultColor">{{ item.resultTypeTitle }}</span>
        </p>

      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import {CommonServices} from "~/core/common/common-services";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {useDialog} from "primevue/usedialog";
import SetIntroResult from "../../../page-components/common/SetIntroResult.vue";
import IntroResult from "../../../page-components/common/IntroResult.vue";
import {MakeResponse} from "~/composables/make-response";
import type {Intro} from "~~/core/models/common/intro";

definePageMeta({
  name: 'معرفی نامه ها'
});

const route = useRoute();
const jobId = ref<number>(0);
const introList = ref<Intro[]>([]);
const dialog = useDialog();

const getIntroList = () => {
  const body = {
    jobRequestID: jobId.value,
    pageNumber: 1,
    take: 100
  }
  MakeResponse.makeServerResponse(CommonServices.getIntroductionLetters(body), true, result => {
    if (result.results) {
      introList.value = result.results.map((p: any) => {
        return {
          ...p,
          resultTypeTitle: (p.resultOtherDTOs.length > 0) ?
              (p.resultOtherDTOs.find((x: any) => x.employerID) ?
                  (p.resultOtherDTOs.find((x: any) => x.employerID).resultType === 1 ? 'پذیرش'
                      : p.resultOtherDTOs.find((x: any) => x.employerID).resultType === 2 ? 'عدم پذیرش' : 'انصراف')
                  : p.resultOtherDTOs.find((x: any) => x.jobSeekerID) ?
                      (p.resultOtherDTOs.find((x: any) => x.jobSeekerID).resultType === 1 ? 'پذیرش'
                          : p.resultOtherDTOs.find((x: any) => x.jobSeekerID).resultType === 2 ? 'عدم پذیرش' : 'انصراف') : '') : 'نامشخص',
          resultColor: (p.resultOtherDTOs.length > 0) ?
              p.resultOtherDTOs.find((x: any) => x.employerID) ? p.resultOtherDTOs.find((x: any) => x.employerID).resultType === 1 ? 'green-2' : 'red-2' : 'red-2'
              : ((p.resultOtherDTOs.length > 0)
                  ? p.resultOtherDTOs.find((x: any) => x.jobSeekerID) ? p.resultOtherDTOs.find((x: any) => x.jobSeekerID).resultType === 1 ? 'green-2' : 'red-2' : 'red-2' : 'black-1'),
        }
      });
    }
  });
}

const onDownload = (id: number) => {
  MakeResponse.makeServerResponse(JobSeekerServices.getIntroductionLetterPrintByID(id), true, result => {
    if (result) {

      const blob = new Blob([result], {type: 'application/pdf'});
      const objectUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a')
      link.href = objectUrl;
      link.download = 'objectUrl.pdf'
      link.target = '_blank'
      link.click()

      // window.open(objectUrl);

      // const blob = new Blob([result], {type: 'application/pdf'});
      // const fileURL = URL.createObjectURL(blob);
      // window.open(fileURL, "_blank")
    }
  });
}

const onSetIntroResult = (item: any) => {
  dialog.open(SetIntroResult, {
    props: {
      header: 'ثبت نتیجه معرفی نامه',
      modal: true,
      style: {
        width: '60%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    onClose: (opt) => {
      if (opt && opt.data) {
        getIntroList();
      }
    },
    data: {
      data: item,
      mode: 'jobSeeker'
    },
  });
}

const onShowIntroResult = (item: any) => {
  dialog.open(IntroResult, {
    props: {
      header: 'مشاهده نتیجه معرفی نامه',
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
      data: item,
      mode: 'jobSeeker'
    }
  });
}

onMounted(() => {
  jobId.value = +route.query.id;
  getIntroList();
})
</script>

<style scoped>
</style>