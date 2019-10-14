import { mapGetters, mapActions } from 'vuex';
import {
  // FILTER_SET,
  FILTER_GET,
  FILTER_ACTION_ON,
  FILTER_ACTION_OFF,
} from '../store/constant_types';
export default {
  computed: {
    ...mapGetters({
      [FILTER_GET.defines]: FILTER_GET.load,
    }),
  },
  watch: {
    'FILTER_GET.filter': (newValue, oldValue) => {
      console.log(newValue, oldValue);
    },
  },
  methods: {
    ...mapActions({
      [FILTER_ACTION_ON.defines]: FILTER_ACTION_ON.load,
      [FILTER_ACTION_OFF.defines]: FILTER_ACTION_OFF.load,
    }),
  },
};
