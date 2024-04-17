<template>
  <!--  https://codepen.io/tommaxwell/pen/XgZoOo-->
  <div v-if="JobSeeker && JobSeekerAddress && JobSeekerSocial" class="f-8 container-fluid">

    <div class="info-section bg-gray-3 px-3 ">

      <div class="row">
        <div class="col-9 d-flex flex-column p-3 ">
          <div class="d-flex align-items-center">
            <p class=" white-space font-1 text-start">{{ JobSeeker.firstName + ' ' + JobSeeker.lastName }}</p>
            <p v-if="LoggedUser.isPersonProfileActive" class="white-space px-2 ">فعال</p>
            <p v-else class="white-space px-2 text-red-1">غیر فعال</p>
          </div>
          <p class="text-blue-3">کارجو</p>
        </div>

        <div class="col-3 info-circle p-2" v-if="JobSeekerAttachment">
          <img alt="logo" src="/img/icon/Group 552.svg" class="w-100">
        </div>
      </div>

      <div class="pb-3">
        <p>50% تکمیل رزومه </p>
        <ProgressBar :showValue="false" :value="50" class="mt-1 font-5"></ProgressBar>
      </div>

      <div class="">
        <div class="row justify-content-between align-items-baseline">
          <div class="col-4 font-0-8">کدملی</div>
          <hr class="dashed-line col-4"/>
          <div class="col-4 text-end font-0-8">{{ JobSeeker.nationalCode }}</div>
        </div>

        <div class="row justify-content-between align-items-baseline">
          <div class="col-4 font-0-8"> تاریخ تولد</div>
          <hr class="dashed-line col-4"/>
          <div class="col-4 text-end font-0-8">{{ JobSeeker.registerDate }}</div>
        </div>

        <div class="row justify-content-between align-items-baseline">
          <div class="col-4 font-0-8"> نام پدر</div>
          <hr class="dashed-line col-4"/>
          <div class="col-4 text-end font-0-8">{{ JobSeeker.fatherName }}</div>
        </div>

        <div class="row justify-content-between align-items-baseline">
          <div class="col-4 font-0-8"> وضعیت تاهل</div>
          <hr class="dashed-line col-4"/>
          <div class="col-4 text-end font-0-8">{{ JobSeeker.marriedTypeTitle }}</div>
        </div>

        <div class="row justify-content-between align-items-baseline">
          <div class="col-4 font-0-8">وضعیت</div>
          <hr class="dashed-line col-4"/>
          <div class="col-4 text-end font-0-8"> {{ JobSeeker.activityStatusTitle }}</div>
        </div>

      </div>
    </div>

    <div class="px-3 bg-gray-3 tab">
      <div class="d-flex position-relative justify-content-center gap-4">

        <div class="col-3" @click="TabHandel(1)">
          <nuxt-link class="d-flex flex-column align-items-center cursor-pointer" to="">
            <img :class="{ active: tab === 1 }"
                 :src="tab === 1 ? '/img/icon/Group%20655.svg' : '/img/icon/Group%20218.svg'"
                 alt=""
                 class="position-relative" style="bottom: 34px"
                 width="65">
            <span class="position-absolute font-0-8 f-7" style="bottom: 0">درباره من</span>
          </nuxt-link>
        </div>

        <div class="col-3" @click="TabHandel(2)">
          <nuxt-link class="d-flex flex-column align-items-center cursor-pointer" to="">
            <img :src="tab === 2 ? '/img/icon/Group%20125.svg' : '/img/icon/Group%20657.svg'" alt=""
                 class="position-relative"
                 style="bottom: 34px" width="69">
            <span class="position-absolute font-0-8 f-7" style="bottom: 0">داشبورد</span>
          </nuxt-link>
        </div>

        <div class="col-3" @click="TabHandel(3)">
          <nuxt-link class="d-flex flex-column align-items-center cursor-pointer" to="">
            <img :src="tab === 3 ? '/img/icon/Group%20656.svg' : '/img/icon/Group%20126.svg'" alt=""
                 class="position-relative"
                 style="bottom: 34px" width="65">
            <span class="position-absolute font-0-8 f-7" style="bottom: 0">اطلاعات تماس</span>
          </nuxt-link>
        </div>

      </div>

      <div v-if="tab === 1" class="m-3">
        {{ JobSeeker.aboutMe }}
      </div>

      <div v-if="tab === 2" class="mt-3">
        <div class="bg-white border-r-1 row p-2 m-0 align-items-center button-shadow">

          <div class="col-8">
            <p>1403/2/8</p>
            <p>آخرین بروز رسانی رزومه </p>
          </div>

          <div class="col-4 m-0 p-0 d-flex">
            <p class="text-blue-3">به روزرسانی</p>
            <i class="pi pi-refresh text-blue-3"></i>
          </div>
        </div>

        <div class="row mt-3 m-0 p-0">

          <button :class="{'bg-gray-6': TabJob === 1, 'bg-white': TabJob !== 1}"
                  class="btn w-50 p-2"
                  @click="TabHandelJob(1)">
            پیشنهادات دریافتی
            <p class="mt-2" :class="{'text-black': TabJob === 1, 'text-blue-3': TabJob !== 1,}">
              {{ receiveTotalRows }}
            </p>
          </button>

          <button :class="{'bg-gray-6': TabJob === 2, 'bg-white': TabJob !== 2}"
                  class="btn w-50 p-2"
                  @click="TabHandelJob(2)">
            پیشنهادات ارسالی
            <p class="mt-2" :class="{'text-black': TabJob === 2, 'text-blue-3': TabJob !== 2}">
              {{ sendTotalRows }}
            </p>
          </button>

        </div>

        <div v-if="TabJob === 1">
          <template v-if="offeredReceiveList.length > 0">
            <div class="bg-white border-r-1 mt-2 p-2 mb-2" v-for="(data, index) in offeredReceiveList" :key="index">
              <div class="text-blue-3">{{ data.iscoTitle }}</div>
              <div class="d-flex justify-content-between mt-2">
                <span class="">{{ data.offerExpireStatus }}</span>
                <span class="text-end">{{ data.offerDate }}</span>
              </div>
            </div>

            <nuxt-link class="text-center font-0-8 mb-5 w-100 d-block" to="job-request/receiveOffers">
              بیشتر ...
            </nuxt-link>
          </template>
          <div v-if="offeredReceiveList.length === 0" class="alert alert-warning text-center mt-2">
            پیشنهاد دریافت شده ای ندارید.
          </div>
        </div>

        <div v-if="TabJob === 2">
          <template v-if="sendOfferList.length > 0">
            <div class="bg-white border-r-1 mt-2 p-2 mb-2" v-for="(data, index) in sendOfferList" :key="index">
              <div class="text-blue-3">{{ data.opportunityIscoTitle }}</div>
              <div class="d-flex justify-content-between">
                <span class="">{{ data.statusTitle }}</span>
                <span class="text-end">{{ data.requestDate }}</span>
              </div>
            </div>
            <nuxt-link class="text-center font-0-8 mb-5 w-100 d-block" to="job-request/sendOffers">
              بیشتر ...
            </nuxt-link>
          </template>
          <div v-if="sendOfferList.length === 0" class="alert alert-warning text-center mt-2 font-0-9">
            پیشنهاد ارسال شده ای ندارید.
          </div>
        </div>
      </div>

      <div v-if="tab === 3" class="mt-3 px-1">

        <div class="row align-items-baseline">
          <div class="col-4 font-0-8">تلفن همراه  </div>
          <hr class="dashed-line col-4"/>
          <div class="col-4 text-end font-0-8"> {{ JobSeekerAddress.mobile || '---' }}</div>
        </div>

        <div class="row align-items-baseline">
          <div class="col-4 font-0-8">تلفن ثابت  </div>
          <hr class="dashed-line col-4"/>
          <div class="col-4 font-0-8 text-end"> {{ JobSeekerAddress.phoneRel || '---' }}</div>
        </div>

        <div class="row align-items-baseline">
          <div class="col-4 font-0-8">کد پستی  </div>
          <hr class="dashed-line col-4"/>
          <div class="col-4 font-0-8 text-end"> {{ JobSeekerAddress.postalCode || '---' }}</div>
        </div>

        <div class="font-0-8">{{ JobSeekerAddress.address }}</div>

        <nuxt-link to="address/add" class="btn btn-secondary text-center w-100 mt-3">
          <p>تکمیل </p>
        </nuxt-link>

      </div>
    </div>
  </div>


