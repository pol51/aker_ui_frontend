<template>
  <div id="app">
    <div id="terminal"></div>
  </div>
</template>
<script>
import { Terminal } from 'xterm'

export default {
  name: 'sessionTerm',

  data () {
    return {
      session_log: null,
      term: null
    }
  },
  methods: {
    updateSource: function () {
      const uri = `${this.baseUrl}/session/log?session_uuid=${this.$route.params['session']}`
      this.$http.get(uri)
        .then(response => {
          this.session_log = response.body

          this.term.clear()
          this.term.write(atob(this.session_log))
        }, response => {
          console.log(response.data)
        })
    }
  },
  created: function () {
    this.term = new Terminal({cols: 120, rows: 50})
    this.term.open(document.getElementById('terminal'))
    this.updateSource()
  }
}
</script>
