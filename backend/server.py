import flask
from flask import jsonify, request
from flask_cors import CORS

import psycopg2


app = flask.Flask(__name__)
CORS(app)


# database connection
def get_database():
    return psycopg2.connect(
                database = 'minor_project_database',
                user = 'postgres',
                password = 'postgresql@12345',
                host = 'localhost',
                port = '5432'
            )


@app.route('/', methods=['POST'])
def post_register_data():
    if request.is_json:
        data = request.get_json()
        print(data)

        firstname = data.get('firstname')
        lastname = data.get('lastname')
        email = data.get('email')
        password = data.get('password')
        confirmPassword = data.get('confirmPassword')

        # connecting to the database
        connection = get_database()
        print('connection established successfully!!')

        # creating a cursor
        cursor = connection.cursor()




        # executing the sql queries

        cursor.execute("""
            SELECT EXISTS (
                SELECT 1 
                FROM information_schema.tables 
                WHERE table_name = 'useraccount'
            )
        """)
        table_exists = cursor.fetchone()[0]


        # creating the table
        if not table_exists:
            cursor.execute(
            """
                CREATE TABLE UserAccount(
                   user_id SERIAL PRIMARY KEY,
                    firstname varchar(50) NOT NULL,
                    lastname varchar(50) NOT NULL,
                    email varchar(100) NOT NULL UNIQUE,
                    password varchar(50) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    last_login TIMESTAMP

                )
            """
            )
            print("The table is creted successfully!! ")

        # inserting the values
        cursor.execute(''' 
            INSERT INTO UserAccount(firstname, lastname, email, password)
                       VALUES(%s,%s,%s,%s)
        ''', (firstname, lastname, email, password))

        # commit the changes
        connection.commit()
        cursor.close()
        connection.close()
        print('Value is inserted')

    return jsonify(data)


@app.route("/post_login_data", methods=["POST"])
def post_login_data():
    if request.is_json:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        # Connect to the database
        connection = get_database()
        cursor = connection.cursor()

        # Query the database to check if the email exists
        cursor.execute(
        """ 
            SELECT * FROM UserAccount WHERE email = %s
        """,
            (email,),
        )

        user = cursor.fetchone()
        print(user)

        # If the user exists
        if user: 
            # Check if the password matches
            stored_password = user[
                4
            ]  # Assuming the password is at index 4 in the result
            if password == stored_password:
                firstname = user[1]
                return jsonify({"message": "Login successful","name":firstname})
            else:
                return jsonify({"message": "Invalid credentials"}), 401
        else:
            return jsonify({"message": "User not found"}), 404

    return jsonify({"message": "Invalid request"}), 400


@app.route("/post_userinput", methods=["POST"])
def post_userinput():
    if request.is_json:
        data = request.get_json()
        user_input = data.get("input")

        print(f'The user input is: {user_input}')

        response = {
            'user_input':f'{user_input}'
        }

        return jsonify(response)


# Run the Flask app
if __name__ == '__main__':
    app.run(debug = True)
