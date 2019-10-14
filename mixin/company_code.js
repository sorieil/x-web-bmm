import { mapGetters, mapActions } from 'vuex';
import {
  COMPANY_CODE_GET,
  COMPANY_CODE_ON,
  COMPANY_CODE_OFF,
} from '../store/constant_types';
export default {
  computed: {
    ...mapGetters({
      [COMPANY_CODE_GET.defines]: COMPANY_CODE_GET.load,
    }),
  },
  watch: {
    'COMPANY_CODE_GET.status': (newValue, oldValue) => {
      console.log(newValue, oldValue);
    },
  },
  methods: {
    ...mapActions({
      [COMPANY_CODE_ON.defines]: COMPANY_CODE_ON.load,
      [COMPANY_CODE_OFF.defines]: COMPANY_CODE_OFF.load,
    }),
  },
};
