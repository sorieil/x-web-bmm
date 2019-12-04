<template>
  <div class="__container">
    <div class="__vendor-info">
      <div class="__logo">
        <img v-img="''" />
      </div>
      <div class="__about">
        <p>{{ topField }}</p>
      </div>
      <div class="__detail">
        <div v-for="(item, index) of vendorFields" :key="index">
          <div v-if="item.value">
            <p v-if="!item.value.text">
              <span>{{ item.businessVendorField.name }}</span>
              {{ item.value }}
            </p>
            <p v-else>
              <span>{{ item.businessVendorField.name }}</span>
              {{ item.value.text }}
            </p>
          </div>
        </div>
      </div>
      <div class="__manager">
        <h3>담당자</h3>
        <div v-for="(manager, index) in managers" :key="index">
          <div class="__profile">
            <div class="__profile-img">
              <img v-img="''" />
            </div>
            <p v-managerName="manager.businessVendorFieldManagerValues"></p>
          </div>
          <div class="__manager-detail">
            <div
              v-for="(field,
              index1) in manager.businessVendorFieldManagerValues"
              :key="index1"
            >
              <p v-if="field.businessVendorField.name !== '담당자명'">
                <span>{{ field.businessVendorField.name }}</span>
                {{ field.value }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="__product">
        <h3>제품소개</h3>
        <div class="__about-product">
          <p>{{ bottomField }}</p>
        </div>
      </div>
      <div class="__meeting">
        <button
          v-show="USER_GET.type === 'buyer'"
          @click="goMeeting"
          class="__meeting-btn"
          type="button"
        >
          미팅신청
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import DirectiveImage from '../../mixin/directive_image';
import VendorMixin from '../../mixin/vendor';
import MixinUser from '../../mixin/user';
import ServerVendor from '../../api/server_vendor';
import Vendor from '../../service/vendor';
import { SUB_HEADER_SET } from '../../store/constant_types';
export default {
  layout: 'sub_default',
  validate({ params }) {
    console.log('params:', params);
    // 숫자만 가능합니다.
    return /^\d+$/.test(params.id);
  },
  components: {},
  directives: {
    managerName: {
      inserted(el, binding, vnode) {
        const item = binding.value;
        const managerName = item.filter(
          (v) => v.businessVendorField.name === '담당자명'
        )[0].value;
        vnode.elm.textContent = managerName;
      },
    },
  },
  mixins: [DirectiveImage, VendorMixin, MixinUser],
  data() {
    return {};
  },
  async asyncData({
    app,
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
  }) {
    let topField = null;
    let bottomField = null;
    const vendorFields = [];
    const managers = [];

    if (route.params.id) {
      if (process.server) {
        const { result } = await new ServerVendor(req)._getVendor(
          route.params.id
        );
        console.log('result[0]:', result[0]);
        for (const field of result[0].businessVendorFieldValues) {
          if (field.businessVendorField.name === '제품소개') {
            topField = field.value;
            bottomField = field.value;
          } else {
            vendorFields.push(field);
          }
        }

        managers.push(...result[0].businessVendorManagers);
      }
    }
    return {
      vendorFields,
      managers,
      topField,
      bottomField,
    };
  },
  mounted() {
    console.log('before message:', this.vendorFields);
    this.vendorInit().then(() => {
      setTimeout(() => {
        for (const item of this.vendorFields) {
          if (item.businessVendorField.name === '기업명') {
            console.log('header:', item.value);
            this.$store.commit(SUB_HEADER_SET.load, {
              subHeaderTitle: item.value,
            });
          }
        }
      }, 100);
    });
  },
  methods: {
    goMeeting() {
      this.$router.push('/meeting/' + this.$route.params.id);
    },
    async vendorInit() {
      if (this.managers.length === 0) {
        const { result } = await new Vendor(this).selectGet(
          this.$route.params.id
        );
        console.log('result[0]:', result[0]);
        for (const field of result[0].businessVendorFieldValues) {
          if (field.businessVendorField.name === '제품소개') {
            this.topField = field.value;
            this.bottomField = field.value;
          } else {
            this.vendorFields.push(field);
          }
        }

        this.managers.push(...result[0].businessVendorManagers);
      }
    },
  },
};
</script>

<style lang="scss">
.__vendor-info {
  display: inline-block;
  width: 100%;
  padding-top: 40px;
  .__logo {
    width: 90px;
    margin: 20px auto;
    > img {
      width: 100%;
    }
  }
  .__about {
    padding: 0 20px;
    > p {
      font-size: 13px;
      color: #777;
      line-height: 1.5;
      word-break: keep-all;
      margin: 0;
    }
  }
  .__detail {
    padding: 0 20px;
    margin: 20px 0;
    > div {
      > div {
        > p {
          color: #262626;
          font-weight: 300;
          word-break: break-all;
          > span {
            margin-right: 3px;
            font-weight: 400;
          }
        }
      }
    }
  }
  .__manager {
    background-color: #f2f2f2;
    overflow: auto;
    > h3 {
      padding: 0 20px;
      color: #535353;
      margin: 13px 0;
      font-size: 14px;
      font-weight: 400;
    }
    > div {
      background-color: white;
      display: flex;
      align-items: center;
      padding: 10px 20px;
      margin-bottom: 10px;
      &:last-child {
        margin: 0;
      }
    }
    .__profile {
      display: flex;
      align-items: center;
      .__profile-img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        border: 1px solid #f1f1f1;
        > img {
          width: 100%;
          position: absolute;
          top: 50%;
          transform: translate(0, -50%);
        }
      }
      > p {
        font-size: 14px;
        color: #262626;
        margin-left: 10px;
      }
    }
    .__manager-detail {
      margin-left: auto;
      margin-right: 20px;
      max-width: 170px;
      > div {
        > p {
          font-weight: 300;
          color: #262626;
          > span {
            margin-right: 3px;
            font-weight: 400;
          }
        }
      }
    }
  }
  .__product {
    background-color: #f2f2f2;
    overflow: auto;
    > h3 {
      padding: 0 20px;
      color: #535353;
      margin: 13px 0;
      font-size: 14px;
      font-weight: 400;
    }
    .__about-product {
      background-color: white;
      overflow: auto;
      > p {
        color: #262626;
        font-weight: 300;
        padding: 0 20px;
        word-break: keep-all;
        line-height: 1.8;
        font-size: 12px;
      }
    }
  }
  .__meeting {
    background-color: #f2f2f2;
    .__meeting-btn {
      font-size: 16px;
      left: 50%;
      position: relative;
      transform: translate(-50%, 0);
      width: 80%;
      padding: 14px;
      margin: 30px 0;
      background: #e83828;
      border: #e83828;
      border-radius: 50px;
      color: white;
    }
  }
}
</style>
