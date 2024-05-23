<script setup>
import { defineComponent, ref } from 'vue';
import { Carousel, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const imageList = ref([
  { name: 'Sarah Charkel', image: 'sarah.jpg' },
  { name: 'Jusitn Roiland', image: 'justin.jpg' },
  { name: 'Spencer Grammer', image: 'grammer.jpg' },
  { name: 'Chris Parnell', image: 'parnell.webp' },
  { name: 'Raki Wahlgren', image: 'wahlgren.jpg' },
]);

defineComponent({
  name: 'CarouselStars',
  components: {
    Carousel,
    Slide,
    Pagination
  },
});
</script>

<template>
  <Carousel :autoplay="2000" :wrap-around="true">
    <Slide v-for="slide in imageList" :key="slide"
      class="flex flex-colgap-1">
      <h2 class="absolute top-0 left-2 bg-slate-500 px-2 text-center font-medium">
        {{ slide.name }}
      </h2>
      <img :src="`/src/assets/img/${slide.image}`" alt=""
        class="carousel__item">
    </Slide>

    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>

<style scoped>
.carousel{
  background-color: rgb(16, 39, 56);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #05af3e;
  position: relative;
  padding-top: 10px;
  width: 300px;
}

.carousel__item {
  /* width: 50%; */
  height: 400px;
  color: white;
  font-size: 20px;
  /* display: flex;
  justify-content: center;
  align-items: start; */
}

</style>
