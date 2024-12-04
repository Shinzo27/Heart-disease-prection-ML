from flask import Flask, request, jsonify
import pandas as pd
import pickle
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv
import os

print(dir(genai))

load_dotenv()

app = Flask(__name__)
CORS(app)

model = pickle.load(open('../model.pkl', 'rb'))

GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")
GEMINI_API_URL = "https://api.gemini-ai.com/v1/analyze"
genai.configure(api_key=GEMINI_API_KEY)

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

@app.route('/generate-diet', methods=['POST'])
def generate_diet():
    user_data = request.json

    models = genai.get_model('models/gemini-1.5-flash')
    print(models)

    prompt = (
        f"Based on the following health data:\n"
        f"Age: {user_data.get('age')}, Sex: {'Male' if user_data.get('sex') == 1 else 'Female'},\n"
        f"Chest pain type: {user_data.get('cp')}, Resting BP: {user_data.get('trestbps')} mmHg,\n"
        f"Cholesterol: {user_data.get('chol')} mg/dL, Fasting blood sugar > 120 mg/dL: {bool(user_data.get('fbs'))},\n"
        f"Max heart rate achieved: {user_data.get('thalach')}, Exercise-induced angina: {bool(user_data.get('exang'))},\n"
        f"ST depression: {user_data.get('oldpeak')}, Slope: {user_data.get('slope')},\n"
        f"Major vessels: {user_data.get('ca')}, Thalassemia type: {user_data.get('thal')}.\n\n"
        f"Generate a personalized diet plan to improve the user's heart health."
    )

    try:
        chat = genai.start_chat(models)
        
        response = chat.send_message(prompt)
        print(response)

        return jsonify({"diet_plan": response})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=8000)  