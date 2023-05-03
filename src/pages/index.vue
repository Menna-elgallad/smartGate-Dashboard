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
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      label: "Sales",
      data: [540, 325, 702, 620],
      backgroundColor: [
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
    <div class="col-12 lg:col-6 xl:col-5 card">
      <div class="mb-0">
        <div class="mb-3">
          <div class="part1 flex">
            <div class="ml-3 flex justify-content-between w-full">
              <span class="block text-900 text-2xl font-semibold"
                >Cars in System</span
              >
              <div class="text-900 text-2xl font-semibold">
                {{ cardata?.length }}
              </div>
            </div>
          </div>
          <div class="part2 grid mt-4" v-if="countedTypes">
            <div
              class="type col-6 flex flex-column align-items-center"
              v-for="(item, index) in countedTypes"
              :key="index"
            >
              <div
                class="flex align-items-center justify-content-center bg-blue-100 border-round"
                style="width: 3.5rem; height: 3.5rem"
              >
                <!-- <i class="pi pi-car text-blue-500 text-5xl" /> -->
                <Icon
                  v-if="item[0] === 'ملاكي'"
                  name="ic:baseline-directions-car-filled"
                ></Icon>
              </div>

                <div
                v-if="item[0] === 'نقل'"
                class="flex align-items-center justify-content-center bg-blue-100 border-round"
                style="width: 3.5rem; height: 3.5rem"
              >
              <Icon  name="fe:truck" class=" text-pink-400"></Icon>

                </div>
                <div
                v-if="item[0] === 'أتوبيس'"
                class="flex align-items-center justify-content-center bg-blue-100 border-round"
                style="width: 3.5rem; height: 3.5rem"
              >
              <Icon

                  name="ic:baseline-directions-bus"
                ></Icon>
                </div>
                <div
                v-if="item[0] === 'أجنبية'"
                class="flex align-items-center justify-content-center bg-blue-100 border-round"
                style="width: 3.5rem; height: 3.5rem"
              >
                <Icon

                  name="ic:twotone-taxi-alert"
                ></Icon>
                </div>
                <div
                v-if="item[0] === 'تاكسي'"
                class="flex align-items-center justify-content-center bg-blue-100 border-round"
                style="width: 3.5rem; height: 3.5rem"
              >

                <Icon name="map:taxi-stand"></Icon>
                </div>
              </div>
              <div class="car-data">
                <div class="text-2xl font-bold ml-2 mt-2">{{ item[1] }}</div>
                <div class="text-900 font-medium mr-2">{{ item[0] }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 xl:col-7">
      <div class="card">
        <Chart type="bar" :data="chartData" :options="chartOptions" />
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
  height: 100%;
  border-radius: 1.5rem;
  display: block;
  &:hover {
    box-shadow: 0 0 8px 2px #cccccc9a;
  }
}
.table-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
