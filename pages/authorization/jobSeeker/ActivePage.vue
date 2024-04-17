<template>
  <p class=" text-center my-3 fw-bold ">
    فعالسازی پروفایل </p>
    <div class=" d-flex justify-content-center   mt-3 bg-green-3 text-white">
      <p class="text-start col-6 font-0-8">
        مرحله ی اول ثبت نام شما انجام شد مرحله ی دوم ثبت نام
      </p>
      <img src="/img/icon/Group235.svg"  alt="">
    </div>
    <form @submit.prevent="sendActiveForm()" autocomplete="off" >
        <!-- Employment status -->
        <div class=" p-2 d-block bg-gray-3">
          <p class=" py-1  fw-bold text-black me-2">ایا در حال حاضر شاغل هستید؟</p>
          <div class="input-style col-12 d-flex form-group ">
              <label class="col-2 my-0">خیر</label>
              <RadioButton type="radio"
                           name="isCurrentActivityStatus"
                           :value="false"
                           :class="{'p-invalid': v$.isCurrentActivityStatus.$invalid && submitted}"
                           v-model="ActiveForm.isCurrentActivityStatus"
                           @click="EmploymentTabHandel(false)"/>
              <label class="col-2 my-0">بله </label>
              <RadioButton type="radio"
                           name="isCurrentActivityStatus"
                           :value="true"
                           :class="{'p-invalid': v$.isCurrentActivityStatus.$invalid && submitted}"
                           v-model="ActiveForm.isCurrentActivityStatus"
                           @click="EmploymentTabHandel(true)"/>
          </div>
        </div>
        <!-- work experience -->
        <div class="d-flex p-2 flex-column-reverse"
             v-if="TabStatus">
          <div
              class="input-style col-12 d-flex border border-primary py-2 rounded-3  form-group"
          >
            <label class="col-6">
              <div class="border-end-2  box col-12 py-1">
                <span>سابقه غیر بیمه ای</span>
              </div>
              <InputText type="text" name="gender"
                         class="col-6" placeholder="ماه"
                           v-model="ActiveForm.notInsuranceYear"
                         :class="{'p-invalid': v$.notInsuranceYear.$invalid && submitted}"/>
            </label>
            <label class="col-6">
              <div class="back-end box col-12 border-end-2  py-1">
                <span>سابقه بیمه ای </span>
              </div>
              <InputText type="text" name="gender"
                         class="col-6"
                         placeholder="ماه"
                           v-model="ActiveForm.insuranceYear"
                         :class="{'p-invalid': v$.insuranceYear.$invalid && submitted}"/>
            </label>
          </div>
          <p class="py-2 text-start fw-bold  me-2">
            سوابق شغلی خود را به تفکیک بیمه ای و غیر بیمه ای ( برحسب ماه وارد کنید )
          </p>
        </div>
        <!-- Skilled background -->
      <div class=" p-2 d-block bg-white">
        <p class=" py-1  fw-bold text-black me-2">آیا دارای سابقه مهارتی (با مدرک / با بدون مدرک ) هستید</p>
        <div class="input-style col-12 d-flex form-group ">
          <label class="col-2 my-0">خیر</label>
          <RadioButton type="radio"
                       name="skillStatus"
                       v-model="ActiveForm.skillStatus"
                       :value="false"
                       :class="{'p-invalid': v$.skillStatus.$invalid && submitted}"/>
          <label class="col-2 my-0">بله </label>
          <RadioButton type="radio"
                       name="skillStatus"
                       v-model="ActiveForm.skillStatus"
                       :value="true"
                       :class="{'p-invalid': v$.skillStatus.$invalid && submitted}"/>
        </div>
      </div>
        <!-- gender status -->
      <div class=" p-2 d-block bg-gray-3">
        <p class=" py-1 fw-bold text-black me-2">لطفا جنسیت خود را مشخص کنید</p>
        <div class="input-style col-12 d-flex form-group">
          <label class="col-2 my-0">زن</label>
          <RadioButton type="radio"
                       name="genderId"
                       v-model="ActiveForm.genderId"
                       :value="3049"
                       :class="{'p-invalid': v$.genderId.$invalid && submitted}"/>
          <label class="col-2 my-0">مرد </label>
          <RadioButton type="radio"
                       name="genderId"
                       v-model="ActiveForm.genderId"
                       :value="3048"
                       :class="{'p-invalid': v$.genderId.$invalid && submitted}"/>
        </div>
      </div>
        <!-- physical condition -->
      <div class=" p-2 d-block bg-white">
        <p class=" py-1 fw-bold text-black me-2"> لطفا جنسیت خود را مشخص کنید</p>
        <div class="input-style col-12 d-flex form-group">
          <label class="col-2 my-0">کم توان </label>
          <RadioButton type="radio"
                       name="isDisabilities"
                       v-model="ActiveForm.isDisabilities"
                       :value="false"
                       :class="{'p-invalid': v$.isDisabilities.$invalid && submitted}"/>
          <label class="col-2 my-0">سالم </label>
          <RadioButton type="radio"
                       name="isDisabilities"
                       v-model="ActiveForm.isDisabilities" :value="true"
                       :class="{'p-invalid': v$.isDisabilities.$invalid && submitted}"/>
        </div>
      </div>
        <!-- sumbit -->
      <div  class="d-flex flex-wrap justify-content-center mt-3 ">
        <button class="btn col-8 bg-green-3  border-r-1-25 p-3 mb-2  text-white" >
          تایید و مرحله بعد
        </button>
      </div>
    </form>
