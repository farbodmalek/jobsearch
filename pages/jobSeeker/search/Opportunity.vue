<template>
  <div class="mt-2 mx-4">

    <button class="btn my-2 w-100"
            :class="{'btn-success': !showSearch, 'btn-danger': showSearch}"
            @click="showSearch = !showSearch">
      {{ !showSearch ? 'نمایش فیلتر' : 'بستن فیلتر' }}
    </button>

    <template v-if="showSearch">
      <div>
        <div class="form-group">
          <label>جستجو</label>
          <InputText
              class="w-100"
              v-model="search.searchText"/>
        </div>

        <div class="form-group">
          <label class="required">دستمزد</label>
          <Dropdown
              show-clear
              v-model="search.salaryType"
              :options="salaryTypeList"
              optionLabel="title"
              optionValue="id"
              placeholder="انتخاب کنید"
              empty="داده ای برای نمایش وجود ندارد"
              class="w-100"/>
        </div>

        <div class="form-group">
          <label>نوع همکاری</label>
          <MultiSelect
              :maxSelectedLabels="3"
              display="chip"
              v-model="search.cooperativeTypeId"
              :options="cooperationTypeList"
              class="w-100"
              option-label="title"
              placeholder="نوع همکاری"
              option-value="id"
              show-clear/>
        </div>

        <div class="form-group">
          <label>استان</label>
          <Dropdown
              @change="getCity($event.value)"
              show-clear
              option-label="title"
              option-value="id"
              :options="provinceList"
              v-model="search.provinceID"
              class="w-100"/>
        </div>

        <div class="form-group">
          <label>شهرستان</label>
          <Dropdown
              show-clear
              option-label="title"
              option-value="id"
              :options="cityList"
              v-model="search.cityId"
              class="w-100"/>
        </div>

        <div class="form-group">
          <label>
            <Checkbox :value="3" v-model="search.statusID"/>
            انتشار عمومی
          </label>
        </div>

        <button class="btn btn-success w-100" @click="getRequestedJobs(counter)">
          فیلتر
        </button>

      </div>
    </template>

    <template v-for="(item , index) of jobOpportunityList" :key="index">
      <div class="bg-gray-3 mt-2 p-3 border-r-0-75">

        <div class="position-relative">
          <p class="d-flex justify-content-between">
              <span class="text-blue-3 font-1 cursor-pointer" @click="showDetail(item)">
                <i class="pi pi-cog me-1"></i>
                {{
                  (item.iscoTitle ? item.iscoTitle : '') +
                  (item.iscoTitle && item.jobTitle ? ' - ' : '') +
                  (item.jobTitle ? item.jobTitle : '')
                }}
              </span>

            <span class="cursor-pointer ellipsis" @click="onShowActions('A'+index)">
                <i class="pi pi-ellipsis-h text-blue-2"></i>
              </span>
          </p>
          <div class="actions button-shadow" :id="'A'+index">
            <span class="cursor-pointer" @click="showDetail(item)">
              <img alt="detail" src="/img/icon/details.svg" class="ms-1"/>
              جزئیات
            </span>

            <span class="mt-2 cursor-pointer" @click="onSetRequest(item)">
              <img src="/img/icon/closed.svg" alt="closed" class="ms-1"/>
              اعلام آمادگی
            </span>
          </div>
        </div>

        <p class="d-flex align-items-center mt-2">
          <span> نوع همکاری:</span>
          <span class="me-1">{{ item.cooperativeTypeTitle }}</span>
        </p>

        <p class="d-flex align-items-center mt-2">
          <span>دستمزد:</span>
          <span class="me-1">{{ item.salaryTypeTitle }}</span>
        </p>

        <p class="d-flex align-items-center mt-2">
          <span>استان - شهرستان:</span>
          <span class="me-1">{{ item.countryDivisionTitle }}</span>
        </p>

        <p class="d-flex align-items-center mt-2">
          <span>منتشر کننده:</span>
          <span v-if="item.placementName" class="me-1">{{ item.creatorTitle + ' ' + item.placementName }}</span>
          <span v-else class="me-1">{{ item.creatorTitle }}</span>
        </p>

      </div>
    </template>

    <div class="text-center mt-3 font-0-8 cursor-pointer"
         style="margin-bottom: 3rem"
         @click="showMoreResult()"
         v-if="counter < totalRows">
      بیشتر ...
    </div>
  </div>
