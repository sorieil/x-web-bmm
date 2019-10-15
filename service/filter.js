// import { PROJECT_GET } from '../store/constant_types'
import Base from './base';

export default class Filter extends Base {
  constructor(componentScope) {
    super(componentScope);
    this.apiName = 'v1/user/filter';
  }

  get() {
    return this.baseGet();
  }
}
