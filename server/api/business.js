const express = require('express');
const router = express.Router();

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateEIN = (ein) => /^\d{2}-\d{7}$/.test(ein);

router.post('/verify', (req, res) => {
    const { step, data } = req.body;

    if (!step || !data) {
        return res.status(400).json({ success: false, message: 'Invalid request data' });
    }

    const errors = {};

    switch (step) {
        case 1: // Validate Business Information
            if (!data.businessName) errors.businessName = 'Business name is required';
            if (!data.ein) {
            errors.ein = 'EIN is required';
            } else if (!validateEIN(data.ein)) {
            errors.ein = 'EIN has an invalid format';
            }
            if (!data.email) {
            errors.email = 'Email is required';
            } else if (!validateEmail(data.email)) {
            errors.email = 'Email has an invalid format';
            }
            if (!data.businessType) errors.businessType = 'Business type is required';
            if (!data.businessAddress) errors.businessAddress = 'Business address is required';
            if (!data.city) errors.city = 'City is required';
            if (!data.state) errors.state = 'State is required';
            if (!data.zip) errors.zip = 'ZIP code is required';
            if (!data.phone) errors.phone = 'Phone number is required';
            if (!data.yearsInBusiness) errors.yearsInBusiness = 'Years in business is required';
            if (!data.employees) errors.employees = 'Number of employees is required';
            break;
        case 2: // Validate Tariff Impact Details
            if (!data.industryType) errors.industryType = 'Industry type is required';
            if (!data.impactDescription) errors.impactDescription = 'Impact description is required';
            if (!data.estimatedImpact) errors.estimatedImpact = 'Estimated impact is required';
            if (!data.impactPercentage) errors.impactPercentage = 'Impact percentage is required';
            if (!data.mitigationEfforts) errors.mitigationEfforts = 'Mitigation efforts are required';
            break;
        case 3: // Validate Grant Request Details
            if (!data.fundAmount) errors.fundAmount = 'Fund amount is required';
            if (!data.fundPurpose) errors.fundPurpose = 'Fund purpose is required';
            if (!data.fundUse) errors.fundUse = 'Fund use is required';
            if (!data.preferredTerm) errors.preferredTerm = 'Preferred term is required';
            if (!data.collateral) errors.collateral = 'Collateral is required';
            if (!data.expectedOutcomes) errors.expectedOutcomes = 'Expected outcomes are required';
            break;
        case 4: // Validate Financial Details
            if (!data.bankName) errors.bankName = 'Bank name is required';
            if (!data.accountNumber) errors.accountNumber = 'Account number is required';
            if (!data.routingNumber) errors.routingNumber = 'Routing number is required';
            if (!data.accountType) errors.accountType = 'Account type is required';
            break;
        case 5: // Validate Documentation
            if (!data.taxReturns) errors.taxReturns = 'Tax returns are required';
            if (!data.financialStatements) errors.financialStatements = 'Financial statements are required';
            if (!data.tariffImpact) errors.tariffImpact = 'Tariff impact is required';
            if (!data.businessPlan) errors.businessPlan = 'Business plan is required';
            if (!data.ownerInfo) errors.ownerInfo = 'Owner information is required';
            if (!data.licenses) errors.licenses = 'Licenses are required';

            if (data.taxReturns && !(data.taxReturns instanceof File)) errors.taxReturns = 'Tax returns have an invalid format';
            if (data.financialStatements && !(data.financialStatements instanceof File)) errors.financialStatements = 'Financial statements have an invalid format';
            if (data.tariffImpact && !(data.tariffImpact instanceof File)) errors.tariffImpact = 'Tariff impact has an invalid format';
            if (data.businessPlan && !(data.businessPlan instanceof File)) errors.businessPlan = 'Business plan has an invalid format';
            if (data.ownerInfo && !(data.ownerInfo instanceof File)) errors.ownerInfo = 'Owner information has an invalid format';
            if (data.licenses && !(data.licenses instanceof File)) errors.licenses = 'Licenses have an invalid format';
            break;
        default:
            return res.status(400).json({ success: false, message: 'Invalid step' });
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, message: 'Validation errors', errors });
    }

    res.json({ success: true, message: 'Business application step validated successfully' });
});

router.post('/submit', (req, res) => {
    res.json({ success: true, message: 'Business application submitted successfully' });
})

module.exports = router;
