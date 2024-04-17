<template>
  <div class="container-fluid">
    <template v-if="!showSecondStep">
      <p class="fs-6 text-center  mt-4">اطلاعات هویتی خود را وارد کنید.</p>
      <form @submit.prevent class="mt-4">

        <div class="form-group">
          <label class="required">شماره تماس</label>
          <InputText
              class="col-12 bg-gray-3 "
              v-model="registerForm.mobile"
              :class="{'p-invalid': v$.mobile.$invalid && submitted}"/>
        </div>

        <div class="form-group">
          <label class="required">کد ملی </label>
          <InputText
              class="col-12 bg-gray-3"
              v-model="registerForm.nationalCode"
              :class="{'p-invalid': v$.nationalCode.$invalid && submitted}"/>
        </div>

        <div class="form-group">
          <label class="required">تاریخ تولد</label>
          <div class="w-100">
            <InputText
                :class="{'p-invalid': v$.birthDate.$invalid && submitted}"
                type="text"
                class="custom-input w-100 bg-gray-3"
                placeholder=""/>
            <date-picker
                v-model="registerForm.birthDate"
                format="YYYY/MM/DD"
                display-format="jYYYY/jMM/jDD"
                custom-input=".custom-input"/>
          </div>
        </div>

        <div class="d-flex flex-column mb-3 form-group">
          <label class="required">استان و شهرستان</label>
          <Dropdown
              v-model="registerForm.cityID"
              :options="cityList"
              :class="{'p-invalid': v$.cityID.$invalid && submitted}"
              class="w-100 bg-gray-3"
              option-label="title"
              placeholder="استان"
              option-value="id"
              @change="getCity(registerForm.cityID)"
              show-clear/>
          <Dropdown
              v-model="registerForm.provinceID"
              class="w-100 mt-2 bg-gray-3"
              option-label="title"
              :class="{'p-invalid': v$.provinceID.$invalid && submitted}"
              :options="countyList"
              placeholder="شهرستان"
              option-value="id"
              show-clear/>
        </div>

        <div class="form-group">
          <label class="required">رمز عبور</label>
          <Password
              class="bg-gray-3 w-100"
              v-model="registerForm.password"
              :class="{'p-invalid': v$.password.$invalid && submitted}"/>
        </div>

        <div class="form-group">
          <label class="required">تکرار رمز عبور</label>
          <Password
              class="bg-gray-3 w-100"
              v-model="registerForm.retryPassword"
              :class="{'p-invalid': v$.retryPassword.$invalid && submitted}"/>
        </div>


        <div class="d-flex justify-content-between align-items-center mt-3">
          <div class="">
            <img :src="captchaData.captchaCodeImage" alt="captcha" class="w-100"/>
          </div>
          <div class="text-center p-3 cursor-pointer rounded-2 bg-blue-3" @click="onGetCaptchaCode()">
            <i class="pi pi-refresh text-white mt-1"></i>
          </div>
        </div>

        <div class="form-group ">
          <label class="required">کد امنیتی</label>
          <InputText
              minlength="5"
              maxlength="5"
              :class="{'p-invalid': v$.captchaCode.$invalid && submitted}"
              class="w-100 bg-gray-3"
              v-model="registerForm.captchaCode"
              type=""
              placeholder="کد امنیتی"/>
        </div>

        <div class="mx-4 my-2 my-3">
          <div class="bg-orange-2 col-12 mt-1 px-3  border-r-1-25 d-flex justify-content-center bg-green-3">
          <span class="btn text-white text-start" @click="regJobSeekerForm">
            تائید و مرحله بعد
          </span>
          </div>
        </div>
      </form>
    </template>

    <template v-else>
      <Otp :form="registerForm"/>
    </template>
  </div>

</template>
<script setup lang="ts">
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {CommonServices} from "~/core/common/common-services";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {MakeResponse} from "~/composables/make-response";
import {ToastNotificationService} from "~/core/toast-notification-service";
import DatePicker from 'vue3-persian-datetime-picker';
import Otp from "../../../page-components/Otp.vue";

definePageMeta({
  name: "مرحله اول ثبت نام",
  layout: "register"
});

const cityList = ref([]);
const countyList = ref([]);
const showSecondStep = ref(false);
const submitted = ref(false);

const captchaData = ref({
  captchaId: null,
  captchaCodeImage: ''
});

const registerForm = reactive({
  nationalCode: '',
  mobile: '',
  password: "",
  retryPassword: "",
  captchaCode: '',
  captchaId: null,
  cityID: null,
  provinceID: null,
  birthDate: '',
});

const rules = computed(() => {
  return {
    nationalCode: {required},
    mobile: {required},
    password: {required},
    retryPassword: {required},
    captchaCode: {required},
    cityID: {required},
    provinceID: {required},
    birthDate: {required},
  }
});
const v$ = useVuelidate(rules, registerForm);

const regJobSeekerForm = () => {
  submitted.value = true;
  registerForm.captchaId = captchaData.value.captchaId
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(JobSeekerServices.RegJobSeeker(registerForm), true, result => {
      if (result.result) {
        showSecondStep.value = true;
      } else {
        onGetCaptchaCode();
        ToastNotificationService.error("خطا در عملیات ");
      }
    });
  } else {
    ToastNotificationService.warn('فیلد های الزامی را تکمیل کنید.');
  }
}

const onGetCaptchaCode = () => {
  MakeResponse.makeServerResponse(CommonServices.captchaCode(), true, result => {
    if (result.data) {
      captchaData.value = result.data;
    }
  });
}

const getProvince = () => {
  MakeResponse.makeServerResponse(CommonServices.GetCityList({typeID: 1, ids: []}), true, result => {
    if (result) {
      cityList.value = result
    }
  });
}

const getCity = (data: any) => {
  MakeResponse.makeServerResponse(CommonServices.GetCityList({typeID: 2, ids: [data]},), true, result => {
    if (result) {
      countyList.value = result
    }
  });
}

onMounted(() => {
  onGetCaptchaCode();
  getProvince();
});

</script>