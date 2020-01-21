<template>
  <div class="SubDefault">
    <div class="__containers">
      <transition name="list">
        <nuxt />
      </transition>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss">
body {
  position: relative;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  // transform: translateX(-30px);
  // border: 1px solid red;
  transition: all 0.2s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  // transform: translateX(30px);
}
</style>
