from flask import Flask, request, jsonify
import pandas as pd
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = pickle.load(open('../model.pkl', 'rb'))

@app.route('/')
def index():
    return jsonify("Hello World")

@app.route('/predict', methods=['POST'])
def predict():
    json_ = request.get_json()
    print(json_)
    query = pd.DataFrame([json_], columns=['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'])
    prediction = model.predict_proba(query)
    print(prediction)
    percentage = (prediction[0][1])*100 
    print(percentage)
    return jsonify({ 'prediction': percentage })

if __name__ == '__main__':
    app.run(debug=True, port=8000)