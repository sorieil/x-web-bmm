// import { PROJECT_GET } from '../store/constant_types'
import Base from './base';

export default class Favorite extends Base {
  constructor(componentScope) {
    super(componentScope);
    this.apiName = 'v1/user/favorite';
  }

  get() {
    return this.baseGet();
  }

  post(id) {
    this.apiUrl = id;
    return this.basePost();
  }

  delete(id) {
    this.apiUrl = id;
    return this.baseDelete();
  }
}
