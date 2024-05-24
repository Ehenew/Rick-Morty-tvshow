<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useScrollToTop } from "/src/main.js";
import Spinner from '../Spinner.vue';
import axios from "axios";

const { isHomePath, scrollToTop } = useScrollToTop();
const locations = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchLocations = async () => {
  const uri = "https://rickandmortyapi.com/graphql";
  let page = 1;
  let allLocations = [];

  while (page !== null) {
    try {
      const response = await axios.post(uri, {
        query: `
          query GetLocations($page: Int!) {
            locations(page: $page) {
              info {
                next
              }
              results {
                id
                name
              }
            }
          }
        `,
        variables: { page },
      });

      const data = response.data.data.locations;
      allLocations = allLocations.concat(data.results);
      page = data.info.next;
    } catch (err) {
      error.value = "Failed to fetch locations";
      console.error(err);
      page = null;
    }
  }

  locations.value = allLocations;
  loading.value = false;
};

onMounted(() => {
  fetchLocations();
});
</script>

<template>
  <div class="mx-10 overflow-y-hidden">
    <div
      class="md:mx-36 my-5 px-10 py-3 text-center bg-[#092E49] h-[95vh] rounded-lg border-[1px] border-orange-600 relative">
      <h2 class="text-center text-2xl mb-5 font-medium">
        Locations (126)</h2>
      <div v-if="loading"><Spinner></Spinner></div>
      <div v-if="error">{{ error.message }}</div>
      <div v-else
        class="flex flex-col gap-8 items-center overflow-y-scroll h-[75vh]">
        <div v-for="location in locations"
          :key="location.id">
          <router-link
            :to="{ name: 'LocationPage', params: { id: location.id } }">
            <div
              class="bg-[#102141f1] border-[1px] border-green-600 rounded-full px-16 py-3 md:w-96 hover:bg-[#0E1C36] hover:border-orange-400 cursor-pointer text-center text-orange-400">
              {{ location.name }}
            </div>
          </router-link>

          <router-link v-if="!isHomePath" to="/"
            class="absolute left-8 top-14">
            <button @click="scrollToTop"
              class="mt-3 border-[1px] px-4 py-2 border-green-700">
              Home
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>