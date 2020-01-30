import Base from './base';

export default class Vendor extends Base {
  constructor(componentScope) {
    super(componentScope);
    this.apiName = 'v1/user/vendor';
  }

  get() {
    return this.baseGet();
  }

  post(id, params) {
    this.apiUrl = id;
    this.params = params;
    return this.basePost();
  }

  patch(id, params) {
    this.apiUrl = id;
    this.params = { data: params };
    return this.basePatch();
  }

  delete(id, params) {
    this.apiUrl = id;
    this.params = params;
    return this.baseDelete();
  }

  searchGet(params) {
    this.params = params;
    return this.baseGet();
  }

  selectGet(id) {
    this.apiUrl = id;
    return this.baseGet();
  }

  codePost(id, params) {
    this.apiUrl = id + '/verify-vendor-code';
    this.params = params;
    return this.basePost()
      .then(this.response)
      .catch(this.response);
  }
}
