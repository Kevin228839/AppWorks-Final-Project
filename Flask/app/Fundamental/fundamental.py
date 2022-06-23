import app.framework as fw
from flask import request

def fundamentalCal ():
  stockNumber = request.json['stockNo']
  stock=fw.loadData(stockNumber)
  describe = stock['Close'].describe()
  return describe.to_json(orient="columns")