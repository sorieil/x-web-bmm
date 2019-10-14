import { mapGetters, mapActions } from 'vuex';
import {
  SEARCH_SET,
  SEARCH_GET,
  SEARCH_LEFT_ON,
  SEARCH_LEFT_OFF,
} from '../store/constant_types';
export default {
  computed: {
    ...mapGetters({
      [SEARCH_GET.defines]: SEARCH_GET.load,
    }),
  },
  watch: {
    [SEARCH_SET.defines](newValue, oldValue) {
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
