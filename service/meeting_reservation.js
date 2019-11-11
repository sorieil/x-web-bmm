import Base from './base';

export default class MeetingReservation extends Base {
  constructor(componentScope) {
    super(componentScope);
    this.apiName = 'v1/user/meeting-reservation';
  }

  get() {
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

  delete(id) {
    this.apiUrl = id;
    return this.baseDelete();
  }
}
