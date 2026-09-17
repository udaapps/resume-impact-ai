import React from 'react';

// SEO සඳහා Metadata
export const metadata = {
  title: 'Terms of Service | ResumeClimb AI',
  description: 'Terms of service and usage guidelines for ResumeClimb AI resume tools and guides.',
};

export default function TermsOfService() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-8 text-gray-600"><strong>Last Updated:</strong> September 2026</p>

      <p className="mb-8 leading-relaxed">
        By accessing or using ResumeClimb AI (www.resumeclimbai.com), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.
      </p>

      <div className="space-y-8">
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Use of AI Tools</h2>
          <p className="leading-relaxed">
            ResumeClimb AI provides free tools, including an AI Resume Bullet Generator and an ATS Resume Checker. These tools are designed to assist you in writing and formatting your resume. However, you are solely responsible for reviewing and verifying all generated content before using it in job applications. We do not encourage adding false experience or skills.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. No Guarantee of Employment</h2>
          <p className="leading-relaxed">
            While our tools and guides aim to improve your resume, ResumeClimb AI makes no guarantees, representations, or warranties that using our services will result in job interviews, employment offers, or career advancement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
          <p className="leading-relaxed">
            All original content, articles, and guides on this website are the property of ResumeClimb AI (UDA Apps) and are protected by copyright laws. You may not reproduce or distribute our content without prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Limitation of Liability</h2>
          <p className="leading-relaxed">
            In no event shall ResumeClimb AI or UDA Apps be held liable for any direct, indirect, incidental, or consequential damages arising out of your use of our website or tools.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Changes to Terms</h2>
          <p className="leading-relaxed">
            We reserve the right to update or modify these terms at any time without prior notice. Continued use of the website after any changes indicates your acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Contact Information</h2>
          <p className="leading-relaxed">
            For any questions regarding these Terms, please contact us at:{' '}
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