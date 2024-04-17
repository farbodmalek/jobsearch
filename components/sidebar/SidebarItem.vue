<template>
  <li class="sidebar-item" ref="sidebarItem">
    <PanelMenu :model="item">
      <template #item="{ item }">
        <nuxt-link :to="item.url" class="text-dark">
          <img :src="`${item.img}`" width="20" alt=""/>
          <span class="ml-2 font-1 m-3 text-dark" @click="routerHandler(item.id)">{{ item.label }}</span>
          <span v-if="item.subMenu" class="pi pi-angle-down text-primary ml-auto"></span>
        </nuxt-link>
      </template>
    </PanelMenu>
  </li>
</template>
<script lang="ts" setup>
import {BasePage} from "~/core/base/base-page";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {useStore} from "~/store/menu-store";

const router = useRouter();
const route = useRoute();
const sidebarItem = ref<HTMLElement>();
const submenu = ref<HTMLElement>();
const submenuOriginalHeight = ref(0);
const submenuHeight = ref("auto");
const isSubActive = ref(true);
interface Menu {
  name: string;
  key?: string;
  icon?: string;
  url?: string;
  submenu: {
    name: string;
    url: string;
  }[];
}

const props = defineProps<{
  item: Menu;
}>();

const isActive = computed(() => {
  return (
      route.path == props.item.url ||
      (props.item.submenu &&
          props.item.submenu.some((sub) => sub.url == route.path))
  );
});

onMounted(() => {
  if (submenu.value) {
    submenuOriginalHeight.value = submenu.value.offsetHeight;
    isSubActive.value = isActive.value;
    submenuHeight.value =
        (isSubActive.value ? submenuOriginalHeight.value : 0) + "px";
  }
});

const hasSub = computed(() => {
  if (props.item.hasOwnProperty("submenu")) {
    if (props.item.submenu.length > 0) {
      return true;
    }
  }
  return false;
});

const toggleSidebar = useStore();

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
    toggleSidebar.closeSidebar();
  }

}

</script>

<style>

</style>
