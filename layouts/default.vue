<template>
  <div class="__default">
    <Header id="Header" ref="Header" />
    <div class="__containers" @scroll="headerScroll">
      <nuxt />
    </div>
  </div>
</template>
<script>
import Header from '../components/common/Header'
export default {
  components: {
    Header
  },
  data() {
    return {
      targetHeader: ''
    }
  },
  mounted() {},
  methods: {
    headerScroll(e) {
      const top = e.target.scrollTop
      if (top) {
        console.log('메뉴를 보여랏')
      } else {
        console.log('메뉴를 닫아랏')
      }
    },
    blindHeight(target) {
      if (typeof target === 'object') {
        // const height = console.log('height:', height)
      } else {
        console.log('Nop')
      }
    }
  }
}
</script>
<style lang="scss">
body {
  position: fixed;
}

.__default {
  display: flex;
  flex-direction: column;
  position: relative;

  .__header {
    top: 0;
    width: 100vw;
    // height: 15vh;
  }

  .__containers {
    background-color: green;
    height: 85vh;
    max-width: 100vw;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: flex-start;
  }
}
</style>
