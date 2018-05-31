<template>
  <div class="commandslist">
    <el-container>
    <el-header>
      <el-input
        prefix-icon="el-icon-search"
        placeholder="Search"
        v-model="cmd_filter"
        clearable>
      </el-input>
    </el-header>
    <el-main>
      <el-table :data="commands" stripe border
        @sort-change="handleSortChange">
        <el-table-column prop="cmd" label="Command" sortable />
        <el-table-column label="Timing" sortable>
          <template slot-scope="scope">
            <span>{{ scope.row.timing | formatDate }}</span>
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
  name: 'commandslist',
  data () {
    return {
      commands: [],
      cmd_filter: '',
      session: '0060bba3-e777-4197-8dc2-c8d8e8e23a42',
      page_size: 15,
      total: 0,
      current_page: 1,
      sort: {'timing': false}
    }
  },
  methods: {
    updateSource: function () {
      let uri = `http://192.168.13.45:8888/command?page=${this.current_page}&per_page=${this.page_size}&sort=${encodeURI(JSON.stringify(this.sort))}`
      let filter = null
      if (this.session) {
        if (!filter) {
          filter = {}
        }
        filter['session'] = this.session
      }
      if (this.cmd_filter) {
        if (!filter) {
          filter = {}
        }
        filter['cmd'] = this.cmd_filter
      }
      if (filter) {
        uri += `&where=${encodeURI(JSON.stringify(filter))}`
      }
      this.$http.get(uri)
        .then(response => {
          this.commands = response.body
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
    cmd_filter: function () {
      this.updateSource()
    }
  }
}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.3.5/lib/theme-chalk/index.css");
</style>
