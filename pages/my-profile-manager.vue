<template>
  <div ref="ProfileForm" class="__container">
    <div class="__my-profile">
      <div @click="openLeftLayoutModal" class="__select">
        <p class="__title">기업선택</p>
        <i class="material-icons">keyboard_arrow_right</i>
      </div>
      <div class="__form-info">
        <h3>기업 정보</h3>
        <div v-if="Object.entries(form).length > 1" class="__form-content">
          <div v-for="(field, index) of companyInformation" :key="index">
            <div
              v-if="field.fieldType.columnType === 'idx'"
              @click="openCenterLayoutModal(field.fieldChildNodes, field)"
              class="__select"
            >
              <p class="__title">{{ field.name }}</p>

              <div v-if="form[field.id].value">
                <div
                  v-for="(item, selectIndex) of field.fieldChildNodes"
                  :key="selectIndex"
                >
                  <div v-if="item.id === form[field.id].value">
                    <input :value="item.text" class="__select-value" readonly />
                  </div>
                </div>
              </div>
              <div v-else>
                <i class="material-icons">keyboard_arrow_right</i>
              </div>
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
              {{ field.id }}
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
              v-if="field.fieldType.columnType === 'idx'"
              @click="openCenterLayoutModal(field.fieldChildNodes, field)"
              class="__select"
            >
              <p class="__title">{{ field.name }}</p>

              <div v-if="form[field.id].value">
                <div
                  v-for="(item, selectIndex) of field.fieldChildNodes"
                  :key="selectIndex"
                >
                  <div v-if="item.id === form[field.id].value">
                    <input :value="item.text" class="__select-value" readonly />
                  </div>
                </div>
              </div>
              <div v-else>
                <i class="material-icons">keyboard_arrow_right</i>
              </div>
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
              v-if="field.fieldType.columnType === 'idx'"
              @click="openCenterLayoutModal(field.fieldChildNodes, field)"
              class="__select"
            >
              <p class="__title">{{ field.name }}</p>

              <div v-if="formManager[field.id]">
                <div
                  v-for="(item, selectIndex) of field.fieldChildNodes"
                  :key="selectIndex"
                >
                  <div v-if="item.id === formManager[field.id].value">
                    <input
                      v-model="formManager[field.id].value"
                      class="__select-value"
                      readonly
                    />
                  </div>
                </div>
              </div>
              <div v-else>
                <i class="material-icons">keyboard_arrow_right</i>
              </div>
            </div>
            <div
              v-else-if="
                field.fieldType.columnType === 'text' && formManager[field.id]
              "
              class="__item"
            >
              <p class="__title">{{ field.name }}</p>
              <input
                v-model="formManager[field.id].value"
                placeholder="내용을 입력하세요."
              />
            </div>
            <div
              v-else-if="
                field.fieldType.columnType === 'textarea' &&
                  formManager[field.id]
              "
              class="__item __textarea-wrap"
            >
              <p class="__title">{{ field.name }}</p>
              <textarea
                v-model="formManager[field.id].value"
                placeholder="내용을 입력하세요."
              />
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
          <div class="__item">
            <button
              @click="buttonSwichManager"
              class="__manager-swich-button-buyer"
            >
              바이어 전환
            </button>
          </div>
        </div>
      </div>
      <p class="__copy">
        * 작성된 정보는 제3자에게 노출되는 것을 알려드립니다.
      </p>
    </div>
    <SearchLeftLayout ref="SearchLeftLayout" style="display:none;" />
    <SearchCenterLayout
      ref="SearchCenterLayout"
      :field="selectField"
      @changeCompanyType="changeCompanyType"
      style="display:none;"
    />
    <CompanyCode
      ref="CompanyCode"
      @close="companyCodeModalClose"
      style="display:none;"
    />
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
import MixinUser from '../mixin/user';
import Manager from '../service/manager';
import {
  SUB_HEADER_SET,
  SEARCH_CENTER_SET,
  // SEARCH_LEFT_SET,
  // FIELD_SET,
} from '../store/constant_types';
import Field from '../service/field';
export default {
  layout: 'profile_default',
  components: { SearchLeftLayout, SearchCenterLayout, CompanyCode },
  mixins: [
    DirectiveImage,
    Filter,
    SearchLeft,
    SearchCenter,
    CompanyCodeMixin,
    MixinUser,
  ],
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
      formManager: {},
      selectBoxValue: null,
      requestType: 'post',
      selectField: null,
      getCompanyInfo: null,
      vendorId: null,
      vendorManagerId: null,
    };
  },
  mounted() {
    this.$store.commit(SUB_HEADER_SET.load, { subHeaderTitle: '정보입력' });

    this.profileInit();
    // 공통 해더의 아이디의 클릭 이벤트를 부여해준다. 호출하는 컴포넌트마다 하게 되어 있어서 중복 이벤트에 유의 해야 한다.
    const profileHeaderButton = document.querySelector('#profileHeaderButton');
    if (profileHeaderButton) {
      profileHeaderButton.addEventListener(
        'click',
        this.actionsHeaderCompleteButton
      );
    }

    this.getVendorWithManager();
  },
  destroyed() {
    const profileHeaderButton = document.querySelector('#profileHeaderButton');
    if (profileHeaderButton) {
      profileHeaderButton.removeEventListener(
        'click',
        this.actionsHeaderCompleteButton
      );
    }
  },
  methods: {
    getVendor() {
      // 매니저인 경우 매니저의 밴더를 가져 올수 있다.?!!!!
      // 매니저가 속한 밴더 정보를 가져온다.
      if (this.USER_GET.type === 'manager') {
        // const { result } = new Vendor(this).get();
        // console.log('vendor infor: ', result[0]);
      } else {
        alert('벤더 정보를 입력해주세요.');
      }
    },
    getVendorWithManager() {
      // console.log('User type:', this.USER_GET.type);
      if (this.USER_GET.type === 'manager') {
        // 매니저 인경우 등록된 밴더 정보를 불러온다.
        // 바이어에서 전환 한 경우도 새로 가입으로 보기 때문에
        // 밴저 정보를 가져오진 않는다.
        const serviceManagerManager = new Manager(this);
        const query = serviceManagerManager.get();
        query
          .then(({ result, resCode }) => {
            // console.log(
            //   '매니저 이시군요. 밴저 정보 불러 오기',
            //   result,
            //   resCode
            // );
            this.vendorManagerId = result[0].id;
            // TODO 불러온 매니저 정보 바인딩 해준다.
            // 그리고 vendorManagerId 변수에 아이디 값을 넣어준다.
            // 그리고 불러온 매니저 정보를 토대로 밴더 정보를 불러오고,
            // 밴더 정보를 바인딩 해준다. this.companyCodeModalClose() 이 함수 처럼.
            const formManager = {};
            for (const item of result[0].businessVendorFieldManagerValues) {
              const fieldId = item.businessVendorField.id;
              if (item.businessVendorField.fieldType.columnType === 'idx') {
                this.$set(formManager, fieldId, {
                  value: item.value.id,
                  id: item.id,
                });
              } else {
                // console.log(fieldId, item.id, item.value);
                this.$set(formManager, fieldId, {
                  value: item.value,
                  id: item.id,
                });
              }
            }

            // 유저의 정보를 조회 해서 밴더 정보를 바인딩 해준다.
            const form = {};
            if (result[0].businessVendor.id) {
              this.vendorId = result[0].businessVendor.id;

              for (const item of result[0].businessVendor
                .businessVendorFieldValues) {
                const fieldId = item.businessVendorField.id;
                if (item.businessVendorField.fieldType.columnType === 'idx') {
                  this.$set(form, fieldId, {
                    value: item.value.id,
                    id: item.id,
                  });
                } else {
                  this.$set(form, fieldId, {
                    value: item.value,
                    id: item.id,
                  });
                }
              }
            }

            setTimeout(() => {
              Object.assign(this.form, form);
              Object.assign(this.formManager, formManager);
              // console.log('Success bind:', this.form, this.formManager);
              this.requestType = 'patch';
            }, 0);
          })
          .catch((error) => {
            console.log('Error:', error);
          });
      }
    },
    actionsHeaderCompleteButton() {
      if (this.vendorId) {
        this.saveVendorManager().then(async (result) => {
          // console.log('Update vendor');
          if (result) {
            await this.patchField();
          }
        });
      } else {
        this.saveVendorManager().then(async (result) => {
          // console.log('Add vendor');
          if (result) {
            await this.postField();
          }
        });
      }
    },
    saveVendorManager() {
      if (this.vendorId) {
        const items = [];
        console.log('this.formManager:', this.formManager);
        for (const [key] of Object.entries(this.formManager)) {
          console.log(key);
          if (!this.formManager[key].id || !this.formManager[key].value) {
            alert('모든 정보를 입력해주세요.');
            return Promise.resolve(false);
          }
          // console.log('key:', key);
          items.push(this.formManager[key]);
        }

        /**
         * 여기에서도 새 입력과 수정을 구분해서 해줘야 하는데 주의 할 점은
         * 새로운 매니저 등록은 밴더의 아이디가 필요하다.
         * 새 입력이 아닌 경우는 밴더의 아이디가 필요 없다. 서버에서 밴더매니저는 한 유저당
         * 하나만 등록이 가능하기 때문에 서버에서 유저 토큰으로 유추를 할 수 있다. req.user.users[0].busienssVendorManager 로
         * this.vendorManagerId 로 새 입력과 업데이트를 구현하면, 끝~~~~
         **/

        if (this.vendorManagerId) {
          // console.log('update saveVendorManager', this.vendorManagerId, items);
          const serviceManager = new Manager(this);
          serviceManager.patch(this.vendorManagerId, items).catch(() => {
            alert('매니저 업데이트 실패');
            return Promise.resolve(false);
          });
        } else {
          // console.log('save saveVendorManager', this.vendorId, items);
          const serviceManager = new Manager(this);
          serviceManager.post(this.vendorId, items).catch(() => {
            alert('새로 입력 매니저 입력 실패');
            return Promise.resolve(false);
          });
        }

        // serivce.post
        return Promise.resolve(true);
      } else {
        alert('벤더 정보가 없습니다. 밴더를 검색해서 인증해주세요.');
        return Promise.resolve(false);
      }
    },
    buttonSwichManager() {
      this.$router.replace({ path: '/my-profile' });
    },
    async postField() {
      const items = Object.keys(this.form).map((i) => this.form[i]);
      const itemsLength = items.filter((v) => v.value !== '');

      if (Object.entries(this.form).length !== itemsLength) {
        // 모든 데이터를 입력해야 한다.
        alert('모든 항목을 입력해주세요.');
        return;
      }

      const params = { data: items };

      // console.log(params);

      const { resCode } = await new Vendor(this).post(params);

      if (resCode === 201) {
        alert('등록이 완료되었습니다.');
      }
    },
    async patchField() {
      const items = Object.keys(this.form).map((i) => this.form[i]);

      const { resCode } = await new Vendor(this).patch(this.vendorId, items);

      if (resCode === 201) {
        alert('수정이 완료되었습니다.');
      }
    },
    changeCompanyType(selectedValue, field) {
      this.form[field.id].value = selectedValue.id;
    },
    openLeftLayoutModal() {
      const searchLeftLayoutEl = this.$refs.SearchLeftLayout.$el;
      searchLeftLayoutEl.style = '';

      this.SEARCH_LEFT_ON();

      const bodyEl = this.$refs.ProfileForm.offsetParent;

      bodyEl.style.overflow = 'hidden';
    },
    openCenterLayoutModal(fieldChildNodes, field) {
      const searchCenterLayoutEl = this.$refs.SearchCenterLayout.$el;
      searchCenterLayoutEl.style = '';

      this.SEARCH_CENTER_ON();

      this.$store.commit(SEARCH_CENTER_SET.load, {
        companyTypes: fieldChildNodes,
        selectFieldValue: this.form[field.id].value,
      });

      this.selectField = field;

      const bodyEl = this.$refs.ProfileForm.offsetParent;

      bodyEl.style.overflow = 'hidden';
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
      // console.log('select company = ' + this.selectCompany);
    },
    // 필드 생성
    async profileInit() {
      const { result } = await new Field(this).get();

      this.getCompanyInfo = result[0];
      this.companyInformation = result[0].companyInformation;
      this.informationType = result[0].informationType;
      this.manager = result[0].manager;

      const form = {};
      const formManager = {};
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
        this.$set(formManager, key, { value: null, id: key });
      }

      setTimeout(() => {
        this.formManager = formManager;
        this.form = form;
      }, 0);
    },
    // 데이터를 주입해주는 구간
    companyCodeModalClose() {
      const selectCompanyFields = this.COMPANY_CODE_GET.company
        .businessVendorFieldValues;

      const form = {};
      this.vendorId = this.COMPANY_CODE_GET.company.id;

      for (const item of selectCompanyFields) {
        const field = item.businessVendorField;
        const key = field.id;
        if (item.businessVendorField.fieldType.columnType === 'idx') {
          // console.log('item.id:', item.id);
          this.$set(form, key, { value: item.value.id, id: item.id });
        } else {
          this.$set(form, key, { value: item.value, id: item.id });
        }
      }
      /**
       * Todo: 나중에 바이어와 매니저를 왔다 갔다 할 경우에 대해서 매니저로 등록 되어 있었다면,
       * 밴더를 조회 할때 매니저가 같이 오기 때문에 내가 지금 로그인한 계정의 매니저 아이디가 같다면,
       * 담당자 정보를 바인딩 해준다.
       *
      if (this.COMPANY_CODE_GET.company.businessVendorManagers.length) {
        // 유저가 소유한 밴더 매니저가 있는 경우 바인딩 해준다.
        const vendorManager = this.COMPANY_CODE_GET.company
          .businessVendorManagers;
        // this.vendorManagerId = result[0].id;
        // TODO 불러온 매니저 정보 바인딩 해준다.
        // 그리고 vendorManagerId 변수에 아이디 값을 넣어준다.
        // 그리고 불러온 매니저 정보를 토대로 밴더 정보를 불러오고,
        // 밴더 정보를 바인딩 해준다. this.companyCodeModalClose() 이 함수 처럼.

        for (const item of vendorManager) {
          // if (this.USER_GET)
          const fieldId = item.businessVendorField.id;
          if (item.businessVendorField.fieldType.columnType === 'idx') {
            this.$set(this.formManager, fieldId, {
              value: item.value.id,
              id: item.id,
            });
          } else {
            console.log(fieldId, item.id, item.value);
            this.$set(this.formManager, fieldId, {
              value: item.value,
              id: item.id,
            });
          }
        }
      }
       */

      setTimeout(() => {
        Object.assign(this.form, form);
        // this.from = form;
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

  .__manager-swich-button-buyer {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 30px;
    border-radius: 15px;
    border: 0;
    background-color: #a8a8a8;
    color: fff;
  }

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
        padding: 10px 20px;
        background-color: white;
        border-bottom: 1px solid #d3d3d3;
        position: relative;
        .__title {
          font-size: 15px;
          margin: 0;
        }
        input {
          font-size: 15px;
          width: 142px;
          height: 40px;
          padding: 0 10px;
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
        .__select-value {
          font-size: 15px;
          width: 142px;
          height: 40px;
          padding: 0 10px;
        }
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
