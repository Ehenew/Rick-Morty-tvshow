<script setup>
import Carousel from './Carousel2.vue';
</script>

<template>
  <div class="sm:flex justify-between sm:my-6 my-2 mx-6 sm:mx-12"
    id="creators">
    <div class="flex flex-col gap-4">
      <div>
        <h2 class="text-2xl text-orange-500 mb-4">Creators
        </h2>
        <div
          class="flex rounded-md text-center overflow-hidden">
          <div>
            <img src="/src/assets/img/roiland.jpg" alt=""
              class=" h-64 mb-1">
            <h2>Justin Roiland</h2>
          </div>

          <div>
            <img src="/src/assets/img/dan-harmon.jpg" alt=""
              class=" h-64 w-52 mb-1">
            <h2>Dan Harmon</h2>
          </div>
        </div>
      </div>
      <div>
        <h2 class="text-2xl text-orange-500 mb-3">Main
          Chracters</h2>
        <ul>
          <li>Rick Sanchez &mdash;<span
              class="text-[#09B2B2] ml-2">Justin
              Roiland</span></li>
          <li>Morty Smith &mdash;<span
              class="text-[#09B2B2] ml-2">Jusitin
              Roiland</span></li>
          <li>Jerry Smith &mdash;<span
              class="text-[#09B2B2] ml-2">Chris
              Parnel</span></li>
          <li>Summer Smith &mdash;<span
              class="text-[#09B2B2] ml-2">Spencer
              Grammer</span></li>
          <li>Beth Smith &mdash;<span
              class="text-[#09B2B2] ml-2">Sarah
              Chalke</span></li>
        </ul>
      </div>
    </div>

    <div>
      <h2 class="text-2xl text-orange-500 mb-4">Stars
      </h2>
      <Carousel />
    </div>
  </div>
</template>
<style scoped>
</style>