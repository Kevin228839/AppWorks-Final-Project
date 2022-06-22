import pandas as pd
import numpy as np

def AccumulateReturn (df):
  df['AR'] = ((df['Close']-df['Close'][0])/df['Close'][0])*100
  return df