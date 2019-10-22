<template>
  <div ref="ProfileForm" class="__container">
    <div class="__my-profile">
      <div class="__select" @click="openLeftLayoutModal">
        <p class="__title">기업선택</p>
        <i class="material-icons">keyboard_arrow_right</i>
      </div>
      <div class="__form-info">
        <h3>기업 정보</h3>
        <div v-if="Object.entries(form).length > 1" class="__form-content">
          <div v-for="(field, index) of companyInformation" :key="index">
            <div
              v-if="field.fieldType.columnType === 'select_box'"
              class="__select"
              @click="openCenterLayoutModal(field.fieldChildNodes)"
            >
              <p class="__title">{{ field.name }}</p>
              <i class="material-icons">keyboard_arrow_right</i>
            </div>
            <div
              v-else-if="field.fieldType.columnType === 'text'"
              class="__item"
            >
              <p class="__title">{{ field.name }}</p>
              <input
                v-model="form[field.id].value"
                placeholder="내용을 입력하세요."
              />
            </div>
            <div
              v-else-if="field.fieldType.columnType === 'textarea'"
              class="__item __textarea-wrap"
            >
              <p class="__title">{{ field.name }}</p>
              <textarea
                v-model="form[field.id].value"
                placeholder="내용을 입력하세요."
              />
            </div>
          </div>
          <!-- <div class="__item">
            <p class="__title">기업로고</p>
            <div class="__image-upload">
              <img
                class="__image-icon"
                src="../assets/images/common/icon_default_logo_gray.svg"
              />
            </div>
            <div class="__pencil-icon-wrap">
              <img
                class="__pencil-icon"
                src="../assets/images/common/icon_ pencil.svg"
              />
            </div>
          </div>-->
        </div>
      </div>
      <div class="__form-info">
        <h3>참가 정보</h3>
        <div v-if="Object.entries(form).length > 1" class="__form-content">
          <div v-for="(field, index) of informationType" :key="index">
            <div
              v-if="field.fieldType.columnType === 'select_box'"
              class="__select"
              @click="openCenterLayoutModal(field.fieldChildNodes, field)"
            >
              <p class="__title">{{ field.name }}</p>
              <i class="material-icons">keyboard_arrow_right</i>
            </div>
            <div
              v-else-if="field.fieldType.columnType === 'text'"
              class="__item"
            >
              <p class="__title">{{ field.name }}</p>
              <input
                v-model="form[field.id].value"
                placeholder="내용을 입력하세요."
              />
            </div>
            <div
              v-else-if="field.fieldType.columnType === 'textarea'"
              class="__item __textarea-wrap"
            >
              <p class="__title">{{ field.name }}</p>
              <textarea
                v-model="form[field.id].value"
                placeholder="내용을 입력하세요."
              />
            </div>
          </div>
        </div>
      </div>
      <div class="__form-info">
        <h3>담당자 정보</h3>
        <div class="__form-content">
          <div v-for="(field, index) of manager" :key="index">
            <div
              v-if="field.fieldType.columnType === 'select_box'"
              class="__select"
              @click="openCenterLayoutModal(field.fieldChildNodes, field)"
            >
              <p class="__title">{{ field.name }}</p>
              <i class="material-icons">keyboard_arrow_right</i>
            </div>
            <div
              v-else-if="field.fieldType.columnType === 'text'"
              class="__item"
            >
              <p class="__title">{{ field.name }}</p>
              <input placeholder="내용을 입력하세요." />
            </div>
            <div
              v-else-if="field.fieldType.columnType === 'textarea'"
              class="__item __textarea-wrap"
            >
              <p class="__title">{{ field.name }}</p>
              <textarea placeholder="내용을 입력하세요." />
            </div>
          </div>
          <!-- <div class="__item">
            <p class="__title">프로필 이미지</p>
            <div class="__image-upload">
              <img
                class="__image-icon"
                src="../assets/images/common/icon_default_logo_gray.svg"
              />
            </div>
            <div class="__pencil-icon-wrap">
              <img
                class="__pencil-icon"
                src="../assets/images/common/icon_ pencil.svg"
              />
            </div>
          </div>-->
        </div>
      </div>
      <p class="__copy">
        * 작성된 정보는 제3자에게 노출되는 것을 알려드립니다.
      </p>
    </div>
    <SearchLeftLayout />
    <SearchCenterLayout
      :field="selectField"
      @changeCompanyType="changeCompanyType"
    />
    <CompanyCode @close="companyCodeModalClose" />
  </div>
