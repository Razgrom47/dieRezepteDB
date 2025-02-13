from flask import Blueprint, jsonify, request
from models import Ingredient
from extensions import db
from decorators import token_required
import random

ingredients_bp = Blueprint('ingredients_bp', __name__)

def ingredient_to_dict(ingredient):
    return {
        'idIngredient': ingredient.idIngredient,
        'strIngredient': ingredient.strIngredient,
        'strType': ingredient.strType
    }

@ingredients_bp.route('/ingredients/', methods=['GET'])
@token_required
def get_all_ingredients():
    ingredients = Ingredient.query.all()
    ingredients_list = [ingredient_to_dict(i) for i in ingredients]
    return jsonify({'ingredients': ingredients_list})

@ingredients_bp.route('/ingredients/id/<int:ingr>', methods=['GET'])
def get_ingredient_by_id(ingr):
    ingredient = Ingredient.query.get(ingr)
    if ingredient:
        return jsonify({'ingredients': ingredient_to_dict(ingredient)})
    return jsonify({'ingredients': None}), 404

@ingredients_bp.route('/ingredient/name/<name>', methods=['GET'])
def get_ingredient_by_name(name):
    ingredient = Ingredient.query.filter(Ingredient.strIngredient.ilike(name)).first()
    if ingredient:
        return jsonify({'ingredient': ingredient_to_dict(ingredient)})
    return jsonify({'ingredient': None}), 404

@ingredients_bp.route('/ingredients/name/<ingr>', methods=['GET'])
@token_required
def get_ingredients_by_name(ingr):
    ingredients = Ingredient.query.filter(Ingredient.strIngredient.ilike(f"%{ingr}%")).all()
    ingredients_list = [ingredient_to_dict(i) for i in ingredients]
    return jsonify({'ingredients': {'filtered': ingredients_list}})

@ingredients_bp.route('/ingredients/tag/<ingr>', methods=['GET'])
@token_required
def get_ingredients_by_tag(ingr):
    ingredients = Ingredient.query.filter(Ingredient.strType.ilike(f"%{ingr}%")).all()
    ingredients_list = [ingredient_to_dict(i) for i in ingredients]
    return jsonify({'ingredients': {'filtered': ingredients_list}})

@ingredients_bp.route('/ingredients/random/<int:number>', methods=['GET'])
def get_random_ingredients(number):
    ingredients = Ingredient.query.all()
    if not ingredients:
        return jsonify({'ingredients': None}), 404
    filtered = []
    while len(filtered) < number and len(filtered) < len(ingredients):
        ingredient = random.choice(ingredients)
        if ingredient_to_dict(ingredient) not in filtered:
            filtered.append(ingredient_to_dict(ingredient))
    return jsonify({'ingredients': {'filtered': filtered}})
