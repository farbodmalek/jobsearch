<template>
  <Cvprogress/>
  <div class="container-fluid">
    <div class="col-12 px-1 bg-white mt- pb-2x ">
      <form @submit.prevent="sumbitForm()">
        <div class="form-group pt-2">
          <label class="col-4 text-center">خارجی</label>
          <RadioButton v-model="AddLanguageForm.languguageTypeId"
                       :class="{'p-invalid': v$.languguageTypeId.$invalid && submitted}"
                       :value="1"
                       name="Physical"
                       type="radio"
                       @click="EvidenceTabHandel(1)"
          />
          <label class="col-4 text-center">داخلی</label>
          <RadioButton v-model="AddLanguageForm.languguageTypeId"
                       :class="{'p-invalid': v$.languguageTypeId.$invalid && submitted}"
                       :value="2"
                       name="Physical"
                       type="radio"
                       @click="EvidenceTabHandel(2)"/>
        </div>
        <div v-if="AddLanguageForm.languguageTypeId==2">
          <div class="form-group">
            <label class="required">
              نام زبان داخلی
            </label>
            <Dropdown v-model="AddLanguageForm.languageId"
                      :class="{'p-invalid': v$.languageId.$invalid && submitted}"
                      :options="InternalLanguage"
                      class="w-100 bg-gray-3"
                      option-label="title"
                      option-value="id"
                      placeholder="نام زبان داخلی"
                      show-clear
                      type="text"
            />
          </div>
        </div>
        <div v-if="AddLanguageForm.languguageTypeId==1">
          <div class="form-group">
            <label class="required">
              نام زبان خارجی
            </label>
            <Dropdown v-model="AddLanguageForm.languageId"
                      :class="{'p-invalid': v$.languageId.$invalid && submitted}"
                      :options="LanguageList"
                      class="w-100 bg-gray-3"
                      option-label="title"
                      option-value="id"
                      placeholder="نام زبان خارجی"

                      show-clear
                      type="text"
            />
          </div>
          <div class="form-group">
            <label>
              نوع مدرک زبان
            </label>
            <input-text v-model="AddLanguageForm.certificateLanguage"
                        class="w-100 bg-gray-3"
                        placeholder="نوع مدرک زبان"
                        type="text"
            />
          </div>
          <div class="form-group">
            <label>
              نمره کسب شده
            </label>
            <input-text v-model="AddLanguageForm.degreeLanguage"
                        class="w-100 bg-gray-3"
                        placeholder="نمره کسب شده"
                        type="text"
            />
          </div>
        </div>
        <div class="form-group">
          <label>
            سطح مکالمه
          </label>
          <Dropdown v-model="AddLanguageForm.levelConversation"
                    :options="LevelList"
                    class="w-100 bg-gray-3"
                    option-label="title"
                    option-value="id"
                    placeholder="سطح مکالمه"
                    show-clear
                    type="text"
          />
        </div>
        <div class="form-group">
          <label>
            سطح خواندن
          </label>
          <Dropdown v-model="AddLanguageForm.levelReading"
                    :options="LevelList"
                    class="w-100 bg-gray-3"
                    option-label="title"
                    option-value="id"
                    placeholder="سطح خواندن"
                    show-clear
                    type="text"
          />
        </div>
        <div class="form-group">
          <label>
            سطح شنیدن
          </label>
          <Dropdown v-model="AddLanguageForm.levelListening"
                    :options="LevelList"
                    class="w-100 bg-gray-3"
                    option-label="title"
                    option-value="id"
                    placeholder="سطح شنیدن"
                    show-clear
                    type="text"
          />
        </div>
        <div class="form-group">
          <label>
            سطح خواندن
          </label>
          <Dropdown v-model="AddLanguageForm.levelWriting"
                    :options="LevelList"
                    class="w-100 bg-gray-3"
                    option-label="title"
                    option-value="id"
                    placeholder="سطح خواندن"
                    show-clear
                    type="text"
          />
        </div>
        <div class="form-group">
          <label>
            سطح ترجمه
          </label>
          <Dropdown v-model="AddLanguageForm.levelTranslate"
                    :options="LevelList"
                    class="w-100 bg-gray-3"
                    option-label="title"
                    option-value="id"
                    placeholder="سطح ترجمه"
                    show-clear
                    type="text"
          />
        </div>

        <div class="mt-2 d-flex justify-content-center mx-4 gap-3">
          <button class="btn p-2 btn-success fw-normal col-5">
            ثبت
          </button>
          <nuxt-link class="btn  btn-danger fw-normal col-5" @click="router.back()">
            انصراف
          </nuxt-link>
        </div>
      </form>
    </div>
  </div>

