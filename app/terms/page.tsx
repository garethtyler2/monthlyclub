import React from 'react';
import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms and Conditions
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Choose the terms that apply to you:
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 md:p-12 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Business Terms */}
            <div className="bg-gradient-to-br from-brand-purple/10 to-brand-blue/10 rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">For Business Owners</h2>
              <p className="text-gray-300 mb-6">
                Terms and conditions for businesses using Monthly Club to sell subscriptions and manage customers.
              </p>
              <Link 
                href="/terms-business"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-purple to-brand-blue text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200"
              >
                View Business Terms
              </Link>
            </div>

            {/* Customer Terms */}
            <div className="bg-gradient-to-br from-brand-blue/10 to-brand-green/10 rounded-xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">For Customers</h2>
              <p className="text-gray-300 mb-6">
                Terms and conditions for customers subscribing to services through Monthly Club.
              </p>
              <Link 
                href="/terms-customer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-green text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200"
              >
                View Customer Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
