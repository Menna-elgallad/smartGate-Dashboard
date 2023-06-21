<template>
  <div class="card">
    <Toast />
    <DataTable
      :value="notifiacations"
      paginator
      showGridlines
      :rows="10"
      data-key="id"
      filterDisplay="menu"
      v-model:filters="filters"
      :loading="loading"
    >
      <template #header>
        <div>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText placeholder="Keyword Search" v-model="filters['global'].value" />
          </span>
        </div>
      </template>
      <template #empty>No notifications found.</template>
      <template #loading>Loading notifications data. Please wait.</template>
      <Column field="body" header="Notifiactions" style="min-width: 12rem">
        <template #body="{ data }">{{ data.body }}</template>
      </Column>

      <Column
        field="created"
        header="Date"
        sortable
        filterField="date"
        data-type="date"
        style="min-width: 10rem"
      >
        <template #body="{ data }">{{ formatDate(data.created) }}</template>
      </Column>
    </DataTable>
  </div>
</template>
  
  <script setup >
import { ref, onMounted } from "vue";

import { FilterMatchMode, FilterOperator } from "primevue/api";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const notifiacations = ref();

const loading = ref(true);

await getData();
async function getData() {
  const { data } = await useAsyncGql("notificatios", {});

  notifiacations.value = data.value.notifications;
  loading.value = false;
  console.log(notifiacations.value);
}

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

const formatDate = value => {
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};
</script>
  
  <style lang="scss" scoped>
</style>
  