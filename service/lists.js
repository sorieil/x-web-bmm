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
    return this.get();
  }

  deleteLists(listNumber) {
    this.apiUrl = listNumber;
    return this.delete();
  }

  postLists(form) {
    this.params = form;
    return this.post();
  }

  patchLists(listNumber, form) {
    this.params = form;
    this.apiUrl = listNumber;
    return this.patch();
  }
}
