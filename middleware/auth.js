import Token from '../service/token';
import { TOKEN_SET } from '~/store/constant_types';

// 중요함:::::: 이 페이지는 무조건 토큰을 받아서 처리를 해야 합니다.
export default async ({ app, route, store, from, redirect, req }) => {
  const ACCESS_TOKEN =
    'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJldmVudElkIjoiNWQ2Yzc4MWEwYzJkNTk0YWZiMzc5ZWZlIiwiZXZlbnROYW1lIjoiQk1NIENvbnRlc3QiLCJwYWNrYWdlTmFtZSI6ImNvbS54c3luYy5ldmVudCIsImV2ZW50VXBkYXRlVmVyc2lvbiI6MywiX2lkIjoiNWQ1ZTYxM2QwMTI4MmUwYTUzZDkzOWE2IiwiZW1haWwiOiJqaGtpbUB4YXluYy5jbyIsIm5hbWUiOiLrsqDri4jsiqTrpqwiLCJsZXZlbCI6ImVVc2VyIiwiaWF0IjoxNTcxMTE4NjA1LCJleHAiOjEwMDAwMTU3MTExODYwNH0.6Po92mlcZ42HS4ZrpREUBQJlypnT9CK8ln93QX9mIek';

  const vm = { $store: store, $axios: app.$axios };

  /**
   * TODO 토큰을 받으면, 받은 토큰에 대해서 회원정보를 가져와야 한다.
   * 0. URL 형식으로 토큰이 있는경우 토큰을 받아서 유효한 토큰인지 체크(동시에 유저의 정보도 가져온다)
   * 1. URL 형식의 토큰이 유효하다면, 로컬에 토큰을 저장해주고, 유저의 정보를 스토어에 담아둔다. (근데 토큰에
   * 모든 정보에 기본적인 정보가 있고, 서버에서 알아서 처리 하기 때문에.. 굳이..저장을 안해도 될듯..)
   * */

  const errorRedirect = () => {
    console.log('인증에 문제가 있습니다.');
    redirect('/');
  };

  // if (route.query.hasOwnProperty('auth')) {
  if (ACCESS_TOKEN) {
    // 유저 인정 정보 가져오기
    await new Token(vm).tokenVerify(ACCESS_TOKEN).then((result) => {
      if (result) {
        // console.log('req', req.session);
        // req.session.token = ACCESS_TOKEN;
        store.commit(TOKEN_SET.load, { ACCESS_TOKEN });
      } else {
        console.log('인증 못받음.');
        errorRedirect('/');
      }
    });
    // app.router.replace({ path: '/' });
    // scenario 시작
  } else {
    errorRedirect();
  }
};
