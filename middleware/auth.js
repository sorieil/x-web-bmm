import ServerToken from '../service_server/server_token';
import ServerUser from '../service_server/server_user';
// import { errorPrint } from '../service_server/server_error';
import { TOKEN_SET, USER_SET } from '~/store/constant_types';

// 중요함:::::: 이 페이지는 무조건 토큰을 받아서 처리를 해야 합니다.
export default ({ app, route, store, from, redirect, req, res }) => {
  const ACCESS_TOKEN = `JWT ${req.query.token}`;

  /**
   * TODO 토큰을 받으면, 받은 토큰에 대해서 회원정보를 가져와야 한다.
   * 0. URL 형식으로 토큰이 있는경우 토큰을 받아서 유효한 토큰인지 체크(동시에 유저의 정보도 가져온다)
   * 1. URL 형식의 토큰이 유효하다면, 로컬에 토큰을 저장해주고, 유저의 정보를 스토어에 담아둔다. (근데 토큰에
   * 모든 정보에 기본적인 정보가 있고, 서버에서 알아서 처리 하기 때문에.. 굳이..저장을 안해도 될듯..)
   * */

  const errorRedirect = () => {
    console.log('인증에 문제가 있습니다.');
    // redirect('/error');
  };

  if (ACCESS_TOKEN) {
    // 유저 인정 정보 가져오기
    const token = new ServerToken(req).tokenVerify(ACCESS_TOKEN);
    token
      .then(async (result) => {
        if (result.resCode === 200) {
          req.session.token = ACCESS_TOKEN;
          store.commit(TOKEN_SET.load, {
            ACCESS_TOKEN,
          });

          if (process.server) {
            req.session.token = ACCESS_TOKEN;
            const user = await new ServerUser(req).get();

            req.session.userType = user.result[0].type;
            store.commit(USER_SET.load, {
              type: user.result[0].type,
            });
          }
        } else {
          console.log(
            '정상접속이긴 하나 인증코드가 잘못됐네요..??',
            result.resCode
          );
          errorRedirect();
        }
      })
      .catch((error) => {
        console.error('Error start------------->\n');
        console.log(error);
        console.error('Error end--------------->\n');
      });
  } else {
    errorRedirect();
  }
};
