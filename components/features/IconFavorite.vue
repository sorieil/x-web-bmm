<template>
  <div class="IconFavorite" @click="chanage">
    <i :class="{ __active: tempValue }" class="material-icons-round">star</i>
  </div>
</template>

<script>
export default {
  name: 'IconFavorite',
  props: {
    value: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      tempValue: false,
    };
  },
  mounted() {
    this.tempValue = this.value;
  },
  methods: {
    chanage() {
      const status = !this.tempValue;
      this.tempValue = status;
      this.$emit('input', status);
    },
  },
};
</script>

<style lang="scss">
.IconFavorite {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  color: #a5a5a5;
  .__active {
    color: red;
  }
}
</style>
