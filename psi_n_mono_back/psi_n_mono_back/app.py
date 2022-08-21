from flask import Flask,jsonify,send_from_directory,request
from .anarcoped import main
from flask_caching import Cache
# from flask_cors import CORS

cache = Cache(config={'CACHE_TYPE': 'SimpleCache',    "CACHE_DEFAULT_TIMEOUT": 1800})

app = Flask(__name__)

cache.init_app(app)

@app.get("/")
def index():
    # print(app.static_folder)
    return send_from_directory(app.static_folder or 'static', 'index.html')
    
@app.get("/api/")
@app.get("/api/<searh_term>")
@cache.cached(query_string=True)
def api(searh_term=None):
    filtros = dict(request.args)
    return jsonify(list(main(searh_term,filtros)))
