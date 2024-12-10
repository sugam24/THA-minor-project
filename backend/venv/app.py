import flask
import json
from flask import jsonify
from flask import request

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/post_data', methods= ['POST'])
def post_data():
    data = request.get_json()
    print(data)
    return jsonify(data), 200

app.run()

