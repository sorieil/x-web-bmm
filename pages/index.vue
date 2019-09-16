<template>
  <div class="__container">
    <div class="__side-company-name">
      <span class="__text">
        <i class="material-icons __icon">remove</i>
        {{ companyName }}
      </span>
    </div>
    <div class="__lists">
      <div class="__search-box">
        <SearchForm />
        <br />
        <SelectForm />
      </div>
      <div class="__company-list">
        <div v-for="index in 10" :key="index" class="__company">
          <img class="__logo" v-img="''" />
          <div class="__info-box">Company name</div>
          <div class="__favorite">
            <IconFavorite />
            <img />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchForm from '../components/base_forms/SearchForm'
import SelectForm from '../components/base_forms/SelectForm'
import IconFavorite from '../components/features/IconFavorite'
import mixinImage from '../mixin/directive_image'
export default {
  mixins: [mixinImage],
  components: {
    SearchForm,
    SelectForm,
    IconFavorite
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
  // background-color: blueviolet;
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
    flex: 1;
    .__search-box {
      width: 100%;
      background-color: #a5a5a5;
    }

    .__company-list {
      width: 100%;
      border: 1px solid red;
      height: 100vh;
      .__logo {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
