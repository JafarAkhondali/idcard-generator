<template>
  <v-app>
    <Designer></Designer>
  </v-app>
</template>

<script>
  import Designer from './components/Designer'

  export default {
    name: 'App',
    components: {
      Designer
    },
    data () {
      return {
        //
      }
    }
  }
</script>
