<template>
  <div class="card">
    <div class="cameras flex flex-wrap justify-content-between gap-2">
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
          label="Open Gate"
          icon="pi pi-arrow-right"
          class="m-auto block mt-2"
          :disabled="index > 0"
        />
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
