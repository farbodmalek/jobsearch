<template>
  <div class="position-relative">

    <div class="box">

      <template v-for="(ticket, index) of ticketList" :key="index">
        <div class="ticket w-100 row m-1 p-2">
          <div class="col-2 index text-center d-flex align-items-center justify-content-center">{{index + 1}}</div>
          <div class="col-10 content p-2">

<!--            <div class="d-flex p-1">-->
<!--              <p class="font-0-8 w-30">کد ملی:</p>-->
<!--              <p>{{ticket.nationalCode}}</p>-->
<!--            </div>-->

            <div class="d-flex p-1">
              <p class="font-0-8 w-30">عنوان:</p>
              <p>{{ ticket.subject }}</p>
            </div>

            <div class="d-flex p-1">
              <p class="font-0-8 w-30">تاریخ ثبت:</p>
              <p>{{ticket.regMoment}}</p>
            </div>

            <div class="d-flex p-1">
              <p class="font-0-8 w-30">کد رهگیری:</p>
              <p>{{ticket.trackingCode}}</p>
            </div>

            <div class="d-flex p-1">
              <p class="font-0-8 w-30">وضعیت:</p>
              <p>{{ticket.stateTitle}}</p>
            </div>

          </div>
        </div>
      </template>

      <div class="plus">
        <nuxt-link to="/common/ticketSet">
          <span class="border-circle"><i class="pi pi-plus"></i></span>
        </nuxt-link>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import {CommonServices} from "~/core/common/common-services";
import {BasePage} from "~/core/base/base-page";

const filterTicket = ref({
  take: 10,
  pageNumber: 1,
  nationalCode: process.browser ? BasePage.getLoggedUser().userName : null
});
const ticketList = ref();

const getTickets = () => {
  MakeResponse.makeServerResponse(CommonServices.getTicketList(filterTicket.value), true, result => {
    if (result.results) {
      ticketList.value = result.results;
    }
  });
}

onMounted(() => {
  getTickets();
});
</script>

<style scoped lang="scss">
.index {
  background-color: #ff9900;
  border-radius: 0 .75rem .75rem 0;
}

.content {
  border: 1px solid #ff9900;
  border-radius: .75rem 0 0 .75rem;
}

.box {
  border: 1px solid #cbcbcb;
  margin: 0.5rem;
  border-radius: 0.5rem;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 30rem;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #949494;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: orange;
    border-radius: 35px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #b35100;
  }
}

.border-circle {
  border: 5px solid orange;
  border-radius: 50%;
  padding: .5rem;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
}

.plus {
  position: absolute;
  bottom: -1.5rem;
  background-color: white;
}

</style>