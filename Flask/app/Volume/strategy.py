import pandas as pd
import numpy as np

#計算成交量策略
def volume(rollingDay,shiftDay,df):
    df['ma']=df.iloc[:,1].rolling(rollingDay).mean()
    df['mav']=df.iloc[:,2].rolling(rollingDay).mean()
    df['volume_sign']=0
    df['volume_sign'][(df['mav']>df['mav'].shift(shiftDay)*1.3) & (df['ma']>df['ma'].shift(shiftDay))]=-1
    df['volume_sign'][(df['mav']>df['mav'].shift(shiftDay)*1.3) & (df['ma']<df['ma'].shift(shiftDay))]=1
    return df