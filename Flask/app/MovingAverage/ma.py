import app.MovingAverage.strategy as mastrategy
import app.framework as fw

def maCal():
  stock = fw.loadData()
  s=5
  l=20
  stock = mastrategy.Ma(s,l,stock)
  stock_json = stock.to_json(orient="columns")
  return stock_json
