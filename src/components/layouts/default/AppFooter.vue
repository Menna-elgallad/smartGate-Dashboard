<script lang="ts">
export default {
  name: "AppFooter",
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    },
  },
  methods: {
    footerImage() {
      return this.$appState.darkTheme
        ? "/images/logo-white.svg"
        : "/images/logo-dark.svg";
    },
  },
};
</script>

<template>
  <div class="layout-footer">
    made with ❤️ by
    <a class="flex align-items-center" href="#" target="_blank">
      <span class="font-medium ml-1">Smart Gate Team</span>
    </a>
  </div>
</template>

<style scoped></style>
