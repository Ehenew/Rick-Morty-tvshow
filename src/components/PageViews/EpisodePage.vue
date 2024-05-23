<script setup>
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { formatDate } from "/src/main.js";
import { useRoute } from 'vue-router';

const id = useRoute().params.id;

const episodeQuery = gql`
  query {
    episode(id: ${ id }) {
      id
      name
      air_date
      episode
      created
      characters {
        id
        name
        status
        gender
        species
        image
      }
    }
  }
`;

const { result, loading, error } = useQuery(episodeQuery);

</script>

<template>
  <div
    class="bg-episode-cover bg-cover justify-center items-center ">
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error.message }}</div>
    <div v-if="result"
      class="grid grid-cols-[3fr,2fr] gap-x-12 gap-y-4 justify-center items-start rounded-md px-6 py-1 md:px-16 text-gray-300 font-medium h-screen bg-[#232323bd]">
      <div class="flex flex-col justify-center text-xl m-6">
        <h2 class="text-orange-500 text-3xl mb-1">
          {{ result.episode.name }}
        </h2>
        <p>Episode: <span
            class="text-green-400 ml-2">{{ result.episode.episode }}
          </span>
        </p>
        <p>Air-date:
          <span
            class="text-green-400 ml-2">{{ result.episode.air_date }}</span>
        </p>
        <p>Date created:
          <span
            class="text-green-400 ml-2">{{ formatDate(result.episode.created) }}
          </span>
        </p>
      </div>

      <div class="bg-[#183E5A] px-4 py-2 rounded-lg">
        <p class="text-2xl">
          Characters ({{ result.episode.characters.length
          }})</p>
        <div
          class="flex flex-col gap-2 my-6 px-2 overflow-y-scroll max-h-80">
          <div
            v-for="character in result.episode.characters"
            :key="character.id">

            <router-link
              :to="{ name: 'CharacterPage', params: { id: character.id } }">
              <div
                class="flex gap-6 items center border-b-[1px] bg--950 border-teal-700 hover:bg-[#1c352fe7] py-2 px-4 rounded-md">
                <img :src="character.image" alt=""
                  class="w-20 h-20 rounded-sm">
                <div class="flex flex-col text-[#c3bebe]">
                  <h3 class="text-orange-600 text-[20px]">
                    {{ character.name }}
                  </h3>
                  <p :class="{
                    'text-green-500': character.status === 'Alive',
                    'text-red-500': character.status === 'Dead'
                  }">
                    {{ character.status }} <span
                      class="text-gray-200">&mdash;
                      {{ character.species }}</span>
                  </p>
                  <p>Gender: <span
                      class="text-green-500 ml-2">{{ character.gender }}</span>
                  </p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="flex gap-8 row-start-1 col-span-full">
        <router-link to="/episode">
          <button class="mt-4 px-2 py-1">&larr;
            Back</button>
        </router-link>
        <router-link to="/">
          <button class="mt-4 px-2 py-1">
            Home</button>
        </router-link>
      </div>
      <div
        class="flex gap-4 items-center justify-center bg-[#232323a0] py-6">
        <a href="#" alt="Github repostitory"
          target="_blank">
          <i
            class="lni lni-github-original hover:text-gray-400 text-2xl"></i>
        </a>
        <a href="https://www.figma.com/design/CbRKDSXDJ8Z93lD4BVz1dZ/Rick%26Morty?node-id=0%3A1&t=7gYqdTeymjoxgF2f-1"
          alt="Design on Figma" target="_blank">
          <i
            class="lni lni-figma hover:text-gray-400 text-2xl"></i>
        </a>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>