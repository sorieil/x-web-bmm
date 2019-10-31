import { mapGetters } from 'vuex';
import { USER_GET } from '../store/constant_types';
export default {
  computed: {
    ...mapGetters({
      [USER_GET.defines]: USER_GET.load,
    }),
  },
};
