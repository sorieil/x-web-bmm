<template>
  <div ref="ProfileLayout" class="__sub-default">
    <ProfileHeader id="ProfileHeader" ref="ProfileHeader" />
    <div class="__containers">
      <nuxt />
    </div>
  </div>
</template>

<script>
import ProfileHeader from '../components/common/ProfileHeader';
// import Base from '../service/base';
export default {
  // middleware: ['auth'],
  components: {
    ProfileHeader,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        this.$refs.Header.documentElement.style.setProperty('--vh', `${vh}px`);
      });
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
</style>
