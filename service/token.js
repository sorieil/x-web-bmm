// import { PROJECT_GET } from '../store/constant_types'
import Base from './base';

export default class Token extends Base {
  constructor(componentScope) {
    super(componentScope);
    this.apiName = 'token';
  }

  async requestToken(accessToken) {
    console.log('Environment :', process.server);
    this.params = {
      token: accessToken,
    };
    const result = await this.postDirect(this.getUrl());
    console.log('token request = ', result);
    return true;
  }
}
