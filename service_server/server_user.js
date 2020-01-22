import ServerBase from './server_base';

export default class ServerUser extends ServerBase {
  constructor(req) {
    super(req);
    this.baseUrl = process.env.API_URL;
    this.apiName = 'v1/user';
  }

  get() {
    return Promise.resolve(this.baseGet());
  }
}
