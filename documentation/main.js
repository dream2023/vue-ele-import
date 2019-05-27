import Vue from 'vue'
import App from './App.vue'
import EasyGithubPages from 'easy-github-pages'
Vue.config.productionTip = false
Vue.component(EasyGithubPages.name, EasyGithubPages)
new Vue({
  render: h => h(App)
}).$mount('#app')
