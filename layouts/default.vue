<template>
  <div class="__default">
    <Header id="Header" ref="Header" :prop-header-option="headerOption" />
    <div class="__side-company-name">
      <span class="__text">
        <i class="material-icons __icon">remove</i>
        {{ companyName }}
      </span>
    </div>
    <div class="__containers" @scroll="headerScroll">
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
        <button class="__reset">
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
            @click="selectTab(index)"
          >
            {{ item.name }}
          </div>
        </li>
      </ul>
      <ul class="__items">
        <li
          v-for="(item, index) in filterChild"
          :key="index"
          class="__item"
          :class="[item.active ? '__active' : '']"
        >
          <span>{{ item.name }}</span>
          <IconCheckbox v-model="item.active" />
        </li>
      </ul>
    </div>

    <div class="__schedule-icon-wrap">
      <img src="../assets/images/common/icon_schedule.svg" />
    </div>
  </div>
</template>

<script>
// 모달의 슬롯은 따로 만들지 않는다. 이유는 레이아웃 단에서만 불러와야 하기 때문에 특정 브라우저(사파리) 경우 트리구조를 엄격하게 따진다.
// 그래서 최상단 부모 레이아웃에서 모달을 불러와야 하기 때문이다. 컴포넌트로 만들면, Prop의 햇갈림도 있기에.. 현재까지는 모달 컴포넌트가
// 많은것도 아니고,... 여튼..ㅎㅎㅎ
import Header from '../components/common/Header';
// import Code from '../service/code';
// import Base from '../service/base';
import IconCheckbox from '../components/features/IconCheckbox';
import { FILTER_SET } from '../store/constant_types';
import Filter from '../mixin/filter';
export default {
  // middleware: ['auth'],
  components: {
    Header,
    IconCheckbox,
  },
  mixins: [Filter],
  data() {
    return {
      targetHeader: '',
      minimumHeaderHeight: '50',
      maxiumHeaderHeight: '137',
      lastScrollTopValue: 0,
      headerOption: false,
      companyName: 'xSync',
      filters: [
        {
          name: '업체구분',
          items: [
            {
              name: '업체1',
              active: false,
            },
            {
              name: '업체2',
              active: false,
            },
            {
              name: '업체3',
              active: false,
            },
          ],
        },
        {
          name: '제품/서비스',
          items: [
            {
              name: '제품1',
              active: false,
            },
            {
              name: '제품2',
              active: false,
            },
            {
              name: '제품3',
              active: false,
            },
          ],
        },
        {
          name: '국가',
          items: [
            {
              name: '국가1',
              active: false,
            },
            {
              name: '국가2',
              active: false,
            },
            {
              name: '국가3',
              active: false,
            },
          ],
        },
      ],
      filterChild: [],
      filterStatus: false,
      filterActive: null,
    };
  },
  created() {
    console.log('server? ', process.server, this.$context);
  },
  mounted() {
    // this.getServiceFilterType();
    // new Base(this).setupToken().then((r) => {
    //   // console.log('default layout setup token', r)
    //   if (!r) {
    //     // 토큰 설정이 되지 않았습니다. 토큰을 입력해주세요.
    //     alert('토큰 설정이 안됐어요.');
    //   }
    // });
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        this.$refs.Header.documentElement.style.setProperty('--vh', `${vh}px`);
      });
    });

    setTimeout(() => {
      this.selectTab(0);
    }, 100);
  },
  methods: {
    filterOpen() {
      this.FILTER_ACTION_ON();
    },
    closeFilter() {
      this.FILTER_ACTION_OFF();

      const filter = this.filterChild.reduce((a, c) => {
        if (c.active) {
          a.push(c.active);
        }
        return a;
      }, []);

      this.$store.commit(FILTER_SET.load, { filter });
    },
    selectTab(index) {
      const filterActive = this.filters[index].name;
      this.filterChild = this.filters[index].items;
      this.filterActive = index;
      console.log('select tap:', filterActive);
    },
    async getServiceFilterType() {
      // const { result } = await new Code(this).getFilterType();
      //   console.log('========getFilterType result');
      //   console.log(result);
      //   console.log('========getFilterType result end');
      //   this.filters = result;
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
  },
};
</script>
<style lang="scss">
body {
  position: fixed;
}

.__default {
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
    position: absolute;
    right: 20px;
    bottom: 20px;
    background: #e83828;
    padding: 14px;
    border-radius: 50%;
  }
}
</style>
