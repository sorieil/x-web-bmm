<template>
  <div class="__container">
    <div class="__search-box">
      <SearchForm />
      <SelectForm />
      <div class="__filter">
        <button @click="openFilter">
          <img src="../assets/images/common/icon_filter.svg" />
          <span>필터</span>
        </button>
      </div>
    </div>
    <div class="__company-list">
      <div v-for="(vender, index) in venders" :key="index" class="__company">
        <div class="__logo">
          <img v-img="''" />
        </div>
        <div class="__info-box" @click="selectVender(index)">
          <ul>
            <li class="__name">
              <span>{{ vender.name }}</span>
            </li>
            <li>
              <span>{{ vender.companyName }}</span>
            </li>
            <li>
              <span>{{ vender.keyword }}</span>
            </li>
          </ul>
        </div>
        <div class="__favorite">
          <IconFavorite />
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
import ModalFull from '../mixin/modal_full';
export default {
  // layout: 'default1',
  components: {
    SearchForm,
    SelectForm,
    IconFavorite,
  },
  mixins: [DirectiveImage, ModalFull],
  data() {
    return {
      companyName: 'xSync',
      venders: [
        {
          name: 'PXD',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
        {
          name: 'pxd',
          companyName: '피엑스코리아',
          keyword: '#IT #KOREA #Strong #LOL',
        },
      ],
    };
  },
  mounted() {
    // console.log(process)
  },
  methods: {
    openFilter() {
      this.MODAL_FULL_ACTION_ON();
      // 필터를 부르기전에 그전에 설정해놓은 필터가 있는 경우에는 세팅을 해줘야 하는데...
      // 필터를 다시 설정하게 하는것이 아니라 필터를 캐싱해둬야 한다.
    },
    closeFilter() {
      // 필터가 닫힐때 데이터를 다시 불러와야 한다.
    },
    selectVender(index) {
      const vender = this.venders[index];
      console.log(vender);
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
      height: 68px;
      position: relative;
      display: flex;
      margin: 0 0 20px 0;
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
