// import { PROJECT_GET } from '../store/constant_types'
import Base from './base';

export default class Vendor extends Base {
  constructor(componentScope) {
    super(componentScope);
    this.apiName = 'v1/user/business';
  }

  get() {
    return this.baseGet();
  }

  post(params) {
    this.params = params;
    return this.basePost();
  }

  patch(id, params) {
    this.apiUrl = id;
    this.params = params;
    return this.basePatch();
  }

  delete(id, params) {
    this.apiUrl = id;
    this.params = params;
    return this.baseDelete();
  }
}
