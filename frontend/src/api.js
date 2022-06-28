const api = {
  hostname: 'localhost:8000',
  signup (name, email, password) {
    return fetch(`http://${this.hostname}/api/v1/signup`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  },
  signin (email, password) {
    return fetch(`http://${this.hostname}/api/v1/signin`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  },
  getProfile (Jwt) {
    return fetch(`http://${this.hostname}/api/v1/profile`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Jwt}`
      })
    });
  },
  postDiscussionContent (Jwt, content) {
    return fetch(`http://${this.hostname}/api/v1/discussion`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Jwt}`
      })
    });
  },
  getDiscussionContent (page) {
    return fetch(`http://${this.hostname}/api/v1/discussion?paging=${page}`);
  },
  getStockData (stockNumber) {
    return fetch(`http://${this.hostname}/api/v1/backtest/stockdata?stockNo=${stockNumber}`);
  },
  getFundamental (stockNumber) {
    return fetch(`http://${this.hostname}/api/v1/backtest/fundamental?stockNo=${stockNumber}`);
  },
  getBacktest (stockNumber, strategy, strategyArgs) {
    return fetch(`http://${this.hostname}/api/v1/backtest/technical?stockNo=${stockNumber}&strategy=${strategy}`, {
      method: 'POST',
      body: JSON.stringify({ strategyArgs }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  },
  getStrategyArgs (strategy) {
    return fetch(`http://${this.hostname}/api/v1/backtest/getstrategyargs?strategy=${strategy}`);
  },
  getAllStrategy () {
    return fetch(`http://${this.hostname}/api/v1/backtest/getallstrategy`);
  },
  getAllMask () {
    return fetch(`http://${this.hostname}/api/v1/backtest/getallmask`);
  }
};

export default api;
