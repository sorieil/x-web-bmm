<template>
  <div class="ErrorPage"></div>
</template>
<script>
import { mapGetters } from 'vuex';
import { MODAL_FULL_GET } from '../../store/constant_types';
export default {
  name: 'ErrorPage',
  computed: {
    ...mapGetters({
      [MODAL_FULL_GET.load]: MODAL_FULL_GET.load,
    }),
  },
  mounted() {},
};
</script>
