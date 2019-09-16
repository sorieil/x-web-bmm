<template>
  <div class="__search-form" :style="{ color: propFontColor }">
    <label>
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
        :placeholder="propPlaceHolder"
      />
    </label>
    <!-- v-bind="$attrs" :placeholder="propPlaceHolder" v-on="inputListeners" -->
  </div>
</template>
<script>
export default {
  name: 'SearchForm',
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
.__search-form {
  display: block;
  position: relative;
  width: 200px;
  height: 30px;
  border: 1px solid #d3d3d3;
  background-color: #fafafa;
  background-image: url('../../assets/images/common/icon_search.svg');
  background-repeat: no-repeat;
  background-origin: border-box;
  background-position: center left 10px;
  border-radius: 30px;
  overflow: hidden;

  label {
    display: block;
    width: inherit;
    height: inherit;
  }

  input {
    user-select: text;
    position: absolute;
    z-index: 10;
    color: inherit;
    outline: none;
    background-color: transparent;
    border: 0;
    top: 0;
    bottom: 0;
    margin: auto 0 auto 0;
    left: 30px;
    width: 80%;
    height: inherit;
    &::placeholder {
      color: #777777;
      font-size: 1em;
    }
  }
}
</style>
