<template>
  <div class="__header" :style="{ backgroundColor: propHeaderBg }">
    <div class="__menu">
      <i class="material-icons-round">menu</i>
    </div>
    <div class="__logo">
      <img :src="propLogoImage" class="__img" />
    </div>
    <div class="__messages">
      <div class="__text">{{ propMessages }}</div>
      <div class="__company-name">{{ propCompanyName }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  props: {
    propHeaderBg: {
      default: '#02152A',
      type: String
    },
    propLogoImage: {
      default: require('../../assets/images/common/icon_default_logo.svg'),
      type: String
    },
    propMessages: {
      default: '원하는 바이어/벤더를 찾아 미팅을 성공시키세요!!',
      type: String
    },
    propCompanyName: {
      default: '매치메이킹',
      type: String
    }
  }
}
</script>
<style lang="scss" scoped>
.__header {
  background-color: yellow;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  height: 10em;

  .__logo {
    position: absolute;
    top: 1em;
    right: 2em;
    .__img {
      object-fit: contain;
      border: 0;
    }
  }

  .__menu {
    position: absolute;
    top: 1em;
    left: 2em;
    color: white;
  }

  .__messages {
    // border: 1px solid white;
    position: relative;
    margin: 4em 2em 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .__text {
      color: honeydew;
      font-size: 0.8em;
    }

    .__company-name {
      margin: 0.3em 0 0 0;
      color: white;
      font-size: 2em;
    }
  }
}
</style>
