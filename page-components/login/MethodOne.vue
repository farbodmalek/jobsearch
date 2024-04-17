<template>
  <div>
    <form @submit.prevent="login()" class="mx-4 p-2" autocomplete="off">

      <div class="form-group mt-0">
        <!--        <IconField iconPosition="left">-->
        <!--          <InputIcon class="pi pi-user"></InputIcon>-->
        <InputText
            :class="{'p-invalid': v$.username.$invalid && submitted}"
            autocomplete="nope"
            class="w-100 bg-gray-3"
            type="text"
            placeholder="نام کاربری"
            v-model="loginForm.username"/>
        <!--        </IconField>-->
      </div>

      <div class="form-group">
        <label>رمز عبور</label>
        <Password
            v-model="loginForm.password"
            toggleMask
            placeholder="رمز عبور"
            class="col-12 bg-gray-3 mox"
            :feedback="false"
            :class="{'p-invalid': v$.password.$invalid && submitted}"/>
      </div>

      <div class="mt-2">
        <div class="row justify-content-between align-items-center mb-3">
          <div class="col-4">
            <p class="font-0-8 text-black-2 py-2">
              دریافت کد امنیتی
            </p>
          </div>
          <div class="col-2 bg-gray-3 text-center p-2 cursor-pointer rounded-2"
               @click.prevent="onGetCaptchaCode()">
            <i class="pi pi-refresh text-blue-3"></i>
          </div>
          <div class="col-6 d-flex justify-content-end">
            <img :src="captchaData.captchaCodeImage" alt="captcha" class="w-100"/>
          </div>

        </div>

        <span class="p-input-icon-left w-100">
<!--          <i class="pi pi-star-fill"></i>-->
          <InputText
              :class="{'p-invalid': v$.password.$invalid && submitted}"
              class="w-100 bg-gray-3"
              type="text"
              v-model="loginForm.captchaCode"
              placeholder="کد امنیتی"/>
        </span>

      </div>
      <div class="mt-3">
        <button class="btn btn-primary bg-blue-3 w-100 border-r-1-25 p-3">
          ورود به سامانه
        </button>
      </div>

      <div class="text-center mt-4">
        <p class="text-black-2">رمز عبور خود را فراموش کرده اید؟ ...</p>
      </div>
    </form>

    <DynamicDialog/>
  </div>
</template>


<script setup lang="ts">
import {required} from '@vuelidate/validators';
import {CommonServices} from "~/core/common/common-services";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {MakeResponse} from "~/composables/make-response";
import {useVuelidate} from "@vuelidate/core";
import {useDialog} from "primevue/usedialog";
import LoginOption from "./LoginOption.vue";


const captchaData = ref({
  captchaId: '',
  captchaCode: ''
});

const loginForm = reactive({
  username: '',
  password: '',
  captchaId: '',
  captchaCode: ''
});

const rules = computed(() => {
  return {
    username: {required},
    password: {required},
    captchaCode: {required},
  };
});

const dialog = useDialog();

const submitted = ref(false);
const v$ = useVuelidate(rules, loginForm);

const login = () => {
  submitted.value = true;
  loginForm.captchaId = captchaData.value.captchaId
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(CommonServices.login(loginForm), true, result => {
      if (result && result.result) {
        localStorage.setItem('user-data', JSON.stringify(result.data));
        if (result.data.types && result.data.types.length === 1) {
          loginOption(result.data);
        } else if (result.data.types && result.data.types.length > 1 && (result.data.types.includes(1) || result.data.types.includes(2))) {
          onOpenLoginModel(result.data);
        } else {
          ToastNotificationService.error('نام کاربری یا رمز ورود اشتباه است');
          onGetCaptchaCode();
        }
      } else {
        onGetCaptchaCode();
        ToastNotificationService.error("کد امنیتی اشتباه است");
      }
    });
  }
}

const loginOption = (result: any) => {
  if (result.types.includes(1)) {
    ToastNotificationService.success('ورود با موفقیت انجام شد');
    location.href = useRuntimeConfig().public.panel + 'jobSeeker/dashboard';
  } else if (result.types.includes(2)) {
    ToastNotificationService.success('ورود با موفقیت انجام شد');
    location.href = useRuntimeConfig().public.panel + 'employer/template';
  }
}

const onOpenLoginModel = (result: any) => {
  dialog.open(LoginOption, {
    props: {
      header: 'انتخاب پنل کاربری',
      modal: true,
      style: {
        width: '60%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    data: result,
  });
}

const onGetCaptchaCode = () => {
  MakeResponse.makeServerResponse(CommonServices.captchaCode(), true, result => {
    if (result.data) {
      captchaData.value = result.data;
    }
  });
}

onMounted(() => {
  onGetCaptchaCode();
});

</script>

<style scoped>


</style>