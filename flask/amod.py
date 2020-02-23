from flask import Flask, render_template, url_for, request, redirect, send_file

from datetime import datetime
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import collections
import scipy
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
import statsmodels.api as sm
import io
from io import BytesIO


app = Flask(__name__)







@app.route('/computer', methods=['GET', 'POST'])
def update():
        df=pd.DataFrame()
        data=pd.read_excel("C:\\Users\\Mahesh\\Desktop\\djhac\\computer.xlsx")#reading data
        data.head()
        X=data['year'].values.reshape(-1,1)
        y=data['placement'].values.reshape(-1,1)
        reg=LinearRegression()
        reg.fit(X,y)
        print("the linear model is:Y={:.5}X+{:.5}".format(reg.coef_[0][0],reg.intercept_[0]))
        predictions=reg.predict(X)
        plt.figure(figsize=(16,8))
        plt.scatter(data['year'],data['placement'],c='black')
        plt.plot(data['year'],predictions,c='red',linewidth=3)
        plt.xlabel("YEARS")
        plt.ylabel("placement (OUT OF 120)")
        img = BytesIO()
        plt.savefig(img)
        img.seek(0)
        return send_file(img, mimetype='image/png')

@app.route('/it', methods=['GET', 'POST'])
def update1():
        df=pd.DataFrame()
        data=pd.read_excel("C:\\Users\\Mahesh\\Desktop\\djhac\\it.xlsx")#reading data
        data.head()
        X=data['year'].values.reshape(-1,1)
        y=data['placement'].values.reshape(-1,1)
        reg=LinearRegression()
        reg.fit(X,y)
        print("the linear model is:Y={:.5}X+{:.5}".format(reg.coef_[0][0],reg.intercept_[0]))
        predictions=reg.predict(X)
        plt.figure(figsize=(16,8))
        plt.scatter(data['year'],data['placement'],c='black')
        plt.plot(data['year'],predictions,c='red',linewidth=3)
        plt.xlabel("YEARS")
        plt.ylabel("placement (OUT OF 120)")
        img1 = BytesIO()
        plt.savefig(img1)
        img1.seek(0)
        return send_file(img1, mimetype='image/png')



@app.route('/electronics', methods=['GET', 'POST'])
def update2():
        df=pd.DataFrame()
        data=pd.read_excel("C:\\Users\\Mahesh\\Desktop\\djhac\\elex.xlsx")#reading data
        data.head()
        X=data['year'].values.reshape(-1,1)
        y=data['placement'].values.reshape(-1,1)
        reg=LinearRegression()
        print(data)
        reg.fit(X,y)
        print("the linear model is:Y={:.5}X+{:.5}".format(reg.coef_[0][0],reg.intercept_[0]))
        predictions=reg.predict(X)
        plt.figure(figsize=(16,8))
        plt.scatter(data['year'],data['placement'],c='black')
        plt.plot(data['year'],predictions,c='red',linewidth=3)
        plt.xlabel("YEARS")
        plt.ylabel("placement (OUT OF 120)")
        img2 = BytesIO()
        plt.savefig(img2)
        img2.seek(0)
        return send_file(img2, mimetype='image/png')



if __name__ == "__main__":
    app.run(debug=True)