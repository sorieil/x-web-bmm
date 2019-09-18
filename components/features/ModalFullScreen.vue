<template>
  <div class="ModalFullScreen">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ModalFullScreen',
};
</script>
<style lang="scss" scoped>
.ModalFullScreen {
  will-change: transition, height;
  transition: height 300ms ease-in-out;
}
</style>
