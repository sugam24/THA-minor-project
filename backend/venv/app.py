import flask
import json
from flask import jsonify
from flask import request
from flask_cors import CORS

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

@app.route('/api/post_data', methods= ['POST'])
def post_data():
    data = request.get_json()
    print(data)
    return jsonify(data), 200

# @app.route('/get_data', methods=['GET'])
# def get_data():


app.run()

