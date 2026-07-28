import { useEffect } from "react";

export default function Privacy() {
  useEffect(() => {
    document.title = "EVO CODES | Privacy Policy";
  }, []);

  return (
    <section className="min-h-screen bg-[#050A0A] text-white py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <span className="inline-block px-4 py-2 rounded-full border border-cyan-400 text-cyan-400 tracking-widest text-sm uppercase mb-8">
          Privacy Policy
        </span>

        <h1 className="text-4xl md:text-5xl font-bold mb-10">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <p className="text-gray-400">
            Last updated: January 2026
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide directly, such as your name, email address,
              and any details you submit through our contact forms or newsletter sign-up. We
              also automatically collect certain technical data, including IP address, browser
              type, and usage patterns, to improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p>
              Your information is used to respond to inquiries, provide services, send
              relevant updates (if you opt in), improve our website, and ensure a secure
              experience. We never sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your data against
              unauthorized access, alteration, disclosure, or destruction. However, no method
              of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Cookies</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your
              browsing experience. You can control cookie preferences through your browser
              settings. Disabling cookies may affect certain features of the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party sites. We are not responsible for
              the privacy practices or content of those external websites. We encourage you to
              review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">6. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal data held by us.
              You may also opt out of marketing communications at any time. To exercise these
              rights, please contact us through our
              <a href="/contact" className="text-cyan-400 hover:underline ml-1">Contact page</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Changes will be posted on this
              page with an updated revision date. We encourage you to review this page
              regularly for any updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">8. Contact</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please reach
              out via our
              <a href="/contact" className="text-cyan-400 hover:underline ml-1">Contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}