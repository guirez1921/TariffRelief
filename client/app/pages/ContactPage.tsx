import React, { useState } from 'react';
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon, CheckCircleIcon } from 'lucide-react';
import Button from '~/components/ui/Button';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    subject: '',
    message: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-navy-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl">
            Get in touch with our team for assistance with the SME Tariff Relief
            Program.
          </p>
        </div>
      </section>
      {/* Contact Information */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              {formStatus === 'success' ? <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
                <div className="flex">
                  <CheckCircleIcon className="text-green-500 mr-3 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-lg font-medium text-green-800">
                      Message Received
                    </h3>
                    <p className="text-green-700 mt-1">
                      Thank you for contacting the SME Tariff Relief Program.
                      A representative will review your inquiry and respond
                      within 1-2 business days.
                    </p>
                    <button onClick={() => setFormStatus('idle')} className="mt-3 text-green-700 font-medium hover:underline focus:outline-none">
                      Send another message
                    </button>
                  </div>
                </div>
              </div> : <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block font-medium mb-2">
                      Full Name *
                    </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-medium mb-2">
                      Email Address *
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block font-medium mb-2">
                      Phone Number
                    </label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label htmlFor="businessName" className="block font-medium mb-2">
                      Business Name *
                    </label>
                    <input type="text" id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block font-medium mb-2">
                    Subject *
                  </label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select a subject</option>
                    <option value="Application Assistance">
                      Application Assistance
                    </option>
                    <option value="Eligibility Questions">
                      Eligibility Questions
                    </option>
                    <option value="Loan Terms">Loan Terms</option>
                    <option value="Documentation Requirements">
                      Documentation Requirements
                    </option>
                    <option value="Technical Support">
                      Technical Support
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block font-medium mb-2">
                    Message *
                  </label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <Button type="submit" variant="primary" disabled={formStatus === 'submitting'}>
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>}
            </div>
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
                <h3 className="font-bold text-lg mb-4">
                  SME Tariff Relief Program Office
                </h3>
                <div className="space-y-4">
                  <div className="flex">
                    <MapPinIcon size={20} className="text-blue-800 mr-3 flex-shrink-0" />
                    <div>
                      <p>1401 Constitution Ave. NW</p>
                      <p>Washington, DC 20230</p>
                    </div>
                  </div>
                  <div className="flex">
                    <PhoneIcon size={20} className="text-blue-800 mr-3 flex-shrink-0" />
                    <div>
                      <p>(202) 555-1234</p>
                      <p className="text-sm text-gray-500">
                        Toll-free: (800) 555-9876
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <MailIcon size={20} className="text-blue-800 mr-3 flex-shrink-0" />
                    <div>
                      <p>tariffrelief@commerce.gov</p>
                      <p className="text-sm text-gray-500">
                        For general inquiries
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <ClockIcon size={20} className="text-blue-800 mr-3 flex-shrink-0" />
                    <div>
                      <p>Monday - Friday</p>
                      <p>8:30 AM - 5:00 PM ET</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-4">Regional Offices</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium">Northeast Region</h4>
                    <p className="text-sm">New York, NY</p>
                    <p className="text-sm">(212) 555-4321</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Southeast Region</h4>
                    <p className="text-sm">Atlanta, GA</p>
                    <p className="text-sm">(404) 555-7890</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Midwest Region</h4>
                    <p className="text-sm">Chicago, IL</p>
                    <p className="text-sm">(312) 555-6543</p>
                  </div>
                  <div>
                    <h4 className="font-medium">West Region</h4>
                    <p className="text-sm">San Francisco, CA</p>
                    <p className="text-sm">(415) 555-9087</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Map Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Location</h2>
          <div className="max-w-5xl mx-auto">
            <div className="aspect-w-16 aspect-h-9">
              <img src="https://placehold.co/1200x600/e2e8f0/64748b?text=Map+Location" alt="Map showing the location of the SME Tariff Relief Program Office" className="w-full h-auto rounded-lg shadow-md" />
              {/* w-full h-96 rounded-lg shadow-lg overflow-hidden <APIProvider apiKey={'AIzaSyDjZeqyp_FR0q2hKUsUaFq0nBGCBs7UHHk'} onLoad={() => console.log('Maps API has loaded.')}>
                <Map defaultZoom={13} defaultCenter={{lat: 38.892937, lng: -77.032754}}></Map>
              </APIProvider> */}
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              U.S. Department of Commerce, 1401 Constitution Ave NW, Washington,
              DC 20230
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};