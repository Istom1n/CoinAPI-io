/** Metadata **/

/** @typedef {('SPOT'|'FUTURES'|'OPTION')} SymbolType */

/**
 * @typedef {Object} MetadataExchange
 * @property {String} exchange_id Our exchange identifier
 * @property {String} website Exchange website address
 * @property {String} name Display name of the exchange
 */

/**
 * @typedef {Object} MetadataAsset
 * @property {String} period_id Period identifier, used in other API calls
 * @property {String} length_seconds Seconds part of period length
 * @property {Boolean} length_months Months part of period length
 */

/**
 * @typedef {Object} MetadataSymbol
 * @property {String} symbol_id Our symbol identifier, see table below for format description
 * @property {String} exchange_id Our identifier of the exchange where symbol is traded
 * @property {SymbolType} symbol_type Type of symbol
 * @property {String} asset_id_base FX Spot base asset identifier, for derivatives it’s contact underlying (e.g. BTC for BTC/USD)
 * @property {String} asset_id_quote FX Spot quote asset identifier, for derivatives it’s contract underlying (e.g. USD for BTC/USD)
 */


/** Exchange rates **/

/**
 * @typedef {Object} ExchangeSpecificRate
 * @property {String} time Time in ISO 8601 of the market data used to calculate exchange rate
 * @property {String} asset_id_base Exchange rate base asset identifier
 * @property {String} asset_id_quote Exchange rate quote asset identifier
 * @property {Number} rate Exchange rate between assets
 */

/**
 * @typedef {Object} ExchangeRate
 * @property {String} asset_id_base Requested exchange rates base asset identifier. Full list available [here]{@link CoinAPI#metadata_list_assets}
 * @property {ExchangeSpecificRate[]} rates Our identifier of the exchange where symbol is traded
 */


/** OHLCV **/

/** @typedef {('second'|'minute'|'hour'|'day'|'month'|'year')} UnitType */

/**
 * @typedef {Object} Period
 * @property {String} period_id Period identifier, used in other API calls
 * @property {Number} length_seconds Seconds part of period length
 * @property {Number} length_months Months part of period length
 * @property {Number} unit_count Period length in units
 * @property {UnitType} unit_name Type of unit
 * @property {String} display_name Display name of period length
 */

/**
 * @typedef {Object} Candlestick
 * @property {String} time_period_start Period starting time (range left inclusive)
 * @property {String} time_period_end Period ending time (range right exclusive)
 * @property {String} time_open Time of first trade inside period range
 * @property {String} time_close Time of last trade inside period range
 * @property {Number} price_open First trade price inside period range
 * @property {Number} price_high Highest traded price inside period range
 * @property {Number} price_low Lowest traded price inside period range
 * @property {Number} price_close Last trade price inside period range
 * @property {Number} volume_traded Cumulative base amount traded inside period range
 * @property {Number} trades_count Amount of trades executed inside period range
 */


/** Trades **/

/** @typedef {('BUY'|'SELL'|'BUY_ESTIMATED'|'SELL_ESTIMATED'|'UNKNOWN')} TakerType */

/**
 * @typedef {Object} Trade
 * @property {String} symbol_id Our symbol identifier, format is documented [here]{@link CoinAPI#metadata_list_symbols}
 * @property {String} time_exchange Time of trade reported by exchange
 * @property {String} time_coinapi Time when coinapi first received trade from exchange
 * @property {String} uuid Our trade unique identifier in form of UUIDv4
 * @property {Number} price Price of the transaction
 * @property {Number} size Base asset amount traded in the transaction
 * @property {TakerType} taker_side Aggressor side of the transaction
 */


/** Quotes **/

/** Order book **/

/**
 * @typedef {Object} Ask
 * @property {Number} price Price of ask
 * @property {Number} size Volume resting on bid/ask level in base amount
 */

/**
 * @typedef {Object} Bid
 * @property {Number} price Price of ask
 * @property {Number} size Volume resting on bid/ask level in base amount
 */

/**
 * @typedef {Object} OrderBook
 * @property {String} symbol_id Our symbol identifier, format is documented [here]{@link CoinAPI#metadata_list_symbols}
 * @property {String} time_exchange Exchange time of order book
 * @property {String} time_coinapi CoinAPI time when order book received from exchange
 * @property {Ask[]} asks Best 20 ask levels in order from best to worst
 * @property {Bid[]} bids Best 20 bid levels in order from best to worst
 */


/** Twitter **/

/**
 * @typedef {Object} Tweet
 * @property {String} created_at Our symbol identifier, format is documented [here]{@link CoinAPI#metadata_list_symbols}
 * @property {Number} id Time of trade reported by exchange
 * @property {String} id_str Time when coinapi first received trade from exchange
 * @property {String} text Our trade unique identifier in form of UUIDv4
 * @property {String} source Utility used to post the Tweet, as an HTML-formatted string. Tweets from the Twitter website have a source value of web
 * @property {Boolean} truncated Indicates whether the value of the text parameter was truncated, for example, as a result of a retweet exceeding the original Tweet text length limit of 140 characters. Truncated text will end in ellipsis, like this ... Since Twitter now rejects long Tweets vs truncating them, the large majority of Tweets will have this set to false . Note that while native retweets may have their toplevel text property shortened, the original text will be available under the retweeted_status object and the truncated parameter will be set to the value of the original status (in most cases, false)
 * @property {Number} in_reply_to_status_id Aggressor side of the transaction
 * @property {Number} in_reply_to_status_id Aggressor side of the transaction
 * @property {Number} in_reply_to_status_id Aggressor side of the transaction
 * @property {Number} in_reply_to_status_id Aggressor side of the transaction
 * @property {Number} in_reply_to_status_id Aggressor side of the transaction
 * @property {UserTwitter} user The user who posted this Tweet. See User data dictionary for complete list of attributes
 * @property {CoordinateTwitter} coordinates Represents the geographic location of this Tweet as reported by the user or client application. The inner coordinates array is formatted as geoJSON (longitude first, then latitude)
 * @property {PlaceTwitter} place 
 */