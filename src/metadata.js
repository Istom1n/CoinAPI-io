import request from './utils/request'
import { getEndpoint, requestProperties } from './api'
import './utils/jsdocsModels'

export class Metadata {
  /**
  * Get a detailed list of exchanges provided by the system.
  * @returns {Promise<MetadataExchange[]>}
  */
  async listExchanges () {
    return request({
      url: getEndpoint('/v1/exchanges'),
      ...requestProperties()
    })
  }

  /**
  * Get detailed list of assets.
  * @returns {Promise<MetadataAsset[]>}
  */
  async listAssets () {
    return request({
      url: getEndpoint('/v1/assets'),
      ...requestProperties()
    })
  }

  /**
  * Get detailed list of all symbols.
  * @param {String=} filterSymbolId Comma or semicolon delimited parts of symbol identifier used to filter response (optional, full list available [here]{@link CoinAPI#metadata_list_symbols}).
  * @returns {Promise<MetadataSymbol[]>}
  */
  async listSymbols (filterSymbolId) {
    return request({
      url: getEndpoint('/v1/symbols'),
      ...requestProperties()
    })
  }
}

export default Metadata
