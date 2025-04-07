# Loan Default Prediction

A machine learning project to predict the probability of loan defaults using historical lending data.

## Project Overview

This project builds a predictive model to identify potential loan defaults before they occur. Using a dataset containing loan applicant information, loan characteristics, and repayment outcomes, we develop a classification model that financial institutions can use to make more informed lending decisions and optimize their risk management strategies.

Dataset source: [Kaggle](https://www.kaggle.com/datasets/urstrulyvikas/lending-club-loan-data-analysis)

## Dataset

The dataset (`loan_data.csv`) contains 9,578 loans with 14 features:

- **credit.policy**: Whether the customer meets credit underwriting criteria
- **purpose**: The purpose of the loan (debt consolidation, credit card, etc.)
- **int.rate**: Interest rate on the loan
- **installment**: Monthly payment amount
- **log.annual.inc**: Log of the applicant's annual income
- **dti**: Debt-to-income ratio
- **fico**: FICO credit score
- **days.with.cr.line**: Number of days with credit line
- **revol.bal**: Revolving balance
- **revol.util**: Revolving line utilization rate
- **inq.last.6mths**: Number of inquiries in the last 6 months
- **delinq.2yrs**: Number of delinquencies in the past 2 years
- **pub.rec**: Number of public records
- **not.fully.paid**: Target variable - whether the loan was not fully paid (1) or fully paid (0)

## Project Structure

```
lending_club/
│
├── data/
│   ├── loan_data.csv                      # Original dataset
│   ├── loan_data_engineered.csv           # Dataset with engineered features
│   ├── X_train_processed.npy              # Processed training features
│   ├── X_test_processed.npy               # Processed test features
│   ├── y_train.npy                        # Training target values
│   ├── y_test.npy                         # Test target values
│   └── selected_features.txt              # List of selected features
│
├── models/
│   ├── preprocessor.pkl                   # Saved preprocessor pipeline
│   └── final_loan_default_model.pkl       # Final tuned model with optimal threshold
│
├── notebooks/
│   ├── EDA.ipynb  # Initial data exploration
│   ├── feature_engineering.ipynb        # Feature creation
│   ├── feature_selection.ipynb             # Selection
│   └── model_building.ipynb           # Model development, tuning and evaluatio
│
├── notebooks/figures/
│
└── README.md                              # Project documentation
```

## Key Findings

- **Default Rate**: The overall default rate in the dataset is 16.01%
- **Key Predictors**: The most important features predicting loan default are:
  - FICO score
  - Interest rate
  - Loan purpose (with small business loans being the riskiest)
  - Debt-to-income ratio
  - Revolving utilization rate
- **Model Performance**: The Logistic Regression model achieved:
  - check the model_building notebook

## Installation and Setup

1. Clone this repository:

```
git clone https://github.com/yourusername/loan-default-prediction.git
cd loan-default-prediction
```

2. Create and activate a virtual environment:

```
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install the required packages:
   will be added later

```
pip install -r requirements.txt
```

## Usage

### Using the Model for Predictions

```python
import joblib
import pandas as pd
import numpy as np

# Load the model package
model_package = joblib.load('models/final_loan_default_model.pkl')
model = model_package['model']
optimal_threshold = model_package['optimal_threshold']
feature_names = model_package['feature_names']

# Load preprocessor
preprocessor = joblib.load('models/preprocessor.pkl')

# Load and prepare new data
new_loan_data = pd.read_csv('new_applications.csv')
# Apply same feature engineering steps...

# Preprocess the data
X_new = preprocessor.transform(new_loan_data)

# Get default probabilities
default_probabilities = model.predict_proba(X_new)[:, 1]

# Apply optimal threshold for decisions
loan_decisions = (default_probabilities < optimal_threshold).astype(int)
# 1 = Approve, 0 = Reject
```

## Future Improvements

1. **Threshold Adjustment**: Refine the decision threshold to balance risk and return
2. **Feature Engineering**: Create more sophisticated features capturing loan risk
3. **Advanced Models**: Experiment with more complex models like gradient boosting
4. **Segmented Models**: Develop separate models for different loan purposes or amounts
5. **Economic Scenarios**: Build models for different economic conditions

## Dependencies

- Python 3.8+
- pandas
- numpy
- scikit-learn
- matplotlib
- seaborn
- joblib
- imbalanced-learn (for SMOTE)

## Contributors

- Mohamed Abouzid

## License

This project is licensed under the MIT License - see the LICENSE file for details.
