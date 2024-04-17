<template>
  <div class="p-2">
    <div class="text-center font-1">مشخصات فرصت شغلی</div>
    <div class="bg-gray-3 border-r-1 p-2" v-if="jobOpportunityDetail">

      <div class="d-flex justify-content-between">
        <span>عنوان شغل</span>
        <span class="font-0-91 text-black-1">
          {{ jobOpportunityDetail.iscoTitle ? jobOpportunityDetail.iscoTitle : jobOpportunityDetail.jobTitle }}
        </span>
      </div>

      <div class="d-flex justify-content-between mt-2">
        <span>استان/شهرستان</span>
        <span class="font-0-91 text-black-1">
          {{ jobOpportunityDetail.countryDivision?.Master?.Value }}-{{ jobOpportunityDetail.countryDivision?.title }}
        </span>
      </div>

      <div class="d-flex justify-content-between mt-2">
        <span>مهارت مورد نیاز</span>
        <span class="font-0-91 text-black-1">
          {{ jobOpportunityDetail.otherSkill || 'از سوی کارفرما اعلام نشده' }}
        </span>
      </div>

      <div class="d-flex justify-content-between mt-2">
        <span>نوع همکاری</span>
        <span class="font-0-91 text-black-1">
          {{ jobOpportunityDetail.cooperativeTypeTitle || 'از سوی کارفرما اعلام نشده' }}
        </span>
      </div>

      <div class="d-flex justify-content-between mt-2">
        <span>نوع دستمزد</span>
        <span class="font-0-91 text-black-1">
          {{ jobOpportunityDetail.salaryTypeTitle || 'از سوی کارفرما اعلام نشده' }}
        </span>
      </div>

      <div class="d-flex justify-content-between mt-2" v-if="jobOpportunityDetail.salaryType === 3081">
        <span>میزان حقوق ماهیانه</span>
        <span class="font-0-91 text-black-1">
          {{ jobOpportunityDetail.salaryTitle || 'از سوی کارفرما اعلام نشده' }}
        </span>
      </div>

      <div class="d-flex justify-content-between mt-2">
        <span>وضعیت نظام وظیفه</span>
        <span class="font-0-91 text-black-1" v-if="jobOpportunityDetail.extraInfo?.allEmployees > 0">
          {{ jobOpportunityDetail.soldiershipTypeTitle || 'از سوی کارفرما اعلام نشده' }}
        </span>
      </div>

      <div class="d-flex justify-content-between mt-2">
        <span>مزایای رفاهی</span>
        <span class="font-0-91 text-black-1">
          {{ jobOpportunityDetail.benefits || 'از سوی کارفرما اعلام نشده' }}
        </span>
      </div>

      <div class="d-flex justify-content-between mt-2" v-if="jobOpportunityDetail.description">
        <span>شرح موقعیت شغلی</span>
        <span class="font-0-91 text-black-1">
          {{ jobOpportunityDetail.description }}
        </span>
      </div>

    </div>

    <div class="text-center font-1 mt-3">مشخصات نیروی کار مورد نیاز</div>
    <div class="bg-gray-3 border-r-1 p-2" v-if="jobOpportunityDetail">

      <div class="d-flex justify-content-between">
        <span>جنسیت</span>
        <span class="font-0-91 text-black-1" v-if="jobOpportunityDetail?.extraInfo?.maleEmployees">مرد</span>
        <span class="font-0-91 text-black-1" v-if="jobOpportunityDetail?.extraInfo?.femaleEmployees">زن</span>
        <span class="font-0-91 text-black-1"
              v-if="!jobOpportunityDetail.extraInfo?.femaleEmployees && !jobOpportunityDetail.extraInfo?.maleEmployees">
          فرقی نمی کند
        </span>
      </div>

      <div class="d-flex justify-content-between mt-2">
        <span>مقطع تحصیلی</span>
        <span class="font-0-91 text-black-1">
          {{ jobOpportunityDetail.extraInfo?.educationLevelTitle }}
        </span>
      </div>

      <div class="d-flex justify-content-between mt-2">
        <span>رشته تحصیلی</span>
        <span class="font-0-91 text-black-1">
          {{ jobOpportunityDetail.extraInfo?.educationFieldTitle }}
        </span>
      </div>

      <div class="d-flex justify-content-between mt-2">
        <span>محدوده سنی</span>
        <span class="font-0-91 text-black-1">
          {{ jobOpportunityDetail.extraInfo?.maxAge + jobOpportunityDetail.extraInfo?.minAge || 'بدون محدودیت'}}
        </span>
      </div>

      <div class="d-flex justify-content-between mt-2">
        <span>وضعیت تاهل</span>
        <span class="font-0-91 text-black-1">
          {{ jobOpportunityDetail.extraInfo?.maritalStatusTitle}}
        </span>
      </div>

      <div class="d-flex justify-content-between mt-2">
        <span>وضعیت جسمانی</span>
        <span class="font-0-91 text-black-1">
          {{ jobOpportunityDetail.extraInfo?.physicalConditionTitle}}
        </span>
      </div>

      <div class="d-flex justify-content-between mt-2" v-if="jobOpportunityDetail.extraInfo?.minWorkExperience">
        <span>حداقل سابقه کار</span>
        <span class="font-0-91 text-black-1">
          {{ jobOpportunityDetail.extraInfo?.minWorkExperience}}
        </span>
      </div>

      <div class="d-flex justify-content-between mt-2" v-if="jobOpportunityDetail.extraInfo?.otherInfoeDesc">
        <span>سایر ویژگی ها</span>
        <span class="font-0-91 text-black-1">
          {{ jobOpportunityDetail.extraInfo?.otherInfoeDesc}}
        </span>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {CommonServices} from "~/core/common/common-services";
