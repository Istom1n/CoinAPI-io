import './utils/jsdocsModels'

export class Quotes {
/**
     *
     */
  currentDataAll () {
    let path = this.url + '/v1/quotes/current'
    return axios
      .get(path, {
        headers: this.headers,
        transformResponse: transformResponse
      })
      .then(function (resp) {
        return resp.data
      })
  }

  /**
         *
         * @param  {} symbolId
         */
  currentDataSymbol (symbolId) {
    let path = this.url + ('/v1/quotes/' + symbolId + '/current')
    return axios
      .get(path, {
        headers: this.headers,
        transformResponse: transformResponse
      })
      .then(function (resp) {
        return resp.data
      })
  }
  /**
         *
         * @param  {} limit
         */
  latestDataAll (limit) {
    if (limit === void 0) {
      limit = null
    }
    let path = this.url + '/v1/quotes/latest'
    let params = {}
    if (limit) {
      params.limit = limit
    }
    return axios
      .get(path, {
        headers: this.headers,
        transformResponse: transformResponse,
        params: params
      })
      .then(function (resp) {
        return resp.data
      })
  }

  /**
         *
         * @param  {} symbolId
         * @param  {} limit
         */
  latestDataSymbol (symbolId, limit) {
    if (limit === void 0) {
      limit = null
    }
    let path = this.url + ('/v1/quotes/' + symbolId + '/latest')
    let params = {}
    if (limit) {
      params.limit = limit
    }
    return axios
      .get(path, {
        headers: this.headers,
        transformResponse: transformResponse,
        params: params
      })
      .then(function (resp) {
        return resp.data
      })
  }

  /**
         *
         * @param  {} symbolId
         * @param  {} timeStart
         * @param  {} timeEnd
         * @param  {} limit
         */
  historicalData (symbolId, timeStart, timeEnd, limit) {
    if (timeEnd === void 0) {
      timeEnd = null
    }
    if (limit === void 0) {
      limit = null
    }
    let path = this.url + ('/v1/quotes/' + symbolId + '/history?time_start=' + timeStart.toISOString())
    let params = {}
    if (timeEnd) {
      params.time = timeEnd.toISOString()
    }
    if (limit) {
      params.limit = limit
    }
    return axios
      .get(path, {
        headers: this.headers,
        transformResponse: transformResponse,
        params: params
      })
      .then(function (resp) {
        return resp.data
      })
  }
}

export default Quotes