</template>

<script setup lang="ts">
import {EmployerService} from "~/core/employer/employer-service";
import {useDialog} from "primevue/usedialog";
import {MakeResponse} from "~/composables/make-response";
import type {JobOpportunityList} from "~~/core/models/common/job-opportunity-list";
import OpportunityDetail from "../../../page-components/common/OpportunityDetail.vue";
import Readiness from "./Readiness.vue";
import {CommonServices} from "~/core/common/common-services";
import type {CodingDto} from "~~/core/models/common/coding-dto";
import {BaseCodingEnum} from "~/core/enum/baseCoding.enum";

definePageMeta({
  name: "جست و جوی شغل"
});

const jobOpportunityList = ref<JobOpportunityList[]>([]);
const totalRows = ref<number>(0);
const isActive = ref();
const date = ref();
const counter = ref<number>(10);
const dialog = useDialog();
const salaryTypeList = ref<CodingDto[]>([]);
const cooperationTypeList = ref<CodingDto[]>([]);
const showSearch = ref<boolean>(false);
const provinceList = ref([]);
const cityList = ref([]);

const search = reactive({
  searchText: null,
  isPublic: true,
  pageNumber: 1,
  take: 10,
  salaryType: null,
  provinceID: null,
  cooperativeTypeId: [],
  cityId: [],
  statusID: null,
});

const getRequestedJobs = (take: number) => {
  search.take = take;
  MakeResponse.makeServerResponse(EmployerService.getJobOpportunityList(search), true, result => {
    if (result.results) {
      jobOpportunityList.value = result.results;
      totalRows.value = result.totalRows;
    }
  });
}

const getCoding = () => {
  MakeResponse.makeServerResponse(CommonServices.GetTypeList(
      [BaseCodingEnum.salaryType, BaseCodingEnum.cooperationType]), false, result => {
    if (result) {
      salaryTypeList.value = result.filter((p: CodingDto) => p.parentID === BaseCodingEnum.salaryType && p.title !== 'نامشخص');
      cooperationTypeList.value = result.filter((p: CodingDto) => p.parentID === BaseCodingEnum.cooperationType && p.title !== 'نامشخص');
    }
  });
}

const getProvince = () => {
  MakeResponse.makeServerResponse(CommonServices.getCityProvince({typeID: 1, ids: []}), true, result => {
    if (result) {
      provinceList.value = result;
    }
  });
}

const getCity = (id: number) => {
  MakeResponse.makeServerResponse(CommonServices.getCityProvince({typeID: 2, ids: [id]}), true, result => {
    if (result) {
      cityList.value = result;
    }
  });
}

const showMoreResult = () => {
  counter.value = counter.value + 10;
  getRequestedJobs(counter.value);
}

const showDetail = (item: JobOpportunityList) => {
  dialog.open(OpportunityDetail, {
    props: {
      header: 'نمایش جزئیات فرصت شغلی',
      modal: true,
      style: {
        width: '60%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    data: {
      jobOpportunityID: item.id
    },
  });
}

const onSetRequest = (item: JobOpportunityList) => {
  dialog.open(Readiness, {
    props: {
      header: 'اعلام آمادگی',
      style: {
        width: '60%',
      },
      breakpoints: {
        '640px': '100%'
      },
      draggable: false
    },
    data: item.id,

    onClose: (opt) => {
      if (opt && opt.data) {
        getRequestedJobs(counter.value);
      }
    },
  });
}

const onShowActions = (id: any) => {
  const action = document.getElementById(id);
  if (action?.style.display === 'flex') {
    action.style.display = 'none';
  } else {
    action.style.transition = '1s';
    action.style.display = 'flex';
  }
}

onMounted(() => {
  isActive.value = true;
  getRequestedJobs(10);
  getCoding();
  getProvince();
});
</script>

<style scoped lang="scss">
</style>