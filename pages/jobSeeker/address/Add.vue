<template>
  <div class="container-fluid">
    <form @submit.prevent>

      <div class="form-group">
        <label>استان</label>
        <Dropdown
            :class="{'p-invalid': v$.provinceId.$invalid && submitted}"
            @change="getCity($event.value)"
            show-clear
            option-label="title"
            option-value="id"
            :options="provinceList"
            v-model="addressForm.provinceId"
            class="w-100"/>
      </div>

      <div class="form-group">
        <label class="required">شهرستان</label>
        <Dropdown
            :class="{'p-invalid': v$.cityId.$invalid && submitted}"
            show-clear
            option-label="title"
            option-value="id"
            :options="cityList"
            v-model="addressForm.cityId"
            class="w-100"/>
      </div>

      <div class="form-group">
        <label class="required">شهرستان</label>
        <Dropdown
            :class="{'p-invalid': v$.cityId.$invalid && submitted}"
            show-clear
            option-label="title"
            option-value="id"
            :options="cityList"
            v-model="addressForm.cityId"
            class="w-100"/>
      </div>

      <div class="form-group">
        <label>شهر</label>
        <InputText v-model="addressForm.town" class="w-100"/>
      </div>

      <div class="form-group">
        <label>روستا</label>
        <InputText v-model="addressForm.village" class="w-100"/>
      </div>

      <div class="form-group">
        <label>کدپستی</label>
        <InputText v-model="addressForm.postalCode" class="w-100"/>
      </div>

      <div class="form-group">
        <label>تلفن ثابت به همراه کد</label>
        <InputText maxlength="11" minlength="11" v-model="addressForm.phone" class="w-100"/>
      </div>

      <div class="form-group">
        <label class="required">تلفن همراه</label>
        <InputText maxlength="11" minlength="11" v-model="addressForm.mobile" class="w-100"/>
      </div>

      <div class="form-group">
        <label>ایمیل</label>
        <InputText v-model="addressForm.email" class="w-100"/>
      </div>

      <div class="form-group">
        <label class="required">آدرس</label>
        <Textarea v-model="addressForm.address" class="w-100"/>
      </div>

      <button class="btn btn-success w-100 mt-2" type="button">ثبت</button>
      <nuxt-link to="/jobSeeker/Dashboard">
        <button class="btn btn-danger w-100 mt-2" type="button">
          انصراف
        </button>
      </nuxt-link>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {CommonServices} from "~/core/common/common-services";
import type {CodingDto} from "~~/core/models/common/coding-dto";

definePageMeta({
  name: "آدرس"
});

const provinceList = ref<CodingDto[]>([]);
const cityList = ref<CodingDto[]>([]);
const submitted = ref<boolean>(false);
const addressForm = reactive({
  provinceId: null,
  cityId: null,
  town: null,
  village: null,
  postalCode: null,
  phone: null,
  mobile: null,
  email: null,
  address: null,
});

const rules = computed(() => {
  return {
    provinceId: {required},
    cityId: {required},
    mobile: {required},
    address: {required},
  };
});
const v$ = useVuelidate(rules, addressForm);

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
})
</script>

<style scoped>

</style>