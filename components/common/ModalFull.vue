<template>
  <div class="ModalFull" @click="close">
    <div class="__overlay"></div>
    <slot name="ModalContent" class="__container"></slot>
  </div>
</template>
<script>
export default {
  name: 'ModalFull',
  props: {
    value: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      const body = document.getElementsByTagName('body');
      console.log('body: ', body.style);
    });
  },
  methods: {
    close() {
      // 클로즈가 될때 콜백을 던져준다.
      this.$emit('close');
    },
    open() {
      // 오픈될때 어떤 일을 수행 하게 할것인가...?
    },
  },
};
</script>
<style lang="scss">
.ModalFull {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  .__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: none;
    width: inherit;
    height: inherit;
    opacity: 0.2;
    background-color: #000000;
  }
}
</style>
