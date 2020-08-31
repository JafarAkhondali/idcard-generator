import Vue from 'vue';
import VueDraggableResizable from 'vue-draggable-resizable';

import store from './store';
import './plugins/vuetify';
import App from './App.vue';

// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

Vue.component('VueDraggableResizable', VueDraggableResizable);

Vue.config.productionTip = false;


new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app');
