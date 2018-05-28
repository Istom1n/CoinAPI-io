import './utils/jsdocsModels'

export class ExchangeRates {
    /**
     * Get exchange rate between pair of requested assets at specific or current time.
     * @param  {String} asset_id_base Requested exchange rate base asset identifier. Full list available [here]{@link CoinAPI#metadata_list_assets}
     * @param  {String} asset_id_quote Requested exchange rate quote asset identifier. Full list available [here]{@link CoinAPI#metadata_list_assets}
     * @param  {Date=} time Time at which exchange rate is calculated (optional, if not supplied then current rate is returned)
     * @returns  {Promise<ExchangeSpecificRate[]>}
     */
  ratesGetSpecificRate (asset_id_base, asset_id_quote, time) {
    let path = `${this.url}/v1/exchangerate/${asset_id_base}/${asset_id_quote}`
    let params = {}

    if (time != null) {
      console.log('not null')
      params.time = time.toISOString()
    } else {
      console.log('null')
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
     * Get the current exchange rate between requested asset and all other assets.
     * @param  {String} asset_id_base Requested exchange rate base asset identifier. Full list available [here]{@link CoinAPI#metadata_list_assets}
     * @returns {Promise<ExchangeRate[]>}
     */
  ratesGetAllCurrentRates (asset_id_base) {
    let path = this.url + ('/v1/exchangerate/' + asset_id_base)
    return axios
      .get(path, {
        headers: this.headers,
        transformResponse: transformResponse
      })
      .then(function (resp) {
        return resp.data
      })
  }
}