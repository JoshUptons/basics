import requests, json


def get(url, params={}, password='password'):
    r = requests.get(url, params=params, auth=('user', password))
    return r.json()
