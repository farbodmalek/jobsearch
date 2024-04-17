<template>
  <div class="container-fluid">

    <template v-if="employerInfo && !employerInfo.persons && employerInfo.persons.length === 0">
      <form @submit.prevent>
        <div>{{ !form.isLegal ? 'اطلاعات کارفرما' : 'اطلاعات نماینده مدیر عامل' }}</div>
        <div class="row">

        <span class="text-danger font-0-9 mb-2">
          * برای ویرایش اطلاعات کارگاه، ابتدا اطلاعات کارفرما / مدیرعامل را تکمیل کنید.
        </span>

          <div class="form-group">
            <label class="required">
              {{!form.isLegal ? 'نام کارفرما' : 'نام نماینده مدیر عامل'}}
            </label>
            <InputText
                class="w-100"
                v-model="employerForm.fullName">
            </InputText>
          </div>

          <div class="form-group">
            <label class="required">کد ملی</label>
            <InputText
                v-model="employerForm.nationalCode"
                class="w-100">
            </InputText>
          </div>

          <div class="form-group col-md-4 col-sm-12">
            <label class="required">{{form.isLegal ? 'شماره موبایل کارفرما' : 'شماره موبایل نماینده مدیر عامل'}}</label>
            <InputText
                v-model="employerForm.mobile"
                class="w-100">
            </InputText>
          </div>
        </div>

        <button type="button" @click="onSubmitEmployerPersonal()" class="btn btn-success w-100 mt-3">
          ذخیره
        </button>

        <hr />
      </form>
    </template>

    <form @submit.prevent>

      <div class="form-group">
        <label>آیا کارفرما دارای کد کارگاه تامین اجتماعی است؟</label>
        <div class="d-flex">
          <div class="d-flex align-items-center form-group">
            <RadioButton v-model="form.isInsurance" inputId="ingredient1" name="isInsurance" :value="true"/>
            <label for="ingredient1" class="me-2">بله</label>
          </div>

          <div class="d-flex align-items-center form-group me-3">
            <RadioButton v-model="form.isInsurance" inputId="ingredient1" name="isInsurance" :value="false"/>
            <label for="ingredient1" class="me-2">خیر</label>
          </div>
        </div>
      </div>

      <div class="form-group" v-if="form.isInsurance">
        <label>کد کارگاه تامین اجتماعی</label>
        <InputText
            class="w-100"
            v-model="form.insuranceCode"/>
      </div>

      <div class="form-group">
        <label>شخصیت کارفرما</label>
        <div class="d-flex">
          <div class="d-flex align-items-center form-group">
            <RadioButton v-model="form.isLegal" inputId="ingredient1" name="isLegal" :value="true"/>
            <label for="ingredient1" class="me-2">حقوقی</label>
          </div>

          <div class="d-flex align-items-center form-group me-3">
            <RadioButton v-model="form.isLegal" inputId="ingredient1" name="isLegal" :value="false"/>
            <label for="ingredient1" class="me-2">حقیقی</label>
          </div>
        </div>
      </div>

      <template v-if="employerInfo && !employerInfo.isLegal && employerInfo && employerInfo?.persons?.length > 0">
        <div class="d-flex justify-content-between mt-3">
          <span class="font-0-8 text-blue-3">نام کارفرما:</span>
          <span class="font-0-9">{{ employerInfo.persons[0]?.fullName || '---' }}</span>
        </div>

        <div class="d-flex justify-content-between mt-2">
          <span class="font-0-8 text-blue-3">کد ملی کارفرما:</span>
          <span class="font-0-9">{{ employerInfo.persons[0]?.nationalCode || '---' }}</span>
        </div>

        <div class="d-flex justify-content-between mt-2">
          <span class="font-0-8 text-blue-3">تاریخ تولد کارفرما:</span>
          <span class="font-0-9">{{ employerInfo.persons[0]?.birthDate || '---' }}</span>
        </div>

      </template>

      <template v-if="employerInfo && employerInfo.isLegal">
        <div class="d-flex justify-content-between mt-3">
          <span class="font-0-8 text-blue-3">شناسه ملی شرکت:</span>
          <span class="font-0-9">{{ employerInfo.nationalNumber || '---' }}</span>
        </div>
      </template>

      <template v-if="employerInfo && employerInfo.isLegal && employerInfo && employerInfo?.persons?.length > 0">
        <div class="d-flex justify-content-between mt-3">
          <span class="font-0-8 text-blue-3">نام نماینده مدیر عامل:</span>
          <span class="font-0-9">{{ employerInfo.persons[0]?.fullName }}</span>
        </div>

        <div class="d-flex justify-content-between mt-2">
          <span class="font-0-8 text-blue-3">کد ملی نماینده مدیر عامل:</span>
          <span class="font-0-9">{{ employerInfo.persons[0]?.nationalCode }}</span>
        </div>
      </template>

      <div class="form-group" v-if="employerInfo?.persons?.length === 0">
        <label
            class="required">{{ employerInfo?.isLegal ? 'شماره موبایل نماینده مدیر عامل' : 'شماره موبایل کارفرما' }}</label>
        <InputText
            type="tel"
            :class="{'p-invalid': v$.mobile.$invalid && submitted}"
            :maxlength="11"
            :minlength="11"
            v-model="form.mobile"
            class="w-100"/>
        <small v-if="form.mobile && form.mobile.length < 11" class="font-0-8 text-danger">
          تعداد کمتر از 11 می باشد
        </small>
      </div>

      <div class="form-group">
        <label class="required">{{ employerInfo?.isLegal ? 'نام شرکت' : 'نام کارگاه' }}</label>
        <InputText
            :class="{'p-invalid': v$.title.$invalid && submitted}"
            :maxlength="11"
            :minlength="11"
            v-model="form.title"
            class="w-100"/>
      </div>

      <div class="form-group">
        <label class="required">موبایل</label>
        <InputText
            type="tel"
            :class="{'p-invalid': v$.mobile.$invalid && submitted}"
            :maxlength="11"
            :minlength="11"
            v-model="form.mobile"
            class="w-100"/>
      </div>

      <div class="form-group">
        <label class="required">استان</label>
        <Dropdown
            :class="{'p-invalid': v$.provinceID.$invalid && submitted}"
            @change="getCity($event.value)"
            show-clear
            option-label="title"
            option-value="id"
            :options="provinceList"
            v-model="form.provinceID"
            class="w-100"/>
      </div>

      <div class="form-group">
        <label class="required">شهرستان</label>
        <Dropdown
            :class="{'p-invalid': v$.cityID.$invalid && submitted}"
            show-clear
            option-label="title"
            option-value="id"
            :options="cityList"
            v-model="form.cityID"
            class="w-100"/>
      </div>

      <div class="form-group">
        <label class="required">نوع مالکیت</label>
        <Dropdown
            :class="{'p-invalid': v$.activitySectionID.$invalid && submitted}"
            show-clear
            option-label="title"
            option-value="id"
            :options="activitySections"
            v-model="form.activitySectionID"
            class="w-100"/>
      </div>

      <div class="form-group">
        <label class="required">بخش عمده اقتصادی</label>
        <Dropdown
            :class="{'p-invalid': v$.sectorID.$invalid && submitted}"
            show-clear
            option-label="title"
            option-value="id"
            :options="sectors"
            v-model="form.sectorID"
            class="w-100"/>
      </div>

      <div class="form-group" v-if="employerInfo && !employerInfo.isLegal">
        <label>شماره مجوز</label>
        <InputText
          class="w-100"
          v-model="form.registerNumber">
        </InputText>
      </div>

      <div class="mt-3">
        <button class="btn btn-success w-100" type="button" @click="onSubmit()">ثبت</button>
        <nuxt-link to="template">
          <button class="btn btn-danger mt-2 w-100">انصراف</button>
        </nuxt-link>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
import {EmployerService} from "~/core/employer/employer-service";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {BasePage} from "~/core/base/base-page";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import type {EmployerInfo} from "~~/core/models/employer/employer-info";
import {CommonServices} from "~/core/common/common-services";
import type {CodingDto} from "~~/core/models/common/coding-dto";
import StaticData from "~/core/enum/static-data";
import {MakeResponse} from "~/composables/make-response";

const provinceList = ref<CodingDto[]>([]);
const cityList = ref<CodingDto[]>([]);
const employerInfo = ref<EmployerInfo>();
const submitted = ref(false);
const activitySections = StaticData.OwnershipTypeList;
const sectors = StaticData.FieldOfActivityList;
const form = reactive({
  id: 0,
  mobile: null,
  title: null,
  isLegal: null,
  provinceID: null,
  cityID: null,
  activitySectionID: null,
  sectorID: null,
  registerNumber: null,
  insuranceCode: null,
  isInsurance: null,
  nationalNumber: null,
});
const rules = computed(() => {
  return {
    title: {required},
    mobile: {required},
    provinceID: {required},
    cityID: {required},
    activitySectionID: {required},
    sectorID: {required},
  }
});
let v$ = useVuelidate(rules, form);


const employerForm = reactive({
  id: 0,
  fullName: null,
  nationalCode: null,
  mobile: null,
});
const rules2 = computed(() => {
  return {
    fullName: {required},
    nationalCode: {required},
    mobile: {required},
  }
});
let v$2 = useVuelidate(rules2, employerForm);

