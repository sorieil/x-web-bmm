import Axios from 'axios';
// import { request } from 'express';
import { errorPrint } from './server_error';
export default class ServerBase {
  constructor(req) {
    this._params = '';
    this._baseUrl = '';
    this._axios = Axios;
    this._baseUrl = '';
    this._apiName = '';
    this._apiUrl = '';
    this._req = req;
  }

  set req(value) {
    this._req = value;
  }

  get req() {
    return this._req;
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

  requestUrl(url) {
    console.log('[BASE SERVER]API START +_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+');
    console.log(`Server Request: ${url}`);
  }
  /**
   * 토큰이 있는지 체크 한다.
   * 있으면, true 없으면 Error을 출력한다.
   * @returns
   * @memberof Base
   */
  checkToken() {
    this.requestUrl(this.getUrl());
    if (process.server) {
      if (this.req) {
        const token = this.req.cookies.token;
        if (token) {
          this.axios.defaults.headers.common.Authorization = token;
        }
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    }
  }

  baseGet() {
    this.checkToken()
      .then((checkToken) => {
        if (checkToken) {
          return this.axios
            .get(this.getUrl(), {
              params: this.params,
              progress: false,
            })
            .then(this.response);
        } else {
          return errorPrint(403);
        }
      })
      .catch(errorPrint);
  }

  getDirect(url) {
    this.requestUrl(url);
    return this.axios.get(url).then(this.response);
  }

  postDirect(url) {
    this.requestUrl(url);
    // console.log(this.axios.headers);
    return this.axios.post(url).then(this.response);
  }

  async basePost() {
    const checkToken = await this.checkToken();
    if (checkToken) {
      return this.axios.post(this.getUrl(), this.params).then(this.response);
    } else {
      return errorPrint(403);
    }
  }

  async basePut() {
    const checkToken = await this.checkToken();
    if (checkToken) {
      return this.axios.put(this.getUrl(), this.params).then(this.response);
    } else {
      return errorPrint(403);
    }
  }

  async baseDelete() {
    const checkToken = await this.checkToken();
    if (checkToken) {
      return this.axios.delete(this.getUrl(), this.params).then(this.response);
    } else {
      return errorPrint(403);
    }
  }

  async basePatch() {
    const checkToken = await this.checkToken();
    if (checkToken) {
      return this.axios.patch(this.getUrl(), this.params).then(this.response);
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
    console.log(res.data);
    console.log('[BASE SERVER]API END +_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+');
    return res.data;
  }
}
