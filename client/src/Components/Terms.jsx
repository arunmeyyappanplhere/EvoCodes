import { useEffect } from "react";

export default function Terms() {
  useEffect(() => {
    document.title = "EVO CODES | Terms of Service";
  }, []);

  return (
    <section className="min-h-screen bg-[#050A0A] text-white py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <span className="inline-block px-4 py-2 rounded-full border border-cyan-400 text-cyan-400 tracking-widest text-sm uppercase mb-8">
          Terms of Service
        </span>

        <h1 className="text-4xl md:text-5xl font-bold mb-10">
          Terms & Conditions
        </h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <p className="text-gray-400">
            Last updated: January 2026
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the EVO CODES website, services, or products, you agree to be
              bound by these Terms of Service. If you do not agree with any part of these terms,
              you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. Services Provided</h2>
            <p>
              EVO CODES offers software development, AI integration, SaaS architecture, design
              systems, blockchain solutions, and related technology consulting services. The
              scope, deliverables, and timelines for any project shall be defined in a separate
              agreement between EVO CODES and the client.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. Intellectual Property</h2>
            <p>
              All content, trademarks, and intellectual property displayed on this website are
              the property of EVO CODES unless otherwise stated. You may not reproduce,
              distribute, or create derivative works without our express written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. User Responsibilities</h2>
            <p>
              You agree to use our website and services only for lawful purposes. You must not
              misuse our platform by introducing viruses, malware, or any harmful code. Any
              unauthorized use of our systems may result in termination of access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Limitation of Liability</h2>
            <p>
              EVO CODES shall not be liable for any indirect, incidental, or consequential
              damages arising from the use or inability to use our services, even if we have
              been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Termination</h2>
            <p>
              We reserve the right to suspend or terminate access to our services at any time
              without prior notice if you violate these terms or engage in any prohibited
              activity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Changes to Terms</h2>
            <p>
              EVO CODES reserves the right to update these terms at any time. Changes will be
              posted on this page with an updated revision date. Continued use of our services
              after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">8. Contact</h2>
            <p>
              For questions about these terms, please reach out to our team through the
              <a href="/contact" className="text-cyan-400 hover:underline ml-1">Contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}