<template>
  <div class="__form-search" :style="{ color: propFontColor }">
    <label>
      <input v-model="value" v-bind="$attrs" :placeholder="propPlaceHolder" />
    </label>
    <!-- v-bind="$attrs" :placeholder="propPlaceHolder" v-on="inputListeners" -->
  </div>
</template>
<script>
export default {
  name: 'FormSearch',
  inheritAttrs: false,
  props: {
    propPlaceHolder: {
      default: '검색어를 입력해주세요.',
      type: String
    },
    propFontColor: {
      default: '#000000',
      type: String
    },
    value: {
      default: '',
      type: String
    }
  },
  mehtods: {
    focus(event) {
      console.log(this.$refs.input)
    }
  },
  computed: {
    inputListeners() {
      const vm = this
      console.log('vm:', vm)
      return Object.assign({}, this.$listeners, {
        input(event) {
          vm.$emit('input', event.target.value)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.__form-search {
  display: block;
  position: relative;
  width: 200px;
  height: 30px;
  background-color: transparent;
  label {
    display: block;
    width: inherit;
    height: inherit;
  }

  &::before {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    content: '';
    border: 1px solid #d3d3d3;
    background-color: #fafafa;
    background-image: url('../../assets/images/common/icon_search.svg');
    background-repeat: no-repeat;
    background-origin: border-box;
    background-position: center left 10px;
    border-radius: 30px;
  }
  input {
    position: absolute;
    z-index: 10;
    color: inherit;
    outline: none;
    background-color: transparent;
    border: 0;
    top: 4px;
    left: 30px;
    width: 80%;
    &::placeholder {
      color: #777777;
      font-size: 1em;
    }
  }
}
</style>
