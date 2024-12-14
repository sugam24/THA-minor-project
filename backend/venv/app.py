import flask
import json
from flask import jsonify
from flask import request
from flask_cors import CORS
import database_con as db

#database connection
print("connected to the database")

cursor = db.connection.cursor()

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

@app.route('/api/post_data', methods= ['POST'])
def post_data():
    data = request.get_json()

    #extract information
    first_name = data.get('firstname')
    last_name = data.get('lastname')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')
    print(first_name, last_name, email, password, confirm_password)

    create_register_table = '''
        CREATE TABLE if not exists Register(
            id SERIAL PRIMARY KEY,
            first_name varchar(50),
            last_name varchar(50),
            email varchar(70),
            password varchar(50),
            confirm_password varchar(50)
        );
    '''
    cursor.execute(create_register_table)

    insert_into_register = '''
        Insert into Register(first_name, last_name, email, password, confirm_password) 
        VALUES(%s, %s, %s, %s, %s);
    '''
    cursor.execute(insert_into_register, (first_name, last_name, email, password, confirm_password))
    db.connection.commit()
    return jsonify(data), 200

# @app.route('/get_data', methods=['GET'])
# def get_data():


app.run()
db.connection.close()

