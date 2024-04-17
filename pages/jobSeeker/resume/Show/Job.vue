<template>
  <!--  <Cvprogress/>-->
  <div class="container-fluid mt-5">
    <!--اطلاعات اولیه -->
    <div v-if="!ExtraTab">
      <div class="col-12 px-1 bg-white mt-accordion">
        <div class="accordion-item col-12 border font-1-25 bg-blue-2 mb-3">
          <div class=" accordion-header d-flex justify-content-between my-1 mx-3 p-3"
               @click="toggleJobAccordion(1)">
            <span>اطلاعات اولیه شغلی</span>
            <img alt="logo"
                 src="/img/icon/chevron-down.svg"
                 width="17"/>
          </div>
          <div v-if="UserExtraInfoJob"
               :class="{'active': activeAccordion}"
               class="accordion-content d-flex  justify-content-between flex-wrap bg-gray-5">
            <div class="d-flex col-12 px-3 py-3 justify-content-between align-items-center">
              <span>دارای سابقه بیمه اشتغال:{{ UserExtraInfoJob.employmentHistoryDesc }}  </span>
              <img alt="logo"
                   src="/img/icon/pen.svg"
                   width="25"
                   @click="EditUserExtra()"/>
            </div>
            <div class="d-flex col-12 px-3 py-3 justify-content-between align-items-center">
              <span>استفاده از مقرری بيمه بيكاری:{{ UserExtraInfoJob.isLetterIntroductionDesc }}  </span>
            </div>
            <div class="d-flex col-12 px-3 py-3 justify-content-between align-items-center">
              <span>دارای سابقه بیمه اشتغال:{{ UserExtraInfoJob.isUnemploymentInsuranceDesc }}  </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-item col-12 border font-1-25 bg-blue-2 mb-3"
         v-if="ExtraTab">
          <div class=" accordion-header  d-flex justify-content-between my-1 mx-3 p-3"
               @click="toggleJobAccordion(1)">
            <span>اطلاعات شغلی</span>
            <img alt="logo"
                 src="/img/icon/chevron-down.svg"
                 width="17"/>
          </div>
          <div class="accordion-content bg-gray-5" :class="{'active': activeAccordion}">
            <div class="form-group ">
              <span>آیا دارای سابقه بیمه اشتغال هستید؟  </span>
              <div class="d-flex justify-content-center  gap-2">
                <RadioButton v-model="ExteraForm.employmentHistory" :value=true name="Certificate"/>
                <label class="" for="ingredient1">بله</label>
                <RadioButton v-model="ExteraForm.employmentHistory" :value=false name="Certificate"/>
                <label class="" for="ingredient2">خیر</label>
              </div>
            </div>
            <div class="form-group"
                 v-if="ExteraForm.employmentHistory">
              <label class="required">سازمان بيمه گر</label>
              <MultiSelect v-model="ExteraForm.insuranceOrganizationId"
                           :options="TypeList"
                           class="w-100 "
                           display="chip"
                           emptyMessage="داده ای برای نمایش وجود ندارد"
                           option-label="title"
                           optionLabel="title"
                           optionValue="id"
                           placeholder="انتخاب کنید"/>
            </div>
            <div class="form-group"
                 v-if="ExteraForm.employmentHistory">
              <label class="required">مجموع سوابق بیمه(ماه)</label>
            <input-text class="col-12"
                        v-model="ExteraForm.insuranceYear">
            </input-text>
          </div>
            <div class="form-group ">
              <span>آيا در حال حاضر از مقرری بيمه بيكاري استفاده می‌کنید؟(این مورد برای ثبت در پرونده است و در رزومه قرار نمی‌گیرد)  </span>
              <div class="d-flex justify-content-center  gap-2">
                <RadioButton v-model="ExteraForm.isLetterIntroduction" :value=true name="isLetterIntroduction"/>
                <label class="" for="ingredient1">بله</label>
                <RadioButton v-model="ExteraForm.isLetterIntroduction" :value=false name="isLetterIntroduction"/>
                <label class="" for="ingredient2">خیر</label>
              </div>
            </div>
            <div class="form-group">
              <span>آيا داراي معرفی نامه جهت اشتغال به کار از يکي نهادهاي مطرح شده هستيد؟(این مورد برای ثبت در پرونده است و در رزومه قرار نمی‌گیرد)</span>
              <div class="d-flex justify-content-center  gap-2">
                <RadioButton v-model="ExteraForm.isUnemploymentInsurance" :value=true name="isUnemploymentInsurance"/>
                <label class="" for="ingredient1">بله</label>
                <RadioButton v-model="ExteraForm.isUnemploymentInsurance" :value=false name="isUnemploymentInsurance"/>
                <label class="" for="ingredient2">خیر</label>
              </div>
            </div>
            <div class="form-group ">
              <label class="required">نهاد صادر کننده معرفی نامه</label>
              <div class="d-flex justify-content-center gap-2 flex-wrap">
                <RadioButton v-model="ExteraForm.organizationLetter" :value=3085 name="organizationLetter"/>
                <label class="" for="ingredient1">دفتر رهبري</label>
                <RadioButton v-model="ExteraForm.organizationLetter" :value=3086 name="organizationLetter"/>
                <label class="" for="ingredient2">نهادرياست جمهوري</label>
                <RadioButton v-model="ExteraForm.organizationLetter" :value=3087 name="organizationLetter"/>
                <label class="" for="ingredient2">مجلس</label>
                <RadioButton v-model="ExteraForm.organizationLetter" :value=3088 name="organizationLetter"/>
                <label class="" for="ingredient2">استانداري</label>
                <RadioButton v-model="ExteraForm.organizationLetter" :value=3089 name="organizationLetter"/>
                <label class="" for="ingredient2">امام جمعه</label>
                <RadioButton v-model="ExteraForm.organizationLetter" :value=30890 name="organizationLetter"/>
                <label class="" for="ingredient2">ساير</label>
              </div>
            </div>
            <div class="form-group mb-2">
              <input-text class="col-12"
                        v-model="ExteraForm.otherLetter">
              </input-text>
            </div>
            <div class="m-3">
              <button @click='SetExtraInfo()' class="btn btn-success fw-normal w-100" type="button">
                ثبت درخواست
              </button>
              <nuxt-link @click='EditUserExtra()' class="btn btn-danger fw-normal w-100 mt-2">
                انصراف
              </nuxt-link>
            </div>
          </div>
    </div>
    <!----------->
    <span class="text-center col-12">سوابق شغلی اخذ شده از نظام اطلاعات بازار کار  </span>
    <div class="col-12 px-1 bg-white mt-accordion">
      <div class="accordion-item col-12 border  -font-1-25 bg-orange-2 mb-3">
        <div class="accordion-header d-flex justify-content-between my-1 mx-3 p-3"
             @click="toggleJobAccordion(2)">
          <span>{{  }}کارشناسی ارشد تصویر سازی</span>
          <img alt="logo"
               src="/img/icon/chevron-down.svg"
               width="17"
               @click="EditButton()"/>

        </div>
        <div :class="{'active': activeAccordion2}" class="accordion-content bg-gray-5">
          <div class="d-flex  justify-content-end p-3">
            <img alt="logo"
                 src="/img/icon/chevron-down.svg"
                 width="25"
                 @click="EditButton()"/>
          </div>
          <div class="d-flex  justify-content-between p-3">
            <span>نوع موسسه/سازمان : </span>

          </div>
          <div class="d-flex justify-content-between p-3">
            <span>میزان حقوق</span>

          </div>
          <div class="d-flex justify-content-between p-3">
            <span>تاریخ پایان</span>

          </div>
          <div class="d-flex justify-content-between p-3">
            <span>تاریخ شروع</span>
          </div>
          <div class="d-flex justify-content-between p-3">
            <span>نام موسسه/سازمان : </span>
            <span>نیکان </span>
          </div>
          <div class="d-flex justify-content-between p-3">
            <span>نوع همکاری : </span>
          </div>
        </div>
      </div>
    </div>
    <!----------->
    <span>سوابق شغلی اظهار شده </span>
    <div class="col-12 px-1 bg-white mt-accordion">
      <div v-for="(data, index) in UserData"
           :key="index"
           class="accordion-item col-12 border -font-1-25 bg-blue-6 mb-3 border-bottom-2 ">
        <div class="accordion-header d-flex justify-content-between my-1 mx-3 p-3"
             @click="toggleAccordion(index)">
          <span>{{ data.iscoTitle ? data.iscoTitle : data.otherJobTitle }}</span>
          <img alt="logo"
               src="/img/icon/chevron-down.svg"
               width="17"/>
        </div>
        <div :class="{'active': data.active}"
             class="accordion-content  bg-gray-5">
          <div class="d-flex col-12 p-3 justify-content-between">
            <div>
              <span>نوع موسسه/سازمان : </span>
              <span>{{ data.organTypeTitle }} </span>
            </div>
            <div class="d-flex gap-3">
              <img alt="logo"
                   src="/img/icon/delete.svg"
                   width="25"
                   @click="DeleteButton(data)"
              /> <img alt="logo"
                      src="/img/icon/pen.svg"
                      width="25"
                      @click="EditButton(data)"
            />
            </div>
          </div>
          <div class="d-flex col-6 p-3">
            <span>میزان حقوق :</span>
            <span>{{ data.salaryVal }}</span>
          </div>
          <div class="d-flex col-6 p-3">
            <span>تاریخ پایان :</span>
            <span>{{ data.endDateForm }}</span>
          </div>
          <div class="d-flex col-6 p-3">
            <span>تاریخ شروع :</span>
            <span>{{ data.startDateForm }}</span>
          </div>
          <div class="d-flex col-6 p-3">
            <span>نام موسسه/سازمان : </span>
            <span>نیکان </span>
          </div>
          <div class="d-flex col-6 p-3">
            <span>نوع همکاری : </span>
            <span>{{ data.cooperativeTypeTitle }} </span>
          </div>
        </div>
      </div>
    </div>
    <!----------->
  </div>

  <div
      class=" col-10 mt-4 d-flex justify-content-between bg-green-3 px-3 py-2 gap-3 rounded-3 m-auto align-items-center  ">
    <span class="">
      <nuxt-link class=" col-10 font-1 text-white text-center "
                 to="/jobSeeker/resume/edit/JobRecord">
        افزودن سابقه شغلی
      </nuxt-link>
    </span>
    <img alt="logo"
         src="/img/icon/Group 621.svg"
         width="50"
         @click="EditButton()"/>
  </div>
