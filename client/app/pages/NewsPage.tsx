import React from 'react';
import Button from '../components/ui/Button';
import { CalendarIcon, ArrowRightIcon, FileTextIcon } from 'lucide-react';
import type { Route } from '../+types/root';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "News & Updates - SME Tariff Relief Program" },
    { name: "description", content: "Stay updated with the latest news and updates about the SME Tariff Relief Program and related economic measures." },
    { name: "keywords", content: "SME, Tariff Relief, News, Updates, Small Business, Economic Measures" },
    { name: "author", content: "SME Tariff Relief Program" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { property: "og:title", content: "News & Updates - SME Tariff Relief Program" },
    { property: "og:description", content: "Stay updated with the latest news and updates about the SME Tariff Relief Program and related economic measures." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://tariff-relief.gov/news" },
    { property: "og:image", content: "https://tariff-relief.gov/assets/news-og-image.jpg" },
  ];
}

export default function NewsPage() {
  const newsArticles = [{
    id: 1,
    title: 'New Tariff Relief Measures Announced for Small Businesses',
    date: 'June 15, 2023',
    excerpt: 'The Department of Commerce announces additional relief measures for businesses affected by recent tariff changes, including expanded eligibility criteria and increased grant availability.',
    content: "The U.S. Department of Commerce has announced an expansion of the SME Tariff Relief Program, providing additional support for small and medium-sized businesses affected by Chinese tariffs. The expanded program includes broader eligibility criteria and an additional $500 million in funding allocation. Secretary of Commerce stated, 'These enhanced measures will ensure that American small businesses have the resources they need to adapt and thrive despite the challenges posed by changing trade conditions.' The new measures take effect immediately, with applications being accepted through the program's online portal.",
    image: 'https://placehold.co/800x400/e2e8f0/64748b?text=Tariff+Relief+Announcement'
  }, {
    id: 2,
    title: 'Application Deadline Extended for Current Funding Cycle',
    date: 'May 28, 2023',
    excerpt: 'SMEs now have until August 31st to submit applications for the current funding cycle, providing additional time for businesses to prepare documentation.',
    content: "The SME Tariff Relief Program has extended its application deadline for the current funding cycle to August 31, 2023. This extension provides small and medium-sized enterprises with additional time to prepare and submit their grant applications. The decision comes in response to feedback from industry associations and business owners who requested more time to gather the necessary documentation and financial records. Program Director explained, 'We understand that business owners are juggling many priorities, and we want to ensure they have adequate time to submit complete applications.' The program encourages businesses to apply early, as funding is limited and applications are processed on a first-come, first-served basis once eligibility is confirmed.",
    image: 'https://placehold.co/800x400/e2e8f0/64748b?text=Deadline+Extension'
  }, {
    id: 3,
    title: 'Success Stories: How SMEs Are Adapting to Tariff Changes',
    date: 'May 10, 2023',
    excerpt: 'Read how three American businesses successfully pivoted their operations with the help of tariff relief funding, creating resilient supply chains and maintaining competitiveness.',
    content: "Three American businesses have successfully transformed their operations with support from the SME Tariff Relief Program, demonstrating effective strategies for adapting to tariff impacts. Midwest Manufacturing, a family-owned business in Ohio, used loan funding to diversify its supply chain and invest in automation technology, reducing reliance on Chinese imports by 60%. Pacific Coast Distributors, a wholesale company in California, utilized program funds to develop new domestic supplier relationships and implement inventory management systems, maintaining profit margins despite increased costs. Tech Solutions Inc., a small technology firm in Texas, invested in research and development to redesign products using domestically available components, resulting in improved product performance and reduced vulnerability to tariff fluctuations. These success stories highlight the program's effectiveness in helping businesses not only survive but thrive amid changing trade conditions.",
    image: 'https://placehold.co/800x400/e2e8f0/64748b?text=Success+Stories'
  }, {
    id: 4,
    title: 'New Educational Resources Available for Tariff-Affected Businesses',
    date: 'April 22, 2023',
    excerpt: 'The program has launched a series of free webinars and guides to help businesses understand and navigate the impact of Chinese tariffs on their operations.',
    content: "The SME Tariff Relief Program has launched a comprehensive set of educational resources for businesses affected by Chinese tariffs. These resources include a series of free webinars, detailed guides, and interactive tools designed to help business owners understand the implications of tariffs on their operations and develop effective response strategies. The educational initiative covers topics such as supply chain diversification, financial planning for tariff impacts, and strategies for maintaining competitiveness in changing market conditions. 'Education is a crucial component of our support for small businesses,' said the Program Education Director. 'These resources complement our financial assistance by providing businesses with the knowledge they need to make informed decisions.' The webinar series begins next month, with registration available through the program website.",
    image: 'https://placehold.co/800x400/e2e8f0/64748b?text=Educational+Resources'
  }, {
    id: 5,
    title: 'Regional Support Centers Opening to Assist Local Businesses',
    date: 'April 5, 2023',
    excerpt: 'New regional support centers will provide in-person assistance to businesses applying for tariff relief funding, with locations in five major cities.',
    content: "The SME Tariff Relief Program is expanding its support infrastructure with the opening of five regional assistance centers across the country. Located in New York, Atlanta, Chicago, Dallas, and San Francisco, these centers will provide in-person assistance to businesses navigating the tariff relief application process. Each center will be staffed with financial advisors, industry specialists, and application counselors who can offer personalized guidance. 'We recognize that some business owners prefer face-to-face interaction when discussing their financial needs and challenges,' explained the Regional Operations Director. 'These centers will make our program more accessible and responsive to local business communities.' The centers will open on a rolling basis over the next two months, with the Chicago location already operational. Business owners can schedule appointments through the program website or by calling the national helpline.",
    image: 'https://placehold.co/800x400/e2e8f0/64748b?text=Regional+Centers'
  }, {
    id: 6,
    title: 'Economic Analysis: Long-term Impact of Tariffs on U.S. Small Businesses',
    date: 'March 18, 2023',
    excerpt: 'A new report examines the projected long-term effects of Chinese tariffs on small businesses across different industries and regions.',
    content: "A comprehensive economic analysis commissioned by the Department of Commerce provides new insights into the long-term impacts of Chinese tariffs on U.S. small businesses. The report, conducted by leading economists and industry analysts, examines sector-specific effects across manufacturing, retail, agriculture, and technology industries. Key findings indicate that without intervention, tariffs could lead to an average 15% increase in operational costs for affected small businesses over the next three years. The analysis also highlights regional disparities, with businesses in the Midwest and Pacific Northwest facing more significant challenges due to their industry composition. 'This analysis reinforces the importance of the SME Tariff Relief Program in supporting economic resilience,' noted the Chief Economist at the Department of Commerce. 'It also helps us target our resources to the sectors and regions where support is most needed.' The full report is available on the program website and will inform future policy decisions.",
    image: 'https://placehold.co/800x400/e2e8f0/64748b?text=Economic+Analysis'
  }];
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-navy-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            News & Updates
          </h1>
          <p className="text-xl max-w-3xl">
            Stay informed about the latest developments in the SME Tariff Relief
            Program and related economic measures.
          </p>
        </div>
      </section>
      {/* Featured Article */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <CalendarIcon size={16} className="mr-2" />
                {newsArticles[0].date}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {newsArticles[0].title}
              </h2>
              <p className="text-lg mb-6">{newsArticles[0].excerpt}</p>
              <p className="mb-6">
                {newsArticles[0].content.substring(0, 200)}...
              </p>
              <Button href={`/news/${newsArticles[0].id}`} variant="primary">
                Read Full Article <ArrowRightIcon size={16} className="ml-2" />
              </Button>
            </div>
            <div>
              <img src={newsArticles[0].image} alt={newsArticles[0].title} className="w-full h-auto rounded-lg shadow-md" />
            </div>
          </div>
        </div>
      </section>
      {/* Recent News */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Recent Updates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsArticles.slice(1, 4).map(article => <div key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <CalendarIcon size={14} className="mr-2" />
                  {article.date}
                </div>
                <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                <p className="text-gray-700 mb-4">{article.excerpt}</p>
                <Button href={`/news/${article.id}`} variant="outline" size="sm">
                  Read More
                </Button>
              </div>
            </div>)}
          </div>
        </div>
      </section>
      {/* News Archive */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">News Archive</h2>
          <div className="space-y-6">
            {newsArticles.slice(4).map(article => <div key={article.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <img src={article.image} alt={article.title} className="w-full h-auto rounded-lg" />
                </div>
                <div className="md:w-3/4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <CalendarIcon size={14} className="mr-2" />
                    {article.date}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                  <p className="text-gray-700 mb-4">{article.excerpt}</p>
                  <Button href={`/news/${article.id}`} variant="outline" size="sm">
                    Read Full Article
                  </Button>
                </div>
              </div>
            </div>)}
          </div>
        </div>
      </section>
      {/* Resources */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FileTextIcon className="text-blue-800" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Tariff Impact Reports</h3>
              <p className="text-gray-700 mb-4">
                Access detailed reports analyzing the economic impact of Chinese
                tariffs on various industry sectors.
              </p>
              <Button href="/resources/reports" variant="outline" size="sm">
                View Reports
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FileTextIcon className="text-blue-800" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Policy Updates</h3>
              <p className="text-gray-700 mb-4">
                Stay informed about the latest policy changes and government
                actions related to international trade.
              </p>
              <Button href="/resources/policy" variant="outline" size="sm">
                Read Updates
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FileTextIcon className="text-blue-800" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Business Guides</h3>
              <p className="text-gray-700 mb-4">
                Practical guides to help your business navigate tariff
                challenges and identify growth opportunities.
              </p>
              <Button href="/resources/guides" variant="outline" size="sm">
                Download Guides
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Newsletter Signup */}
      <section className="py-12 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest updates on the SME
            Tariff Relief Program, policy changes, and resources.
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="Your email address" className="flex-grow px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              <Button type="submit" variant="secondary">
                Subscribe
              </Button>
            </form>
            <p className="text-xs mt-3 text-blue-200">
              We respect your privacy. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};