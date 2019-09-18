// import { PROJECT_GET } from '../store/constant_types'
import Base from './base';

export default class Code extends Base {
  constructor(componentScope) {
    super(componentScope);
    this.apiName = 'v1/code';
    // console.log('ENV params:', process.env.API_URL)
    // this.projectId = componentScope.$store.getters[PROJECT_GET.load].id
  }

  getFilterType() {
    this.params = {
      category: 'company_info_type',
    };
    return this.get();
  }
}
