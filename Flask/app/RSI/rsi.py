import app.RSI.strategy as rsistrategy
import app.framework as fw
from flask import request

def rsiCal():
  stockNumber = request.json['stockNo']
  stock = fw.loadData(stockNumber)
  day=10
  high=70
  low=30
  stock = rsistrategy.Rsi(day,high,low,stock)
  stock_json = stock.to_json(orient="columns")
  return stock_json