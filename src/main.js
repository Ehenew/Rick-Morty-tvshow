// import { createApp } from 'vue'
import { createApp, provide, h, computed } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createWebHistory, createRouter, useRoute } from 'vue-router';

import './style.css';
import App from './App.vue';

import Home from './components/HomeViews/Home.vue';
import EpisodeList from './components/HomeViews/Episodes.vue';
import CharacterList from './components/HomeViews/Characters.vue';
import LocationList from './components/HomeViews/Locations.vue';

import LocationPage from './components/PageViews/LocationPage.vue';
import CharacterPage from './components/PageViews/CharacterPage.vue';
import EpisodePage from './components/PageViews/EpisodePage.vue';


// Graphql configuration
const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: 'https://rickandmortyapi.com/graphql',
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});


export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); 
};

export function useScrollToTop() {
  const route = useRoute();
  const isHomePath = computed(() => route.path === '/');

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return {
    isHomePath,
    scrollToTop
  };
}




// Router configuration
const routes = [
  { path: '/', component: Home },
  { path: '/episode', component: EpisodeList },
  { path: '/character', component: CharacterList },
  { path: '/location', component: LocationList },

  { path: '/episode/:id', name: 'EpisodePage', component: EpisodePage, props: true },
  { path: '/location/:id', name: 'LocationPage', component: LocationPage, props: true },
  { path: '/character/:id', name: 'CharacterPage', component: CharacterPage, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router).mount('#app');






