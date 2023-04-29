<template>
  <div class="card">
    <DataTable
      :value="cardata"
      paginator
      showGridlines
      :rows="10"
      dataKey="id"
      filterDisplay="menu"
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
            <InputText placeholder="Keyword Search" />
          </span>
        </div>
      </template>
      <template #empty> No cars found. </template>
      <template #loading> Loading cars data. Please wait. </template>
      <Column field="name" header="Owner Name" style="min-width: 12rem">
        <template #body="{ data }">
          {{ data.ownerName }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Search by name"
          />
        </template>
      </Column>

      <Column field="Color" header="Plate Color" style="min-width: 12rem">
        <template #body="{ data }">
          <Tag
            severity="danger"
            :value="data.color"
            rounded
            v-if="data.color === 'red'"
          ></Tag>
          <Tag
            severity="primary"
            :value="data.color"
            rounded
            v-if="data.color === 'blue'"
          ></Tag>
          <Tag
            style="background-color: gray"
            :value="data.color"
            rounded
            v-if="data.color === 'grey'"
          ></Tag>
        </template>
      </Column>
      <Column field="type" header="Type" style="min-width: 12rem">
        <template #body="{ data }">
          <span> {{ checktype(data.color) }}</span>
        </template>
      </Column>
      <Column
        field="PlateNumber"
        header="Plate Number"
        style="min-width: 12rem"
      >
        <template #body="{ data }">
          {{ data.plateNumber }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            v-model="filterModel.value"
            type="text"
            class="p-column-filter"
            placeholder="Search by name"
          />
        </template>
      </Column>

      <Column
        header="Date Created"
        filterField="date "
        dataType="date"
        style="min-width: 10rem"
      >
        <template #body="{ data }">
          {{ data.created }}
        </template>
        <template #filter="{ filterModel }">
          <Calendar
            v-model="filterModel.value"
            dateFormat="mm/dd/yy"
            placeholder="mm/dd/yyyy"
            mask="99/99/9999"
          />
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
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import CustomerService from "~~/services/CustomerService";
import { FilterMatchMode, FilterOperator } from "primevue/api";
const cardata = ref();
const customers = ref();
const filters = ref();
const customerService = new CustomerService();

const loading = ref(true);

await getData();
async function getData() {
  const { data } = await useAsyncGql("getCars", {});

  cardata.value = data.value.allCars;
  console.log(cardata.value);
}

onMounted(() => {
  customerService.getCustomersLarge().then((data) => {
    customers.value = data;
    loading.value = false;
    customers.value.forEach(
      (customer) => (customer.date = new Date(customer.date))
    );
  });
});
function checktype(input) {
  switch (input) {
    case "red":
      return "نقل";
    case "blue":
      return "ملاكي";
    case "grey":
      return "أتوبيس";
  }
}
const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    balance: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    activity: { value: [0, 100], matchMode: FilterMatchMode.BETWEEN },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS },
  };
};

initFilters();

const formatDate = (value) => {
  return value.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
const formatCurrency = (value) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};
const clearFilter = () => {
  initFilters();
};
const getCustomers = (data) => {
  return [...(data || [])].map((d) => {
    d.date = new Date(d.date);

    return d;
  });
};
const getSeverity = (status) => {
  switch (status) {
    case "unqualified":
      return "danger";

    case "qualified":
      return "success";

    case "new":
      return "info";

    case "negotiation":
      return "warning";

    case "renewal":
      return null;
  }
};
</script>

<style lang="scss" scoped>
.colorspan {
  padding: 0.2rem 0.5rem;
  color: white;
  border-radius: 1.5rem;
  filter: contrast(65%);
  font-weight: 600;
}
</style>
