<template>
  <div id='app'>
    <div id='nav'>
      <navbar />
      <img
        src='./assets/Aktuelles_Hochschule_Deggendorf.jpg'
        class='img-fluid w-100 h-25 header-img'
        alt='THD Campus'
      />
    </div>
    <router-view />
    <thdfooter />
  </div>
</template>

<style lang='scss'>
//  global imports
//  import the Bootstrap scss files and the other scss attributs
@import './assets/app.scss';

//  global style

#app {
  font-family: Saira, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

@include media-breakpoint-down(md) {
  .header-img {
    display: none;
  }
}
</style>

<script>
//  global imports

//  import bootstrap javaScripts allows dynamic components like Dropdowns to work
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
//  import the js code ofthe navigationbar component
import navbar from './components/navbar.vue'
import thdfooter from './components/thdfooter.vue'

// global script
export default {
  name: 'App',
  components: {
    navbar,
    thdfooter
  }
}
</script>

<!--
<template>
  <img alt='Vue logo' src='./assets/logo.png'>
  <HelloWorld msg='Welcome to Your Vue.js App'/>
</template>
-->
