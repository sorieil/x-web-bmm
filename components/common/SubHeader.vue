<template>
  <div :style="{ backgroundColor: propHeaderBg }" class="SubHeader">
    <div @click="goBack" class="__menu">
      <i class="material-icons-round __icon">keyboard_backspace</i>
    </div>
    <div class="__messages">
      <div class="__title">
        <span>{{ SUB_HEADER_GET.subHeaderTitle }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import SubHeaderMixin from '../../mixin/sub_header';
export default {
  name: 'SubHeader',
  mixins: [SubHeaderMixin],
  props: {
    propHeaderBg: {
      default: '#02152A',
      type: String,
    },
    propName: {
      default: 'test',
      type: String,
    },
    propPath: {
      default: '/',
      type: String,
    },
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
  },
};
</script>
<style lang="scss" scoped>
.SubHeader {
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
