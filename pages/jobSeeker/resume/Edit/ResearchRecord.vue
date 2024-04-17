<template>
  <CvProgress/>
  <div class="container-fluid">
    <div class="col-12 px-1 bg-white mt- pb-2 ">
      <form @submit.prevent="SumbitForm()">
        <div class="form-group">
          <label class="required">عنوان ها </label>
          <InputText v-model="ResearchForm.titleResearch"
                     :class="{'p-invalid': v$.titleResearch.$invalid && submitted}"
                     class="w-100 bg-gray-3"
                     type="text"/>
        </div>
        <div class="form-group">
          <label>توضیحات </label>
          <InputText v-model="ResearchForm.description"
                     class="w-100 bg-gray-3"
                     type="text"/>
        </div>
        <div class="mt-2 d-flex justify-content-center mx-4 gap-3">
          <button class="btn p-2 btn-success fw-normal col-5">
            ثبت
          </button>
          <nuxt-link class="btn  btn-danger fw-normal col-5"

                     @click="router.back()">
            انصراف
          </nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import CvProgress from "~/components/jobSeeker/Cvprogress.vue"
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {BasePage} from "~/core/base/base-page";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {MakeResponse} from "~/composables/make-response";

definePageMeta({
  name: " سوابق پژوهشی"
});

const showSecondStep = ref(false);
const submitted = ref(false);
const UserData = ref<any>();
const data = ref([])
const router = useRoute();

const ResearchForm = ref({
  id: 0,
  nationalCode: '',
  titleResearch: '',
  description: ''
})


const rules = computed(() => {
  return {
    titleResearch: {required},
  }
})
const v$ = useVuelidate(rules, ResearchForm)


onMounted(() => {
  const userData = JSON.parse(<string>localStorage.getItem('user-data'));
  MakeResponse.makeServerResponse(JobSeekerServices.GetPersonResearch({nationalCode: BasePage.getLoggedUser().userName}), true, result => {
    if (result && router.query.id) {
      data.value = result.results.find((item: any) => item.id == router.query.id)
      PatchValue(data)
    }
  })
})

const PatchValue = (data: any) => {
  ResearchForm.value = {
    id: data.value.id,
    nationalCode: data.value.nationalCode,
    titleResearch: data.value.titleResearch,
    description: data.value.description
  }
}


const SumbitForm = () => {
  submitted.value = true;
  if (!v$.value.$invalid) {
    showSecondStep.value = true;
    ResearchForm.value.id = router.query.id ? +router.query.id : 0;
    ResearchForm.value.nationalCode = BasePage.getLoggedUser().userName;
    MakeResponse.makeServerResponse(JobSeekerServices.SetPersonResearch(ResearchForm.value), true, result => {
      if (result && result.result) {
        ToastNotificationService.success('فرم با موفقیت ثبت شد ');
        setTimeout(() => {
          const router = useRouter();
          router.back()
        }, 2500)
      }
    });
  } else {
    ToastNotificationService.warn('فیلد های الزامی را تکمیل کنید.');
  }
}



</script>
<style scoped>

</style>