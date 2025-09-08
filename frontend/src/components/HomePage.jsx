import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  DocumentTextIcon, 
  UserGroupIcon, 
  MagnifyingGlassCircleIcon as SearchCircleIcon, 
  BoltIcon as LightningBoltIcon 
} from '@heroicons/react/24/outline';
import doctorsImage from '../assets/doctors.png'; 
import Header from './Header'; 

const FeatureCard = ({ icon: Icon, title, children }) => (
  <div className="bg-white/50 p-6 rounded-lg shadow-sm text-center">
    <Icon className="h-8 w-8 text-[#27A292] mx-auto mb-4" />
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{children}</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="bg-[#E6F4F1]">
      <Header />

      {/* Hero Section */}
      <main className="container mx-auto px-6 md:px-12 py-16 md:py-20 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 pr-0 md:pr-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            Your Trusted Partner in Medication Verification
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Ensure your medication is authentic and safe. Our comprehensive verification system provides instant results with complete accuracy and security.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/view-logs">
              <button className="w-full bg-[#27A292] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#208375] transition-colors">
                Verify Medical Logs Now
              </button>
            </Link>
            <button className="bg-white text-gray-700 px-8 py-3 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-12 md:mt-0">
          <img src={doctorsImage} alt="Doctors" className="rounded-lg shadow-lg" />
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Why Choose PharmaChain?</h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with comprehensive medical databases to provide the most reliable medication verification service available.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon={LightningBoltIcon} title="Instant Verification">
              Get results in seconds with our advanced verification algorithms and comprehensive database.
            </FeatureCard>
            <FeatureCard icon={ShieldCheckIcon} title="Secure Platform">
              Your data is protected with enterprise-level security and complete confidentiality.
            </FeatureCard>
            <FeatureCard icon={SearchCircleIcon} title="Advanced Search">
              Search by name, batch number, barcode, or upload an image for instant identification.
            </FeatureCard>
            <FeatureCard icon={DocumentTextIcon} title="Detailed Reports">
              Comprehensive verification reports with manufacturer details and authenticity status.
            </FeatureCard>
            <FeatureCard icon={UserGroupIcon} title="Trusted by Professionals">
              Used by healthcare providers, pharmacists, and medical professionals worldwide.
            </FeatureCard>
            <FeatureCard icon={GlobeAltIcon} title="Global Database">
              Access to international medication databases with real-time updates and accuracy.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1D4B44] text-white">
        <div className="container mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-bold text-lg mb-4">PharmaChain</h3>
              <p className="text-gray-400">Securing the future of pharmaceuticals.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/verify-medicine" className="text-gray-300 hover:text-white">Verify Medicine</Link></li>
                <li><button className="text-gray-300 hover:text-white">About Us</button></li>
                <li><button className="text-gray-300 hover:text-white">Contact</button></li>
                <li><button className="text-gray-300 hover:text-white">Privacy Policy</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><button className="text-gray-300 hover:text-white">Drug Verification</button></li>
                <li><button className="text-gray-300 hover:text-white">Batch Tracking</button></li>
                <li><button className="text-gray-300 hover:text-white">Professional Tools</button></li>
                <li><button className="text-gray-300 hover:text-white">API Integration</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Info</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center"><svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg> info@PharmaChain.com</li>
                <li className="flex items-center"><svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg> +1 (555) 123-4567</li>
                <li className="flex items-center"><svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg> Healthcare District, Medical City</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between text-center md:text-left text-sm">
            <p className="mb-2 md:mb-0">&copy; 2025 PharmaChain. All rights reserved.</p>
            <p>Your information is safe with us.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
