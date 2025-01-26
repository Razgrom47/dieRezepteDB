import json, sqlite3, os
from flask import Flask, jsonify, request, make_response, session
import jwt  #python 3.6 or later
from datetime import timedelta, datetime
from functools import wraps    
from flask_cors import CORS
import uuid
my_secret = uuid.uuid4().hex
print("MY SERVER SECRET: ", my_secret)

app = Flask(__name__)
app.config["SECRET_KEY"] = my_secret

CORS(app, origins=["*"])

cwd = (os.path.abspath(os.getcwd()))
cwd = cwd + r"\backend" 
#--- SQLite DataBase
if os.path.exists(cwd+r"\themealdb\myDB.db") == False:
    with open(cwd+r"\themealdb\myDB.db", "w") as file:
        pass
with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
    try:
        print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
        #print(conn.execute("SELECT * FROM MEALS").fetchall())
    except sqlite3.OperationalError as e:
        print("Failed to open database:", e)
    except Exception as err:
        print(f"ERROR: {err}")

# Token validation decorator
def token_required(func):
    @wraps(func)    
    def decorated(*argx, **kwargs):
        token = request.authorization.token
        if not token:
            return jsonify({"Alert!": "Token is missing."}), 403  # Provide a response with an error status code
        try:
            payload = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        except Exception as err:
            print(err)
            return jsonify({"Alert!": "Invalid token."}), 403  # Provide a response with an error status code
        return func(*argx, **kwargs)  # Call the decorated function
    return decorated


@app.route("/login", methods=["POST"])
def login():
    if True:
        session['logged_in'] = True
        token = jwt.encode(
            {
                "user":"John Doe",
                "expiration":str(datetime.utcnow() + timedelta(minutes=10))
            }, 
            app.config["SECRET_KEY"])
        return jsonify({"token": token})
    else:
        return make_response("Unable to verify", 403, {'WWW-Authenicate:':'Basic realm:"Authenication Failed!"'})

# Getting all meals
@app.route('/meals/', methods=["GET"])
@token_required
def meals():
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                conn.row_factory = sqlite3.Row
                all_meals=[dict(row) for row in conn.cursor().execute("SELECT * FROM MEALS").fetchall()]
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        return jsonify({"meals":all_meals}) 
    except:
        return jsonify({"error":"data not found"})

# Filter meals by ID
@app.route('/meals/id/<id>', methods=["GET"])
def mealById(id):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                conn.row_factory = sqlite3.Row
                all_meals=[dict(row) for row in conn.execute("SELECT * FROM MEALS").fetchall()]
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            for meal in all_meals:
                if int(meal["idMeal"]) == int(id):
                    return jsonify({"meal":meal})
        except:
            return jsonify({"meals":"null"})
    except:
        return jsonify({"error":"data not found"})

# Filter meals by Name
@app.route('/meals/name/<name>', methods=["GET"])
def mealByName(name):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                conn.row_factory = sqlite3.Row
                all_meals=[dict(row) for row in conn.execute("SELECT * FROM MEALS").fetchall()]
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            filtered = []
            for meal in all_meals:
                if name.lower() in meal["strMeal"].lower():
                    filtered.append(meal)
            return jsonify({"meals":{"filtered":filtered}})
        except:
            return jsonify({"meals":"null"})
    except:
        return jsonify({"error":"data not found"})

# Filter meals by Ingredient
@app.route('/meals/ingredient/<ingr>', methods=["GET"])
def mealByIngredient(ingr):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                conn.row_factory = sqlite3.Row
                all_meals=[dict(row) for row in conn.execute("SELECT * FROM MEALS").fetchall()]
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            filtered = []
            for meal in all_meals:
                for existingIngredient in [
                    meal["strIngredient1"], 
                    meal["strIngredient2"], 
                    meal["strIngredient3"], 
                    meal["strIngredient4"],
                    meal["strIngredient5"],
                    meal["strIngredient6"],
                    meal["strIngredient7"],
                    meal["strIngredient8"],
                    meal["strIngredient9"],
                    meal["strIngredient10"],
                    meal["strIngredient11"],
                    meal["strIngredient12"],
                    meal["strIngredient13"],
                    meal["strIngredient14"],
                    meal["strIngredient15"],
                    meal["strIngredient16"],
                    meal["strIngredient17"],
                    meal["strIngredient18"],
                    meal["strIngredient19"],
                    meal["strIngredient20"],
                    ]:
                    
                    if ingr.lower() in existingIngredient.lower():
                        filtered.append(meal)
            return jsonify({"meals":{"filtered":filtered}})
        except:
            return jsonify({"meals":"null"})
    except:
        return jsonify({"error":"data not found"})

