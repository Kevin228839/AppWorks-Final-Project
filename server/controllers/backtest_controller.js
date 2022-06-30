const axios = require('axios');
const backtestModel = require('../models/backtest_model');

const getStockData = async (req, res, next) => {
  try {
    const stockNo = req.query.stockNo;
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

const getFundamental = async (req, res, next) => {
  try {
    const stockNo = req.query.stockNo;
    const response = await axios({
      method: 'get',
      url: 'http://localhost:5000/api/v1/fundamental',
      data: { stockNo },
      headers: { 'Content-Type': 'application/json' }
    }); const data = response.data;
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getBacktestResult = async (req, res, next) => {
  try {
    const strategyArgs = req.body.strategyArgs;
    const strategy = req.query.strategy;
    const stockNo = req.query.stockNo;
    const response = await axios({
      method: 'get',
      url: `http://localhost:5000/api/v1/strategy/${strategy}`,
      data: { stockNo, strategyArgs },
      headers: { 'Content-Type': 'application/json' }
    });
    const data = response.data;
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getStrategyArgs = async (req, res, next) => {
  try {
    const strategy = req.query.strategy;
    const response = await backtestModel.getStrategyArgs(strategy);
    let strategyArgs = JSON.parse(response[0].strategy_args);
    strategyArgs = strategyArgs.split(',');
    res.status(200).json({ response: strategyArgs });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getMaskResult = async (req, res, next) => {
  try {
    const stockNo = req.query.stockNo;
    const kind = req.query.kind;
    const threshold = req.query.threshold;
    const situation = req.query.situation;
    const response = await axios({
      method: 'get',
      url: 'http://localhost:5000/api/v1/mask',
      data: { stockNo, kind, threshold, situation },
      headers: { 'Content-Type': 'application/json' }
    });
    const data = response.data;
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAllStrategy = async (req, res, next) => {
  try {
    const response = await backtestModel.getAllStrategy();
    for (let i = 0; i < response.length; i++) {
      response[i].strategy_args = JSON.parse(response[i].strategy_args).split(',');
    }
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAllMask = async (req, res, next) => {
  try {
    const response = await backtestModel.getAllMask();
    for (let i = 0; i < response.length; i++) {
      response[i].mask_args = JSON.parse(response[i].mask_args).split(',');
    }
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    next(err);
  };
};

module.exports = {
  getBacktestResult,
  getStockData,
  getFundamental,
  getStrategyArgs,
  getMaskResult,
  getAllStrategy,
  getAllMask
};
