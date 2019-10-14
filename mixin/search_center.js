import { mapGetters, mapActions } from 'vuex';
import {
  SEARCH_CENTER_GET,
  SEARCH_CENTER_ON,
  SEARCH_CENTER_OFF,
} from '../store/constant_types';
export default {
  computed: {
    ...mapGetters({
      [SEARCH_CENTER_GET.defines]: SEARCH_CENTER_GET.load,
    }),
  },
  watch: {
    'SEARCH_CENTER_GET.returnValue': (newValue, oldValue) => {
      console.log(newValue, oldValue);
    },
  },
  methods: {
    ...mapActions({
      [SEARCH_CENTER_ON.defines]: SEARCH_CENTER_ON.load,
      [SEARCH_CENTER_OFF.defines]: SEARCH_CENTER_OFF.load,
    }),
  },
};
