<template>
  <Cvprogress/>
  <div class="col-12 px-1 bg-white mt- pb-2">
    <form @submit.prevent="(sumbitForm)">
      <div class="form-group pt-2">
        <label class="col-5 text-center">عنوان سایر مشاغل مورد علاقه </label>
        <input v-model="checked"
               name="skill"
               type="checkbox"/>
      </div>
      <div class="form-group">
        <label> نوع شغل مورد علاقه </label>
        <InputText v-model="FavoriteJobForm.jobFavoriteId"
                   class="w-100 bg-gray-3"
                   type="text"
                   :class="{'p-invalid': v$.jobFavoriteId.$invalid && submitted}"
        />
      </div>
      <div v-if="checked" class="form-group">
        <label>عنوان شغل مورد علاقه </label>
        <InputText v-model="FavoriteJobForm.jobFavoriteDesc"
                   class="w-100 bg-gray-3"
                   type="text"
                   :class="{'p-invalid': v$.jobFavoriteDesc.$invalid && submitted}"/>
      </div>
      <div class="form-group">
        <Dropdown v-model="FavoriteJobForm.priorityId"
                  :options="PriorityList"
                  :class="{'p-invalid': v$.priorityId.$invalid && submitted}"
                  class="w-full w-100 rem mb-3 "
                  option-label="title"
                  option-value="id"
                  placeholder="الویت "
                  show-clear/>
      </div>
      <div class="form-group">
        <label class="d-block">توضیحات </label>
        <Textarea v-model="FavoriteJobForm.description"
                  class="col-12"
                  cols="30" rows="5"
                  variant="filled"
                  :class="{'p-invalid': v$.description.$invalid && submitted}"
        />
      </div>
      <button>
        ذخیره
      </button>
    </form>
  </div>
</template>
<script lang="ts" setup>
import Cvprogress from "~/components/jobSeeker/Cvprogress.vue"
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {CommonServices} from "~/core/common/common-services";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";
import {MakeResponse} from "~/composables/make-response";

definePageMeta({
  name: "نمایش شغل مورد علاقه"
});

const checked = ref(false)
const showSecondStep = ref(false);
const submitted = ref(false);
const PriorityList = ref()
const UserData = ref([])
if (process.browser) {
  UserData.value = JSON.parse(<string>localStorage.getItem('user-data'));
}


const FavoriteJobForm = ref({
  id: [0],
   nationalCode: UserData.value.userName,
  jobFavoriteId: null,
  jobFavoriteDesc: null,
  priorityId: null,
  description: null
})


const rules = computed(() => {
  return {
    id: '',
    nationalCode: '',
    jobFavoriteId: {required},
    jobFavoriteDesc: '',
    priorityId: {required},
    description: {required}
  }
})
const v$ = useVuelidate(rules, FavoriteJobForm.value)


onMounted(() => {
  MakeResponse.makeServerResponse(CommonServices.GetTypeList([23],), true, result => {
    if (result) {
      PriorityList.value = result.filter((Id: any) => {
        return Id.parentID == 23
      })
    }
  });
})




const sumbitForm = () => {
  submitted.value = true;
  if (!v$.value.$invalid) {
    showSecondStep.value = true;
    MakeResponse.makeServerResponse(JobSeekerServices.GetFavoriteJob(FavoriteJobForm.value), true, result => {
      if (result && result.result) {
      }
    });
  }
}

</script>
<style scoped>

</style>