<template>
  <div class="__container">
    <div class="__side-company-name">
      <span class="__text">
        <i class="material-icons __icon">remove</i>
        {{ companyName }}
      </span>
    </div>
    <div class="__lists">
      <FormSearch />
    </div>
  </div>
</template>

<script>
import FormSearch from '../components/base_forms/FormSearch'
export default {
  components: {
    FormSearch
  },
  data() {
    return {
      companyName: 'xSync'
    }
  }
}
</script>

<style lang="scss">
.__container {
  min-width: 100vw;
  min-height: 100vh;
  background-color: blueviolet;
  padding: 0 0 1px 0;
  display: flex;
  .__side-company-name {
    width: 3em;
    height: 100vmax;
    background-color: #eaeaea;
    position: relative;

    .__text {
      position: relative;
      width: 130px;
      top: 110px;
      left: -40px;
      margin: auto;
      position: absolute;
      line-height: 1em;
      justify-items: center;
      color: #a5a5a5;
      transform: rotate(90deg);

      .__icon {
        position: relative;
        top: 4px;
      }
    }
  }
  .__lists {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .__search {
      background-color: #a5a5a5;
    }
  }
}
</style>
