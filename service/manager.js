import Base from './base';

export default class Manager extends Base {
  constructor(componentScope) {
    super(componentScope);
    this.apiName = 'v1/user/vendor-manager';
  }

  get() {
    return this.baseGet();
  }

  post(vendorId, params) {
    this.params = { data: params };
    this.apiUrl = vendorId;
    return this.basePost();
  }

  patch(vendorManagerId, params) {
    this.apiUrl = vendorManagerId;
    this.params = { data: params };
    return this.basePatch();
  }

  delete(id) {
    this.apiUrl = id;
    return this.baseDelete();
  }
}
