import React from 'react';
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-300 text-lg">
            Last Updated: August 13, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 md:p-12 border border-white/10">
          <div className="prose prose-lg prose-invert max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                Monthly Club ("we," "us," "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and share your personal data when you use our platform at www.monthlyclubhq.com (the "Platform").
              </p>
              
              <p className="text-gray-300 leading-relaxed text-lg">
                By using the Platform, you agree to this Privacy Policy. If you do not agree, you must not use the Platform.
              </p>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">1</span>
                1. Who We Are
              </h2>
              
              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-4">Monthly Club</h3>
                  <p className="text-gray-300 mb-2">96 Spencer Way</p>
                  <p className="text-gray-300 mb-4">United Kingdom</p>
                  <p className="text-gray-300">
                    Email: <a href="mailto:support@monthlyclubhq.com" className="text-brand-blue hover:text-brand-purple underline">support@monthlyclubhq.com</a>
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                We are the data controller for the personal data we collect, except where we process data on behalf of a Business (see Section 4).
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">2</span>
                2. Data We Collect
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>Email address (used for account login)</li>
                    <li>Profile information (e.g., display name, business name, description, slug, profile image URLs)</li>
                    <li>Subscription history (products you subscribe to)</li>
                    <li>Business content you upload (posts, images, links)</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Payment Information</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>Payment details are processed securely by Stripe — we do not store card or bank account numbers.</li>
                    <li>Stripe may collect identity verification documents directly from Businesses.</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Technical & Usage Data</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>IP addresses and device/browser details</li>
                    <li>Authentication tokens and session data</li>
                    <li>Usage logs and analytics</li>
                    <li>File upload metadata (e.g., image name, size, type)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">3</span>
                3. How We Use Your Data
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                We process your data for:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-6">
                <li><strong className="text-white">Account management</strong> – authentication, security, and account settings.</li>
                <li><strong className="text-white">Platform functionality</strong> – business creation, content posting, subscription management.</li>
                <li><strong className="text-white">Payment processing</strong> – via Stripe Connect for subscriptions and Balance Builder payments.</li>
                <li><strong className="text-white">Communication</strong> – transactional emails (e.g., confirmations, updates, notifications).</li>
                <li><strong className="text-white">Analytics & improvements</strong> – monitoring usage and improving the Platform.</li>
                <li><strong className="text-white">Compliance & enforcement</strong> – preventing fraud, enforcing our Terms, and complying with legal obligations.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">4</span>
                4. Our Role vs. Business Role
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                When you interact with a Business through our Platform, that Business is the data controller for any personal data you provide to them directly (e.g., in messages or service delivery).
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                We act as a data processor for certain data on behalf of the Business (e.g., subscriber lists) and as a data controller for operating the Platform.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">5</span>
                5. How We Share Your Data
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                We only share your data with:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li><strong className="text-white">Stripe</strong> – for payment processing, KYC, and fraud prevention.</li>
                <li><strong className="text-white">Supabase</strong> – for database hosting and file storage.</li>
                <li><strong className="text-white">Vercel</strong> – for hosting the Platform.</li>
                <li><strong className="text-white">Law enforcement</strong> – if required by law or to protect rights, property, or safety.</li>
              </ul>
              
              <p className="text-gray-300 leading-relaxed">
                We do not sell your personal data or share it with advertisers or data brokers.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">6</span>
                6. Cookies & Tracking
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                We use:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li><strong className="text-white">Essential cookies</strong> – for login sessions and platform functionality.</li>
                <li><strong className="text-white">Analytics cookies</strong> – to measure usage and improve performance.</li>
              </ul>
              
              <p className="text-gray-300 leading-relaxed">
                We do not use advertising, social media, or third-party behavioural tracking cookies.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">7</span>
                7. Data Retention
              </h2>
              
              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Retention Periods:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li><strong className="text-white">Account data:</strong> kept while your account is active. Deleted accounts are removed after [12 months] unless we must keep data for legal reasons.</li>
                  <li><strong className="text-white">Payment records:</strong> retained for at least 7 years for tax and compliance.</li>
                  <li><strong className="text-white">Logs:</strong> server logs kept 30–90 days; analytics for 1–2 years.</li>
                </ul>
              </div>
            </section>

            {/* Section 8 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">8</span>
                8. Data Deletion & Your Rights
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                Under the UK Data Protection Act and GDPR, you have the right to:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>Access your data</li>
                <li>Correct inaccuracies</li>
                <li>Delete your data ("right to be forgotten")</li>
                <li>Receive a copy ("data portability")</li>
                <li>Object to processing</li>
              </ul>
              
              <p className="text-gray-300 leading-relaxed">
                To exercise these rights, email <a href="mailto:support@monthlyclubhq.com" className="text-brand-blue hover:text-brand-purple underline">support@monthlyclubhq.com</a>. We will respond within 30 days.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">9</span>
                9. International Data Transfers
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                Supabase and Stripe may process data outside the UK/EU.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                Where applicable, we rely on Standard Contractual Clauses or equivalent safeguards for data transfers.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">10</span>
                10. Security
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                We protect your data through:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>Row Level Security (RLS) in Supabase</li>
                <li>Encrypted data transmission (HTTPS)</li>
                <li>Secure authentication via Supabase Auth</li>
                <li>Access controls limiting who can view your data</li>
              </ul>
              
              <p className="text-gray-300 leading-relaxed">
                However, no system is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">11</span>
                11. Public Content
              </h2>
              
              <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-yellow-300 mb-2">⚠️ Important Notice</h3>
                <p className="text-yellow-200">
                  Images uploaded to certain storage areas may be accessible via direct URL. While access is restricted in the Platform, anyone with the link could view them. Please do not upload sensitive content.
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">12</span>
                12. Age Restrictions
              </h2>
              
              <p className="text-gray-300 leading-relaxed">
                The Platform is for users aged 18 and over. We do not knowingly collect personal data from anyone under 18.
              </p>
            </section>

            {/* Section 13 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">13</span>
                13. Changes to This Policy
              </h2>
              
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with a new "last updated" date. Your continued use of the Platform after changes are made constitutes your acceptance.
              </p>
            </section>

            {/* Section 14 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">14</span>
                14. Complaints
              </h2>
              
              <p className="text-gray-300 leading-relaxed">
                If you are unhappy with how we handle your data, you can contact the UK Information Commissioner's Office (ICO) at{' '}
                <a 
                  href="https://www.ico.org.uk" 
                  className="text-brand-blue hover:text-brand-purple underline" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  www.ico.org.uk
                </a>{' '}
                or your local data protection authority.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
