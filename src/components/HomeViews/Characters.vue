<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useScrollToTop } from "/src/main.js";
import Spinner from "../Spinner.vue";
import axios from "axios";

const { isHomePath, scrollToTop } = useScrollToTop();

const characters = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchCharacters = async () => {
  const uri = "https://rickandmortyapi.com/graphql";
  let page = 1;
  let allCharacters = [];

  while (page !== null) {
    try {
      const response = await axios.post(uri, {
        query: `
          query GetCharacters($page: Int!) {
            characters(page: $page) {
              info {
                next
              }
              results {
                id
                name
                image
              }
            }
          }
        `,
        variables: { page },
      });

      const data = response.data.data.characters;
      allCharacters = allCharacters.concat(data.results);
      page = data.info.next;
    } catch (err) {
      error.value = "Failed to fetch characters";
      console.error(err);
      page = null;
    }
  }

  characters.value = allCharacters;
  loading.value = false;
};

onMounted(() => {
  fetchCharacters();
});
</script>

<template>
  <div
    class="mx-10 mt-4 px-6 sm:px-10 py-6 text-center rounded-lg shadow-sm shadow-lime-500 h-screen bg-gradient-to-br from-[#384137a1] to-[#2a4325cb] relative">
    <h2 class="text-2xl mt-2 sm:mt-0 mb-6 text-center">
      Characters (826)
    </h2>
    <div v-if="loading">
      <Spinner></Spinner>
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-else
      class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 items-start pl-8 pr-12 py-2 overflow-y-scroll h-[80vh]">
      <div v-for="character in characters"
        :key="character.id"
        class="text-gray-300 rounded-md flex gap-3 items-start">
        <router-link
          :to="{ name: 'CharacterPage', params: { id: character.id } }">
          <div
            class="opacity-80 hover:opacity-90 hover:border-b-4 hover:border-r-4 border-cyan-500 transition-all delay-100 cursor-pointer bg-[#1a213afb] rounded-md overflow-hidden">
            <img :src="character.image"
              alt="Character Photo"
              class="overflow-hidden rounded-am" />
            <p
              class="text-center text-orange-500 font-medium">
              {{ character.name }}
            </p>
          </div>
        </router-link>
      </div>
    </div>

    <router-link v-if="!isHomePath" to="/"
      class="absolute left-2 -top-2 sm:left-16 sm:top-5">
      <button @click="scrollToTop"
        class="mt-3 sm:border-[1px] px-3 py-1 border-lime-700 bg-[#a5a2a225]">
        Home
      </button>
    </router-link>
  </div>
</template>
<style scoped>
</style>