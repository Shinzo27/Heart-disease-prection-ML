from flask import Flask, render_template, request, redirect, url_for, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return jsonify("Hello World")

@app.route('/predict', methods=['POST'])
def predict():
    input = request.form.get('age')
    return jsonify(input)

if __name__ == '__main__':
    app.run(debug=True, port=3000)