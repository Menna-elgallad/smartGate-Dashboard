<script lang="ts">
import AppTopBar from "~/components/layouts/default/AppTopbar.vue";
import AppMenu from "~/components/layouts/default/AppMenu.vue";
// import AppConfig from "~/components/layouts/default/AppConfig.vue";
import AppFooter from "~/components/layouts/default/AppFooter.vue";
import { useToast } from "primevue/usetoast";
export default {
  setup() {
    const { onMessage } = useFcm();
    const router = useRouter();
    const toast = useToast();

    onMounted(() => {
      onMessage(data => {
        toast.add({
          severity: "warn",
          summary: data.notification.title,
          detail: data.notification.body,
          group: "bc"
        });
      });
      const token = localStorage.getItem("token");
      if (token) {
        useGqlToken(token);
        return;
      } else {
        router.push("/login");
      }
    });
  },
  components: {
    AppTopBar,
    AppMenu,
    // AppConfig,
    AppFooter
  },
  data() {
    return {
      layoutMode: "static",
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      menu: [
        {
          label: "Home",
          items: [
            {
              label: "Dashboard",
              icon: "pi pi-fw pi-home",
              to: "/"
            }
          ]
        },

        {
          label: "Pages",
          icon: "pi pi-fw pi-sitemap",
          items: [
            {
              label: "Cars ",
              icon: "pi pi-fw pi-car",
              items: [
                {
                  label: "All Cars data",
                  icon: "pi pi-fw pi-id-card",

                  to: "/cars"
                },
                {
                  label: "Add Car",
                  icon: "pi pi-fw pi-plus",
                  to: "/cars/addnew"
                }
              ]
            },
            {
              label: "History",
              icon: "pi pi-fw pi-history",
              to: "/history"
            },
            {
              label: "Notifications",
              icon: "pi pi-fw pi-bell",
              to: "/notifications"
            },
            {
              label: "Camera stream",
              icon: "pi pi-fw pi-camera",
              to: "/camera"
            },
            {
              label: "Gates",
              icon: "pi pi-fw pi-sign-in",
              to: "/gates"
            }
          ]
        }
      ]
    };
  },
  computed: {
    containerClass() {
      return [
        "layout-wrapper",
        {
          "layout-overlay": this.layoutMode === "overlay",
          "layout-static": this.layoutMode === "static",
          "layout-static-sidebar-inactive":
            this.staticMenuInactive && this.layoutMode === "static",
          "layout-overlay-sidebar-active":
            this.overlayMenuActive && this.layoutMode === "overlay",
          "layout-mobile-sidebar-active": this.mobileMenuActive,
          "p-input-filled": this.$primevue.config.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.config.ripple === false,
          "layout-theme-light": this.$appState.theme.startsWith(
            "lara-light-blue"
          )
        }
      ];
    },
    logo() {
      return this.$appState.darkTheme
        ? "/images/logo-white.svg"
        : "/images/logo.svg";
    }
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
    }
  },
  beforeUpdate() {
    if (this.mobileMenuActive) {
      this.addClass(document.body, "body-overflow-hidden");
    } else {
      this.removeClass(document.body, "body-overflow-hidden");
    }
  },
  methods: {
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }

      this.menuClick = false;
    },
    onMenuToggle() {
      this.menuClick = true;

      if (this.isDesktop()) {
        if (this.layoutMode === "overlay") {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true;
          }

          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        } else if (this.layoutMode === "static") {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }

      event.preventDefault();
    },
    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode;
    },
    addClass(element, className) {
      if (element.classList) {
        element.classList.add(className);
      } else {
        element.className += ` ${className}`;
      }
    },
    removeClass(element, className) {
      if (element.classList) {
        element.classList.remove(className);
      } else {
        element.className = element.className.replace(
          new RegExp(`(^|\\b)${className.split(" ").join("|")}(\\b|$)`, "gi"),
          " "
        );
      }
    },
    isDesktop() {
      return window.innerWidth >= 992;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === "static") {
          return !this.staticMenuInactive;
        } else if (this.layoutMode === "overlay") {
          return this.overlayMenuActive;
        }
      }

      return true;
    }
  }
};
</script>

<template>
  <div :class="containerClass" @click="onWrapperClick">
    <Toast group="bc">
      <template #message="slotProps">
        <div class="flex flex-column align-items-center" style="flex: 1">
          <div class="text-center">
            <i class="pi pi-exclamation-triangle" style="font-size: 3rem"></i>
            <div class="font-bold text-xl my-3">{{ slotProps.message.summary }}</div>
            <div class="my-3">{{ slotProps.message.detail }}</div>
          </div>
          <div class="flex gap-2">
            <Nuxt-Link to="/camera">
              <Button severity="warning" label="Go to Camera"></Button>
            </Nuxt-Link>
          </div>
        </div>
      </template>
    </Toast>
    <AppTopBar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
    </div>

    <div class="layout-main-container">
      <div class="layout-main">
        <slot />
      </div>
      <AppFooter />
    </div>

    <!-- <AppConfig :layout-mode="layoutMode" @layout-change="onLayoutChange" /> -->
    <transition name="layout-mask">
      <div v-if="mobileMenuActive" class="layout-mask p-component-overlay" />
    </transition>
  </div>
</template>

<style lang="scss">
@import "~/assets/styles/App.scss";
.p-button.p-button-warning,
.p-buttonset.p-button-warning > .p-button,
.p-splitbutton.p-button-warning > .p-button {
  color: #ffffff;
  background: #d09439 !important;
  border: 1px solid #d09439 !important;
}
</style>
