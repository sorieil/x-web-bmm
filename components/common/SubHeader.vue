<template>
  <div class="sub-Header" :style="{ backgroundColor: propHeaderBg }">
    <div class="__menu" @click="goBack">
      <i class="material-icons-round __icon">keyboard_backspace</i>
    </div>
    <div class="__messages">
      <div class="__title">
        <span>{{ propName }}</span>
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
    propName: {
      default: 'test',
      type: String,
    },
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
.sub-Header {
  background-color: yellow;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  height: 40px;

  .__menu {
    position: absolute;
    top: 7px;
    left: 16px;
    color: white;
    .__icon {
      font-size: 2.4em;
    }
  }

  .__messages {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translate(-50%, 0);
    display: block;

    .__title {
      > span {
        font-size: 18px;
        color: white;
      }
    }
  }
}
</style>
