import pandas as pd
import numpy as np
from datetime import datetime

def priceMask(df, threshold, situation):
  df['Mask']=0
  if(situation == 'greater than'):
    df['Mask'][df['Close']>=float(threshold)]=1
  else:
    df['Mask'][df['Close']<float(threshold)]=1
  return df

def volumeMask(df, threshold, situation):
  df['Mask']=0
  if(situation == 'greater than'):
    df['Mask'][df['Volume']>=float(threshold)]=1
  else:
    df['Mask'][df['Volume']<float(threshold)]=1
  return df

def amplitudeMask(df, threshold, situation):
  df['Return'] = round((df['Close'] - df['Close'].shift(1))/df['Close'].shift(1)*100,3)
  df['Mask'] = 0
  if(situation == 'greater than'):
    df['Mask'][df['Return']>=float(threshold)]=1
  else:
    df['Mask'][df['Return']<float(threshold)]=1
  return df

def dateMask(df, threshold, situation):
  df['Mask']=0 
  if(situation == 'greater than'):
    for i in range(len(df)):
      if(datetime.strptime(df['Date'][i], "%Y/%m/%d")>=datetime.strptime(threshold, "%Y/%m/%d")):
        df['Mask'][i]=1
  else:
    for i in range(len(df)):
      if(datetime.strptime(df['Date'][i], "%Y/%m/%d")<datetime.strptime(threshold, "%Y/%m/%d")):
        df['Mask'][i]=1
  return df
