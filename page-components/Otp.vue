<template>
  <div class="container-fluid mt-3">

    <div class="timer d-flex justify-content-center mb-3" id="timer" v-if="showCounter">
      {{ counter }}
    </div>

    <button v-if="!showCounter" type="button" class="btn btn-warning w-100 my-3 text-white" @click="onResendCode()">
      ارسال مجدد کد تائید
    </button>

    <div>
      <label>کد تائید</label>
      <div ref="container" class="d-flex justify-content-between flex-row-reverse">
        <input
            v-for="(n, index) in otpLength"
            :key="index"
            @keyup="(e) => handleEnter(e, n-1)"
            v-model="otpArray[n-1]" type="text"
            maxlength="1"
            class="otp py-1 col-2 text-center"/>
      </div>
    </div>

    <div class="mt-4">
      <button class="btn btn-success mt-4 w-100" type="button" @click="sendConfirmCode()">
        ثبت کد تائید
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {CommonServices} from "~/core/common/common-services";
import {MakeResponse} from "~/composables/make-response";
import {ToastNotificationService} from "~/core/toast-notification-service";

const otpProps = defineProps({
  otpLength: {
    type: Number,
    default: 5
  },
  form: {
    type: Object,
    default: null
  }
});
const otpArray = ref<any[]>([]);
const container = ref();
const counter = ref<string>('');
const showCounter = ref<boolean>(false);
const confirmCode = ref();


const handleEnter = (e: { key: any; }, i: number) => {
  const children = container.value.children;
  const keypressed = e.key;
  if (i > 0 && (keypressed === 'Backspace' || keypressed === 'Delete')) {
    otpArray.value[i] = null;
    setTimeout(() => {
      children[i - 1].focus();
    }, 10);
  } else {
    const matched = keypressed.match(/^[0-9]$/);
    if (!matched) {
      otpArray.value[i] = null;
      return;
    } else if (i < otpProps.otpLength - 1) {
      children[i + 1].focus();
    }
  }
  confirmCode.value = otpArray.value.join('');
}

const startCounter = (minutes: number, seconds: number) => {
  showCounter.value = true;
  if (showCounter.value)
    tick(minutes, seconds);
}

const tick = (minutes: number, seconds: number) => {
  counter.value = minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
  if (minutes === 0 && seconds === 0)
    showCounter.value = false;
  seconds--;
  if (seconds >= 0) {
    setTimeout(() => {
      tick(minutes, seconds);
    }, 1000);
  } else {
    if (minutes >= 1) {
      setTimeout(() => {
        startCounter(minutes - 1, 59);
      }, 1000);
    }
  }
}

const onResendCode = () => {
  const body = {
    nationalCode: otpProps.form.nationalCode,
    mobile: otpProps.form.mobile,
  }
  MakeResponse.makeServerResponse(CommonServices.reSendConfirmCode(body), true, result => {
    if (result.result) {
      startCounter(2, 0);
      ToastNotificationService.success('ارسال مجدد کد تائید با موفقیت انجام شد');
    } else {
      ToastNotificationService.error(result.serverErrors[0].hint);
    }
  });
}

const sendConfirmCode = () => {
  if (confirmCode.value && confirmCode.value.length === 5) {
    const code = {
      confirmationCode: confirmCode.value,
      nationalCode: otpProps.form.nationalCode
    }
    MakeResponse.makeServerResponse(CommonServices.setConfirmCode(code), true, result => {
      if (result.result) {
        const router = useRouter();
        router.push('authorization/login');
        ToastNotificationService.success('ثبت نام با موفقیت انجام شد');
      } else {
        ToastNotificationService.error(result.serverErrors[0].hint);
      }
    });
  } else {
    ToastNotificationService.error('کد تائید را وارد کنید');
  }
}

onMounted(() => {
  startCounter(2, 0);
});

</script>

<style lang="scss" scoped>
.otp {
  border: unset;
  border-bottom: 1px solid black;

  &:focus-visible {
    outline: none;
    border-bottom: 2px solid var(--green-1)
  }
}

.timer {

}
</style>
