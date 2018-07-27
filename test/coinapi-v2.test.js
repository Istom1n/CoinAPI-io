/* global jest, expect, describe, it  */

import createCoinAPI from '../src/coinapi-v2'

describe('CoinAPI ', () => {
    it('warns about initialization without authentication', async () => {
      console.warn = jest.fn(warn => {})

      const api = await createCoinAPI()
      expect(api).toBeDefined()
      expect(console.warn).toHaveBeenCalledWith('CoinAPI client without API key authentication! Methods are unavailable.')
      expect(api.marketData).toBeDefined()
      expect(api.ws).toBeDefined()
      expect(api.wallet).toBeDefined()
      expect(api.getWeb3Accounts).toBeDefined()
      expect(api.setApiKeyAndSecret).toBeDefined()
      expect(api.trade).toBeUndefined()
    })
  
    it('exposes api if API key is provided', async () => {
      console.warn = jest.fn(warn => {})
      const api = await createCoinAPI(process.env.COIN_API_KEY)
      expect(api).toBeDefined()
      expect(console.warn).not.toHaveBeenCalled()
      expect(api.metadata).toBeDefined()
      expect(api.exchangeRates).toBeDefined()
      expect(api.ohlcv).toBeDefined()
      expect(api.trades).toBeDefined()
      expect(api.quotes).toBeDefined()
      expect(api.orderBook).toBeDefined()
      expect(api.twitter).toBeDefined()
      expect(api.ws).toBeDefined()
    })
  })