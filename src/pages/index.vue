<script setup>
const cardata = ref();
const types = ref([]);
const colors = ref();
const loading = ref(true);
const countedTypes = ref();
await getDataCars();
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
async function getDataCars() {
  const { data } = await useAsyncGql("getCars", {});

  cardata.value = data.value.allCars;
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
</script>

<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-6">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div class="part1 flex">
            <div
              class="flex align-items-center justify-content-center bg-blue-100 border-round mt-1"
              style="width: 2.5rem; height: 2.5rem"
            >
              <i class="pi pi-fw pi-car text-blue-500 text-3xl" />
            </div>
            <div class="ml-3">
              <span class="block text-900 font-semibold">Cars in System</span>
              <div class="text-500 text-xl mt-1">
                {{ cardata.length }}
              </div>
            </div>
          </div>
          <div class="part2 grid" v-if="countedTypes">
            <div
              class="type col-6"
              v-for="(item, index) in countedTypes"
              :key="index"
            >
              <span class="text-green-500 font-medium">{{ item[1] }}</span>
              <span class="text-900 font-medium mr-2">{{ item[0] }}</span>
            </div>
          </div>
        </div>
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
.type {
  direction: rtl;
}
</style>
