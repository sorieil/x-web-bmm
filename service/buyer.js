import Base from './base';

export default class Buyer extends Base {
  constructor(componentScope) {
    super(componentScope);
    this.apiName = 'v1/user/buyer';
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
