<template>
  <div id="designer"
       v-bind:class="{folded}">
    <div
            class="designer-holder">

      <div class="logo">
        <h2 class="">
          ID Cart Generator
        </h2>
      </div>


      <div style="flex-grow: 1"></div>
      <Footer/>

      <div
              class="toolbox-toggle"
              v-on:click="toggle"
      >
        <i class="fas fa-chevron-left"></i>

      </div>
    </div>
  </div>
</template>

<script>

  import Footer from './Footer'

  export default {
    name: 'Designer',
    components:{
      Footer
    },
    props: {
      msg: String
    },
    data: ()=>{
      return {
        folded: false
      }
    },
    methods:{
      toggle: function(){
        this.folded = !this.folded;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $main-color: #0288D1;
  $text-color: #f2f2f2;
  $side-padding: 10px;
  $height-padding: 20px;

  #designer, *{
    box-sizing: border-box;
  }
  #designer{

    width: 300px;
    position: fixed;
    padding: $height-padding $side-padding;
    top: 0;
    left: 0;
    bottom: 0;
    transition: all .6s ease-out;
    background: linear-gradient(to bottom, #4FC3F7,#03A9F4, $main-color);
    color: $text-color;
    transform-style: preserve-3d;
    transform: translateX(0px);
    &.folded{
      transform-style: preserve-3d;
      transform: translateX(-300px);
      .toolbox-toggle i{
        transform: rotateY(180deg);
      }
    }

    .designer-holder{
      .logo{
        text-align: center;
      }
      display: flex;
      flex-direction: column;
      position: relative;
      height: 100%;
      .toolbox-toggle{
        border-top-right-radius: 100px;
        border-bottom-right-radius: 100px;

        i{
          transition: all .6s;
          transform-style: preserve-3d;
        }
        cursor: pointer;
        position: absolute;
        $btn-size: 40px;
        width: $btn-size;
        right: calc(#{-$btn-size} + #{-$side-padding});
        top: calc( 50% - #{$btn-size} );
        background: #4FC3F7;
        color: $text-color;
        padding: 13px 6px 13px 3px;
        text-align: center;
      }
    }
  }









</style>
