import { mapGetters } from 'vuex';
import { SUB_HEADER_GET } from '../store/constant_types';
export default {
  computed: {
    ...mapGetters({
      [SUB_HEADER_GET.defines]: SUB_HEADER_GET.load,
    }),
  },
};