</template>
<script>
import DirectiveImage from '../mixin/directive_image';
import Filter from '../mixin/filter';
import SearchLeft from '../mixin/search_left';
import SearchCenter from '../mixin/search_center';
import CompanyCodeMixin from '../mixin/company_code';
import SearchLeftLayout from '../components/select_modal/SearchLeftLayout';
import SearchCenterLayout from '../components/select_modal/SearchCenterLayout';
import CompanyCode from '../components/input_modal/CompanyCode';
import Vendor from '../service/vendor';
import {
  SUB_HEADER_SET,
  SEARCH_CENTER_SET,
  // FIELD_SET,
} from '../store/constant_types';
import Field from '../service/field';
export default {
  layout: 'profileDefault',
  components: { SearchLeftLayout, SearchCenterLayout, CompanyCode },
  mixins: [DirectiveImage, Filter, SearchLeft, SearchCenter, CompanyCodeMixin],
  data() {
    return {
      searchLeftLayoutModal: false,
      searchCenterLayoutModal: false,
      companyCodeModal: false,
      companyCodeStatus: null,
      selectCompany: null,
      companyInformation: null,
      informationType: null,
      manager: null,
      postVendorField: [],
      form: {},
      selectBoxValue: null,
      requestType: 'post',
      selectField: null,
    };
  },
  mounted() {
    this.$store.commit(SUB_HEADER_SET.load, { subHeaderTitle: '정보입력' });

    this.profileInit();

    const headerCompleteButton = this.$refs.ProfileForm.parentElement
      .parentElement.firstElementChild.lastElementChild;

    headerCompleteButton.addEventListener('click', () => {
      if (this.requestType === 'post') {
        this.postField();
      } else if (this.requestType === 'patch') {
        this.patchField();
      }
    });
  },
  methods: {
    async postField() {
      const items = Object.keys(this.form).map((i) => this.form[i]);
      console.log(items);

      const params = { data: items };

      const { result } = await new Vendor(this).post(params);

      console.log(result);
    },
    async patchField() {
      const items = Object.keys(this.form).map((i) => this.form[i]);

      const id = this.COMPANY_CODE_GET.company.id;

      const params = { data: items };

      const { result } = await new Vendor(this).patch(id, params);

      console.log(result);
    },
    changeCompanyType(selectedValue, field) {
      this.form[field.id].value = selectedValue.id;
    },
    openLeftLayoutModal() {
      this.SEARCH_LEFT_ON();

      const bodyEl = this.$refs.ProfileForm.offsetParent;

      bodyEl.style.overflow = 'hidden';
    },
    openCenterLayoutModal(fieldChildNodes, field) {
      this.SEARCH_CENTER_ON();

      this.$store.commit(SEARCH_CENTER_SET.load, {
        companyTypes: fieldChildNodes,
        selectFieldValue: this.form[field.id].value,
      });

      this.selectField = field;

      const bodyEl = this.$refs.ProfileForm.offsetParent;

      bodyEl.style.overflow = 'hidden';
    },
    openCompanyCodeModal(index) {
      this.companyCodeModal = true;
      console.log(index);
      this.selectCompany = index;
    },
    modalClose() {
      this.searchLeftLayoutModal = false;
      this.searchCenterLayoutModal = false;

      const bodyEl = this.$refs.ProfileForm.offsetParent;

      bodyEl.style.height = 'auto';
      bodyEl.style.overflow = 'auto';
    },
    closeCompanyModal(closeAll) {
      const bodyEl = this.$refs.ProfileForm.offsetParent;

      if (closeAll) {
        this.searchLeftLayoutModal = false;
        this.searchCenterLayoutModal = false;
        this.companyCodeModal = false;

        bodyEl.style.height = 'auto';
        bodyEl.style.overflow = 'auto';

        this.getSelectCompany();
      } else {
        this.companyCodeModal = false;
      }
    },
    getSelectCompany() {
      console.log('select company = ' + this.selectCompany);
    },
    async profileInit() {
      const { result } = await new Field(this).get();

      this.companyInformation = result[0].companyInformation;
      this.informationType = result[0].informationType;
      this.manager = result[0].manager;

      const form = {};
      for (const item of result[0].companyInformation) {
        const key = item.id;
        this.$set(form, key, { value: null, id: key });
      }

      for (const item of result[0].informationType) {
        const key = item.id;
        this.$set(form, key, { value: null, id: key });
      }

      for (const item of result[0].manager) {
        const key = item.id;
        this.$set(form, key, { value: null, id: key });
      }

      setTimeout(() => {
        this.form = form;
      }, 0);
    },
    companyCodeModalClose() {
      const selectCompanyFields = this.COMPANY_CODE_GET.company
        .businessVendorFieldValues;

      const form = {};

      for (const item of selectCompanyFields) {
        const field = item.businessVendorField;
        const key = field.id;

        if (item.businessVendorField.fieldType.columnType === 'select_box') {
          this.$set(form, key, { value: item.value.id, id: item.id });
        } else {
          this.$set(form, key, { value: item.value, id: item.id });
        }
      }

      setTimeout(() => {
        Object.assign(this.form, form);

        console.log(this.form);

        this.requestType = 'patch';
      }, 0);
    },
  },
};
</script>

