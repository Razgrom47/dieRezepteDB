from flask import Blueprint, request, jsonify, current_app, session
from models import User
from extensions import db, bcrypt
import jwt
from datetime import datetime, timedelta

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': 'Missing credentials', 
                        'WWW-Authenticate': 'Basic realm="Login required"'}), 401

    user = User.query.filter_by(strUser=data['username']).first()
    #if not user or not bcrypt.check_password_hash(user.strPassword, data['password']):
    if not user or not user.strPassword == data['password']:
        return jsonify({'message': 'Unable to verify'}), 403

    token = jwt.encode({
        'user': user.strUser,
        'exp': datetime.utcnow() + timedelta(minutes=10)
    }, current_app.config['SECRET_KEY'], algorithm="HS256")
    
    # (Optional) Set session variables if needed
    session['logged_in'] = True
    session['userID'] = user.idUser
    session['username'] = user.strUser

    return jsonify({'token': token})
