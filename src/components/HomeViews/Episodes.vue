<script setup>
import gql from "graphql-tag";
import { ref, computed, onMounted, watch } from 'vue';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { useScrollToTop } from "../../main.js";
import Spinner from '../Spinner.vue';
const { isHomePath, scrollToTop } = useScrollToTop();

const episodes = ref([]);
const loading = ref(true);
const error = ref(null);
const selectedSeason = ref(null);

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: 'https://rickandmortyapi.com/graphql',
});

const GET_ALL_EPISODES = gql`
  query GetAllEpisodes($page: Int) {
    episodes(page: $page) {
      info {
        next
      }
      results {
        id
        name
        episode
      }
    }
  }
`;

const fetchAllEpisodes = async (page = 1) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_ALL_EPISODES,
      variables: { page },
    });
    episodes.value = [ ...episodes.value, ...data.episodes.results ];

    if (data.episodes.info.next) {
      await fetchAllEpisodes(data.episodes.info.next);
    } else {
      loading.value = false;
    }
  } catch (err) {
    error.value = err;
    loading.value = false;
  }
};

const groupedEpisodes = computed(() => {
  return episodes.value.reduce((acc, episode) => {
    const season = episode.episode.split('E')[ 0 ].replace('S', '');
    if (!acc[ season ]) {
      acc[ season ] = [];
    }
    acc[ season ].push(episode);
    return acc;
  }, {});
});

// the first season will be selected by default
watch(episodes, (newEpisodes) => {
  if (newEpisodes.length && selectedSeason.value === null) {
    selectedSeason.value = Object.keys(groupedEpisodes.value)[ 0 ];
  }
});

const selectSeason = (season) => {
  selectedSeason.value = season;
};

const episodesForSelectedSeason = computed(() => {
  return groupedEpisodes.value[ selectedSeason.value ] || [];
});

onMounted(() => {
  fetchAllEpisodes();
});


</script>

<template>
  <div
    class="mx-10 mt-2 sm:p-8 grid grid-cols-[1fr,4fr] gap-6 lg:gap-16 justify-between rounded-lg relative border[1px] border-orange-600">
    <div
      class="bg-[#183E5A] flex flex-col gap-6 items-center px-4 py-5 pb-16 rounded-lg shadow-[1px_2px_4px] shadow-cyan-600">
      <h2 class="text-center text-2xl mb-5">Season</h2>

      <div v-for="(episodes, season) in groupedEpisodes"
        :key="season" @click="selectSeason(season)"
        :class="['season-div', { 'bg-orange-900': selectedSeason === season }]"
        class="w-24 lg:w-[70%] h-12 flex items-center
        justify-center border-[1px] bg-[#0F334D]  border-green-600
        rounded-lg hover:bg-orange-950 cursor-pointer">
        Season {{ season }}
      </div>
    </div>
    <div v-if="loading">
      <Spinner></Spinner>
    </div>
    <div v-if="error">{{ error.message }} episodes</div>
    <div v-else
      class="bg-[#183f5ae9] pl-4 pr-6 lg:px-8 py-5 rounded-lg shadow-[1px_2px_4px] shadow-cyan-600 pb-16">
      <h2 class="text-center text-2xl mb-5">Episodes</h2>
      <div v-if="selectedSeason !== null"
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 justify-around max-h-96 overflow-y-scroll">

        <div v-for="episode in episodesForSelectedSeason"
          :key="episode.id">
          <router-link
            :to="{ name: 'EpisodePage', params: { id: episode.id } }">
            <div
              class="sm:w-52 md:w-[70%] h-28 xl:w-[80%] flex flex-col items-center justify-center border-[1px]  border-green-600 rounded-lg relative cursor-pointer bg-[#0f334dc9] hover:bg-[#0E1C36] transition-all px-2">
              <p class="">
                {{ episode.episode }}
              </p>
              <p
                class="text-md text-center font-semibold text-orange-500">
                {{ episode.name }}
              </p>
            </div>
          </router-link>
        </div>

        <router-link v-if="!isHomePath" to="/"
          class="absolute left-7 top-11 sm:left-50 sm:top-10">
          <button @click="scrollToTop"
            class="mt-3 border-[1px] px-3 py-1 border-orange-700 bg-[#352e1fb4] hover:bg-[#31462091]">
            Home
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>