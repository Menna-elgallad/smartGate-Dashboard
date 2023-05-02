<template>
  <div class="card">
    <DataTable
      :value="history"
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
          <div class="buttons"></div>

          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              placeholder="Keyword Search"
              v-model="filters['global'].value"
            />
          </span>
        </div>
      </template>
      <template #empty> No history . </template>
      <template #loading> Loading history data. Please wait. </template>
      <Column
        field="car.ownerName"
        header="Owner Name"
        style="min-width: 12rem"
        sortable
        filterField="car.ownerName"
        filterMatchMode="contains"
      >
        <template #body="{ data }">
          {{ data.car?.ownerName }}
        </template>
      </Column>

      <Column field="type" header="Type" style="min-width: 12rem">
        <template #body="{ data }">
          <span> {{ checktype(data.car?.color) }}</span>
        </template>
      </Column>
      <Column
        field="plateNumber"
        header="Plate Number"
        style="min-width: 12rem"
        filterField="car.plateNumber"
        filterMatchMode="contains"
      >
        <template #body="{ data }">
          {{ data.car?.plateNumber }}
        </template>
      </Column>

      <Column
        field="created"
        header="Entered"
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
        field="gate.name"
        header="Gate"
        filterField="gate.name"
        style="min-width: 10rem"
      >
        <template #body="{ data }">
          {{ data.gate?.name }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { FilterMatchMode, FilterOperator } from "primevue/api";
const history = ref();
await getData();
async function getData() {
  const { data } = await useAsyncGql("history", {});
  history.value = data.value.history;
}

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
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
</script>

<style lang="scss" scoped></style>
