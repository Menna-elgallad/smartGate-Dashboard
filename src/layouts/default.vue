<script lang="ts">
import AppTopBar from "~/components/layouts/default/AppTopbar.vue";
import AppMenu from "~/components/layouts/default/AppMenu.vue";
import AppConfig from "~/components/layouts/default/AppConfig.vue";
import AppFooter from "~/components/layouts/default/AppFooter.vue";
export default {
  setup() {
    const router = useRouter();

    onMounted(() => {
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
    AppConfig,
    AppFooter,
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
              to: "/",
            },
          ],
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

                  to: "/cars",
                },
                {
                  label: "Add Car (data)",
                  icon: "pi pi-fw pi-plus",
                  to: "/cars/addnew",
                },
              ],
            },
          ],
        },
        // {
        //   label: "UI Blocks",
        //   items: [
        //     { label: "Blocks", icon: "pi pi-fw pi-eye", to: "/demo/blocks" },
        //   ],
        // },
        // {
        //   label: "Pages",
        //   icon: "pi pi-fw pi-clone",
        //   items: [
        //     {
        //       label: "Crud",
        //       icon: "pi pi-fw pi-user-edit",
        //       to: "/demo/pages/crud",
        //     },
        //     {
        //       label: "Timeline",
        //       icon: "pi pi-fw pi-calendar",
        //       to: "/demo/pages/timeline",
        //     },
        //     { label: "Login", icon: "pi pi-fw pi-sign-in", to: "/login" },
        //     {
        //       label: "Not Found",
        //       icon: "pi pi-fw pi-exclamation-circle",
        //       to: "/notfound",
        //     },
        //     {
        //       label: "Empty",
        //       icon: "pi pi-fw pi-circle-off",
        //       to: "/demo/pages/empty",
        //     },
        //   ],
        // },
        // {
        //   label: "Menu Hierarchy",
        //   icon: "pi pi-fw pi-search",
        //   items: [
        //     {
        //       label: "Submenu 1",
        //       icon: "pi pi-fw pi-bookmark",
        //       items: [
        //         {
        //           label: "Submenu 1.1",
        //           icon: "pi pi-fw pi-bookmark",
        //           items: [
        //             { label: "Submenu 1.1.1", icon: "pi pi-fw pi-bookmark" },
        //             { label: "Submenu 1.1.2", icon: "pi pi-fw pi-bookmark" },
        //             { label: "Submenu 1.1.3", icon: "pi pi-fw pi-bookmark" },
        //           ],
        //         },
        //         {
        //           label: "Submenu 1.2",
        //           icon: "pi pi-fw pi-bookmark",
        //           items: [
        //             { label: "Submenu 1.2.1", icon: "pi pi-fw pi-bookmark" },
        //             { label: "Submenu 1.2.2", icon: "pi pi-fw pi-bookmark" },
        //           ],
        //         },
        //       ],
        //     },
        //     {
        //       label: "Submenu 2",
        //       icon: "pi pi-fw pi-bookmark",
        //       items: [
        //         {
        //           label: "Submenu 2.1",
        //           icon: "pi pi-fw pi-bookmark",
        //           items: [
        //             { label: "Submenu 2.1.1", icon: "pi pi-fw pi-bookmark" },
        //             { label: "Submenu 2.1.2", icon: "pi pi-fw pi-bookmark" },
        //             { label: "Submenu 2.1.3", icon: "pi pi-fw pi-bookmark" },
        //           ],
        //         },
        //         {
        //           label: "Submenu 2.2",
        //           icon: "pi pi-fw pi-bookmark",
        //           items: [
        //             { label: "Submenu 2.2.1", icon: "pi pi-fw pi-bookmark" },
        //             { label: "Submenu 2.2.2", icon: "pi pi-fw pi-bookmark" },
        //           ],
        //         },
        //       ],
        //     },
        //   ],
        // },
      ],
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
          "layout-theme-light": this.$appState.theme.startsWith("saga"),
        },
      ];
    },
    logo() {
      return this.$appState.darkTheme
        ? "/images/logo-white.svg"
        : "/images/logo.svg";
    },
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
    },
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
    },
  },
};
</script>

<template>
  <div :class="containerClass" @click="onWrapperClick">
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

    <AppConfig :layout-mode="layoutMode" @layout-change="onLayoutChange" />
    <transition name="layout-mask">
      <div v-if="mobileMenuActive" class="layout-mask p-component-overlay" />
    </transition>
  </div>
</template>

<style lang="scss">
@import "~/assets/styles/App.scss";
</style>
