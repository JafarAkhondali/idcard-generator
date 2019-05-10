<template>
  <div id="designer"
       v-bind:class="{folded}">
    <div class="logo">
      <h2 class="">
        ID Cart Generator
      </h2>
    </div>


    <div class="toolbox-toggle"  v-on:click="toggle">
      <i class="fas fa-chevron-left"></i>
    </div>

    <div class="designer-holder">
      <div class="designer-panel">
        <span class="header">Designer Options</span>
        <span class="divider"> Step 1 </span>
        <label class="input-file-label" for="img_file_picker"> Select Base Image
          <input type="file"
                 id="img_file_picker"
                 ref="img_file_picker"
                 class="input-file"
                 @change="img_file_changed()">
        </label>
        <span class="divider"> Step 2 </span>
        <label class="input-file-label" for="excel_file_picker"> Select Excel file
          <input type="file"
                 id="excel_file_picker"
                 ref="excel_file_picker"
                 class="input-file"
                 @change="excel_file_changed()">
        </label>



      </div>

      <div class="designer-preview">
        <span class="header">Cart Preview</span>
        <div id="img_preview" ref="img_preview" src=""></div>
      </div>

    </div>
    <Footer/>
  </div>
</template>

<script>

  import Footer from './Footer'
  import {readBlobAsArrayBuffer, readBlobAsUrl} from "../Helper/Helper";
  import XLSX from 'xlsx';


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
      },
      img_file_changed: async function () {
        try{
          const img_file = this.$refs.img_file_picker.files[0];
          let imgUrl = await readBlobAsUrl(img_file);
          this.$refs.img_preview.style.backgroundImage = `url(${imgUrl})`;
        }catch (e) {
          console.log("Error!: " + e.message)
        }
      },

      excel_file_changed: async function () {
        // const excel_file = this.$refs.img_file_picker.files[0];
        // let excelBlob = await readBlobAsUrl(excel_file);
        // const excelBuffer = await readBlobAsArrayBuffer(excelBlob);
        // let fixedData = fixdata(data);
        // let workbook = XLSX.read(btoa(fixedData), {type: 'base64'});
        // let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        // const headers = get_header_row(worksheet);
        // let results = XLSX.utils.sheet_to_json(worksheet);
        // let tickets = results;
        //

      },


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $main-color: #0288D1;
  $text-color: #f2f2f2;
  $side-padding: 10px;
  $height-padding: 20px;
  $designer-width: 60%;


  .input-file-label:hover{
    cursor: pointer;
  }
  .input-file-label{
    font-weight: 900;
    border: dashed 3px #f1f1f1;
    margin: 20px 0;
    padding: 5px;
    display: inline-block;

  }
  .input-file{
    display: none;
  }


  #designer, *{
    box-sizing: border-box;
  }
  #designer{

    width: $designer-width;
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
      transform: translateX(-100%);
      .toolbox-toggle i{
        transform: rotateY(180deg);
      }
    }


    .designer-holder{
      display: flex;
      height: 90%;
      flex-direction: row;
      position: relative;
      align-content: center;

      .designer-panel{
        #img_file_picker{
          display: none;
        }
      }

      .designer-panel, .designer-preview{
        /*flex-grow: 1;*/
        flex-basis: 100%;
        text-align: center;
        margin: 3px;
        display: flex;
        flex-direction: column;

        .divider{
          margin-top: 30px;
          position: relative;
          text-shadow: 1px 1px 1px $main-color;
          font-weight: 900;
          &::before, &::after {
            content: ' ';
            border-top: $text-color solid 1px;
            width: 40%;
            display: inline-block;
            top: 10px;
            position: absolute;
            //left: 50%;
            //transform: translateX(-50%);
            z-index: 1;
          }
          &::before{
            left: 0;
          }
          &::after{
            right: 0;
          }
        }


        .header{
          border-bottom: 2px solid $text-color;
          font-weight: 900;
          font-size: 1.25em;
        }
      }

      .designer-preview{
        flex-basis: 200%;
        #img_preview{
          margin: 20px 0;
          width: 100%;
          height: 100%;
          background-size: contain;
          background-position: 50% 50%;
        }
      }
    }



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
      left: 100%;
      top: calc( 50% - #{$btn-size} );
      background: #4FC3F7;
      color: $text-color;
      padding: 13px 6px 13px 3px;
      text-align: center;
    }

    .logo{
      text-align: center;
    }


  }









</style>
