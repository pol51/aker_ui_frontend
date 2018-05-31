<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import VueRouter from 'vue-router'

import Sessionslist from './components/Sessionslist'
import Commandslist from './components/Commandslist'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Sessionslist },
    { path: '/session', component: Commandslist }
  ]
})

export default {
  router,
  name: 'app',
  components: {
    Sessionslist,
    Commandslist
  }
}
</script>

<style>
  #app {
    padding-top: 20px;
    height:100%;
  }
</style>
