<template>
  <Cvprogress/>
  <div class="container-fluid">
    <div class="col-12 px-1 bg-white mt- ">
      <form @submit.prevent="sumbitForm()">
        <div class="form-group">
          <label class="required">مقطع تحصیلی</label>
          <Dropdown v-model="EducationForm.eduLevelId"
                    :class="{'p-invalid': v$.eduLevelId.$invalid && submitted}"
                    :options="EducationLevel"
                    class="w-100"
                    option-label="title"
                    option-value="id"
                    show-clear
                    @change="HandelEduField(EducationForm.eduLevelId)"/>
        </div>
        <div v-if="EducationForm.eduLevelId!=13">
          <div v-if="EducationForm.eduLevelId===1"
               class="form-group">
            <label class="required">نوع دیپلم</label>
            <Dropdown v-model="EducationForm.educationFieldId"
                      :class="{'p-invalid': v$.educationFieldId.$invalid && submitted}"
                      :options="SchoolGrades"
                      class="w-100"
                      option-label="title"
                      option-value="id"
                      show-clear/>
          </div>
          <div v-if="[5096,5097].includes(EducationForm.educationFieldId)"
               class="form-group">
            <label>نوع رشته </label>
            <InputText v-model="EducationForm.fieldTitle"
                       class="w-100 bg-gray-3"
                       type="text"/>
          </div>
          <div v-if="[17, 18, 19, 20].includes(EducationForm.eduLevelId)">
            <div class="form-group">
              <label class="required">رشته تحصیلی</label>
              <AutoComplete
                  v-model="educationFieldId"
                  :class="{'p-invalid': v$.educationFieldId.$invalid && submitted}"
                  :suggestions="EducationLevelFilter"
                  class="w-100"
                  dataKey="id"
                  field="title"
                  optionLabel="title"
                  @complete="search"
                  @item-select="onSelectEduField($event.value)">
              </AutoComplete>
            </div>
          </div>
          <div class="form-group">
            <label>نام محل تحصیل</label>
            <input-text v-model="EducationForm.universityTitle"
                        :options="OrganTypeID"
                        class="w-100"
                        option-label="title"
                        option-value="id"
                        pal
                        show-clear/>
          </div>
          <div v-if="[17, 18, 19, 20,25].includes(EducationForm.eduLevelId)"
               class="form-group">
            <label class="required">مکان جغرافیایی </label>
            <Dropdown v-model="EducationForm.locationGeographyId"
                      :class="{'p-invalid': v$.locationGeographyId.$invalid && submitted}"
                      :options="PlaceAcquisition"
                      class="w-full w-100 rem mb-3 "
                      option-label="title"
                      option-value="id"
                      show-clear
            />
          </div>
          <div v-if="EducationForm.locationGeographyId === 3060"
               class="form-group">
            <label class="required">کشور </label>
            <Dropdown v-model="EducationForm.countryId"
                      :class="{'p-invalid': v$.countryId.$invalid && submitted}"
                      :options="CountryList"
                      class="w-full w-100 rem mb-3 "
                      option-label="title"
                      option-value="id"
                      show-clear/>
          </div>
          <div v-if="EducationForm.locationGeographyId === 3059" class="form-group">
            <label class="required">نوع محل تحصیل</label>
            <Dropdown v-model="EducationForm.eduLocationTypeId"
                      :class="{'p-invalid': v$.eduLocationTypeId.$invalid && submitted}"
                      :options="UniList"
                      class="w-100"
                      option-label="title"
                      option-value="id"
                      show-clear/>
          </div>
          <div class="form-group">
            <label>معدل </label>
            <InputText v-model="EducationForm.average"
                       class="w-100 bg-gray-3"
                       type="text"/>
          </div>

          <div class=" form-group ">
            <label>تاریخ شروع </label>
          </div>
          <div class="d-flex align-items-center py-2 mt-2 border-r-1-5">
            <div class="w-100 me-1">
              <InputText
                  class="custom-input w-100 bg-gray-3"
                  placeholder=""
                  type="text"
              />
              <date-picker
                  v-model="EducationForm.revocationEduDate"
                  custom-input=".custom-input"
                  display-format="jYYYY-jMM-jDD"
                  format="YYYY-MM-DD"
              />
            </div>
          </div>

          <div v-if="!EducationForm.isStudying"
               class="form-group">
            <div class="">
              <label>تاریخ پایان </label>
            </div>
            <div class="d-flex align-items-center py-2 mt-2 border-r-1-5">
              <div class="w-100 me-1">
                <InputText
                    class="custom-input1 w-100 bg-gray-3"
                    placeholder=""
                    type="text"
                />
                <date-picker
                    v-model="EducationForm.expireEduDate"
                    custom-input=".custom-input1"
                    display-format="jYYYY-jMM-jDD"
                    format="YYYY-MM-DD"
                />
              </div>
            </div>
          </div>

          <div class="form-group pt-2">
            <label class="col-3 text-center">مشغول به تحصیل </label>
            <input v-model="EducationForm.isStudying"
                   type="checkbox"/>
          </div>
        </div>

        <div class="mt-2">
          <button class="btn btn-success fw-normal w-100">
            ثبت
          </button>
          <nuxt-link class="btn btn-danger fw-normal w-100 mt-2"
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
import {CommonServices} from "~/core/common/common-services";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {BasePage} from "~/core/base/base-page";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {MakeResponse} from "~/composables/make-response";
import DatePicker from 'vue3-persian-datetime-picker';

definePageMeta({
  name: "افزودن سوابق تحصیلی "
});

