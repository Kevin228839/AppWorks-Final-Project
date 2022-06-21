import pandas as pd
import numpy as np

def Ma(s,l,df):
    df['ma_s']=df.iloc[:,1].rolling(s).mean()
    df['ma_l']=df.iloc[:,1].rolling(l).mean()
    df['ma_sign']=0
    df['ma_sign'][(df['ma_s'].shift(1)<df['ma_l'].shift(1)) & (df['ma_s']>df['ma_l'])]=1 #黃金交叉
    df['ma_sign'][(df['ma_s'].shift(1)>df['ma_l'].shift(1)) & (df['ma_s']<df['ma_l'])]=-1 #死亡交叉
    return df