import type {JobOpportunityModelDto} from "~~/core/models/common/opportunity-detail";
import StaticData from "~/core/enum/static-data";
import {MakeResponse} from "~/composables/make-response";



const jobOpportunityDetail = ref<JobOpportunityModelDto>();
const dialogRef = inject('dialogRef');
const params = ref();

const getOpportunityDetail = () => {
  MakeResponse.makeServerResponse(CommonServices.JobOpportunityDetailById(params.value.jobOpportunityID), true, result => {
    if (result.result) {
      jobOpportunityDetail.value = result.data;
      jobOpportunityDetail.value.benefits = result.data.benefits?.join(' ,');
      if (jobOpportunityDetail.value.skills.length > 0)
        jobOpportunityDetail.value.languages = jobOpportunityDetail.value?.languages ? jobOpportunityDetail.value.languages.map(p => {
          return {
            ...p,
            levelConversationTitle: StaticData.LanguageLevel.find(d => p.levelConversation === d.id).title,
            levelListeningTitle: StaticData.LanguageLevel.find(d => p.levelListening === d.id).title,
            levelReadingTitle: StaticData.LanguageLevel.find(d => p.levelReading === d.id).title,
            levelWritingTitle: StaticData.LanguageLevel.find(d => p.levelWriting === d.id).title,
            levelTranslateTitle: StaticData.LanguageLevel.find(d => p.levelTranslate === d.id).title,
            degreeLanguageTitle: p.languageTypeId === 3008 ? 'انگلیسی'
                : p.languageTypeId === 3010 ? 'فرانسوی'
                    : p.languageTypeId === 3009 ? 'آلمانی'
                        : p.languageTypeId === 3011 ? 'ترکی استانبولی'
                            : p.languageTypeId === 3012 ? 'کره ای'
                                : p.languageTypeId === 3013 ? 'ژاپنی'
                                    : p.languageTypeId === 4177 ? 'عربی'
                                        : p.languageTypeId === 4178 ? 'چینی' : 'سایر',
          }
        }) : [];
      jobOpportunityDetail.value.soldiershipTypeTitle = jobOpportunityDetail.value?.soldiershipTitle ? jobOpportunityDetail.value.soldiershipTitle.map(p => p).join(', ') : null;
    }
  });
}

onMounted(() => {
  params.value = dialogRef.value.data;
  getOpportunityDetail();
})
</script>

<style scoped>

</style>