<template>
  <div ref="ProfileForm" class="__container">
    <div class="__my-profile">
      <div class="__form-info">
        <h3>나의 정보</h3>
        <div class="__form-content">
          <div class="__item">
            <p class="__title">담당자명</p>
            <input v-model="form.name" placeholder="내용을 입력하세요." />
          </div>
          <div class="__item">
            <p class="__title">연락처</p>
            <input v-model="form.phone" placeholder="내용을 입력하세요." />
          </div>
          <div class="__item">
            <p class="__title">이메일</p>
            <input
              v-model="form.email"
              type="email"
              placeholder="이메일 입력하세요."
            />
          </div>
        </div>
      </div>
      <button class="__manager-swich-button" @click="buttonSwichManager">
        매니저 전환
      </button>
    </div>
  </div>
</template>
<script>
import DirectiveImage from '../mixin/directive_image';
import Filter from '../mixin/filter';
import SearchLeft from '../mixin/search_left';
import SearchCenter from '../mixin/search_center';
import CompanyCodeMixin from '../mixin/company_code';
import MixsinUser from '../mixin/user';
import Buyer from '../service/buyer';
import {
  SUB_HEADER_SET,

  // SEARCH_LEFT_SET,
  // FIELD_SET,
} from '../store/constant_types';

export default {
  layout: 'profile_default',
  mixins: [
    DirectiveImage,
    Filter,
    SearchLeft,
    SearchCenter,
    CompanyCodeMixin,
    MixsinUser,
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
      selectBoxValue: null,
      requestType: 'post',
      selectField: null,
      getCompanyInfo: null,
      form: {
        name: null,
        phone: null,
        email: null,
      },
    };
  },
  mounted() {
    this.$store.commit(SUB_HEADER_SET.load, { subHeaderTitle: '정보입력' });

    this.$nextTick(() => {
      this.getBuyer();
      const profileHeaderButton = document.querySelector(
        '#profileHeaderButton'
      );
      if (profileHeaderButton) {
        profileHeaderButton.addEventListener(
          'click',
          this.actionsHeaderCompleteButton
        );
      }
    });
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
    actionsHeaderCompleteButton() {
      if (this.requestType === 'post') {
        // this.postField();
        this.checkForm();
      } else if (this.requestType === 'patch') {
        this.patchField();
      }
    },
    buttonSwichManager() {
      this.$router.replace({ path: '/my-profile-manager' });
    },
    getBuyer() {
      const service = new Buyer(this);
      service.get().then(({ result, resCode }) => {
        console.log(result, resCode);
        if (resCode === 200) {
          if (result[0] !== null) {
            const buyer = result[0];
            for (const [key, value] of Object.entries(buyer)) {
              console.log(key, value);
              this.form[key] = value;
            }
          }
        }
      });
    },
    checkForm(e) {
      const formCheckCount = Object.entries(this.form)
        .filter(([key, value]) => key !== 'profileImage')
        .every(([key, value]) => {
          console.log('v:', key, value);
          return value !== null && value !== '';
        });
      console.log(formCheckCount);
      if (formCheckCount) {
        // 여기에서 패치인지 포스트 인지 구별
        const service = new Buyer(this);
        service
          .post(this.form)
          .then(({ resCode }) => {
            if (resCode === 200) {
              alert('바이어 설정 성공');
            } else if (resCode === 201) {
              alert('수정 완료');
            }
          })
          .catch((e) => {
            alert('정상적인 데이터를 넣어주세요.');
          });
      } else {
        alert('모든 항목을 입력해주세요.');
      }

      // this.errors = [];

      // if (!this.name) {
      //   this.errors.push('Name required.');
      // }
      // if (!this.age) {
      //   this.errors.push('Age required.');
      // }
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

  .__manager-swich-button {
    position: relative;
    top: 20px;
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
