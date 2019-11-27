<template>
  <ModalFull
    ref="selectUserTypeModal"
    :class="{
      fadeInUpBig: USER_TYPE_GET.status,
      fadeOutUpBig: !USER_TYPE_GET.status,
    }"
    class="__user-type-select animated"
  >
    <div slot="ModalContent" class="__modal-content">
      <div class="__user-type-select-box">
        <div class="__buttons">
          <button @click="selectUserType('vendor')" type="button">
            Vendor
          </button>
          <button @click="selectUserType('buyer')" type="button">Buyer</button>
        </div>
      </div>
    </div>
  </ModalFull>
</template>
<script>
import SelectUserType from '../../mixin/select_user_type';
import { USER_TYPE_SET } from '../../store/constant_types';
export default {
  name: 'SearchLeftLayout',
  mixins: [SelectUserType],
  data() {
    return {
      companyCodeStatus: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      const modalOverlay = this.$refs.selectUserTypeModal.$el.children[0];

      modalOverlay.addEventListener('click', () => {
        this.USER_TYPE_OFF();
      });
    });
  },
  methods: {
    modalClose() {
      this.USER_TYPE_OFF();
    },
    selectUserType(type) {
      this.$store.commit(USER_TYPE_SET.load, {
        selectedUserType: type,
      });
      this.USER_TYPE_OFF();
      this.$router.push({ path: 'my-schedule' });
    },
  },
};
</script>
<style lang="scss">
.__user-type-select {
  z-index: 999;
  display: none;
  .__overlay {
    display: block;
    opacity: 0.6 !important;
  }
  .__modal-content {
    background-color: transparent;
    z-index: 999;
    height: auto;
    position: relative;
    .__user-type-select-box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      width: 270px;
      height: 130px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > h3 {
        font-size: 16px;
        color: #434343;
        font-weight: 400;
        margin-top: 0;
        margin-bottom: 20px;
      }
      > input {
        width: 222px;
        height: 36px;
        border: 1px solid #a8a8a8;
        background: #f6f6f6;
        border-radius: 30px;
        padding: 0 10px;
        font-size: 13px;
      }
      .__buttons {
        button {
          width: 100px;
          height: 38px;
          border-radius: 30px;
          background-color: #d3d3d3;
          margin: 0 10px;
          border: 0;
          font-size: 14px;
          &:last-child {
            background-color: #02152a;
            color: white;
          }
        }
      }
      .__button {
        width: 222px;
        height: 38px;
        border-radius: 30px;
        background-color: #d3d3d3;
        margin: 0 10px;
        border: 0;
        font-size: 14px;
        background-color: #02152a;
        color: white;
      }
    }
    .__company-code-alert {
      .material-icons {
        color: white;
        font-weight: 600;
        background-color: #e83828;
        border-radius: 50%;
        font-size: 20px;
        padding: 8px;
        margin-bottom: 20px;
      }
      > h3 {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
