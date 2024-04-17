<template>
  <div class=" flex justify-content-center ">
    <div class="d-flex justify-content-between align-items-center container-fluid">
      <div class="col-3">
        <img src="/img/icon/menu.svg" alt="logo" width="20" @click="visible = true"/>
      </div>
      <div class="col-5 text-center">
        <img v-if="!route.meta.name" alt="logo" src="/img/header/logo.svg" width="100"/>
        <div v-if="route.meta.name" class="d-flex">
        <span class="fw-bold text-blue-3 col-12">
          {{ route.meta.name }}
        </span>
        </div>
      </div>
      <div class="col-3 d-flex justify-content-end">
        <img src="/img/icon/chevron.svg" alt="logo" width="10" @click="BackHandler"/>
      </div>
    </div>
    <Sidebar v-model:visible="visible" position="right">
      <template #container="{ closeCallback }">
        <div class="d-flex flex-column h-full">
          <div class="d-flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
            <span class="inline-flex align-items-center gap-2">
             <img v-if="JobSeekerAttachment" :src="`${'http://jsmedia.karafariniomid.ir/' + JobSeekerAttachment.path}`" alt="" class="rounded-pill"
                  width="60">
            </span>
            <span>
              <Button class="h-2rem w-2rem"
                      icon="pi pi-times"
                      outlined rounded type="button"
                      @click="closeCallback">
              </Button>
            </span>
          </div>
          <div class="overflow-y-auto">
            <ul class="list-none p-2 m-0 list-unstyled">
              <li v-for="item in store.sidebarItems[0]"
                  :key="item.id"
                  class="cursor-pointer p-2 border-round"
                  @click="TogglePanel(item.id)">
                <nuxt-link :to="item.url"
                           class="text-black-50">
                  <div v-if="!item.subMenu" class="d-flex align-items-center" @click="visible = !visible">
                    <img :src="`${item.img}`"
                         alt=""
                         width="20"/>
                    <span class="ml-2 font-1 m-1 text-dark" @click="routerHandler(item.id)">{{ item.label }}</span>
                  </div>

                  <div v-if="item.subMenu" class="d-flex align-items-center">
                    <img :src="`${item.img}`"
                         alt=""
                         width="20"/>
                    <span class="ml-2 font-1 m-1 text-dark" @click="routerHandler(item.id)">{{ item.label }}</span>
                    <i class="pi pi-angle-down"></i>
                  </div>
                  <span  v-if="item.subMenu && isPanelMenu"
                        class="text-primary ml-auto d-flex PanelMenu justify-content-center">
                    <ul class="list">
                      <li v-for="item in  item.subMenu"
                          class="align-items-center cursor-pointer p-3 border-round text-700 ">
                        <nuxt-link :to="item.url" @click="visible = !visible">
                          <span class="ml-2 font-1 m-1 text-dark">{{ item.label }}</span>
                        </nuxt-link>
                      </li>
                    </ul>
                  </span>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </Sidebar>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import Sidebar from 'primevue/sidebar';
import {useStore} from "~/store/menu-store";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {BasePage} from "~/core/base/base-page";

import {CommonServices} from "~/core/common/common-services";
import "vue3-circle-progress/dist/circle-progress.css";
import CircleProgress from "vue3-circle-progress";
import {MakeResponse} from "~/composables/make-response";
import {JobSeekerServices} from "~/core/jobSeeker/jobSeeker-services";

const store = useStore();
const router = useRouter();
const route = useRoute();
const visible = ref(store.isSidebarActive);

const onChange = () => {
  console.log(visible.value)
}
const isPanelMenu = ref(false);
const JobSeekerAttachment = <any>ref();
const routerHandler = (id: number) => {
  if (id === 4) {
    localStorage.clear()
    localStorage.setItem("splash", 'true');
    const router = useRouter();
    router.push("/authorization/login");
  } else if (id === 3 && BasePage.getLoggedUser().isPersonProfileActive == true) {
    ToastNotificationService.success("پروفایل شما فعال است");
  } else if (id === 3 && BasePage.getLoggedUser().isPersonProfileActive == false) {
    const router = useRouter();
    router.push("/authorization/jobSeeker/activepage");
  }

  if (id !== 2) {
    // toggleSidebar.closeSidebar();
  }

}


const TogglePanel = (id: any) => {
  if (id == 2) {
    isPanelMenu.value = !isPanelMenu.value
  } else {
    isPanelMenu.value = false
  }
}
onMounted(() => {
    AttachmentGet()
});

const BackHandler = () => {
  router.back()
}


const AttachmentGet = () => {
  MakeResponse.makeServerResponse(CommonServices.AttachmentGet({
    entityID: localStorage.getItem("personId"),
    entityType: 1
  }), true, result => {
    if (result) {
      JobSeekerAttachment.value = result.results[0];
    }
  });
}
</script>

<style>
.PanelMenu {
  transition: all 0.3s ease;
}

.PanelMenu.slide-down-enter-active,
.PanelMenu.slide-down-leave-active {
  transition: all 0.3s ease;
}

.PanelMenu.slide-down-enter,
.PanelMenu.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>