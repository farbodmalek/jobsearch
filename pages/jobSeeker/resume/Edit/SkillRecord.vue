<template>
  <Cvprogress/>
  <div class="container-fluid">
    <div class="col-12 p bg-white">
      <form @submit.prevent="sumbitForm()">
        <div class="form-group pt-2">
          <label class="col-3 text-center">مدرک دارم</label>
          <input v-model="JobSkillForm.hasCertification"
                 name="skill"
                 type="checkbox"
                 @change="setRules(JobSkillForm.hasCertification)"/>
        </div>

        <div class="form-group" v-if="JobSkillForm.isOtherSkill">
          <label class="required"> عنوان مهارت </label>
          <AutoComplete v-model="SkillFieldId"
                        :class="{'p-invalid': SkillFieldId==null && submitted}"
                        :suggestions="filteredSkill"
                        class="w-100"
                        dataKey="id"
                        field="title"
                        optionLabel="title"
                        value="id"
                        @complete="searchSkill($event.query)"
          />
        </div>

        <div class=" form-group   "
             v-if="!JobSkillForm.isOtherSkill" >
          <label class="required">
            مهارت  مورد نظر را وارد کنید
          </label>
          <InputText v-model="JobSkillForm.otherSkillTitle"
                     :class="{'p-invalid': v$.organTitle.$invalid && submitted}"
                     class="w-100 bg-white"
                     type="text"/>
        </div>
        <div class=" d-flex  pt-2 flex-column  px-5 bg-gray-3 justify-content-center  gap-3 ">
          <span class="text-blue-3 text-center">در صورت نبودن مهارت مورد نظر در فیلد مهارت  می توانید با انتخاب این گزینه عنوان مهارت مورد نظر را تایپ کنید</span>
          <div class="d-flex justify-content-center">
            <label class="col-5 text-center">سایر مهارت ها</label>
            <input v-model="JobSkillForm.isOtherSkill"
                   type="checkbox"/>
          </div>
        </div>


        <div class="form-group">
          <label>سطح مهارت </label>
          <Dropdown v-model="JobSkillForm.skillLevelId"
                    :options="LevelList"
                    class="w-100 "
                    option-label="title"
                    option-value="id"
                    show-clear
          />
        </div>
        <div class="form-group">
          <label> مدت دوره (ساعت ) </label>
          <InputText v-model="JobSkillForm.learningDuration"
                     class="w-100 bg-gray-3"
                     type="text"
          />
        </div>
        <div v-if="JobSkillForm.hasCertification">
          <div class="form-group">
            <label>نوع موسسه * </label>
            <Dropdown v-model="JobSkillForm.organTypeId"
                      :class="{'p-invalid': v$.organTypeId.$invalid && submitted}"
                      :options="InstitutionList"
                      class="w-full w-100 rem mb-3 "
                      option-label="title"
                      option-value="id"
                      placeholder="نوع موسسه "
            />
          </div>
          <div class="form-group">
            <label class="required">نام موسسه </label>
            <InputText v-model="JobSkillForm.organTitle"
                       :class="{'p-invalid': v$.organTitle.$invalid && submitted}"
                       class="w-100 bg-gray-3"
                       type="text"
            />
          </div>
          <div class="form-group">
            <label class="required">شماره مدرک مهارتی </label>
            <InputText v-model="JobSkillForm.degreeNumber"
                       :class="{'p-invalid': v$.degreeNumber.$invalid && submitted}"
                       class="w-100 bg-gray-3"
                       type="text"
            />
          </div>
          <div class="form-group">
            <label class="required">محل اخذ مدرک </label>
            <Dropdown v-model="JobSkillForm.locationDegreeId"
                      :class="{'p-invalid': v$.locationDegreeId.$invalid && submitted }"
                      :options="PlaceAcquisition"
                      class="w-full w-100 rem mb-3 "
                      option-label="title"
                      option-value="id"
                      show-clear
                      @change="setRules"
            />
          </div>
          <div v-if="JobSkillForm.locationDegreeId === 3060" class="form-group">
            <label class="required">کشور </label>
            <Dropdown v-model="JobSkillForm.countryId"
                      :class="{'p-invalid': v$.countryId.$invalid && submitted && JobSkillForm.locationDegreeId === 3060}"
                      :options="CountryList"
                      class="w-full w-100 rem mb-3 "
                      option-label="title"
                      option-value="id"
                      show-clear
            />
          </div>
          <div class=" form-group ">
            <label class="required">تاریخ اخذ مدارک مهارتی </label>
          </div>
          <div class="d-flex align-items-center py-2 mt-2 border-r-1-5">
            <div class="w-100 me-1">
              <InputText
                  :class="{'p-invalid': v$.degreeDate.$invalid && submitted}"
                  class="custom-input w-100 bg-gray-3"
                  placeholder=""
                  type="text"
              />
              <date-picker
                  v-model="JobSkillForm.degreeDate"
                  custom-input=".custom-input"
                  display-format="jYYYY-jMM-jDD"
                  format="YYYY-MM-DD"
              />
            </div>
          </div>
        </div>

        <div v-else>
          <div class="form-group">
            <label class="required">نحوه یادگیری</label>
            <Dropdown v-model="JobSkillForm.howLearningId"
                      :class="{'p-invalid': v$.howLearningId.$invalid && submitted}"
                      :options="LearningList"
                      class="w-full w-100 rem mb-3"
                      option-label="title"
                      option-value="id"
                      show-clear/>
          </div>
        </div>
        <div class="form-group">
          <label class="d-block">توضیحات </label>
          <Textarea v-model="JobSkillForm.description"
                    class="col-12"
                    cols="30"
                    rows="5"
                    variant="filled"/>
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
import Cvprogress from "~/components/jobSeeker/Cvprogress.vue"
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {CommonServices} from "~/core/common/common-services";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {BasePage} from "~/core/base/base-page";
import {ToastNotificationService} from "~/core/toast-notification-service";
import type {CodingDto} from "~~/core/models/common/coding-dto";
import {MakeResponse} from "~/composables/make-response";
import DatePicker from 'vue3-persian-datetime-picker';

