<template>
  <div class="container-fluid">
    <form @submit.prevent>
      <div class="form-group">
        <label>
          <RadioButton :class="{'p-invalid': v$.addressType.$invalid && submitted}"
                       v-model="form.addressType" :value="1"/>
          آدرس دفتر مرکزی
        </label>

        <label class="me-2">
          <RadioButton :class="{'p-invalid': v$.addressType.$invalid && submitted}"
                       v-model="form.addressType" :value="3160"/>
          آدرس محل مصاحبه
        </label>
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
            class="w-100"
            v-model="form.provinceID"/>
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
        <label>کدپستی</label>
        <InputText
            type="tel"
            :maxlength="10"
            :minlength="10"
            v-model="form.postalCode"
            class="w-100"/>
        <small v-if="form.postalCode && form.postalCode.length < 10" class="font-0-8 text-danger">
          تعداد کمتر از 10 می باشد
        </small>
      </div>

      <div class="form-group">
        <label class="required">تلفن ثابت (با ذکر کد)</label>
        <InputText
            type="tel"
            :class="{'p-invalid': v$.phoneNo.$invalid && submitted}"
            :maxlength="11"
            :minlength="11"
            v-model="form.phoneNo"
            class="w-100"/>
        <small v-if="form.phoneNo && form.phoneNo.length < 11" class="font-0-8 text-danger">
          تعداد کمتر از 11 می باشد
        </small>
      </div>

      <div class="form-group">
        <label>تلفن همراه</label>
        <InputText
            type="tel"
            :maxlength="11"
            :minlength="11"
            v-model="form.mobileNo"
            class="w-100"/>
        <small v-if="form.mobileNo && form.mobileNo.length < 11" class="font-0-8 text-danger">
          تعداد کمتر از 11 می باشد
        </small>
      </div>

      <div class="form-group">
        <label>نمابر</label>
        <InputText
            type="tel"
            :maxlength="11"
            :minlength="11"
            v-model="form.faxNo"
            class="w-100"/>
        <small v-if="form.faxNo && form.faxNo.length < 11" class="font-0-8 text-danger">
          تعداد کمتر از 11 می باشد
        </small>
      </div>

      <div class="form-group">
        <label class="required">آدرس</label>
        <Textarea
            :class="{'p-invalid': v$.address.$invalid && submitted}"
            v-model="form.address"
            class="w-100"/>
      </div>

      <div class="mt-3">
        <button class="btn btn-success w-100" type="button" @click="onSetAddress()">ثبت</button>

        <nuxt-link to="/employer/template" class="text-white w-100">
          <button type="button" class="btn btn-danger w-100 mt-2">
            انصراف
          </button>
        </nuxt-link>
      </div>

    </form>
  </div>
</template>

<script lang="ts" setup>
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {CommonServices} from "~/core/common/common-services";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {EmployerService} from "~/core/employer/employer-service";
import {BasePage} from "~/core/base/base-page";
import {MakeResponse} from "~/composables/make-response";

definePageMeta({
  name: "اطلاعات آدرس"
});

const provinceList = ref([]);
const cityList = ref([]);
const submitted = ref(false);
const formId = ref<number>();
const route = useRoute();
const form = reactive({
  id: 0,
  provinceID: null,
  cityID: null,
  address: null,
  postalCode: null,
  phoneNo: null,
  faxNo: null,
  mobileNo: null,
  addressType: null,
  businessID: 0
});
const rules = computed(() => {
  return {
    provinceID: {required},
    cityID: {required},
    address: {required},
    phoneNo: {required},
    addressType: {required},
  }
});
let v$ = useVuelidate(rules, form);

const getProvince = () => {
  MakeResponse.makeServerResponse(CommonServices.getCityProvince({typeID: 1, ids: []}), false, result => {
    if (result) {
      provinceList.value = result;
    }
  });
}

const getCity = (id: number) => {
  if (id) {
    MakeResponse.makeServerResponse(CommonServices.getCityProvince({typeID: 2, ids: [id]}), true, result => {
      if (result) {
        cityList.value = result;
      }
    });
  } else {
    cityList.value = [];
  }
}

const getAddress = (id: number) => {
  MakeResponse.makeServerResponse(EmployerService.getAddressInfo(id), true, result => {
    if (result.result) {
      getCity(result.data.province);
      const addressInfo = result.data;
      form.id = addressInfo.id;
      form.provinceID = addressInfo.province;
      form.cityID = addressInfo.cityId;
      form.address = addressInfo.address;
      form.postalCode = addressInfo.postalCode;
      form.phoneNo = addressInfo.phoneNo;
      form.faxNo = addressInfo.faxNo;
      form.mobileNo = addressInfo.mobileNo;
      form.addressType = addressInfo.addressType;
    }
  });
}

const onSetAddress = () => {
  submitted.value = true;
  form.businessID = BasePage.getBusinessId();
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(EmployerService.setAddressInfo(form), true, result => {
      if (result.result) {
        const router = useRouter();
        router.push('/employer/template');
        ToastNotificationService.success('افزودن آدرس با موفقیت انجام شد');
      } else {
        ToastNotificationService.error(result.serverErrors[0].hint);
      }
    });
  } else {
    ToastNotificationService.warn('فیلد های الزامی را تکمیل کنید.');
  }
}

onMounted(() => {
  getProvince();
  if (route.query && +route.query.id) {
    formId.value = +route.query.id;
    getAddress(formId.value);
  }
});
</script>

<style scoped>

</style>