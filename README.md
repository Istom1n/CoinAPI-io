## CoinAPI v2 for JavaScript

Fully rewrited library for CoinAPI.io on JavaScript. [Documentation for API](https://ivan-istomin.github.io/CoinAPI-io/).
Get free API key [here](https://www.coinapi.io/pricing?apikey).

[![NPM](https://nodei.co/npm/coinapi-io.png?downloads=true)](https://nodei.co/npm/coinapi-io/)

#### Install

```sh
~$ npm install coinapi-io --save
# or
~$ yarn add coinapi-io --save
```

#### Example

```js
import CoinAPI from 'coinapi-io';
import {subHours} from 'date-fns';

// Init instance from your API
let coinapi = new CoinAPI('73034021-0EBC-493D-8A00-E0F138111F41');

// Get candlesticks for last 5 hours 
let last_5_hrs = await coinapi.ohlcv_historic_data('POLONIEX_SPOT_ZRX_BTC', '1HRS', subHours(new Date(), 6), new Date());

console.log(last_5_hrs); // => Array<Candlestick>
```