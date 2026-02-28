import string
import secrets
from flask import Flask, render_template, request, jsonify

# Ajuste para que Flask encuentre las carpetas desde la subcarpeta /api
app = Flask(__name__, 
            template_folder="../templates", 
            static_folder="../static")

def generador(longitud, usar_simbolos, usar_numero):
    caracteres = string.ascii_letters
    if usar_numero:
        caracteres += string.digits
    if usar_simbolos:
        caracteres += string.punctuation
    
    password = "".join(secrets.choice(caracteres) for _ in range(longitud))
    return password

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generar', methods=['POST'])
def api_generar():
    data = request.json
    # Agregamos un valor por defecto por si fallan los datos
    longitud = int(data.get('longitud', 12))
    simbolos = data.get('simbolos', False)
    numeros = data.get('numeros', False)

    password = generador(longitud, simbolos, numeros)
    return jsonify({"password": password})