# Filter meals by Area
@app.route('/meals/area/<area>', methods=["GET"])
def mealByArea(area):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                conn.row_factory = sqlite3.Row
                all_meals=[dict(row) for row in conn.execute("SELECT * FROM MEALS").fetchall()]
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            filtered = []
            for meal in all_meals:
                if area.lower() in meal["strArea"].lower():
                    filtered.append(meal)
            return jsonify({"meals":{"filtered":filtered}})
        except:
            return jsonify({"meals":"null"})
    except:
        return jsonify({"error":"data not found"})

# Filter meals by Category
@app.route('/meals/category/<category>', methods=["GET"])
def mealByCategory(category):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                conn.row_factory = sqlite3.Row
                all_meals=[dict(row) for row in conn.execute("SELECT * FROM MEALS").fetchall()]
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            filtered = []
            for meal in all_meals:
                if category.lower() in meal["strCategory"].lower():
                    filtered.append(meal)
            return jsonify({"meals":{"filtered":filtered}})
        except:
            return jsonify({"meals":"null"})
    except:
        return jsonify({"error":"data not found"})

# Filter meals by Tag
@app.route('/meals/tag/<tag>', methods=["GET"])
def mealByTag(tag):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                conn.row_factory = sqlite3.Row
                all_meals=[dict(row) for row in conn.execute("SELECT * FROM MEALS").fetchall()]
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            filtered = []
            for meal in all_meals:
                if tag.lower() in meal["strTags"].lower():
                    filtered.append(meal)
            return jsonify({"meals":{"filtered":filtered}})
        except:
            return jsonify({"meals":"null"})
    except:
        return jsonify({"error":"data not found"})
    
# Get all Ingredients
@app.route('/ingredients/', methods=["GET"])
def ingredients():
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                conn.row_factory = sqlite3.Row
                all_ingredients=[dict(row) for row in conn.execute("SELECT * FROM INGREDIENTS").fetchall()]
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            return jsonify({"ingredients":all_ingredients})
        except:
            return jsonify({"ingredients":"null"})
    except:
        return jsonify({"error":"data not found"})

# Filter Ingredients by id
@app.route('/ingredients/id/<ingr>', methods=["GET"])
def ingredientsById(ingr):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                conn.row_factory = sqlite3.Row
                all_ingredients=[dict(row) for row in conn.execute("SELECT * FROM INGREDIENTS").fetchall()]
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            for ing in all_ingredients:
                if int(ingr) == int(ing["idIngredient"]): 
                    return jsonify({"ingredients":ing})
        except:
            return jsonify({"ingredients":"null"})
    except:
        return jsonify({"error":"data not found"})
    
# Filter Ingredients by name
@app.route('/ingredients/name/<ingr>', methods=["GET"])
def ingredientsByName(ingr):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                conn.row_factory = sqlite3.Row
                all_ingredients=[dict(row) for row in conn.execute("SELECT * FROM INGREDIENTS").fetchall()]
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            filtered = []
            for ing in all_ingredients:
                if ingr.lower() in ing["strIngredient"].lower(): 
                    filtered.append(ing)
            return jsonify({"ingredients":{"filtered":filtered}})
        except:
            return jsonify({"ingredients":"null"})
    except:
        return jsonify({"error":"data not found"})

# Filter Ingredients by Tags
@app.route('/ingredients/tag/<ingr>', methods=["GET"])
def ingredientsByTags(ingr):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                conn.row_factory = sqlite3.Row
                all_ingredients=[dict(row) for row in conn.execute("SELECT * FROM INGREDIENTS").fetchall()]
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            filtered = []
            for ing in all_ingredients:
                if ingr.lower() in ing["strType"].lower(): 
                    filtered.append(ing)
            return jsonify({"ingredients":{"filtered":filtered}})
        except:
            return jsonify({"ingredients":"null"})
    except:
        return jsonify({"error":"data not found"})
    
if __name__ == "__main__":    
    app.run(debug=True, port=7700, host="0.0.0.0")