from flask import Flask,jsonify,send_from_directory
from .anarcoped import main
URL="https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vQBCl7flmc6Q4-JI6L4RhcdQZquIh-qlKr8oGF_YDKELDBlOqve3vyv2fqGBeOQVhuVBGYu1ijAUMha/pubhtml?gid=453695488&single=true"

app = Flask(__name__)
@app.get("/api")
def api():
    return jsonify(list(main()))

@app.get("/")
def index():
    print(app.static_folder)
    return send_from_directory(app.static_folder, 'index.html')
    
