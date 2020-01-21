import ServerBase from './server_base';

export default class ServerToken extends ServerBase {
  constructor(req) {
    super(req);
    this.baseUrl = process.env.API_URL;
    this.apiName = 'v1/token-verify';
  }

  tokenVerify(accessToken) {
    this.axios.defaults.headers.common.Authorization = `${accessToken}`;
    this.axios.contentType = 'application/json';
    return this.getDirect(this.getUrl());
  }
}
