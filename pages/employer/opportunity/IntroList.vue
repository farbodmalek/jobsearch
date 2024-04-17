<template>
  <div>

  </div>
</template>

<script setup lang="ts">
import {EmployerService} from "~/core/employer/employer-service";
import {MakeResponse} from "~/composables/make-response";

const route = useRoute();
const opportunityId = ref<number>();


const getList = () => {
  const body = {
    pageNumber: 1,
    take: 200,
    jobOpportunityID: opportunityId.value
  }
  MakeResponse.makeServerResponse(EmployerService.introList(body), true, result => {

  });
}

onMounted(() => {
  opportunityId.value = +route.query.id;
  getList();
})
</script>

<style scoped>

</style>