import flask
import json
from flask import jsonify, request
from flask_cors import CORS
import database_con as db

# Database connection
print("Connected to the database")
cursor = db.connection.cursor()

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

@app.route('/api/post_data', methods=['POST'])
def post_data():
    data = request.get_json()

    first_name = data.get('firstname')
    last_name = data.get('lastname')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')
    print(first_name, last_name, email, password, confirm_password)

    # Create table if not exists
    create_register_table = '''
        CREATE TABLE IF NOT EXISTS Register(
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(50),
            last_name VARCHAR(50),
            email VARCHAR(70),
            password VARCHAR(50),
            confirm_password VARCHAR(50)
        );
    '''
    cursor.execute(create_register_table)

    # Insert data into the Register table
    insert_into_register = '''
        INSERT INTO Register(first_name, last_name, email, password, confirm_password) 
        VALUES(%s, %s, %s, %s, %s);
    '''
    cursor.execute(insert_into_register, (first_name, last_name, email, password, confirm_password))
    db.connection.commit()

    return jsonify(data), 200

@app.route('/api/get_data/<int:id>', methods=['GET'])
def get_data(id):
    # Fetch data from the database using the ID
    cursor.execute('SELECT * FROM Register WHERE id = %s', (id,))
    user_data = cursor.fetchone()

    if user_data:
        # Return the user data as JSON
        return jsonify({
            'id': user_data[0],
            'first_name': user_data[1],
            'last_name': user_data[2],
            'email': user_data[3],
            'password': user_data[4],  
            'confirm_password': user_data[5]
        }), 200
    else:
        # If the ID is not found
        return jsonify({'message': 'User not found'}), 404

# Run the Flask app
if __name__ == '__main__':
    app.run()

# Close the database connection after the server stops
db.connection.close()
