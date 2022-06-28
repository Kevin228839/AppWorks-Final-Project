const express = require('express');
const router = express.Router();
const backtestController = require('../controllers/backtest_controller');

router.get('/api/v1/backtest/stockdata', backtestController.getStockData);
router.post('/api/v1/backtest/technical', backtestController.getBacktestResult);
router.get('/api/v1/backtest/fundamental', backtestController.getFundamental);
router.get('/api/v1/backtest/getstrategyargs', backtestController.getStrategyArgs);
router.get('/api/v1/backtest/getmask', backtestController.getMaskResult);
router.get('/api/v1/backtest/getallstrategy', backtestController.getAllStrategy);
router.get('/api/v1/backtest/getallmask', backtestController.getAllMask);

module.exports = router;
