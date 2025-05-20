import React from 'react';
import Button from '../components/ui/Button';
import { ArrowRightIcon, CheckCircleIcon, FileTextIcon, CalculatorIcon, HelpCircleIcon } from 'lucide-react';
import type { Route } from '../+types/root';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "SME Tariff Relief Application" },
    { name: "description", content: "Apply for the SME Tariff Relief Program to mitigate the impact of tariffs on your business." },
    { name: "keywords", content: "SME, Tariff Relief, Grants, Small Business, Federal Program" },
    { name: "author", content: "SME Tariff Relief Program" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { property: "og:title", content: "SME Tariff Relief Application" },
    { property: "og:description", content: "Apply for the SME Tariff Relief Program to mitigate the impact of tariffs on your business." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://tariff-relief.gov/" },
    { property: "og:image", content: "https://tariff-relief.gov/assets/og-image.jpg" },
  ];
}

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-navy-700 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                Preparing America for Economic Change
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Federal grants to help businesses and individuals adapt to the economic impact of upcoming Chinese tariffs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/application/business" size="lg" variant="white">
                  Apply for SME Grant{' '}
                  <ArrowRightIcon className="ml-2" size={20} />
                </Button>
                <Button href="/individual-grant" size="lg" variant="ghost">
                  Individual Grant
                  <ArrowRightIcon className="ml-2" size={20} />
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img src="https://placehold.co/600x400/e2e8f0/64748b?text=Small+Business+Success" alt="Small business owner reviewing documents" className="w-full h-auto rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Key Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-blue-900">
            Key Features of Tariff Relief for SMEs and Individuals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FileTextIcon className="text-blue-800" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-900">Financial Support</h3>
              <p className="text-gray-700">
                Access grants designed to offset the financial impact of Chinese tariffs on small and medium enterprises.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <CalculatorIcon className="text-blue-800" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-900">Simplified Application</h3>
              <p className="text-gray-700">
                Benefit from a streamlined application process with quick approvals for eligible businesses and individuals.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <HelpCircleIcon className="text-blue-800" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-900">Expert Assistance</h3>
              <p className="text-gray-700">
                Receive guidance from specialists to effectively utilize funds and adapt to tariff-related challenges.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Eligibility Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-900">
                Are You Eligible for Tariff Relief?
              </h2>
              <p className="text-lg mb-6 text-gray-800">
                The Tariff Relief Program supports both businesses and individuals impacted by Chinese tariffs. Check the eligibility criteria below:
              </p>
              <h3 className="text-xl font-bold mb-4 text-blue-900">For Businesses:</h3>
              <ul className="space-y-3 mb-6">
                {['U.S.-based small or medium enterprise (fewer than 200 employees)', 'Demonstrable impact from Chinese tariffs on business operations', 'Minimum 2 years in business with positive revenue growth', 'Clear plan for utilizing funds to adapt to tariff changes', 'Good standing with federal, state, and local tax authorities'].map((item, index) => <li key={index} className="flex items-start">
                  <CheckCircleIcon className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-800">{item}</span>
                </li>)}
              </ul>
              <h3 className="text-xl font-bold mb-4 text-blue-900">For Individuals:</h3>
              <ul className="space-y-3">
                {['U.S. citizen or permanent resident', 'Demonstrable financial hardship due to tariff-related economic changes', 'Clear plan for utilizing funds to improve financial stability', 'Good standing with federal, state, and local tax authorities'].map((item, index) => <li key={index} className="flex items-start">
                  <CheckCircleIcon className="text-green-600 mr-2 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-800">{item}</span>
                </li>)}
              </ul>
              <div className="mt-8">
                <Button href="/program-information" variant="primary">
                  Check Full Eligibility Requirements
                </Button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img src="https://placehold.co/600x400/e2e8f0/64748b?text=Eligibility+Check" alt="Eligibility verification" className="w-full h-auto rounded" />
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
        Ready to Apply for Federal Grants?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white">
        Our streamlined application process makes it easy to secure the funding
        your business or individual needs to grow and succeed.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button href="/application/business" size="lg" variant="secondary">
          Apply for Business
        </Button>
        <Button href="/individual-grant" size="lg" variant="ghost">
          Apply as Individual
        </Button>
          </div>
        </div>
      </section>
      {/* Latest Updates Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900">Latest Grant Updates</h2>
            <Button href="/news" variant="outline">
              View All Updates
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
              title: 'New Federal Grant Opportunities Announced',
              date: 'June 15, 2023',
              excerpt: 'The Department of Commerce announces new grant programs for businesses adapting to economic changes.'
            }, {
              title: 'Grant Application Deadline Extended',
              date: 'May 28, 2023',
              excerpt: 'SMEs now have until August 31st to submit applications for the current grant cycle.'
            }, {
              title: 'Success Stories: How SMEs Are Thriving',
              date: 'May 10, 2023',
              excerpt: 'Read how three American businesses successfully expanded their operations with federal grant funding.'
            }].map((news, index) => <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 mb-2">{news.date}</p>
              <h3 className="text-xl font-bold mb-3 text-blue-900">{news.title}</h3>
              <p className="text-gray-800 mb-4">{news.excerpt}</p>
              <Button href={`/news/${index}`} variant="outline" size="sm">
                Read More
              </Button>
            </div>)}
          </div>
        </div>
      </section>
    </div>
  );
};