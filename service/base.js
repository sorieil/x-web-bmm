import { TOKEN_GET } from '../store/constant_types';

export default class Base {
  constructor(componentScope) {
    this._rentStore = componentScope.$store;
    this._axios = componentScope.$axios;
    this._params = '';
    this._baseUrl = process.env.API_URL;
    this._apiName = '';
    this._apiUrl = '';
  }

  get rentStore() {
    return this._rentStore;
  }

  set rentStore(value) {
    this._rentStore = value;
  }

  get apiUrl() {
    return this._apiUrl;
  }

  set apiUrl(value) {
    this._apiUrl = value;
  }

  get axios() {
    return this._axios;
  }

  set axios(value) {
    this._axios = value;
  }

  set baseUrl(value) {
    this._baseUrl = value;
  }

  get baseUrl() {
    return this._baseUrl;
  }

  get apiName() {
    return this._apiName;
  }

  set apiName(value) {
    this._apiName = value;
  }

  get params() {
    return this._params;
  }

  set params(value) {
    this._params = value;
  }

  setupToken() {
    const token = this.rentStore.getters[TOKEN_GET.load].ACCESS_TOKEN;
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
      return Promise.resolve(true);
    } else {
      return this.errorPrint(403);
    }
  }

  requestUrl(url) {
    console.log(`>>>>>>>>>>>> Request: ${url}`);
  }
  /**
   * 토큰이 있는지 체크 한다.
   * 있으면, true 없으면 Error을 출력한다.
   * @returns
   * @memberof Base
   */
  async checkToken() {
    this.requestUrl(this.getUrl());
    if (!process.server) {
      const token =
        this.rentStore.getters[TOKEN_GET.load].ACCESS_TOKEN ||
        localStorage.getItem('ACCESS_TOKEN');
      if (token) {
        await this.axios.setToken(token);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  async baseGet() {
    const checkToken = await this.checkToken();
    if (checkToken) {
      return this.axios
        .$get(this.getUrl(), { params: this.params, progress: false })
        .then(this.response)
        .catch(this.errorPrint);
    } else {
      return this.errorPrint(403);
    }
  }

  getDirect(url) {
    this.requestUrl(url);
    return this.axios
      .$get(url)
      .then(this.response)
      .catch(this.errorPrint);
  }

  async basePost() {
    const checkToken = await this.checkToken();
    if (checkToken) {
      return this.axios
        .$post(this.getUrl(), this.params)
        .then(this.response)
        .catch(this.errorPrint);
    } else {
      return this.errorPrint(403);
    }
  }

  async basePut() {
    const checkToken = await this.checkToken();
    if (checkToken) {
      return this.axios
        .$put(this.getUrl(), this.params)
        .then(this.response)
        .catch(this.errorPrint);
    } else {
      return this.errorPrint(403);
    }
  }

  async baseDelete() {
    const checkToken = await this.checkToken();
    if (checkToken) {
      return this.axios
        .$delete(this.getUrl(), this.params)
        .then(this.response)
        .catch(this.errorPrint);
    } else {
      return this.errorPrint(403);
    }
  }

  async basePatch() {
    const checkToken = await this.checkToken();
    if (checkToken) {
      return this.axios
        .$patch(this.getUrl(), this.params)
        .then(this.response)
        .catch(this.errorPrint);
    } else {
      return this.errorPrint(403);
    }
  }

  getUrl() {
    if (this.apiUrl === '') {
      return this.baseUrl + '/' + this.apiName;
    } else if (this.apiName === '') {
      return this.baseUrl + '/' + this.apiUrl;
    } else {
      return this.baseUrl + '/' + this.apiName + '/' + this.apiUrl;
    }
  }

  response(res) {
    console.log(
      'API Start ========================================================='
    );
    // console.log(`API NAME: ${this.getUrl()}`)
    console.log(res);
    console.log(
      'API End ==========================================================='
    );

    return res;
  }

  errorPrint(e) {
    const code = parseInt(e.response && e.response.status);
    console.log('error print:', code);
    switch (code) {
      case 400:
        console.log('정상적인 데이터를 넣어주세요. =>', e.response);
        return Promise.reject(new Error(e.response.data.message));
      case 401:
        console.log('정상적인 토큰이 아닙니다.=>', e.response);
        return Promise.reject(new Error(e.response.data.message));
      case 403:
        console.log('토큰이 없습니다. 토큰을 설정해주세요.=>', e.response);
        return Promise.reject(new Error(e.response.data.message));
      case 500:
        console.log(
          '서버에서 에러 발생했군요. 관리자에게 문의 해주세요.',
          e.response
        );
        return Promise.reject(new Error(e.response.data.message));
      default:
        // alert('잘못된 접근 입니다. \n처음 페이  지로 돌아 갑니다.' + code);
        // window.location.href = process.env.managerUrl;
        console.log('code', e);
        return Promise.reject(new Error(e));
    }
  }
}