definePageMeta({
  name: "افزودن مهارت "
});
const showSecondStep = ref(false);
const submitted = ref(false);
const LearningList = ref()
const LevelList = ref()
const PlaceAcquisition = ref()
const CountryList = ref()
const InstitutionList = ref()
const UserData = ref();
const router = useRoute();
const data = ref([])

let SkillFieldId = ref();
const filteredSkill = ref<CodingDto[]>([]);
const JobSkillForm = ref({
  id: 0,
  nationalCode: null,
  skillId: null,
  howLearningId: null,
  otherSkillTitle: null,
  isOtherSkill: null,
  skillLevelId: null,
  hasCertification: false,
  organTypeId: null,
  organTitle: null,
  degreeNumber: null,
  degreeDate: null,
  locationDegreeId: null,
  countryId: null,
  description: null,
  learningDuration: null,
});

const rules = computed(() => {
  return {
    id: '',
    nationalCode: '',
    otherSkillTitle: '',
    isOtherSkill: '',
    skillLevelId: '',
    hasCertification: '',
    organTypeId: '',
    organTitle: '',
    degreeNumber: '',
    degreeDate: '',
    locationDegreeId: '',
    countryId: '',
    description: '',
    learningDuration: '',
    howLearningId: {required},
  }
});
let v$ = useVuelidate(rules, JobSkillForm);

const setRules = (event: any) => {
  if (event == true) {
    const rules2 = computed(() => {
      return {
        id: '',
        nationalCode: '',
        otherSkillTitle: '',
        isOtherSkill: '',
        skillLevelId: '',
        hasCertification: '',
        organTypeId: {required},
        organTitle: {required},
        degreeNumber: {required},
        degreeDate: {required},
        locationDegreeId: {required},
        countryId: '',
        description: '',
        learningDuration: '',
        howLearningId: '',
      }
    });
    v$ = useVuelidate(rules2, JobSkillForm);
  } else if (event == true || event.value == 3060) {
    const rules2 = computed(() => {
      return {
        id: '',
        nationalCode: '',
        otherSkillTitle: '',
        isOtherSkill: '',
        skillLevelId: '',
        hasCertification: '',
        organTypeId: {required},
        organTitle: {required},
        degreeNumber: {required},
        degreeDate: {required},
        locationDegreeId: {required},
        countryId: {required},
        description: '',
        learningDuration: '',
        howLearningId: '',
      }
    });
    v$ = useVuelidate(rules2, JobSkillForm);
  }
}

onMounted(() => {
  UserData.value = BasePage.getLoggedUser();
  MakeResponse.makeServerResponse(CommonServices.GetTypeList([22, 26, 27, 31]), true, result => {
    if (result) {
      LevelList.value = result.filter((Id: any) => Id.parentID == 26);
      LearningList.value = result.filter((Id: any) => Id.parentID == 31);
      PlaceAcquisition.value = result.filter((Id: any) => Id.parentID == 22);
      InstitutionList.value = result.filter((Id: any) => Id.parentID == 27);
      GetCityList()
    }
  });

  MakeResponse.makeServerResponse(JobSeekerServices.GetSkill({nationalCode: BasePage.getLoggedUser().userName}), true, result => {
    if (result && router.query.id) {
      data.value = result.results.find((item: any) => item.id == router.query.id)
      PatchValue(data)
    }
  });
});

const searchSkill = (item: string) => {
  const body = {
    keyWords: item
  }
  MakeResponse.makeServerResponse(CommonServices.GetSkill(body), false, result => {
    if (result) {
      filteredSkill.value = result;
    }
  });
}

const GetCityList = () => {
  MakeResponse.makeServerResponse(CommonServices.getCityProvince({"typeID": 0, "ids": []}), true, result => {
    if (result) {
      CountryList.value = result
    }
    });
  }

const PatchValue = (data: any) => {
  JobSkillForm.value = {
    id: data.value.id,
    nationalCode: data.value.nationalCode,
    skillId: data.value.skillId,
    howLearningId: data.value.howLearningId,
    otherSkillTitle: data.value.otherSkillTitle,
    isOtherSkill: data.value.isOtherSkill,
    skillLevelId: data.value.skillLevelId,
    hasCertification: data.value.hasCertification,
    organTypeId: data.value.organTypeId,
    organTitle: data.value.organTitle,
    degreeNumber: data.value.degreeNumber,
    degreeDate: data.value.degreeDate,
    locationDegreeId: data.value.locationDegreeId,
    countryId: data.value.countryId,
    description: data.value.description,
    learningDuration: data.value.learningDuration,
  }
  SkillFieldId.value = data.value.skillTitle
}


const sumbitForm = () => {
  submitted.value = true;
  if (!v$.value.$invalid) {
    showSecondStep.value = true;
    JobSkillForm.value.id = router.query.id ? +router.query.id : 0;
    JobSkillForm.value.nationalCode = BasePage.getLoggedUser().userName;
    JobSkillForm.value.skillId = SkillFieldId.value.id
    MakeResponse.makeServerResponse(JobSeekerServices.SetSkill(JobSkillForm.value), true, result => {
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
<style>

</style>