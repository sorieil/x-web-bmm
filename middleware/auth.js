import ServerToken from '../service_server/server_token';
import ServerUser from '../service_server/server_user';
import { TOKEN_SET, USER_SET } from '~/store/constant_types';

// 중요함:::::: 이 페이지는 무조건 토큰을 받아서 처리를 해야 합니다.
export default async ({
  app,
  route,
  store,
  from,
  redirect,
  req,
  res,
  error,
}) => {
  /**
   * TODO 토큰을 받으면, 받은 토큰에 대해서 회원정보를 가져와야 한다.
   * 0. URL 형식으로 토큰이 있는경우 토큰을 받아서 유효한 토큰인지 체크(동시에 유저의 정보도 가져온다)
   * 1. URL 형식의 토큰이 유효하다면, 로컬에 토큰을 저장해주고, 유저의 정보를 스토어에 담아둔다. (근데 토큰에
   * 모든 정보에 기본적인 정보가 있고, 서버에서 알아서 처리 하기 때문에.. 굳이..저장을 안해도 될듯..)
   * */
  const errorRedirect = (error) => {
    console.log(error);
    return redirect('/error-auth');
  };

  // Active when server side request.
  if (process.server) {
    let ACCESS_TOKEN = '';
    // If not have query of url.
    if (req.query.token) {
      ACCESS_TOKEN = `JWT ${req.query.token}`;
      console.log('token:', ACCESS_TOKEN);
      res.cookie('token', ACCESS_TOKEN, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        path: '/',
      });
    } else {
      return errorRedirect(
        '서버사이드 랜더링으로 처음으로 진입 할 경우에는 쿼리문에 토큰을 지정해줘야 합니다.'
      );
    }

    if (ACCESS_TOKEN) {
      store.commit(TOKEN_SET.load, {
        ACCESS_TOKEN,
      });

      // 유저 인정 정보 가져오기
      const { resCode } = await new ServerToken(req).tokenVerify(ACCESS_TOKEN);
      if (resCode === 200) {
        new ServerUser(req)
          .get()
          .then(({ resCode, result }) => {
            // If user exist, Save user type.
            if (resCode === 200) {
              console.log('serverUser result:', result[0].type);
              // If the user type is null, set the buyer type.
              if (
                (result[0].type === 'null' || result[0].type === null) &&
                route.path !== '/my-profile'
              ) {
                return redirect(`/my-profile?token=${req.query.token}`);
              } else {
                return store.commit(USER_SET.load, {
                  type: result[0].type,
                });
              }
            } else {
              return errorRedirect('회원 인증에 문제가 있는거 같아요.');
            }
          })
          .catch((error) => {
            errorRedirect(error.message);
          });
      } else {
        return errorRedirect('맞는 토큰이지만, 회원이 아닌거 같습니다.');
      }
    } else {
      return true;
    }
  }
};
