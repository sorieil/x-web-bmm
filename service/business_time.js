// import { PROJECT_GET } from '../store/constant_types'
import Base from './base';

export default class BusinessTime extends Base {
  constructor(componentScope) {
    super(componentScope);
    this.apiName = 'v1/user/business-time';
  }

  get() {
    return this.baseGet();
  }

  _getBusinessTime() {
    // vendor 모드로 조회 해온다.
    this.apiUrl = 'vendor';
    return this.baseGet();
  }

  post(params) {
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
}
