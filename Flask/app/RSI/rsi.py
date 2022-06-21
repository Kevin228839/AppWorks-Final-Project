import app.RSI.strategy as rsistrategy
import app.framework as fw
from flask import make_response

def rsiCal():
  stock = fw.loadData()
  day=10
  high=70
  low=30
  stock = rsistrategy.Rsi(day,high,low,stock)
  stock_json = stock.to_json(orient="columns")
  return make_response(stock_json,200)