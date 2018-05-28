// TODO Return as was what comes back

/** Metadata **/

/** @typedef {('SPOT'|'FUTURES'|'OPTION')} SymbolType */

/**
 * @typedef {Object} MetadataExchange
 * @property {String} exchangeId Our exchange identifier
 * @property {String} website Exchange website address
 * @property {String} name Display name of the exchange
 */

/**
 * @typedef {Object} MetadataAsset
 * @property {String} asset_id Our asset identifier. Superset of the ISO 4217 currency codes standard
 * @property {String} name Display name of the asset
 * @property {Boolean} type_is_crypto Boolean value; true for cryptocurrency assets, false otherwise
 */

/**
 * @typedef {Object} MetadataSymbol
 * @property {String} symbolId Our symbol identifier, see table below for format description
 * @property {String} exchangeId Our identifier of the exchange where symbol is traded
 * @property {SymbolType} symbolType Type of symbol
 * @property {String} assetIdBase FX Spot base asset identifier, for derivatives it’s contact underlying (e.g. BTC for BTC/USD)
 * @property {String} assetIdQuote FX Spot quote asset identifier, for derivatives it’s contract underlying (e.g. USD for BTC/USD)
 */

/** Exchange rates **/

/**
 * @typedef {Object} ExchangeSpecificRate
 * @property {String} time Time in ISO 8601 of the market data used to calculate exchange rate
 * @property {String} assetIdBase Exchange rate base asset identifier
 * @property {String} assetIdQuote Exchange rate quote asset identifier
 * @property {Number} rate Exchange rate between assets
 */

/**
 * @typedef {Object} ExchangeRate
 * @property {String} assetIdBase Requested exchange rates base asset identifier. Full list available [here]{@link CoinAPI#metadataList_assets}
 * @property {ExchangeSpecificRate[]} rates Our identifier of the exchange where symbol is traded
 */

/** OHLCV **/

/** @typedef {('second'|'minute'|'hour'|'day'|'month'|'year')} UnitType */

/**
 * @typedef {Object} Period
 * @property {String} periodId Period identifier, used in other API calls
 * @property {Number} lengthSeconds Seconds part of period length
 * @property {Number} length_months Months part of period length
 * @property {Number} unitCount Period length in units
 * @property {UnitType} unitName Type of unit
 * @property {String} displayName Display name of period length
 */

/**
 * @typedef {Object} Candlestick
 * @property {String} timePeriodStart Period starting time (range left inclusive)
 * @property {String} timePeriodEnd Period ending time (range right exclusive)
 * @property {String} timeOpen Time of first trade inside period range
 * @property {String} timeClose Time of last trade inside period range
 * @property {Number} priceOpen First trade price inside period range
 * @property {Number} priceHigh Highest traded price inside period range
 * @property {Number} priceLow Lowest traded price inside period range
 * @property {Number} priceClose Last trade price inside period range
 * @property {Number} volumeTraded Cumulative base amount traded inside period range
 * @property {Number} tradesCount Amount of trades executed inside period range
 */

/** Trades **/

/** @typedef {('BUY'|'SELL'|'BUY_ESTIMATED'|'SELL_ESTIMATED'|'UNKNOWN')} TakerType */

/**
 * @typedef {Object} Trade
 * @property {String} symbolId Our symbol identifier, format is documented [here]{@link CoinAPI#metadataListSymbols}
 * @property {String} timeExchange Time of trade reported by exchange
 * @property {String} timeCoinapi Time when coinapi first received trade from exchange
 * @property {String} uuid Our trade unique identifier in form of UUIDv4
 * @property {Number} price Price of the transaction
 * @property {Number} size Base asset amount traded in the transaction
 * @property {TakerType} takerSide Aggressor side of the transaction
 */

/** Quotes **/

/**
 * @typedef {Object} LastTrade
 * @property {String} timeExchange Exchange time of order book
 * @property {String} timeCoinapi CoinAPI time when order book received from exchange
 * @property {String} uuid Our trade unique identifier in form of UUIDv4
 * @property {Number} price Price of the transaction
 * @property {Number} size Base asset amount traded in the transaction
 * @property {TakerType} takerSide Aggressor side of the transaction
 */

/**
 * @typedef {Object} Quotes
 * @property {String} symbolId Our symbol identifier, format is documented [here]{@link CoinAPI#metadataListSymbols}
 * @property {String} timeExchange Exchange time of order book
 * @property {String} timeCoinapi CoinAPI time when order book received from exchange
 * @property {Number} askPrice Best asking price
 * @property {Number} askSize Volume resting on best ask
 * @property {Number} bidPrice Best bidding price
 * @property {Number} bidSize Volume resting on best bid
 * @property {LastTrade[]} lastTrade Last executed transaction, variables described in trades section
 */

/**
 * @typedef {Object} Quote
 * @property {String} symbolId Our symbol identifier, format is documented [here]{@link CoinAPI#metadataListSymbols}
 * @property {String} timeExchange Exchange time of order book
 * @property {String} timeCoinapi CoinAPI time when order book received from exchange
 * @property {Number} askPrice Best asking price
 * @property {Number} askSize Volume resting on best ask
 * @property {Number} bidPrice Best bidding price
 * @property {Number} bidSize Volume resting on best bid
 */

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
 * @property {String} symbolId Our symbol identifier, format is documented [here]{@link CoinAPI#metadataListSymbols}
 * @property {String} timeExchange Exchange time of order book
 * @property {String} timeCoinapi CoinAPI time when order book received from exchange
 * @property {Ask[]} asks Best 20 ask levels in order from best to worst
 * @property {Bid[]} bids Best 20 bid levels in order from best to worst
 */

/** Twitter **/

/**
 * @typedef {Object} Tweet
 * @property {String} created_at Our symbol identifier, format is documented [here]{@link CoinAPI#metadataListSymbols}
 * @property {Number} id Time of trade reported by exchange
 * @property {String} idStr Time when coinapi first received trade from exchange
 * @property {String} text Our trade unique identifier in form of UUIDv4
 * @property {String} source Utility used to post the Tweet, as an HTML-formatted string. Tweets from the Twitter website have a source value of web
 * @property {Boolean} truncated Indicates whether the value of the text parameter was truncated, for example, as a result of a retweet exceeding the original Tweet text length limit of 140 characters. Truncated text will end in ellipsis, like this ... Since Twitter now rejects long Tweets vs truncating them, the large majority of Tweets will have this set to false . Note that while native retweets may have their toplevel text property shortened, the original text will be available under the retweetedStatus object and the truncated parameter will be set to the value of the original status (in most cases, false)
 * @property {Number} inReplyToStatusId Aggressor side of the transaction
 * @property {Number} inReplyToStatusId Aggressor side of the transaction
 * @property {Number} inReplyToStatusId Aggressor side of the transaction
 * @property {Number} inReplyToStatusId Aggressor side of the transaction
 * @property {Number} inReplyToStatusId Aggressor side of the transaction
 * @property {UserTwitter} user The user who posted this Tweet. See User data dictionary for complete list of attributes
 * @property {CoordinateTwitter} coordinates Represents the geographic location of this Tweet as reported by the user or client application. The inner coordinates array is formatted as geoJSON (longitude first, then latitude)
 * @property {PlaceTwitter} place
 */
