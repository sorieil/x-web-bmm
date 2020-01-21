<template>
  <ModalFull
    :class="{
      fadeInUpBig: COMPANY_CODE_GET.status,
      fadeOutUpBig: !COMPANY_CODE_GET.status,
    }"
    class="__company-code animated"
  >
    <div slot="ModalContent" class="__modal-content">
      <div v-if="companyCodeStatus === null" class="__company-code-box">
        <h3>기업코드를 입력하세요.</h3>
        <SearchForm v-model="inputCode" />
        <div class="__buttons">
          <button @click="modalClose" type="button">취소</button>
          <button @click="checkVendorCode" type="button">확인</button>
        </div>
      </div>
      <div
        v-else-if="companyCodeStatus"
        class="__company-code-box __company-code-alert"
      >
        <i class="material-icons">check</i>
        <h3>기업코드가 확인되었습니다.</h3>
        <button @click="allModalClose" type="button" class="__button">
          확인
        </button>
      </div>
      <div v-else class="__company-code-box __company-code-alert">
        <i class="material-icons">check</i>
        <h3>기업코드가 잘못되었습니다.</h3>
        <button @click="modalClose" type="button" class="__button">확인</button>
      </div>
    </div>
  </ModalFull>
</template>
<script>
import DirectiveImage from '../../mixin/directive_image';
import CompanyCode from '../../mixin/company_code';
import SearchLeft from '../../mixin/search_left';
import Vendor from '../../service/vendor';
import SearchForm from '../../components/base_forms/SearchForm';
import { COMPANY_CODE_SET } from '../../store/constant_types';
export default {
  name: 'SearchLeftLayout',
  components: {
    SearchForm,
  },
  mixins: [DirectiveImage, CompanyCode, SearchLeft],
  data() {
    return {
      companyCodeStatus: null,
      inputCode: '',
    };
  },
  methods: {
    modalClose() {
      this.COMPANY_CODE_OFF();
      this.companyCodeStatus = null;
      this.inputCode = null;
    },
    allModalClose() {
      this.COMPANY_CODE_OFF();
      this.SEARCH_LEFT_OFF();
      this.$emit('close');
      const body = this.$el.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement;
      this.companyCodeStatus = null;
      this.inputCode = null;

      body.style.overflow = 'auto';
    },
    async checkVendorCode() {
      const selectvendor = this.SEARCH_LEFT_GET.selectCompanyCodeVendor;
      const id = selectvendor.businessVendor.id;
      // console.log(id);
      // console.log(this.inputCode);
      const params = {
        vendorCode: this.inputCode,
      };
      const { result } = await new Vendor(this).codePost(id, params);

      if (result[0].businessCode.code === this.inputCode) {
        const { result } = await new Vendor(this).selectGet(id);
        this.$store.commit(COMPANY_CODE_SET.load, {
          company: result[0],
        });

        // console.log(result);
        this.companyCodeStatus = true;
      } else {
        this.companyCodeStatus = false;
      }
    },
  },
};
</script>
<style lang="scss">
.__company-code-box {
  > .SearchForm {
    background-image: none;
    width: 222px;
    > label {
      > input {
        width: 100%;
        left: 0;
      }
    }
  }
}
</style>
