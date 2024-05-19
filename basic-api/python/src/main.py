from flask import Flask, render_template, request
import os

app = Flask(__name__)
app.template_folder = os.path.abspath('templates')
app.static_folder = os.path.abspath('static')


@app.route('/')
def index():
    print(request)
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
