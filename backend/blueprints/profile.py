# blueprints/profile.py
from flask import Blueprint, jsonify, request, current_app, g
from models import User, Meal, Ingredient, FavMeal, FavIngredient
from extensions import db
from decorators import token_required

profile_bp = Blueprint('profile_bp', __name__)

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

def ingredient_to_dict(ingredient):
    return {
        'idIngredient': ingredient.idIngredient,
        'strIngredient': ingredient.strIngredient,
        'strType': ingredient.strType
    }

@profile_bp.route('/profile', methods=['GET'])
@token_required
def profile():
    user = g.current_user
    if user:
        return jsonify({'profile': {'username': user.strUser, 'country': user.strCountry}})
    return jsonify({'profile': None}), 404

@profile_bp.route('/profile/like/meal/<int:idMeal>', methods=['POST'])
@token_required
def like_meal(idMeal):
    user = g.current_user
    if not user:
        return jsonify({'message': 'User not found'}), 404
    # Check if already liked
    fav = FavMeal.query.filter_by(idUser=user.idUser, idMeal=idMeal).first()
    if not fav:
        new_fav = FavMeal(idUser=user.idUser, idMeal=idMeal)
        db.session.add(new_fav)
        db.session.commit()
    return jsonify({'message': 'liked successfully'})

@profile_bp.route('/profile/dislike/meal/<int:idMeal>', methods=['POST'])
@token_required
def dislike_meal(idMeal):
    user = g.current_user
    if not user:
        return jsonify({'message': 'User not found'}), 404
    fav = FavMeal.query.filter_by(idUser=user.idUser, idMeal=idMeal).first()
    if fav:
        db.session.delete(fav)
        db.session.commit()
    return jsonify({'message': 'disliked successfully'})

@profile_bp.route('/profile/like/ingredient/<int:idIngredient>', methods=['POST'])
@token_required
def like_ingredient(idIngredient):
    user = g.current_user
    if not user:
        return jsonify({'message': 'User not found'}), 404
    fav = FavIngredient.query.filter_by(idUser=user.idUser, idIngredient=idIngredient).first()
    if not fav:
        new_fav = FavIngredient(idUser=user.idUser, idIngredient=idIngredient)
        db.session.add(new_fav)
        db.session.commit()
    return jsonify({'message': 'liked successfully'})

@profile_bp.route('/profile/dislike/ingredient/<int:idIngredient>', methods=['POST'])
@token_required
def dislike_ingredient(idIngredient):
    user = g.current_user
    if not user:
        return jsonify({'message': 'User not found'}), 404
    fav = FavIngredient.query.filter_by(idUser=user.idUser, idIngredient=idIngredient).first()
    if fav:
        db.session.delete(fav)
        db.session.commit()
    return jsonify({'message': 'disliked successfully'})

@profile_bp.route('/profile/get/meals', methods=['GET'])
@token_required
def get_user_meals():
    user = g.current_user
    if not user:
        return jsonify({'message': 'User not found'}), 404
    favs = FavMeal.query.filter_by(idUser=user.idUser).all()
    meal_ids = [fav.idMeal for fav in favs]
    meals = Meal.query.filter(Meal.idMeal.in_(meal_ids)).all()
    meals_list = [meal_to_dict(m) for m in meals]
    return jsonify({'meals': {'filtered': meals_list}})

@profile_bp.route('/profile/get/meals/last/<int:nr>', methods=['GET'])
@token_required
def get_user_meals_last(nr):
    user = g.current_user
    if not user:
        return jsonify({'message': 'User not found'}), 404
    # Since FavMeal has no auto-increment id column, sort manually by idMeal (as a proxy for order)
    favs = FavMeal.query.filter_by(idUser=user.idUser).all()
    favs_sorted = sorted(favs, key=lambda fav: fav.idMeal, reverse=True)
    favs_sorted = favs_sorted[:nr]
    meal_ids = [fav.idMeal for fav in favs_sorted]
    meals = Meal.query.filter(Meal.idMeal.in_(meal_ids)).all()
    meals_list = [meal_to_dict(m) for m in meals]
    return jsonify({'meals': {'filtered': meals_list}})

@profile_bp.route('/profile/get/ingredients', methods=['GET'])
@token_required
def get_user_ingredients():
    user = g.current_user
    if not user:
        return jsonify({'message': 'User not found'}), 404
    favs = FavIngredient.query.filter_by(idUser=user.idUser).all()
    ingredient_ids = [fav.idIngredient for fav in favs]
    ingredients = Ingredient.query.filter(Ingredient.idIngredient.in_(ingredient_ids)).all()
    ingredients_list = [ingredient_to_dict(i) for i in ingredients]
    return jsonify({'ingredients': {'filtered': ingredients_list}})

@profile_bp.route('/profile/get/ingredients/last/<int:nr>', methods=['GET'])
@token_required
def get_user_ingredients_last(nr):
    user = g.current_user
    if not user:
        return jsonify({'message': 'User not found'}), 404
    # Manually sort favorites by idIngredient as a proxy for order
    favs = FavIngredient.query.filter_by(idUser=user.idUser).all()
    favs_sorted = sorted(favs, key=lambda fav: fav.idIngredient, reverse=True)
    favs_sorted = favs_sorted[:nr]
    ingredient_ids = [fav.idIngredient for fav in favs_sorted]
    ingredients = Ingredient.query.filter(Ingredient.idIngredient.in_(ingredient_ids)).all()
    ingredients_list = [ingredient_to_dict(i) for i in ingredients]
    return jsonify({'ingredients': {'filtered': ingredients_list}})
