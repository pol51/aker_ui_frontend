<template>
  <div class="sessionlist">
    <el-main>
      <el-input
        prefix-icon="el-icon-search"
        placeholder="Search"
        v-model="filter"
        clearable>
      </el-input>
      <el-table :data="sessions" stripe border>
        <el-table-column prop="uuid" label="Uuid" />
        <el-table-column label="User@Host">
          <template slot-scope="scope">
            <span>{{ scope.row.user.username }}@{{ scope.row.host.hostname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Start" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.start | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Duration" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.duration | formatDuration }}</span>
          </template>
        </el-table-column>

      </el-table>
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'sessionslist',
  props: ['source'],
  data () {
    return {
      sessions: [],
      filter: ''
    }
  },
  methods: {
    updateSource: function (source) {
      var uri
      if (this.filter) {
        uri = 'http://192.168.13.45:8888/session?where=' + this.filter
      } else {
        uri = 'http://192.168.13.45:8888/session'
      }
      this.$http.get(uri)
        .then(response => {
          console.log(response.data)
          this.sessions = response.body
        }, response => {
          console.log(response.data)
        })
    }
  },
  created: function () {
    this.updateSource(this.source)
  },
  watch: {
    filter: function (val) {
      this.updateSource(val)
    }
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.3.5/lib/theme-chalk/index.css");
</style>
