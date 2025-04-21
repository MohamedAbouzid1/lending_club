# Loan Default Prediction System

This is a web application for predicting loan default risk using machine learning. The system consists of a React frontend and a Flask backend.

## Features

- User-friendly interface for entering loan application details
- Real-time prediction of loan default risk
- Risk level classification (Low, Medium, High)
- Clear recommendations based on prediction results

## Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

## Setup and Installation

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required Python packages:

   ```bash
   pip install flask flask-cors pandas numpy scikit-learn
   ```

4. Start the backend server:
   ```bash
   python app.py
   ```

The backend server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the required npm packages:

   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

The frontend application will run on http://localhost:3000

## Usage

1. Open your web browser and navigate to http://localhost:3000
2. Fill in the loan application details in the form
3. Click the "Predict Default Risk" button
4. View the prediction results, including:
   - Default probability
   - Risk level
   - Recommendation

## API Endpoints

- `POST /api/predict`: Submit loan application data and receive prediction
- `GET /api/health`: Check if the service is running

## Model Information

The prediction model is a Random Forest classifier trained on historical loan data. It takes into account various factors including:

- Credit policy
- Loan purpose
- Interest rate
- Installment amount
- Annual income
- Debt-to-income ratio
- FICO score
- Credit history
- Revolving balance and utilization
- Recent inquiries
- Delinquencies
- Public records

## License

This project is licensed under the MIT License - see the LICENSE file for details.
