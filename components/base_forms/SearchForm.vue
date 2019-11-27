<!-- eslint-disable-line vue/v-bind-style -->
<template>
  <div :style="{ color: propFontColor }" class="SearchForm">
    <label>
      <input
        :value="value"
        v-bind="$attrs"
        v-on:placeholder="propPlaceHolder"
        v-on="inputListeners"
        v-on:keypress.enter="submit"
      />
    </label>
  </div>
</template>
<script>
export default {
  name: 'SearchForm',
  inheritAttrs: false,
  props: {
    propPlaceHolder: {
      default: '검색',
      type: String,
    },
    propFontColor: {
      default: '#000000',
      type: String,
    },
    value: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      tempValue: this.value,
    };
  },
  computed: {
    inputListeners() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input(event) {
          if (event.target.value) {
            vm.$emit('input', event.target.value);
          }
          if (event.inputType === 'deleteContentBackward') {
            vm.$emit('input', event.target.value);
          }
        },
      });
    },
  },
  methods: {
    submit() {
      this.$emit('submit');
    },
  },
};
</script>
<style lang="scss" scoped>
.SearchForm {
  display: block;
  position: relative;
  min-width: 200px;
  height: 30px;
  border: 1px solid #d3d3d3;
  background-color: #fafafa;
  background-image: url('../../assets/images/common/icon_search.svg');
  background-repeat: no-repeat;
  background-origin: border-box;
  background-position: center left 12px;
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
    font-size: 1em;
    z-index: 10;
    color: inherit;
    outline: none;
    background-color: transparent;
    border: 0;
    height: 20px;
    top: 0;
    bottom: 0;
    margin: auto 0 auto 5px;
    left: 30px;
    width: 80%;

    &::placeholder {
      color: #777777;
      font-size: 1em;
    }
  }
}
</style>
