import json, sqlite3, os
from flask import Flask, request
app = Flask(__name__)

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

# Getting all meals
@app.route('/meals/', methods=["GET"])
def meals():
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                all_meals=(conn.execute("SELECT * FROM MEALS").fetchall())
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        return json.dumps({"meals":all_meals})
    except:
        return json.dumps({"error":"data not found"})

# Filter meals by ID
@app.route('/meals/id/<id>', methods=["GET"])
def mealById(id):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                all_meals=(conn.execute("SELECT * FROM MEALS").fetchall())
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            return json.dumps({"meals":all_meals[int(id)-848484]})
        except:
            return json.dumps({"meals":None})
    except:
        return json.dumps({"error":"data not found"})

# Filter meals by Name
@app.route('/meals/name/<name>', methods=["GET"])
def mealByName(name):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                all_meals=(conn.execute("SELECT * FROM MEALS").fetchall())
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            filtered = []
            for meal in all_meals:
                if name.lower() in meal[1].lower():
                    filtered.append(meal)
            return json.dumps({"meals":{"filtered":filtered}})
        except:
            return json.dumps({"meals":None})
    except:
        return json.dumps({"error":"data not found"})

# Filter meals by Ingredient
@app.route('/meals/ingredient/<ingr>', methods=["GET"])
def mealByIngredient(ingr):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                all_meals=(conn.execute("SELECT * FROM MEALS").fetchall())
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            filtered = []
            for meal in all_meals:
                if ingr.lower() in [meal[8].lower(),meal[9].lower(),meal[10].lower(),meal[11].lower(),meal[12].lower(),meal[13].lower(),meal[14].lower(),meal[15].lower(),meal[16].lower(),meal[17].lower(),meal[18].lower(),meal[19].lower(),meal[20].lower(),meal[21].lower(),meal[22].lower(),meal[23].lower(),meal[24].lower(),meal[25].lower(),meal[26].lower(),meal[27].lower(),meal[28].lower()]:
                    filtered.append(meal)
            return json.dumps({"meals":{"filtered":filtered}})
        except:
            return json.dumps({"meals":None})
    except:
        return json.dumps({"error":"data not found"})

# Filter meals by Area
@app.route('/meals/area/<area>', methods=["GET"])
def mealByArea(area):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                all_meals=(conn.execute("SELECT * FROM MEALS").fetchall())
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            filtered = []
            for meal in all_meals:
                if area.lower() in meal[3].lower():
                    filtered.append(meal)
            return json.dumps({"meals":{"filtered":filtered}})
        except:
            return json.dumps({"meals":None})
    except:
        return json.dumps({"error":"data not found"})

# Filter meals by Category
@app.route('/meals/category/<category>', methods=["GET"])
def mealByCategory(category):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                all_meals=(conn.execute("SELECT * FROM MEALS").fetchall())
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            filtered = []
            for meal in all_meals:
                if category.lower() in meal[4].lower():
                    filtered.append(meal)
            return json.dumps({"meals":{"filtered":filtered}})
        except:
            return json.dumps({"meals":None})
    except:
        return json.dumps({"error":"data not found"})

# Filter meals by Tag
@app.route('/meals/tag/<tag>', methods=["GET"])
def mealByTag(tag):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                all_meals=(conn.execute("SELECT * FROM MEALS").fetchall())
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            filtered = []
            for meal in all_meals:
                if tag.lower() in meal[6].lower():
                    filtered.append(meal)
            return json.dumps({"meals":{"filtered":filtered}})
        except:
            return json.dumps({"meals":None})
    except:
        return json.dumps({"error":"data not found"})
    
# Get all Ingredients
@app.route('/ingredients/', methods=["GET"])
def ingredients():
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                all_ingredients=(conn.execute("SELECT * FROM INGREDIENTS").fetchall())
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            return json.dumps({"meals":all_ingredients})
        except:
            return json.dumps({"meals":None})
    except:
        return json.dumps({"error":"data not found"})

# Filter Ingredients by name
@app.route('/ingredients/name/<ingr>', methods=["GET"])
def ingredientsByName(ingr):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                all_ingredients=(conn.execute("SELECT * FROM INGREDIENTS").fetchall())
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            filtered = []
            for ing in all_ingredients:
                if ingr.lower() in ing[1].lower(): 
                    filtered.append(ing)
            return json.dumps({"meals":{"filtered":filtered}})
        except:
            return json.dumps({"meals":None})
    except:
        return json.dumps({"error":"data not found"})

# Filter Ingredients by Tags
@app.route('/ingredients/tag/<ingr>', methods=["GET"])
def ingredientsByTags(ingr):
    try:
        with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
            try:
                print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
                all_ingredients=(conn.execute("SELECT * FROM INGREDIENTS").fetchall())
            except sqlite3.OperationalError as e:
                return("Failed to open database:", e)
            except Exception as err:
                return(f"ERROR: {err}")
        try:
            filtered = []
            for ing in all_ingredients:
                if ingr.lower() in ing[3].lower(): 
                    filtered.append(ing)
            return json.dumps({"meals":{"filtered":filtered}})
        except:
            return json.dumps({"meals":None})
    except:
        return json.dumps({"error":"data not found"})
    
if __name__ == "__main__":    
    app.run(debug=True, port=7700)