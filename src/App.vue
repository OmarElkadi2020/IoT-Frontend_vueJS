<template>
  <div id="app">
    <div id="nav">
      <navbar/>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
//  import the Bootstrap scss files and the other scss attributs
@import './assets/app.scss';
</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
//  import bootstrap javaScripts allows dynamic components like Dropdowns to work
import '../node_modules/bootstrap/dist/js/bootstrap'

//  import the navigationbar component
import navbar from './components/navbar.vue'

export default {
  name: 'App',
  components: {
    navbar
  }
}
</script>

<!--
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>
-->
