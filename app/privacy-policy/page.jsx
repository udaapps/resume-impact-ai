import React from 'react';

// SEO සඳහා Metadata
export const metadata = {
  title: 'Privacy Policy | ResumeClimb AI',
  description: 'Privacy policy and data handling practices for ResumeClimb AI resume tools.',
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy for ResumeClimb AI</h1>
      <p className="mb-8 text-gray-600"><strong>Last Updated:</strong> September 2026</p>

      <p className="mb-8 leading-relaxed">
        Welcome to ResumeClimb AI. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website (www.resumeclimbai.com) and use our AI tools.
      </p>

      <div className="space-y-8">
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <ul className="list-disc list-outside ml-5 space-y-3 leading-relaxed">
            <li>
              <strong>Input Data:</strong> When you use our AI Bullet Generator or ATS Resume Checker, we process the text you input to generate results. We do not permanently store your personal resume data or sell it to third parties.
            </li>
            <li>
              <strong>Usage Data:</strong> We may collect non-personally identifiable information such as your IP address, browser type, operating system, and pages visited to analyze website traffic and improve our services.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Cookies and Tracking Technologies</h2>
          <p className="mb-3 leading-relaxed">
            We use cookies to enhance your browsing experience, analyze site traffic, and serve targeted advertisements. In the future, we may partner with third-party ad networks like Google AdSense, which use cookies to serve ads based on your prior visits to our website or other websites.
          </p>
          <p className="leading-relaxed">
            You can choose to disable cookies through your individual browser options.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Third-Party Links</h2>
          <p className="leading-relaxed">
            Our website may contain links to third-party websites (e.g., Fiverr for human resume review services). We are not responsible for the privacy practices or content of these external sites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at:{' '}
            <a 
              href="mailto:appwudara2016@gmail.com" 
              className="text-blue-600 hover:text-blue-800 font-semibold underline"
            >
              appwudara2016@gmail.com
            </a>.
          </p>
        </section>

      </div>
    </main>
  );
}