const selectedJob = ref();
const showSecondStep = ref(false);
const submitted = ref(false);
const PlaceAcquisition = ref()
const UniList = ref()
const OrganTypeID = ref([]);
const router = useRouter();
const data = ref([])
const CountryList = ref()
const EducationLevel = ref()
const EducationLevelFilter = ref()
const UserData = ref([])
let eduItems: any[] = [];
let SchoolGrades = ref();
let educationFieldId = ref();

const EducationForm = ref({
  id: 0,
  nationalCode: null,
  countryId: null,
  fieldTitle: null,
  eduLevelId: null,
  educationFieldId: null,
  eduLocationTypeId: null,
  universityTitle: null,
  locationGeographyId: null,
  revocationEduDate: null,
  isStudying: true,
  expireEduDate: null,
  average: null,
})

const rules = computed(() => {
  return {
    id: '',
    nationalCode: '',
    countryId: '',
    fieldTitle: '',
    eduLevelId: {required},
    educationFieldId: '',
    eduLocationTypeId: '',
    universityTitle: '',
    locationGeographyId: '',
    revocationEduDate: '',
    isStudying: '',
    expireEduDate: '',
    average: '',
  }
})
let v$ = useVuelidate(rules, EducationForm)

const HandelEduField = (data: any) => {
  GetEduField(data)
  validateEduField(data)
}

onMounted(() => {
  UserData.value = BasePage.getLoggedUser();
  MakeResponse.makeServerResponse(CommonServices.GetTypeList([22, 10]), true, result => {
    if (result) {
      UniList.value = result.filter((Id: any) => Id.parentID == 10);
      PlaceAcquisition.value = result.filter((Id: any) => Id.parentID == 22);
    }
  });
  GetCountryList()
  GetEducationLevel()
  GetEductionRecord()
});

const GetCountryList = () => {
  MakeResponse.makeServerResponse(CommonServices.getCityProvince({"typeID": 0, "ids": []}), true, result => {
    if (result) {
      CountryList.value = result
    }
  });
}

const GetEducationLevel = () => {
  MakeResponse.makeServerResponse(CommonServices.GetLevelList(), true, result => {
    if (result) {
      EducationLevel.value = result
    }
  });
}

const GetEduField = (data: any) => {
  MakeResponse.makeServerResponse(CommonServices.GetEduField({levelID: data}), false, result => {
    if (result) {
      eduItems = result;
      if (data === 1) {
        SchoolGrades.value = result;
      }
    }
  });
}

const GetEductionRecord = () => {
  MakeResponse.makeServerResponse(JobSeekerServices.GetEducation({nationalCode: BasePage.getLoggedUser().userName}), true, result => {
    const router = useRoute();
    if (result && router.query.id) {
      data.value = result.results.find((item: any) => item.id == router.query.id)
      PatchValue(data)
    }
  });
}


const validateEduField = (data: any) => {
  if ([17, 18, 19, 20, 25].includes(data)) {
    const rules1 = computed(() => {
      return {
        id: '',
        nationalCode: '',
        countryId: EducationForm.value.locationGeographyId == 3060 ? {required} : '',
        fieldTitle: '',
        eduLevelId: {required},
        educationFieldId: {required},
        eduLocationTypeId: EducationForm.value.locationGeographyId == 3059 ? {required} : '',
        universityTitle: '',
        locationGeographyId: {required},
        revocationEduDate: '',
        isStudying: '',
        expireEduDate: '',
        average: '',
      }
    })
    v$ = useVuelidate(rules1, EducationForm)
  } else if (data === 1) {
    const rules2 = computed(() => {
      return {
        id: '',
        nationalCode: '',
        countryId: '',
        fieldTitle: '',
        eduLevelId: {required},
        educationFieldId: {required},
        eduLocationTypeId: '',
        universityTitle: '',
        locationGeographyId: '',
        revocationEduDate: '',
        isStudying: '',
        expireEduDate: '',
        average: '',
      }
    })
    v$ = useVuelidate(rules2, EducationForm)
  }
}


const search = (event: any) => {
  let query = event.query;
  EducationLevelFilter.value = eduItems.filter(p => p.title.includes(query));
}

const onSelectEduField = (event: any) => {
  if (event && event.id) {
    EducationForm.value.educationFieldId = event.id;
  }
}



const PatchValue = (data: any) => {
  HandelEduField(data.value.eduLevelId)
  EducationForm.value = {
    id: data.value.id,
    nationalCode: data.value.nationalCode,
    countryId: data.value.countryId,
    fieldTitle: data.value.fieldTitle,
    eduLevelId: data.value.eduLevelId,
    educationFieldId: data.value.educationFieldId,
    eduLocationTypeId: data.value.eduLocationTypeId,
    universityTitle: data.value.universityTitle,
    locationGeographyId: data.value.locationGeographyId,
    revocationEduDate: data.value.revocationEduDate,
    isStudying: data.value.isStudying,
    expireEduDate: data.value.expireEduDate,
    average: data.value.average,
  }
  educationFieldId.value = data.value.educationFieldTitle;
}


const sumbitForm = () => {
  submitted.value = true;
  if (!v$.value.$invalid) {
    showSecondStep.value = true;
    EducationForm.value.id = router.currentRoute.value.query.id ? +router.currentRoute.value.query.id : 0;
    EducationForm.value.nationalCode = BasePage.getLoggedUser().userName;
    MakeResponse.makeServerResponse(JobSeekerServices.SetEducation(EducationForm.value), true, result => {
      if (result && result.result) {
        ToastNotificationService.success('فرم با موفقیت ثبت شد ');
        setTimeout(() => {
          router.back()
        }, 2500)
      }
    });
  }
}


</script>
<style>


</style>