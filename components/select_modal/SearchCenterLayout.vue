<template>
  <ModalFull
    ref="searchCenterLayoutModal"
    :class="{
      fadeInUpBig: SEARCH_CENTER_GET.status,
      fadeOutUpBig: !SEARCH_CENTER_GET.status,
    }"
    class="animated"
  >
    <div slot="ModalContent" class="__modal-content">
      <div class="__header">
        <div class="__search-input-wrap">
          <i class="material-icons">search</i>
          <input type="text" class="__search-input" />
        </div>
        <button @click="modalClose" class="__close">완료</button>
      </div>
      <div class="__content">
        <div
          v-for="(type, index) in SEARCH_CENTER_GET.companyTypes"
          :key="index"
        >
          <div v-if="!SEARCH_CENTER_GET.selectFieldValue">
            <div
              ref="companyTypeItem"
              @click="eddCompanyType(type, field, $event)"
              class="__companyType"
            >
              <p>{{ type.text }}</p>
            </div>
          </div>

          <div v-else>
            <div
              ref="companyTypeItem"
              :class="
                type.text && SEARCH_CENTER_GET.selectFieldValue === type.id
                  ? '__active'
                  : ''
              "
              @click="eddCompanyType(type, field, $event)"
              class="__companyType"
            >
              <p>{{ type.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ModalFull>
</template>
<script>
import DirectiveImage from '../../mixin/directive_image';
import { SEARCH_CENTER_SET } from '../../store/constant_types';
import SearchCenter from '../../mixin/search_center';
export default {
  name: 'SearchLeftLayout',
  mixins: [DirectiveImage, SearchCenter],
  props: {
    field: {
      default: null,
      type: Object,
    },
  },
  watch: {
    'SEARCH_CENTER_GET.status'(newValue) {
      if (newValue) {
        const thisModalEl = this.$refs.searchCenterLayoutModal.$el;
        thisModalEl.style.top = window.scrollY + 'px';
      }
    },
  },
  methods: {
    selectCompanyCodeModal(index) {
      this.$store.commit(SEARCH_CENTER_SET.load, { returnValue: index });
    },
    modalClose() {
      const body = this.$el.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement;

      body.style.overflow = 'auto';
      this.SEARCH_CENTER_OFF();

      const header = this.$el.parentElement.parentElement
        .previousElementSibling;
      header.style = '';
    },
    eddCompanyType(type, field, $event) {
      this.$emit('changeCompanyType', type, field);

      this.$store.commit(SEARCH_CENTER_SET.load, {
        selectFieldValue: type.id,
      });
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
        border: 0;
        background-color: transparent;
      }
    }
    .__content {
      background-color: #f4f4f4;
      height: calc(100vh - 46px);
      position: relative;
      overflow: auto;
      padding-bottom: 40px;
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
          padding: 0;
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
      .__active {
        background-color: #4e4e4e;
        p {
          color: white;
        }
      }
    }
  }
}
</style>
