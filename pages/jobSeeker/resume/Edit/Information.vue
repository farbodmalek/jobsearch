<template>
  <CvProgress/>
  <div>
    <div class="info-title d-flex bg-gray-3  mb-3 mt-4 ">
      <div
          class=" col-8 d-flex align-items-start flex-column flex-wrap align-content-start justify-content-center p-2 py-1 px-4">
        <div class="d-flex col-12 gap-3 p-1">
          <span>نام و نام خانوادگی </span>
          <span> {{ UserData.fullPersonName }}</span>
        </div>
        <div class="d-flex col-12 gap-3 p-1">
          <span>کدملی </span>
          <span> {{ UserData.nationalCode }}</span>
        </div>
        <div class="d-flex col-12 gap-3 p-1">
          <span>نام پدر </span>
          <span> {{ UserData.fatherName }} </span>
        </div>
        <div class="d-flex col-12 gap-3 p-1">
          <span>تاریخ تولد </span>
          <span> {{ UserData.birthDate }}</span>
        </div>
        <div class="d-flex col-12 gap-3 p-1">
          <span>وضعیت تاهل </span>
          <span> {{ UserData.marriedTypeTitle }}</span>
        </div>
      </div>
      <div class="col-4 info-circle">
        <div class="p-3">
          <img alt="" src="/img/icon/Group 552.svg" />
        </div>
      </div>
    </div>
  </div>

  <div class="col-12 px-1  bg-white px-4">
    <form @submit.prevent="sumbitForm()">
      <div class="form-group d-flex p-3 bg-gray-3">
        <label class="col-5">جنسیت</label>
        <div class="d-flex col-7 justify-content-center gap-3 ">
          <label>آقا</label>
          <RadioButton v-model="UserDataForm.genderId"
                       :class="{'p-invalid': v$.genderId.$invalid && submitted}"
                       :value="3048"/>
          <label>خانم</label>
          <RadioButton v-model="UserDataForm.genderId"
                       :class="{'p-invalid': v$.genderId.$invalid && submitted}"
                       :value="3049"/>
        </div>
      </div>

      <div class="form-group d-flex px-3 align-items-center  bg-gray-3">
        <label class="col-5">دین</label>
        <Dropdown v-model="UserDataForm.religionId"
                  :options="Religion"
                  class="col-7 text-center m-2"
                  option-label="title"
                  option-value="id"/>
      </div>

      <div class="form-group d-flex px-3 align-items-center  bg-gray-3">
        <label class="col-5">وضعیت تاهل</label>
        <Dropdown v-model="UserDataForm.marriedTypeId"
                  :options="Marital "
                  class="text-center col-7 rem m-2"
                  option-label="title"
                  option-value="id"

        />
      </div>

      <div class="form-group d-flex gap-3">
        <div class="d-flex ">
          <label class="d-flex col-2  align-items-center">وزن</label>
          <InputText v-model="UserDataForm.weight"
                     :class="{'p-invalid':
                     v$.weight.$invalid && submitted}"
                     class="col-10 bg-gray-3 "
                     placeholder="کیلوگرم"
                     type="text"/>
        </div>
        <div class="d-flex">
          <label class="d-flex col-2   align-items-center">قد</label>
          <InputText v-model="UserDataForm.height"
                     class="col-10 bg-gray-3"
                     placeholder="سانتی متر"
                     type="text"/>
        </div>
      </div>

      <div class="form-group d-flex px-3 align-items-center  bg-gray-3">
        <label class="col-5">وضعیت فعلی</label>
        <Dropdown v-model="UserDataForm.activityStatus"
                  :options="status"
                  class="text-center col-7 rem m-2"
                  option-label="title"
                  option-value="id"/>
      </div>

      <div class="form-group d-flex p-3 bg-gray-3">
        <label class="col-5"> وضعیت جسمانی</label>
        <div class="d-flex col-7 justify-content-center gap-3 ">
          <label class=" text-center">کم توان </label>
          <RadioButton v-model="UserDataForm.isDisabilities"
                       :class="{'p-invalid': v$.isDisabilities.$invalid && submitted}"
                       :value="true"
                       name="Physical"
                       type="radio"
                       @click="PhysicalTabHandel(true)"
          />
          <label class=" text-center">سالم </label>
          <RadioButton v-model="UserDataForm.isDisabilities"
                       :class="{'p-invalid': v$.isDisabilities.$invalid && submitted}"
                       :value="false"
                       name="Physical"
                       type="radio"
                       @click="PhysicalTabHandel(false)"/>
        </div>
      </div>

      <div v-if="UserDataForm.isDisabilities"
           class="form-group">
        <div class="d-flex p-3 bg-gray-3 justify-content-between">
          <label>نوع کم توانی </label>
          <Dropdown v-model="UserDataForm.physicalConditionId"
                    :options="Weakness"
                    class="text-center col-7"
                    option-label="title"
                    option-value="id"/>
        </div>
        <div class="d-flex p-3 bg-gray-3 justify-content-between">
          <label>درصد معلولیت </label>
          <InputText v-model="UserDataForm.disabilityPercentageId"
                     :class="{'p-invalid': v$.disabilityPercentageId.$invalid && submitted}"
                     class="col-7 bg-gray-3"
                     type="text"/>
        </div>
      </div>

      <div class="form-group d-flex p-3 bg-gray-3">
        <label class="col-5">وضعیت ایثارگری</label>
        <div class="d-flex col-7 justify-content-center gap-3 ">
          <label class=" text-center">دارد</label>
          <RadioButton v-model="UserDataForm.isSacrificed"
                       :class="{'p-invalid': v$.isSacrificed.$invalid && submitted}"
                       :value="true"
                       name="acrifice"
                       type="radio"/>
          <label class=" text-center">ندارد</label>
          <RadioButton v-model="UserDataForm.isSacrificed"
                       :class="{'p-invalid': v$.isSacrificed.$invalid && submitted}"
                       :value="false"
                       name="acrifice"
                       type="radio"
                       @click="SacrificeTabHandel(false)"/>
        </div>
      </div>

      <div v-if="UserDataForm.isSacrificed"
           class="form-group d-flex p-3 align-items-center   bg-gray-3">
        <label class="col-5">نوع ایثارگری</label>
        <Dropdown v-model="UserDataForm.sacrificeStateId"
                  :options="Sacrifice"
                  class="text-center col-7 "
                  option-label="title"
                  option-value="id"/>
      </div>

      <div class="mt-2 mb-2">
        <button class="btn btn-success fw-normal w-100">
          ثبت درخواست
        </button>
        <nuxt-link class="btn btn-danger fw-normal w-100 mt-2"  @click="router.back()" >
          انصراف
        </nuxt-link>
      </div>


    </form>
  </div>

