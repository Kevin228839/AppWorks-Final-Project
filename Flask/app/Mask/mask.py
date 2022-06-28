import app.LoadData as fw
from flask import request
import app.Mask.utils as utils

def maskCal():
  stockNumber = request.json['stockNo']
  kind = request.json['kind']
  threshold = request.json['threshold']
  situation = request.json['situation']
  stock = fw.loadData(stockNumber)
  if(kind == 'price'):
    utils.priceMask(stock, threshold, situation)
  elif(kind == 'volume'):
    utils.volumeMask(stock, threshold, situation)
  elif(kind == 'amplitude'):
    utils.amplitudeMask(stock, threshold, situation)
  elif(kind == 'date'):
    utils.dateMask(stock, threshold, situation)
  stock_json = stock.to_json(orient="columns")
  return stock_json
