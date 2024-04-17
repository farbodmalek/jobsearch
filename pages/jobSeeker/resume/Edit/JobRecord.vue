<template>
<!--  <Cvprogress/>-->
<!--  <div class="d-flex justify-content-between px-4 m-3 ">-->
<!--    <span>سوابق شغلی اخذ شده از نظام اطلاعات بازار کار </span>-->
<!--    <img alt="" src="/img/icon/Group 553.svg" />-->
<!--  </div>-->
  <div class="col-12 px-1 bg-white p-input">
    <form @submit.prevent="sumbitForm()">

      <div class=" form-group  px-4 bg-gray-3 p-2 " v-if="!JobRecordesForm.isOtherJob"  >
        <label class="required p-2">شغل</label>
        <AutoComplete
            v-model="JobItemFieldId"
            :class="{'p-invalid': JobItemFieldId==null && submitted}"
            :suggestions="jobItems"
            class="col-12 "
            dataKey="id"
            field="title"
            optionLabel="title"
            @complete="searchJob($event.query)">
        </AutoComplete>
      </div>

      <div class=" form-group  px-4 bg-gray-3 p-2 " v-if="JobRecordesForm.isOtherJob" >
        <label class="required">
          شغل مورد نظر را وارد کنید
        </label>
        <InputText v-model="JobRecordesForm.otherJobTitle"
                   :class="{'p-invalid': v$.organTitle.$invalid && submitted}"
                   class="w-100 bg-white"
                   type="text"/>
      </div>
      <div class=" d-flex  pt-2 flex-column  px-5 bg-gray-3 justify-content-center  gap-3 ">
        <span class="text-blue-3 text-center">در صورت نبودن شغل مورد نظر در فیلد شغل می توانید با انتخاب این گزینه عنوان شغل مورد نظر را تایپ کنید</span>
        <div class="d-flex justify-content-center">
          <label class="col-4 text-center">سایر شغل ها</label>
          <input v-model="JobRecordesForm.isOtherJob"
                 name="acrifice"
                 type="checkbox"/>
        </div>
      </div>
      <div class=" form-group  px-5  ">
        <label class="required">
          نوع موسسه
        </label>
        <Dropdown v-model="JobRecordesForm.organTypeID"
                  :class="{'p-invalid': v$.organTypeID.$invalid && submitted}"
                  :options="OrganTypeID"
                  class="w-100 bg-gray-3"
                  option-label="title"
                  placeholder="نوع موسسه"
                  option-value="id"
                  show-clear/>
      </div>

      <div class="form-group   px-5  ">
        <label class="required">
          نام موسسه
        </label>
        <InputText v-model="JobRecordesForm.organTitle"
                   :class="{'p-invalid': v$.organTitle.$invalid && submitted}"
                   class="w-100 bg-white"
                   placeholder="نام موسسه"
                   type="text"/>
      </div>
      <div class="form-group   px-5   ">
        <label class="required">
          نوع همکاری
        </label>
        <Dropdown v-model="JobRecordesForm.cooperativeTypeId"
                  :class="{'p-invalid': v$.cooperativeTypeId.$invalid && submitted}"
                  :options="CooperativeList"
                  class="w-100  bg-gray-3"
                  option-label="title"
                  placeholder="نوع همکاری"
                  option-value="id"
                  show-clear/>
      </div>

      <div class="-group form-group  px-5  ">
        <label class="">
          شهر
        </label>
        <Dropdown v-model="JobRecordesForm.cityID"
                  :options="CityList"
                  class="w-100  bg-gray-3"
                  option-label="title"
                  placeholder="شهر"
                  option-value="id"
                  show-clear/>
      </div>

      <div class="form-group form-group  px-5 ">
        <label class="">
        میزان حقوق
      </label>
        <InputText v-model="JobRecordesForm.salaryVal"
                   class="w-100 bg-white"
                   type="text"
                   placeholder="میزان حقوق"/>
      </div>

      <div class="form-group pt-2 form-group d-flex px-5 justify-content-center align-items-center">
        <label class="col-3 text-center">مشغول به کار</label>
        <input v-model="JobRecordesForm.isWorking"
               name="acrifice"
               type="checkbox"
               class="bg-blue-2"
        />
      </div>


      <div class=" form-group   px-5 py-2 mt-2 border-r-1-5">
        <label>تاریخ شروع </label>
        <div class="w-100 me-1">
          <InputText
              class="custom-input w-100 bg-gray-3"
              placeholder=""
              type="text"
          />
          <date-picker
              v-model="JobRecordesForm.startDateForm"
              custom-input=".custom-input"
              display-format="jYYYY-jMM-jDD"
              format="YYYY-MM-DD"
          />
        </div>
      </div>

      <div v-if="!JobRecordesForm.isWorking"
           class="form-group px-5">
        <label>تاریخ پایان </label>
       <div class="w-100 me-1">
        <InputText
            class="custom-input1 w-100 bg-gray-3"
            placeholder=""
            type="text"
        />
        <date-picker
            v-model="JobRecordesForm.endDateForm"
            custom-input=".custom-input1"
            display-format="jYYYY-jMM-jDD"
            format="YYYY-MM-DD"
        />
      </div>
      </div>

      <div class="mt-2 d-flex justify-content-center mx-4">
        <button class="btn p-2 btn-success fw-normal col-5">
          ثبت
        </button>
        <nuxt-link class="btn  btn-danger fw-normal col-5"  @click="router.back()">
          انصراف
        </nuxt-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import Cvprogress from "~/components/jobSeeker/Cvprogress.vue"
