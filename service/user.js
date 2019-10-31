import Base from './base';

export default class User extends Base {
  constructor(componentScope) {
    super(componentScope);
    this.apiName = 'v1/user';
  }

  get() {
    console.log('axios header:', this.axios.defaults.headers);
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
