<template>
  <div class="SubDefault">
    <div class="__containers">
      <SubHeader id="SubHeader" ref="SubHeader" />
      <transition name="list">
        <nuxt />
      </transition>
    </div>
  </div>
</template>

<script>
import SubHeader from '../components/common/SubHeader';
import MixinUser from '../mixin/user';
export default {
  middleware: ['auth'],
  components: {
    SubHeader,
  },
  mixins: [MixinUser],
  data() {
    return {};
  },
  created() {
    console.log('console:', this.USER_GET.type);
  },
  mounted() {
    this.$nextTick(() => {
      if (this.USER_GET.type === null) {
        // this.$router.replace({ path: '/my-profile' });
      }
    });
  },
  methods: {
    closeModal() {
      this.MODAL_FULL_ACTION_OFF();
    },
  },
};
</script>
<style lang="scss">
body {
  position: relative;
}
.SubDefault {
  .SubHeader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
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
}
</style>
