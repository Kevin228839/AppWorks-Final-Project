from flask import Flask
from app.MovingAverage.ma import maCal
from app.RSI.rsi import rsiCal
from app.Volume.volume import volumeCal
from app.General.general import generalCal
from app.Fundamental.fundamental import fundamentalCal
from app.Mask.mask import maskCal

def createApp ():
  app = Flask(__name__)
  app.add_url_rule('/api/v1/general','general',generalCal)
  app.add_url_rule('/api/v1/strategy/ma','movingaverage', maCal)
  app.add_url_rule('/api/v1/strategy/rsi','rsi', rsiCal)
  app.add_url_rule('/api/v1/strategy/volume','volume',volumeCal)
  app.add_url_rule('/api/v1/fundamental','fundamental',fundamentalCal)
  app.add_url_rule('/api/v1/mask','mask',maskCal)
  return app