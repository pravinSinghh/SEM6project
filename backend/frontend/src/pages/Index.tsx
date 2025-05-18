
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-50"></div>
        <div className="mx-auto max-w-7xl">
          <div className="relative shadow-xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-health-500 to-health-700 mix-blend-multiply"></div>
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">MediConnect</span>
                <span className="block text-health-200">Healthcare Platform</span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                Secure, integrated healthcare management for doctors and patients. 
                With AI-powered features for prescriptions, medical documents, and health assistance.
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                  <Link to="/login">
                    <Button className="flex w-full items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-health-700 shadow-sm hover:bg-gray-50 sm:px-8">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="flex w-full items-center justify-center rounded-md border border-transparent bg-health-100 bg-opacity-20 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-30 sm:px-8">
                      Sign up
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <div className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive Healthcare Management
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              Everything you need for seamless doctor-patient interaction and medical record management.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="bg-health-500 text-white p-2 rounded-md inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 20h8"></path>
                  <path d="M12 4v16"></path>
                  <path d="M4 8h16"></path>
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold">Digital Prescriptions</h3>
              <p className="mt-2 text-gray-600">
                Create, view, and manage digital prescriptions with secure verification and electronic signatures.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="bg-health-500 text-white p-2 rounded-md inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold">Medical Documents</h3>
              <p className="mt-2 text-gray-600">
                Upload, store, and share medical documents securely with OCR capabilities for paper records.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="bg-health-500 text-white p-2 rounded-md inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold">AI Health Assistant</h3>
              <p className="mt-2 text-gray-600">
                Intelligent chat assistant to answer medical questions and provide health information.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="bg-health-500 text-white p-2 rounded-md inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold">Appointment Management</h3>
              <p className="mt-2 text-gray-600">
                Schedule, track, and manage appointments with notifications and calendar integration.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="bg-health-500 text-white p-2 rounded-md inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold">Role-Based Access</h3>
              <p className="mt-2 text-gray-600">
                Secure role-based access control for doctors, patients, and administrators.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="bg-health-500 text-white p-2 rounded-md inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-bold">Secure & Compliant</h3>
              <p className="mt-2 text-gray-600">
                Built with security and privacy in mind, following healthcare compliance standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-health-700">
        <div className="mx-auto max-w-2xl py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block">Create your account today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-health-200">
            Join thousands of healthcare providers and patients using our platform for better healthcare management.
          </p>
          <Link to="/register">
            <Button className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-health-600 hover:bg-health-50 sm:w-auto">
              Sign up for free
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center">
                <div className="bg-health-500 text-white p-1 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
                <span className="ml-2 font-bold text-lg">MediConnect</span>
              </div>
              <p className="text-base text-gray-500">
                Empowering healthcare through technology.
                Secure, efficient, and patient-centered solutions.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div>
                <h3 className="text-base font-medium text-gray-900">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      For Doctors
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      For Patients
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      For Hospitals
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      For Clinics
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2025 MediConnect Healthcare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
