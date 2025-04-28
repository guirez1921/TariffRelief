const express = require('express');
const router = express.Router();

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateEIN = (ein) => /^\d{2}-\d{7}$/.test(ein);

router.post('/verify', (req, res) => {
    const { step, data } = req.body;

    if (!step || !data) {
        return res.status(400).json({ success: false, message: 'Invalid request data' });
    }

    const errors = [];

    switch (step) {
        case 1: // Validate Business Information
            if (!data.businessName) errors.push('businessName');
            if (!data.ein) {
                errors.push('ein');
            } else if (!validateEIN(data.ein)) {
                errors.push('ein (invalid format)');
            }
            if (!data.email) {
                errors.push('email');
            } else if (!validateEmail(data.email)) {
                errors.push('email (invalid format)');
            }
            if (!data.businessType) errors.push('businessType');
            if (!data.businessAddress) errors.push('businessAddress');
            if (!data.city) errors.push('city');
            if (!data.state) errors.push('state');
            if (!data.zip) errors.push('zip');
            if (!data.phone) errors.push('phone');
            if (!data.yearsInBusiness) errors.push('yearsInBusiness');
            if (!data.employees) errors.push('employees');
            break;
        case 2: // Validate Tariff Impact Details
            if (!data.industryType) errors.push('industryType');
            if (!data.impactDescription) errors.push('impactDescription');
            if (!data.estimatedImpact) errors.push('estimatedImpact');
            if (!data.impactPercentage) errors.push('impactPercentage');
            if (!data.mitigationEfforts) errors.push('mitigationEfforts');
            break;
        case 3: // Validate Grant Request Details
            if (!data.fundAmount) errors.push('fundAmount');
            if (!data.fundPurpose) errors.push('fundPurpose');
            if (!data.fundUse) errors.push('fundUse');
            if (!data.preferredTerm) errors.push('preferredTerm');
            if (!data.collateral) errors.push('collateral');
            if (!data.expectedOutcomes) errors.push('expectedOutcomes');
            break;
        case 4: // Validate Financial Details
            if (!data.bankName) errors.push('bankName');
            if (!data.accountNumber) errors.push('accountNumber');
            if (!data.routingNumber) errors.push('routingNumber');
            if (!data.accountType) errors.push('accountType');
            break;
        case 5: // Validate Documentation
            if (!data.taxReturns) errors.push('taxReturns');
            if (!data.financialStatements) errors.push('financialStatements');
            if (!data.tariffImpact) errors.push('tariffImpact');
            if (!data.businessPlan) errors.push('businessPlan');
            if (!data.ownerInfo) errors.push('ownerInfo');
            if (!data.licenses) errors.push('licenses');

            if (data.taxReturns && !(data.taxReturns instanceof File)) errors.push('taxReturns (invalid format)');
            if (data.financialStatements && !(data.financialStatements instanceof File)) errors.push('financialStatements (invalid format)');
            if (data.tariffImpact && !(data.tariffImpact instanceof File)) errors.push('tariffImpact (invalid format)');
            if (data.businessPlan && !(data.businessPlan instanceof File)) errors.push('businessPlan (invalid format)');
            if (data.ownerInfo && !(data.ownerInfo instanceof File)) errors.push('ownerInfo (invalid format)');
            if (data.licenses && !(data.licenses instanceof File)) errors.push('licenses (invalid format)');
            break;
        default:
            return res.status(400).json({ success: false, message: 'Invalid step' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ success: false, message: 'Validation errors', errors });
    }

    res.json({ success: true, message: 'Business application step validated successfully' });
});

router.post('/submit', (req, res) => {
    res.json({ success: true, message: 'Business application submitted successfully' });
})

module.exports = router;
