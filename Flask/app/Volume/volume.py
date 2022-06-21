from numpy import roll
import app.Volume.strategy as volumestrategy
import app.framework as fw

def volumeCal():
  stock = fw.loadData()
  rollingDay=5
  shiftDay=10
  stock = volumestrategy.volume(rollingDay,shiftDay,stock)
  stock_json = stock.to_json(orient="columns")
  return stock_json