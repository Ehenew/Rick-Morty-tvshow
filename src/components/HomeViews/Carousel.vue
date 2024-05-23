<script setup>
import { defineComponent, ref } from 'vue';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const imageList = ref([
  'slide-show-1.webp',
  'slide-show-2.jpg',
  'slide-show-3.jpg',
  'slide-show-4.jpg',
  'slide-show-5.jpg',
  'slide-show-6.jpg',
]);

defineComponent({
  name: 'CarouselComp',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
});
</script>

<template>
  <Carousel>
    <Slide v-for="slide in imageList" :key="slide">
      <img :src="`src/assets/img/${slide}`" alt=""
        class="carousel__item">
    </Slide>
    <slot></slot>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<style>
.carousel{
  background-color: rgb(16, 39, 56);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #05af3e;
  position: relative;
}

.carousel__item {
  height: 100%;
  width: 100%;
  color: white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
position: relative;

}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  background-color: rgb(248, 252, 255);
  border-radius: 50%;
  border: none;
  color: #067930;
}

.carousel__prev{
  left: -1%;
  
}
.carousel__next{
  right: -1%;
  
}

.carousel__pagination{ 
  background-color: rgba(178, 191, 174, 0.975);
  margin: 0;
}

.carousel__pagination-button--active::after{
  background-color: rgb(21, 69, 42);
}

.carousel__pagination-button::after{
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

</style>
