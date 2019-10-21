import { mapGetters } from 'vuex';
import { FIELD_GET } from '../store/constant_types';
export default {
  computed: {
    ...mapGetters({
      [FIELD_GET.defines]: FIELD_GET.load,
    }),
  },
};
