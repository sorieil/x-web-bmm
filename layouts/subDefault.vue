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
export default {
  components: {
    SubHeader,
  },
  data() {
    return {};
  },
  created() {},
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