</template>

<script lang="ts" setup>
import {CommonServices} from "~/core/common/common-services";
import {MakeResponse} from "~/composables/make-response";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {BasePage} from "~/core/base/base-page";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";

definePageMeta({
  name: " نمایش سوابق شغلی "
});

const UserData = ref([])
const UserExtraInfoJob = ref([])
const router = useRouter();
const ExtraTab = ref()
const TypeList = ref()
const showSecondStep = ref(false);
const activeAccordion = ref(false)
const activeAccordion2 = ref(false)
const ExteraForm = ref({
  id: 0,
  nationalCode: 0,
  employmentHistory: true,
  insuranceOrganizationId: [],
  insuranceYear: null,
  otherInsurance: null,
  isUnemploymentInsurance: null,
  isLetterIntroduction: null,
  organizationLetter: 0,
  otherLetter: null
})

const rules = computed(() => {
  return {
    organizationLetter: {required},
    otherCertificateIdList: {required},
  }
})

const v$ = useVuelidate(rules, ExteraForm.value)


onMounted(() => {
  GetJob()
  GetExtraInfoJob()


})

const GetJob = () => {
  MakeResponse.makeServerResponse(JobSeekerServices.GetJob({nationalCode: BasePage.getLoggedUser().userName}), true, result => {
    if (result) {
      UserData.value = result.results
    }
  })
}
const GetExtraInfoJob = () => {
  MakeResponse.makeServerResponse(JobSeekerServices.GetExtraInfoJob({nationalCode: BasePage.getLoggedUser().userName}), true, result => {
    if (result) {
      UserExtraInfoJob.value = result.data
    }
  })
}


