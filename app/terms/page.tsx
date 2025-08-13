import React from 'react';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms and Conditions
          </h1>
          <p className="text-gray-300 text-lg">
            Last updated: August 13, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 md:p-12 border border-white/10">
          <div className="prose prose-lg prose-invert max-w-none">
            
            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">1</span>
                1. Introduction & Definitions
              </h2>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                These Terms and Conditions ("Terms") govern your access to and use of the Monthly Club platform ("Platform"), operated by Monthly Club ("we," "us," "our"), registered at 96 Spencer Way, United Kingdom.
              </p>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                By creating an account, using our services, or otherwise accessing the Platform, you agree to be bound by these Terms. If you do not agree, you must not use the Platform.
              </p>
              
              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Definitions:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li><strong className="text-white">Business</strong> (also "Creator" or "Merchant"): An account holder who uses the Platform to sell subscription-based services or products to Subscribers.</li>
                  <li><strong className="text-white">Subscriber</strong> (also "Customer"): An account holder who purchases a subscription from a Business via the Platform.</li>
                  <li><strong className="text-white">Content</strong>: Any text, images, media, or other materials uploaded, posted, or shared through the Platform.</li>
                  <li><strong className="text-white">Balance Builder</strong>: A prepaid monthly credit system redeemable only with the specific Business offering it; not cashable, not a loan, and not consumer credit.</li>
                  <li><strong className="text-white">Platform Fee</strong>: The fee charged by Monthly Club for use of the Platform, as displayed on our pricing page at the time of transaction.</li>
                  <li><strong className="text-white">Stripe</strong>: The third-party payment processor we use to facilitate transactions between Businesses and Subscribers.</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">2</span>
                2. Eligibility & Age Restrictions
              </h2>
              
              <p className="text-gray-300 leading-relaxed">
                You must be at least 18 years old to register for or use the Platform. By using the Platform, you confirm that you are at least 18 years old and have the legal capacity to enter into binding contracts.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">3</span>
                3. Platform Role
              </h2>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                We provide software tools that enable Businesses to sell and manage subscriptions. We are not the merchant of record for any services or products offered by Businesses.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                Transactions are processed through Stripe Connect, and each Business is responsible for:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>Complying with Stripe's terms of service and applicable laws.</li>
                <li>Delivering the services/products sold.</li>
                <li>Setting and honouring their own refund policies (see Section 9).</li>
                <li>Calculating, collecting, and remitting any applicable taxes.</li>
              </ul>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                We are not responsible for:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>The quality, safety, legality, or delivery of any Business's services or products.</li>
                <li>Disputes between Businesses and Subscribers.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">4</span>
                4. Acceptable Use Policy
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                When using the Platform, you agree that you will not:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>Use the Platform for any unlawful, harmful, or fraudulent activity.</li>
                <li>Upload, post, or distribute sexually explicit content or services, including pornography, sexual acts, escorting, or other sexual services prohibited under Stripe's terms.</li>
                <li>Engage in harassment, hate speech, threats, or other abusive behaviour.</li>
                <li>Upload, post, or distribute content that infringes intellectual property rights.</li>
                <li>Use the Platform for gambling, illegal drugs, weapons, or other restricted goods/services.</li>
                <li>Interfere with or attempt to circumvent the Platform's security, payment systems, or technical controls.</li>
                <li>Scrape, copy, or reverse-engineer the Platform's software or data.</li>
              </ul>
              
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to remove any content or suspend/terminate accounts at our sole discretion for violations of this policy.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">5</span>
                5. Balance Builder
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                Balance Builder payments are immediately processed to the relevant Business (after standard Stripe payout timelines) and are not held by Monthly Club.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                Credits are redeemable only with the specific Business that issued them; they cannot be transferred, resold, or exchanged for cash, except as required by law.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                Each Business is responsible for setting their own rules regarding expiration or refunds of Balance Builder credits. If a Business does not provide such rules, the default is that credits do not expire and are non-refundable unless required by law.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                Monthly Club is not liable for any unredeemed or unused credits once payment has been processed to a Business.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">6</span>
                6. Payments, Fees & Taxes
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                All payments between Subscribers and Businesses are processed via Stripe Connect. By using the Platform, Businesses agree to <a href="https://stripe.com/connect-account/legal" className="text-brand-blue hover:text-brand-purple underline" target="_blank" rel="noopener noreferrer">Stripe's Connected Account Agreement</a>.
              </p>
              
              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Key Points:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>
                    <strong className="text-white">Platform Fee:</strong> We charge a fee for use of the Platform, as displayed on our{' '}
                    <a
                      href="https://www.monthlyclubhq.com/pricing"
                      className="text-brand-blue hover:text-brand-purple underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      pricing page
                    </a>
                    {' '}at the time of transaction. This fee is deducted automatically from each transaction.
                  </li>
                  <li><strong className="text-white">Payouts:</strong> Businesses receive payouts directly from Stripe according to Stripe's payout schedule. Monthly Club does not control payout timing or availability.</li>
                  <li><strong className="text-white">Taxes:</strong> Businesses are solely responsible for determining, collecting, reporting, and remitting any applicable taxes (e.g., VAT, GST, sales tax) related to their sales. Monthly Club does not provide tax advice and does not calculate or remit taxes on behalf of Businesses.</li>
                  <li><strong className="text-white">Currency:</strong> All transactions are processed in the currency displayed at checkout. Exchange rates and conversion fees (if any) are determined by Stripe or the payment provider.</li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">7</span>
                7. Refunds, Disputes & Chargebacks
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">Refund Policy:</strong> Each Business is responsible for establishing its own refund policy. If no policy is provided, the default is no refunds unless required by applicable law.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">Processing Refunds:</strong> Refunds, where applicable, are processed through Stripe and may be subject to Stripe's fees and processing timelines.
              </p>
              
              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Chargebacks & Disputes:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>Disputes between a Subscriber and a Business must be resolved between those parties.</li>
                  <li>If a Subscriber initiates a chargeback, the Business will be liable for any resulting Stripe fees or adjustments.</li>
                  <li>Monthly Club reserves the right to pass on any chargeback-related costs to the Business.</li>
                </ul>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">Platform's Role:</strong> Monthly Club is not responsible for issuing refunds on behalf of Businesses and does not mediate disputes unless required by law.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">8</span>
                8. Limitation of Liability
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                To the maximum extent permitted by law:
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                Monthly Club is not liable for:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>The quality, safety, legality, or delivery of any services or products sold by Businesses.</li>
                <li>Loss of profits, revenues, customers, or data.</li>
                <li>Downtime, errors, or interruptions in the Platform's availability.</li>
                <li>Any indirect, incidental, or consequential damages.</li>
              </ul>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                Our total liability to any user for any claim relating to the Platform will not exceed the greater of:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>(a) The total Platform Fees paid to us by that user in the three (3) months preceding the event giving rise to the claim; or</li>
                <li>(b) £100 GBP.</li>
              </ul>
              
              <p className="text-gray-300 leading-relaxed">
                Nothing in these Terms excludes or limits liability for death or personal injury caused by negligence, fraud, or other liabilities that cannot be excluded by law.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">9</span>
                9. Indemnification
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                You agree to indemnify and hold harmless Monthly Club, its affiliates, directors, officers, and employees from any claims, damages, liabilities, costs, or expenses (including reasonable legal fees) arising out of:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-6">
                <li>Your use of the Platform.</li>
                <li>Your breach of these Terms.</li>
                <li>Any content you upload or services you provide through the Platform.</li>
                <li>Any violation of another person's or entity's rights.</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">10</span>
                10. Content Ownership & Licence
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">Business Content:</strong> Businesses retain all rights to the content they create and upload to the Platform ("Business Content").
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">Licence to Monthly Club:</strong> By uploading or posting Business Content, you grant Monthly Club a worldwide, non-exclusive, royalty-free licence to host, store, reproduce, and display such content to:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>You (as the content owner)</li>
                <li>Your active Subscribers</li>
                <li>Monthly Club staff for moderation and support purposes</li>
              </ul>
              
              <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-yellow-300 mb-2">⚠️ Public Storage Warning</h3>
                <p className="text-yellow-200">
                  Certain uploaded content (such as images in public storage buckets) may be accessible via direct URL. You acknowledge that while access controls are in place within the Platform, URLs can be shared outside the Platform.
                </p>
              </div>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">Prohibited Content:</strong> You must not upload content that:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>Violates intellectual property rights.</li>
                <li>Contains malware or harmful code.</li>
                <li>Depicts or promotes sexually explicit material, pornography, or sexual services.</li>
                <li>Is unlawful, harassing, threatening, defamatory, or hateful.</li>
              </ul>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">Moderation Rights:</strong> We may remove or restrict access to any content at our sole discretion, without notice, for violations of these Terms or if required by law.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">11</span>
                11. Service Availability & Changes
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                The Platform is provided on an "as is" and "as available" basis without warranties of any kind.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                We do not guarantee uninterrupted or error-free service. Outages, delays, or data loss may occur.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                We may add, change, suspend, or discontinue any part of the Platform at any time without liability to you.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                Where practicable, we will give reasonable notice before making material changes.
              </p>
            </section>

            {/* Section 12 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">12</span>
                12. Termination & Suspension
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">By You:</strong> You may close your account at any time via the Platform settings or by contacting support.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">By Us:</strong> We may suspend or terminate your account immediately if:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>You breach these Terms.</li>
                <li>We are required to do so by law or a court order.</li>
                <li>We reasonably believe your activity poses risk to us, other users, or Stripe's payment network.</li>
              </ul>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">Inactivity:</strong> We may terminate accounts that have been inactive for more than 12 months.
              </p>
              
              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">Post-Termination:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>Your access to the Platform will cease immediately.</li>
                  <li>We may retain certain data as required by law or for legitimate business purposes (see Privacy Policy).</li>
                  <li>Any outstanding obligations (including payment of fees) survive termination.</li>
                </ul>
              </div>
            </section>

            {/* Section 13 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">13</span>
                13. Governing Law & Jurisdiction
              </h2>
              
              <p className="text-gray-300 leading-relaxed">
                These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            {/* Section 14 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">14</span>
                14. Changes to These Terms
              </h2>
              
              <p className="text-gray-300 leading-relaxed">
                We may update these Terms from time to time. Changes will be posted on this page with a new "last updated" date. Your continued use of the Platform after changes are made constitutes your acceptance of the updated Terms.
              </p>
            </section>

            {/* Section 15 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">15</span>
                15. Contact Information
              </h2>
              
              <div className="bg-gray-800/50 rounded-lg p-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-4">Monthly Club</h3>
                  <p className="text-gray-300 mb-2">96 Spencer Way</p>
                  <p className="text-gray-300 mb-4">United Kingdom</p>
                  <p className="text-gray-300">
                    Email: <a href="mailto:support@monthlyclubhq.com" className="text-brand-blue hover:text-brand-purple underline">support@monthlyclubhq.com</a>
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
