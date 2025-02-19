import requests, json, sqlite3, os, progressbar
from urllib import request as rq
cwd = (os.path.abspath(os.getcwd()))

#--- Scape all data for the meals
def get_all_meals():
    
    #--- SQLite DataBase
    if os.path.exists(cwd+r"\backend"+r"\themealdb\myDB.db") == False:
        with open(cwd+r"\backend"+r"\themealdb\myDB.db", "w") as file:
            pass
    conn = sqlite3.connect(cwd+r"\backend"+r"\themealdb\myDB.db")
    try:
        print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
    except sqlite3.OperationalError as e:
        print("Failed to open database:", e)
    except Exception as err:
        print(f"ERROR: {err}")

    insert_meals = """INSERT INTO MEALS (strMeal, pathImageMeal, strInstructions, strArea, strCategory, strTags, strYoutube, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15, strIngredient16, strIngredient17, strIngredient18, strIngredient19, strIngredient20, strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12, strMeasure13, strMeasure14, strMeasure15, strMeasure16, strMeasure17, strMeasure18, strMeasure19, strMeasure20 ) 
    VALUES"""#(?,?,?,?,?)"""

    identifier_meal = 2764
    api_call_id = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=5"
    count = 0 # 303 valid recepies found
    bar = progressbar.ProgressBar(maxval=303, widgets=[progressbar.Bar('░', '\t Meals download proccess \t▕', '▏Completed'), ' ፠ ', progressbar.Percentage()])
    print("Getting all meals ...")
    bar.start()
    missing = set()
    for i in range(identifier_meal, identifier_meal+355):
        try:
            response = requests.get(api_call_id+str(i))
            if json.loads(response.text)["meals"] is not None:
                json_dict_response = json.loads(response.text)["meals"][0]
                if os.path.exists(cwd+r"\frontend\public\images\\meals\\"+json_dict_response["strMeal"]+".jpg") == False:
                    rq.urlretrieve(json_dict_response["strMealThumb"].replace(" ", "%20").replace('\xe8', "e"), cwd+r"\frontend\public\images\\meals\\"+json_dict_response["strMeal"]+".jpg")
                
                #print(json.dumps(json.loads(response.text), indent=4, sort_keys=True))
                strMeal=json_dict_response["strMeal"].replace("'", " ")
                pathImageMeal="/images/meals/"+json_dict_response["strMeal"].replace("'", " ")+".jpg"
                try:
                    strInstructions=json_dict_response["strInstructions"].replace("'", " ") or ""
                except:
                    strInstructions=json_dict_response["strInstructions"] or ""
                strArea=json_dict_response["strArea"] or " "
                strCategory=json_dict_response["strCategory"] or " "
                strTags=json_dict_response["strTags"] or ""
                strYoutube=json_dict_response["strYoutube"] or ""
                strIngredient1=json_dict_response["strIngredient1"] or ""
                strIngredient2=json_dict_response["strIngredient2"] or ""
                strIngredient3=json_dict_response["strIngredient3"] or ""
                strIngredient4=json_dict_response["strIngredient4"] or ""
                strIngredient5=json_dict_response["strIngredient5"] or ""
                strIngredient6=json_dict_response["strIngredient6"] or ""
                strIngredient7=json_dict_response["strIngredient7"] or ""
                strIngredient8=json_dict_response["strIngredient8"] or ""
                strIngredient9=json_dict_response["strIngredient9"] or ""
                strIngredient10=json_dict_response["strIngredient10"] or ""
                strIngredient11=json_dict_response["strIngredient11"] or ""
                strIngredient12=json_dict_response["strIngredient12"] or ""
                strIngredient13=json_dict_response["strIngredient13"] or ""
                strIngredient14=json_dict_response["strIngredient14"] or ""
                strIngredient15=json_dict_response["strIngredient15"] or ""
                strIngredient16=json_dict_response["strIngredient16"] or ""
                strIngredient17=json_dict_response["strIngredient17"] or ""
                strIngredient18=json_dict_response["strIngredient18"] or ""
                strIngredient19=json_dict_response["strIngredient19"] or ""
                strIngredient20=json_dict_response["strIngredient20"] or ""
                strMeasure1=json_dict_response["strMeasure1"] or ""
                strMeasure2=json_dict_response["strMeasure2"] or ""
                strMeasure3=json_dict_response["strMeasure3"] or ""
                strMeasure4=json_dict_response["strMeasure4"] or ""
                strMeasure5=json_dict_response["strMeasure5"] or ""
                strMeasure6=json_dict_response["strMeasure6"] or ""
                strMeasure7=json_dict_response["strMeasure7"] or ""
                strMeasure8=json_dict_response["strMeasure8"] or ""
                strMeasure9=json_dict_response["strMeasure9"] or ""
                strMeasure10=json_dict_response["strMeasure10"] or ""
                strMeasure11=json_dict_response["strMeasure11"] or ""
                strMeasure12=json_dict_response["strMeasure12"] or ""
                strMeasure13=json_dict_response["strMeasure13"] or ""
                strMeasure14=json_dict_response["strMeasure14"] or ""
                strMeasure15=json_dict_response["strMeasure15"] or ""
                strMeasure16=json_dict_response["strMeasure16"] or ""
                strMeasure17=json_dict_response["strMeasure17"] or ""
                strMeasure18=json_dict_response["strMeasure18"] or ""
                strMeasure19=json_dict_response["strMeasure19"] or ""
                strMeasure20=json_dict_response["strMeasure20"] or ""
                conn.execute(insert_meals+f"('{strMeal}', '{pathImageMeal}', '{strInstructions}', '{strArea}', '{strCategory}', '{strTags}', '{strYoutube}', '{strIngredient1}', '{strIngredient2}', '{strIngredient3}', '{strIngredient4}', '{strIngredient5}', '{strIngredient6}', '{strIngredient7}', '{strIngredient8}', '{strIngredient9}', '{strIngredient10}', '{strIngredient11}', '{strIngredient12}', '{strIngredient13}', '{strIngredient14}', '{strIngredient15}', '{strIngredient16}', '{strIngredient17}', '{strIngredient18}', '{strIngredient19}', '{strIngredient20}', '{strMeasure1}', '{strMeasure2}', '{strMeasure3}', '{strMeasure4}', '{strMeasure5}', '{strMeasure6}', '{strMeasure7}', '{strMeasure8}', '{strMeasure9}', '{strMeasure10}', '{strMeasure11}', '{strMeasure12}', '{strMeasure13}', '{strMeasure14}', '{strMeasure15}', '{strMeasure16}', '{strMeasure17}', '{strMeasure18}', '{strMeasure19}', '{strMeasure20}');")
                #print(f" \t [{count}] MEAL: ["+json_dict_response["idMeal"]+"] "+json_dict_response["strMeal"]+"\n \t STATUS: Completed: ", round(round(count/303, 3)*100, 2),"% \t | \t Remaining: ", round((1-round(count/303, 3))*100, 2), "%")
                bar.update(count)
                count=count+1
        except KeyboardInterrupt:
            break
        except Exception as err:
            print(f"ERROR: {err}")
            missing.add("["+ json_dict_response["idMeal"]+ "]")
            missing.add(json_dict_response["strMeal"])
            
    print(missing)
    conn.commit()
    conn.close()
    bar.finish()

