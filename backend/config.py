import os
import uuid

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    # Generate a random secret if one is not provided in the environment
    SECRET_KEY = uuid.uuid4().hex
    # SQLite database URI – the database file will be stored in a folder named "themealdb"
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'themealdb', 'myDB.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
