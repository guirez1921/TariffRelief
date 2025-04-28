const express = require('express');
const router = express.Router();

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateSSN = (ssn) => /^\d{3}-\d{2}-\d{4}$/.test(ssn);

router.post('/verify', (req, res) => {
    const { step, data } = req.body;

    if (!step || !data) {
        return res.status(400).json({ success: false, message: 'Invalid request data' });
    }

    const errors = [];

    switch (step) {
        case 1: // Validate Personal Information
            if (!data.firstName) errors.push('firstName');
            if (!data.lastName) errors.push('lastName');
            if (!data.ssn) {
                errors.push('ssn');
            } else if (!validateSSN(data.ssn)) {
                errors.push('ssn (invalid format)');
            }
            if (!data.address) errors.push('address');
            if (!data.city) errors.push('city');
            if (!data.state) errors.push('state');
            if (!data.zip) errors.push('zip');
            if (!data.phone) errors.push('phone');
            if (!data.email) {
                errors.push('email');
            } else if (!validateEmail(data.email)) {
                errors.push('email (invalid format)');
            }
            break;
        case 2: // Validate Financial Details
            if (!data.annualIncome) errors.push('annualIncome');
            if (!data.assets) errors.push('assets');
            if (!data.liabilities) errors.push('liabilities');
            if (!data.bankName) errors.push('bankName');
            if (!data.accountNumber) errors.push('accountNumber');
            if (!data.routingNumber) errors.push('routingNumber');
            if (!data.accountType) errors.push('accountType');
            break;
        case 3: // Validate Documentation
            if (!data.idProof) errors.push('idProof');
            if (!data.incomeProof) errors.push('incomeProof');
            if (!data.tariffImpactProof) errors.push('tariffImpactProof');

            if (data.idProof && !(data.idProof instanceof File)) errors.push('idProof (invalid format)');
            if (data.incomeProof && !(data.incomeProof instanceof File)) errors.push('incomeProof (invalid format)');
            if (data.tariffImpactProof && !(data.tariffImpactProof instanceof File)) errors.push('tariffImpactProof (invalid format)');
            break;
        default:
            return res.status(400).json({ success: false, message: 'Invalid step' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: 'Validation errors', errors });
    }

    res.json({ success: true, message: 'Individual application step validated successfully' });
});

router.post('/submit', (req, res) => {
    res.json({ success: true, message: 'Business application submitted successfully' });
})

module.exports = router;
