<script setup>
import { ref } from 'vue';
const activeLink = ref('Home');
const menuOpen = ref(false);


const links = [
  { name: 'Home', href: '#' },
  { name: 'Episodes', href: '#episodes' },
  { name: 'Characters', href: '#characters' },
  { name: 'Locations', href: '#locations' }
];


const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const handleClick = (linkName, href) => {
  activeLink.value = linkName;
  menuOpen.value = false;

  if (href === '#') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } else {
    const targetElement = document.querySelector(href);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - document.querySelector('nav').offsetHeight,
        behavior: 'smooth'
      });
    }
  }
};
</script>

<template>
  <nav
    class="flex justify-between items-center py-1 fixed top-0 left-0 w-full z-10 bg-[#0D2A3F] pr-6">
    <a href="#">
      <img class="w-16 sm:w-24 rounded-full"
        src="/src/assets/img/logo.png" alt="Logo"></a>
    <div class="sm:hidden" @click="toggleMenu">
      <i v-if="!menuOpen"
        class="lni lni-menu text-[24px] text-gray-300 cursor-pointer absolute right-6 top-3"></i>
      <i v-else
        class="lni lni-close text-[20px] text-gray-300 cursor-pointer absolute right-6 top-3"></i>
    </div>
    <div
      :class="['sm:flex gap-6', { 'hidden': !menuOpen, 'flex': menuOpen }]">
      <div v-if="menuOpen"
        class="flex flex-col absolute top-10 pb-2 items-center left-0 w-full bg-[#0D2A3F] z-20">
        <a v-for="link in links" :key="link.name"
          :href="link.href" :class="[
            'font-medium',
            'hover:text-gray-400',
            { 'text-orange-500': activeLink === link.name, 'text-gray-300': activeLink !== link.name }
          ]"
          @click.prevent="handleClick(link.name, link.href)"
          class="py-2 px-4">
          {{ link.name }}
        </a>
      </div>
      <div class="hidden sm:flex gap-6">
        <a v-for="link in links" :key="link.name"
          :href="link.href" :class="[
            'font-medium',
            'hover:text-gray-400',
            { 'text-orange-500': activeLink === link.name, 'text-gray-300': activeLink !== link.name }
          ]"
          @click.prevent="handleClick(link.name, link.href)">
          {{ link.name }}
        </a>
      </div>
    </div>
  </nav>
</template>
<style scoped>
</style>
