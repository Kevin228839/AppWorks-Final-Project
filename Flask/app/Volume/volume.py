from numpy import roll
import app.Volume.strategy as volumestrategy
import app.framework as fw
from flask import request

def volumeCal():
  stockNumber = request.json['stockNo']
  stock = fw.loadData(stockNumber)
  rollingDay=5
  shiftDay=10
  stock = volumestrategy.volume(rollingDay,shiftDay,stock)
  stock_json = stock.to_json(orient="columns")
  return stock_json