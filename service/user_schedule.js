// import { PROJECT_GET } from '../store/constant_types'
import Base from './base';

export default class UserSchedule extends Base {
  constructor(componentScope) {
    super(componentScope);
    this.apiName = 'v1/user/schedule';
  }

  get(date) {
    this.apiUrl = date;
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
