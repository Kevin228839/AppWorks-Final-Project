import app.RSI.strategy as rsistrategy
import app.LoadData as fw
from flask import request

def rsiCal():
  stockNumber = request.json['stockNo']
  strategyArgs = request.json['strategyArgs']  
  stock = fw.loadData(stockNumber)
  if(strategyArgs == {}):
    range=10
    high=70
    low=30
  else:
    range=int(strategyArgs['range'])
    high=int(strategyArgs['high'])
    low=int(strategyArgs['low'])
  stock = rsistrategy.Rsi(range,high,low,stock)
  print(stock)
  stock_json = stock.to_json(orient="columns")
  return stock_json