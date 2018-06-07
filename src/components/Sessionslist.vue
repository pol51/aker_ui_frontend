<template>
  <div class="sessionlist">
    <el-container>
    <el-header>
      <el-input
        prefix-icon="el-icon-search"
        placeholder="Search"
        v-model="filter"
        clearable>
      </el-input>
    </el-header>
    <el-main>
      <el-table :data="sessions" stripe border
        @sort-change="handleSortChange">
        <el-table-column label="Uuid" sortable>
          <template slot-scope="scope">
            <router-link :to="{name:'session', params: { session: scope.row.uuid }}" exact>{{ scope.row.uuid}}</router-link>
          </template>
        </el-table-column>
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
        <el-table-column label="End" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.end | formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Duration">
          <template slot-scope="scope">
            <span>{{ scope.row.duration | formatDuration }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Play" width="50" align="center">
          <template slot-scope="scope">
            <router-link :to="{name:'session-term', params: { session: scope.row.uuid }}" exact>
              <i class="el-icon-caret-right"/>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer style="text-align: center">
      <el-pagination
        @current-change="handlePaginatorSelectPage"
        :page-size="page_size"
        :total="total"
        :current-page="current_page"
        layout="prev, pager, next"
        >
      </el-pagination>
    </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'sessionslist',
  data () {
    return {
      sessions: [],
      filter: '',
      page_size: 15,
      total: 0,
      current_page: 1,
      sort: {}
    }
  },
  methods: {
    updateSource: function () {
      let uri = `${this.baseUrl}/session?page=${this.current_page}&per_page=${this.page_size}&sort=${encodeURI(JSON.stringify(this.sort))}`
      if (this.filter) {
        uri += `&where=${encodeURI(this.filter)}`
      }
      this.$http.get(uri)
        .then(response => {
          this.sessions = response.body
          this.total = parseInt(response.headers.get('X-Total-Count'))
        }, response => {
          console.log(response.data)
        })
    },
    handlePaginatorSelectPage: function (currentPage) {
      this.current_page = currentPage
      this.updateSource()
    },
    handleSortChange: function (sort) {
      this.sort = {}
      try {
        this.sort[sort.column.label.toLowerCase()] = sort.column.order === 'ascending'
      } catch (e) {
      }
      this.updateSource()
    }
  },
  created: function () {
    this.updateSource()
  },
  watch: {
    filter: function () {
      this.updateSource()
    }
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.3.5/lib/theme-chalk/index.css");
</style>