const PatchValue = (data: any) => {
  ExteraForm.value={
    id: UserExtraInfoJob.value.id,
    nationalCode: UserExtraInfoJob.value.nationalCode,
    employmentHistory: UserExtraInfoJob.value.employmentHistory,
    insuranceOrganizationId: UserExtraInfoJob.value.insuranceOrganizationId,
    insuranceYear: UserExtraInfoJob.value.insuranceYear,
    otherInsurance: UserExtraInfoJob.value.otherInsurance,
    isUnemploymentInsurance: UserExtraInfoJob.value.insuranceYear,
    isLetterIntroduction: UserExtraInfoJob.value.isLetterIntroduction,
    organizationLetter: UserExtraInfoJob.value.organizationLetter,
    otherLetter: UserExtraInfoJob.value.otherLetter}
}

const EditUserExtra = (data: any) => {
  ExtraTab.value = !ExtraTab.value
  GetTypeList()
  PatchValue(data)
}


const toggleJobAccordion = (num: number) => {
  if (num === 1) {
    activeAccordion.value = !activeAccordion.value;
  } else if (num === 2) {
    activeAccordion2.value = !activeAccordion2.value;
  }
}

const toggleAccordion = (index: number) => {
  UserData.value[index].active = !UserData.value[index].active;
}

const GetTypeList = () => {
  MakeResponse.makeServerResponse(CommonServices.GetTypeList([14]), true, result => {
    if (result) {
      TypeList.value = result
    }
  })
}


const EditButton = (data: any) => {
  router.push({path: "/jobSeeker/resume/edit/JobRecord", query: {id: data.id}});
}

const SetExtraInfo = () => {
    showSecondStep.value = true;
    ExteraForm.value.nationalCode=BasePage.getLoggedUser().userName
    MakeResponse.makeServerResponse(JobSeekerServices.SetExtraInfoJob(ExteraForm.value), true, result => {
      if (result && result.result) {
        ToastNotificationService.success('فرم با موفقیت ثبت شد ');
        ExtraTab.value=!ExtraTab.value
      }
    })





const DeleteButton = (data: any) => {
  DeletejobRec(data.id)
}

const DeletejobRec = (data: number) => {
  MakeResponse.makeServerResponse(JobSeekerServices.DeleteJobRecorde(data), true, result => {
    if (result && result.result == true) {
      ToastNotificationService.success('سابقه با موفقیت حذف شد ');
      GetJob()
    } else {
      ToastNotificationService.error('عملیات با خطا روبرو شد')
    }
  })
}}

</script>
<style>

.accordion-content {
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  max-height: 0;
}

.accordion-content.active {
  max-height: 760px;
}

</style>