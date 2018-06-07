// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import ElPagination from 'element-pagination'
import VueRouter from 'vue-router'

var moment = require('moment')
var momentDurationFormatSetup = require('moment-duration-format')
momentDurationFormatSetup(moment)

moment.locale(navigator.language)
Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('L LTS')
  }
})
Vue.filter('formatDuration', function (value) {
  if (value) {
    return moment.duration(value, 'second').format()
  }
})

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.component('el-pagination', ElPagination)

Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'

Vue.mixin({
  data: function () {
    return {
      get baseUrl () {
        return 'http://192.168.13.45:8888'
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  render: h => h(App),
  template: '<App/>'
})
