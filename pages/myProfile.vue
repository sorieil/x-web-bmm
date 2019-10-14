<template>
  <div ref="ProfileForm" class="__container">
    <div class="__my-profile">
      <div class="__select" @click="openLeftLayoutModal">
        <p class="__title">기업선택</p>
        <i class="material-icons">keyboard_arrow_right</i>
      </div>
      <div class="__form-info">
        <h3>기업 정보</h3>
        <div class="__form-content">
          <div class="__item">
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
          </div>
          <div class="__item">
            <p class="__title">기업명</p>
            <input placeholder="내용을 입력하세요." />
          </div>
          <div class="__item">
            <p class="__title">대표명</p>
            <input placeholder="내용을 입력하세요." />
          </div>
        </div>
      </div>
      <div class="__form-info">
        <h3>참가 정보</h3>
        <div class="__form-content">
          <div class="__select" @click="openCenterLayoutModal">
            <p class="__title">업체구분</p>
            <i class="material-icons">keyboard_arrow_right</i>
          </div>
          <div class="__select" @click="openCenterLayoutModal">
            <p class="__title">제품서비스</p>
            <i class="material-icons">keyboard_arrow_right</i>
          </div>
          <div class="__item">
            <p class="__title">관심분야</p>
            <input placeholder="내용을 입력하세요." />
          </div>
          <div class="__item __textarea-wrap">
            <p class="__title">제품소개</p>
            <textarea placeholder="내용을 입력하세요." />
          </div>
        </div>
      </div>
      <div class="__form-info">
        <h3>담당자 정보</h3>
        <div class="__form-content">
          <div class="__item">
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
          </div>
          <div class="__item">
            <p class="__title">담당자명</p>
            <input placeholder="내용을 입력하세요." />
          </div>
          <div class="__item">
            <p class="__title">연락처</p>
            <input placeholder="내용을 입력하세요." />
          </div>
          <div class="__item">
            <p class="__title">이메일</p>
            <input placeholder="내용을 입력하세요." />
          </div>
        </div>
      </div>
      <p class="__copy">
        * 작성된 정보는 제3자에게 노출되는 것을 알려드립니다.
      </p>
    </div>
    <SearchLeftLayout />
    <SearchCenterLayout />
    <CompanyCode />
  </div>
</template>
<script>
import DirectiveImage from '../mixin/directive_image';
import Filter from '../mixin/filter';
import SearchLeft from '../mixin/search_left';
import SearchCenter from '../mixin/search_center';
import SearchLeftLayout from '../components/select_modal/SearchLeftLayout';
import SearchCenterLayout from '../components/select_modal/SearchCenterLayout';
import CompanyCode from '../components/input_modal/CompanyCode';
export default {
  layout: 'profileDefault',
  components: { SearchLeftLayout, SearchCenterLayout, CompanyCode },
  mixins: [DirectiveImage, Filter, SearchLeft, SearchCenter],
  data() {
    return {
      searchLeftLayoutModal: false,
      searchCenterLayoutModal: false,
      companyCodeModal: false,
      companyCodeStatus: null,
      selectCompany: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      const modalBg = document.getElementsByClassName('__overlay');
      for (let i = 0; i < modalBg.length; i++) {
        if (modalBg[i].parentElement.classList.contains('__company-code')) {
          modalBg[i].addEventListener('click', () => {
            this.closeCompanyModal();
          });
        }
      }
    });
  },
  methods: {
    openLeftLayoutModal() {
      this.SEARCH_LEFT_ON();

      const bodyEl = this.$refs.ProfileForm.offsetParent;

      bodyEl.style.overflow = 'hidden';
    },
    openCenterLayoutModal() {
      this.SEARCH_CENTER_ON();

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
  },
};
</script>

<style lang="scss">
.__my-profile {
  background-color: #f4f4f4;
  min-height: calc(100vh - 40px);
  overflow: auto;
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
