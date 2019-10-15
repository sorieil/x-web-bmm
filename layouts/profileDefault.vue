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
