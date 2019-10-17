<template>
  <div class="SelectForm">
    <button
      v-for="(menu, index) in propMenus"
      :key="index"
      :class="{ __selected: selected.value === menu.value }"
      @click="selecteValue(index)"
    >
      <span>{{ menu.title }}</span>
    </button>
  </div>
</template>
<script>
export default {
  name: 'SelectForm',
  props: {
    propMenus: {
      default: () => [
        { title: '전체', value: 'all' },
        { title: '즐겨찾기', value: 'favorite' },
        { title: '미팅가능', value: 'meeting' },
      ],
      type: Array,
    },
    defaultValue: {
      default: 'all',
      type: String,
    },
  },
  data() {
    return {
      selected: {},
    };
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        const selected = this.propMenus.filter((v) => v.value === newValue);
        this.selected = selected[0];
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      const selected = this.propMenus.filter(
        (v) => v.value === this.defaultValue
      );
      this.selected = selected[0];
    });
  },
  methods: {
    selecteValue(index) {
      const selected = this.propMenus[index];
      this.selected = selected;
      this.$emit('change', selected);
    },
  },
};
</script>
<style lang="scss" scoped>
.SelectForm {
  display: block;
  position: relative;
  min-width: 205px;
  height: 30px;
  background-color: transparent;
  border: 0.5px solid #a8a8a8;
  background-color: #fafafa;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  button {
    background-color: #eaeaea;
    color: #777777;
    flex: 1;
    height: inherit;
    outline: none;
    box-sizing: border-box;
    // border: 0.5px solid #a8a8a8;
    border-top: 0;
    border-left: 0;
    border-right: 0.5px solid #a8a8a8;
    border-bottom: 0;

    span {
      font-size: 1em;
      line-height: 1.4em;
    }

    &:last-child {
      border-right: 0;
      border-left: 0;
    }

    &:first-child {
      border-left: 0;
    }
    cursor: pointer;
    &.__selected {
      color: #262626;
      background-color: #fafafa;
    }
  }
}
</style>
