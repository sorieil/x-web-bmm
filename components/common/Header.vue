<template>
  <div class="Header" :style="{ backgroundColor: propHeaderBg }">
    <div v-if="!propHeaderOption" class="__view-default-box">
      <div class="__menu">
        <i class="material-icons-round __icon">menu</i>
      </div>
      <div class="__logo">
        <img :src="propLogoImage" class="__img" />
      </div>
      <div class="__messages">
        <div class="__text">
          <span>{{ propMessages }}</span>
        </div>
        <div class="__company-name">
          <span>{{ propCompanyName }}</span>
        </div>
      </div>
    </div>
    <div v-else class="__view-option-box">
      <div class="__company-name">
        <span>{{ propCompanyName }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  props: {
    propHeaderBg: {
      default: '#02152A',
      type: String,
    },
    propLogoImage: {
      default: require('../../assets/images/common/icon_default_logo.svg'),
      type: String,
    },
    propMessages: {
      default: '원하는 바이어/벤더를 찾아 미팅을 성공시키세요!!',
      type: String,
    },
    propCompanyName: {
      default: '매치메이킹',
      type: String,
    },
    propHeaderOption: {
      default: false,
      type: Boolean,
    },
  },
};
</script>
<style lang="scss" scoped>
.Header {
  background-color: yellow;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  height: 10em;
  .__view-default-box {
    .__logo {
      position: absolute;
      top: 9px;
      right: 16px;
      .__img {
        object-fit: contain;
        border: 0;
      }
    }

    .__menu {
      position: absolute;
      top: 2px;
      left: 16px;
      color: white;
      .__icon {
        font-size: 2.4em;
      }
    }

    .__messages {
      position: absolute;
      top: 58px;
      left: 0;
      right: 20px;
      bottom: 0;
      display: block;

      .__text {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        color: honeydew;
        text-align: right;
      }

      .__company-name {
        position: absolute;
        top: 26px;
        right: 0;
        left: 0;
        text-align: right;
        span {
          font-weight: 500;
          color: white;
          font-size: 2.4em;
        }
      }
    }
  }

  .__view-option-box {
    display: flex;
    justify-content: center;
    align-items: center;
    .__company-name {
      span {
        font-weight: 500;
        color: white;
        font-size: 1.5em;
      }
    }
  }
  will-change: transition, height;
  transition: height 300ms ease-in-out;
}
</style>
