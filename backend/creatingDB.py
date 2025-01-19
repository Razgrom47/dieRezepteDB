import sqlite3, os
cwd = (os.path.abspath(os.getcwd()))
cwd = cwd + r"\backend"
drop_table_ingredients="DROP TABLE IF EXISTS INGREDIENTS"
table_ingredients ="""
CREATE TABLE INGREDIENTS(
idIngredient INTEGER NOT NULL UNIQUE PRIMARY KEY,
strIngredient VARCHAR(255) NOT NULL,
strDescription BIGTEXT,
strType VARCHAR(255), 
pathImageIngredient VARCHAR(255),
pathSmallImageIngredient VARCHAR(255)
);
"""
drop_table_meals="DROP TABLE IF EXISTS MEALS"
table_meals="""
CREATE TABLE MEALS(
idMeal INTEGER NOT NULL PRIMARY KEY,
strMeal VARCHAR(255) NOT NULL,
pathImageMeal VARCHAR(255),
strArea VARCHAR(255) NOT NULL,
strCategory VARCHAR(255),
strInstructions BIGTEXT,
strTags VARCHAR(255),
strYoutube VARCHAR(255),
strIngredient1 VARCHAR(255),
strIngredient2 VARCHAR(255),
strIngredient3 VARCHAR(255),
strIngredient4 VARCHAR(255),
strIngredient5 VARCHAR(255),
strIngredient6 VARCHAR(255),
strIngredient7 VARCHAR(255),
strIngredient8 VARCHAR(255),
strIngredient9 VARCHAR(255),
strIngredient10 VARCHAR(255),
strIngredient11 VARCHAR(255),
strIngredient12 VARCHAR(255),
strIngredient13 VARCHAR(255),
strIngredient14 VARCHAR(255),
strIngredient15 VARCHAR(255),
strIngredient16 VARCHAR(255),
strIngredient17 VARCHAR(255),
strIngredient18 VARCHAR(255),
strIngredient19 VARCHAR(255),
strIngredient20 VARCHAR(255),
strMeasure1 VARCHAR(255),
strMeasure2 VARCHAR(255),
strMeasure3 VARCHAR(255),
strMeasure4 VARCHAR(255),
strMeasure5 VARCHAR(255),
strMeasure6 VARCHAR(255),
strMeasure7 VARCHAR(255),
strMeasure8 VARCHAR(255),
strMeasure9 VARCHAR(255),
strMeasure10 VARCHAR(255),
strMeasure11 VARCHAR(255),
strMeasure12 VARCHAR(255),
strMeasure13 VARCHAR(255),
strMeasure14 VARCHAR(255),
strMeasure15 VARCHAR(255),
strMeasure16 VARCHAR(255),
strMeasure17 VARCHAR(255),
strMeasure18 VARCHAR(255),
strMeasure19 VARCHAR(255),
strMeasure20 VARCHAR(255),
FOREIGN KEY (strIngredient1) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient2) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient3) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient4) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient5) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient6) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient7) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient8) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient9) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient10) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient11) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient12) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient13) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient14) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient15) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient16) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient17) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient18) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient19) REFERENCES INGREDIENTS(strIngredient)
FOREIGN KEY (strIngredient20) REFERENCES INGREDIENTS(strIngredient)
);
"""

insert_ingredients = """INSERT INTO INGREDIENTS (idIngredient, strIngredient) 
VALUES"""#(?,?,?,?,?)"""

insert_meals = """INSERT INTO MEALS (idMeal, strMeal, strArea) 
VALUES"""#(?,?,?,?,?)"""

#--- SQLite DataBase
if os.path.exists(cwd+r"\themealdb\myDB.db") == False:
    with open(cwd+r"\themealdb\myDB.db", "w") as file:
        pass
with sqlite3.connect(cwd+r"\themealdb\myDB.db") as conn:
    try:
        print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
        conn.execute(drop_table_ingredients)
        conn.execute(table_ingredients)
        conn.execute(drop_table_meals)
        conn.execute(table_meals)
        conn.commit()
        #Setting starting point
        conn.execute(insert_ingredients+f"(848483,'dummy');")
        conn.execute(insert_meals+f"(848483,'dummy','NOWHERE');")
        #conn.execute(f"DELETE FROM INGREDIENTS WHERE idIngredient=848483 and strIngredient='dummy';")
        #conn.execute(f"DELETE FROM MEALS WHERE idMeal=848483 and strMeal='dummy' and strArea='NOWHERE';")
        conn.commit()
        print(conn.execute("SELECT * FROM INGREDIENTS").fetchall())
        print(conn.execute("SELECT * FROM MEALS").fetchall())
    except sqlite3.OperationalError as e:
        print("Failed to open database:", e)
    except Exception as err:
        print(f"ERROR: {err}")