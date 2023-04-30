<template>
  <div class="card">
    <Toast />
    <DataTable
      :value="cardata"
      paginator
      showGridlines
      :rows="10"
      dataKey="id"
      filterDisplay="menu"
      v-model:filters="filters"
      :loading="loading"
    >
      <template #header>
        <div class="flex justify-content-between">
          <div class="buttons">
            <Button
              type="button"
              icon="pi pi-filter-slash"
              label="Clear"
              @click="clearFilter()"
            />
            <Button type="button" outlined class="ml-2">
              <NuxtLink to="/cars/addnew" style="font-weight: bold">
                Add new car</NuxtLink
              ></Button
            >
          </div>

          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              placeholder="Keyword Search"
              v-model="filters['global'].value"
            />
          </span>
        </div>
      </template>
      <template #empty> No cars found. </template>
      <template #loading> Loading cars data. Please wait. </template>
      <Column
        field="ownerName"
        header="Owner Name"
        style="min-width: 12rem"
        sortable
        filterField="ownerName"
        filterMatchMode="contains"
      >
        <template #body="{ data }">
          {{ data.ownerName }}
        </template>
      </Column>

      <Column field="Color" header="Plate Color" style="min-width: 12rem">
        <template #body="{ data }">
          <Tag
            :style="{ 'background-color': rgba(data.color) }"
            :value="data.color"
            rounded
          ></Tag>
        </template>
      </Column>
      <Column field="type" header="Type" style="min-width: 12rem">
        <template #body="{ data }">
          <span> {{ checktype(data.color) }}</span>
        </template>
      </Column>
      <Column
        field="plateNumber"
        header="Plate Number"
        style="min-width: 12rem"
        filterField="plateNumber"
        filterMatchMode="contains"
      >
        <template #body="{ data }">
          {{ data.plateNumber }}
        </template>
      </Column>

      <Column
        field="created"
        header="Date"
        sortable
        filterField="date"
        dataType="date"
        style="min-width: 10rem"
      >
        <template #body="{ data }">
          {{ formatDate(data.created) }}
        </template>
      </Column>
      <Column
        field="Blocked"
        header="Status"
        dataType="boolean"
        style="min-width: 6rem"
      >
        <template #body="{ data }">
          <i
            class="pi"
            :class="{
              'pi-check-circle text-green-500': !data.blocked,
              'pi-times-circle text-red-400': data.blocked,
            }"
          ></i>
        </template>
      </Column>
      <Column
        field="Blocked"
        header="Block"
        dataType="boolean"
        style="min-width: 6rem"
      >
        <template #body="{ data }">
          <Button
            type="button"
            :severity="data.blocked ? 'secondary' : 'primary'"
            :label="!data.blocked ? 'block' : 'Unblock'"
            @click="blocking(data.id, data.blocked)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { FilterMatchMode, FilterOperator } from "primevue/api";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const cardata = ref();

const loading = ref(true);

await getData();
async function getData() {
  const { data } = await useAsyncGql("getCars", {});

  cardata.value = data.value.allCars;
  loading.value = false;
  console.log(cardata.value);
}

function checktype(input) {
  switch (input) {
    case "red":
      return "نقل";
    case "blue":
      return "ملاكي";
    case "grey":
      return "أتوبيس";
    case "yellow":
      return "أجنبية";
    case "orange":
      return "تاكسي";
    case "beige":
      return "ليموزين";
  }
}
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const formatDate = (value) => {
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

function rgba(color) {
  switch (color) {
    case "red":
      return "#d74343";

    case "blue":
      return "#3B82F6";

    case "orange":
      return "#fa8e42";

    case "grey":
      return "#a7a7a7";

    case "yellow":
      return "#eab308";
    case "beige":
      return "#d7c58b";
  }
}
async function blocking(myid, block) {
  if (block) {
    console.log(block);
    const { data } = await useAsyncGql("unblock", {
      id: myid,
    });
    console.log(data.value);
    toast.add({
      severity: "success",
      summary: "Info",
      detail: `Car with id : ${myid} unblocked succesfully`,
      life: 3000,
    });
    await getData();
  } else {
    const { data } = await useAsyncGql("block", {
      id: myid,
    });
    toast.add({
      severity: "success",
      summary: "Info",
      detail: `Car with id : ${myid} blocked succesfully`,
      life: 3000,
    });
    await getData();
  }
}
</script>

<style lang="scss" scoped>
.colorspan {
  filter: contrast(65%);
}
</style>