</template>
<script lang="ts" setup>
import {BasePage} from "~/core/base/base-page";
import {CommonServices} from "~/core/common/common-services";
import "vue3-circle-progress/dist/circle-progress.css";
import {MakeResponse} from "~/composables/make-response";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";

const JobSeeker = <any>ref();
const JobSeekerAddress = <any>ref();
const JobSeekerSocial = <any>ref();
const JobSeekerAttachment = <any>ref();
const offeredReceiveList = ref([]);
const sendOfferList = ref([]);
const receiveTotalRows = ref<number>(0);
const sendTotalRows = ref<number>(0);


const LoggedUser = ref();
const tab = ref(2);
const TabJob = ref(1);

const TabHandel = (num: number) => {
  tab.value = num;
}

const TabHandelJob = (num: number) => {
  TabJob.value = num
}

const JobSeekerGet = () => {
  MakeResponse.makeServerResponse(JobSeekerServices.JobSeekerGet({nationalCode: LoggedUser.value.userName}), true, result => {
    if (result && result.result) {
      JobSeeker.value = result.data;
      localStorage.setItem('personId', JSON.parse(String(result.data.id)));
    }
  });
}

const AddressGet = () => {
  MakeResponse.makeServerResponse(JobSeekerServices.AddressGet({nationalCode: LoggedUser.value.userName}), true, result => {
    if (result) {
      JobSeekerAddress.value = result[0];
    }
  });
}

