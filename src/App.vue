<template>
  <div id="app">
    <router-view></router-view>       <!--使用该标签后，配置的路由在该页面内生效，路由对应的组件也被引入-->
    
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;
}
</style>
