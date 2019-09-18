import { mapGetters, mapActions } from 'vuex';
import {
  MODAL_FULL_GET,
  MODAL_FULL_ACTION_ON,
  MODAL_FULL_ACTION_OFF,
} from '../store/constant_types';
export default {
  computed: {
    ...mapGetters({
      [MODAL_FULL_GET.defines]: MODAL_FULL_GET.load,
    }),
  },
  methods: {
    ...mapActions({
      [MODAL_FULL_ACTION_ON.defines]: MODAL_FULL_ACTION_ON.load,
      [MODAL_FULL_ACTION_OFF.defines]: MODAL_FULL_ACTION_OFF.load,
    }),
  },
};
