<template>
  <ModalFull
    ref="searchLeftLayoutModal"
    class="animated"
    :class="{
      fadeInUpBig: searchLeftLayoutModal,
      fadeOutUpBig: !searchLeftLayoutModal,
    }"
  >
    <div slot="ModalContent" class="__modal-content">
      <div class="__header">
        <div class="__search-input-wrap">
          <i class="material-icons">search</i>
          <input type="text" class="__search-input" />
        </div>
        <button class="__close" @click="modalClose">취소</button>
      </div>
      <div class="__content">
        <div
          v-for="(company, index) in companys"
          :key="index"
          class="__company"
          @click="emitOpenCompanyCodeModal(index)"
        >
          <div class="__company-image">
            <img v-img="''" />
          </div>
          <p>{{ company }}</p>
        </div>
      </div>
    </div>
  </ModalFull>
</template>
<script>
import DirectiveImage from '../../mixin/directive_image';
export default {
  name: 'SearchLeftLayout',
  mixins: [DirectiveImage],
  props: {
    searchLeftLayoutModal: {
      default: false,
      type: Boolean,
    },
    companys: {
      default() {
        return [];
      },
      type: Array,
    },
  },
  methods: {
    emitOpenCompanyCodeModal(index) {
      console.log(index);
      this.$emit('open', index);
    },
    modalClose() {
      this.$emit('close');
    },
  },
};
</script>
<style lang="scss">
.ModalFull {
  top: 0;
  > .__overlay {
    display: none;
  }
  > .__modal-content {
    background-color: white;
    width: 100%;
    height: 100vh;
    .__header {
      position: relative;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-bottom: 1px solid #d3d3d3;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 45px;
      .__search-input-wrap {
        width: calc(100% - 100px);
        margin-left: 20px;
        position: relative;
        .__search-input {
          width: 100%;
          height: 30px;
          background-color: #fafafa;
          border: 1px solid #e4e4e4;
          border-radius: 30px;
          padding-left: 35px;
        }
        .material-icons {
          font-size: 20px;
          color: #a5a5a5;
          position: absolute;
          top: 6px;
          left: 10px;
        }
      }
      .__close {
        position: absolute;
        right: 20px;
        font-size: 16px;
        color: #383838;
      }
    }
    .__content {
      background-color: #f4f4f4;
      min-height: calc(100vh - 46px);
      position: relative;
      overflow: auto;
      .__company {
        display: flex;
        align-items: center;
        padding: 10px;
        background-color: #fff;
        box-shadow: 0 0 7px 1px #e0e0e0;
        border: 1px solid #e0e0e0;
        width: 85%;
        margin: 10px auto;
        border-radius: 10px;
        .__company-image {
          width: 48px;
          height: 48px;
          border-radius: 6px;
          overflow: hidden;
          > img {
            width: 100%;
          }
        }
        p {
          color: #262626;
          font-size: 16px;
          margin: 0;
          padding-left: 10px;
        }
      }
      .__companyType {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 25px 10px;
        background-color: #fff;
        box-shadow: 0 0 7px 1px #e0e0e0;
        border: 1px solid #e0e0e0;
        width: 85%;
        margin: 10px auto;
        border-radius: 10px;
        p {
          color: #262626;
          font-size: 16px;
          margin: 0;
          padding-left: 10px;
        }
      }
    }
  }
}
</style>
