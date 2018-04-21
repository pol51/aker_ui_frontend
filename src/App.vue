<template>
  <div class="container" id="app">
    <Sessionslist></Sessionslist>
  </div>
</template>

<script>
import Sessionslist from './components/Sessionslist'
export default {
  name: 'app',
  components: {
    Sessionslist
  }
}
</script>

<style>
  #app {
    padding-top: 20px
  }
</style>
