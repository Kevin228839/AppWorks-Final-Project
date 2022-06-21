const axios = require('axios');

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
  getBacktestResult
};
