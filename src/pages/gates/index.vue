<template>
  <div class="content">
    <div class="card">
      <DataTable :value="gates" tableStyle="min-width: 50rem">
        <Column field="name" header="Name"></Column>
        <Column field="description" header="Description"></Column>
        <Column field="lat" header="latitude"></Column>
        <Column field="long" header="longitude"></Column>
      </DataTable>
    </div>

    <div class="card">
      <Toast />
      <div style="width: 80%; margin: auto">
        <div class="p-fluid">
          <h4 class="border-bottom-1 border-300 pb-3">Add new Gate</h4>
          <div class="field">
            <label for="name1" style="font-weight: 500">Gate name</label>
            <InputText id="name1" type="text" v-model="name" />
          </div>
          <div class="field">
            <label for="Description" style="font-weight: 500"
              >Description
              <span class="text-blue-400 text-sm"
                >(Location of the gate in short description)</span
              >
            </label>
            <Textarea
              id="Description"
              type="text"
              v-model="description"
              rows="3"
            />
          </div>
          <div class="flex justify-content-between">
            <div class="field w-6">
              <label for="latitude" style="font-weight: 500">latitude </label>
              <InputText id="latitude" type="text" v-model="lat" />
            </div>
            <div class="field w-6 ml-2">
              <label for="longitude" style="font-weight: 500">longitude </label>
              <InputText id="longitude" type="text" v-model="long" />
            </div>
          </div>
        </div>
        <div class="flex w-100 justify-content-end">
          <Button
            type="button"
            label="Submit"
            icon="pi pi-check"
            @click="addData()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast";
const toast = useToast();
const gates = ref();
const name = ref();
const long = ref();
const lat = ref();
const description = ref();
await getData();
async function getData() {
  const { data } = await useAsyncGql("getGates", {});
  gates.value = data.value.gates;
}

async function addData() {
  const { data } = await useAsyncGql("createGate", {
    name: name.value,
    description: description.value,
    lat: lat.value,
    long: long.value,
  });
  if (data.value) {
    name.value = "";
    description.value = "";
    lat.value = "";
    long.value = "";
    await getData();
    toast.add({
      severity: "success",
      summary: "Info",
      detail: "Gate Data Added successfully",
      life: 3000,
    });
  }
}
</script>

<style></style>
