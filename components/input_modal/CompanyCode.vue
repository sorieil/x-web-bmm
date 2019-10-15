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
          <button type="button" @click="modalClose">취소</button>
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
<style lang="scss"></style>
