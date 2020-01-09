import { mapGetters } from 'vuex';
import { USER_GET, USER_SET } from '../store/constant_types';
import User from '~/service/user';
import Base from '~/service/base';
export default {
  computed: {
    ...mapGetters({
      [USER_GET.defines]: USER_GET.load,
    }),
  },
  mounted() {
    // 레이아웃 단에서 해줘야 함.
    // auth 에서 안되는 이유는 auth 에서는 로컬 스토리지에 접근이 안됨. auth는 서버단임.
    new Base(this).setupToken().then((result) => {
      if (!result) {
        // 토큰 설정이 되지 않았습니다. 토큰을 입력해주세요.
        this.$route.push({ path: '/error' });
      } else {
        const userResult = new User(this).get();
        userResult
          .then(({ result }) => {
            // console.log('user type result:', result);
            const userType = result[0].type === 'null' ? null : result[0].type;
            this.$store.commit(USER_SET.load, { type: userType });
            console.log('aaaaaaaaa');
          })
          .catch((error) => {
            console.error('Error start------------->\n');
            console.log(error);
            console.error('Error end--------------->\n');
          });
      }
    });
  },
};
