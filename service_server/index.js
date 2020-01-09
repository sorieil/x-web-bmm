import express from 'express';
import { validationResult, body } from 'express-validator';
import { responseJson } from './common';
import ServerToken from './server_token';
// Create express router
const router = express.Router();

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express();
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

// 기본적으로 api 서버에서 토큰일 인증 받고, 그후 세션데이터에 저장을 하기 위해서
// 하는 프로세스고, 나중에 api 주소를 숨기기 위해서 자체 api 서버로 사용되거나
// 유저 api 서버로 사용할 수 있다.
// 단 타입스크립트로 어떻게 해줄것인가에 대한 고민은 있다.
// 중요한 api 만 숨겨서 하는것도 나쁘진 않은거 같다.
router.post(
  '/token',
  [
    body('token')
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const method = req.method;

    if (!errors.isEmpty()) {
      responseJson(res, errors.array(), method, 'invalid');
      return;
    }

    const { result, resCode } = await new ServerToken(req);
    console.log('Inside server token result:', result, resCode);

    if (resCode) {
      req.session.authUser = { username: 'demo' };
      responseJson(res, [], method, 'invalid');
    } else {
      responseJson(res, [{ message: 'Invalid token' }], method, 'token');
    }
  }
);

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session.authUser;
  res.json({ ok: true });
});

// Export the server middleware
export default {
  path: '/api',
  handler: router,
};
