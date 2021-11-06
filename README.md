# LQ45 Stocks REST API

http://lq45api.herokuapp.com/

A REST API that shows historical price data of all LQ45 stocks. The historical price data is obtained by the combination web scraping and yfinance library.

## Endpoints

- [/api/stocklist](http://lq45api.herokuapp.com/api/stocklist)
  > LQ45 stock list
- [/api/:stock](http://lq45api.herokuapp.com/api/bbca)
  > Historical data of a stock
- [/api/:stock/:specificData](http://lq45api.herokuapp.com/api/BBNI/adjusted_close)
  > Specific historical data of a stock
