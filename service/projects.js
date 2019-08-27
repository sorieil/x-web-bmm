import { PROJECT_GET } from '../store/constant_types'
import Base from './base'

export default class Projects extends Base {
  constructor(componentScope) {
    super(componentScope)
    this.apiName = 'projects'
    this.projectId = componentScope.$store.getters[PROJECT_GET.load].id
  }

  deploy() {
    this.apiUrl = `${this.projectId}/versions/draft/deploy`
    // this.params = {
    //   domain_id: 1,
    //   path_id: 2,
    // };
    return this.post()
  }
}
