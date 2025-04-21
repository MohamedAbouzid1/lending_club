import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const purposeOptions = [
  'debt_consolidation',
  'credit_card',
  'all_other',
  'home_improvement',
  'small_business',
  'major_purchase',
  'educational',
  'medical',
  'vacation',
  'moving',
  'house',
  'wedding',
  'car',
  'renewable_energy',
];

function LoanPredictionForm() {
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
    publicRecords: 0,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to make prediction');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Loan Default Prediction
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Purpose</InputLabel>
              <Select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                label="Purpose"
              >
                {purposeOptions.map((purpose) => (
                  <MenuItem key={purpose} value={purpose}>
                    {purpose.replace('_', ' ')}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Interest Rate"
              name="interestRate"
              type="number"
              value={formData.interestRate}
              onChange={handleChange}
              inputProps={{ step: "0.01" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Installment"
              name="installment"
              type="number"
              value={formData.installment}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Log Annual Income"
              name="logAnnualIncome"
              type="number"
              value={formData.logAnnualIncome}
              onChange={handleChange}
              inputProps={{ step: "0.1" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="DTI Ratio"
              name="dti"
              type="number"
              value={formData.dti}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="FICO Score"
              name="fico"
              type="number"
              value={formData.fico}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Days with Credit Line"
              name="daysWithCreditLine"
              type="number"
              value={formData.daysWithCreditLine}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Revolving Balance"
              name="revolBal"
              type="number"
              value={formData.revolBal}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Revolving Utilization"
              name="revolUtil"
              type="number"
              value={formData.revolUtil}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Inquiries Last 6 Months"
              name="inquiriesLast6Months"
              type="number"
              value={formData.inquiriesLast6Months}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Delinquencies 2 Years"
              name="delinquencies2Years"
              type="number"
              value={formData.delinquencies2Years}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Public Records"
              name="publicRecords"
              type="number"
              value={formData.publicRecords}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Predict Default Risk'}
          </Button>
        </Box>
      </form>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {result && (
        <Box sx={{ mt: 3 }}>
          <Alert
            severity={
              result.defaultRisk === 'High'
                ? 'error'
                : result.defaultRisk === 'Medium'
                ? 'warning'
                : 'success'
            }
          >
            <Typography variant="h6" gutterBottom>
              Prediction Result
            </Typography>
            <Typography>
              Default Probability: {(result.defaultProbability * 100).toFixed(2)}%
            </Typography>
            <Typography>Risk Level: {result.defaultRisk}</Typography>
            <Typography>Recommendation: {result.recommendation}</Typography>
          </Alert>
        </Box>
      )}
    </Paper>
  );
}

export default LoanPredictionForm; 