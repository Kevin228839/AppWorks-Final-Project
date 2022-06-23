import app.MovingAverage.strategy as mastrategy
import app.framework as fw
from flask import request

def maCal():
  stockNumber = request.json['stockNo']
  stock = fw.loadData(stockNumber)
  s=5
  l=20
  stock = mastrategy.Ma(s,l,stock)
  stock_json = stock.to_json(orient="columns")
  return stock_json
