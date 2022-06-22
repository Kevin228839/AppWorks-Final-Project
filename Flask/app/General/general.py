import app.General.util as util
import app.framework as fw
from flask import request

def generalCal():
  stockNumber = request.json['stockNo']
  stock = fw.loadData(stockNumber)
  stock = util.AccumulateReturn(stock)
  stock_json = stock.to_json(orient="columns")
  return stock_json