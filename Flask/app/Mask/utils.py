import pandas as pd
import numpy as np
from datetime import datetime

def priceMask(df, threshold, situation):
  df['priceMask']=0
  if(situation == 'greater'):
    df['priceMask'][df['Close']>=float(threshold)]=1
  else:
    df['priceMask'][df['Close']<float(threshold)]=1
  return df

def volumeMask(df, threshold, situation):
  df['volumeMask']=0
  if(situation == 'greater'):
    df['volumeMask'][df['Volume']>=float(threshold)]=1
  else:
    df['volumeMask'][df['Volume']<float(threshold)]=1
  return df

def amplitudeMask(df, threshold, situation):
  df['Return'] = round((df['Close'] - df['Close'].shift(1))/df['Close'].shift(1)*100,3)
  df['amplitudeMask'] = 0
  if(situation == 'greater'):
    df['amplitudeMask'][df['Return']>=float(threshold)]=1
  else:
    df['amplitudeMask'][df['Return']<float(threshold)]=1
  return df

def dateMask(df, threshold, situation):
  df['dateMask']=0 
  if(situation == 'greater'):
    for i in range(len(df)):
      if(datetime.strptime(df['Date'][i], "%Y/%m/%d")>=datetime.strptime(threshold, "%Y/%m/%d")):
        df['dateMask'][i]=1
  else:
    for i in range(len(df)):
      if(datetime.strptime(df['Date'][i], "%Y/%m/%d")<datetime.strptime(threshold, "%Y/%m/%d")):
        df['dateMask'][i]=1
  return df
