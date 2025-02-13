from flask import Flask
from config import Config
from extensions import db, bcrypt
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for all domains (adjust as needed)
    CORS(app, origins=["*"], supports_credentials=True)

    db.init_app(app)
    bcrypt.init_app(app)

    with app.app_context():
        db.create_all()  # Create tables if they do not exist

    # Register blueprints
    from blueprints.auth import auth_bp
    from blueprints.meals import meals_bp
    from blueprints.ingredients import ingredients_bp
    from blueprints.profile import profile_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(meals_bp)
    app.register_blueprint(ingredients_bp)
    app.register_blueprint(profile_bp)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=7700, host="0.0.0.0")
