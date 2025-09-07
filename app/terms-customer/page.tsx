import React from 'react';

export default function CustomerTermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Monthly Club — Customer Terms (Buyer Agreement)
          </h1>
          <p className="text-gray-300 text-lg">
            Last updated: 7 September 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 md:p-12 border border-white/10">
          <div className="prose prose-lg prose-invert max-w-none">
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              These Customer Terms (the Terms) form a binding agreement between Monthly Club Ltd ("Monthly Club", "we", "us", "our") and any individual who creates a Customer account or makes a purchase from a Business via the Monthly Club platform (the "Customer", "**you"). By registering an account or completing a purchase, you agree to these Terms. If you do not agree, you must not use the Platform.
            </p>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">1</span>
                1. Introduction & Definitions
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">1.1 About these Terms.</strong> These Terms govern your access to and use of the Monthly Club Platform as a Customer, including browsing Business pages, purchasing Products, and managing subscriptions.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">1.2 Our details.</strong> Monthly Club Ltd, registered address: 96 Spencer Way, United Kingdom. Contact: support@monthlyclubhq.com.
              </p>
              
              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">1.3 Definitions:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li><strong className="text-white">Business / Merchant / Creator</strong> — a person or entity that lists Products on the Platform for sale.</li>
                  <li><strong className="text-white">Customer / Subscriber</strong> — a user who purchases Products from a Business through the Platform.</li>
                  <li><strong className="text-white">Products / Services</strong> — goods, services, digital content, memberships, or other offerings available via the Platform.</li>
                  <li><strong className="text-white">Balance Builder</strong> — a prepaid credit you can add to and redeem only with the specific Business that issued it; not cashable, not transferable, and not a loan or regulated credit.</li>
                  <li><strong className="text-white">Stripe</strong> — the third-party payment processor that facilitates payments between Customers and Businesses.</li>
                  <li><strong className="text-white">Platform Fee</strong> — the fee charged by Monthly Club to Businesses; Customers are not directly charged Platform Fees.</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">2</span>
                2. Eligibility & Account Creation
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">2.1 Eligibility.</strong> You must be at least 18 years old and legally capable of entering into contracts to use the Platform as a Customer.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">2.2 Account creation.</strong> Some purchases may require a Customer account. You agree to provide accurate and up-to-date information and keep your login details secure. You are responsible for all activity under your account unless caused by our negligence.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">2.3 No financial services.</strong> Monthly Club does not provide financial services, credit, or lending. Payments are processed by Stripe, and Businesses are the sellers of record.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">3</span>
                3. Platform Role
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">3.1 Marketplace model.</strong> Monthly Club is a technology provider. We provide the Platform that enables Businesses to create pages and offer Products. We are not the seller of any Products.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">3.2 Business responsibility.</strong> The Business is responsible for:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>Describing, supplying, and delivering Products.</li>
                <li>Setting prices and refund policies.</li>
                <li>Complying with applicable laws (including consumer protection, safety, and tax obligations).</li>
              </ul>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">3.3 Our responsibility.</strong> We facilitate payments via Stripe and provide the Platform "as is". We do not guarantee the quality, legality, or safety of Products.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">3.4 No holding of funds.</strong> Monthly Club does not handle or hold your money. Payments flow directly from you to the Business via Stripe.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">4</span>
                4. Product Types
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">4.1 Recurring Subscriptions.</strong> You authorise the Business to take recurring payments on the schedule shown at checkout. You may cancel at any time via your account or by contacting the Business, but cancellation may not affect payments already processed.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">4.2 Pay-It-Off Plans (Instalments).</strong> Some Businesses allow you to pay for Products in instalments. These are agreements between you and the Business. Monthly Club is not a lender and does not regulate or manage these instalment plans. The Business is responsible for disclosures, compliance with any consumer-credit laws, and enforcement.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">4.3 Balance Builder.</strong> You may add funds to a Balance Builder account with a specific Business. Important terms:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>Credits are redeemable only with that Business.</li>
                <li>Credits are non-transferable, non-refundable (unless required by law), and cannot be exchanged for cash.</li>
                <li>Expiry rules are set by the Business; if no rules are published, credits do not expire.</li>
                <li>Monthly Club is not responsible for unused or unredeemed credits once payment has been made to the Business.</li>
              </ul>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">4.4 One-Time Purchases.</strong> You may purchase a Product for a single, non-recurring payment. The Business is responsible for fulfilling and supporting such purchases.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">5</span>
                5. Acceptable Use
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">5.1 Lawful use.</strong> You must not use the Platform for unlawful, harmful, or fraudulent activity.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">5.2 Prohibited behaviour.</strong> You must not:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>Post or share unlawful, infringing, hateful, threatening, or sexually explicit content.</li>
                <li>Attempt to interfere with the Platform's security, payment flows, or data.</li>
                <li>Attempt to bypass authentication or misuse the Platform in ways not authorised by us.</li>
              </ul>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">5.3 Enforcement.</strong> We may suspend or terminate your Customer account if you violate these Terms or applicable law.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">6</span>
                6. Payments
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">6.1 Payment processing.</strong> All payments are processed by Stripe. Monthly Club does not hold or control your funds. By making a purchase, you authorise Stripe to debit your chosen payment method.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">6.2 Currency & fees.</strong> Transactions are processed in the currency displayed at checkout. Your bank or payment provider may charge conversion fees or international transaction fees.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">6.3 Off-session / recurring payments.</strong> By purchasing a Recurring Subscription, you consent to the Business charging you automatically according to the schedule displayed at checkout.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">7</span>
                7. Refunds, Cancellations & Chargebacks
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">7.1 Refund policy.</strong> Each Business sets its own refund and cancellation policy. You must review this before purchasing. If no policy is displayed, the default is: no voluntary refunds except where required by law.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">7.2 Processing refunds.</strong> Refunds, if applicable, are processed by the Business through Stripe. Timing depends on the Business and Stripe's processing schedule.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">7.3 Chargebacks & disputes.</strong>
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>You may initiate a dispute with your bank or card provider, but the Business is responsible for handling chargebacks and may be charged fees by Stripe.</li>
                <li>Monthly Club is not liable for resolving disputes between Customers and Businesses.</li>
                <li>You must attempt to resolve any issue directly with the Business before initiating a chargeback, where possible.</li>
              </ul>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">7.4 Balance Builder disputes.</strong> Any dispute over Balance Builder credits must be raised with the issuing Business. Monthly Club does not manage or reimburse unused credits.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">8</span>
                8. Limitation of Liability
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">8.1 Platform liability.</strong> To the maximum extent permitted by law, Monthly Club is not liable for:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>Quality, safety, or legality of Products;</li>
                <li>Loss of data, profits, or opportunity;</li>
                <li>Downtime, errors, or interruptions;</li>
                <li>Indirect, incidental, special, or consequential losses.</li>
              </ul>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">8.2 Cap on liability.</strong> Our total liability to you for claims relating to the Platform is limited to £100 GBP or the total Platform Fees the Business has paid Monthly Club in the previous three months (whichever is greater).
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">8.3 Non-excludable liability.</strong> Nothing limits liability for death or personal injury caused by our negligence, fraud, or other liabilities that cannot be lawfully excluded.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">9</span>
                9. Indemnity
              </h2>
              
              <p className="text-gray-300 leading-relaxed">
                You agree to indemnify and hold harmless Monthly Club and its staff, affiliates, and officers against any claim, loss, or liability arising from:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6 mt-4">
                <li>Your misuse of the Platform;</li>
                <li>Your breach of these Terms;</li>
                <li>Your content, reviews, or communications via the Platform;</li>
                <li>Your failure to comply with law or third-party rights.</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">10</span>
                10. Data Protection & Content
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">10.1 Personal data.</strong> Your personal data is collected and processed in accordance with our Privacy Policy. Stripe also processes your payment data according to its terms.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">10.2 Security.</strong> You are responsible for keeping your account login and payment credentials secure. Notify us promptly if you suspect unauthorised access.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">10.3 Content.</strong> You retain ownership of any reviews, messages, or content you post, but grant Monthly Club a worldwide, royalty-free licence to use, store, and display it for the purposes of operating the Platform, including moderation and support.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">10.4 Prohibited content.</strong> Do not post content that is unlawful, infringing, harmful, harassing, or sexually explicit. We may remove content that violates these Terms without notice.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">11</span>
                11. Service Availability & Changes
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">11.1 Availability.</strong> The Platform is provided "as is" and "as available." We do not guarantee uninterrupted access or error-free operation. Outages, delays, or loss of data may occur.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">11.2 Changes to the Platform.</strong> We may add, remove, or change features of the Platform at any time. Where reasonably practicable, we will provide notice of material changes that affect Customers.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">11.3 Support.</strong> Customer support may be provided via email or dashboard. We do not guarantee continuous or bespoke support.
              </p>
            </section>

            {/* Section 12 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">12</span>
                12. Termination & Suspension
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">12.1 By you.</strong> You may close your Customer account at any time via the Platform or by contacting support.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">12.2 By us.</strong> We may suspend or terminate your account immediately if:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>You breach these Terms;</li>
                <li>We are required to do so by law or Stripe;</li>
                <li>We reasonably believe your activity poses risk to us, other users, or Stripe's payment network.</li>
              </ul>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">12.3 Consequences.</strong> Upon termination:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>Your access to the Platform ceases immediately;</li>
                <li>Any unused Balance Builder credits remain with the issuing Business, subject to its policies;</li>
                <li>Outstanding obligations (e.g., payments for ongoing subscriptions) survive termination.</li>
              </ul>
            </section>

            {/* Section 13 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">13</span>
                13. Governing Law & Jurisdiction
              </h2>
              
              <p className="text-gray-300 leading-relaxed">
                These Terms and any dispute or claim (contractual or non-contractual) arising from them are governed by the laws of England and Wales. Disputes are subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            {/* Section 14 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">14</span>
                14. Changes to These Terms
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">14.1 Updates.</strong> We may amend these Terms from time to time. The "last updated" date indicates the most recent version.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">14.2 Notice.</strong> Where changes are material, notice will be given via the Platform, by email, or both.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">14.3 Continued use.</strong> Continued use of the Platform after changes indicates acceptance. If you do not agree to the changes, you must close your account before the updated Terms take effect.
              </p>
            </section>

            {/* Section 15 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">15</span>
                15. Contact Information
              </h2>
              
              <div className="bg-gray-800/50 rounded-lg p-6">
                <p className="text-gray-300 mb-4">For questions regarding these Terms:</p>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-4">Monthly Club Ltd</h3>
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
