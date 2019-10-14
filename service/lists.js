// import { PROJECT_GET } from '../store/constant_types'
import Base from './base';

export default class Lists extends Base {
  constructor(componentScope) {
    super(componentScope);
    this.apiName = 'v1/lists';
    // console.log('ENV params:', process.env.API_URL)
    // this.projectId = componentScope.$store.getters[PROJECT_GET.load].id
  }

  getLists(keywords) {
    // this.params = keywords;
    return this.baseGet();
  }

  deleteLists(listNumber) {
    this.apiUrl = listNumber;
    return this.baseDelete();
  }

  postLists(form) {
    this.params = form;
    return this.basePost();
  }

  patchLists(listNumber, form) {
    this.params = form;
    this.apiUrl = listNumber;
    return this.basePatch();
  }
}
