<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import VueRouter from 'vue-router'

import Sessionslist from './components/Sessionslist'
import Commandslist from './components/Commandslist'
import SessionTerm from './components/SessionTerm'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Sessionslist },
    { path: '/session', name: 'session', component: Commandslist },
    { path: '/session-term', name: 'session-term', component: SessionTerm }
  ]
})

export default {
  router,
  name: 'app'
}
</script>

<style>
  #app {
    padding-top: 20px;
  }
</style>