import {CommonServices} from "~/core/common/common-services";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import type {IscoDto} from "~~/core/models/common/isco-dto";
import {BasePage} from "~/core/base/base-page";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {MakeResponse} from "~/composables/make-response";
import DatePicker from 'vue3-persian-datetime-picker';

definePageMeta({
  name: "افزودن سوابق شغلی "
});

const checked = ref(false);
const jobItems = ref<IscoDto[]>([]);
const showSecondStep = ref(false);
const submitted = ref(false);
const CooperativeList = ref([]);
const OrganTypeID = ref([]);
const router = useRoute();
const CityList = ref([]);
const UserData = ref([])
 let JobItemFieldId = ref();
const data= ref([])
if (process.browser) {
  UserData.value = JSON.parse(<string>localStorage.getItem('user-data'));
}


const JobRecordesForm = ref({
  id:0,
  nationalCode: null,
  iscoID: null,
  isOtherJob: false,
  otherJobTitle: null,
  organTitle: null,
  organTypeID: null,
  cooperativeTypeId: null,
  startDateForm: null,
  cityID: null,
  isWorking: false,
  salaryVal: null,
  endDateForm: null
})

const rules = computed(() => {
  return {
    organTypeID: {required},
    organTitle: {required},
    cooperativeTypeId: {required},
  }
})
const v$ = useVuelidate(rules, JobRecordesForm)

onMounted(() => {
  MakeResponse.makeServerResponse(CommonServices.GetTypeList([15, 28],), true, result => {
    if (result) {
      OrganTypeID.value = result.filter((Id: any) => {
        return Id.parentID == 28
      })
      CooperativeList.value = result.filter((Id: any) => {
        return Id.parentID == 15
      })
    }
  });

  MakeResponse.makeServerResponse(CommonServices.GetCityList({"typeID": 2, "ids": []},), true, result => {
    if (result) {
      CityList.value = result
    }
  });

  MakeResponse.makeServerResponse(JobSeekerServices.GetJob({nationalCode:BasePage.getLoggedUser().userName}), true, result => {
    if (result && router.query.id) {
      data.value=result.results.find((item:any)=>item.id ==router.query.id)
      PatchValue(data)
    }
  });
})


const searchJob = (item: string) => {
  const body = {
    keyword: item,
    pageSize: 20
  }
  MakeResponse.makeServerResponse(CommonServices.getIscoJobs(body), false, result => {
    if (result) {
      jobItems.value = result;
    }
  });
}


const PatchValue = (data: any) => {
  JobRecordesForm.value = {
    id: data.value.id,
    nationalCode: data.value.nationalCode,
    iscoID: data.value.iscoId,
    isOtherJob: data.value.isOtherJob,
    otherJobTitle: data.value.otherJobTitle,
    organTitle: data.value.organTitle,
    organTypeID: data.value.organTypeId,
    cooperativeTypeId: data.value.cooperativeTypeId,
    startDateForm: data.value.startDateForm,
    cityID: data.value.cityId,
    isWorking: data.value.isWorking,
    salaryVal: data.value.salaryVal,
    endDateForm: data.value.endDateForm
  }
  JobItemFieldId.value = data.value.iscoTitle;
}

const sumbitForm = () => {
  submitted.value = true;
  if (!v$.value.$invalid) {
    showSecondStep.value = true;
    JobRecordesForm.value.id = router.query.id ? +router.query.id : 0;
    JobRecordesForm.value.iscoID = JobItemFieldId.value.id
    JobRecordesForm.value.nationalCode = BasePage.getLoggedUser().userName;
    MakeResponse.makeServerResponse(JobSeekerServices.SetJob(JobRecordesForm.value), true, result => {
      if (result && result.result) {
        ToastNotificationService.success('فرم با موفقیت ثبت شد ');
        setTimeout(() => {
          const router =useRouter()
          router.back()
        }, 2500)
      }
    });
  }
  else {
    ToastNotificationService.warn('فیلد های الزامی را تکمیل کنید.');
  }
}

</script>
<style>


</style>