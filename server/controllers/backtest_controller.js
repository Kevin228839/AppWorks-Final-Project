const axios = require('axios');

const getStockData = async (req, res, next) => {
  try {
    const stockNo = req.query.stockNo;
    console.log(stockNo);
    const response = await axios({
      method: 'get',
      url: 'http://localhost:5000/api/v1/general',
      data: { stockNo },
      headers: { 'Content-Type': 'application/json' }
    });
    const data = response.data;
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getBacktestResult = async (req, res, next) => {
  try {
    const strategy = req.query.strategy;
    const response = await axios.get(`http://localhost:5000/api/v1/strategy/${strategy}`);
    const data = response.data;
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  getBacktestResult,
  getStockData
};
