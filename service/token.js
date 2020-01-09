// import { PROJECT_GET } from '../store/constant_types'
import Base from './base';

export default class Token extends Base {
  constructor(componentScope) {
    super(componentScope);
    this.apiName = 'token';
  }

  requestToken(accessToken) {
    this.axios.Authorization = `${accessToken}`;
    this.axios.contentType = 'application/json';
    return this.postDirect(this.getUrl());
  }
}
