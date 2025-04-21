import React, { useState } from 'react';

const LoanDefaultPredictor = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    creditPolicy: 1,
    purpose: 'debt_consolidation',
    interestRate: 0.12,
    installment: 500,
    logAnnualIncome: 11.0,
    dti: 15,
    fico: 700,
    daysWithCreditLine: 3000,
    revolBal: 25000,
    revolUtil: 50,
    inquiriesLast6Months: 0,
    delinquencies2Years: 0,
    publicRecords: 0
  });

  // State for prediction result
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'purpose' ? value : parseFloat(value)
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real application, this would make an API call to your backend
    // For now, we'll simulate a prediction using a simple heuristic
    setTimeout(() => {
      // This is a simplified prediction logic - replace with your actual model
      const ficoScore = formData.fico;
      const dti = formData.dti;
      const interestRate = formData.interestRate;
      
      let defaultRisk;
      if (ficoScore > 720 && dti < 10 && interestRate < 0.10) {
        defaultRisk = 0.05; // 5% chance of default
      } else if (ficoScore > 680 && dti < 25 && interestRate < 0.15) {
        defaultRisk = 0.15; // 15% chance of default
      } else if (ficoScore > 620 && dti < 35 && interestRate < 0.20) {
        defaultRisk = 0.30; // 30% chance of default
      } else {
        defaultRisk = 0.60; // 60% chance of default
      }
      
      setPrediction({
        defaultProbability: defaultRisk,
        defaultRisk: defaultRisk > 0.25 ? 'High' : defaultRisk > 0.10 ? 'Medium' : 'Low',
        recommendation: defaultRisk > 0.25 ? 'Reject' : 'Approve'
      });
      
      setLoading(false);
    }, 1500);
  };

  // Purpose options based on your data
  const purposeOptions = [
    'debt_consolidation',
    'credit_card',
    'all_other',
    'home_improvement',
    'small_business',
    'major_purchase',
    'educational'
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-700">Loan Default Predictor</h1>
        <p className="text-gray-600 mt-2">Enter loan application details to predict default risk</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Loan Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {purposeOptions.map(option => (
                      <option key={option} value={option}>
                        {option.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="interestRate"
                      value={formData.interestRate}
                      onChange={handleChange}
                      step="0.01"
                      min="0.01"
                      max="0.35"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                      %
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Installment ($)</label>
                  <input
                    type="number"
                    name="installment"
                    value={formData.installment}
                    onChange={handleChange}
                    min="50"
                    max="2000"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credit Policy</label>
                  <select
                    name="creditPolicy"
                    value={formData.creditPolicy}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value={1}>Meets Credit Policy</option>
                    <option value={0}>Does Not Meet Credit Policy</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Applicant Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">FICO Score</label>
                  <input
                    type="number"
                    name="fico"
                    value={formData.fico}
                    onChange={handleChange}
                    min="300"
                    max="850"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Log Annual Income</label>
                  <input
                    type="number"
                    name="logAnnualIncome"
                    value={formData.logAnnualIncome}
                    onChange={handleChange}
                    step="0.1"
                    min="9"
                    max="15"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Debt-to-Income Ratio</label>
                  <input
                    type="number"
                    name="dti"
                    value={formData.dti}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    max="50"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Days with Credit Line</label>
                  <input
                    type="number"
                    name="daysWithCreditLine"
                    value={formData.daysWithCreditLine}
                    onChange={handleChange}
                    min="0"
                    max="10000"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Credit History</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Revolving Balance</label>
                  <input
                    type="number"
                    name="revolBal"
                    value={formData.revolBal}
                    onChange={handleChange}
                    min="0"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Revolving Utilization (%)</label>
                  <input
                    type="number"
                    name="revolUtil"
                    value={formData.revolUtil}
                    onChange={handleChange}
                    step="0.1"
                    min="0"
                    max="100"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Inquiries (Last 6 Months)</label>
                  <input
                    type="number"
                    name="inquiriesLast6Months"
                    value={formData.inquiriesLast6Months}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delinquencies (Last 2 Years)</label>
                  <input
                    type="number"
                    name="delinquencies2Years"
                    value={formData.delinquencies2Years}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Public Records</label>
                  <input
                    type="number"
                    name="publicRecords"
                    value={formData.publicRecords}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                {loading ? 'Analyzing...' : 'Predict Default Risk'}
              </button>
            </div>
          </form>
        </div>
        
        <div>
          <div className="bg-gray-50 p-4 rounded-lg sticky top-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Prediction Results</h2>
            
            {prediction ? (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className={`inline-block rounded-full p-6 ${
                    prediction.defaultRisk === 'High' ? 'bg-red-100' :
                    prediction.defaultRisk === 'Medium' ? 'bg-yellow-100' : 'bg-green-100'
                  }`}>
                    <div className={`text-4xl font-bold ${
                      prediction.defaultRisk === 'High' ? 'text-red-600' :
                      prediction.defaultRisk === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {Math.round(prediction.defaultProbability * 100)}%
                    </div>
                  </div>
                  <div className="mt-2 font-medium">Default Probability</div>
                </div>
                
                <div className="bg-white p-3 rounded-md border">
                  <div className="text-sm text-gray-600">Risk Category</div>
                  <div className={`font-semibold ${
                    prediction.defaultRisk === 'High' ? 'text-red-600' :
                    prediction.defaultRisk === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {prediction.defaultRisk} Risk
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-md border">
                  <div className="text-sm text-gray-600">Recommendation</div>
                  <div className={`font-semibold ${
                    prediction.recommendation === 'Reject' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {prediction.recommendation} Loan
                  </div>
                </div>
                
                <div className="mt-6 text-sm text-gray-500">
                  * This prediction is based on historical data patterns and should be used as one factor in the decision-making process.
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                {loading ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                    <p>Analyzing loan data...</p>
                  </div>
                ) : (
                  <p>Fill out the form and click "Predict Default Risk" to see results</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDefaultPredictor;