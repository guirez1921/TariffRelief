const express = require('express');
const fileUpload = require('express-fileupload');
const mega = require('megajs');
const router = express.Router();
const { Readable } = require('stream'); // Import Readable stream

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateEIN = (ein) => /^\d{2}-\d{7}$/.test(ein);
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

// Wait for MEGA storage to be ready
let isMegaReady = false;
megaStorage.on('ready', () => {
    console.log('MEGA storage is ready');
    isMegaReady = true;
});

megaStorage.on('error', (err) => {
    console.error('Error initializing MEGA storage:', err);
});

// Middleware to ensure MEGA storage is ready
const ensureMegaReady = (req, res, next) => {
    if (!isMegaReady) {
        return res.status(503).json({ success: false, message: 'MEGA storage is not ready. Please try again later.' });
    }
    next();
};

router.post('/verify', ensureMegaReady, async (req, res) => {
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
                // Validate Business Information
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
                if (!data.zip) {
                    errors.zip = 'ZIP code is required';
                } else if (!validateZIP(data.zip)) {
                    errors.zip = 'ZIP code has an invalid format';
                }
                if (!data.phone) errors.phone = 'Phone number is required';
                if (!data.yearsInBusiness) errors.yearsInBusiness = 'Years in business is required';
                if (!data.employees) {
                    errors.employees = 'Number of employees is required';
                } else if (data.employees >= 200) {
                    errors.employees = 'Number of employees must be less than 200';
                }
                break;
            case 2:
                // Validate Tariff Impact Details
                if (!data.industryType) errors.industryType = 'Industry type is required';
                if (!data.impactDescription) errors.impactDescription = 'Impact description is required';
                if (!data.estimatedImpact) errors.estimatedImpact = 'Estimated impact is required';
                if (!data.impactPercentage) errors.impactPercentage = 'Impact percentage is required';
                if (!data.mitigationEfforts) errors.mitigationEfforts = 'Mitigation efforts are required';
                break;
            case 3:
                // Validate Grant Request Details
                if (!data.fundAmount) {
                    errors.fundAmount = 'Fund amount is required';
                } else if (data.fundAmount > 2000000) {
                    errors.fundAmount = 'Fund amount cannot exceed 2 million dollars';
                }
                if (!data.fundPurpose) errors.fundPurpose = 'Fund purpose is required';
                if (!data.fundUse) errors.fundUse = 'Fund use is required';
                if (!data.preferredTerm) errors.preferredTerm = 'Preferred term is required';
                if (data.fundAmount > 350000 && !data.collateral) {
                    errors.collateral = 'Collateral is required if fund amount exceeds 350 thousand dollars';
                }
                if (!data.expectedOutcomes) errors.expectedOutcomes = 'Expected outcomes are required';
                break;
            case 4:
                // Validate Financial Details
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
            case 5:
                // Validate Documentation
                const requiredFiles = ['taxReturns', 'financialStatements', 'tariffImpact', 'businessPlan', 'ownerInfo', 'licenses'];
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

        res.json({ success: true, message: 'Business application step validated successfully' });
    } catch (error) {
        console.error('Error during validation:', error);
        res.status(500).json({ success: false, message: 'An error occurred during validation' });
    }
});

router.post('/submit', async (req, res) => {
    try {
        const data = req.body;
        const files = req.files || {};

        // Create a new folder in MEGA
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const folderName = `business_application_${timestamp}`;
        const megaFolder = await new Promise((resolve, reject) => {
            megaStorage.mkdir(folderName, (err, folder) => {
                if (err) reject(err);
                else resolve(folder);
            });
        });

        // Save JSON data into the folder
        const jsonData = JSON.stringify(data);
        // const jsonFileName = `${folderName}/data.json`;
        const jsonStream = Readable.from(jsonData);
        const megaJsonFile = megaFolder.upload({ name: 'data.json' });
        jsonStream.pipe(megaJsonFile);

        await new Promise((resolve, reject) => {
            megaJsonFile.on('complete', resolve);
            megaJsonFile.on('error', reject);
        });

        // Save files into the folder
        for (const [key, file] of Object.entries(files)) {
            const fileStream = Readable.from(file.data);
            const megaFile = megaFolder.upload({ name: file.name });
            fileStream.pipe(megaFile);

            await new Promise((resolve, reject) => {
                megaFile.on('complete', resolve);
                megaFile.on('error', reject);
            });
        }

        res.json({ success: true, message: 'Business application submitted and saved to MEGA successfully' });
    } catch (error) {
        console.error('Error during submission:', error);
        res.status(500).json({ success: false, message: 'An error occurred during submission' });
    }
});

module.exports = router;
