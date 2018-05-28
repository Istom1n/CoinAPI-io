/**
 * Rewrited by Ivan Istomin, 2018
 */

import Metadata from './metadata'
import ExchangeRates from './exchange-rates'
import OHLCV from './ohlcv'
import Trades from './trades'
import Quotes from './quotes'
import OrderBook from './order-book'
import Twitter from './twitter'

import './utils/jsdocsModels'

// TODO Support for web

/**
 * A class to handle all CoinAPI.io functions
 * @param {String} apiKey The api key of customer
 */
async function createCoinAPI (apiKey) {
  this.apiKey = ''
  this.headers = {}
  this.url = 'https://rest-test.coinapi.io'

  if (apiKey) {
    this.apiKey = apiKey
    this.headers = {
      'X-CoinAPI-Key': apiKey
    }
    this.url = 'https://rest.coinapi.io'
  }

  const CoinAPI = {
    metadata: new Metadata(),
    exchangeRates: new ExchangeRates(),
    ohlcv: new OHLCV(),
    trades: new Trades(),
    quotes: new Quotes(),
    orderBook: new OrderBook(),
    twitter: new Twitter()
  }

  return CoinAPI
}

// For UML format
module.exports = createCoinAPI

export default createCoinAPI
