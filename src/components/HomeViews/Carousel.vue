<script setup>
import { defineComponent, ref } from 'vue';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const imageList = ref([
  'https://media.newyorker.com/photos/59e78cef57e38e49cd315477/master/w_1920,c_limit/Patterson-Rick-and-Morty-Show-We-Need-American-Apocalypse.jpg',
  'https://c4.wallpaperflare.com/wallpaper/410/59/609/tv-rick-sanchez-morty-smith-rick-and-morty-wallpaper-preview.jpg',
  'https://cdn.vox-cdn.com/thumbor/l5bnvf5oZL_KljapelfEfX1Y7AI=/1400x1050/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/9028267/Screen_Shot_2017_08_10_at_9.45.00_AM.png',
  'https://www.indiewire.com/wp-content/uploads/2022/10/Rick-Morty-Season-6-Plates.png',
  'https://static.independent.co.uk/2021/08/10/13/newFile-5.jpg?quality=75&width=1200&auto=webp',
  'https://i0.wp.com/www.thewrap.com/wp-content/uploads/2023/08/rick-and-morty-5.jpg?fit=1200%2C675&ssl=1',
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
  <Carousel :autoplay="2000" :wrap-around="true">
    <Slide v-for="image in imageList" :key="image">
      <img :src="`${image}`" alt="Image"
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
  width:400px;
}


.carousel__item {
  height: 230px;
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