</template>
<script lang="ts" setup>
import CvProgress from "~/components/jobSeeker/Cvprogress.vue"
import {CommonServices} from "~/core/common/common-services";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {BasePage} from "~/core/base/base-page";
import {MakeResponse} from "~/composables/make-response";

definePageMeta({
  name: "اطلاعات فردی "
});
const router = useRouter();
const showSecondStep = ref(false);
const submitted = ref(false);
const PhysicalTab = ref(false);
const SacrificeTab = ref(false)
const Religion = ref([]);
const Marital = ref([]);
const status = ref([]);
const Sacrifice = ref([]);
const Weakness = ref([]);
const UserData = ref([])
const UserDataForm = ref({
  id: 0,
  nationalCode: null,
  genderId: null,
  religionId: null,
  marriedTypeId: null,
  height: null,
  weight: null,
  mobile: null,
  isConscription: null,
  exemptionTypeId: null,
  isSacrificed: null,
  sacrificeStateId: null,
  isDisabilities: null,
  physicalConditionId: null,
  disabilityPercentageId: null,
  activityStatus: null
});

const rules = computed(() => {
  return {
    id: 0,
    nationalCode: '',
    genderId: {required},
    religionId: '',
    marriedTypeId: {required},
    height: '',
    weight: '',
    mobile: '',
    isConscription: '',
    exemptionTypeId: '',
    isSacrificed: {required},
    sacrificeStateId: '',
    isDisabilities: {required},
    physicalConditionId: '',
    disabilityPercentageId: '',
    activityStatus: ''

  }
});

