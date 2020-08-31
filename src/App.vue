<template>
  <v-app>
    <Print />
    <Designer />
  </v-app>
</template>

<script>
import Designer from '@/components/Designer';
import Print from '@/components/Print';
import './assets/print.css';

import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Designer,
    Print,
  },
  computed: {
    ...mapGetters([
    ]),
  },
  data() {
    return {
      //
    };
  },
};
</script>

<style lang="scss">
  html {
    font-family: Roboto, Vazir;
  }
</style>
