<template>
  <div class="__sub-default">
    <SubHeader id="SubHeader" ref="SubHeader" />
    <div class="__containers">
      <nuxt />
    </div>
  </div>
</template>

<script>
import SubHeader from '../components/common/SubHeader';
// import Base from '../service/base';
export default {
  // middleware: ['auth'],
  components: {
    SubHeader,
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
