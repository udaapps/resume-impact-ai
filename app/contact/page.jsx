import React from 'react';

// SEO සඳහා Metadata
export const metadata = {
  title: 'Contact Us | ResumeClimb AI',
  description: 'Contact ResumeClimb AI for support, questions about our AI resume tools, or business inquiries.',
};

export default function ContactUs() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      
      <p className="mb-8 leading-relaxed text-lg">
        We would love to hear from you! Whether you have a question about our free AI resume tools, need help with our guides, or have a business inquiry, feel free to reach out.
      </p>

      <div className="space-y-8 bg-gray-50 p-8 rounded-lg border border-gray-200">
        
        <section>
          <h2 className="text-2xl font-semibold mb-3">Email Us:</h2>
          <p className="leading-relaxed">
            For general inquiries and support, please email us at:<br/>
            <a 
              href="mailto:appwudara2016@gmail.com" 
              className="text-blue-600 hover:text-blue-800 font-semibold text-lg mt-2 inline-block underline"
            >
              appwudara2016@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Human Resume Review Support:</h2>
          <p className="leading-relaxed">
            If you have questions regarding our Fiverr Human Resume Service package, please contact us directly through the messaging system on our Fiverr gig page.
          </p>
        </section>

      </div>

      <p className="mt-8 text-gray-500 italic">
        Built by UDA Apps. We aim to respond to all inquiries within 24-48 hours.
      </p>
    </main>
  );
}