import './utils/jsdocsModels'

export class Quotes {
/**
     *
     */
    quotes_current_data_all () {
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
         * @param  {} symbol_id
         */
      quotes_current_data_symbol (symbol_id) {
        let path = this.url + ('/v1/quotes/' + symbol_id + '/current')
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
      quotes_latest_data_all (limit) {
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
         * @param  {} symbol_id
         * @param  {} limit
         */
      quotes_latest_data_symbol (symbol_id, limit) {
        if (limit === void 0) {
          limit = null
        }
        let path = this.url + ('/v1/quotes/' + symbol_id + '/latest')
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
         * @param  {} symbol_id
         * @param  {} time_start
         * @param  {} time_end
         * @param  {} limit
         */
      quotes_historical_data (symbol_id, time_start, time_end, limit) {
        if (time_end === void 0) {
          time_end = null
        }
        if (limit === void 0) {
          limit = null
        }
        let path = this.url + ('/v1/quotes/' + symbol_id + '/history?time_start=' + time_start.toISOString())
        let params = {}
        if (time_end) {
          params.time = time_end.toISOString()
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