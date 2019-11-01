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
import User from '../service/user';
import { USER_SET } from '../store/constant_types';
import MixinUserType from '../mixin/user';
// import Base from '../service/base';
export default {
  middleware: ['auth'],
  components: {
    ProfileHeader,
  },
  mixins: [MixinUserType],
  data() {
    return {};
  },
  created() {},
  mounted() {
    const userResult = new User(this).get();
    userResult
      .then(({ result }) => {
        console.log('user type result:', result);
        const userType = result[0].type === 'null' ? null : result[0].type;
        this.$store.commit(USER_SET.load, { type: userType });
      })
      .catch((e) => {
        console.log('catch error:', e);
      });
  },
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

#ProfileHeader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}
</style>
