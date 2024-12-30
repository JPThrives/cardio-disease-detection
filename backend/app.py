from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import logging
import traceback

app = Flask(__name__)
CORS(app)

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Load the pre-trained model
def load_model():
    try:
        return joblib.load('random_forest_model.pkl')
    except Exception as e:
        logging.error(f"Error loading model: {str(e)}")
        return None

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Log the raw request data
        logging.info("Raw request data: %s", request.get_data())
        
        data = request.json
        logging.info("Parsed JSON data: %s", data)
        
        # Validate required fields (using original dataset column names)
        required_fields = [
            'age', 'gender', 'chestpain', 'restingBP', 
            'serumcholestrol', 'fastingbloodsugar', 'restingrelectro', 
            'maxheartrate', 'exerciseangia', 'oldpeak', 'slope', 
            'noofmajorvessels'
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Create DataFrame with the expected column names
        input_data = pd.DataFrame({
            'age': [float(data['age'])],
            'gender': [float(data['gender'])],
            'chestpain': [float(data['chestpain'])],
            'restingBP': [float(data['restingBP'])],
            'serumcholestrol': [float(data['serumcholestrol'])],
            'fastingbloodsugar': [float(data['fastingbloodsugar'])],
            'restingrelectro': [float(data['restingrelectro'])],
            'maxheartrate': [float(data['maxheartrate'])],
            'exerciseangia': [float(data['exerciseangia'])],
            'oldpeak': [float(data['oldpeak'])],
            'slope': [float(data['slope'])],
            'noofmajorvessels': [float(data['noofmajorvessels'])]
        })
        
        logging.info("Processed input data: %s", input_data)
        
        # Load model and make prediction
        model = load_model()
        if model is None:
            return jsonify({'error': 'Model not available'}), 500
            
        prediction = model.predict(input_data)
        prediction_proba = model.predict_proba(input_data)
        
        result = {
            'prediction': str(prediction[0]),
            'probability': float(prediction_proba[0][1])  # Probability of class 1 (high risk)
        }
        
        logging.info("Prediction result: %s", result)
        return jsonify(result)
    
    except Exception as e:
        logging.error("Error during prediction: %s", traceback.format_exc())
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)