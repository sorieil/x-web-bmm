import ServerBase from './server_base';

export default class ServerSampleCode extends ServerBase {
  constructor(req) {
    super();
    this.req = req;
    this.baseUrl = process.env.API_URL;
    this.apiName = 'v1/user';
  }

  get() {
    return this.baseGet();
  }
}
