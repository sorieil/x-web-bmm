<template>
  <div class="__container">
    <div class="__search-box">
      <SearchForm v-model="searchData" v-on:submit="submitSearchForm" />
      <SelectForm ref="SelectForm" v-on:change="changeSelectForm" />
      <div class="__filter">
        <button @click="openFilter">
          <img src="../assets/images/common/icon_filter.svg" />
          <span>필터</span>
        </button>
      </div>
    </div>
    <div class="__company-list">
      <div
        v-for="(vendor, index) in VENDOR_GET.vendors"
        ref="vendorItem"
        :key="index"
        class="__company"
        :class="{
          '__not-favorite': !vendor.businessVendorFavorite,
          '__not-meeting': !vendor.businessVendorMeeting,
        }"
      >
        <div class="__logo">
          <img v-img="''" />
        </div>
        <div class="__info-box" @click="selectVendor(vendor)">
          <ul>
            <li class="__name">
              <span>{{ vendor.companyName }}</span>
            </li>
            <li>
              <span v-if="vendor.businessVendor.businessVendorFieldValues[1]">
                {{
                  vendor.businessVendor.businessVendorFieldValues[1]
                    .businessVendorField.name
                }}
              </span>
            </li>
            <li>
              <span>{{ vendor.keyword }}</span>
            </li>
          </ul>
        </div>
        <div
          class="__favorite"
          :class="{ '__favorite-active': vendor.businessVendorFavorite }"
        >
          <IconFavorite
            v-model="vendor.businessVendorFavorite"
            v-on:change="changeIconFavorite(vendor, $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchForm from '../components/base_forms/SearchForm';
import SelectForm from '../components/base_forms/SelectForm';
import IconFavorite from '../components/features/IconFavorite';
import DirectiveImage from '../mixin/directive_image';
import Vendor from '../service/vendor';
import Favorite from '../service/favorite';
import FilterMixin from '../mixin/filter';
import VendorMixin from '../mixin/vendor';
import { VENDOR_SET, SUB_HEADER_SET } from '../store/constant_types';
export default {
  components: {
    SearchForm,
    SelectForm,
    IconFavorite,
  },
  mixins: [DirectiveImage, FilterMixin, VendorMixin],
  data() {
    return {
      companyName: 'xSync',
      selectFormIndex: null,
      searchData: null,
    };
  },
  mounted() {
    this.getServiceVendorList();

    this.$store.commit(SUB_HEADER_SET.load, { beforeRoutePath: '/' });
  },
  methods: {
    openFilter() {
      this.FILTER_ACTION_ON();
      // 필터를 부르기전에 그전에 설정해놓은 필터가 있는 경우에는 세팅을 해줘야 하는데...
      // 필터를 다시 설정하게 하는것이 아니라 필터를 캐싱해둬야 한다.
    },
    selectVendor(vendor) {
      console.log(vendor);
      localStorage.setItem(
        'selectVendorItem',
        JSON.stringify(vendor.businessVendor)
      );

      this.$router.replace({ path: 'vender' });
    },
    async getServiceVendorList() {
      const { result } = await new Vendor(this).get();
      this.$store.commit(VENDOR_SET.load, { vendors: result });
    },
    async changeIconFavorite(vendor, status) {
      const id = vendor.businessVendor.id;
      const activeIcon = event.target.parentElement.parentElement;

      if (status) {
        await new Favorite(this).post(id);
        if (!activeIcon.classList.contains('__favorite-active')) {
          activeIcon.classList.add('__favorite-active');
          activeIcon.parentElement.classList.remove('__not-favorite');
        }
      } else {
        await new Favorite(this).delete(id);
        if (activeIcon.classList.contains('__favorite-active')) {
          activeIcon.classList.remove('__favorite-active');
          activeIcon.parentElement.classList.add('__not-favorite');
        }
      }

      if (this.VENDOR_GET.selectFormStatus) {
        this.changeSelectForm(this.VENDOR_GET.selectFormStatus);
      }
    },
    changeSelectForm(status) {
      this.$store.commit(VENDOR_SET.load, { selectFormStatus: status });
      const vendorItems = this.$refs.vendorItem;

      this.$store.commit(VENDOR_SET.load, { selectedFilterItems: status });

      console.log(status.value);

      if (status.value === 'favorite') {
        for (const vendorItem of vendorItems) {
          if (vendorItem.classList.contains('__not-meeting')) {
            vendorItem.style = '';
          }
          if (vendorItem.classList.contains('__not-favorite')) {
            vendorItem.style.display = 'none';
          }
        }
      } else if (status.value === 'meeting') {
        for (const vendorItem of vendorItems) {
          if (vendorItem.classList.contains('__not-meeting')) {
            vendorItem.style.display = 'none';
          }
        }
      } else if (status.value === 'all') {
        for (const vendorItem of vendorItems) {
          if (vendorItem.classList.contains('__not-favorite')) {
            vendorItem.style = '';
          }
        }
      }
    },
    async submitSearchForm() {
      const params = { keyword: this.searchData };

      const { result } = await new Vendor(this).searchGet(params);

      this.$store.commit(VENDOR_SET.load, {
        vendors: result,
      });
    },
  },
};
</script>

<style lang="scss">
.__container {
  flex: 1;
  min-height: 100vh;
  padding: 0 0 1px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  .__search-box {
    width: 100%;
    height: 100px;
    position: relative;
    .SearchForm {
      position: absolute;
      top: 10px;
      left: 12px;
      right: 12px;
    }

    .SelectForm {
      position: absolute;
      top: 48px;
      left: 14px;
    }

    .__filter {
      position: absolute;
      width: 60px;
      height: 25px;
      right: 13px;
      bottom: 24px;
      display: block;

      button {
        position: relative;
        right: 0;
        background-color: transparent;
        border: 0;
        outline: none;
        width: inherit;
        height: inherit;
        cursor: pointer;
        padding: 0;
        text-align: right;

        img {
          position: absolute;
          top: 6px;
          left: 11px;
        }

        span {
          font-weight: 300;
          font-size: 1.43em;
        }
      }
    }
  }

  .__company-list {
    width: 100%;
    height: 100vh;
    // border: 1px dotted red;
    .__company {
      position: relative;
      display: flex;
      margin: 0 0 20px 0;
      padding-bottom: 15px;
      ::before {
        display: block;
        content: '';
        position: absolute;
        bottom: 0;
        left: 20px;
        right: 0;
        height: 1px;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 1px solid #d3d3d3;
      }

      .__logo {
        border: 1px solid #d3d3d3;
        margin: 0 0 0 13px;
        width: 55px;
        height: 55px;
        overflow: hidden;
        border-radius: 55px;
        position: relative;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }

      .__info-box {
        flex: 1;
        // border: 1px solid red;
        margin: 0 0 0 11px;
        ul {
          padding: 0;
          margin: 0;
          list-style: none;
          li {
            line-height: 16px;
            margin: 0;
            padding: 0;
            color: #777777;
            &.__name {
              color: #000000;
              line-height: 13px;
              margin: 0 0 7px 0;
              span {
                font-size: 1.25em;
                font-weight: 500;
              }
            }
          }
        }
      }

      .__favorite {
        width: 15px;
        margin: 0 15px 0 0;
        .IconFavorite {
          i {
            font-size: 2em;
          }
        }
      }
    }
  }
}
</style>
