import json, sqlite3, os, uuid, random, jwt
from flask import Flask, jsonify, request, make_response, session
from datetime import timedelta, datetime
from functools import wraps    
from flask_cors import CORS
my_secret = uuid.uuid4().hex
print("MY SERVER SECRET: ", my_secret)

app = Flask(__name__)
app.config["SECRET_KEY"] = my_secret

CORS(app, origins=["*"], supports_credentials=True)

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
        try:
            token = request.authorization.token
        except:
            return jsonify({"Alert!": "Invalid token."}), 403  # Provide a response with an error status code
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
    with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
        try:
            print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
            conn.row_factory = sqlite3.Row
            all_users=[dict(row) for row in conn.cursor().execute("SELECT * FROM USERS").fetchall()]
            print(json.loads(request.data))
            for existingUser in all_users:
                if existingUser["strUser"] == json.loads(request.data)["username"] and existingUser["strPassword"] == json.loads(request.data)["password"]:
                    currentUser = existingUser
                    break
                else:
                    currentUser = None
        except sqlite3.OperationalError as e:
            return("Failed to open database:", e)
        except Exception as err:
            return(f"ERROR: {err}")
    if currentUser:
        session["logged_in"] = True
        session["userID"] = currentUser["idUser"]
        session["username"] = currentUser["strUser"]
        token = jwt.encode(
            {
                "user":currentUser["strUser"],
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
@token_required
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
                if name.lower() in meal["strMeal"].lower() and meal not in filtered:
                    filtered.append(meal)
            return jsonify({"meals":{"filtered":filtered}})
        except:
            return jsonify({"meals":"null"})
    except:
        return jsonify({"error":"data not found"})

# Filter meals by Name
@app.route('/meal/name/<name>', methods=["GET"])
def mealByOneName(name):
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
                if name.replace("%26", "&").lower() == meal["strMeal"].lower():
                    return jsonify({"meal":meal})
        except:
            return jsonify({"meals":"null"})
    except:
        return jsonify({"error":"data not found"})

# Filter meals by Ingredient
@app.route('/meals/ingredient/<ingr>', methods=["GET"])
@token_required
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
                    
                    if ingr.lower() in existingIngredient.lower() and meal not in filtered:
                        filtered.append(meal)
            return jsonify({"meals":{"filtered":filtered}})
        except:
            return jsonify({"meals":"null"})
    except:
        return jsonify({"error":"data not found"})

# Filter meals by Area
@app.route('/meals/area/<area>', methods=["GET"])
@token_required
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
                if area.lower() in meal["strArea"].lower() and meal not in filtered:
                    filtered.append(meal)
            return jsonify({"meals":{"filtered":filtered}})
        except:
            return jsonify({"meals":"null"})
    except:
        return jsonify({"error":"data not found"})

# Filter meals by Category
@app.route('/meals/category/<category>', methods=["GET"])
@token_required
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
                if category.lower() in meal["strCategory"].lower() and meal not in filtered:
                    filtered.append(meal)
            return jsonify({"meals":{"filtered":filtered}})
        except:
            return jsonify({"meals":"null"})
    except:
        return jsonify({"error":"data not found"})

# Filter meals by Tag
@app.route('/meals/tag/<tag>', methods=["GET"])
@token_required
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
                if tag.lower() in meal["strTags"].lower() and meal not in filtered:
                    filtered.append(meal)
            return jsonify({"meals":{"filtered":filtered}})
        except:
            return jsonify({"meals":"null"})
    except:
        return jsonify({"error":"data not found"})

@app.route('/meals/latests/<number>', methods=["GET"])
def mealLatests(number):
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
            for meal in all_meals[-int(number):]:
                filtered.append(meal)
            return jsonify({"meals":{"filtered":filtered}})
        except:
            return jsonify({"meals":"null"})
    except:
        return jsonify({"error":"data not found"})

@app.route('/areas', methods=["GET"])
def areas():
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
                if meal["strArea"] not in filtered:
                    filtered.append(meal["strArea"])
            return jsonify({"areas":filtered})
        except:
            return jsonify({"areas":"null"})
    except:
        return jsonify({"error":"data not found"})

# Get all Ingredients
@app.route('/ingredients/', methods=["GET"])
@token_required
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

# Filter Ingredients by id
@app.route('/ingredient/name/<name>', methods=["GET"])
def ingredientByName(name):
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
                if name.lower() == ing["strIngredient"].lower(): 
                    return jsonify({"ingredient":ing})
            return jsonify({"ingredients":"null"})
        except:
            return jsonify({"ingredients":"null"})
    except:
        return jsonify({"error":"data not found"})
    
# Filter Ingredients by name
@app.route('/ingredients/name/<ingr>', methods=["GET"])
@token_required
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
                if ingr.lower() in ing["strIngredient"].lower() and ing not in filtered: 
                    filtered.append(ing)
            return jsonify({"ingredients":{"filtered":filtered}})
        except:
            return jsonify({"ingredients":"null"})
    except:
        return jsonify({"error":"data not found"})

# Filter Ingredients by Tags
@app.route('/ingredients/tag/<ingr>', methods=["GET"])
@token_required
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
                if ingr.lower() in ing["strType"].lower() and ing not in filtered: 
                    filtered.append(ing)
            return jsonify({"ingredients":{"filtered":filtered}})
        except:
            return jsonify({"ingredients":"null"})
    except:
        return jsonify({"error":"data not found"})

@app.route('/ingredients/random/<number>', methods=["GET"])
def ingredientsRandom(number):
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
            while True:
                if all_ingredients[random.randint(0,574)] not in filtered:
                    filtered.append(all_ingredients[random.randint(0,574)])
                if len(filtered) == int(number):
                    break
            return jsonify({"ingredients":{"filtered":filtered}})
        except:
            return jsonify({"ingredients":"null"})
    except:
        return jsonify({"error":"data not found"})

@app.route("/profile")
@token_required
def getUser():
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                token=jwt.decode(request.authorization.token, app.config["SECRET_KEY"], algorithms=["HS256"])
                conn.row_factory = sqlite3.Row
                existingUser=[dict(row) for row in conn.execute("SELECT * FROM USERS WHERE strUser='"+token["user"]+"';").fetchall()][0]          
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            return jsonify({"profile":{"username":existingUser["strUser"], "country":existingUser["strCountry"]},})
        except:
            return jsonify({"user":"null"})
    except:
        return jsonify({"error":"data not found"})
    
@app.route("/profile/like/meal/<idMeal>", methods=["POST"])
@token_required
def getUserLikeMeal(idMeal):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                token=jwt.decode(request.authorization.token, app.config["SECRET_KEY"], algorithms=["HS256"])
                #print(token["user"])
                conn.row_factory = sqlite3.Row
                userId=[dict(row)["idUser"] for row in conn.execute(f"SELECT * FROM USERS WHERE strUser='"+token["user"]+"';").fetchall()][0]
                conn.execute(f"INSERT INTO FAV_MEALS (idUser, idMeal) VALUES ({int(userId)}, {int(idMeal)});")
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                print(err)
                return(jsonify({f"ERROR: {err}"}))
            try:
                return jsonify({"message":"liked successfully"})
            except:
                return jsonify({"user":"null"})
    except:
        return jsonify({"error":"data not found"})

@app.route("/profile/like/ingredient/<idIngredient>", methods=["POST"])
@token_required
def getUserLikeIngredient(idIngredient):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                token=jwt.decode(request.authorization.token, app.config["SECRET_KEY"], algorithms=["HS256"])
                #print(token["user"])
                conn.row_factory = sqlite3.Row
                userId=[dict(row)["idUser"] for row in conn.execute(f"SELECT * FROM USERS WHERE strUser='"+token["user"]+"';").fetchall()][0]
                conn.execute(f"INSERT INTO FAV_INGREDIENTS (idUser, idIngredient) VALUES ({int(userId)}, {int(idIngredient)});")
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                print(err)
                return(jsonify({f"ERROR: {err}"}))
            try:
                return jsonify({"message":"liked successfully"})
            except:
                return jsonify({"user":"null"})
    except:
        return jsonify({"error":"data not found"})

@app.route("/profile/get/meals", methods=["GET"])
@token_required
def getUserGetMeals():
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                token=jwt.decode(request.authorization.token, app.config["SECRET_KEY"], algorithms=["HS256"])
                #print(token["user"])
                conn.row_factory = sqlite3.Row
                userId=[dict(row)["idUser"] for row in conn.execute(f"SELECT * FROM USERS WHERE strUser='"+token["user"]+"';").fetchall()][0]
                users_meals = [dict(row)["idMeal"] for row in conn.execute(f"SELECT * FROM FAV_MEALS WHERE idUser={int(userId)};").fetchall()]
                all_meals = [dict(row) for row in conn.execute("SELECT * FROM MEALS;").fetchall()]
                filtered = []
                for meal in all_meals:
                    if meal["idMeal"] in users_meals:
                        filtered.append(meal)
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                print(err)
                return(jsonify({f"ERROR: {err}"}))
            try:
                return jsonify({"meals":{"filtered":filtered}})
            except:
                return jsonify({"meals":"null"})
    except:
        return jsonify({"error":"data not found"})

@app.route("/profile/get/meals/last/<nr>", methods=["GET"])
@token_required
def getUserGetMealsLast(nr):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                token=jwt.decode(request.authorization.token, app.config["SECRET_KEY"], algorithms=["HS256"])
                #print(token["user"])
                conn.row_factory = sqlite3.Row
                userId=[dict(row)["idUser"] for row in conn.execute(f"SELECT * FROM USERS WHERE strUser='"+token["user"]+"';").fetchall()][0]
                users_meals = [dict(row)["idMeal"] for row in conn.execute(f"SELECT * FROM FAV_MEALS WHERE idUser={int(userId)};").fetchall()]
                all_meals = [dict(row) for row in conn.execute("SELECT * FROM MEALS;").fetchall()]
                filtered = []
                for meal in all_meals:
                    if meal["idMeal"] in users_meals:
                        filtered.append(meal)
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                print(err)
                return(jsonify({f"ERROR: {err}"}))
            try:
                filtered = filtered[-int(nr):]
                return jsonify({"meals":{"filtered":filtered}})
            except:
                return jsonify({"meals":"null"})
    except:
        return jsonify({"error":"data not found"})
    
@app.route("/profile/get/ingredients", methods=["GET"])
@token_required
def getUserGetIngredients():
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                token=jwt.decode(request.authorization.token, app.config["SECRET_KEY"], algorithms=["HS256"])
                #print(token["user"])
                conn.row_factory = sqlite3.Row
                userId=[dict(row)["idUser"] for row in conn.execute(f"SELECT * FROM USERS WHERE strUser='"+token["user"]+"';").fetchall()][0]
                users_ingredients = [dict(row)["idIngredient"] for row in conn.execute(f"SELECT * FROM FAV_INGREDIENTS WHERE idUser={int(userId)};").fetchall()]
                all_ingredients = [dict(row) for row in conn.execute("SELECT * FROM INGREDIENTS;").fetchall()]
                filtered = []
                for ingredient in all_ingredients:
                    if ingredient["idIngredient"] in users_ingredients:
                        filtered.append(ingredient)
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                print(err)
                return(jsonify({f"ERROR: {err}"}))
            try:
                return jsonify({"ingredients":{"filtered":filtered}})
            except:
                return jsonify({"ingredients":"null"})
    except:
        return jsonify({"error":"data not found"})

@app.route("/profile/get/ingredients/last/<nr>", methods=["GET"])
@token_required
def getUserGetIngredientsLast(nr):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                token=jwt.decode(request.authorization.token, app.config["SECRET_KEY"], algorithms=["HS256"])
                #print(token["user"])
                conn.row_factory = sqlite3.Row
                userId=[dict(row)["idUser"] for row in conn.execute(f"SELECT * FROM USERS WHERE strUser='"+token["user"]+"';").fetchall()][0]
                users_ingredients = [dict(row)["idIngredient"] for row in conn.execute(f"SELECT * FROM FAV_INGREDIENTS WHERE idUser={int(userId)};").fetchall()]
                all_ingredients = [dict(row) for row in conn.execute("SELECT * FROM INGREDIENTS;").fetchall()]
                filtered = []
                for ingredient in all_ingredients:
                    if ingredient["idIngredient"] in users_ingredients:
                        filtered.append(ingredient)
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                print(err)
                return(jsonify({f"ERROR: {err}"}))
            try:
                filtered = filtered[-int(nr):]
                return jsonify({"ingredients":{"filtered":filtered}})
            except:
                return jsonify({"ingredients":"null"})
    except:
        return jsonify({"error":"data not found"})
    
if __name__ == "__main__":    
    app.run(debug=True, port=7700, host="0.0.0.0")