</template>


<script lang="ts" setup>
import Cvprogress from "~/components/jobSeeker/Cvprogress.vue"
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {CommonServices} from "~/core/common/common-services";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {BasePage} from "~/core/base/base-page";
import {MakeResponse} from "~/composables/make-response";

definePageMeta({
  name: "افزودن زبان "
});

const EvidenceStatus = ref(false)
const showSecondStep = ref(false);
const submitted = ref(false);
const LanguageList = ref()
const LevelList = ref()
const InternalLanguage = ref()
const UserData = ref([])
const router = useRoute();
const data = ref([])


const AddLanguageForm = ref({
  id: 0,
  nationalCode: null,
  languguageTypeId: null,
  languageId: null,
  certificateLanguage: null,
  degreeLanguage: null,
  levelConversation: null,
  levelWriting: null,
  levelListening: null,
  levelReading: null,
  levelTranslate: null,
})


const rules = computed(() => {
  return {
    id: '',
    nationalCode: '',
    languguageTypeId: {required},
    languageId: '',
    certificateLanguage: '',
    degreeLanguage: '',
    levelConversation: '',
    levelWriting: '',
    levelListening: '',
    levelReading: '',
    levelTranslate: '',
  }
})
let v$ = useVuelidate(rules, AddLanguageForm)
const EvidenceTabHandel = (status: number) => {
  EvidenceStatus.value = status
  if (status == 1 || 2) {
    const rules1 = computed(() => {
      return {
        id: '',
        nationalCode: '',
        languguageTypeId: {required},
        languageId: {required},
        certificateLanguage: '',
        degreeLanguage: '',
        levelConversation: '',
        levelWriting: '',
        levelListening: '',
        levelReading: '',
        levelTranslate: '',
      }
    })
    v$ = useVuelidate(rules1, AddLanguageForm)
  }
}

onMounted(() => {
  MakeResponse.makeServerResponse(CommonServices.GetTypeList([16, 13, 17],), true, result => {
    if (result) {
      LanguageList.value = result.filter((Id: any) => {
        return Id.parentID == 13
      })
      LevelList.value = result.filter((Id: any) => {
        return Id.parentID == 16
      })
      InternalLanguage.value = result.filter((Id: any) => {
        return Id.parentID == 17
      })
    }
  });

  MakeResponse.makeServerResponse(JobSeekerServices.GetForeignLanguage({nationalCode: BasePage.getLoggedUser().userName}), true, result => {
    if (result && router.query.id) {
      data.value = result.data.find((item: any) => item.id == router.query.id)
      PatchValue(data)
    }
  })
})

const PatchValue = (data: any) => {
  AddLanguageForm.value = {
    id: data.value.id,
    nationalCode: data.value.nationalCode,
    languguageTypeId: data.value.languguageTypeId,
    languageId: data.value.languageId,
    certificateLanguage: data.value.certificateLanguage,
    degreeLanguage: data.value.degreeLanguage,
    levelConversation: data.value.levelConversation,
    levelWriting: data.value.levelWriting,
    levelListening: data.value.levelListening,
    levelReading: data.value.levelReading,
    levelTranslate: data.value.levelTranslate,
  }
}

const sumbitForm = () => {
  submitted.value = true;
  if (!v$.value.$invalid) {
    showSecondStep.value = true;
    AddLanguageForm.value.id = router.query.id ? +router.query.id : 0;
    ;
    AddLanguageForm.value.nationalCode = BasePage.getLoggedUser().userName;
    MakeResponse.makeServerResponse(JobSeekerServices.SetForeignLanguage(AddLanguageForm.value), true, result => {
      if (result && result.result) {
        ToastNotificationService.success('فرم با موفقیت ثبت شد ');
        setTimeout(() => {
          const router = useRouter();
          router.back()
        }, 2500)
      }
    });
  } else {
    ToastNotificationService.warn('فیلد های الزامی را تکمیل کنید.')
  }
}


</script>
<style scoped>

</style>