from flask import Flask,jsonify,send_from_directory,request
from .anarcoped import main
# from flask_cors import CORS

app = Flask(__name__)

# CORS(app)

@app.get("/")
def index():
    # print(app.static_folder)
    return send_from_directory(app.static_folder, 'index.html')
    
@app.get("/api/")
@app.get("/api/<searh_term>")
def api(searh_term=None):
    filtros = dict(request.args)
    return jsonify(list(main(searh_term,filtros)))
