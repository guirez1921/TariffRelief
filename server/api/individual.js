const express = require('express');
const router = express.Router();

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateSSN = (ssn) => /^\d{3}-\d{2}-\d{4}$/.test(ssn);
const validateZIP = (zip) => /^\d{5}(-\d{4})?$/.test(zip);

router.post('/verify', (req, res) => {
    const { step, data } = req.body;

    if (!step || !data) {
        return res.status(200).json({ success: false, message: 'Invalid request data' });
    }

    const errors = {};

    switch (step) {
        case 1: // Validate Personal Information
            if (!data.firstName) errors.firstName = 'FirstName is required';
            if (!data.lastName) errors.lastName = 'Last name is required';
            if (!data.ssn) {
                errors.ssn = 'SSN is required';
            } else if (!validateSSN(data.ssn)) {
                errors.ssn = 'SSN is in an invalid format';
            }
            if (!data.address) errors.address = 'Address is required';
            if (!data.city) errors.city = 'City is required';
            if (!data.state) errors.state = 'State is required';
            if (!data.zip) {
                errors.zip = 'ZIP code is required';
            } else if (!validateZIP(data.zip)) {
                errors.zip = 'ZIP code is in an invalid format';
            }
            if (!data.phone) errors.phone = 'Phone number is required';
            if (!data.email) {
                errors.email = 'Email is required';
            } else if (!validateEmail(data.email)) {
                errors.email = 'Email is in an invalid format';
            }
            break;
        case 2: // Validate Financial Details
            if (!data.annualIncome) errors.annualIncome = 'Annual income is required';
            if (!data.assets) errors.assets = 'Assets are required';
            if (!data.liabilities) errors.liabilities = 'Liabilities are required';
            if (!data.bankName) errors.bankName = 'Bank name is required';
            if (!data.accountNumber) errors.accountNumber = 'Account number is required';
            if (!data.routingNumber) errors.routingNumber = 'Routing number is required';
            if (!data.accountType) errors.accountType = 'Account type is required';
            break;
        case 3: // Validate Documentation
            if (!data.idProof) errors.idProof = 'ID Proof is required';
            if (!data.incomeProof) errors.incomeProof = 'Income Proof is required';
            if (!data.tariffImpactProof) errors.tariffImpactProof = 'Tariff Impact Proof is required';

            if (data.idProof && (!data.idProof.name.endsWith('.pdf'))) errors.idProof = 'ID Proof must be in PDF format';
            if (data.incomeProof && (!data.incomeProof.name.endsWith('.pdf'))) errors.incomeProof = 'Income Proof must be in PDF format';
            if (data.tariffImpactProof && (!data.tariffImpactProof.name.endsWith('.pdf'))) errors.tariffImpactProof = 'Tariff Impact Proof must be in PDF format';
            break;
        default:
            return res.status(200).json({ success: false, message: 'Invalid step' });
    }

    if (Object.keys(errors).length > 0) {
        return res.status(200).json({ success: false, message: 'Validation errors', errors });
    }

    res.json({ success: true, message: 'Individual application step validated successfully' });
});

router.post('/submit', (req, res) => {
    res.json({ success: true, message: 'Business application submitted successfully' });
})

module.exports = router;
