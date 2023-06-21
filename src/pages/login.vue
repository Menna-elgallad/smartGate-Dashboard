<script lang="ts" setup>
definePageMeta({
  layout: "empty"
});

const { $appState } = useNuxtApp();
const fcm = ref();
const email = ref("");
const password = ref("");
const checked = ref(false);
const router = useRouter();
const logoColor = computed(() => ($appState.darkTheme ? "white" : "dark"));
const token = ref();
async function fetch() {
  const { data } = await useAsyncGql("login", {
    username: "admin",
    email: email.value,
    password: password.value,
    fcm: fcm.value
  });
  console.log("data", data.value);
  token.value = data.value?.login?.accessToken;
  if (token.value) {
    router.push("/");
    console.log(token.value);
  }
  localStorage.setItem("token", token.value);
}

onMounted(async () => {
  const { onMessage, getToken } = useFcm();
  fcm.value = await getToken();
});
</script>

<template>
  <div
    class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width: 80%">
      <div class="col-12 mt-5 xl:mt-0 text-center"></div>
      <div
        class="col-12 xl:col-6"
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color),
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="h-full w-full m-0 py-7 px-4"
          style="
            border-radius: 53px;
            background: linear-gradient(
              180deg,
              var(--surface-50) 38.9%,
              var(--surface-0)
            );
          "
        >
          <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Welcome to Smart Gate System !</div>
            <span class="text-600 font-medium">Sign in to continue</span>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
            <InputText
              id="email1"
              v-model="email"
              type="text"
              class="w-full mb-3"
              placeholder="Email"
              style="padding: 1rem"
            />

            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
            <Password
              id="password1"
              v-model="password"
              placeholder="Password"
              :toggle-mask="true"
              class="w-full mb-3"
              input-class="w-full"
            />

            <div class="flex align-items-center justify-content-between mb-5">
              <div class="flex align-items-center">
                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2" />
                <label for="rememberme1">Remember me</label>
              </div>
              <a
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
              >Forgot password?</a>
            </div>
            <Button label="Sign In" class="w-full p-3 text-xl" @click="fetch()" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* .pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
} */

.p-input-icon-left > i,
.p-input-icon-left > svg,
.p-input-icon-right > i,
.p-input-icon-right > svg {
  position: absolute;
  top: 50%;
  right: 8px;
  margin-top: -0.5rem;
}
</style>