#--- Scape all data for the ingredients
def get_all_ingredients(): 
    #--- SQLite DataBase
    if os.path.exists(cwd+r"\backend"+r"\themealdb\myDB.db") == False:
        with open(cwd+r"\backend"+r"\themealdb\myDB.db", "w") as file:
            pass
    conn = sqlite3.connect(cwd+r"\backend"+r"\themealdb\myDB.db")
    try:
        print(f"Opened SQLite database with version {sqlite3.sqlite_version} successfully.")
    except sqlite3.OperationalError as e:
        print("Failed to open database:", e)
    except Exception as err:
        print(f"ERROR: {err}")

    insert_ingredients = """INSERT INTO INGREDIENTS (strIngredient, strDescription, strType, pathImageIngredient, pathSmallImageIngredient) 
    VALUES"""#(?,?,?,?,?)"""

    api_call_id = "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    count = 0 # 575 valid recepies found
    bar = progressbar.ProgressBar(maxval=575, widgets=[progressbar.Bar('▓', '\t Ingredients download proccess \t ▐','▌Completed'), ' ፠ ', progressbar.Percentage()])
    print("Getting all ingredients ...")
    bar.start()
    missing = set()
    try:
        response = requests.get(api_call_id)
        json_dict_response = json.loads(response.text)
        #print(json.dumps(json_dict_response["meals"][158], indent=4, sort_keys=True))
        for x in json_dict_response["meals"]:
            try:        
                if os.path.exists(cwd+r"\frontend\public\images\\ingredients\\"+x["strIngredient"]+".png") == False:
                    rq.urlretrieve("https://www.themealdb.com/images/ingredients/"+x["strIngredient"].replace(" ", "%20").replace('\xe8', "e")+".png", cwd+r"\frontend\public\images\\ingredients\\"+x["strIngredient"]+".png")
                if os.path.exists(cwd+r"\frontend\public\images\\ingredients\\small\\"+x["strIngredient"]+".png") == False:
                    rq.urlretrieve("https://www.themealdb.com/images/ingredients/"+x["strIngredient"].replace(" ", "%20").replace('\xe8', "e")+"-Small.png", cwd+r"\frontend\public\images\\ingredients\\small\\"+x["strIngredient"]+"-Small.png")
                
                strIng = x["strIngredient"]
                try:
                    strDescript=x["strDescription"].replace("'", " ") or ""
                except:
                    strDescript=x["strDescription"] or ""
                strType=x["strType"]
                strPath="/images/ingredients/"+x["strIngredient"].replace("'", " ")+".png"
                strPathSmall="/images/ingredients/small/"+x["strIngredient"]+"-Small.png"
                conn.execute(insert_ingredients+f"('{strIng}', '{strDescript}', '{strType}', '{strPath}', '{strPathSmall}' );")
                count=count+1
                #print(f" \t [{count}] INGREDIENT: ["+x["idIngredient"]+"] "+x["strIngredient"]+"\n \t STATUS: Completed: ", round(round(count/608, 3)*100, 2),"% \t | \t Remaining: ", round((1-round(count/608, 3))*100, 2), "%") 
                bar.update(count)                
            except KeyboardInterrupt:
                break
            except Exception as err:
                print("[ERROR]: ", err)
                missing.add("["+ x["idIngredient"]+ "]")
                missing.add(x["strIngredient"])
        print(missing)
    except Exception as err:
        #print(f"ERROR: {err}")
        pass
    conn.commit()
    conn.close()
    bar.finish()
    
