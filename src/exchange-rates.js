import request from './utils/request'
import { getEndpoint, requestProperties } from './api'
import './utils/jsdocsModels'

export class ExchangeRates {
  /**
  * Get exchange rate between pair of requested assets at specific or current time.
  * @param  {String} assetIdBase Requested exchange rate base asset identifier. Full list available [here]{@link CoinAPI#metadata_list_assets}
  * @param  {String} assetIdQuote Requested exchange rate quote asset identifier. Full list available [here]{@link CoinAPI#metadata_list_assets}
  * @param  {Date=} time Time at which exchange rate is calculated (optional, if not supplied then current rate is returned)
  * @returns  {Promise<ExchangeSpecificRate[]>}
  */
  async getSpecificRate (assetIdBase, assetIdQuote, time) {
    return request({
      url: getEndpoint(`/v1/exchangerate/${assetIdBase}/${assetIdQuote}`),
      ...requestProperties(),
      qs: {
        time: time.toISOString()
      }
    })
  }

  /**
     * Get the current exchange rate between requested asset and all other assets.
     * @param  {String} assetIdBase Requested exchange rate base asset identifier. Full list available [here]{@link CoinAPI#metadata_list_assets}
     * @returns {Promise<ExchangeRate[]>}
     */
  async getAllCurrentRates (assetIdBase) {
    return request({
      url: getEndpoint(`/v1/exchangerate/${assetIdBase}`),
      ...requestProperties()
    })
  }
}

export default ExchangeRates
