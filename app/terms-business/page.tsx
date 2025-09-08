import React from 'react';

export default function BusinessTermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Monthly Club — Business Terms (Merchant Agreement)
          </h1>
          <p className="text-gray-300 text-lg">
            Last updated: 7 September 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 md:p-12 border border-white/10">
          <div className="prose prose-lg prose-invert max-w-none">
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              These Business Terms (the Terms) form a binding agreement between Monthly Club Ltd ("Monthly Club", "we", "us", "our") and any person or entity that registers a Business account to list, market, or sell Products or Services via the Monthly Club platform (the "Business", "you"). By creating or using a Business account you agree to these Terms. If you do not agree, you must not create or use a Business account.
            </p>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">1</span>
                1. Introduction & Definitions
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">1.1 About these Terms.</strong> These Terms govern your use of the Monthly Club Platform (the "Platform") and related services we provide to Businesses, including dashboards, checkout, integrations, page builder, Balance Builder, subscription management, and analytics.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">1.2 Our details.</strong> Monthly Club Ltd, registered address: 96 Spencer Way, United Kingdom. Contact: support@monthlyclubhq.com.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">1.3 Interpretation.</strong> Headings are for convenience only. "Including" and similar words are non-exhaustive. References to statutes include modifications and re-enactments.
              </p>
              
              <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">1.4 Definitions:</h3>
                <ul className="space-y-3 text-gray-300">
                  <li><strong className="text-white">Business / Merchant / Creator</strong> — a person or entity that registers a Business account to list Products on the Platform.</li>
                  <li><strong className="text-white">Subscriber / Customer</strong> — an end user who purchases a Product from a Business via the Platform.</li>
                  <li><strong className="text-white">Products / Services</strong> — goods, services, digital content, memberships, vouchers, or other offerings a Business lists on the Platform.</li>
                  <li><strong className="text-white">Platform Fee</strong> — the fee charged by Monthly Club for facilitating a transaction on the Platform as displayed on our pricing page at the time of the transaction.</li>
                  <li><strong className="text-white">Stripe</strong> — the third-party payment processor used on the Platform, including Stripe Connect and related services.</li>
                  <li><strong className="text-white">Recurring Subscription</strong> — a Product billed on a recurring schedule.</li>
                  <li><strong className="text-white">Pay-It-Off Plan (Instalments)</strong> — a Business-defined instalment payment option enabling a Subscriber to pay a Product price over multiple instalments.</li>
                  <li><strong className="text-white">Balance Builder</strong> — a prepaid credit mechanism that lets Subscribers add funds to a balance redeemable only with the issuing Business.</li>
                  <li><strong className="text-white">One-Time Purchase</strong> — a single, non-recurring sale.</li>
                </ul>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">2</span>
                2. Eligibility & Onboarding
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">2.1 Eligibility.</strong> You must be at least 18 and have legal capacity to enter into these Terms. If registering on behalf of an organisation, you confirm you are authorised to bind that organisation.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">2.2 Onboarding & verification.</strong> To accept payments you must complete Stripe onboarding and supply any identity, business, or compliance information requested by us or Stripe. You authorise us to create and manage a Stripe connected account on your behalf (and to exchange information with Stripe for onboarding and ongoing compliance).
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">2.3 KYC & ongoing checks.</strong> You must promptly provide any information requested by us or Stripe (including beneficial ownership, address, ID documents, business model descriptions, and bank details). Failure to comply may result in restricted functionality, delayed payouts, or account suspension.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">2.4 Account security.</strong> You are responsible for keeping account credentials secure. Notify us immediately of any suspected unauthorised access. You remain liable for all actions taken through your account unless attributable to our negligence.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">3</span>
                3. Platform Role & Business Responsibilities
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">3.1 Independent seller.</strong> You are the merchant supplying Products to Subscribers. Monthly Club provides technology and payment orchestration; we are not the seller, merchant of record, or supplier of any Product.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">3.2 Business obligations.</strong> You must:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>Accurately describe Products and pricing.</li>
                <li>Comply with applicable laws (consumer protection, distance selling, taxation, advertising, health/safety, product safety, data protection, and any sector-specific regulation).</li>
                <li>Maintain required licences, registrations or approvals (including for financial services or healthcare when applicable).</li>
                <li>Provide timely fulfilment, support, and after-sales service.</li>
                <li>Maintain records sufficient to demonstrate legal compliance and handle disputes.</li>
              </ul>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">3.3 Stripe & payments.</strong> All payments are processed via Stripe. You must accept and comply with the Stripe Agreements. You acknowledge and accept that Stripe controls payout timing, reserves, and holds, and that we do not control, guarantee, or hold customer funds.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">3.4 Taxes.</strong> You are solely responsible for determining, collecting, reporting and remitting applicable taxes (VAT, sales tax, GST, etc.). We may provide settings to assist tax collection but we do not give tax advice.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">4</span>
                4. Product Types: Rules & Responsibilities
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">4.1 General.</strong> When listing any Product you must provide clear pre-contract information (description, price, billing cycle, delivery times, refund/cancellation rights, and any material restrictions). Your listings must not be misleading.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">4.2 Recurring Subscriptions.</strong>
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>Obtain clear consent to recurring off-session charges and record consent.</li>
                <li>Provide an easy method for Subscribers to cancel recurring payments and clearly state effective dates and notice periods.</li>
                <li>Notify Subscribers of any price changes in advance; obtain renewed consent if legally required.</li>
                <li>Comply with SCA, PSD2, and any authentication requirements when Stripe or law requires re-authorisation.</li>
              </ul>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">4.3 Pay-It-Off Plans (Instalments).</strong>
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>Pay-It-Off Plans are your offering. If you provide goods/services now and accept payments over time, you may be acting as a creditor under consumer credit laws. You are solely responsible for ensuring compliance with any consumer-credit, lending, or debt collection laws, including any requirement for authorisation, disclosures, affordability assessments, cooling-off rights, or licence.</li>
                <li>If any instalment arrangement requires a regulated lender, you must either obtain the necessary permissions or partner with a regulated entity and clearly disclose that relationship to Subscribers.</li>
                <li>You must disclose total amount payable, instalment schedule, consequences of missed payments, and disputes/refunds handling.</li>
              </ul>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">4.4 Balance Builder.</strong>
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>Balance Builder payments are processed to your connected Stripe account under Stripe's payout timings. Monthly Club does not hold or custody Balance Builder funds.</li>
                <li>Credits are redeemable only with the issuing Business, are non-transferable, have no cash value, and may not be sold. Businesses must clearly disclose any expiry or refund rules. If you do not publish rules, the default is: credits do not expire and are non-refundable except where required by law.</li>
                <li>Businesses are responsible for honouring credits, record keeping, and any applicable accounting/tax treatment.</li>
              </ul>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">4.5 One-Time Purchases.</strong> Provide accurate product descriptions, clear pricing, delivery/fulfilment times, and refund/cancellation practices compliant with consumer law.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">5</span>
                5. Acceptable Use & Prohibited Activities
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">5.1 Prohibited uses.</strong> You must not use the Platform to list or promote products or services that are illegal or restricted under Stripe or our acceptable use policies. Examples include illicit drugs, unlicensed gambling, weapons, certain adult services, unlicensed financial services, and counterfeit goods.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">5.2 Content & conduct.</strong> Do not upload, post, or distribute sexually explicit content or services, including pornography, sexual acts, escorting, or other sexual services prohibited under Stripe's terms. Do not upload or distribute unlawful, infringing, violent, harassing, or hateful content. Do not engage in harassment or abusive behaviour towards users or staff.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">5.3 Security & PCI.</strong> Do not collect, store, or process cardholder data outside Stripe's approved flows. Use our official checkout and payment integrations. Do not attempt to bypass SCA or cardholder authentication.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">5.4 Enforcement.</strong> We (and Stripe) may monitor compliance and take action — including removing content, suspending features, or terminating accounts — where we reasonably believe you have violated these Terms or present risk.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">6</span>
                6. Fees, Payments, Refunds & Chargebacks
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">6.1 Processing & Fees.</strong> All transactions are processed via Stripe. Platform Fees (as displayed at the time of transaction) and Stripe's processing fees will be deducted automatically.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">6.2 Payouts.</strong> Stripe issues payouts to your nominated bank account according to Stripe's schedules and policies. We do not control payout timing and are not responsible for Stripe's holds, reserves, or delays.
              </p>
              
              <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
                <p className="text-yellow-200 text-sm leading-relaxed">
                  <strong className="text-yellow-100">Important Payment Timing:</strong> When a customer's payment is successfully processed, Stripe typically holds the funds for approximately 7 days before transferring them to your bank account. This settlement period is standard practice for payment processors to ensure transaction security, handle potential disputes, and comply with financial regulations. The exact timing may vary based on your account status, business type, and Stripe's risk assessment.
                </p>
              </div>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">6.3 Refunds.</strong> You must publish a refund policy that complies with consumer law. If you do not publish a policy, the default is no voluntary refunds except where required by law. All refunds must be processed through Stripe.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">6.4 Chargebacks & disputes.</strong> You are responsible for handling disputes and chargebacks. You bear any chargeback costs, reversal of funds, and Stripe fees resulting from disputes. We may pass through or recover from you any amounts we reasonably incur related to chargebacks.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">6.5 Set-off & recovery.</strong> We may set off any amounts you owe us (Platform Fees, recoveries, chargebacks, penalties) against amounts due to you, against your Stripe balance, or by debiting any payment method you have provided. If your Stripe balance and available funds are insufficient, you must promptly pay any shortfall.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">7</span>
                7. Data Protection & Privacy
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">7.1 Roles.</strong> For Subscriber personal data processed via the Platform:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>You are the data controller of Subscriber data you collect and use for your own purposes (e.g. order fulfilment, marketing).</li>
                <li>Monthly Club acts as an independent controller for data we process to operate and secure the Platform, manage Stripe integration, fraud prevention, and compliance.</li>
              </ul>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">7.2 Compliance.</strong> Each party must comply with UK Data Protection Law, including the UK GDPR and Data Protection Act 2018. You must provide appropriate privacy notices to Subscribers, obtain valid consents where required (e.g. marketing), and respect data subject rights.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">7.3 Data sharing.</strong> You authorise us to share Business and Subscriber data with Stripe and other service providers as necessary to process payments, provide the Platform, or comply with law.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">7.4 Security.</strong> You must implement appropriate technical and organisational measures to protect personal data in your possession. Do not export or share data outside the Platform unless lawful and secure.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">7.5 DPA.</strong> Where we act as processor on your behalf, our Data Processing Addendum (DPA) forms part of these Terms.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">8</span>
                8. Intellectual Property & Content
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">8.1 Business Content.</strong> You retain ownership of the content you upload (e.g. logos, product descriptions, media).
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">8.2 Licence to Monthly Club.</strong> You grant us a worldwide, royalty-free, non-exclusive licence to host, reproduce, display, and distribute your content to:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>You (through your dashboard),</li>
                <li>Subscribers (through your store page), and</li>
                <li>Our staff (for support, moderation, and compliance purposes).</li>
              </ul>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">8.3 Public storage warning.</strong> Certain files (e.g. images in public storage buckets) may be accessible via direct URL. Although access controls are in place, URLs can be shared outside the Platform. You are responsible for what you upload.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">8.4 Prohibited content.</strong> You must not upload content that infringes IP rights, contains malware, promotes unlawful or sexually explicit services, or otherwise breaches these Terms.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">8.5 Our IP.</strong> All rights in the Platform, software, branding, and designs remain ours or our licensors'. You may not copy, reverse-engineer, or exploit the Platform except as permitted in these Terms.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">9</span>
                9. Service Availability & Changes
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">9.1 Availability.</strong> The Platform is provided on an "as is" and "as available" basis. We do not guarantee uninterrupted service or that errors will be corrected.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">9.2 Changes.</strong> We may update, suspend, or discontinue parts of the Platform at any time. Where practicable, we will give reasonable notice of material changes that affect your use.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">9.3 Support.</strong> We may provide support via email or dashboard, but have no obligation to provide continuous or bespoke support unless agreed separately in writing.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">10</span>
                10. Suspension & Termination
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">10.1 By you.</strong> You may close your Business account at any time via dashboard or by contacting support.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">10.2 By us.</strong> We may suspend or terminate your account immediately if:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>You breach these Terms or applicable law,</li>
                <li>We are required to do so by Stripe, regulators, or court order,</li>
                <li>We reasonably believe your activity exposes us, Stripe, or other users to risk (e.g. fraud, reputational, regulatory, or financial risk).</li>
              </ul>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">10.3 Inactivity.</strong> We may terminate accounts inactive for over 12 months.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">10.4 Consequences.</strong> On termination:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>Your listings will be removed.</li>
                <li>Subscriber data may be retained only as required by law or for legitimate business purposes.</li>
                <li>Outstanding obligations (including payment of fees or reimbursements for chargebacks) survive termination.</li>
              </ul>
            </section>

            {/* Section 11 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">11</span>
                11. Indemnities
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">11.1 Business indemnity.</strong> You agree to indemnify and hold harmless Monthly Club, our affiliates, directors, officers, and employees against all claims, damages, costs, losses, and expenses (including reasonable legal fees) arising from:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>Your Products, services, or content,</li>
                <li>Your breach of these Terms,</li>
                <li>Any violation of law or third-party rights,</li>
                <li>Any claim by a Subscriber relating to a Product you supply.</li>
              </ul>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">11.2 Procedure.</strong> We will give you prompt notice of any indemnified claim and allow you to defend it, provided that we may participate with our own counsel at your cost.
              </p>
            </section>

            {/* Section 12 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">12</span>
                12. Limitation of Liability
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">12.1 Exclusions.</strong> To the fullest extent permitted by law, Monthly Club is not liable for:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>Your Products or services,</li>
                <li>Loss of profits, revenue, goodwill, customers, or data,</li>
                <li>Downtime, errors, or interruptions in Platform availability,</li>
                <li>Any indirect, incidental, special, or consequential damages.</li>
              </ul>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">12.2 Cap.</strong> Our total liability to you for all claims in any 12-month period will not exceed the greater of:
              </p>
              
              <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 ml-6">
                <li>(a) the Platform Fees you paid to us in the three (3) months before the event giving rise to the claim, or</li>
                <li>(b) £100 GBP.</li>
              </ul>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">12.3 Non-excludable liability.</strong> Nothing in these Terms excludes liability for death or personal injury caused by negligence, fraud, or any other liability that cannot lawfully be excluded.
              </p>
            </section>

            {/* Section 13 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">13</span>
                13. Governing Law & Jurisdiction
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">13.1 Governing law.</strong> These Terms and any dispute or claim (contractual or non-contractual) arising from them are governed by and construed in accordance with the laws of England and Wales.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">13.2 Jurisdiction.</strong> The courts of England and Wales will have exclusive jurisdiction over any disputes, except that we may seek injunctive or equitable relief in any jurisdiction to protect our intellectual property or confidential information.
              </p>
            </section>

            {/* Section 14 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">14</span>
                14. Changes to These Terms
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">14.1 Updates.</strong> We may amend these Terms from time to time. The "last updated" date at the top of the document indicates when changes were made.
              </p>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                <strong className="text-white">14.2 Notice.</strong> Where changes are material, we will provide notice through the Platform, by email, or both.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">14.3 Continued use.</strong> Your continued use of the Platform after any change takes effect constitutes acceptance of the updated Terms. If you do not agree to the changes, you must close your Business account before the updated Terms apply.
              </p>
            </section>

            {/* Section 15 */}
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
                <span className="bg-gradient-to-r from-brand-purple to-brand-blue text-white px-4 py-2 rounded-lg text-lg mr-4">15</span>
                15. Contact Information
              </h2>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                If you have questions about these Terms, please contact:
              </p>
              
              <div className="bg-gray-800/50 rounded-lg p-6">
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
