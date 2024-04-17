<template>
  <div class="container-fluid">
    <form @submit.prevent>

      <div class="form-group d-flex align-items-end">
        <Checkbox v-model="form.everyJob" :binary="true" @change="onChangeValidation(1, form.everyJob)"/>
        <label class="me-2 mb-0">تمایل به انجام هر شغلی را دارم(کارگر ساده و ...)</label>
      </div>

      <div class="form-group">
        <div class="d-flex justify-content-between">
          <label v-if="!otherJobs">شغل درخواستی</label>

          <div class="mb-2">
            <Checkbox @change="onChangeValidation(2, otherJobs)" v-model="otherJobs" :binary="true"
                      :disabled="form.everyJob"/>
            <label class="me-2 mb-0">سایر مشاغل</label>
          </div>
        </div>
        <AutoComplete
            v-if="!otherJobs"
            value="id"
            :disabled="form.everyJob || otherJobs"
            :class="{'p-invalid': !(form.everyJob || otherJobs) && submitted}"
            dataKey="id"
            optionLabel="title"
            field="title"
            :placeholder="form.everyJob ? 'آماده ی همکاری در تمام زمینه های شغلی می باشم' : ''"
            @complete="searchJob($event.query)"
            @item-select="getSelectedJob($event.value)"
            v-model="iscoId"
            class="w-100"
            :suggestions="jobItems">
        </AutoComplete>

        <template v-if="otherJobs">
          <label>سایر مشاغل</label>
          <InputText
              :class="{'p-invalid': !(form.everyJob || otherJobs) && submitted}"
              :placeholder="form.everyJob ? 'آماده ی همکاری در تمام زمینه های شغلی می باشم' : 'سایر'"
              :disabled="form.everyJob"
              v-model="form.jobTitle"
              class="w-100">
          </InputText>
        </template>
      </div>

      <div class="form-group">
        <label class="required">نوع همکاری</label>
        <MultiSelect
            :class="{'p-invalid': v$.cooperationTypeList.$invalid && submitted}"
            v-model="form.cooperationTypeList"
            display="chip"
            :options="cooperationTypeList"
            optionLabel="title"
            optionValue="id"
            placeholder="انتخاب کنید"
            empty="داده ای برای نمایش وجود ندارد"
            :maxSelectedLabels="3"
            class="w-100"/>
      </div>

      <div class="form-group">
        <label class="required">استان</label>
        <MultiSelect
            show-clear
            display="chip"
            @change="getCity($event.value)"
            :class="{'p-invalid': v$.provinceIdList.$invalid && submitted}"
            v-model="form.provinceIdList"
            :options="provinceList"
            optionLabel="title"
            optionValue="id"
            placeholder="انتخاب کنید"
            emptyMessage="داده ای برای نمایش وجود ندارد"
            :maxSelectedLabels="3"
            class="w-100"/>
      </div>

      <div class="form-group">
        <label class="required">شهرستان</label>
        <MultiSelect
            display="chip"
            show-clear
            :class="{'p-invalid': v$.cityIdList.$invalid && submitted}"
            v-model="form.cityIdList"
            :options="cityList"
            optionLabel="title"
            optionValue="id"
            placeholder="انتخاب کنید"
            emptyMessage="داده ای برای نمایش وجود ندارد"
            :maxSelectedLabels="3"
            class="w-100"/>
      </div>

      <div class="form-group">
        <label>از بین مدارک تحصیلی مرتبط خود یکی را انتخاب کنید.</label>
        <Dropdown
            show-clear
            v-model="form.educationFieldId"
            :options="educationRelatedList"
            optionLabel="educationFieldTitle"
            optionValue="educationFieldId"
            placeholder="انتخاب کنید"
            empty="داده ای برای نمایش وجود ندارد"
            class="w-100"/>
      </div>

      <div class="form-group">
        <label class="required">نوع دستمزد</label>
        <Dropdown
            show-clear
            :class="{'p-invalid': v$.salaryTypeId.$invalid && submitted}"
            v-model="form.salaryTypeId"
            :options="salaryTypeList"
            optionLabel="title"
            optionValue="id"
            placeholder="انتخاب کنید"
            empty="داده ای برای نمایش وجود ندارد"
            class="w-100"/>
      </div>

      <div class="form-group" v-if="form.salaryTypeId === 3081">
        <label class="required">حداقل حقوق درخواستی</label>
        <InputNumber
            v-model="form.agreedAmount"
            class="w-100"/>
      </div>

      <div class="form-group">
        <label>آیا تمایل به شغلی که دارای بیمه تامین اجتماعی است دارید؟</label>
        <div class="d-flex">

          <div class="d-flex align-items-center">
            <RadioButton v-model="form.isInsurance" inputId="ingredient1" name="pizza" :value="true"/>
            <label for="ingredient1" class="me-1">بلی</label>
          </div>

          <div class="d-flex align-items-center me-2">
            <RadioButton v-model="form.isInsurance" inputId="ingredient2" name="pizza" :value="false"/>
            <label for="ingredient2" class="me-1">خیر</label>
          </div>

        </div>
      </div>

      <div class="mt-2">
        <button @click="onSubmit()" class="btn btn-success fw-normal w-100" type="button">
          ثبت درخواست
        </button>
        <nuxt-link to="list" class="btn btn-danger fw-normal w-100 mt-2">
          انصراف
        </nuxt-link>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
