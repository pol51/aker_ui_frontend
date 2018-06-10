<template>
  <div class="sessionterm">
    <div id="terminal"></div>
  </div>
</template>
<script>
import { Terminal } from 'xterm'
import * as fit from 'xterm/lib/addons/fit/fit'
Terminal.applyAddon(fit)

export default {
  name: 'sessionterm',
  data () {
    return {
      session_log: null,
      term: new Terminal({cols: 120, rows: 50})
    }
  },
  methods: {
    updateSource: function () {
      const uri = `${this.baseUrl}/session/log?session_uuid=${this.$route.params['session']}`
      this.$http.get(uri)
        .then(response => {
          this.session_log = atob(response.body)
          this.term.open(document.getElementById('terminal'))
          this.term.fit()
          this.term.write(this.session_log)
        }, response => {
          console.log(response.data)
        })
    }
  },
  mounted () {
    this.updateSource()
  }
}
</script>
