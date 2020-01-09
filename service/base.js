import Axios from 'axios';
import { TOKEN_GET } from '../store/constant_types';
import { errorPrint } from './error';

export default class Base {
  constructor(componentScope) {
    this._rentStore = componentScope.$store;
    this._params = '';

    if (!process.server) {
      this._axios = componentScope.$axios;
      this._baseUrl = process.env.API_URL;
    } else {
      this._axios = Axios;
      this._baseUrl = '';
      this._req = componentScope.req;
    }

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
      return Promise.resolve(true);
    } else {
      return errorPrint(403);
    }
  }

  requestUrl(url) {
    console.log(
      '[CLIENT]API Start ========================================================='
    );
    if (!process.server) {
      console.log(`Client Request`);
    } else {
      console.log(`Server Request`);
    }
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
      const token = this.rentStore.getters[TOKEN_GET.load].ACCESS_TOKEN;
      if (token) {
        // console.log('Load success token', token);
        await this.axios.setToken(token);
        return true;
      } else {
        return false;
      }
    } else {
      const token = this.req.session.token;
      if (token) {
        // console.log('Load success token', token);
        await this.axios.setToken(token);
        return true;
      } else {
        return false;
      }
    }
  }

  async baseGet() {
    const checkToken = await this.checkToken();
    if (checkToken) {
      return this.axios
        .$get(this.getUrl(), {
          params: this.params,
          progress: false,
        })
        .then(this.response);
    } else {
      return this.errorPrint(403);
    }
  }

  getDirect(url) {
    this.requestUrl(url);
    return this.axios.$get(url).then(this.response);
  }

  postDirect(url) {
    this.requestUrl(url);
    console.log('Post direct headers: \n');
    console.log(this.axios.headers);
    return this.axios.$post(url).then(this.response);
  }

  async basePost() {
    const checkToken = await this.checkToken();
    if (checkToken) {
      return this.axios.$post(this.getUrl(), this.params).then(this.response);
    } else {
      return this.errorPrint(403);
    }
  }

  async basePut() {
    const checkToken = await this.checkToken();
    if (checkToken) {
      return this.axios.$put(this.getUrl(), this.params).then(this.response);
    } else {
      return errorPrint(403);
    }
  }

  async baseDelete() {
    const checkToken = await this.checkToken();
    if (checkToken) {
      return this.axios.$delete(this.getUrl(), this.params).then(this.response);
    } else {
      return errorPrint(403);
    }
  }

  async basePatch() {
    const checkToken = await this.checkToken();
    if (checkToken) {
      return this.axios.$patch(this.getUrl(), this.params).then(this.response);
    } else {
      return errorPrint(403);
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
    console.log(res);
    console.log(
      'API End ==========================================================='
    );

    return res;
  }
}
