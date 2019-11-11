<template>
  <div class="ProfileLayout">
    <ProfileHeader id="ProfileHeader" />
    <div class="__containers">
      <nuxt />
    </div>
  </div>
</template>

<script>
import ProfileHeader from '../components/common/ProfileHeader';
import MixinUser from '../mixin/user';
// import Base from '../service/base';
export default {
  middleware: ['auth'],
  components: {
    ProfileHeader,
  },
  mixins: [MixinUser],
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
<style lang="scss" scoped>
body {
  position: relative;
}
.ProfileLayout {
  .ProfileHeader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
}
</style>