</template>
<script setup lang="ts">

import {MakeResponse} from "~/composables/make-response";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {ToastNotificationService} from "~/core/toast-notification-service";
import Header from "~/components/headers/Header.vue";


const TabStatus = ref(false);
const submitted = ref(false);
const ActiveForm = ref({
  isCurrentActivityStatus: null,
  insuranceYear: null,
  notInsuranceYear: null,
  skillStatus: null,
  isHistoryWork: true,
  genderId: null,
  isDisabilities: null,
  // mobile: [null, Validators.required],
  // cityId: [null, Validators.required],
  // provinceID: [null, Validators.required],
  // physicalConditionId: [null],
  // id: [0],
  // isLiterate: [null, Validators.required],
  // checked: [null],
  // jobStatus: [null]
})
definePageMeta({
  name:"فعال سازی پروفایل ",
  layout:"register"
});
const rules = computed(() => {
  return {
    isCurrentActivityStatus: {required},
    insuranceYear: '',
    notInsuranceYear: "",
    skillStatus: {required},
    // isHistoryWork: {required},
    genderId: {required},
    isDisabilities: {required},
    // mobile: [null, Validators.required],
    // cityId: [null, Validators.required],
    // provinceID: [null, Validators.required],
    // physicalConditionId: [null],
    // id: [0],
    // isLiterate: [null, Validators.required],
    // checked: [null],
    // jobStatus: [null]
  };
});
const v$ = useVuelidate(rules, ActiveForm);
const showSecondStep = ref(false);

const EmploymentTabHandel = (status: any) => {
  TabStatus.value = status;
};


const sendActiveForm = () => {
  submitted.value = true;
    if (!v$.value.$invalid) {
    showSecondStep.value = true;
    MakeResponse.makeServerResponse(JobSeekerServices.getActiveProfile(ActiveForm.value), true, result => {
      if (result && result.result) {
        if (result.data.types.includes(1)) {
          ToastNotificationService.success('ورود با موفقیت انجام شد');
          location.href = process.env.Panel_Api + 'person-template'
        } else if (result.data.types.includes(2)) {
          ToastNotificationService.success('ورود با موفقیت انجام شد');
          // location.href = process.env.adminPanel + 'employer-template'
        } else {
          ToastNotificationService.error('مشکلی پیش آمده است لطفا مجددا تلاش کنید');
        }
      }
        }
    )
  }


}


</script>
<style lang="scss">
$font: "Inter", sans-serif;
$white: #fff;
$color: #c2c2c2;

.input-style {
  text-align: center;
  flex-wrap: wrap;
  justify-content: center;

  h1 {
    font-family: $font;
    color: $white;
  }

  input[type="radio"] {
    // display: none;

    &:checked {
      + .box {
        // background-color: $color;
        color: rgb(0, 0, 0);
      }

      + .boxeducation {
        // background-color: $color;
        color: rgb(0, 0, 0);
      }

      + .boxLoan {
        // background-color: $color;
        color: rgb(0, 0, 0);
      }
    }
  }

  .box {
    height: 38px;
    transition: all 250ms ease;
    will-change: transition;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    position: relative;

    &:active {
      transform: translateY(10px);
    }

    span {
      transform: translate(0, 60px);
      left: 0;
      right: 0;
      transition: all 300ms ease;
      font-size: 1em;
      user-select: none;

      &:before {
        font-size: 1.2em;
        font-family: FontAwesome;
        display: block;
        transform: translateY(-80px);
        opacity: 0;
        transition: all 300ms ease-in-out;
        font-weight: normal;
        color: white;
      }
    }
  }

  .boxeducation {
    transition: all 250ms ease;
    will-change: transition;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    position: relative;

    &:active {
      transform: translateY(10px);
    }

    span {
      transform: translate(0, 60px);
      left: 0;
      right: 0;
      transition: all 300ms ease;
      font-size: 1em;
      user-select: none;

      &:before {
        font-size: 1.2em;
        font-family: FontAwesome;
        display: block;
        transform: translateY(-80px);
        opacity: 0;
        transition: all 300ms ease-in-out;
        font-weight: normal;
        color: white;
      }
    }
  }

  .boxLoan {
    transition: all 250ms ease;
    will-change: transition;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    position: relative;

    &:active {
      transform: translateY(10px);
    }

    span {
      transform: translate(0, 60px);
      left: 0;
      right: 0;
      transition: all 300ms ease;
      font-size: 1em;
      user-select: none;

      &:before {
        font-size: 1.2em;
        font-family: FontAwesome;
        display: block;
        transform: translateY(-80px);
        opacity: 0;
        transition: all 300ms ease-in-out;
        font-weight: normal;
        color: white;
      }
    }
  }
}
</style>
