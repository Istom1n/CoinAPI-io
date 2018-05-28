import './utils/jsdocsModels'

export class Metadata {
  /**
     * Get a detailed list of exchanges provided by the system.
     * @returns {Promise<MetadataExchange[]>}
     */
  listExchanges () {
    let path = this.url + '/v1/exchanges'

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
  * Get detailed list of assets.
  * @returns {Promise<MetadataAsset[]>}
  */
  listAssets () {
    let path = this.url + '/v1/assets'

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
     * Get detailed list of all symbols.
     * @param {String=} filterSymbolId Comma or semicolon delimited parts of symbol identifier used to filter response (optional, full list available [here]{@link CoinAPI#metadata_list_symbols}).
     * @returns {Promise<MetadataSymbol[]>}
     */
  listSymbols (filterSymbolId) {
    let path = this.url + '/v1/symbols'

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

export default Metadata
