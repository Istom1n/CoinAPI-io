/**
 * Rewrited by Ivan Istomin, 2018
 */

let jsdocsModels = require('./jsdocsModels');

// This is to support both browser and node
if (typeof window !== 'undefined') {
    window.require = function () {};
    window.exports = {};
}
let axios = typeof window === 'undefined'
    ? require("axios")
    : window.axios;
let ISO_8601 = /^(?:[1-9]\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)-02-29)T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,9})?(?:Z|[+-][01]\d:[0-5]\d)$/;
function formatDate(d) {
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
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
                        item[k] = new Date(Date.parse(item[k]));
                    }
                });
        };
        tmp(data);
        if (Array.isArray(data)) {
            data.forEach(tmp);
        } else {
            tmp(data);
        }
        return data;
    });

/**
 * A class to handle all CoinAPI.io functions
 * @param {String} api_key The api key of customer
 */
class CoinAPI {
    constructor(api_key) {
        if (api_key === void 0) {
            api_key = null;
        }

        this.api_key = "";
        this.headers = {};
        this.url = "https://rest-test.coinapi.io";

        if (api_key) {
            this.api_key = api_key;
            this.headers = {
                "X-CoinAPI-Key": api_key
            };
            this.url = "https://rest.coinapi.io";
        }
    }

