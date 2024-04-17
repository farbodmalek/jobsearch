<template>
<div class="p-3">
  <div class="row p-2">
    <template v-for="(res, index) of results" :key="index">
      <div class="col-12 mb-2" v-if="res.employerID">
        <div class="mb-2">
          کارفرما {{ res.employerTitle }}
        </div>
        <span class="font-0-8">نتیجه از سمت کارفرما: </span>
        <span class="font-0-9 me-2" :class="{'text-green-2':res.resultType === 1 ,
                'text-red-2':res.resultType === 2 || res.resultType === 3 }">
          {{
            res.resultType === 1 ? 'تائید شده' : res.resultType === 2 ? 'رد شده'
                : (res.resultType === 3 || res.resultType === 4) ? 'انصراف کارفرما' : ''
          }}
        </span>
        <div class="font-size-0-9 mt-2">
          <span class="font-0-8">توضیحات: </span>
          <span class="font-0-9 me-2 ">
          {{ res.description }}
        </span>
        </div>
      </div>

      <hr v-if="res.employerID"/>

      <div class="col-12" v-if="res.jobSeekerID">
        <div class="mb-2">
          کارجو {{ res.personFullName }}
        </div>
        <span class="font-0-8">نتیجه از سمت کارجو: </span>
        <span class="font-0-9 me-2"
              :class="{'text-green-2':res.resultType === 1 ,
                'text-red-2':res.resultType === 2 || res.resultType === 3 }">
              {{
            res.resultType === 1 ? 'تائید شده'
                : res.resultType === 2 ? 'رد شده' : res.resultType === 3 ? 'انصراف کارجو' : '---'
          }}
          </span>
        <div class="mt-2">
          <span class="font-0-8">توضیحات: </span>
          <span v-if="res.jobSeekerID" class="font-0-9 me-2 ">
              {{ res.description }}
            </span>
        </div>
      </div>
    </template>
  </div>

  <div class="text-center font-size-1 text-red" v-if="results.length === 0">
    {{ nullResult }}
  </div>
</div>
</template>

<script setup lang="ts">
import type {InterviewResult} from "~~/core/models/common/interview-result";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {MakeResponse} from "~/composables/make-response";


const results = ref<InterviewResult[]>([])
const params = ref();
const nullResult = ref<string>();
const dialogRef = inject('dialogRef');


const getResult = () => {
  const body = {
    pageNumber: 1,
    take: 2,
    // jobSeekerID: params.value.mode === 'jobSeeker' ? params.value?.data.jobSeekerID : null,
    // employerID: params.value.mode === 'employer' ? params.value?.data.employerID : null,
    jobOpportunityResumeID: params.value?.data.referenceResumeID,
    letterID: params.value?.data.id,
  }
  MakeResponse.makeServerResponse(JobSeekerServices.jobOfferedLetterResult(body), true, result => {
    if (result.results) {
      results.value = result.results;
      if (result.results.length === 0)
        nullResult.value = 'نتیجه ای وجود ندارد.';
    }
  });
}
onMounted(() => {
  params.value = dialogRef.value.data;
  getResult();
});
</script>

<style scoped>

</style>