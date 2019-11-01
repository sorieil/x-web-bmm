<template>
  <div class="__sub-default">
    <div class="__containers">
      <SubHeader id="SubHeader" ref="SubHeader" />
      <nuxt />
    </div>
  </div>
</template>

<script>
import SubHeader from '../components/common/SubHeader';
import MixinUser from '../mixin/user';
export default {
  components: {
    SubHeader,
  },
  mixins: [MixinUser],
  data() {
    return {};
  },
  created() {
    console.log('console:', this.USER_GET.type);
    if (this.USER_GET.type === null || this.USER_GET.type === 'buyer') {
      this.$router.replace({ path: '/my-profile' });
    } else {
      this.$router.replace({ path: '/my-profile-manager' });
    }
  },
  mounted() {},
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

#SubHeader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}
</style>
