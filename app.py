from flask import Flask, render_template, request, jsonify, make_response
from flask_cors import CORS
from moonquakes import *
TEMPLATES_AUTO_RELOAD = True

# Start app
app = Flask(__name__)
CORS(app)

endpoint = '/api/v1'

@app.route('/', methods=['GET'])
def home():
    routes = {
        'all quakes': ['GET','/api/v1/quakes'],
        'one quake': ['GET','/api/v1/quakes/quake-id']
    }
    return jsonify(routes), 200

@app.route(endpoint + '/quakes', methods=['GET'])
def get_quakes():
    if request.method == 'GET':
        
        return jsonify(quakes), 200
    
@app.route(endpoint + '/quakes/<quake_id>', methods=['GET'])
def get_quake_by_id(quake_id):
    quake = quake_by_id(quake_id)
    if quake:
        return jsonify(quake), 200
    else:
        return jsonify({"error": "Earthquake not found"}), 404
    
# Start app on http://localhost:5000/api/v1
if __name__ == '__main__':
    #app.run(host="localhost", port=5000,debug=True)
    app.run(host='0.0.0.0', port=5000,debug=True)