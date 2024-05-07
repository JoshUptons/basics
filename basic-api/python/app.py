from flask import Flask, render_template
from flask_cors import CORS
import os, json

app = Flask(__name__)
CORS(app, origins='*', methods=['GET', 'POST'], allow_headers=['Content-Type', 'Content-Length'])
app.template_folder = os.path.abspath('templates')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/template')
def template():
    # variables can be passed to render_template to populate the html template file
    # anything between double brackets {{ }} is treated as a variable input
    return render_template('app.html', name="<Your Name>")

@app.route('/ping')
def ping():
    return json.dumps({ 'message': 'pong\n'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='3000', debug=True)