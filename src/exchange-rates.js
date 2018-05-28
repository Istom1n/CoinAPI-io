import axios from 'axios'
import './utils/jsdocsModels'

export class ExchangeRates {
  /**
     * Get exchange rate between pair of requested assets at specific or current time.
     * @param  {String} assetIdBase Requested exchange rate base asset identifier. Full list available [here]{@link CoinAPI#metadata_list_assets}
     * @param  {String} assetIdQuote Requested exchange rate quote asset identifier. Full list available [here]{@link CoinAPI#metadata_list_assets}
     * @param  {Date=} time Time at which exchange rate is calculated (optional, if not supplied then current rate is returned)
     * @returns  {Promise<ExchangeSpecificRate[]>}
     */
  ratesGetSpecificRate (assetIdBase, assetIdQuote, time) {
    let path = `${this.url}/v1/exchangerate/${assetIdBase}/${assetIdQuote}`
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
     * @param  {String} assetIdBase Requested exchange rate base asset identifier. Full list available [here]{@link CoinAPI#metadata_list_assets}
     * @returns {Promise<ExchangeRate[]>}
     */
  ratesGetAllCurrentRates (assetIdBase) {
    let path = this.url + ('/v1/exchangerate/' + assetIdBase)
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

export default ExchangeRates
