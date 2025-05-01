import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from 'lucide-react';
import type { Route } from '../+types/root';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "FAQ - SME Tariff Relief Program" },
    { name: "description", content: "Find answers to frequently asked questions about the SME Tariff Relief Program." },
    { name: "keywords", content: "FAQ, SME, Tariff Relief, Grants, Small Business, Federal Program" },
    { name: "author", content: "SME Tariff Relief Program" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { property: "og:title", content: "FAQ - SME Tariff Relief Program" },
    { property: "og:description", content: "Find answers to frequently asked questions about the SME Tariff Relief Program." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://tariff-relief.gov/faq" },
    { property: "og:image", content: "https://tariff-relief.gov/assets/faq-og-image.jpg" },
  ];
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const faqs = [{
    question: 'What is the SME Tariff Relief Program?',
    answer: 'The SME Tariff Relief Program is a government-backed initiative designed to provide financial support to small and medium-sized enterprises (SMEs) and individuals affected by the economic impact of upcoming Chinese tariffs. The program offers grants to help businesses and individuals adapt to changing market conditions.'
  }, {
    question: 'Who is eligible for the program?',
    answer: 'Eligible applicants include U.S.-based small and medium enterprises with fewer than 500 employees and individuals who can demonstrate financial need or impact from Chinese tariffs. Businesses must have been in operation for at least 2 years, and individuals must meet specific income and purpose criteria.'
  }, {
    question: 'How much funding can my business receive?',
    answer: 'Grant amounts for businesses range from $25,000 to $150,000, depending on business size, demonstrated need, and eligibility. The specific amount is determined based on the documented impact of tariffs on your business operations and your proposed plan for utilizing the funds.'
  }, {
    question: 'How much funding can individuals receive?',
    answer: 'Grant amounts for individuals range from $5,000 to $50,000, depending on income level, purpose of the grant, and eligibility. The specific amount is determined based on the applicant’s financial situation and intended use of the funds.'
  }, {
    question: 'What can business grant funds be used for?',
    answer: 'Approved uses for business grants include supply chain diversification, equipment purchases, facility modifications, working capital to offset increased costs, technology upgrades, staff training, and research and development for product alternatives.'
  }, {
    question: 'What can individual grant funds be used for?',
    answer: 'Approved uses for individual grants include education and training, small business startup costs, relocation assistance, and basic adjustment assistance to offset financial hardships caused by tariffs.'
  }, {
    question: 'What documentation is required to apply for a business grant?',
    answer: 'Required documentation includes business tax returns for the past 2 years, financial statements (balance sheet, profit & loss statement), proof of tariff impact (e.g., import records, supplier documentation), a business plan detailing use of funds, and business licenses and registrations.'
  }, {
    question: 'What documentation is required to apply for an individual grant?',
    answer: 'Required documentation includes proof of income (e.g., tax returns, pay stubs), a statement of purpose for the grant, and any supporting documents demonstrating financial need or impact from tariffs.'
  }, {
    question: 'How long does the application process take?',
    answer: 'The standard application process takes approximately 30-45 days from submission to approval. However, applicants in severely impacted industries or situations may qualify for expedited processing, which can reduce the timeline to 15-20 days.'
  }, {
    question: 'Can I apply if I have received other government assistance?',
    answer: 'Yes, receiving other forms of government assistance does not automatically disqualify you from the SME Tariff Relief Program. However, you must disclose all current government grants or loans during the application process to ensure there is no duplication of benefits.'
  }, {
    question: 'How do I demonstrate that my business is affected by Chinese tariffs?',
    answer: 'Businesses can demonstrate tariff impact through documentation such as import/export records showing increased costs, communications with suppliers about price increases due to tariffs, financial statements showing margin decreases correlated with tariff implementation dates, or supply chain analysis demonstrating dependence on affected goods or materials.'
  }, {
    question: 'How do I demonstrate that I am eligible for an individual grant?',
    answer: 'Individuals can demonstrate eligibility by providing proof of income, a statement of purpose for the grant, and any documentation showing financial hardship or impact from tariffs, such as increased living costs or job displacement.'
  }];
  const toggleFAQ = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  const filteredFAQs = faqs.filter(faq => faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-navy-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl max-w-3xl">
            Find answers to common questions about the SME Tariff Relief
            Program.
          </p>
        </div>
      </section>
      {/* Search and FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Search */}
            <div className="mb-8">
              <div className="relative">
                <input type="text" placeholder="Search for questions..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <SearchIcon className="absolute left-4 top-3.5 text-gray-400" size={20} />
              </div>
            </div>
            {/* FAQs */}
            <div className="space-y-4">
              {filteredFAQs.length > 0 ? filteredFAQs.map((faq, index) => <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button className="w-full text-left px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 focus:outline-none" onClick={() => toggleFAQ(index)} aria-expanded={openIndex === index}>
                  <span className="font-medium text-lg">
                    {faq.question}
                  </span>
                  {openIndex === index ? <ChevronUpIcon size={20} className="flex-shrink-0 text-blue-600" /> : <ChevronDownIcon size={20} className="flex-shrink-0 text-gray-500" />}
                </button>
                {openIndex === index && <div className="px-6 py-4 bg-white">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>}
              </div>) : <div className="text-center py-8">
                <p className="text-gray-500">
                  No results found for "{searchTerm}"
                </p>
                <button onClick={() => setSearchTerm('')} className="text-blue-600 mt-2 hover:underline focus:outline-none">
                  Clear search
                </button>
              </div>}
            </div>
            {/* Still have questions */}
            <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Still Have Questions?</h3>
              <p className="mb-4">
                Contact our support team for assistance with any questions about
                the SME Tariff Relief Program.
              </p>
              <Button href="/contact" variant="primary">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Related Resources */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Related Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3">Program Guidelines</h3>
              <p className="mb-4">
                Detailed information about eligibility requirements, grant tenure,
                and application procedures.
              </p>
              <Button href="/program-information" variant="outline" size="sm">
                View Guidelines
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3">Grant Estimation</h3>
                <p className="mb-4">
                Calculate your projected monthly installments and overall grant expenses using our dynamic estimator tool.
                </p>
                <Button href="/estimate" variant="outline" size="sm">
                Access Estimator
                </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3">Application Process</h3>
              <p className="mb-4">
                Step-by-step guide to completing your loan application
                successfully.
              </p>
              <Button href="/application/business" variant="outline" size="sm">
                Start Application
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};