const getEmployerInfo = () => {
  const id = BasePage.getBusinessId();
  MakeResponse.makeServerResponse(EmployerService.getEmployerInfo(id), true, result => {
    if (result.result) {
      employerInfo.value = result.data;
      getPatchValue(employerInfo.value);
      getCity(employerInfo.value.provinceID);
    }
  });
}

const getPatchValue = (data: any) => {
  form.id = data.businessId;
  form.title = data.title;
  form.isLegal = data.isLegal;
  form.provinceID = data.provinceID;
  form.cityID = data.cityID;
  form.activitySectionID = data.activitySectionID;
  form.sectorID = data.sectorID;
  form.registerNumber = data.registerNumber;
  form.insuranceCode = data.insuranceCode;
  form.isInsurance = !!data?.insuranceCode;
  form.nationalNumber = data.nationalNumber;
  form.mobile = data.mobile;
}

const getProvince = () => {
  MakeResponse.makeServerResponse(CommonServices.getCityProvince({typeID: 1, ids: []}), true, result => {
    if (result) {
      provinceList.value = result;
    }
  });
}

const getCity = (id: number) => {
  MakeResponse.makeServerResponse(CommonServices.getCityProvince({typeID: 2, ids: [id]}), true, result => {
    if (result) {
      cityList.value = result;
    }
  });
}

const onSubmit = () => {
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(EmployerService.editEmployerInfo(form), true, result => {
      if (result.result) {
        ToastNotificationService.success('تغییرات جدید با موفقیت انجام شد.');
        const router = useRouter();
        router.push('template');
      } else {
        ToastNotificationService.error(result.serverErrors[0].hint);
      }
    });
  }
}

const onSubmitEmployerPersonal = () => {
  if (!v$2.value.$invalid) {
    MakeResponse.makeServerResponse(EmployerService.setEmployerPersons(employerForm), true, result => {
      if (result.result) {
        ToastNotificationService.success('ثبت نماینده با موفقیت انجام شد');
        getEmployerInfo();
      } else {
        ToastNotificationService.error(result.serverErrors[0].hint);
      }
    });
  }
}

onMounted(() => {
  getEmployerInfo();
  getProvince();
})
</script>

<style scoped>

</style>