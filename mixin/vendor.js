import { mapGetters } from 'vuex';
import { VENDOR_GET } from '../store/constant_types';
export default {
  computed: {
    ...mapGetters({
      [VENDOR_GET.defines]: VENDOR_GET.load,
    }),
  },
};