import {CommonServices} from "~/core/common/common-services";
import type {IscoDto} from "~~/core/models/common/isco-dto";
import type {CodingDto} from "~~/core/models/common/coding-dto";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {BasePage} from "~/core/base/base-page";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {MakeResponse} from "~/composables/make-response";
import {BaseCodingEnum} from "~/core/enum/baseCoding.enum";

definePageMeta({
  name: "شغل درخواستی"
});

const jobItems = ref<IscoDto[]>([]);
const cooperationTypeList = ref<CodingDto[]>([]);
const salaryTypeList = ref<CodingDto[]>([]);
const provinceList = ref<CodingDto[]>([]);
const cityList = ref<CodingDto[]>([]);
const educationRelatedList = ref<CodingDto[]>([]);
const submitted = ref<boolean>(false);
const otherJobs = ref<boolean>(false);
const iscoId = ref<number>(null);
const form = reactive({
  iscoId: null,
  jobTitle: null,
  cooperationTypeList: null,
  provinceIdList: null,
  cityIdList: null,
  educationFieldId: null,
  salaryTypeId: null,
  agreedAmount: null,
  isInsurance: null,
  nationalCode: null,
  everyJob: false,
  id: 0
});
const rules = computed(() => {
  return {
    iscoId: {required},
    cooperationTypeList: {required},
    provinceIdList: {required},
    cityIdList: {required},
    salaryTypeId: {required},
  }
});
let v$ = useVuelidate(rules, form);

const onChangeValidation = (id: number, item: boolean) => {
  if (id === 1) {
    if (!item) {
      const rules2 = computed(() => {
        return {
          iscoId: {required},
          cooperationTypeList: {required},
          provinceIdList: {required},
          cityIdList: {required},
          salaryTypeId: {required},
        }
      });
      v$ = useVuelidate(rules2, form);
    } else {
      const rules2 = computed(() => {
        return {
          iscoId: '',
          cooperationTypeList: {required},
          provinceIdList: {required},
          cityIdList: {required},
          salaryTypeId: {required},
        }
      });
      v$ = useVuelidate(rules2, form);
    }
  } else if (id === 2) {
    // jobTitle
    if (!item) {
      const rules2 = computed(() => {
        return {
          iscoId: {required},
          jobTitle: '',
          cooperationTypeList: {required},
          provinceIdList: {required},
          cityIdList: {required},
          salaryTypeId: {required},
        }
      });
      v$ = useVuelidate(rules2, form);
    } else {
      const rules2 = computed(() => {
        return {
          iscoId: '',
          jobTitle: {required},
          cooperationTypeList: {required},
          provinceIdList: {required},
          cityIdList: {required},
          salaryTypeId: {required},
        }
      });
      v$ = useVuelidate(rules2, form);
    }
  }
}

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

const getSelectedJob = (event: any) => {
  if (event && event.id) {
    form.iscoId = event.id
  } else
    form.iscoId = null;
}

const getCoding = () => {
  MakeResponse.makeServerResponse(CommonServices.GetTypeList([BaseCodingEnum.cooperationType, BaseCodingEnum.salaryType]), false, result => {
    if (result) {
      cooperationTypeList.value = result.filter((p: CodingDto) => p.parentID === 15);
      salaryTypeList.value = result.filter((p: CodingDto) => p.parentID === 25 && p.title !== 'نامشخص');
    }
  });
}

const getProvince = () => {
  const body = {
    ids: [],
    typeID: 1
  }
  MakeResponse.makeServerResponse(CommonServices.GetCityList(body), false, result => {
    if (result) {
      provinceList.value = result.filter((x: CodingDto) => x.title !== 'نامشخص');
    }
  });
}

const getCity = (data: number[]) => {
  if (data && data.length > 0) {
    const body = {
      ids: data,
      typeID: 2
    }
    MakeResponse.makeServerResponse(CommonServices.GetCityList(body), false, result => {
      if (result) {
        cityList.value = result.filter((x: CodingDto) => x.title !== 'نامشخص');
      }
    });
  } else {
    cityList.value = [];
  }
}

const getJobSeekerRelatedEducations = () => {
  const nationalCode = BasePage.getLoggedUser().userName;
  MakeResponse.makeServerResponse(JobSeekerServices.getJobSeekerRelatedEducations(nationalCode), true, result => {
    if (result.results) {
      educationRelatedList.value = result.results.filter((p: any) => !p.isLmis).map((z: any) => {
        return {
          ...z,
          educationFieldTitle: (z.educationFieldTitle ? z.educationFieldTitle : '') + ' - ' + z.eduLevelTitle
        }
      });
    }
  })
}

const onSubmit = () => {
  submitted.value = true;
  if (!v$.value.$invalid) {
    const body = form;
    form.nationalCode = BasePage.getLoggedUser().userName;
    // body.iscoId = form.iscoId ? form.iscoId.id : null;
    MakeResponse.makeServerResponse(JobSeekerServices.setRequestedJob(body), true, result => {
      if (result.result) {
        ToastNotificationService.success('ثبت درخواست شغلی با موفقیت انجام شد');
        const router = useRouter();
        router.push('list')
      }
    });
  } else {
    ToastNotificationService.warn('فیلد های الزامی را تکمیل کنید.');
  }
}

onMounted(() => {
  getCoding();
  getProvince();
  getJobSeekerRelatedEducations();
});

</script>

<style scoped>

</style>