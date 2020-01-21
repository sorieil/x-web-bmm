import ServerBase from './server_base';

export default class ServerSampleCode extends ServerBase {
  constructor() {
    super();
    this.baseUrl = process.env.API_URL;
    this.apiName = '/user';
  }

  get() {
    return this.baseGet();
  }
}
