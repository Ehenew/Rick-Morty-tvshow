<script setup>
import { useRoute } from 'vue-router';
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { formatDate } from "../../main";


const id = useRoute().params.id;
const characterQuery = gql`
  query {
    character(id:${ id }){
      name
      status
      gender
      species
      image
      episode{
        id
        name
        air_date
        episode
        created
      }
      location{
        id
        name
      }
    }
  }
`;

const { result, error, loading } = useQuery(characterQuery);
</script>

<template>
  <div class="px-4 sm:px-10 py-2 bg-[#3a3737be] h-screen">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else
      class="grid grid-cols-1 md:grid-cols-[2fr,1.5fr] gap-x-12 gap-y-8 items-start">
      <div
        class="flex flex-col lg:flex-row gap-3 items-center rounded-md overflow-hidden bg-sky-950 font-medium shadow-[1px_2px_4px] shadow-cyan-600 w-fit">
        <img class="w-[100%] lg:w-64"
          :src="result.character.image"
          alt="character Photo">
        <div
          class="flex flex-col gap-1 justify-center  md:items-start text-gray-400 px-2 md:px-4 lg:px-8 py-4">
          <h2 class="text-2xl text-orange-400">
            {{ result.character.name }}
          </h2>
          <p :class="{
            'text-green-500': result.character.status === 'Alive',
            'text-red-500': result.character.status === 'Dead'
          }">
            {{ result.character.status }} <span
              class="text-gray-200">&mdash;
              {{ result.character.species }}</span>
          </p>
          <p>Gender: <span
              class="text-green-500">{{ result.character.gender }}</span>
          </p>
          <div class="flex gap-2 items-center">
            <p>Last seen in:</p>
            <span><i
                class="lni lni-chevron-down text-xl ml-2 mt-1"></i></span>
          </div>
          <router-link
            :to="{ name: 'LocationPage', params: { id: result.character.location.id } }">
            <span
              class="px-4 py-2 text-lime-500 mt-4 ml-2 bg-[#565b524c] hover:bg-[#374258c3] border-[1px] border-cyan-600 rounded-full cursor-pointer ">{{ result.character.location.name }}</span>
          </router-link>
        </div>
      </div>

      <div
        class="bg-[#31476ee9] px-4 py-2 flex flex-col justify-center rounded-md w-fit">
        <h2 class="text-2xl py-1 px-1">Episodes ({{
          result.character.episode.length }})</h2>
        <div class="px-2 overflow-y-scroll max-h-96">
          <div v-for="episode in result.character.episode"
            :key="episode"
            class="text-gray-300 border-[1px] border-gray-500 bg-[#273651b2] hover:bg-sky-950 cursor-pointer px-4 py-3 rounded-md my-2">
            <router-link
              :to="{ name: 'EpisodePage', params: { id: episode.id } }">
              <div>
                <h2 class="text-orange-500 text-xl">
                  {{ episode.name }}
                </h2>
                <p>Air-date:
                  <span
                    class="text-green-400 ml-2">{{ episode.air_date }}</span>
                </p>
                <p>Episode: <span
                    class="text-green-400 ml-2">{{ episode.episode }}
                  </span>
                </p>
                <p>Date created:
                  <span
                    class="text-green-400 ml-2">{{ formatDate(episode.created) }}
                  </span>
                </p>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="flex gap-4 row-start-1 col-span-full">
        <router-link to="/character">
          <button
            class="mt-3 px-2 py-1 border-cyan-600">&larr;
            Back</button>
        </router-link>
        <router-link to="/">
          <button class="mt-3 px-2 py-1 border-cyan-600">
            Home</button>
        </router-link>
      </div>

      <div
        class="flex gap-4 justify-center bg-[#232323a0]  py-6 px-64 mx-2 absolute bottom-32">
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