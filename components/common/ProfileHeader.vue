<template>
  <div class="sub-Header">
    <div class="__menu" @click="goBack">
      <i class="material-icons-round __icon">keyboard_backspace</i>
    </div>
    <div class="__messages">
      <div class="__title">
        <span>{{ propName }}</span>
      </div>
    </div>
    <div class="__complete">
      <span @click="goBack">완료</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  props: {
    propName: {
      default: '정보수정',
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
  background-color: white;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  height: 40px;
  border-bottom: 1px solid #d3d3d3;
  .__menu {
    position: absolute;
    top: 7px;
    left: 16px;
    color: #262626;
    .__icon {
      font-size: 2.4em;
    }
  }
  .__messages {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    display: block;
    .__title {
      > span {
        font-size: 18px;
        color: #02152a;
        font-weight: 600;
      }
    }
  }
  .__complete {
    position: absolute;
    right: 20px;
    span {
      font-size: 16px;
      color: #262626;
    }
  }
}
</style>
