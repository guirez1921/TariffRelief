import React from 'react';
import Button from '../components/ui/Button';
import { CheckCircleIcon, AlertCircleIcon, ArrowRightIcon, BuildingIcon, CheckIcon, ClipboardCheckIcon, UserIcon, DollarSignIcon, CheckSquareIcon, XIcon, GraduationCapIcon, BookOpenIcon, HomeIcon } from 'lucide-react';
export default function ProgramInfoPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-navy-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Program Information
          </h1>
          <p className="text-xl max-w-3xl">
            Learn about the Tariff Relief Program, eligibility requirements,
            benefits, and repayment terms.
          </p>
        </div>
      </section>
      {/* Overview */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Program Overview</h2>
            <p className="mb-4">
              The SME Tariff Relief Program is a government-backed initiative
              designed to provide financial support to small and medium-sized
              enterprises (SMEs) and eligible individuals affected by the economic
              impact of Chinese tariffs. The program offers grants to help businesses
              and individuals adapt their operations, diversify supply chains, and
              maintain competitiveness in changing market conditions.
            </p>
            <p>
              Established by the Department of Commerce in partnership with the
              Small Business Administration, this program aims to strengthen
              American businesses and individuals, preserve jobs, and support
              economic resilience in the face of global trade challenges.
            </p>
          </div>
        </div>
      </section>
      {/* SME Adapttion Grants */}
      <section id="business" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                For Businesses
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Business Adaptation Grants
              </h2>
              <p className="text-gray-700 mb-6">
                Small and medium-sized enterprises can receive financial support
                to adapt to changing market conditions caused by new tariff
                policies. These grants are designed to help businesses remain
                competitive and resilient.
              </p>
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <DollarSignIcon className="mr-2 text-blue-700" size={24} />
                  Funding Details
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckSquareIcon
                      size={20}
                      className="text-green-600 mr-2 mt-1 flex-shrink-0"
                    />
                    <span className="text-gray-700">
                      Grants ranging from $25,000 to $250,000 based on business
                      size
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckSquareIcon
                      size={20}
                      className="text-green-600 mr-2 mt-1 flex-shrink-0"
                    />
                    <span className="text-gray-700">
                      No repayment required when funds are used for approved
                      purposes
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckSquareIcon
                      size={20}
                      className="text-green-600 mr-2 mt-1 flex-shrink-0"
                    />
                    <span className="text-gray-700">
                      Expedited application process with decisions within 30 days
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckSquareIcon
                      size={20}
                      className="text-green-600 mr-2 mt-1 flex-shrink-0"
                    />
                    <span className="text-gray-700">
                      Technical assistance available for implementation
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm x">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Approved Use of Funding
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Supply chain diversification</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Technology upgrades</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Market expansion</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Workforce training</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <BuildingIcon className="mr-2 text-blue-700" size={24} />
                  Approved Uses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-md">
                    <h4 className="font-medium text-green-800 mb-2">
                      Supply Chain Adjustment
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Funding to identify and secure alternative suppliers or
                      restructure existing supply chains
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-md">
                    <h4 className="font-medium text-green-800 mb-2">
                      Technology Upgrades
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Investment in new equipment or software to improve
                      efficiency and reduce costs
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-md">
                    <h4 className="font-medium text-green-800 mb-2">
                      Market Expansion
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Development of new markets or products to diversify revenue
                      streams
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-md">
                    <h4 className="font-medium text-green-800 mb-2">
                      Workforce Training
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Employee upskilling to adapt to new business processes or
                      technologies
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Non-Eligible Uses
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <XIcon
                      size={20}
                      className="text-red-500 mr-2 mt-1 flex-shrink-0"
                    />
                    <span className="text-gray-700">
                      Executive compensation or bonuses
                    </span>
                  </li>
                  <li className="flex items-start">
                    <XIcon
                      size={20}
                      className="text-red-500 mr-2 mt-1 flex-shrink-0"
                    />
                    <span className="text-gray-700">
                      Debt refinancing unrelated to tariff impacts
                    </span>
                  </li>
                  <li className="flex items-start">
                    <XIcon
                      size={20}
                      className="text-red-500 mr-2 mt-1 flex-shrink-0"
                    />
                    <span className="text-gray-700">
                      Stock buybacks or shareholder dividends
                    </span>
                  </li>
                  <li className="flex items-start">
                    <XIcon
                      size={20}
                      className="text-red-500 mr-2 mt-1 flex-shrink-0"
                    />
                    <span className="text-gray-700">
                      Political contributions or lobbying
                    </span>
                  </li>
                </ul>
              </div>
              <a
                href="/business-application"
                className="inline-block float-right bg-blue-700 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors mt-6"
              >
                Check Business Eligibility
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Individual Adaptation Grants */}
      <section id="individual" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                For Individuals
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Individual Adaptation Grants
              </h2>
              <p className="text-gray-700 mb-6">
                U.S. citizens and permanent residents affected by tariff-related
                economic changes can receive financial support to adapt through
                retraining, education, or entrepreneurship opportunities.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <UserIcon className="mr-2 text-blue-700" size={24} />
                  Eligibility Requirements
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-700 rounded-full mr-3"></span>
                    <span className="text-gray-700">
                      U.S. citizen or permanent resident
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-700 rounded-full mr-3"></span>
                    <span className="text-gray-700">18 years or older</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-700 rounded-full mr-3"></span>
                    <span className="text-gray-700">
                      Employed in an industry affected by Chinese tariffs
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-700 rounded-full mr-3"></span>
                    <span className="text-gray-700">
                      Household income below 300% of federal poverty level
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-700 rounded-full mr-3"></span>
                    <span className="text-gray-700">
                      Not receiving other federal adjustment assistance
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Approved Use of Funding
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Education and training programs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Career development services</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Small business startup support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">Relocation assistance</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Grant Amounts
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-700 font-medium">
                      Basic Individual Grant
                    </span>
                    <span className="text-blue-700 font-bold">$5,000</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-700 font-medium">
                      Education & Training Supplement
                    </span>
                    <span className="text-blue-700 font-bold">Up to $7,500</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-700 font-medium">
                      Small Business Startup Grant
                    </span>
                    <span className="text-blue-700 font-bold">Up to $15,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      Relocation Assistance
                    </span>
                    <span className="text-blue-700 font-bold">Up to $3,000</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <GraduationCapIcon size={20} className="text-blue-700" />
                    </div>
                    <h4 className="ml-3 font-medium text-gray-900">
                      Education & Training
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Funding for vocational training, certifications, or degree
                    programs in high-demand fields
                  </p>
                </div>
                <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <BookOpenIcon size={20} className="text-blue-700" />
                    </div>
                    <h4 className="ml-3 font-medium text-gray-900">
                      Career Development
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Resume building, interview coaching, and job placement
                    assistance
                  </p>
                </div>
                <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <HomeIcon size={20} className="text-blue-700" />
                    </div>
                    <h4 className="ml-3 font-medium text-gray-900">
                      Business Startup
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Support for entrepreneurs starting small businesses in growing
                    sectors
                  </p>
                </div>
                <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <UserIcon size={20} className="text-blue-700" />
                    </div>
                    <h4 className="ml-3 font-medium text-gray-900">
                      Financial Counseling
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Professional guidance on financial planning during career
                    transitions
                  </p>
                </div>
              </div>
              <a
                href="/idividual -application"
                className="inline-block float-right bg-blue-700 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition-colors mt-6"
              >
                Check Individual Eligibility
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Eligibility */}
      {/* <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Eligibility Requirements</h2>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h3 className="text-xl font-bold mb-4">Basic Eligibility</h3>
            <ul className="space-y-3">
              {['U.S.-based SME or individual affected by tariffs', 'In operation for at least 2 years (for businesses)', 'Demonstrable impact from Chinese tariffs on operations', 'Good standing with federal, state, and local tax authorities', 'Valid registration and licenses', 'No delinquent federal debt or defaults on government loans'].map((item, index) => <li key={index} className="flex items-start">
                <CheckCircleIcon className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                <span>{item}</span>
              </li>)}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Documentation Required</h3>
            <ul className="space-y-3">
              {['Tax returns for the past 2 years (business or personal)', 'Financial statements (balance sheet, profit & loss statement)', 'Proof of tariff impact (e.g., import records, supplier documentation)', 'Plan detailing use of funds', 'Personal financial statements for all owners with 20% or greater ownership (for businesses)', 'Valid licenses and registrations'].map((item, index) => <li key={index} className="flex items-start">
                <ArrowRightIcon className="text-blue-600 mr-2 mt-1 flex-shrink-0" size={20} />
                <span>{item}</span>
              </li>)}
            </ul>
          </div>
        </div>
      </section> */}
      {/* Benefits & Terms */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Program Benefits</h2>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm md:h-full">
                <ul className="space-y-4">
                  {[
                    'Grants ranging from $50,000 to $2 million',
                    'No repayment required for eligible SMEs and individuals',
                    'Flexible use of funds for approved purposes',
                    'Priority processing for severely impacted industries and individuals',
                    'Access to expert advisory services for grant utilization',
                    'Opportunities for networking and collaboration with other grant recipients',
                    'Support for long-term business sustainability and growth'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon
                        className="text-green-600 mr-2 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Grant Disbursement and Compliance</h2>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm md:h-full">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Interest Rates</h3>
                    <p>
                      Grants do not require repayment for eligible SMEs and individuals. Terms and
                      conditions apply for proper use of funds.
                    </p>
                  </div>
                  {/* <div>
            <h3 className="font-bold text-lg mb-2">Loan Term</h3>
            <p>
              5-15 years based on needs and ability to repay, if applicable.
            </p>
          </div> */}
                  <div>
                    <h3 className="font-bold text-lg mb-2">Payment Schedule</h3>
                    <p>
                      Payment schedules vary based on grant type: individuals receive weekly payments, SMEs with grants under $350,000 follow a monthly schedule, and customized terms are arranged for grants exceeding $350,000.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      Collateral Requirements
                    </h3>
                    <p>
                      Grants over $350,000 may require additional documentation to ensure
                      compliance with program guidelines.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Use of Funds */}
      {/* <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Approved Use of Funds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-green-700">
                Approved Uses
              </h3>
              <ul className="space-y-3">
                {['Supply chain diversification', 'Equipment purchases to reduce reliance on affected imports', 'Facility modifications to accommodate new production processes', 'Working capital to offset increased costs due to tariffs', 'Technology upgrades to improve efficiency', 'Staff training for new processes or equipment', 'Research and development for product alternatives'].map((item, index) => <li key={index} className="flex items-start">
                  <CheckCircleIcon className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>{item}</span>
                </li>)}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-red-700">
                Prohibited Uses
              </h3>
              <ul className="space-y-3">
                {['Payment of existing debts', 'Dividends or distributions to owners', 'Personal expenses', 'Speculative activities', 'Lobbying activities', 'Relocation of business outside the U.S.', 'Purchase of real estate for investment purposes'].map((item, index) => <li key={index} className="flex items-start">
                  <AlertCircleIcon className="text-red-600 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span>{item}</span>
                </li>)}
              </ul>
            </div>
          </div>
        </div>
      </section> */}
      {/* Application Portal */}
      <section id="apply" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Application Portals
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Select the appropriate portal below to begin your grant application
              process. Applications are processed on a rolling basis with
              decisions typically made within 30 days.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-blue-700 p-6 text-white">
                <div className="flex items-center mb-4">
                  <BuildingIcon size={24} />
                  <h3 className="text-xl font-bold ml-2">
                    Business Grant Portal
                  </h3>
                </div>
                <p>
                  For small and medium-sized enterprises affected by Chinese
                  tariffs
                </p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Required Documents
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckIcon
                        size={18}
                        className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">
                        Business registration/license
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon
                        size={18}
                        className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">
                        Tax returns (last 2 years)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon
                        size={18}
                        className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">Financial statements</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon
                        size={18}
                        className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">
                        Import/export documentation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon
                        size={18}
                        className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">
                        Tariff impact statement
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center mb-6 bg-blue-50 p-3 rounded-md">
                  <ClipboardCheckIcon
                    size={20}
                    className="text-blue-700 mr-2 flex-shrink-0"
                  />
                  <span className="text-sm text-blue-700">
                    Average completion time: 45 minutes
                  </span>
                </div>
                <div className="flex items-center mb-6">
                  <AlertCircleIcon
                    size={18}
                    className="text-amber-500 mr-2 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-600">
                    You can save your progress and return later
                  </span>
                </div>
                <a
                  href="/apply/business"
                  id="business-apply"
                  className="block w-full bg-blue-700 text-white text-center py-3 px-4 rounded-md font-medium hover:bg-blue-800 transition-colors"
                >
                  Start Business Application
                </a>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-blue-600 p-6 text-white">
                <div className="flex items-center mb-4">
                  <UserIcon size={24} />
                  <h3 className="text-xl font-bold ml-2">
                    Individual Grant Portal
                  </h3>
                </div>
                <p>
                  For U.S. citizens and permanent residents affected by
                  tariff-related changes
                </p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Required Documents
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckIcon
                        size={18}
                        className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">Government-issued ID</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon
                        size={18}
                        className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">Proof of residency</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon
                        size={18}
                        className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">Income verification</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon
                        size={18}
                        className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">Employment history</span>
                    </li>
                    <li className="flex items-start">
                      <CheckIcon
                        size={18}
                        className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                      />
                      <span className="text-gray-700">Statement of need</span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center mb-6 bg-blue-50 p-3 rounded-md">
                  <ClipboardCheckIcon
                    size={20}
                    className="text-blue-700 mr-2 flex-shrink-0"
                  />
                  <span className="text-sm text-blue-700">
                    Average completion time: 30 minutes
                  </span>
                </div>
                <div className="flex items-center mb-6">
                  <AlertCircleIcon
                    size={18}
                    className="text-amber-500 mr-2 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-600">
                    You can save your progress and return later
                  </span>
                </div>
                <a
                  href="/apply/individual"
                  id="individual-apply"
                  className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Start Individual Application
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 max-w-3xl mx-auto text-center">
            <p className="text-gray-600 text-sm">
              Need help with your application? Contact our support team at (800)
              555-GRANT or email
              <a
                href="mailto:support@tariffgrants.gov"
                className="text-blue-700 hover:underline"
              >
                {' '}
                support@tariffgrants.gov
              </a>
            </p>
          </div>
        </div>
      </section>
      {/* CTA */}
      {/* <section className="py-12 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Apply?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            If your business meets the eligibility requirements, start your
            application today to access the grant funding you need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/apply/individual" size="lg" variant="secondary">
              Start Application
            </Button>
            <Button href="/calculator" size="lg" variant="ghost">
              Calculate Your Grant
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  );
};