<style lang="scss">
.__my-profile {
  background-color: #f4f4f4;
  min-height: calc(100vh - 40px);
  overflow: auto;
  width: 100%;
  padding-top: 40px;
  .__copy {
    color: #a8a8a8;
    text-align: right;
    padding: 0 20px;
  }
  .__form-info {
    .__form-content {
      border-top: 1px solid #d3d3d3;
      .__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        background-color: white;
        border-bottom: 1px solid #d3d3d3;
        position: relative;
        .__title {
          font-size: 15px;
          margin: 0;
        }
        input {
          font-size: 15px;
          width: 122px;
        }
        textarea {
          width: 100%;
          height: 17vh;
          font-size: 15px;
          color: #777777;
          border: 0;
          margin-top: 2vh;
          &:focus {
            outline: none;
          }
        }
      }
      .__select {
        border-bottom: 1px solid #d3d3d3;
        margin: 0;
      }
      .__textarea-wrap {
        display: block;
      }
      .__image-upload {
        background-color: #a5a5a5;
        border-radius: 50%;
        width: 67px;
        height: 67px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .__pencil-icon-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 23px;
        height: 23px;
        border-radius: 50%;
        background-color: #fff;
        position: absolute;
        right: 17px;
        bottom: 8px;
        .__pencil-icon {
          width: 12px;
        }
      }
    }
    > h3 {
      padding: 0 20px;
      color: #535353;
      margin: 13px 0;
      font-size: 14px;
      font-weight: 400;
      margin-top: 20px;
    }
  }
  .__select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: white;
    margin-top: 5px;
    .__title {
      font-size: 15px;
      margin: 0;
    }
    .material-icons {
      font-size: 14px;
    }
  }
  > .__select {
    border-top: 1px solid #d3d3d3;
    border-bottom: 1px solid #d3d3d3;
  }
}
.__company-code {
  .__overlay {
    display: block;
    opacity: 0.6;
  }
  .__modal-content {
    background-color: transparent;
    z-index: 999;
    height: auto;
    position: relative;
    .__company-code-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      width: 270px;
      height: 180px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > h3 {
        font-size: 16px;
        color: #434343;
        font-weight: 400;
        margin-top: 0;
        margin-bottom: 20px;
      }
      > input {
        width: 222px;
        height: 36px;
        border: 1px solid #a8a8a8;
        background: #f6f6f6;
        border-radius: 30px;
        padding: 0 10px;
        font-size: 13px;
      }
      .__buttons {
        margin-top: 20px;
        button {
          width: 100px;
          height: 38px;
          border-radius: 30px;
          background-color: #d3d3d3;
          margin: 0 10px;
          border: 0;
          font-size: 14px;
          &:last-child {
            background-color: #02152a;
            color: white;
          }
        }
      }
      .__button {
        width: 222px;
        height: 38px;
        border-radius: 30px;
        background-color: #d3d3d3;
        margin: 0 10px;
        border: 0;
        font-size: 14px;
        background-color: #02152a;
        color: white;
      }
    }
    .__company-code-alert {
      .material-icons {
        color: white;
        font-weight: 600;
        background-color: #e83828;
        border-radius: 50%;
        font-size: 20px;
        padding: 8px;
        margin-bottom: 20px;
      }
      > h3 {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
