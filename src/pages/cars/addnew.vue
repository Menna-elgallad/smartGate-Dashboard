<template>
  <div class="card">
    <Toast />
    <div style="width: 80%; margin: auto">
      <div class="p-fluid">
        <h4 class="border-bottom-1 border-300 pb-3">Add new Car</h4>
        <div class="field">
          <label for="name1" style="font-weight: 500">Owner Name</label>
          <InputText id="name1" type="text" v-model="name" />
        </div>
        <div class="field">
          <label for="Paltenumber" style="font-weight: 500"
            >Plate Number
            <span class="text-blue-400 text-sm"
              >(Numbers first then letters)</span
            >
          </label>
          <InputText id="Paltenumber" type="text" v-model="plate" />
        </div>

        <div class="field">
          <label for="" style="font-weight: 500">Plate Color</label>
          <Dropdown
            v-model="selectedColor"
            :options="countries"
            optionLabel="name"
            placeholder="Select Plate Color"
            class="w-full"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <div>{{ slotProps.value.name }}</div>
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
            <template #option="slotProps">
              <div class="flex align-items-center">
                <span>{{ slotProps.option.code }} -- </span>
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Dropdown>
          <div class="field mt-3">
            <label for="" style="font-weight: 500">Gate </label>
            <MultiSelect
              v-model="selectedGates"
              :options="gates"
              optionLabel="id"
              placeholder="Select Gates"
              display="chip"
              class="w-full"
            >
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
              <template #footer>
                <div class="py-2 px-3">
                  <b>{{ selectedGates ? selectedGates.length : 0 }}</b>
                  item{{
                    (selectedGates ? selectedGates.length : 0) > 1 ? "s" : ""
                  }}
                  selected.
                </div>
              </template>
            </MultiSelect>
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
</template>

<script setup>
import { useToast } from "primevue/usetoast";
const toast = useToast();

const selectedColor = ref();
const name = ref();
const plate = ref();
const selectedGates = ref();
const gates = ref();
const countries = ref([
  { name: "Blue", code: "ملاكي" },
  { name: "Orange", code: "تاكسي" },
  { name: "Red", code: "نقل" },
  { name: "Grey", code: "أتوبيس" },
  { name: "Beige", code: "ليموزين" },
  { name: "Yellow", code: "اجنبية" },
]);

// async function addData() {
//   const { data } = await useAsyncGql("addCars", {});
// }
await getData();
async function getData() {
  const { data } = await useAsyncGql("getGates", {});
  console.log(data.value);
  gates.value = data.value?.gates?.map((e) => {
    return {
      name: e.name,
      id: e.id,
    };
  });
}
async function addData() {
  let gatesid = selectedGates.value.map((e) => e.id);
  const { data } = await useAsyncGql("addCar", {
    ownerName: name.value,
    color: selectedColor.value.name.toLowerCase(),
    plateNumber: plate.value,
    gateids: gatesid,
  });
  if (data.value) {
    name.value = "";
    selectedColor.value = "";
    plate.value = "";
    selectedGates.value = "";

    toast.add({
      severity: "success",
      summary: "Info",
      detail: "Data Added successfully",
      life: 3000,
    });
  }
}
</script>

<style></style>
