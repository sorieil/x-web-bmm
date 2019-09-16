<template>
  <div class="__favorite" @click="chanage">
    <i :class="{ __active: tempValue }" class="material-icons">star</i>
  </div>
</template>

<script>
export default {
  name: 'IconFovorite',
  props: {
    value: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      tempValue: false
    }
  },
  mounted() {
    this.tempValue = this.value
  },
  methods: {
    chanage() {
      const status = !this.tempValue
      this.tempValue = status
      this.$emit('input', status)
    }
  }
}
</script>

<style lang="scss" scoped>
.__favorite {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  .__active {
    color: red;
  }
}
</style>
