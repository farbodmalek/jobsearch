<template>
  <div class="p-2">
    <p class="text-blue-2 text-center">کارفرما حقیقی</p>
    <div class="mt-4">
      <form @submit.prevent>
        <template v-if="showStepOne">

          <div class="form-group">
            <label>نام کارگاه</label>
            <InputText
                :class="{'p-invalid': v$.employerTitle.$invalid && submitted}"
                type="text"
                v-model="stepOneForm.employerTitle"
                class="w-100"/>
          </div>

          <div class="form-group">
            <label>کد ملی</label>
            <InputText
                :class="{'p-invalid': v$.nationalCode.$invalid && submitted}"
                type="text"
                v-model="stepOneForm.nationalCode"
                class="w-100"/>
          </div>

          <div class="form-group">
            <label>تاریخ تولد</label>
            <InputText
                :class="{'p-invalid': v$.birthDate.$invalid && submitted}"
                type="text"
                v-model="stepOneForm.birthDate"
                class="w-100"/>
          </div>

          <div class="form-group">
            <label>موبایل</label>
            <InputText
                :class="{'p-invalid': v$.mobile.$invalid && submitted}"
                type="text"
                v-model="stepOneForm.mobile"
                class="w-100"/>
          </div>

          <div class="form-group">
            <label>رمز عبور</label>
            <InputText
                :class="{'p-invalid': v$.password.$invalid && submitted}"
                type="password"
                v-model="stepOneForm.password"
                class="w-100"/>
          </div>

          <div class="form-group">
            <label>تکرار رمز عبور</label>
            <InputText
                :class="{'p-invalid': v$.rePassword.$invalid && submitted}"
                type="password"
                v-model="stepOneForm.rePassword"
                class="w-100"/>
          </div>

          <button class="btn btn-primary w-100 mt-2" type="button" @click="showStepOne = !showStepOne">
            تائید
          </button>
        </template>

        <template v-else>

          <div class="form-group">
            <label>بخش عمده اقتصادی</label>
            <Dropdown
                :class="{'p-invalid': v$.sectorID.$invalid && submitted}"
                show-clear
                option-label="title"
                option-value="id"
                :options="sectorList"
                v-model="stepOneForm.sectorID"
                class="w-100"/>
          </div>

          <div class="form-group">
            <label>نوع مالکیت</label>
            <Dropdown
                :class="{'p-invalid': v$.activitySectionID.$invalid && submitted}"
                show-clear
                option-label="title"
                option-value="id"
                :options="ownerTypeList"
                v-model="stepOneForm.activitySectionID"
                class="w-100"/>
          </div>

          <div class="form-group">
            <label>استان</label>
            <Dropdown
                :class="{'p-invalid': v$.provinceID.$invalid && submitted}"
                @change="getCity($event.value)"
                show-clear
                option-label="title"
                option-value="id"
                :options="provinceList"
                v-model="stepOneForm.provinceID"
                class="w-100"/>
          </div>

          <div class="form-group">
            <label>شهرستان</label>
            <Dropdown
                :class="{'p-invalid': v$.cityID.$invalid && submitted}"
                show-clear
                option-label="title"
                option-value="id"
                :options="cityList"
                v-model="stepOneForm.cityID"
                class="w-100"/>
          </div>

          <button class="btn btn-success w-100 mt-2" type="button" @click="onSubmitStepOne()">
            ثبت نام
          </button>

        </template>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {CommonServices} from "~/core/common/common-services";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import type {CodingDto} from "~~/core/models/common/coding-dto";

const provinceList = ref<CodingDto[]>([]);
const cityList = ref<CodingDto[]>([]);
const submitted = ref(false);
const stepOneForm = reactive({
  employerTitle: '',
  nationalCode: '',
  mobile: '',
  birthDate: '',
  sectorID: null,
  activitySectionID: '',
  password: '',
  rePassword: '',
  provinceID: null,
  cityID: null,
  captchaCode: '',
});

const rules = computed(() => {
  return {
    employerTitle: {required},
    nationalCode: {required},
    mobile: {required},
    sectorID: {required},
    activitySectionID: {required},
    password: {required},
    rePassword: {required},
    birthDate: {required},
    provinceID: {required},
    cityID: {required},
    captchaCode: {required},
  };
});
const v$ = useVuelidate(rules, stepOneForm);

const sectorList = ref([
  {id: 1, title: 'کشاورزی'},
  {id: 2, title: 'صنعت'},
  {id: 3, title: 'خدمات'}
]);

const ownerTypeList = ref([
  {id: 1, title: 'دولتی'},
  {id: 2, title: 'خصوصی'},
  {id: 3, title: 'تعاونی'}
]);
const showStepOne = ref(true);


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

onMounted(() => {
  getProvince();
});

const onSubmitStepOne = () => {
  submitted.value = true;
}
</script>

<style scoped>

</style>