<template>
  <div class="container-fluid">

  </div>
</template>

<script lang="ts" setup>
import {CommonServices} from "~/core/common/common-services";
import type {JobRequest} from "~~/core/models/jobSeeker/job-request";
import {MakeResponse} from "~/composables/make-response";

const jobRequestList = ref<JobRequest[]>([]);
const totalRows = ref<number>(0);
const counter = ref<number>(3);
const pageNumber = ref<number>(1);

const getRequests = () => {
  const body = {
    isPublic:true,
    pageNumber: pageNumber.value,
    take: counter.value
  }
  MakeResponse.makeServerResponse(CommonServices.searchJobRequest(body), true, result => {
    if (result.results) {
      jobRequestList.value = result.results.map((p: JobRequest) => {
        return {
          ...p,
          cooperationTypeList: p.cooperationTypeList.map((x: any) => {
            return x.title
          }).join(' ، '),
          provinceList: p.provinceList.map(r => r.title).join(' ، ') + ' - ' + p.cityList.map(z => z.title).join(' ، '),
          iscoTitle: p.iscoTitle ? p.iscoTitle : p.iscoDesc
        }
      });
      totalRows.value = result.totalRows;
      // jobRequestList.value.forEach((x, index) => onColumnActions(index));
    }
  });
}

const showMoreResult = () => {
  counter.value = counter.value + 10;
  getRequests();
}

onMounted(() => {
  getRequests();
});
</script>

<style scoped>

</style>