from flask import Blueprint, jsonify, request
from models import Meal
from extensions import db
from decorators import token_required

meals_bp = Blueprint('meals_bp', __name__)

def meal_to_dict(meal):
    return {
        'idMeal': meal.idMeal,
        'strMeal': meal.strMeal,
        'strIngredient1': meal.strIngredient1,
        'strIngredient2': meal.strIngredient2,
        'strIngredient3': meal.strIngredient3,
        'strIngredient4': meal.strIngredient4,
        'strIngredient5': meal.strIngredient5,
        'strIngredient6': meal.strIngredient6,
        'strIngredient7': meal.strIngredient7,
        'strIngredient8': meal.strIngredient8,
        'strIngredient9': meal.strIngredient9,
        'strIngredient10': meal.strIngredient10,
        'strIngredient11': meal.strIngredient11,
        'strIngredient12': meal.strIngredient12,
        'strIngredient13': meal.strIngredient13,
        'strIngredient14': meal.strIngredient14,
        'strIngredient15': meal.strIngredient15,
        'strIngredient16': meal.strIngredient16,
        'strIngredient17': meal.strIngredient17,
        'strIngredient18': meal.strIngredient18,
        'strIngredient19': meal.strIngredient19,
        'strIngredient20': meal.strIngredient20,
        'strArea': meal.strArea,
        'strCategory': meal.strCategory,
        'strTags': meal.strTags
    }

@meals_bp.route('/meals/', methods=['GET'])
@token_required
def get_all_meals():
    meals = Meal.query.all()
    meals_list = [meal_to_dict(m) for m in meals]
    return jsonify({'meals': meals_list})

@meals_bp.route('/meals/id/<int:id>', methods=['GET'])
def get_meal_by_id(id):
    meal = Meal.query.get(id)
    if meal:
        return jsonify({'meal': meal_to_dict(meal)})
    return jsonify({'meal': None}), 404

@meals_bp.route('/meals/name/<name>', methods=['GET'])
@token_required
def get_meals_by_name(name):
    meals = Meal.query.filter(Meal.strMeal.ilike(f"%{name}%")).all()
    meals_list = [meal_to_dict(m) for m in meals]
    return jsonify({'meals': {'filtered': meals_list}})

@meals_bp.route('/meal/name/<name>', methods=['GET'])
def get_meal_by_exact_name(name):
    formatted_name = name.replace("%26", "&")
    meal = Meal.query.filter(Meal.strMeal.ilike(formatted_name)).first()
    if meal:
        return jsonify({'meal': meal_to_dict(meal)})
    return jsonify({'meal': None}), 404

@meals_bp.route('/meals/ingredient/<ingr>', methods=['GET'])
@token_required
def get_meals_by_ingredient(ingr):
    meals = Meal.query.all()
    filtered = []
    for m in meals:
        ingredients = [
            m.strIngredient1, m.strIngredient2, m.strIngredient3, m.strIngredient4, m.strIngredient5,
            m.strIngredient6, m.strIngredient7, m.strIngredient8, m.strIngredient9, m.strIngredient10,
            m.strIngredient11, m.strIngredient12, m.strIngredient13, m.strIngredient14, m.strIngredient15,
            m.strIngredient16, m.strIngredient17, m.strIngredient18, m.strIngredient19, m.strIngredient20
        ]
        if any(ingr.lower() in (ing or "").lower() for ing in ingredients):
            filtered.append(meal_to_dict(m))
    return jsonify({'meals': {'filtered': filtered}})

@meals_bp.route('/meals/area/<area>', methods=['GET'])
@token_required
def get_meals_by_area(area):
    meals = Meal.query.filter(Meal.strArea.ilike(f"%{area}%")).all()
    meals_list = [meal_to_dict(m) for m in meals]
    return jsonify({'meals': {'filtered': meals_list}})

@meals_bp.route('/meals/category/<category>', methods=['GET'])
@token_required
def get_meals_by_category(category):
    meals = Meal.query.filter(Meal.strCategory.ilike(f"%{category}%")).all()
    meals_list = [meal_to_dict(m) for m in meals]
    return jsonify({'meals': {'filtered': meals_list}})

@meals_bp.route('/meals/tag/<tag>', methods=['GET'])
@token_required
def get_meals_by_tag(tag):
    meals = Meal.query.filter(Meal.strTags.ilike(f"%{tag}%")).all()
    meals_list = [meal_to_dict(m) for m in meals]
    return jsonify({'meals': {'filtered': meals_list}})

@meals_bp.route('/meals/latests/<int:number>', methods=['GET'])
def get_latest_meals(number):
    # Assuming higher idMeal means a later meal
    meals = Meal.query.order_by(Meal.idMeal.desc()).limit(number).all()
    meals_list = [meal_to_dict(m) for m in meals]
    return jsonify({'meals': {'filtered': meals_list}})

@meals_bp.route('/areas', methods=['GET'])
def get_areas():
    meals = Meal.query.all()
    # Use a set to avoid duplicates
    areas = list({m.strArea for m in meals if m.strArea})
    return jsonify({'areas': areas})