    /**
     * Get a detailed list of exchanges provided by the system.
     * @returns {Promise<MetadataExchange[]>}
     */
    metadata_list_exchanges() {
        let path = this.url + "/v1/exchanges";

        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * Get detailed list of assets.
     * @returns {Promise<MetadataAsset[]>}
     */
    metadata_list_assets() {
        let path = this.url + "/v1/assets";

        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * Get detailed list of all symbols.
     * @param {String=} filter_symbol_id Comma or semicolon delimited parts of symbol identifier used to filter response (optional, full list available [here]{@link CoinAPI#metadata_list_symbols}).
     * @returns {Promise<MetadataSymbol[]>}
     */
    metadata_list_symbols(filter_symbol_id) {
        let path = this.url + "/v1/symbols";

        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * Get exchange rate between pair of requested assets at specific or current time.
     * @param  {String} asset_id_base Requested exchange rate base asset identifier. Full list available [here]{@link CoinAPI#metadata_list_assets}
     * @param  {String} asset_id_quote Requested exchange rate quote asset identifier. Full list available [here]{@link CoinAPI#metadata_list_assets}
     * @param  {Date=} time Time at which exchange rate is calculated (optional, if not supplied then current rate is returned)
     * @returns  {Promise<ExchangeSpecificRate[]>}
     */
    exchange_rates_get_specific_rate(asset_id_base, asset_id_quote, time) {
        if (time === void 0) {
            time = null;
        }

        let path = this.url + ("/v1/exchangerate/" + asset_id_base + "/" + asset_id_quote);
        let params = {};

        if (time) {
            params.time = time.toISOString();
        }

        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse,
                params: params
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * Get the current exchange rate between requested asset and all other assets.
     * @param  {String} asset_id_base Requested exchange rate base asset identifier. Full list available [here]{@link CoinAPI#metadata_list_assets}
     * @returns {Promise<ExchangeRate[]>}
     */
    exchange_rates_get_all_current_rates(asset_id_base) {
        let path = this.url + ("/v1/exchangerate/" + asset_id_base);
        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * Get full list of supported time periods available for requesting OHLCV timeseries data.
     * @returns {Promise<Period[]>}
     */
    ohlcv_list_all_periods() {
        let path = this.url + "/v1/ohlcv/periods";
        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * Get OHLCV latest timeseries data for requested symbol and period, returned in time descending order.
     * @param  {String} symbol_id Symbol identifier of requested timeseries (full list available here)
     * @param  {String} period_id Identifier of requested timeseries period (required, e.g. 5SEC or 2MTH, full list here)
     * @param  {Boolean=} include_empty_items Include items with no activity? (optional, default value is false, possible values are true or false)
     * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
     * @returns  {Promise<Candlestick[]>}
     */
    ohlcv_latest_data(symbol_id, period_id, include_empty_items, limit) {
        if (limit === void 0) {
            limit = null;
        }

        let path = this.url + (`/v1/ohlcv/${symbol_id}/latest?period_id=${period_id}`);
        let params = {};

        if (limit) {
            params.limit = limit;
        }

        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse,
                params: params
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * Get OHLCV timeseries data for requested symbol and period, returned in time ascending order.
     * @param  {String} symbol_id Symbol identifier of requested timeseries (full list available here)
     * @param  {String} period_id Identifier of requested timeseries period (required, e.g. 5SEC or 2MTH, full list here)
     * @param  {Date} time_start Timeseries starting time in ISO 8601
     * @param  {Date=} time_end Timeseries ending time in ISO 8601 (optional, if not supplied then the data is returned to the end or when count of result elements reaches the limit)
     * @param  {Boolean=} include_empty_items Include items with no activity? (optional, default value is false, possible values are true or false)
     * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
     * @returns  {Promise<Candlestick[]>}
     */
    ohlcv_historic_data(symbol_id, period_id, time_start, time_end, include_empty_items, limit) {
        if (time_end === void 0) {
            time_end = null;
        }

        if (limit === void 0) {
            limit = null;
        }

        let path = `${this
            .url}/v1/ohlcv/${symbol_id}/history?period_id=${period_id}&time_start=${time_start
            .toISOString()}`;
        let params = {};

        if (time_end) {
            params.time = time_end.toISOString();
        }

        if (limit) {
            params.limit = limit;
        }

        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse,
                params: params
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * Get latest trades from all symbols up to 1 minute ago. Latest data is always returned in time descending order
     * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
     * @returns {Promise<Trade[]>}
     */
    trades_latest_data_all(limit) {
        if (limit === void 0) {
            limit = null;
        }
        let path = this.url + "/v1/trades/latest";
        let params = {};
        if (limit) {
            params.limit = limit;
        }
        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse,
                params: params
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * Get latest trades from a specific symbol without time limitation. Latest data is always returned in time descending order
     * @param  {String} symbol_id Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
     * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
     * @returns {Promise<Trade[]>}
     */
    trades_latest_data_symbol(symbol_id, limit) {
        if (limit === void 0) {
            limit = null;
        }

        let path = this.url + ("/v1/trades/" + symbol_id + "/latest");
        let params = {};

        if (limit) {
            params.limit = limit;
        }

        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse,
                params: params
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * Get history transactions from specific symbol, returned in time ascending order.
     * @param  {String} symbol_id Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
     * @param  {Date} time_start Starting time in ISO 8601
     * @param  {Date=} time_end Timeseries ending time in ISO 8601 (optional, if not supplied then the data is returned to the end or when result elements count reaches the limit)
     * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
     * @returns {Promise<Trade[]>}
     */
    trades_historical_data(symbol_id, time_start, time_end, limit) {
        if (time_end === void 0) {
            time_end = null;
        }
        if (limit === void 0) {
            limit = null;
        }
        let path = this.url + ("/v1/trades/" + symbol_id + "/history?time_start=" + time_start.toISOString());
        let params = {};
        if (time_end) {
            params.time = time_end.toISOString();
        }
        if (limit) {
            params.limit = limit;
        }
        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse,
                params: params
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    quotes_current_data_all() {
        let path = this.url + "/v1/quotes/current";
        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    quotes_current_data_symbol(symbol_id) {
        let path = this.url + ("/v1/quotes/" + symbol_id + "/current");
        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    quotes_latest_data_all(limit) {
        if (limit === void 0) {
            limit = null;
        }
        let path = this.url + "/v1/quotes/latest";
        let params = {};
        if (limit) {
            params.limit = limit;
        }
        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse,
                params: params
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * @param  {} symbol_id
     * @param  {} limit
     */
    quotes_latest_data_symbol(symbol_id, limit) {
        if (limit === void 0) {
            limit = null;
        }
        let path = this.url + ("/v1/quotes/" + symbol_id + "/latest");
        let params = {};
        if (limit) {
            params.limit = limit;
        }
        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse,
                params: params
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * @param  {} symbol_id
     * @param  {} time_start
     * @param  {} time_end
     * @param  {} limit
     */
    quotes_historical_data(symbol_id, time_start, time_end, limit) {
        if (time_end === void 0) {
            time_end = null;
        }
        if (limit === void 0) {
            limit = null;
        }
        let path = this.url + ("/v1/quotes/" + symbol_id + "/history?time_start=" + time_start.toISOString());
        let params = {};
        if (time_end) {
            params.time = time_end.toISOString();
        }
        if (limit) {
            params.limit = limit;
        }
        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse,
                params: params
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * Get current order book snapshot for all symbols
     * @returns {Promise<OrderBook>}
     */
    orderbooks_current_data_all() {
        let path = this.url + "/v1/orderbooks/current";
        let params = {};
        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse,
                params: params
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * Get current order book snapshot for a specific symbol
     * @param  {String} symbol_id Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
     * @param  {Number=} limit_levels Maximum amount of levels from each side of the book to include in response (optional)
     * @returns {Promise<OrderBook>}
     */
    orderbooks_current_data_symbol(symbol_id, limit_levels) {
        let path = this.url + ("/v1/orderbooks/" + symbol_id + "/current");
        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * Get latest order book snapshots for a specific symbol, returned in time descending order
     * @param  {String} symbol_id Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
     * @param  {Number=} limit_levels Maximum amount of levels from each side of the book to include in response (optional)
     * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
     * @returns {Promise<OrderBook>}
     */
    orderbooks_latest_data(symbol_id, limit_levels, limit) {
        if (limit === void 0) {
            limit = null;
        }
        let path = this.url + ("/v1/orderbooks/" + symbol_id + "/latest");
        let params = {};
        if (limit) {
            params.limit = limit;
        }
        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse,
                params: params
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * Get historical order book snapshots for a specific symbol within time range, returned in time ascending order
     * @param  {String} symbol_id Symbol identifier for requested timeseries (full list available [here]{@link CoinAPI#metadata_list_symbols})
     * @param  {Date} time_start Starting time in ISO 8601
     * @param  {Date=} time_end Timeseries ending time in ISO 8601 (optional, if not supplied then the data is returned to the end or when result elements count reaches the limit)
     * @param  {Number=} limit_levels Maximum amount of levels from each side of the book to include in response (optional)
     * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
     */
    orderbooks_historical_data(symbol_id, time_start, time_end, limit_levels, limit) {
        if (time_end === void 0) {
            time_end = null;
        }
        if (limit === void 0) {
            limit = null;
        }
        let path = this.url + ("/v1/orderbooks/" + symbol_id + "/history?time_start=" + time_start.toISOString());
        let params = {};
        if (time_end) {
            params.time = time_end.toISOString();
        }
        if (limit) {
            params.limit = limit;
        }
        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse,
                params: params
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * Get latest tweets related to cryptocurrency markets, returned in time descending order
     * @param  {Number} limit
     * @returns {Promise<Tweet[]>}
     */
    twitter_latest_data(limit) {
        if (limit === void 0) {
            limit = null;
        }
        let path = this.url + "/v1/twitter/latest";
        let params = {};
        if (limit) {
            params.limit = limit;
        }
        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse,
                params: params
            })
            .then(function (resp) {
                return resp.data;
            });
    }

    /**
     * Get historical tweets related to cryptocurrency markets, returned in time ascending order
     * @param  {Date} time_start Starting time in ISO 8601
     * @param  {Date=} time_end Timeseries ending time in ISO 8601 (optional, if not supplied then the data is returned to the end or when result elements reaches count the limit)
     * @param  {Number=} limit Amount of items to return (optional, mininum is 1, maximum is 100000, default value is 100, if the parameter is used then every 100 output items are counted as one request)
     * @returns {Promise<Tweet[]>}
     */
    twitter_historical_data(time_start, time_end, limit) {
        if (time_end === void 0) {
            time_end = null;
        }

        if (limit === void 0) {
            limit = null;
        }

        let path = `${this
            .url}/v1/twitter/history?time_start=${time_start
            .toISOString()}`;
        let params = {};

        if (time_end) {
            params.time = time_end.toISOString();
        }

        if (limit) {
            params.limit = limit;
        }

        return axios
            .get(path, {
                headers: this.headers,
                transformResponse: transformResponse,
                params: params
            })
            .then(function (resp) {
                return resp.data;
            });
    }
}

module.exports = CoinAPI;

if (typeof window !== 'undefined') {
    window.CoinAPI = CoinAPI;
}