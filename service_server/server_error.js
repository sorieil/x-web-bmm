export const errorPrint = (e) => {
  const code =
    typeof e !== 'number' ? parseInt(e.response && e.response.status) : e;
  console.log('Server api error print:', code);
  switch (code) {
    case 400:
      console.log('데이터가 정상적이지 않거나, 권한이 없습니다. =>', e);
      return new Error(e);
    case 401:
      console.log('정상적인 토큰이 아닙니다.=>', e);
      return new Error(e);
    case 403:
      console.log('토큰이 없습니다. 토큰을 설정해주세요.=>', e);
      return new Error(e);
    case 500:
      console.log(
        '서버에서 에러 발생했군요. 관리자에게 문의 해주세요.',
        e.response
      );
      return new Error(e);
    default:
      // alert('잘못된 접근 입니다. \n처음 페이  지로 돌아 갑니다.' + code);
      // window.location.href = process.env.managerUrl;
      console.log('Else error: ', e);
      return new Error(e);
  }
};
