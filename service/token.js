// import { PROJECT_GET } from '../store/constant_types'
import Base from './base';

export default class Token extends Base {
  constructor(componentScope) {
    super(componentScope);
    this.apiName = 'v1/token-verify';
    // this.projectId = componentScope.$store.getters[PROJECT_GET.load].id
  }
  /**
   *
   * @param {jwt token} accessToken
   */
  tokenVerify(accessToken) {
    this.axios.Authorization = `JWT ${accessToken}`;
    this.axios.contentType = 'application/json';
    return this.getDirect(this.getUrl());
  }
}
