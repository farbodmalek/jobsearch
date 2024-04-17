<template>
  <div class="container-fluid">
    <form @submit.prevent>

      <div class="form-group">
        <label class="required">نوع آدرس اینترنتی</label>
        <Dropdown
            :class="{'p-invalid': v$.networkTypeID.$invalid && submitted}"
            show-clear
            option-label="title"
            option-value="id"
            :options="socialMedias"
            v-model="form.networkTypeID"
            class="w-100"/>
      </div>

      <div class="form-group">
        <label class="required">آدرس اینترنتی</label>
        <InputText
            :class="{'p-invalid': v$.link.$invalid && submitted}"
            v-model="form.link"
            class="w-100"/>
      </div>

      <div class="form-group">
        <label>توضیحات</label>
        <Textarea
            v-model="form.description"
            class="w-100"/>
      </div>

      <div class="mt-2">
        <button class="btn btn-success w-100" type="button" @click="onSetSocial()">ثبت</button>

        <nuxt-link to="/employer/template" class="text-white w-100">
          <button type="button" class="btn btn-danger w-100 mt-3">
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
import {BaseCodingEnum} from "~/core/enum/BaseCoding.enum";
import {EmployerService} from "~/core/employer/employer-service";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {BasePage} from "~/core/base/base-page";
import {MakeResponse} from "~/composables/make-response";

const submitted = ref(false);
const formId = ref<number>();
const socialMedias = ref([]);
const route = useRoute();
const form = reactive({
  id: 0,
  networkTypeID: null,
  link: null,
  description: null,
  businessID: 0,
});
const rules = computed(() => {
  return {
    networkTypeID: {required},
    link: {required},
  }
});
let v$ = useVuelidate(rules, form);

const getCoding = () => {
  MakeResponse.makeServerResponse(CommonServices.GetTypeList([BaseCodingEnum.networkType]), true, result => {
    if (result) {
      socialMedias.value = result;
    }
  });
}

const getSocial = (id: number) => {
  MakeResponse.makeServerResponse(EmployerService.getSocial(id), true, result => {
    if (result.results) {
      form.description = result.results[0].description;
      form.id = result.results[0].id;
      form.networkTypeID = result.results[0].networkTypeID;
      form.link = result.results[0].link;
      form.businessID = result.results[0].entityID;
    }
  });
}

const onSetSocial = () => {
  submitted.value = true;
  form.businessID = BasePage.getBusinessId();
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(EmployerService.setSocial(form), true, result => {
      if (result.result) {
        const router = useRouter();
        router.push('/employer/template');
        ToastNotificationService.success('افزودن آدرس اینترنتی با موفقیت انجام شد.');
      } else {
        ToastNotificationService.error(result.serverErrors[0].hint);
      }
    });
  } else {
    ToastNotificationService.warn('فیلد های الزامی را تکمیل کنید.');
  }
}

onMounted(() => {
  getCoding();
  if (route.query && +route.query.id) {
    formId.value = +route.query.id;
    getSocial(formId.value);
  }
});
</script>

<style scoped>

</style>