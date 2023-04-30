<script lang="ts">
export default {
  emits: ["topbar-menu-toggle", "menu-toggle"],
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    },
  },
  methods: {
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },
    onTopbarMenuToggle(event) {
      this.$emit("topbar-menu-toggle", event);
    },
    topbarImage() {
      return this.$appState.darkTheme ? "/images/logo.png" : "/images/logo.png";
    },
    signout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<template>
  <div class="layout-topbar">
    <NuxtLink to="/" class="layout-topbar-logo">
      <img alt="Logo" :src="topbarImage()" style="height: 120px" />
    </NuxtLink>
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle"
    >
      <i class="pi pi-bars" />
    </button>

    <button
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
      class="p-link layout-topbar-menu-button layout-topbar-button"
    >
      <i class="pi pi-ellipsis-v" />
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <Button label="Sign out" @click="signout()" />
      </li>
    </ul>
  </div>
</template>
