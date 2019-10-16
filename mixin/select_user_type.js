import { mapGetters, mapActions } from 'vuex';
import {
  USER_TYPE_GET,
  USER_TYPE_ON,
  USER_TYPE_OFF,
} from '../store/constant_types';
export default {
  computed: {
    ...mapGetters({
      [USER_TYPE_GET.defines]: USER_TYPE_GET.load,
    }),
  },
  watch: {
    'USER_TYPE_GET.status': (newValue, oldValue) => {
      console.log(newValue, oldValue);
    },
  },
  methods: {
    ...mapActions({
      [USER_TYPE_ON.defines]: USER_TYPE_ON.load,
      [USER_TYPE_OFF.defines]: USER_TYPE_OFF.load,
    }),
  },
};
