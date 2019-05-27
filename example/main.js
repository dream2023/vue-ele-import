import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import EleImport from '../src/index'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component(EleImport.name, EleImport)

new Vue({
  render: h => h(App)
}).$mount('#app')
