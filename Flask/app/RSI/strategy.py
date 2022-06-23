import pandas as pd
import numpy as np

#計算rsi
def Rsi(day,high,low,df):
    x=df.iloc[:,1].diff()
    df['rsi']=100*x.where(x>0,0).rolling(day).mean()/x.where(x>0,-x).rolling(day).mean() #計算rsi
    df['sign']=0
    df['sign'][(df['rsi']<low)]=1
    df['sign'][(df['rsi']>high)]=-1
    return df