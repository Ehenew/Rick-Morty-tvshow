<script setup>
import { ref } from 'vue';
const activeLink = ref('Home');

const links = [
  { name: 'Home', href: '#' },
  { name: 'Episodes', href: '#episodes' },
  { name: 'Characters', href: '#characters' },
  { name: 'Locations', href: '#locations' }
];

const handleClick = (linkName, href) => {
  activeLink.value = linkName;

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
      <img class="w-24 rounded-full"
        src="/src/assets/img/logo.png" alt="Logo"></a>
    <div class="flex gap-6">
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
  </nav>
</template>
<style scoped>
</style>
