<template>
  <div>
    <template v-for="(item, index) of placementList">
      <div :class="{'bg-gray-3': index % 2 === 0}" class="p-2">
        <p class="d-flex justify-content-between p-2">
          <span class="text-black-2">{{item.placementTitle}}</span>
          <span class="text-dark d-flex align-items-center">
            {{ item.phone }}
            <i class="pi pi-phone text-green-3"></i>
          </span>
        </p>
        <p>
          <i class="pi pi-map-marker text-orange-4 ms-1"></i>
          {{item.address || 'از سوی کاریابی اعلام نشده'}}
        </p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type {PlacementInfo} from "~~/core/models/common/placement-info";
import {CommonServices} from "~/core/common/common-services";
import {MakeResponse} from "~/composables/make-response";
const dialogRef = inject('dialogRef');
const params = ref();
const placementList = ref<PlacementInfo[]>([]);


const getPlacementList = () => {
  const body = {
    requestedJobOpportunityID: params.value?.mode === 'jobSeeker' ? params.value.data.id : null,
    jobOpportunityID: params.value?.mode === 'employer' ? params.value.data.id : null
  }
  MakeResponse.makeServerResponse(CommonServices.getPlacementList(body), true, result => {
    if (result.results) {
      placementList.value = result.results;
    }
  })
}

onMounted(() => {
  params.value = dialogRef.value.data;
  getPlacementList();
});
</script>

<style scoped>

</style>