from numpy import roll
import app.Volume.strategy as volumestrategy
import app.LoadData as fw
from flask import request

def volumeCal():
  stockNumber = request.json['stockNo']
  strategyArgs = request.json['strategyArgs']  
  stock = fw.loadData(stockNumber)
  if(strategyArgs == {}):
    rollingDay=5
    shiftDay=10
  else:
    rollingDay=int(strategyArgs['rollingDay'])
    shiftDay=int(strategyArgs['shiftDay'])
  stock = volumestrategy.volume(rollingDay,shiftDay,stock)
  stock_json = stock.to_json(orient="columns")
  return stock_json