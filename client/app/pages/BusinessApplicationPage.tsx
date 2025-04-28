import React, { useState } from 'react';
import axios from 'axios';
import { CheckCircleIcon, AlertCircleIcon, ChevronRightIcon, PhoneIcon, MailIcon } from 'lucide-react';
import Button from '~/components/ui/Button';
import VideoModal from '~/components/ui/VideoModal';
export default function ApplicationPage() {
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

  const [formData, setFormData] = useState({
    businessName: '',
    dba: '',
    ein: '',
    businessType: '',
    businessAddress: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    yearsInBusiness: '',
    employees: '',
    industryType: '',
    impactDescription: '',
    impactAspects: [],
    estimatedImpact: '',
    impactPercentage: '',
    mitigationEfforts: '',
    fundAmount: '',
    fundPurpose: '',
    fundUse: '',
    preferredTerm: '',
    collateral: '',
    expectedOutcomes: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    accountType: ''
  });

  type FileState = {
    taxReturns: File | null;
    financialStatements: File | null;
    tariffImpact: File | null;
    businessPlan: File | null;
    ownerInfo: File | null;
    licenses: File | null;
  };

  const [files, setFiles] = useState<FileState>({
    taxReturns: null,
    financialStatements: null,
    tariffImpact: null,
    businessPlan: null,
    ownerInfo: null,
    licenses: null,
  });

  const handleNextStep = async () => {
    try {
      setLoading(true); // Start loader
      const stepData = step === 1
        ? {
          businessName: formData.businessName,
          dba: formData.dba,
          ein: formData.ein,
          businessType: formData.businessType,
          businessAddress: formData.businessAddress,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          phone: formData.phone,
          email: formData.email,
          yearsInBusiness: formData.yearsInBusiness,
          employees: formData.employees,
        }
        : step === 2
          ? {
            industryType: formData.industryType,
            impactDescription: formData.impactDescription,
            impactAspects: formData.impactAspects,
            estimatedImpact: formData.estimatedImpact,
            impactPercentage: formData.impactPercentage,
            mitigationEfforts: formData.mitigationEfforts,
          }
          : step === 3
            ? {
              fundAmount: formData.fundAmount,
              fundPurpose: formData.fundPurpose,
              fundUse: formData.fundUse,
              preferredTerm: formData.preferredTerm,
              collateral: formData.collateral,
              expectedOutcomes: formData.expectedOutcomes,
            }
            : step === 4
              ? {
                bankName: formData.bankName,
                accountNumber: formData.accountNumber,
                routingNumber: formData.routingNumber,
                accountType: formData.accountType,
              }
              : files;

      const response = await axios.post('https://tariff-relief-server.vercel.app/api/business/verify', {
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

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true); // Start loader
      const response = await axios.post('https://tariff-relief-server.vercel.app/api/business/submit', {
        formData: formData,
        files: files,
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
          <h2 className="text-2xl font-bold mb-4">
            Application Submitted Successfully!
          </h2>
          <p className="text-lg mb-6">
            Thank you for applying to the SME Tariff Relief Program. Your
            grant application has been received and will be reviewed by our team.
          </p>
          <div className="mb-6">
            <p className="font-medium">Application Reference Number:</p>
            <p className="text-xl font-bold">
              SME-{Math.floor(100000 + Math.random() * 900000)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-md mb-6 text-left">
            <h3 className="font-bold mb-2">Next Steps:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                You will receive a confirmation email with your application
                details.
              </li>
              <li>
                A program representative will contact you within 3-5 business
                days to discuss your application.
              </li>
              <li>
                You may be asked to provide additional documentation to support
                your application.
              </li>
              <li>
                Final decisions are typically made within 30-45 days of
                application submission.
              </li>
            </ol>
          </div>
          <Button href="/" variant="primary">
            Return to Homepage
          </Button>
        </div>
      );
    }
    switch (step) {
      case 1:
        function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void {
          const { id, value } = event.target;
          setFormData((prevFormData: typeof formData) => ({
            ...prevFormData,
            [id]: value,
          }));
        }

        return (
          <>
            <h2 className="text-xl font-bold mb-6">Business Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="businessName" className="block font-medium mb-1">
                    Legal Business Name *
                  </label>
                  <input type="text" id="businessName" value={formData.businessName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="dba" className="block font-medium mb-1">
                    DBA (if applicable)
                  </label>
                  <input type="text" id="dba" value={formData.dba} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ein" className="block font-medium mb-1">
                    EIN/Tax ID *
                  </label>
                  <input type="text" id="ein" value={formData.ein} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="businessType" className="block font-medium mb-1">
                    Business Type *
                  </label>
                  <select id="businessType" value={formData.businessType} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Select business type</option>
                    <option value="sole_proprietorship">
                      Sole Proprietorship
                    </option>
                    <option value="partnership">Partnership</option>
                    <option value="llc">LLC</option>
                    <option value="corporation">Corporation</option>
                    <option value="s_corporation">S Corporation</option>
                    <option value="non_profit">Non-Profit</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="businessAddress" className="block font-medium mb-1">
                  Business Address *
                </label>
                <input type="text" id="businessAddress" value={formData.businessAddress} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block font-medium mb-1">
                    City *
                  </label>
                  <input type="text" id="city" value={formData.city} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="state" className="block font-medium mb-1">
                    State *
                  </label>
                  <select id="state" value={formData.state} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Select state</option>
                    {state.map(({ key, name }) => (
                      <option key={key} value={key}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="zip" className="block font-medium mb-1">
                    ZIP Code *
                  </label>
                  <input type="text" id="zip" value={formData.zip} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block font-medium mb-1">
                    Business Phone *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">+1</span>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block font-medium mb-1">
                    Business Email *
                  </label>
                  <input type="email" id="email" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="yearsInBusiness" className="block font-medium mb-1">
                    Years in Business *
                  </label>
                  <input type="number" id="yearsInBusiness" value={formData.yearsInBusiness} onChange={handleInputChange} min="2" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label htmlFor="employees" className="block font-medium mb-1">
                    Number of Employees *
                  </label>
                  <input type="number" id="employees" value={formData.employees} onChange={handleInputChange} min="1" max="500" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button onClick={handleNextStep} variant="primary">
                Next: Tariff Impact{' '}
                <ChevronRightIcon size={16} className="ml-1" />
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-xl font-bold mb-6">
              Tariff Impact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="industryType" className="block font-medium mb-1">
                  Primary Industry *
                </label>
                <select id="industryType" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option value="">Select industry</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="construction">Construction</option>
                  <option value="technology">Technology</option>
                  <option value="services">Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="impactDescription" className="block font-medium mb-1">
                  Describe how Chinese tariffs have impacted or will impact your
                  business *
                </label>
                <textarea id="impactDescription" rows={4} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Which aspects of your business have been affected by tariffs?
                  *
                </label>
                <div className="space-y-2">
                  {['Increased cost of materials or goods', 'Supply chain disruptions', 'Reduced profit margins', 'Loss of customers or sales', 'Increased competition from businesses not affected by tariffs', 'Need to find alternative suppliers', 'Other'].map((option, index) => <div key={index} className="flex items-center">
                    <input type="checkbox" id={`impact-${index}`} className="mr-2" />
                    <label htmlFor={`impact-${index}`}>{option}</label>
                  </div>)}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="estimatedImpact" className="block font-medium mb-1">
                    Estimated Financial Impact (Annual) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2">$</span>
                    <input type="number" id="estimatedImpact" value={formData.estimatedImpact} onChange={handleInputChange} min="0" className="w-full border border-gray-300 rounded-md px-3 py-2 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="impactPercentage" className="block font-medium mb-1">
                    Impact as % of Annual Revenue *
                  </label>
                  <div className="relative">
                    <input type="number" id="impactPercentage" value={formData.impactPercentage} onChange={handleInputChange} min="0" max="100" className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    <span className="absolute right-3 top-2">%</span>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="mitigationEfforts" className="block font-medium mb-1">
                  Describe any steps already taken to mitigate tariff impacts *
                </label>
                <textarea id="mitigationEfforts" rows={3} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <Button onClick={handlePrevStep} variant="outline">
                Previous
              </Button>
              <Button onClick={handleNextStep} variant="primary">
                Next: Grant Request{' '}
                <ChevronRightIcon size={16} className="ml-1" />
              </Button>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-xl font-bold mb-6">Grant Request Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="fundAmount" className="block font-medium mb-1">
                  Requested Grant*
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2">$</span>
                  <input type="number" id="fundAmount" min="50000" max="2000000" className="w-full border border-gray-300 rounded-md px-3 py-2 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Funding range from $50,000 to $2,000,000
                </p>
              </div>
              <div>
                <label htmlFor="fundPurpose" className="block font-medium mb-1">
                  Primary Purpose of Grant *
                </label>
                <select id="fundPurpose" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                  <option value="">Select purpose</option>
                  <option value="supply_chain">
                    Supply Chain Diversification
                  </option>
                  <option value="equipment">Equipment Purchase</option>
                  <option value="facility">Facility Modifications</option>
                  <option value="working_capital">Working Capital</option>
                  <option value="technology">Technology Upgrades</option>
                  <option value="training">Staff Training</option>
                  <option value="research">Research and Development</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="fundUse" className="block font-medium mb-1">
                  Detailed Explanation of How Funds Will Be Used *
                </label>
                <textarea id="fundUse" rows={4} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredTerm" className="block font-medium mb-1">
                    Grant Spending Tenure
                  </label>
                  <select id="preferredTerm" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Select term</option>
                    <option value="5">5 years</option>
                    <option value="7">7 years</option>
                    <option value="10">10 years</option>
                    <option value="15">15 years</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="collateral" className="block font-medium mb-1">
                    Available Collateral
                  </label>
                  <input type="text" id="collateral" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label htmlFor="expectedOutcomes" className="block font-medium mb-1">
                  Expected Outcomes from Grant Funding *
                </label>
                <textarea id="expectedOutcomes" rows={3} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <Button onClick={handlePrevStep} variant="outline">
                Previous
              </Button>
              <Button onClick={handleNextStep} variant="primary">
                Next: Financial Details{' '}
                <ChevronRightIcon size={16} className="ml-1" />
              </Button>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="text-xl font-bold mb-6">Financial Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="bankName" className="block font-medium mb-1">
                  Bank Name *
                </label>
                <input
                  type="text"
                  id="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="accountNumber" className="block font-medium mb-1">
                  Account Number *
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="routingNumber" className="block font-medium mb-1">
                  Routing Number *
                </label>
                <input
                  type="text"
                  id="routingNumber"
                  value={formData.routingNumber}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="accountType" className="block font-medium mb-1">
                  Account Type *
                </label>
                <select
                  id="accountType"
                  value={formData.accountType}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select account type</option>
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <Button onClick={handlePrevStep} variant="outline">
                Previous
              </Button>
              <Button onClick={handleNextStep} variant="primary">
                Next: Documentation{' '}
                <ChevronRightIcon size={16} className="ml-1" />
              </Button>
            </div>
          </>
        );
      case 5:
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
                <label htmlFor="taxReturns" className="block font-medium mb-1">
                  Business Tax Returns (Last 2 Years) *
                </label>
                <input type="file" id="taxReturns" accept=".pdf" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                <p className="text-sm text-gray-500 mt-1">
                  Upload complete business tax returns, including all schedules.
                </p>
              </div>
              <div>
                <label htmlFor="financialStatements" className="block font-medium mb-1">
                  Financial Statements *
                </label>
                <input type="file" id="financialStatements" accept=".pdf" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                <p className="text-sm text-gray-500 mt-1">
                  Include balance sheet and profit & loss statement for the
                  current year.
                </p>
              </div>
              <div>
                <label htmlFor="tariffImpact" className="block font-medium mb-1">
                  Proof of Tariff Impact *
                </label>
                <input type="file" id="tariffImpact" accept=".pdf" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                <p className="text-sm text-gray-500 mt-1">
                  Upload import records, supplier communications, or other
                  documentation showing tariff impact.
                </p>
              </div>
              <div>
                <label htmlFor="businessPlan" className="block font-medium mb-1">
                  Business Plan for Fund Usage *
                </label>
                <input type="file" id="businessPlan" accept=".pdf" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                <p className="text-sm text-gray-500 mt-1">
                  Detailed plan explaining how grant funds will be used to
                  address tariff impacts.
                </p>
              </div>
              <div>
                <label htmlFor="ownerInfo" className="block font-medium mb-1">
                  Owner Information (20%+ ownership) *
                </label>
                <input type="file" id="ownerInfo" accept=".pdf" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                <p className="text-sm text-gray-500 mt-1">
                  Personal financial statements for all owners with 20% or
                  greater ownership.
                </p>
              </div>
              <div>
                <label htmlFor="licenses" className="block font-medium mb-1">
                  Business Licenses and Registrations *
                </label>
                <input type="file" id="licenses" accept=".pdf" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                <p className="text-sm text-gray-500 mt-1">
                  Current business licenses, permits, and registration
                  documents.
                </p>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <Button onClick={handlePrevStep} variant="outline">
                Previous
              </Button>
              <Button onClick={handleNextStep} variant="primary">
                Next: Review & Submit{' '}
                <ChevronRightIcon size={16} className="ml-1" />
              </Button>
            </div>
          </>
        );
      case 6:
        return (
          <>
            <h2 className="text-xl font-bold mb-6">
              Review & Submit Application
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-bold mb-4">Application Summary</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700">
                    Business Information
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="text-sm text-gray-500">Business Name:</div>
                    <div className="text-sm">Sample Business LLC</div>
                    <div className="text-sm text-gray-500">Business Type:</div>
                    <div className="text-sm">LLC</div>
                    <div className="text-sm text-gray-500">
                      Years in Business:
                    </div>
                    <div className="text-sm">5</div>
                    <div className="text-sm text-gray-500">Employees:</div>
                    <div className="text-sm">45</div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-700">Tariff Impact</h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="text-sm text-gray-500">Industry:</div>
                    <div className="text-sm">Manufacturing</div>
                    <div className="text-sm text-gray-500">
                      Estimated Annual Impact:
                    </div>
                    <div className="text-sm">$350,000</div>
                    <div className="text-sm text-gray-500">
                      Impact as % of Revenue:
                    </div>
                    <div className="text-sm">18%</div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-700">Grant Request</h4>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="text-sm text-gray-500">
                      Requested Amount:
                    </div>
                    <div className="text-sm">$500,000</div>
                    <div className="text-sm text-gray-500">
                      Primary Purpose:
                    </div>
                    <div className="text-sm">Supply Chain Diversification</div>
                    <div className="text-sm text-gray-500">Spending Term:</div>
                    <div className="text-sm">10 years</div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-700">Documentation</h4>
                  <div className="grid grid-cols-1 gap-1 mt-2">
                    <div className="text-sm">
                      ✓ Business Tax Returns (2 files)
                    </div>
                    <div className="text-sm">
                      ✓ Financial Statements (1 file)
                    </div>
                    <div className="text-sm">
                      ✓ Proof of Tariff Impact (3 files)
                    </div>
                    <div className="text-sm">✓ Business Plan (1 file)</div>
                    <div className="text-sm">✓ Owner Information (2 files)</div>
                    <div className="text-sm">✓ Business Licenses (1 file)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <div className="flex items-start">
                <input type="checkbox" id="certify" className="mt-1 mr-3" required />
                <label htmlFor="certify" className="text-sm">
                  I certify that all information provided in this application is
                  true and accurate to the best of my knowledge. I understand
                  that providing false information may result in denial of the
                  grant application and possible legal action.
                </label>
              </div>
            </div>
            <div className="mb-8">
              <div className="flex items-start">
                <input type="checkbox" id="authorize" className="mt-1 mr-3" required />
                <label htmlFor="authorize" className="text-sm">
                  I authorize the SME Tariff Relief Program to verify any
                  information provided in this application, including contacting
                  business references, obtaining credit reports, and verifying
                  employment and financial information.
                </label>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <Button onClick={handlePrevStep} variant="outline">
                Previous
              </Button>
              <Button onClick={handleSubmit} variant="secondary">
                Submit Application
              </Button>
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Apply for Funding
          </h1>
          <p className="text-xl max-w-3xl">
            Complete the application form below to apply for the SME Tariff
            Relief Grant Program.
          </p>
        </div>
      </section>
      {/* Application Steps */}
      {!formSubmitted && <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between">
              {['Business Information', 'Tariff Impact', 'Grant Request', 'Business Bank Details', 'Documentation', 'Review & Submit'].map((stepName, index) => {
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
                <div className="h-full bg-blue-600" style={{
                  width: `${(step - 1) / 5 * 100}%`
                }} />
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
                <p className="mb-4">
                  Our support team is available to assist you with your
                  application. Contact us with any questions.
                </p>
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
                  <li>
                    Be specific about how tariffs have impacted your business
                  </li>
                  <li>Clearly explain how grant funds will be used</li>
                  <li>Provide accurate financial information</li>
                  <li>
                    Applications are typically processed within 30-45 days
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>}
      <VideoModal />
    </div>
  );
};