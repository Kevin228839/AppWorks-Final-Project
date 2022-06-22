import pandas as pd

def loadData(stockNumber):
  df=pd.read_csv(f'{stockNumber}.csv')
  return df