import json
from flask import Flask, request
app = Flask(__name__)
@app.route('/', methods=["GET"])
def index():
    try:
        name = request.args.get('name')
        email = request.args.get('email')
        return json.dumps({'name': name,
                        'email': f'{email}@outlook.com'})
    except:
        return json.dumps({"error":"data not found"})
app.run(debug=True)