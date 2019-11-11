<template>
  <div class="Default">
    <Header id="Header" ref="Header" :prop-header-option="headerOption" />
    <div class="__side-company-name">
      <span class="__text">
        <i class="material-icons __icon">remove</i>
        {{ companyName }}
      </span>
    </div>
    <div ref="Containers" class="__containers" @scroll="headerScroll">
      <div class="__shodow-box"></div>
      <nuxt />
    </div>
    <div
      ref="filterModal"
      :class="{
        fadeInUpBig: FILTER_GET.status,
        fadeOutUpBig: !FILTER_GET.status,
      }"
      class="__filter-modal animated"
    >
      <div class="__header">
        <button class="__reset" @click="checkReset">
          <span>Reset</span>
        </button>
        <span class="__title">Filter</span>
        <button class="__close" @click="closeFilter">
          <i class="material-icons-round">close</i>
        </button>
      </div>
      <ul class="__tabs">
        <li v-for="(item, index) in filters" :key="index">
          <div
            class="__tab"
            :class="{ __active: filterActive === index }"
            @click="selectTab(index, $event)"
          >
            {{ item.name }}
          </div>
        </li>
      </ul>
      <ul class="__items">
        <li
          v-for="(item, index) in filterChild"
          ref="FilterItem"
          :key="index"
          class="__item"
        >
          <span>{{ item.text }}</span>
          <IconCheckbox
            :id="'filterCheckbox-' + item.id"
            :index="index"
            v-on:change="changeIconCheckbox(item.id)"
          />
        </li>
      </ul>
    </div>

    <div class="__schedule-icon-wrap" @click="selectUserTypeOpen">
      <img src="../assets/images/common/icon_schedule.svg" />
    </div>

    <!-- <SelectUserType /> -->
  </div>
</template>

