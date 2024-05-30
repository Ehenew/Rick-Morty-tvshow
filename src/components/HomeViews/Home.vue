<script setup>
import NavBar from './NavBar.vue';
import Carousel from './Carousel.vue';
import Episodes from './Episodes.vue';
import Characters from './Characters.vue';
import Locations from './Locations.vue';
import CreatorsAndStars from './Creators.vue';
</script>

<template>
  <div class="bg-hero-image h-screen bg-cover">
    <NavBar />
    <div
      class="px-6 sm:px-12 py-4 my-12 sm:my-16 sm:bg-[#3130304c] bg-[#313030a2]">
      <div class="grid lg:grid-cols-[2.2fr,1fr] gap-12">
        <div class="lg:w-[60%]">
          <h1
            class="text-[#E19707] text-4xl sm:text-5xl sm:text-left text-center">
            Rick and Morty
          </h1>
          <p
            class="text-[#55eaf5] sm:bg-none text-2xl lg:text-3xl sm:text-left text-center sm:mt-0 mt-3">
            Embark on
            Interdimensional Adventures!</p>
          <div
            class="flex items-center justify-center sm:justify-start gap-1">
            <img src="/src//assets/img/stars.png" alt=""
              class="w-24">
            <span
              class="pt-2 text-xl font-bold text-lime-500">9.1</span>
            <span class="font-bold pt-2"> (IMDb)
            </span>
          </div>

          <div
            class="flex bg-teal-950  mt-6 relative rounded-md w-80 sm:w-96">
            <Carousel />
          </div>
          <div class="details sm:p-2 w-[100%] pt-3">
            <div
              class="flex gap-1 sm:gap-3 items-center text-xs sm:text-[16px]">
              <span
                class="inline text-orange-400 text-[16px]">Gener:</span>
              <span
                class="text-gray-300 px-1 sm:px-2 sm:py-1 border-[1px] border-lime-700 rounded-full cursor-pointer hover:bg-lime-900">Animation</span>
              <span
                class="text-gray-300 px-1 sm:px-2 sm:py-1 border-[1px] border-lime-700 rounded-full cursor-pointer hover:bg-lime-900">Scientific
                Fiction</span>
              <span
                class="text-gray-300 px-1 sm:px-2 sm:py-1 border-[1px] border-lime-700 rounded-full cursor-pointer hover:bg-lime-900">Adventure</span>
            </div>

            <div class="flex gap-3 ">
              <span class="text-orange-400">Creators:</span>
              <p>Jusitin <span
                  class="text-orange-500">Roiland
                </span> &amp;</p>
              <p>Dan <span
                  class="text-orange-500">Harmon</span></p>
            </div>

            <div class="flex gap-3">
              <span class="text-orange-400">Stars:</span>
              <span>Justin Roiland, Chris Parnell, Sarah
                Chalke, <br> Spencer Grammer...</span>
            </div>
          </div>
        </div>

        <div class="sm:ml-6">
          <h2 class="text-orange-500 text-2xl">About
          </h2>
          <p
            class="text-gray-300 mb-6 leading-5 sm:leading-6">
            Rick and
            Morty is American
            adult
            animated science fiction sitcom aired on
            Cartoon
            Network's Adult Swim. The series follows the
            misadventures of Rick Sanchez, a cynical mad
            scientist, and his good-hearted but fretful
            grandson Morty Smith. They split their time
            between domestic life and interdimensional
            adventures across infinite realities, often
            traveling to other planets and dimensions
            through
            portals and on Rick's flying saucer. The show
            juxtaposes domestic family drama with a
            misanthropic grandfather dragging his grandson
            into hijinks.
          </p>
          <a class="px-4 py-2 bg-[#85bdde4e] rounded-full border-[1px] border-lime-600 hover:bg-orange-800 transition-all"
            href="#creators">See more</a>
        </div>
      </div>
    </div>
    <CreatorsAndStars id="creators" class="mb-12" />
    <Episodes id="episodes" class="mb-12" />
    <Characters id="characters" class="mb-6" />
    <Locations id="locations" class="mb-16" />
    <div
      class="footer border-r-4 border-cyan-400 mx-10 flex flex-col items-center bg-[#092E49] gap-4 py-6 sm:py-12 sm:rounded-[100%_0%_0%_0%]">
      <div class="links flex gap-3 sm:mt-6">
        <a href="https://github.com/Ehenew/Rick-Morty.git"
          alt="Github repostitory" target="_blank">
          <i
            class="lni lni-github-original hover:text-gray-400 text-2xl"></i>
        </a>
        <a href="https://www.figma.com/design/CbRKDSXDJ8Z93lD4BVz1dZ/Rick%26Morty?node-id=0%3A1&t=7gYqdTeymjoxgF2f-1"
          alt="Design on Figma" target="_blank">
          <i
            class="lni lni-figma hover:text-gray-400 text-2xl"></i>
        </a>
      </div>
      <p class="text-xl">&copy; 2024 By Ehenew Amogne</p>
    </div>
  </div>
</template>
<style scoped>
</style>