def main():
    #getting all ingredients 
    get_all_ingredients() 
    #getting all meals
    get_all_meals()

if __name__ == "__main__":
    main()

#Tables: Meals, Ingredients (, Area, Category)
#Meals many:many Ingredients

#--(Meals many:one Area
#Meals many:one Category)--

ingredients_values = {
    "idIngredient": "608",
    "strDescription": "A prune is a dried plum, most commonly from the European plum. Not all plum species or varieties can be dried into prunes. A prune is the firm-fleshed fruit (plum) of Prunus domestica varieties that have a high soluble solids content, and do not ferment during drying. Use of the term \"prune\" for fresh plums is obsolete except when applied to varieties of plum grown for drying.",
    "strIngredient": "Prunes",
    "strType": "Fruit",
    "pathImageIngredient":"./images/ingredients/Prunes.png",
    "pathSmallImageIngredient":"./images/ingredients/small/Prunes-Small.png",
}
meal_values = {
    #0
    "idMeal": "52764", 
    #1
    "strMeal": "Garides Saganaki",
    #2
    "pathImageMeal":"./images/meals/Garides Saganaki.jpg",
    #3
    "strArea": "Greek",
    #4
    "strCategory": "Seafood",
    #5
    "strInstructions": "Place the prawns in a pot and add enough water to cover. Boil for 5 minutes. Drain, reserving the liquid, and set aside.\r\nHeat 2 tablespoons of oil in a saucepan. Add the onion; cook and stir until soft. Mix in the parsley, wine, tomatoes, garlic and remaining olive oil. Simmer, stirring occasionally, for about 30 minutes, or until the sauce is thickened.\r\nWhile the sauce is simmering, the prawns should become cool enough to handle. First remove the legs by pinching them, and then pull off the shells, leaving the head and tail on.\r\nWhen the sauce has thickened, stir in the prawns. Bring to a simmer again if the sauce has cooled with the prawns, and cook for about 5 minutes. Add the feta and remove from the heat. Let stand until the cheese starts to melt. Serve warm with slices of crusty bread.\r\nThough completely untraditional, you can add a few tablespoons of stock or passata to this recipe to make a delicious pasta sauce. Toss with pasta after adding the feta, and serve.",
    #6
    "strTags": "Seafood,Shellfish",
    #7
    "strYoutube": "https://www.youtube.com/watch?v=uO0ejc85zSE",
    #8
    "strIngredient1": "Raw king prawns",
    #9
    "strIngredient2": "",
    #10
    "strIngredient3": "",
    #11
    "strIngredient4": "",
    #12
    "strIngredient5": "",
    #13
    "strIngredient6": "",
    #14
    "strIngredient7": "",
    #15
    "strIngredient8": "",
    #16
    "strIngredient9": "",
    #17
    "strIngredient10": "",
    #18
    "strIngredient11": "",
    #19
    "strIngredient12": "Olive oil",
    #20
    "strIngredient13": "",
    #21
    "strIngredient14": "Chopped onion",
    #22
    "strIngredient15": "Freshly chopped parsley",
    #23
    "strIngredient16": "White wine",
    #23
    "strIngredient17": "Chopped tomatoes",
    #24
    "strIngredient18": "Minced garlic",
    #25
    "strIngredient19": "Cubed Feta cheese",
    #26
    "strIngredient20": "",
    #27
    "strMeasure1": "500g",
    #28
    "strMeasure2": "",
    #29
    "strMeasure3": "",
    #30
    "strMeasure4": "",
    #31
    "strMeasure5": "",
    #32
    "strMeasure6": "",
    #33
    "strMeasure7": "",
    #34
    "strMeasure8": "",
    #35
    "strMeasure9": "",
    #36
    "strMeasure10": "",
    #37
    "strMeasure11": "",
    #38
    "strMeasure12": "3 tablespoons",
    #39
    "strMeasure13": "",
    #40
    "strMeasure14": "1",
    #41
    "strMeasure15": "pinch",
    #42
    "strMeasure16": "250ml",
    #43
    "strMeasure17": "1 (400g) tin",
    #44
    "strMeasure18": "1/2 teaspoon",
    #45
    "strMeasure19": "1 (200g) pack",
    #46
    "strMeasure20": ""
}