import ServerBase from './server_base';

export default class ServerVendor extends ServerBase {
  constructor(req) {
    super(req);
    this.req = req;
    this.baseUrl = process.env.API_URL;
    this.apiName = 'v1/user/vendor';
  }

  get() {
    return this.baseGet();
  }

  _getVendor(id) {
    this.apiUrl = id;
    return this.baseGet();
  }
}
