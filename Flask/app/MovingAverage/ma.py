import app.MovingAverage.strategy as mastrategy
import app.LoadData as fw
from flask import request

def maCal():
  stockNumber = request.json['stockNo']
  strategyArgs = request.json['strategyArgs']  
  stock = fw.loadData(stockNumber)
  if(strategyArgs == {}):
    short=5
    long=20
  else:
    short=int(strategyArgs['short'])
    long=int(strategyArgs['long'])
  stock = mastrategy.Ma(short,long,stock)
  stock_json = stock.to_json(orient="columns")
  return stock_json
