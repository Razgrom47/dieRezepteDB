from extensions import db

class User(db.Model):
    __tablename__ = 'USERS'
    idUser = db.Column(db.Integer, primary_key=True)
    strUser = db.Column(db.String(80), unique=True, nullable=False)
    # The hashed password is stored here
    strPassword = db.Column(db.String(128), nullable=False)
    strCountry = db.Column(db.String(80))

    fav_meals = db.relationship('FavMeal', backref='user', lazy=True)
    fav_ingredients = db.relationship('FavIngredient', backref='user', lazy=True)


class Meal(db.Model):
    __tablename__ = 'MEALS'
    idMeal = db.Column(db.Integer, primary_key=True)
    strMeal = db.Column(db.String(255), nullable=False)
    # Define up to 20 ingredients (if needed)
    strIngredient1 = db.Column(db.String(255))
    strIngredient2 = db.Column(db.String(255))
    strIngredient3 = db.Column(db.String(255))
    strIngredient4 = db.Column(db.String(255))
    strIngredient5 = db.Column(db.String(255))
    strIngredient6 = db.Column(db.String(255))
    strIngredient7 = db.Column(db.String(255))
    strIngredient8 = db.Column(db.String(255))
    strIngredient9 = db.Column(db.String(255))
    strIngredient10 = db.Column(db.String(255))
    strIngredient11 = db.Column(db.String(255))
    strIngredient12 = db.Column(db.String(255))
    strIngredient13 = db.Column(db.String(255))
    strIngredient14 = db.Column(db.String(255))
    strIngredient15 = db.Column(db.String(255))
    strIngredient16 = db.Column(db.String(255))
    strIngredient17 = db.Column(db.String(255))
    strIngredient18 = db.Column(db.String(255))
    strIngredient19 = db.Column(db.String(255))
    strIngredient20 = db.Column(db.String(255))
    strArea = db.Column(db.String(80))
    strCategory = db.Column(db.String(80))
    strTags = db.Column(db.String(255))


class Ingredient(db.Model):
    __tablename__ = 'INGREDIENTS'
    idIngredient = db.Column(db.Integer, primary_key=True)
    strIngredient = db.Column(db.String(255), nullable=False)
    strType = db.Column(db.String(255))

class FavMeal(db.Model):
    __tablename__ = 'FAV_MEALS'
    idUser = db.Column(db.Integer, db.ForeignKey('USERS.idUser'), primary_key=True)
    idMeal = db.Column(db.Integer, db.ForeignKey('MEALS.idMeal'), primary_key=True)

class FavIngredient(db.Model):
    __tablename__ = 'FAV_INGREDIENTS'
    idUser = db.Column(db.Integer, db.ForeignKey('USERS.idUser'), primary_key=True)
    idIngredient = db.Column(db.Integer, db.ForeignKey('INGREDIENTS.idIngredient'), primary_key=True)