const SocialNetworkGet = () => {
  MakeResponse.makeServerResponse(JobSeekerServices.SocialNetworkGet({nationalCode: LoggedUser.value.userName}), true, result => {
    if (result.results) {
      JobSeekerSocial.value = result.results[0];
    }
  });
}

const AttachmentGet = () => {
  const body = {
    entityID: BasePage.getPersonId(),
    entityType: 1
  }
  MakeResponse.makeServerResponse(CommonServices.AttachmentGet(body), true, result => {
    if (result.results) {
      JobSeekerAttachment.value = result.results[0];
    }
  });
}


const getOffers = () => {
  const filter = {
    personId: BasePage.getPersonId(),
    take: 2
  }
  MakeResponse.makeServerResponse(JobSeekerServices.getJobRequestOfferList(filter), false, result => {
    if (result.results) {
      offeredReceiveList.value = result.results;
      receiveTotalRows.value = result.totalRows;
    }
  });
}


const SendOffers = () => {
  const body = {
    personId: BasePage.getPersonId(),
    take: 2
  }
  MakeResponse.makeServerResponse(JobSeekerServices.getSendOfferList(body), false, result => {
    if (result.results) {
      sendOfferList.value = result.results;
      sendTotalRows.value = result.totalRows;
    }
  });
}

onMounted(() => {
  LoggedUser.value = BasePage.getLoggedUser();
  if (LoggedUser.value) {
    JobSeekerGet()
    AddressGet()
    SocialNetworkGet()
    AttachmentGet()
    getOffers()
    SendOffers()
  }
});

</script>
<style scoped lang="scss">
.tab {
  border-radius: 1rem;
  height: 60vh;
}

.address-box {
  height: 6rem
}

.white-space {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
