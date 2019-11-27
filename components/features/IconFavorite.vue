<template>
  <div @click="chanage" class="IconFavorite">
    <i class="material-icons-round">star</i>
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
      this.$emit('change', status);
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
.__favorite-active {
  i {
    color: red;
  }
}
</style>
