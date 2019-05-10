import Vue from 'vue'
import store from './store'
import './plugins/vuetify'
import App from './App.vue'

// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import VueDraggableResizable from 'vue-draggable-resizable'
Vue.component('vue-draggable-resizable', VueDraggableResizable);


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store: store
}).$mount('#app')
