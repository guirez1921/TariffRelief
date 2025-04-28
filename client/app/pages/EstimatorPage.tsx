import React, { useState } from 'react';
import { CalculatorIcon } from 'lucide-react';

export default function CalculatorPage() {
  const [applicantType, setApplicantType] = useState<string | null>(null);
  const [businessSize, setBusinessSize] = useState<string>("");
  const [industryImpact, setIndustryImpact] = useState<string | null>(null);
  const [tariffExposure, setTariffExposure] = useState<string | null>(null);
  const [individualIncome, setIndividualIncome] = useState<string | null>(null);
  const [individualPurpose, setIndividualPurpose] = useState<string | null>(null);
  const [grantAmount, setGrantAmount] = useState<number | null>(0);
  const [showResult, setShowResult] = useState<boolean>(false);

  const calculateBusinessGrant = () => {
    let baseAmount = 0;
    if (businessSize === 'micro') baseAmount = 25000;
    else if (businessSize === 'small') baseAmount = 75000;
    else if (businessSize === 'medium') baseAmount = 150000;

    let multiplier = 1.2;
    if (industryImpact === 'high') multiplier = 2.0;
    else if (industryImpact === 'medium') multiplier = 1.5;

    let adjustment = 0;
    if (tariffExposure === 'high') adjustment = 75000;
    else if (tariffExposure === 'medium') adjustment = 50000;
    else if (tariffExposure === 'low') adjustment = 25000;

    return Math.round(baseAmount * multiplier + adjustment);
  };

  const calculateIndividualGrant = () => {
    let baseAmount = 5000;
    if (individualIncome === 'low') baseAmount += 5000;
    else if (individualIncome === 'medium') baseAmount += 10000;

    if (individualPurpose === 'education') baseAmount += 7500;
    else if (individualPurpose === 'business') baseAmount += 25000;
    else if (individualPurpose === 'relocation') baseAmount += 10000;
    else if (individualPurpose === 'basic') baseAmount += 5000;

    return baseAmount;
  };

  const handleCalculate = () => {
    if (
      applicantType === 'business' &&
      businessSize &&
      industryImpact &&
      tariffExposure
    ) {
      setGrantAmount(calculateBusinessGrant());
      setShowResult(true);
    } else if (
      applicantType === 'individual' &&
      individualIncome &&
      individualPurpose
    ) {
      setGrantAmount(calculateIndividualGrant());
      setShowResult(true);
    }
  };

  return (
    <section id="calculator" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center bg-blue-100 text-blue-800 p-2 rounded-full mb-4">
              <CalculatorIcon size={24} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Grant Calculator
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estimate the potential grant amount you may be eligible for based
              on your specific situation. This is only an estimate and actual
              grant amounts may vary.
            </p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-3">
                I am applying as a:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className={`py-3 px-4 rounded-md border ${
                    applicantType === 'business'
                      ? 'bg-blue-50 border-blue-400 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700'
                  }`}
                  onClick={() => {
                    setApplicantType('business');
                    setShowResult(false);
                  }}
                >
                  Business
                </button>
                <button
                  className={`py-3 px-4 rounded-md border ${
                    applicantType === 'individual'
                      ? 'bg-blue-50 border-blue-400 text-blue-700'
                      : 'bg-white border-gray-300 text-gray-700'
                  }`}
                  onClick={() => {
                    setApplicantType('individual');
                    setShowResult(false);
                  }}
                >
                  Individual
                </button>
              </div>
            </div>
            {applicantType === 'business' ? (
              <>
                <div className="mb-6 bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Business Eligibility Criteria
                  </h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Must be a registered business entity.</li>
                    <li>Must have between 1 and 199 employees.</li>
                    <li>Must demonstrate tariff exposure and industry impact.</li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Business Size
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-md"
                      value={businessSize || ""}
                      onChange={(e) => {
                        setBusinessSize(e.target.value);
                        setShowResult(false);
                      }}
                    >
                      <option value="">Select business size</option>
                      <option value="micro">Micro (1-9 employees)</option>
                      <option value="small">Small (10-99 employees)</option>
                      <option value="medium">Medium (100-199 employees)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Industry Impact Level
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-md"
                      value={industryImpact || ""}
                      onChange={(e) => {
                        setIndustryImpact(e.target.value);
                        setShowResult(false);
                      }}
                    >
                      <option value="">Select impact level</option>
                      <option value="high">High Impact</option>
                      <option value="medium">Medium Impact</option>
                      <option value="low">Low Impact</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Tariff Exposure
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-md"
                      value={tariffExposure || ""}
                      onChange={(e) => {
                        setTariffExposure(e.target.value);
                        setShowResult(false);
                      }}
                    >
                      <option value="">Select exposure level</option>
                      <option value="high">
                        High Exposure (greater than 30% of supply chain)
                      </option>
                      <option value="medium">
                        Medium Exposure (10-30% of supply chain)
                      </option>
                      <option value="low">
                        Low Exposure (less than 10% of supply chain)
                      </option>
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6 bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    Individual Eligibility Criteria
                  </h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Must be a U.S. citizen or permanent resident.</li>
                    <li>Must demonstrate financial need or purpose alignment.</li>
                    <li>Must provide accurate household income details.</li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Household Income Level
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-md"
                      value={individualIncome || ""}
                      onChange={(e) => {
                        setIndividualIncome(e.target.value);
                        setShowResult(false);
                      }}
                    >
                      <option value="">Select income level</option>
                      <option value="low">
                        Low Income (Below 150% of federal poverty level)
                      </option>
                      <option value="medium">
                        Medium Income (150-300% of federal poverty level)
                      </option>
                      <option value="high">
                        High Income (Above 300% of federal poverty level)
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Primary Grant Purpose
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-md"
                      value={individualPurpose || ""}
                      onChange={(e) => {
                        setIndividualPurpose(e.target.value);
                        setShowResult(false);
                      }}
                    >
                      <option value="">Select primary purpose</option>
                      <option value="education">Education & Training</option>
                      <option value="business">Small Business Startup</option>
                      <option value="relocation">Relocation Assistance</option>
                      <option value="basic">Basic Adjustment Assistance</option>
                    </select>
                  </div>
                </div>
              </>
            )}
            <div className="mt-8">
              <button
                className="w-full bg-blue-700 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-800 transition-colors"
                onClick={handleCalculate}
              >
                Calculate Estimated Grant
              </button>
            </div>
            {showResult && (
              <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Estimated Grant Amount
                </h3>
                <div className="text-3xl font-bold text-blue-700">
                  ${grantAmount?.toLocaleString()}
                </div>
                <p className="text-gray-600 mt-3 text-sm">
                  This is an estimate based on the information provided. Actual
                  grant amounts may vary based on final eligibility
                  determination, available funding, and specific program
                  requirements.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}