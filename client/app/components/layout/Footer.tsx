import React from 'react';
import { Link } from 'react-router';
import { PhoneIcon, MailIcon, GlobeIcon } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">
              USA Tariff Relief Program
            </h3>
            <p className="text-gray-300 mb-4">
              A government-backed initiative supporting individuals and small and medium-sized
              enterprises in preparing for the economic impact of upcoming
              Chinese tariffs.
            </p>
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                <img src="https://placehold.co/100x100/002D62/FFFFFF?text=GOV" alt="Government Seal" className="h-8 w-8 rounded-full" />
              </div>
              <span className="text-sm">U.S. Department of Commerce</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/program-information" className="text-gray-300 hover:text-white">
                  Program Information
                </Link>
              </li>
              <li>
                <Link to="/estimate" className="text-gray-300 hover:text-white">
                  Grant Estimation
                </Link>
              </li>
              <li>
                <Link to="/apply/individual" className="text-gray-300 hover:text-white">
                  Apply as an Individual
                </Link>
              </li>
              <li>
                <Link to="/apply/business" className="text-gray-300 hover:text-white">
                  Apply as an SME
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-white">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <PhoneIcon size={18} className="mr-2" />
                <span className="text-gray-300">(202) 555-1234</span>
              </div>
              <div className="flex items-center">
                <MailIcon size={18} className="mr-2" />
                <span className="text-gray-300">tariffrelief@commerce.gov</span>
              </div>
              <div className="flex items-center">
                <GlobeIcon size={18} className="mr-2" />
                <span className="text-gray-300">
                  www.commerce.gov/tariffrelief
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} U.S. Department of Commerce. All
              rights reserved.
            </div>
            <div className="flex space-x-4">
              <Link to="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/accessibility" className="hover:text-white">
                Accessibility
              </Link>
              <Link to="/terms" className="hover:text-white">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}