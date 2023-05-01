<template>
  <div class="card">
    <Toast />
    <ConfirmDialog group="templating">
      <template #message="slotProps">
        <div class="flex p-4">
          <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
          <p class="pl-2">{{ slotProps.message.message }}</p>
        </div>
      </template>
    </ConfirmDialog>
    <div class="cameras flex flex-wrap justify-content-between gap-2">
      <Dialog
        v-model:visible="visible"
        modal
        :style="{ width: '30vw' }"
        header="Confirmation"
      >
        <div
          class="dialog-content flex flex-column justify-content-center align-items-center"
        >
          <client-only>
            <lottie-player
              autoplay
              loop
              :src="gateanimation"
              style="width: 300px"
              :direction="-1"
              :speed="2"
            >
            </lottie-player
          ></client-only>

          <h5 class="m-0 pb-2 myborder">
            Are you Sure you want to open this Gate
            <span class="text-blue-300 text-lg font-normal"> (Gate 1)</span>
          </h5>
          <p class="text-blue-300 font-medium">And allow the car to enter</p>
        </div>

        <template #footer>
          <Button label="No" icon="pi pi-times" @click="yes()" text />
          <Button label="Yes" icon="pi pi-check" @click="no()" autofocus />
        </template>
      </Dialog>
      <div class="camera-item" v-for="(camera, index) in 4" :key="index">
        <div class="camera">
          <div v-if="index === 0" class="iframe-contaienr">
            <iframe
              class="iframe"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/zBBVnq20HFU?autoplay=1"
              title="YouTube video player"
            ></iframe>
          </div>
          <p v-else>camera {{ index + 1 }}</p>
        </div>
        <Button
          @click="visible = true"
          label="Open Gate"
          icon="pi pi-arrow-right"
          class="m-auto block mt-2"
          :disabled="index > 0"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";

const toast = useToast();
import gateanimation from "@/assets/json/gate.json";
const visible = ref(false);
const no = () => {
  visible.value = false;
  toast.add({
    severity: "success",
    summary: "Confirmed",
    detail: "Gate opened successfully",
    life: 3000,
  });
};
const yes = () => {
  visible.value = false;
  toast.add({
    severity: "error",
    summary: "Rejected",
    detail: "Gate is not opened",
    life: 3000,
  });
};
</script>

<style scoped lang="scss">
.camera {
  background-color: #f7f5f5;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.camera-item {
  width: 49%;
}
.iframe-contaienr {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  .iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
