<template>
  <div
    id="designer"
    :class="{folded}"
  >
    <div class="logo">
      <h2 class="main-title">
        ID Cart Generator
      </h2>
    </div>

    <div
      class="toolbox-toggle"
      @click="toggle"
    >
      <div class="arrow-holder">
        <i
          class="fas"
          :class="{
            'fa-chevron-left': !folded,
            'fa-chevron-right': folded,
          }"
        />
      </div>
    </div>

    <div class="designer-holder">
      <div class="designer-panel">
        <span class="header">Designer Options</span>
        <span class="divider"> Step 1 </span>
        <label
          class="input-file-label"
          for="img_file_picker"
        > Select Base Image
          <input
            id="img_file_picker"
            ref="img_file_picker"
            type="file"
            class="input-file"
            @change="img_file_changed()"
          >
        </label>
        <span class="divider"> Step 2 </span>
        <label
          class="input-file-label"
          for="excel_file_picker"
        > Select Dataset
          <input
            id="excel_file_picker"
            ref="excel_file_picker"
            type="file"
            class="input-file"
            @change="csv_file_changed()"
          >
        </label>

        <span class="divider"> Step 3 </span>
        <v-select
          ref="paperSizes"
          v-model="paperSize"
          :items="paperSizes"
          label="Paper size"
          color="white"
          @change="paperSizeChanged()"
        />

        <span class="divider"> Step 4 </span>
        ID Cart Dimensions:

        <span class="divider"> Step 5 </span>
        <v-btn
          color="info"
          @click="generateImages()"
        >
          Generate &nbsp;
          <i class="fa fa-cog" />
        </v-btn>
      </div>

      <div class="designer-preview">
        <span class="header">Cart Preview</span>
        <div
          id="img_preview"
          ref="img_preview"
        >
          <template v-for="(item, index) in csvHeader">
            <vue-draggable-resizable
              ref="headers"
              :w="200"
              :h="200"
              :x="$refs.img_preview.clientWidth/2 - 100"
              :y="index*210"
              :parent="true"
              @resizing="resizer(index)"
            >
              <div
                class="textresizable header-style"
                @contextmenu.prevent="$refs.menu.open($event, index)"
              >
                <span class="fit"> {{ item }} </span>
              </div>
            </vue-draggable-resizable>
          </template>
        </div>
      </div>
    </div>
    <Footer />

    <vue-context ref="menu">
      <template slot-scope="child">
        <li>
          <a
            href="#"
            @click.prevent="removeHeader(child.data)"
          > Remove this header</a>
        </li>
      </template>
    </vue-context>

  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import VueDraggableResizable from 'vue-draggable-resizable';
import VueContext from 'vue-context';
import 'vue-context/dist/css/vue-context.css';
import fitty from 'fitty';
import {
  csvToArray, logError, readBlobAsText, readBlobAsUrl,
} from '@/Helper';
import Footer from './Footer';

export default {
  name: 'Designer',
  components: {
    Footer,
    VueDraggableResizable,
    VueContext,
  },
  watch: {
    csvHeader(newValue) {
      setTimeout(() => {
        for (let i = 0; i < newValue.length; i++) {
          this.resizer(i);
        }
      }, 100);
    },
  },
  computed: {
    ...mapGetters('designer', [
      'csvHeader',
    ]),
  },
  data: () => ({
    paperSize: null,
    lastBodyClass: null,
    folded: false,
    paperSizes: [
      'A3',
      'A3.landscape',
      'A4',
      'A4.landscape',
      'A5',
      'A5.landscape',
      'letter',
      'letter.landscape',
      'legal',
      'legal.landscape',
    ],
  }),
  methods: {
    ...mapActions('designer', [
      'setCsvArray',
      'setPageSize',
    ]),
    toggle() {
      this.folded = !this.folded;
    },
    removeHeader(index) {
      const domEl = this.$refs.headers[index].$el;
      domEl.classList.add('hidden');
    },
    resizer(index) {
      const domEl = this.$refs.headers[index].$el.querySelector('.fit');
      const r = fitty(domEl, {
        subtree: true,
        childList: true,
        characterData: true,
        maxSize: 1000,
        minSize: 4,
      });
    },
    generateImages() {

    },
    paperSizeChanged() {
      this.setPageSize(this.paperSize);
    },
    async img_file_changed() {
      try {
        const imgFile = this.$refs.img_file_picker.files[0];
        const imgUrl = await readBlobAsUrl(imgFile);
        this.$refs.img_preview.style.backgroundImage = `url(${imgUrl})`;
      } catch (e) {
        logError(e.message);
      }
    },

    async csv_file_changed() {
      try {
        const excelFile = this.$refs.excel_file_picker.files[0];
        const csvText = await readBlobAsText(excelFile);
        const csvArray = csvToArray(csvText);
        this.setCsvArray(csvArray);
      } catch (e) {
        logError(e.message);
      }
    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    $main-color: #01517d;
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

    .main-title{
        text-shadow: 1px 1px 5px $main-color;
    }

    #designer, *{
        box-sizing: border-box;
        color: $text-color;
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
                    position: relative;
                    margin: 20px 0;
                    width: 100%;
                    height: 100%;
                    background-size: contain;
                    background-position: 50% 50%;
                }
                .header-style{
                    text-shadow: 0 0 3px #333;
                    background: rgba(255,255,255,.4);
                    &:hover{
                      cursor: move;
                    }
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

        .textresizable{
            white-space: nowrap;
            display: inline-block;
            width: 100%;
            height: 100%;
        }
    }

    .hidden{
        display: none;
    }
    @media print {
        #designer {
            display: none;
        }
    }
</style>
