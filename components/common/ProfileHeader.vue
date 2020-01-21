<template>
  <div class="ProfileHeader">
    <div @click="goBack" class="__menu">
      <i class="material-icons-round __icon">keyboard_backspace</i>
    </div>
    <div class="__messages">
      <div class="__title">
        <span>{{ SUB_HEADER_GET.subHeaderTitle }}</span>
      </div>
    </div>
    <div id="profileHeaderButton" class="__complete">
      <span>완료</span>
    </div>
  </div>
</template>
<script>
import SubHeaderMixin from '../../mixin/sub_header';
import FieldMixin from '../../mixin/field';
export default {
  name: 'ProfileHeader',
  mixins: [SubHeaderMixin, FieldMixin],
  props: {
    propName: {
      default: '정보수정',
      type: String,
    },
  },
  methods: {
    goBack() {
      // 만약에 백 히스토리가 없는 경우에는 메인으로 보낸다.
      // 그 이유는 토큰값을 전달 할 수 없기 때문이다.. 물론 할순 있음.
      this.$router.back();
      console.log(this.$router);
    },
    // complete() {
    //   const formBusinessVendor = this.FIELD_GET.formBusinessVendor;
    //   console.log(formBusinessVendor);
    //   const items = Object.keys(formBusinessVendor).map(
    //     (i) => formBusinessVendor[i]
    //   );
    //   console.log(items);
    // },
  },
};
</script>
<style lang="scss" scoped>
.ProfileHeader {
  background-color: white;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  height: 40px;
  border-bottom: 1px solid #d3d3d3;
  .__menu {
    position: absolute;
    top: 7px;
    left: 16px;
    color: #262626;
    .__icon {
      font-size: 2.4em;
    }
  }
  .__messages {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    display: block;
    .__title {
      > span {
        font-size: 18px;
        color: #02152a;
        font-weight: 600;
      }
    }
  }
  .__complete {
    position: absolute;
    right: 20px;
    span {
      font-size: 16px;
      color: #262626;
    }
  }
}
</style>
