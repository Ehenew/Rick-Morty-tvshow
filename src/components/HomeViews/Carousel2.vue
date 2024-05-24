<script setup>
import { defineComponent, ref } from 'vue';
import { Carousel, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';

const imageList = ref([
  { name: 'Sarah Chalke', image: 'https://media.themoviedb.org/t/p/w500/ycwiu89cpjqCtSNC5FjbJggjj5R.jpg' },
  { name: 'Jusitn Roiland', image: 'https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/2/2f/Justin_Roiland.jpg' },
  { name: 'Spencer Grammer', image: 'https://m.media-amazon.com/images/M/MV5BMTkxNjE0NzAxMF5BMl5BanBnXkFtZTcwNjQyMjQ4Mg@@._V1_FMjpg_UX1000_.jpg' },
  { name: 'Chris Parnell', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Chris_Parnell_by_Gage_Skidmore.jpg/1200px-Chris_Parnell_by_Gage_Skidmore.jpg' },
  { name: 'Raki Wahlgren', image: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQJMXj0d25Qbwhw4pkepnrUVArs1gLN2d86Mwsdvcx-bYbODf3Me2gs7qqFsKuN41oyQpEssD3faJh8Ud0' },
]);
// const imageList = ref([
//   { name: 'Sarah Charkel', image: 'sarah.jpg' },
//   { name: 'Jusitn Roiland', image: 'justin.jpg' },
//   { name: 'Spencer Grammer', image: 'grammer.jpg' },
//   { name: 'Chris Parnell', image: 'parnell.webp' },
//   { name: 'Raki Wahlgren', image: 'wahlgren.jpg' },
// ]);

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
  <Carousel :autoplay="3000" :wrap-around="true">
    <Slide v-for="image in imageList" :key="image"
      class="flex flex-colgap-1">
      <h2 class="absolute top-0 left-2 bg-slate-500 px-2 text-center font-medium">
        {{ image.name }}
      </h2>
      <img :src="`${image.image}`" alt=""
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
  height: 400px;
  color: white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: start;
}

</style>
