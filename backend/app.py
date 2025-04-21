from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import pickle
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Define column names based on the training data
FEATURE_COLUMNS = [
    'credit.policy', 'purpose', 'int.rate', 'installment', 'log.annual.inc',
    'dti', 'fico', 'days.with.cr.line', 'revol.bal', 'revol.util',
    'inq.last.6mths', 'delinq.2yrs', 'pub.rec'
]

# Path to save the model
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'loan_default_model.pkl')

# Function to train and save model (run this when setting up the server)
def train_model():
    # Load the data
    data = pd.read_csv('../data/loan_data_engineered.csv')
    
    # Split features and target
    X = data[FEATURE_COLUMNS]
    y = data['not.fully.paid']
    
    # Define categorical and numeric features
    categorical_features = ['purpose']
    numeric_features = [col for col in FEATURE_COLUMNS if col not in categorical_features]
    
    # Define preprocessing for categorical and numeric data
    categorical_transformer = Pipeline(steps=[
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ])
    
    numeric_transformer = Pipeline(steps=[
        ('scaler', StandardScaler())
    ])
    
    # Combine preprocessing steps
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('cat', categorical_transformer, categorical_features)
        ])
    
    # Create and train pipeline
    model = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
    ])
    
    model.fit(X, y)
    
    # Save the model
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(model, f)
    
    print("Model trained and saved successfully!")
    return model

# Load or train the model
def get_model():
    try:
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        print("Model loaded from file.")
    except (FileNotFoundError, EOFError):
        print("Model file not found. Training new model...")
        model = train_model()
    return model

# Get or load the model
model = get_model()

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.json
        
        # Convert to format expected by the model
        input_data = {
            'credit.policy': data.get('creditPolicy', 1),
            'purpose': data.get('purpose', 'debt_consolidation'),
            'int.rate': data.get('interestRate', 0.12),
            'installment': data.get('installment', 500),
            'log.annual.inc': data.get('logAnnualIncome', 11.0),
            'dti': data.get('dti', 15),
            'fico': data.get('fico', 700),
            'days.with.cr.line': data.get('daysWithCreditLine', 3000),
            'revol.bal': data.get('revolBal', 25000),
            'revol.util': data.get('revolUtil', 50),
            'inq.last.6mths': data.get('inquiriesLast6Months', 0),
            'delinq.2yrs': data.get('delinquencies2Years', 0),
            'pub.rec': data.get('publicRecords', 0)
        }
        
        # Convert to DataFrame with the expected structure
        input_df = pd.DataFrame([input_data], columns=FEATURE_COLUMNS)
        
        # Make prediction
        default_probability = model.predict_proba(input_df)[0][1]
        
        # Determine risk level and recommendation
        if default_probability < 0.1:
            risk_level = "Low"
            recommendation = "Approve"
        elif default_probability < 0.25:
            risk_level = "Medium"
            recommendation = "Approve"
        else:
            risk_level = "High"
            recommendation = "Reject"
        
        # Return result
        return jsonify({
            'success': True,
            'defaultProbability': float(default_probability),
            'defaultRisk': risk_level,
            'recommendation': recommendation
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'message': 'Loan default prediction service is running'
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)