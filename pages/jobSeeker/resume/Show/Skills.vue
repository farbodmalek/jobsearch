<template>
  <Cvprogress/>
  <div class="col-12 px-1 bg-white">

    <div v-if="!ExtraTab">
      <div class="col-12 px-1 bg-white mt-accordion">
        <div class="accordion-item col-12 border font-1-25 bg-blue-2 mb-3">
          <div class=" accordion-header d-flex justify-content-between my-1 mx-3 p-3"
               @click="toggleJobAccordion(1)">
            <span>اطلاعات مهارت</span>
            <img alt="logo"
                 src="/img/icon/chevron-down.svg"
                 width="17"/>
          </div>
          <div :class="{'active': activeAccordion}"
               class="accordion-content d-flex  justify-content-between flex-wrap bg-gray-5">
            <div class="d-flex col-12 p-3 justify-content-between align-items-center">
              <span>دارای گواهینامه: {{ UserExtraInfo.hasCertificateTitle }} </span>
              <img alt="logo"
                   src="/img/icon/pen.svg"
                   width="25"
                   @click="EditUserExtra()"/>
            </div>
            <div class="d-flex p-3 align-items-center">
              <span>نوع گواهینامه: </span>
              <div v-for="data in UserExtraInfo.otherCertificates">
                <span class="p-2">{{data.title}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="ExtraTab">
      <div class="col-12 px-1 bg-white mt-accordion">
        <div class="accordion-item col-12 border  -font-1-25 bg-blue-2 mb-3">

          <div class=" accordion-header d-flex justify-content-between my-1 mx-3 p-3"
               @click="toggleJobAccordion(1)">
            <span>ویرایش  مدرک</span>
            <img alt="logo"
                 src="/img/icon/chevron-down.svg"
                 width="17"/>
          </div>
          <div :class="{'active': activeAccordion}"
               class="accordion-content px-3 bg-gray-5">

            <div class="form-group  flex-column"
                 :class="{'p-invalid': v$.hasCertificate.$invalid && submitted}">
                <label class="required">آيا داراي گواهينامه رانندگي می باشيد؟</label>
                <div class="d-flex justify-content-center  gap-2">
                  <RadioButton v-model="ExteraForm.hasCertificate"  name="Certificate" :value=true />
                  <label for="ingredient1" class="">بله</label>
                  <RadioButton v-model="ExteraForm.hasCertificate"  name="Certificate" :value=false />
                  <label for="ingredient2" class="">خیر</label>
              </div>
            </div>

            <div v-if="ExteraForm.hasCertificate"
                 class="form-group">
              <label class="required">نوع گواهینامه</label>
              <MultiSelect v-model="ExteraForm.otherCertificateIdList"
                           :options="TypeList"
                           :class="{'p-invalid': v$.otherCertificateIdList.$invalid && submitted}"
                           option-label="title"
                           display="chip"
                           optionLabel="title"
                           optionValue="id"
                           placeholder="انتخاب کنید"
                           emptyMessage="داده ای برای نمایش وجود ندارد"
                           class="w-100" />
            </div>

            <div class=" form-group bg-gray-3 ">
              <label class=" p-2">عناوین مهارت هایی که علاقه مند به یادگیری یا معرفی به سازمان های فنی و حرفه ای هستید را انتخاب کنید
              </label>
              <AutoComplete
                  v-model="ExteraForm.favoriteSkillIdList"
                  :suggestions="skillItemFieldId"
                  class="col-12 "
                  dataKey="id"
                  field="title"
                  optionLabel="title"
                  @complete="searchJob($event.query)">
              </AutoComplete>
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
      </div>
    </div>
    <!----------->

    <div class="col-12 px-1 bg-white mt-accordion">
      <div class="accordion-item col-12 border  -font-1-25 bg-orange-2 mb-3">
        <div class="accordion-header d-flex justify-content-between my-1 mx-3 p-3"
             @click="toggleJobAccordion(2)">
          <span>مهارت های استعلامی از فنی و حرفه ای   </span>
          <img alt="logo"
               src="/img/icon/chevron-down.svg"
               width="17"/>
        </div>
        <div
            :class="{'active': activeAccordion2}"
            class="accordion-content d-flex align-items-center justify-content-between flex-wrap accordion-content  bg-gray-5">
          <div class="d-flex col-6 p-3">
            <span>نام موسسه:</span>

          </div>
          <div class="d-flex col-6 p-3">
            <span>شماره مدرک مهارتی:</span>
          </div>
          <div class="d-flex col-6 p-3">
            <span>تاریخ اخذ مدرک:</span>
            <span>نیکان </span>
          </div>
          <div class="d-flex col-6 p-3">
            <span>محل اخذ مدرک: </span>
          </div>
        </div>
      </div>
    </div>
    <!----------->
    <span>مهارت های اظهار شده </span>
    <div class="col-12 px-1 bg-white mt-accordion">
      <div v-for="(data, index) in UserData"
           :key="index"
           class="accordion-item col-12 border -font-1-25 bg-blue-6 mb-3 border-bottom-2">
        <div class="accordion-header d-flex justify-content-between my-1 mx-3 p-3"
             @click="toggleAccordion(index)">
          <span>{{ data.skillTitle }}</span>
          <img alt="logo"
               src="/img/icon/chevron-down.svg"
               width="17"/>
        </div>
        <div :class="{'active': data.active}"
             class="accordion-content d-flex align-items-center justify-content-between flex-wrap bg-gray-5">
          <div class="d-flex col-12 p-3 justify-content-between">

            <div class="d-flex col-6 p-3">
              <span>دارای مدرک:</span>
              <span>{{ data.hasCertificationTitle }} </span>
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
            <span>نوع موسسه:</span>
            <span>{{ data.organTypeTitle }}</span>
          </div>
          <div class="d-flex col-6 p-3">
            <span>شماره مدرک مهارتی:</span>
            <span>{{ data.degreeNumber }}</span>
          </div>
          <div class="d-flex col-6 p-3">
            <span>نام موسسه:</span>
            <span>{{ data.organTitle }}</span>
          </div>
          <div class="d-flex col-6 p-3">
            <span>تاریخ اخذ مدرک: </span>
            <span>{{ data.degreeDate }} </span>
          </div>
          <div class="d-flex col-6 p-3">
            <span>محل اخذ مدرک:  </span>
            <span>{{ data.locationDegreeTitle }} </span>
          </div>
        </div>
      </div>
    </div>
    <!----------->
  </div>

  <div
      class=" col-10 mt-4 d-flex justify-content-between bg-green-3 px-3 py-2 gap-3 rounded-3 m-auto align-items-center  ">
    <span class="">
      <nuxt-link class=" col-10 font-1 text-white text-center"
                 to="/jobSeeker/resume/edit/skillRecord">
        افزودن سابقه مهارتی
      </nuxt-link>
    </span>
    <img alt="logo"
         src="/img/icon/Group 621.svg"
         width="50"
         @click="EditButton()"/>
  </div>
</template>

<script lang="ts" setup>
import Cvprogress from "~/components/jobSeeker/Cvprogress.vue"
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {MakeResponse} from "~/composables/make-response";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {BasePage} from "~/core/base/base-page";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";
import {CommonServices} from "~/core/common/common-services";

definePageMeta({
  name: " نمایش سوابق مهارتی "
});

const UserData = ref([])
const UserExtraInfo = ref([])
const activeAccordion = ref(false)
const showSecondStep = ref(false);
const activeAccordion2 = ref(false)
const ExtraTab = ref()
const TypeList = ref()
const submitted = ref(false);
const router = useRouter();
let skillItemFieldId = ref();
const ExteraForm=ref({
  favoriteSkillIdList:null,
  hasCertificate:true,
  nationalCode:0,
  otherCertificateIdList:[]
})

const rules = computed(() => {
  return {
    hasCertificate: {required},
    otherCertificateIdList: {required},
  }
})

const v$ = useVuelidate(rules, ExteraForm)

onMounted(() => {
  Getskill()
  GetExtraInfo()

})

const toggleAccordion = (index: number) => {
  UserData.value[index].active = !UserData.value[index].active;
}

const toggleJobAccordion = (num: number) => {
  if (num === 1) {
    activeAccordion.value = !activeAccordion.value;
  } else if (num === 2) {
    activeAccordion2.value = !activeAccordion2.value;
  }
}

const GetTypeList = () => {
  MakeResponse.makeServerResponse(CommonServices.GetTypeList([32, 45]), true, result => {
    if (result) {
      TypeList.value = result
    }
  })
}

const searchJob = (item: string) => {
  const body = {
    keyword: item,
    pageSize: 20
  }
  MakeResponse.makeServerResponse(CommonServices.getIscoSkill(body), false, result => {
    if (result) {
      skillItemFieldId.value = result;
    }
  });
}



const Getskill = () => {
  MakeResponse.makeServerResponse(JobSeekerServices.GetSkill({nationalCode: BasePage.getLoggedUser().userName}), true, result => {
    if (result) {
      UserData.value = result.results
    }
  })
}

const GetExtraInfo = () => {
  MakeResponse.makeServerResponse(JobSeekerServices.GetExtraInfo({nationalCode: BasePage.getLoggedUser().userName}), true, result => {
    if (result) {
      UserExtraInfo.value = result
    }
  })
}



const EditButton = (data: any) => {
  router.push({path: "/jobSeeker/resume/edit/skillRecord", query: {id: data.id}});
}
const EditUserExtra = (data: any) => {
  ExtraTab.value=!ExtraTab.value
  GetTypeList()
}

const DeleteButton = (data: any) => {
  DeleteEduRec(data.id)
}

const DeleteEduRec = (data: number) => {
  MakeResponse.makeServerResponse(JobSeekerServices.DeleteSkill(data), true, result => {
    if (result && result.result == true) {
      ToastNotificationService.success('سابقه با موفقیت حذف شد ');
      Getskill()
    } else {
      ToastNotificationService.error('عملیات با خطا روبرو شد')
    }
  })
}

const SetExtraInfo = () => {
  if (!v$.value.$invalid) {
    showSecondStep.value = true;
    ExteraForm.value.nationalCode=BasePage.getLoggedUser().userName
    MakeResponse.makeServerResponse(JobSeekerServices.SetExtraInfo(ExteraForm.value), true, result => {
      if (result && result.result) {
        ToastNotificationService.success('فرم با موفقیت ثبت شد ');
        GetExtraInfo()
        ExtraTab.value=!ExtraTab.value
      }
    })
  }
  else {
    ToastNotificationService.warn('فیلد های الزامی را تکمیل کنید.');
  }


}
</script>
<style>

.accordion-content {
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  max-height: 0;
}

.accordion-content.active {
  max-height: 500px;
}

</style>