const PhysicalTabHandel = (status: any) => {
  PhysicalTab.value = status;
  if (status == true) {
    const rules2 = computed(() => {
      return {
        genderId: {required},
        isSacrificed: {required},
        marriedTypeId: {required},
        physicalConditionId: {required},
        disabilityPercentageId: {required},
        id: '',
        nationalCode: '',
        religionId: '',
        height: '',
        weight: '',
        mobile: '',
        isConscription: '',
        exemptionTypeId: '',
        sacrificeStateId: '',
        isDisabilities: '',
        activityStatus: ''
      }
    });
    v$ = useVuelidate(rules2, UserDataForm);
  } else if (status == false) {
    const rules2 = computed(() => {
      return {
        genderId: {required},
        marriedTypeId: {required},
        isSacrificed: {required},
        physicalConditionId: {required},
        disabilityPercentageId: {required},
        id: '',
        nationalCode: '',
        religionId: '',
        height: '',
        weight: '',
        mobile: '',
        isConscription: '',
        exemptionTypeId: '',
        sacrificeStateId: '',
        isDisabilities: '',
        activityStatus: ''
      }
    });
    v$ = useVuelidate(rules2, UserDataForm);
  }
}

const SacrificeTabHandel = (status: any) => {
  SacrificeTab.value = status;
};

let v$ = useVuelidate(rules, UserDataForm);

onMounted(() => {
  MakeResponse.makeServerResponse(CommonServices.GetTypeList([12, 11, 18, 19, 20, 21, 36]), true, result => {
    if (result) {
      Religion.value = result.filter((Id: any) => Id.parentID == 19);
      Marital.value = result.filter((Id: any) => Id.parentID == 20);
      status.value = result.filter((Id: any) => Id.parentID == 36);
      Sacrifice.value = result.filter((Id: any) => Id.parentID == 12);
      Weakness.value = result.filter((Id: any) => Id.parentID == 11);
    }
  });
  MakeResponse.makeServerResponse(JobSeekerServices.JobSeekerGet({nationalCode: BasePage.getLoggedUser().userName}), true, result => {
    if (result && result.result) {
      PatchValue(result.data)
    }
  });

  MakeResponse.makeServerResponse(JobSeekerServices.getPersonResume({nationalCode: BasePage.getLoggedUser().userName}), true, result => {
    if (result && result.result) {
      UserData.value = result.data.jobSeeker
    }
  })
})


const PatchValue = (data: any) => {
  UserDataForm.value = {
    genderId: data.genderId,
    mobile: data.mobile,
    isSacrificed: data.isSacrificed,
    activityStatus: data.activityStatus,
    weight: data.weight,
    height: data.height,
    isDisabilities: data.isDisabilities,
    marriedTypeId: data.marriedTypeId,
    religionId: data.religionId,
    isConscription: data.isConscription,
    exemptionTypeId: data.exemptionTypeId,
    sacrificeStateId: data.sacrificeStateId,
    physicalConditionId: data.physicalConditionId,
    disabilityPercentageId: data.disabilityPercentageId,
  }
}

const sumbitForm = () => {
  submitted.value = true;
  if (!v$.value.$invalid) {
    showSecondStep.value = true;
    UserDataForm.value.id = router.currentRoute.value.query.id ? +router.currentRoute.value.query.id : 0;
    UserDataForm.value.nationalCode = BasePage.getLoggedUser().userName;
    MakeResponse.makeServerResponse(JobSeekerServices.SetJobSeekerInfo(UserDataForm.value), true, result => {
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


const routerHanel= ()=>{
  const router = useRouter();
  router.back()
}
</script>
<style>

</style>