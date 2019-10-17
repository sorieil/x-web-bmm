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
</style>
