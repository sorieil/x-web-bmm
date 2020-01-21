export const errorPrint = (e) => {
  const code =
    typeof e !== 'number' ? parseInt(e.response && e.response.status) : e;
  console.log('Server api error print:', code);
  switch (code) {
    case 400:
      console.log('데이터가 정상적이지 않거나, 권한이 없습니다. =>', e);
      return e.response.data;
    case 401:
      console.log('정상적인 토큰이 아닙니다.=>', e);
      return e.response.data;
    case 403:
      console.log('토큰이 없습니다. 토큰을 설정해주세요.=>', e);
      return e.response.data;
    case 500:
      console.log(
        '서버에서 에러 발생했군요. 관리자에게 문의 해주세요.',
        e.response.data
      );
      return e.response.data;
    // throw new Error(e);
    default:
      console.log('Else error: ', e);
      return e.response.data;
  }
};
