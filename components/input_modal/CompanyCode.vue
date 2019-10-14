<template>
  <ModalFull
    class="__company-code animated"
    :class="{
      fadeInUpBig: COMPANY_CODE_GET.status,
      fadeOutUpBig: !COMPANY_CODE_GET.status,
    }"
  >
    <div slot="ModalContent" class="__modal-content">
      <div v-if="companyCodeStatus === null" class="__company-code-box">
        <h3>기업코드를 입력하세요.</h3>
        <input type="text" />
        <div class="__buttons">
          <button type="button">취소</button>
          <button type="button" @click="companyCodeStatus = true">확인</button>
        </div>
      </div>
      <div
        v-else-if="companyCodeStatus"
        class="__company-code-box __company-code-alert"
      >
        <i class="material-icons">check</i>
        <h3>기업코드가 확인되었습니다.</h3>
        <button type="button" class="__button" @click="allModalClose">
          확인
        </button>
      </div>
      <div v-else class="__company-code-box __company-code-alert">
        <i class="material-icons">check</i>
        <h3>기업코드가 잘못되었습니다.</h3>
        <button type="button" class="__button" @click="modalClose">확인</button>
      </div>
    </div>
  </ModalFull>
</template>
<script>
import DirectiveImage from '../../mixin/directive_image';
import CompanyCode from '../../mixin/company_code';
import SearchLeft from '../../mixin/search_left';
export default {
  name: 'SearchLeftLayout',
  mixins: [DirectiveImage, CompanyCode, SearchLeft],
  data() {
    return {
      companyCodeStatus: null,
    };
  },
  methods: {
    modalClose() {
      this.COMPANY_CODE_OFF();
    },
    allModalClose() {
      this.COMPANY_CODE_OFF();
      this.SEARCH_LEFT_OFF();
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
