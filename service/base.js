import { TOKEN_GET, TOKEN_SET } from '../store/constant_types'

export default class Base {
  constructor(componentScope) {
    this._rentStore = componentScope.$store
    this._axios = componentScope.$axios
    this._params = ''
    this._baseUrl = process.env.apiUrl
    this._apiName = ''
    this._apiUrl = ''
  }

  get rentStore() {
    return this._rentStore
  }

  set rentStore(value) {
    this._rentStore = value
  }

  get apiUrl() {
    return this._apiUrl
  }

  set apiUrl(value) {
    this._apiUrl = value
  }

  get axios() {
    return this._axios
  }

  set axios(value) {
    this._axios = value
  }

  set baseUrl(value) {
    this._baseUrl = value
  }

  get baseUrl() {
    return this._baseUrl
  }

  get apiName() {
    return this._apiName
  }

  set apiName(value) {
    this._apiName = value
  }

  get params() {
    return this._params
  }

  set params(value) {
    this._params = value
  }

  /**
   * 토큰을 저장한다.
   * @returns {Promise<boolean>}
   */
  async checkToken() {
    const token =
      this.rentStore.getters[TOKEN_GET.load].accessToken ||
      localStorage.getItem('ACCESS_TOKEN')
    if (token) {
      await this.axios.setToken('Bearer ' + token)
      return Promise.resolve(true)
    } else {
      // 토큰이 없는 거니까..
      return Promise.reject(new Error(false))
    }
  }

  get() {
    const vm = this

    return this.checkToken()
      .then(() => {
        return this.axios
          .$get(this.getUrl(), { params: this.params, progress: false })
          .then(this.response)
          .catch((e) =>
            this.errorPrint(e).then((r) => {
              if (r) {
                return vm.get()
              } else {
                console.log('Get error of refresh token error')
                return false
              }
            })
          )
      })
      .catch(this.errorPrint)
  }

  getDirect(url) {
    return this.checkToken()
      .then(() => {
        return this.axios
          .$get(url)
          .then(this.response)
          .catch(this.errorPrint)
      })
      .catch(this.errorPrint)
  }

  post() {
    // const vm = this;
    return this.checkToken()
      .then(() => {
        return this.axios
          .$post(this.getUrl(), this.params)
          .then(this.response)
          .catch((e) =>
            this.errorPrint(e).then((r) => {
              console.log('Retry catch error result:', r)
              if (r) {
                return this.post()
              } else {
                console.log('Post error of refresh token error')
                return false
              }
            })
          )
      })
      .catch(this.errorPrint)
  }

  put() {
    const vm = this
    return this.checkToken()
      .then(() => {
        return this.axios
          .$put(this.getUrl(), this.params)
          .then(this.response)
          .catch(this.errorPrint)
      })
      .catch((e) =>
        this.errorPrint(e).then((r) => {
          if (r) {
            return vm.put()
          } else {
            console.log('Put error of refresh token error')
            return false
          }
        })
      )
  }

  delete() {
    const vm = this
    return this.checkToken()
      .then(() => {
        return this.axios
          .$delete(this.getUrl(), this.params)
          .then(this.response)
          .catch(this.errorPrint)
      })
      .catch((e) =>
        this.errorPrint(e).then((r) => {
          if (r) {
            return vm.delete()
          } else {
            console.log('Delete error of refresh token error')
            return false
          }
        })
      )
  }

  patch() {
    const vm = this
    return this.checkToken()
      .then(() => {
        return this.axios
          .$patch(this.getUrl(), this.params)
          .then(this.response)
          .catch(this.errorPrint)
      })
      .catch((e) =>
        this.errorPrint(e).then((r) => {
          if (r) {
            return vm.patch()
          } else {
            console.log('Patch error of refresh token error')
            return false
          }
        })
      )
  }

  getUrl() {
    if (this.apiUrl === '') {
      return this.baseUrl + '/' + this.apiName
    } else if (this.apiName === '') {
      return this.baseUrl + '/' + this.apiUrl
    } else {
      return this.baseUrl + '/' + this.apiName + '/' + this.apiUrl
    }
  }

  response(res) {
    // console.log('========== Response start ==========');
    // console.log(res);
    // console.log('========== Response end ============');
    return res
  }

  refreshToken() {
    const vm = this
    const refreshToken =
      vm.rentStore.getters[TOKEN_GET.load].refreshToken ||
      localStorage.getItem('REFRESH_TOKEN')
    if (refreshToken) {
      vm.axios.setToken(null)
      const params = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }
      return vm.axios.$post(vm.baseUrl + '/auth/token', params).then((res) => {
        const accessToken = `${res.access_token}`
        localStorage.setItem('REFRESH_TOKEN', res.refresh_token)
        localStorage.setItem('ACCESS_TOKEN', accessToken)
        vm.rentStore.commit(TOKEN_SET.load, res)
        vm.axios.setToken('Bearer ' + accessToken)
        return Promise.resolve(true)
      })
    } else {
      console.log('Refresh token 인증을 실패 했습니다.')
      return Promise.reject(new Error(false))
    }
  }

  errorPrint(e) {
    // const vm = this;
    const code = parseInt(e.response && e.response.status)
    console.log('error print:', code)
    switch (code) {
      case 400:
        alert('API 통신 애러.')
        console.log('ErrorPrint 400: ', e.response)
        return Promise.reject(new Error(false))
      case 401:
        console.log(
          'ErrorPrint 401 토큰이 만료되서 재발급 받습니다.',
          e.response
        )
        return this.refreshToken()
      case 403:
        alert('Request has expired <토큰>')
        console.log('403:', e.response)
        return Promise.reject(new Error(false))
      default:
        // alert('잘못된 접근 입니다. \n처음 페이  지로 돌아 갑니다.' + code);
        // window.location.href = process.env.managerUrl;
        return Promise.reject(new Error(false))
    }
  }
}
