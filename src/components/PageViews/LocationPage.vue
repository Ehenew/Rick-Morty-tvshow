<script setup>
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { formatDate } from "/src/main.js";
import { useRoute } from 'vue-router';
import Spinner from '../Spinner.vue';

const id = useRoute().params.id;

const locationQuery = gql`
query{
  location(id:${ id }){
    id
    name
    type
    dimension
    created    
    residents{
      id
      name
      status
      species
      gender
      image
      }      
    }
  }`;

const { result, loading, error } = useQuery(locationQuery);
</script>

<template>
  <div class="bg-location-cover bg-cover">
    <div v-if="loading">
      <Spinner></Spinner>
    </div>
    <div v-if="error"> {{ error.message }}
    </div>
    <div v-if="result"
      class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300 bg-[#33452283] px-6 sm:px-32 py-6 rounded-lg h-screen">
      <div
        class="sm:col-start-2 sm:row-start-1 font-semibold text-xl">
        <h2 class="text-2xl text-orange-400 mb-2 font-bold">
          {{ result.location.name}}
        </h2>
        <p>Type: <span
            class="text-green-400 ml-1">{{ result.location.type }}</span>
        </p>
        <p>Dimension: <span
            class="text-green-400 ml-1">{{ result.location.dimension }}</span>
        </p>
        <p>Created on: <span
            class="text-green-400 ml-1">{{ formatDate(result.location.created) }}</span>
        </p>
      </div>

      <div
        class="sm:col-start-2 bg-[#242c44d3] px-2 py-2 rounded-lg w-96 text-gray-300 border-[1px] border-cyan-600">
        <div class="flex gap-12 items-center py-1">
          <h2 class="text-xl">
            Residents ({{ result.location.residents.length
            }})</h2>
          <i class="lni lni-chevron-down text-xl"></i>
        </div>

        <div class="p-2 overflow-y-scroll max-h-80">
          <div v-for="resident in result.location.residents"
            :key="resident" class=" gap-4 border-b-[1px]
            border-gray-600 py-1">
            <router-link
              :to="{name: 'CharacterPage', params:{id: resident.id}}">
              <div
                class="flex gap-4 items-center py-1 px-4 hover:bg-[#7560c07a] rounded-md">
                <img class="w-24 h-24 rounded-md"
                  :src="resident.image" alt="">
                <div class="text-[18px]">
                  <h2 class="text-xl text-orange-400 mb-1">
                    {{resident.name}}
                  </h2>
                  <p :class="{
                  'text-green-400': resident.status === 'Alive',
                  'text-red-500': resident.status === 'Dead'
                }">
                    {{ resident.status }} <span
                      class="text-gray-200">&mdash;
                      {{ resident.species }}</span>
                  </p>
                  <p class="text-gray-300">Gender: <span
                      class="text-gray-200 ml-2">{{ resident.gender }}</span>
                  </p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="flex gap-8 row-start-1">
        <router-link to="/location">
          <button class="mt-3 px-2 py-1">&larr;
            Back</button>
        </router-link>
        <router-link to="/">
          <button class="mt-3 py-1 px-2">
            Home</button>
        </router-link>
      </div>

      <div
        class="flex gap-4 px-10 py-2 ml-4  bg-[#3333334c] w-fit h-fit sm:absolute bottom-6">
        <a href="https://github.com/Ehenew/Rick-Morty.git"
          alt="Github repostitory" target="_blank">
          <i
            class="lni lni-github-original hover:text-gray-400 text-2xl"></i>
        </a>
        <a href="https://www.figma.com/design/8Z8xR6g3MxrXWGedvVwy6y/Rick-%26-Morty---Location-Page?node-id=0-1&t=tRUPpgpFLqi2SKqH-1"
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
