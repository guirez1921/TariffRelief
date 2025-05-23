import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircleIcon, AlertCircleIcon, ChevronRightIcon, PhoneIcon, MailIcon } from 'lucide-react';
import Button from '~/components/ui/Button';
import VideoModal from '~/components/ui/VideoModal';
import { bank, state } from '~/utils/data';
import type { Route } from '../+types/root';

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "Business Application - SME Tariff Relief Application" },
		{ name: "description", content: "Apply for the SME Tariff Relief Program to mitigate the impact of tariffs on your business." },
		{ name: "keywords", content: "SME, Tariff Relief, Grants, Small Business, Federal Program" },
		{ name: "author", content: "SME Tariff Relief Program" },
		{ name: "viewport", content: "width=device-width, initial-scale=1" },
		{ property: "og:title", content: "SME Tariff Relief Application" },
		{ property: "og:description", content: "Apply for the SME Tariff Relief Program to mitigate the impact of tariffs on your business." },
		{ property: "og:type", content: "website" },
		{ property: "og:url", content: "https://tariff-relief.gov/application/business" },
		{ property: "og:image", content: "https://tariff-relief.gov/assets/og-image.jpg" },
	];
}

export default function ApplicationPage() {
	const [step, setStep] = useState(1);
	const [formSubmitted, setFormSubmitted] = useState(false);
	const [loading, setLoading] = useState(false); // Loader state
	const [error, setError] = useState<Partial<Record<string, string>> | null>(null); // Error state
	const [applicationID, setApplicationID] = useState<string>('');

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

	useEffect(() => {
		const savedFormData = localStorage.getItem('businessApplicationFormData');
		if (savedFormData) {
			setFormData(JSON.parse(savedFormData));
		}
		setApplicationID(localStorage.getItem('applicationID') || '');
		if (!applicationID) {
			const newApplicationID = `application_${Date.now()}`;
			setApplicationID(newApplicationID);
			localStorage.setItem('applicationID', applicationID);
		}
	}, []);

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

			// Save form data to localStorage
			localStorage.setItem('businessApplicationFormData', JSON.stringify(formData));

			const formDataToSend = new FormData();

			// Append form fields
			Object.entries(formData).forEach(([key, value]) => {
				formDataToSend.append(key, value);
			});

			// Append files
			Object.entries(files).forEach(([key, file]) => {
				if (file) formDataToSend.append(key, file);
			});

			formDataToSend.append('step', step.toString());

			formDataToSend.append('applicationID', applicationID);

			const response = await axios.post('https://tariff-relief-server.vercel.app/api/business/verify', formDataToSend, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			if (response.data.success) {
				setStep(prev => prev + 1);
				console.log(response.data.message, response.data.errors);
			} else {
				setError(response.data.errors);
				console.log(response.data.message, response.data.errors);
			}
		} catch (error) {
			console.error('Error submitting step:', error);
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
			const formDataToSend = new FormData();

			// Append form fields
			Object.entries(formData).forEach(([key, value]) => {
				formDataToSend.append(key, value);
			});

			// Append files
			Object.entries(files).forEach(([key, file]) => {
				if (file) formDataToSend.append(key, file);
			});

			const response = await axios.post('https://tariff-relief-server.vercel.app/api/business/submit', formDataToSend, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			if (response.data.success) {
				setFormSubmitted(true);
			} else {
				alert(response.data.message);
			}
		} catch (error) {
			console.error('Error submitting application:', error);
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
					<h2 className="text-2xl font-bold mb-4 text-blue-900">
						Application Submitted Successfully!
					</h2>
					<p className="text-lg mb-6 text-gray-800">
						Thank you for applying to the SME Tariff Relief Program. Your
						grant application has been received and will be reviewed by our team.
					</p>
					<div className="mb-6">
						<p className="font-medium text-gray-900">Application Reference Number:</p>
						<p className="text-xl font-bold text-blue-900">
							SME-{Math.floor(100000 + Math.random() * 900000)}
						</p>
					</div>
					<div className="bg-white p-4 rounded-md mb-6 text-left">
						<h3 className="font-bold mb-2 text-blue-900">Next Steps:</h3>
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
				return (
					<>
						<h2 className="text-xl font-bold mb-6 text-blue-900">Business Information</h2>
						<div className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label htmlFor="businessName" className="block font-medium mb-1 text-gray-900">
										Legal Business Name *
									</label>
									<input type="text" id="businessName" value={formData.businessName} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
									{error?.businessName && <p className="text-red-500 text-sm mt-1">{error.businessName}</p>}
								</div>
								<div>
									<label htmlFor="dba" className="block font-medium mb-1 text-gray-900">
										DBA (if applicable)
									</label>
									<input type="text" id="dba" value={formData.dba} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
									{error?.dba && <p className="text-red-500 text-sm mt-1">{error.dba}</p>}
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label htmlFor="ein" className="block font-medium mb-1 text-gray-900">
										EIN/Tax ID *
									</label>
									<input
										type="text"
										id="ein"
										value={formData.ein}
										onChange={handleInputChange}
										className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
										required
									/>
									{error?.ein && <p className="text-red-500 text-sm mt-1">{error.ein}</p>}
								</div>
								<div>
									<label htmlFor="businessType" className="block font-medium mb-1 text-gray-900">
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
									{error?.businessType && <p className="text-red-500 text-sm mt-1">{error.businessType}</p>}
								</div>
							</div>
							<div>
								<label htmlFor="businessAddress" className="block font-medium mb-1 text-gray-900">
									Business Address *
								</label>
								<input type="text" id="businessAddress" value={formData.businessAddress} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
								{error?.businessAddress && <p className="text-red-500 text-sm mt-1">{error.businessAddress}</p>}
							</div>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<label htmlFor="city" className="block font-medium mb-1 text-gray-900">
										City *
									</label>
									<input type="text" id="city" value={formData.city} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
									{error?.city && <p className="text-red-500 text-sm mt-1">{error.city}</p>}
								</div>
								<div>
									<label htmlFor="state" className="block font-medium mb-1 text-gray-900">
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
									{error?.state && <p className="text-red-500 text-sm mt-1">{error.state}</p>}
								</div>
								<div>
                                    <label htmlFor="zip" className="block font-medium mb-1 text-gray-900">ZIP Code *</label>
                                    <input
                                        type="text"
                                        id="zip"
                                        value={formData.zip}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    {error?.zip && <p className="text-red-500 text-sm mt-1">{error.zip}</p>}
                                </div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
                                    <label htmlFor="phone" className="block font-medium mb-1 text-gray-900">Phone *</label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">+1</span>
                                    </div>
                                    {error?.phone && <p className="text-red-500 text-sm mt-1">{error.phone}</p>}
                                </div>
								<div>
									<label htmlFor="email" className="block font-medium mb-1 text-gray-900">
										Business Email *
									</label>
									<input type="email" id="email" value={formData.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
									{error?.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
								</div>
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label htmlFor="yearsInBusiness" className="block font-medium mb-1 text-gray-900">
									Years in Business *
								</label>
								<input
									type="date"
									id="yearsInBusiness"
									value={formData.yearsInBusiness}
									onChange={handleInputChange}
									className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
									required
								/>
								{error?.yearsInBusiness && <p className="text-red-500 text-sm mt-1">{error.yearsInBusiness}</p>}
							</div>
							<div>
								<label htmlFor="employees" className="block font-medium mb-1 text-gray-900">
									Number of Employees *
								</label>
								<input type="number" id="employees" value={formData.employees} onChange={handleInputChange} min="1" max="500" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
								{error?.employees && <p className="text-red-500 text-sm mt-1">{error.employees}</p>}
							</div>
						</div>
						<div className="mt-8 flex justify-end">
							<Button onClick={handleNextStep} variant="primary" type="button" disabled={loading}>
								Next: Tariff Impact{' '}
								<ChevronRightIcon size={16} className="ml-1" />
							</Button>
						</div>
					</>
				);
			case 2:
				return (
					<>
						<h2 className="text-xl font-bold mb-6 text-blue-900">Tariff Impact Information</h2>
						<div className="space-y-4">
							<div>
								<label htmlFor="industryType" className="block font-medium mb-1 text-gray-900">
									Primary Industry *
								</label>
								<select id="industryType" value={formData.industryType} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
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
								{error?.industryType && <p className="text-red-500 text-sm mt-1">{error.industryType}</p>}
							</div>
							<div>
								<label htmlFor="impactDescription" className="block font-medium mb-1 text-gray-900">
									Describe how Chinese tariffs have impacted or will impact your business *
								</label>
								<textarea id="impactDescription" value={formData.impactDescription} onChange={handleInputChange} rows={4} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
								{error?.impactDescription && <p className="text-red-500 text-sm mt-1">{error.impactDescription}</p>}
							</div>
							<div>
								<label className="block font-medium mb-1 text-gray-900">
									Which aspects of your business have been affected by tariffs? *
								</label>
								<div className="space-y-2">
									{['Increased cost of materials or goods', 'Supply chain disruptions', 'Reduced profit margins', 'Loss of customers or sales', 'Increased competition from businesses not affected by tariffs', 'Need to find alternative suppliers', 'Other'].map((option, index) => (
										<div key={index} className="flex items-center">
											<input type="checkbox" id={`impact-${index}`} className="mr-2" />
											<label htmlFor={`impact-${index}`} className="text-gray-800">{option}</label>
										</div>
									))}
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label htmlFor="estimatedImpact" className="block font-medium mb-1 text-gray-900">
										Estimated Financial Impact (Annual) *
									</label>
									<div className="relative">
										<span className="absolute left-3 top-2 text-gray-800">$</span>
										<input type="number" id="estimatedImpact" value={formData.estimatedImpact} onChange={handleInputChange} min="0" className="w-full border border-gray-300 rounded-md px-3 py-2 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
										{error?.estimatedImpact && <p className="text-red-500 text-sm mt-1">{error.estimatedImpact}</p>}
									</div>
								</div>
								<div>
									<label htmlFor="impactPercentage" className="block font-medium mb-1 text-gray-900">
										Impact as % of Annual Revenue *
									</label>
									<div className="relative">
										<input type="number" id="impactPercentage" value={formData.impactPercentage} onChange={handleInputChange} min="0" max="100" className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
										<span className="absolute right-3 top-2 text-gray-800">%</span>
										{error?.impactPercentage && <p className="text-red-500 text-sm mt-1">{error.impactPercentage}</p>}
									</div>
								</div>
							</div>
							<div>
								<label htmlFor="mitigationEfforts" className="block font-medium mb-1 text-gray-900">
									Describe any steps already taken to mitigate tariff impacts *
								</label>
								<textarea id="mitigationEfforts" value={formData.mitigationEfforts} onChange={handleInputChange} rows={3} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
								{error?.mitigationEfforts && <p className="text-red-500 text-sm mt-1">{error.mitigationEfforts}</p>}
							</div>
						</div>
						<div className="mt-8 flex justify-between">
							<Button onClick={handlePrevStep} variant="outline" type="button" disabled={loading}>
								Previous
							</Button>
							<Button onClick={handleNextStep} variant="primary" type="button" disabled={loading}>
								Next: Grant Request <ChevronRightIcon size={16} className="ml-1" />
							</Button>
						</div>
					</>
				);
			case 3:
				return (
					<>
						<h2 className="text-xl font-bold mb-6 text-blue-900">Grant Request Information</h2>
						<div className="space-y-4">
							<div>
								<label htmlFor="fundAmount" className="block font-medium mb-1 text-gray-900">
									Requested Grant*
								</label>
								<div className="relative">
									<span className="absolute left-3 top-2 text-gray-800">$</span>
									<input type="number" id="fundAmount" min="50000" max="2000000" className="w-full border border-gray-300 rounded-md px-3 py-2 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
									{error?.fundAmount && <p className="text-red-500 text-sm mt-1">{error.fundAmount}</p>}
								</div>
								<p className="text-sm text-gray-500 mt-1">
									Funding range from $50,000 to $2,000,000
								</p>
							</div>
							<div>
								<label htmlFor="fundPurpose" className="block font-medium mb-1 text-gray-900">
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
								{error?.fundPurpose && <p className="text-red-500 text-sm mt-1">{error.fundPurpose}</p>}
							</div>
							<div>
								<label htmlFor="fundUse" className="block font-medium mb-1 text-gray-900">
									Detailed Explanation of How Funds Will Be Used *
								</label>
								<textarea id="fundUse" rows={4} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
								{error?.fundUse && <p className="text-red-500 text-sm mt-1">{error.fundUse}</p>}
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label htmlFor="preferredTerm" className="block font-medium mb-1 text-gray-900">
										Grant Spending Tenure
									</label>
									<select id="preferredTerm" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
										<option value="">Select term</option>
										<option value="5">5 years</option>
										<option value="7">7 years</option>
										<option value="10">10 years</option>
										<option value="15">15 years</option>
									</select>
									{error?.preferredTerm && <p className="text-red-500 text-sm mt-1">{error.preferredTerm}</p>}
								</div>
								<div>
									<label htmlFor="collateral" className="block font-medium mb-1 text-gray-900">
										Available Collateral
									</label>
									<input type="text" id="collateral" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
									{error?.collateral && <p className="text-red-500 text-sm mt-1">{error.collateral}</p>}
								</div>
							</div>
							<div>
								<label htmlFor="expectedOutcomes" className="block font-medium mb-1 text-gray-900">
									Expected Outcomes from Grant Funding *
								</label>
								<textarea id="expectedOutcomes" rows={3} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
								{error?.expectedOutcomes && <p className="text-red-500 text-sm mt-1">{error.expectedOutcomes}</p>}
							</div>
						</div>
						<div className="mt-8 flex justify-between">
							<Button onClick={handlePrevStep} variant="outline" type="button" disabled={loading}>
								Previous
							</Button>
							<Button onClick={handleNextStep} variant="primary" type="button" disabled={loading}>
								Next: Financial Details{' '}
								<ChevronRightIcon size={16} className="ml-1" />
							</Button>
						</div>
					</>
				);
			case 4:
				return (
					<>
						<h2 className="text-xl font-bold mb-6 text-blue-900">Financial Details</h2>
						<div className="space-y-4">
							<div>
								<label htmlFor="bankName" className="block font-medium mb-1 text-gray-900">
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
								{error?.bankName && (
									<p className="text-red-500 text-sm mt-1">{error.bankName}</p>
								)}
							</div>
							<div>
								<label htmlFor="accountNumber" className="block font-medium mb-1 text-gray-900">
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
								{error?.accountNumber && <p className="text-red-500 text-sm mt-1">{error.accountNumber}</p>}
								{formData.accountNumber.length > 0 &&
									(formData.accountNumber.length < 10 || formData.accountNumber.length > 12) && (
										<p className="text-red-500 text-sm mt-1">
											Account number must be between 10 and 12 digits.
										</p>
									)}
							</div>
							<div>
								<label htmlFor="routingNumber" className="block font-medium mb-1 text-gray-900">
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
								{error?.routingNumber && <p className="text-red-500 text-sm mt-1">{error.routingNumber}</p>}
								{formData.routingNumber.length > 0 && formData.routingNumber.length !== 9 && (
									<p className="text-red-500 text-sm mt-1">
										Routing number must be exactly 9 digits.
									</p>
								)}
							</div>
							<div>
								<label htmlFor="accountType" className="block font-medium mb-1 text-gray-900">
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
								{error?.accountType && <p className="text-red-500 text-sm mt-1">{error.accountType}</p>}
							</div>
						</div>
						<div className="mt-8 flex justify-between">
							<Button onClick={handlePrevStep} variant="outline" type="button" disabled={loading}>
								Previous
							</Button>
							<Button onClick={handleNextStep} variant="primary" type="button" disabled={loading}>
								Next: Documentation{' '}
								<ChevronRightIcon size={16} className="ml-1" />
							</Button>
						</div>
					</>
				);
			case 5:
				return (
					<>
						<h2 className="text-xl font-bold mb-6 text-blue-900">Required Documentation</h2>
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
								<label htmlFor="taxReturns" className="block font-medium mb-1 text-gray-900">
									Business Tax Returns (Last 2 Years) *
								</label>
								<input type="file" id="taxReturns" accept=".pdf" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
								<p className="text-sm text-gray-700 mt-1">
									Upload complete business tax returns, including all schedules.
								</p>
								{error?.taxReturns && <p className="text-red-500 text-sm mt-1">{error.taxReturns}</p>}
							</div>
							<div>
								<label htmlFor="financialStatements" className="block font-medium mb-1 text-gray-900">
									Financial Statements *
								</label>
								<input type="file" id="financialStatements" accept=".pdf" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
								<p className="text-sm text-gray-700 mt-1">
									Include balance sheet and profit & loss statement for the
									current year.
								</p>
								{error?.financialStatements && <p className="text-red-500 text-sm mt-1">{error.financialStatements}</p>}
							</div>
							<div>
								<label htmlFor="tariffImpact" className="block font-medium mb-1 text-gray-900">
									Proof of Tariff Impact <span className="text-gray-500">(optional)</span>
								</label>
								<input type="file" id="tariffImpact" accept=".pdf" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
								<p className="text-sm text-gray-700 mt-1">
									Upload import records, supplier communications, or other
									documentation showing tariff impact.
								</p>
							</div>
							<div>
								<label htmlFor="businessPlan" className="block font-medium mb-1 text-gray-900">
									Business Plan for Fund Usage <span className="text-gray-500">(optional)</span>
								</label>
								<input type="file" id="businessPlan" accept=".pdf" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
								<p className="text-sm text-gray-700 mt-1">
									Detailed plan explaining how grant funds will be used to
									address tariff impacts.
								</p>
							</div>
							<div>
								<label htmlFor="ownerInfo" className="block font-medium mb-1 text-gray-900">
									Owner Information (20%+ ownership) <span className="text-gray-500">(optional)</span>
								</label>
								<input type="file" id="ownerInfo" accept=".pdf" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
								<p className="text-sm text-gray-700 mt-1">
									Personal financial statements for all owners with 20% or
									greater ownership.
								</p>
							</div>
							<div>
								<label htmlFor="licenses" className="block font-medium mb-1 text-gray-900">
									Business Licenses and Registrations *
								</label>
								<input type="file" id="licenses" accept=".pdf" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
								<p className="text-sm text-gray-700 mt-1">
									Current business licenses, permits, and registration
									documents.
								</p>
								{error?.licenses && <p className="text-red-500 text-sm mt-1">{error.licenses}</p>}
							</div>
						</div>
						<div className="mt-8 flex justify-between">
							<Button onClick={handlePrevStep} variant="outline" type="button" disabled={loading}>
								Previous
							</Button>
							<Button onClick={handleNextStep} variant="primary" type="button" disabled={loading}>
								Next: Review & Submit{' '}
								<ChevronRightIcon size={16} className="ml-1" />
							</Button>
						</div>
					</>
				);
			case 6:
				return (
					<>
						<h2 className="text-xl font-bold mb-6 text-blue-900">
							Review & Submit Application
						</h2>
						<div className="bg-gray-50 p-6 rounded-lg mb-8">
							<h3 className="font-bold mb-4 text-blue-900">Application Summary</h3>
							<div className="space-y-4">
								<div>
									<h4 className="font-medium text-gray-900">
										Business Information
									</h4>
									<div className="grid grid-cols-2 gap-2 mt-2">
										<div className="text-sm text-gray-700">Business Name:</div>
										<div className="text-sm text-gray-800">Sample Business LLC</div>
										<div className="text-sm text-gray-700">Business Type:</div>
										<div className="text-sm text-gray-800">LLC</div>
										<div className="text-sm text-gray-700">
											Years in Business:
										</div>
										<div className="text-sm text-gray-800">5</div>
										<div className="text-sm text-gray-700">Employees:</div>
										<div className="text-sm text-gray-800">45</div>
									</div>
								</div>
								<div className="border-t border-gray-200 pt-4">
									<h4 className="font-medium text-gray-900">Tariff Impact</h4>
									<div className="grid grid-cols-2 gap-2 mt-2">
										<div className="text-sm text-gray-700">Industry:</div>
										<div className="text-sm text-gray-800">Manufacturing</div>
										<div className="text-sm text-gray-700">
											Estimated Annual Impact:
										</div>
										<div className="text-sm text-gray-800">$350,000</div>
										<div className="text-sm text-gray-700">
											Impact as % of Revenue:
										</div>
										<div className="text-sm text-gray-800">18%</div>
									</div>
								</div>
								<div className="border-t border-gray-200 pt-4">
									<h4 className="font-medium text-gray-900">Grant Request</h4>
									<div className="grid grid-cols-2 gap-2 mt-2">
										<div className="text-sm text-gray-700">
											Requested Amount:
										</div>
										<div className="text-sm text-gray-800">$500,000</div>
										<div className="text-sm text-gray-700">
											Primary Purpose:
										</div>
										<div className="text-sm text-gray-800">Supply Chain Diversification</div>
										<div className="text-sm text-gray-700">Spending Term:</div>
										<div className="text-sm text-gray-800">10 years</div>
									</div>
								</div>
								<div className="border-t border-gray-200 pt-4">
									<h4 className="font-medium text-gray-900">Documentation</h4>
									<div className="grid grid-cols-1 gap-1 mt-2">
										<div className="text-sm text-gray-800">
											✓ Business Tax Returns (2 files)
										</div>
										<div className="text-sm text-gray-800">
											✓ Financial Statements (1 file)
										</div>
										<div className="text-sm text-gray-800">
											✓ Proof of Tariff Impact (3 files)
										</div>
										<div className="text-sm text-gray-800">✓ Business Plan (1 file)</div>
										<div className="text-sm text-gray-800">✓ Owner Information (2 files)</div>
										<div className="text-sm text-gray-800">✓ Business Licenses (1 file)</div>
									</div>
								</div>
							</div>
						</div>
						<div className="mb-8">
							<div className="flex items-start">
								<input type="checkbox" id="certify" className="mt-1 mr-3" required />
								<label htmlFor="certify" className="text-sm text-gray-800">
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
								<label htmlFor="authorize" className="text-sm text-gray-800">
									I authorize the SME Tariff Relief Program to verify any
									information provided in this application, including contacting
									business references, obtaining credit reports, and verifying
									employment and financial information.
								</label>
							</div>
						</div>
						<div className="mt-8 flex justify-between">
							<Button onClick={handlePrevStep} variant="outline" type="button" disabled={loading}>
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
			{/* Header */}
			<section className="bg-navy-700 text-white py-12">
				<div className="container mx-auto px-4">
					<h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
						Apply for Funding
					</h1>
					<p className="text-xl max-w-3xl text-blue-100">
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
									<div className={`text-xs mt-1 ${isActive ? 'font-medium' : ''} hidden md:block text-gray-900`}>
										{stepName}
									</div>
								</div>;
							})}
						</div>
						<div className="relative mt-2">
							<div className="absolute top-0 left-4 right-4 h-1 bg-gray-200">
								<div className="h-full bg-blue-600" style={{
									width: `${(step - 1) / 6 * 100}%`
								}} />
							</div>
						</div>
					</div>
				</div>
			</section>}
			{/* Application Form */}
			<section className="py-12 bg-gray-50">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto relative">
						{/* Loader */}
						{loading && <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center rounded-lg z-50">
							<div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
						</div>}
						<div className="bg-white p-8 rounded-lg shadow-md">
							<form>
								{renderStepContent()}
							</form>
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
								<h3 className="text-xl font-bold mb-4 text-blue-900">Need Help?</h3>
								<p className="mb-4 text-gray-800">
									Our support team is available to assist you with your
									application. Contact us with any questions.
								</p>
								<div className="space-y-2">
									<div className="flex items-center text-gray-800">
										<PhoneIcon size={18} className="text-blue-600 mr-2" />
										<span>(202) 555-1234</span>
									</div>
									<div className="flex items-center text-gray-800">
										<MailIcon size={18} className="text-blue-600 mr-2" />
										<span>applications@tariffrelief.gov</span>
									</div>
								</div>
							</div>
							<div>
								<h3 className="text-xl font-bold mb-4 text-blue-900">Application Tips</h3>
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