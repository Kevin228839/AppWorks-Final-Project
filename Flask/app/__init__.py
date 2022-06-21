from flask import Flask
from app.MovingAverage.ma import maCal
from app.RSI.rsi import rsiCal
from app.Volume.volume import volumeCal

def createApp ():
  app = Flask(__name__)
  app.add_url_rule('/api/v1/strategy/movingaverage','movingaverage', maCal)
  app.add_url_rule('/api/v1/strategy/rsi','rsi', rsiCal)
  app.add_url_rule('/api/v1/strategy/volume','volume',volumeCal)
  return app