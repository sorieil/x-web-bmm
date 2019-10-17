<template>
  <div ref="IconCheckbox" class="IconCheckbox" @click="chanage">
    <i
      :id="'__checkbox-' + index"
      class="material-icons"
      :class="{ __active: tempValue }"
      >check</i
    >
  </div>
</template>

<script>
export default {
  name: 'IconCheckbox',
  props: {
    value: {
      default: false,
      type: Boolean,
    },
    index: {
      default: 0,
      type: Number,
    },
  },
  data() {
    return {
      tempValue: false,
      tempIndex: false,
    };
  },
  mounted() {
    this.tempValue = this.value;
    this.tempIndex = this.index;
  },
  methods: {
    chanage() {
      const status = !this.tempValue;
      this.tempValue = status;
      this.$emit('change', this.tempIndex, status);
    },
  },
};
</script>

<style lang="scss">
.IconCheckbox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  color: #a5a5a5;
}
.__items {
  margin: 3px 0;
  padding: 0;
  .__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #d3d3d3;
    > span {
      font-size: 13px;
    }
    .IconCheckbox {
      .material-icons {
        color: white;
        border: 1px solid #d3d3d3;
        border-radius: 50%;
        font-size: 16px;
        padding: 6px;
      }
      .__active {
        background-color: #e83828;
        border: 1px solid #e83828;
        padding: 6px;
      }
    }
  }
  .__active {
    background-color: #f8f8f8;
    .IconCheckbox {
      .material-icons {
        background-color: #e83828;
        border: 1px solid #e83828;
      }
    }
  }
}
</style>