<script>
// 모달의 슬롯은 따로 만들지 않는다. 이유는 레이아웃 단에서만 불러와야 하기 때문에 특정 브라우저(사파리) 경우 트리구조를 엄격하게 따진다.
// 그래서 최상단 부모 레이아웃에서 모달을 불러와야 하기 때문이다. 컴포넌트로 만들면, Prop의 햇갈림도 있기에.. 현재까지는 모달 컴포넌트가
// 많은것도 아니고,... 여튼..ㅎㅎㅎ
import Header from '../components/common/Header';
import IconCheckbox from '../components/features/IconCheckbox';
// import SelectUserType from '../components/select_modal/SelectUserType';
import { VENDOR_SET } from '../store/constant_types';
import Vendor from '../service/vendor';
import Filter from '../service/filter';
import MixInFilter from '../mixin/filter';
import UserType from '../mixin/select_user_type';
import VendorMixin from '../mixin/vendor';
import MixinUser from '../mixin/user';
export default {
  middleware: ['auth'],
  components: {
    Header,
    IconCheckbox,
    // SelectUserType,
  },
  mixins: [MixInFilter, UserType, VendorMixin, MixinUser],
  data() {
    return {
      targetHeader: '',
      minimumHeaderHeight: '50',
      maxiumHeaderHeight: '137',
      lastScrollTopValue: 0,
      headerOption: false,
      companyName: 'xSync',
      filters: [],
      filterChild: [],
      filterStatus: false,
      filterActive: null,
      checkedFilterItems: [],
    };
  },
  created() {
    // console.log('server? ', process.server, this.$context);
  },
  mounted() {
    this.getServiceFilterType().then(() => {
      this.selectTab(0);
    });
  },
  methods: {
    filterOpen() {
      this.FILTER_ACTION_ON();
    },
    async closeFilter() {
      this.FILTER_ACTION_OFF();

      const filterListItems = this.$refs.filterModal.children[2].children;
      const activeFilterItemsId = [];

      for (const item of filterListItems) {
        if (item.children[1].firstChild.classList.contains('__active')) {
          const activeFilterItem = item.children[1].firstChild;
          const activeFilterItemIndex = activeFilterItem.id.split('-')[1];

          activeFilterItemsId.push(this.filterChild[activeFilterItemIndex].id);
        }
      }

      const params = { filter: activeFilterItemsId.join(',') };

      const { result } = await new Vendor(this).searchGet(params);

      this.$store.commit(VENDOR_SET.load, {
        vendors: result,
        selectedFilters: params,
      });

      const status = this.VENDOR_GET.selectedFilterItems;
      const vendorItems = this.$refs.Containers.lastElementChild
        .lastElementChild.children;

      setTimeout(() => {
        if (status) {
          if (status.value === 'favorite') {
            for (const vendorItem of vendorItems) {
              console.log(vendorItem);
              if (vendorItem.classList.contains('__not-favorite')) {
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
        }
      }, 100);
    },
    selectUserTypeOpen() {
      // this.USER_TYPE_ON();
      if (this.USER_GET.type === 'buyer') {
        this.$router.push({ path: 'my-schedule' });
      } else {
        this.$router.push({ path: 'my-schedule-manager' });
      }
    },
    selectTab(index, $event) {
      // const filterActive = this.filters[index].name;
      this.filterChild = this.filters[index].fieldChildNodes;
      this.filterActive = index;

      setTimeout(() => {
        this.checkReset();

        if ($event) {
          const filterItemsEl =
            $event.target.parentElement.parentElement.nextElementSibling
              .children;

          for (const checkedItem of this.checkedFilterItems) {
            for (const item of filterItemsEl) {
              const itemId = item.lastElementChild.id.split('-')[1] * 1;
              if (checkedItem === itemId) {
                for (const filterItem of this.$refs.FilterItem) {
                  if (
                    filterItem.lastElementChild.id ===
                    'filterCheckbox-' + itemId
                  ) {
                    setTimeout(() => {
                      filterItem.lastElementChild.click();
                    }, 10);
                  }
                }
              }
            }
          }
        }
      }, 10);
    },
    async getServiceFilterType() {
      const { result } = await new Filter(this).get();
      this.filters = result;
    },
    handleFilter() {},
    headerScroll(e) {
      const top = e.target.scrollTop;
      if (top > this.maxiumHeaderHeight) {
        this.$refs.Header.$el.classList.add('__active');
        this.headerOption = true;
      } else {
        this.$refs.Header.$el.classList.remove('__active');
        this.headerOption = false;
      }
    },
    changeIconCheckbox(id) {
      const status = this.VENDOR_GET.selectedFilters;
      const vendorItems = this.$refs.Containers.lastElementChild
        .lastElementChild.children;

      if (status) {
        if (status.value === 'favorite') {
          for (const vendorItem of vendorItems) {
            if (vendorItem.classList.contains('__not-favorite')) {
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
      } else {
        for (const vendorItem of vendorItems) {
          if (vendorItem.classList.contains('__not-favorite')) {
            vendorItem.style = '';
          }
        }
      }

      if (!event.target.classList.contains('__active')) {
        this.checkedFilterItems.push(id);

        this.checkedFilterItems = Array.from(new Set(this.checkedFilterItems));
      }
    },
    checkReset() {
      this.$refs.FilterItem.forEach((el) => {
        const checkIcons = el.children[1].firstChild;
        if (checkIcons.classList.contains('__active')) {
          checkIcons.click();
        }
      });
    },
  },
};
</script>
<style lang="scss">
body {
  position: fixed;
}

.Default {
  display: flex;
  flex-direction: column;
  position: relative;

  .Header {
    width: 100vw;
    height: 138px;
    position: absolute;
    z-index: 100;
    opacity: 1;

    &.__active {
      height: 50px;
    }
  }

  .__containers {
    padding: 0 0 40px 43px;
    height: 100vh; /* Fallback for browsers that do not support Custom Properties */
    height: calc(var(--vh, 1vh) * 100);
    width: 100vw;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

    .__shodow-box {
      height: 138px;
      width: inherit;
      display: block;
      content: '';
      // background-color: yellowgreen;
    }
  }
  .__side-company-name {
    position: absolute;
    top: 0;
    left: 0;
    width: 43px;
    height: 100vh;
    display: block;
    background-color: #eaeaea;

    .__text {
      position: relative;
      width: 130px;
      top: 208px;
      left: -40px;
      margin: auto;
      position: absolute;
      line-height: 1em;
      justify-items: center;
      color: #a5a5a5;
      transform: rotate(90deg);

      .__icon {
        position: relative;
        top: 4px;
      }
    }
  }
  .__filter-modal {
    // opacity: 0;
    // visibility: hidden;
    position: absolute;
    z-index: 9999;
    display: block;
    margin: 0;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;

    &.__open {
      visibility: visible;
    }

    .__header {
      position: relative;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      border-bottom: 1px solid #d3d3d3;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      span {
        font-size: 1.33em;
      }

      button {
        border: none;
        outline: none;
        background-color: transparent;
      }

      .__reset {
        position: absolute;
        font-size: 1em;
        font-weight: 300;
        left: 0;
      }

      .__title {
        font-size: 1.5em;
        font-weight: 500;
      }

      .__close {
        position: absolute;
        right: 0;
      }
    }

    .__tabs {
      background-color: white;
      list-style: none;
      width: inherit;
      border-top: 0;
      border-left: 0;
      border-right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      margin: 0;
      li {
        line-height: 30px;
        text-align: center;
        flex: 1;
        .__tab {
          width: inherit;
          line-height: inherit;
          font-size: 16px;
          padding: 7px 0;
          border-bottom: 1px solid #d3d3d3;
          color: #a5a5a5;
        }
        .__active {
          background-color: white !important;
          color: #e83828;
          border-bottom: 3px solid #e83828;
        }
      }
    }
  }
  .__schedule-icon-wrap {
    position: fixed;
    right: 20px;
    bottom: 3vh;
    background: #e83828;
    padding: 14px;
    border-radius: 50%;
  }
}
</style>
