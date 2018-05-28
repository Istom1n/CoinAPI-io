/**
 * Rewrited by Ivan Istomin, 2018
 */

import './utils/jsdocsModels'

// This is to support both browser and node
if (typeof window !== 'undefined') {
  window.require = function () {}
  window.exports = {}
}
let axios = typeof window === 'undefined'
  ? require('axios')
  : window.axios
let ISO_8601 = /^(?:[1-9]\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)-02-29)T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,9})?(?:Z|[+-][01]\d:[0-5]\d)$/
function formatDate (d) {
  return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear()
}
let transformResponse = axios
  .defaults
  .transformResponse
  .concat(function (data) {
    let tmp = function (item) {
      return Object
        .keys(item)
        .forEach(function (k) {
          // console.log(item[k], ISO_8601.test(item[k]))
          if (ISO_8601.test(item[k])) {
            item[k] = new Date(Date.parse(item[k]))
          }
        })
    }
    tmp(data)
    if (Array.isArray(data)) {
      data.forEach(tmp)
    } else {
      tmp(data)
    }
    return data
  })

/**
 * A class to handle all CoinAPI.io functions
 * @param {String} apiKey The api key of customer
 */
export default class CoinAPI {
  constructor (apiKey) {
    if (apiKey === void 0) {
      apiKey = null
    }

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
  }
}

// For UML format
module.exports = CoinAPI

if (typeof window !== 'undefined') {
  window.CoinAPI = CoinAPI
}
