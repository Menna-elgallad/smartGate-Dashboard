<script setup>
const cardata = ref();
const types = ref([]);
const colors = ref();
const loading = ref(true);
const countedTypes = ref();
const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem("token");
  if (token) {
    useGqlToken(token);
    console.log("logout");

    return;
  } else {
    router.push("/login");
    console.log("logout");
  }
});

function countItems(arr) {
  return arr.reduce((acc, curr) => {
    if (curr in acc) {
      acc[curr]++;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {});
}
//  getDataCars();
async function getDataCars() {
  const { data } = await useAsyncGql("getCars", {});

  cardata.value = data?.value?.allCars;
  loading.value = false;
  console.log(cardata.value);
  colors.value = cardata.value.map((e) => {
    return e.color;
  });
  for (let item of colors.value) {
    switch (item) {
      case "red":
        types.value.push("نقل");
        break;
      case "blue":
        types.value.push("ملاكي");
        break;
      case "grey":
        types.value.push("أتوبيس");
        break;
      case "yellow":
        types.value.push("أجنبية");
        break;
      case "orange":
        types.value.push("تاكسي");
        break;
      case "beige":
        types.value.push("ليموزين");
        break;
    }
  }
  countedTypes.value = Object.entries(countItems(types.value));
  console.log(countedTypes.value);
}
getDataCars();
const chartData = ref({
  labels: ["Sut", "Sun", "Mon", "Tue", "wed", "Thu", "Fri"],
  datasets: [
    {
      label: "Entry Count in days",
      data: [200, 300, 311, 351, 310, 312, 30],
      backgroundColor: [
        "rgba(255, 159, 64, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgb(255, 159, 64)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(255, 159, 64)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
      ],
      borderWidth: 1,
    },
  ],
});
const chartOptions = ref({
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});
</script>

<template>
  <div class="grid">
    <div class="col-12 card">
      <div class="mb-0">
        <div class="mb-3">
          <div class="part1 flex">
            <div class="ml-3 head">
              <span class="block text-900 text-xl font-semibold p-2"
                >Cars in System</span
              >
            </div>
          </div>
          <div
            class="part2 flex w-full justify-content-around mt-4"
            v-if="countedTypes"
          >
            <div
              class="type flex flex-column align-items-center"
              v-for="(item, index) in countedTypes"
              :key="index"
            >
              <div
                v-if="item[0] === 'ملاكي'"
                class="flex align-items-center justify-content-center bg-blue-100 border-round"
                style="width: 3.5rem; height: 3.5rem"
              >
                <!-- <i class="pi pi-car text-blue-500 text-5xl" /> -->
                <Icon
                  name="ic:baseline-directions-car-filled"
                  class="text-3xl text-blue-500"
                ></Icon>
              </div>

              <div
                v-if="item[0] === 'نقل'"
                class="flex align-items-center justify-content-center bg-pink-100 border-round"
                style="width: 3.5rem; height: 3.5rem"
              >
                <Icon name="fe:truck" class="text-pink-500 text-3xl"></Icon>
              </div>
              <div
                v-if="item[0] === 'أتوبيس'"
                class="flex align-items-center justify-content-center bg-orange-100 border-round"
                style="width: 3.5rem; height: 3.5rem"
              >
                <Icon
                  name="ic:baseline-directions-bus"
                  class="text-3xl text-orange-500"
                ></Icon>
              </div>
              <div
                v-if="item[0] === 'أجنبية'"
                class="flex align-items-center justify-content-center bg-purple-100 border-round"
                style="width: 3.5rem; height: 3.5rem"
              >
                <Icon
                  name="ic:twotone-taxi-alert"
                  class="text-3xl text-purple-500"
                ></Icon>
              </div>
              <div
                v-if="item[0] === 'تاكسي'"
                class="flex align-items-center justify-content-center bg-cyan-100 border-round"
                style="width: 3.5rem; height: 3.5rem"
              >
                <Icon
                  name="map:taxi-stand"
                  class="text-3xl text-cyan-500"
                ></Icon>
              </div>

              <div
                class="car-data mt-2 flex flex-column justify-content-center align-items-center"
              >
                <h2 class="text-2xl font-bold">{{ item[1] }}</h2>
                <p class="text-gray-500 font-medium">{{ item[0] }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <div class="ml-3 head">
          <span class="block text-900 text-xl font-semibold p-2"
            >Entry history conut</span
          >
        </div>
        <Chart
          type="bar"
          :data="chartData"
          :options="chartOptions"
          class="mt-3"
        />
      </div>
    </div>
    <div class="col-12 xl:col-6">
      <div class="card">
        <h5>Cars Data</h5>
        <NuxtLink to="/cars" class="linkCar"
          ><img
            src="../assets/img//Screenshot 2023-04-30 151753.png"
            alt=""
            class="table-img"
        /></NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.linkCar {
  transition: all 0.5s ease;
  overflow: hidden;
  width: 100%;
  height: 80%;
  border-radius: 1.5rem;
  display: block;
  margin-top: 2rem;
  &:hover {
    box-shadow: 0 0 8px 2px #cccccc9a;
  }
}
.table-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card {
  height: 100%;
}
.type {
  padding: 0.5rem 1rem;
  border-bottom: 2px solid #cccccc98;
}
</style>
