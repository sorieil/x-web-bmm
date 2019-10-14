import { mapGetters, mapActions } from 'vuex';
import {
  SEARCH_LEFT_GET,
  SEARCH_LEFT_ON,
  SEARCH_LEFT_OFF,
} from '../store/constant_types';
export default {
  computed: {
    ...mapGetters({
      [SEARCH_LEFT_GET.defines]: SEARCH_LEFT_GET.load,
    }),
  },
  watch: {
    'SEARCH_LEFT_GET.returnValue': (newValue, oldValue) => {
      console.log(newValue, oldValue);
    },
  },
  methods: {
    ...mapActions({
      [SEARCH_LEFT_ON.defines]: SEARCH_LEFT_ON.load,
      [SEARCH_LEFT_OFF.defines]: SEARCH_LEFT_OFF.load,
    }),
  },
};
