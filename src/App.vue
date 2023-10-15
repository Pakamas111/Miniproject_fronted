<template>

  <v-app>
    <bar/>
    <div>
    <v-main> 
      <router-view/>
    </v-main>
    </div>
    <footer/>
  </v-app>
</template>

<script>
import bar from "./components/Bar.vue";
import slide from './components/Slide.vue';
import footer from './components/Footer.vue'

export default {
  name: "App",

  components: {
    bar, slide, footer
  },

  data: () => ({
    
  }),
};
</script>
