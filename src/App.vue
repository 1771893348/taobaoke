<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
   
    <!-- <router-link to="/HelloWorld">HelloWorld</router-link>
    <router-link to="/Search">Search</router-link> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {};
  },
  methods:{}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: .6rem; */
}
</style>
