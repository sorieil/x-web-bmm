<template>
  <ModalFull
    ref="searchLeftLayoutModal"
    :class="{
      fadeInUpBig: SEARCH_LEFT_GET.status,
      fadeOutUpBig: !SEARCH_LEFT_GET.status,
    }"
    class="animated"
  >
    <div slot="ModalContent" class="__modal-content">
      <div class="__header">
        <div class="__search-input-wrap">
          <SearchForm v-model="searchData" v-on:submit="submitSearchForm" />
        </div>
        <button @click="modalClose" class="__close">취소</button>
      </div>
      <div class="__content">
        <div
          v-for="(vendor, index) in SEARCH_LEFT_GET.vendors"
          :key="index"
          @click="selectCompanyCodeModal(vendor)"
          class="__company"
        >
          <div class="__company-image">
            <img v-img="''" />
          </div>
          <p>{{ vendor.companyName }}</p>
        </div>
      </div>
    </div>
  </ModalFull>
</template>
<script>
import DirectiveImage from '../../mixin/directive_image';
import { SEARCH_LEFT_SET } from '../../store/constant_types';
import SearchLeft from '../../mixin/search_left';
import CompanyCode from '../../mixin/company_code';
import Vendor from '../../service/vendor';
import SearchForm from '../../components/base_forms/SearchForm';
export default {
  name: 'SearchLeftLayout',
  components: {
    SearchForm,
  },
  mixins: [DirectiveImage, SearchLeft, CompanyCode],
  data() {
    return {
      searchData: null,
    };
  },
  watch: {
    'SEARCH_LEFT_GET.status'(newValue) {
      if (newValue) {
        console.log(newValue);
        const thisModalEl = this.$refs.searchLeftLayoutModal.$el;
        thisModalEl.style.top = window.scrollY + 'px';
      }
    },
  },
  mounted() {
    this.SearchLeftListInit();
  },
  methods: {
    selectCompanyCodeModal(vendor) {
      const companyCodeEl = this.$refs.searchLeftLayoutModal.$el
        .nextElementSibling.nextElementSibling;
      companyCodeEl.style = '';

      this.$store.commit(SEARCH_LEFT_SET.load, {
        selectCompanyCodeVendor: vendor,
      });
      this.COMPANY_CODE_ON();
    },
    modalClose() {
      const body = this.$el.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement;

      body.style.overflow = 'auto';
      this.SEARCH_LEFT_OFF();

      const header = this.$el.parentElement.parentElement
        .previousElementSibling;
      header.style = '';
    },
    async SearchLeftListInit() {
      const { result } = await new Vendor(this).get();

      this.$store.commit(SEARCH_LEFT_SET.load, {
        vendors: result,
      });
    },
    async submitSearchForm() {
      const params = { keyword: this.searchData };

      const { result } = await new Vendor(this).searchGet(params);

      this.$store.commit(SEARCH_LEFT_SET.load, {
        vendors: result,
      });
    },
  },
};
</script>
<style lang="scss"></style>
