import { useState } from "react";
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    contactRequestSenderName: "",
    contactRequestEmail: "",
    phone: "",
    contactRequestSubject: "",
    contactRequestDesc: "",
  });

  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    const contactData = {
      contactRequestId: `CR-${Date.now()}`,
      contactRequestSenderName: formData.contactRequestSenderName,
      contactRequestEmail: formData.contactRequestEmail,
      phone: formData.phone,
      contactRequestSubject: formData.contactRequestSubject,
      contactRequestDesc: formData.contactRequestDesc,
      contactRequestDate: new Date().toLocaleDateString("en-IN"),
      contactRequestStatus: "NEW",
    };

    try {
      const response = await axios.post("http://localhost:8000/api/contact", contactData);  
      if (response.status === 201 || response.status === 200) {
        setStatus({ loading: false, error: null, success: true });
        setFormData({
          contactRequestSenderName: "",
          contactRequestEmail: "",
          phone: "",
          contactRequestSubject: "",
          contactRequestDesc: "",
        });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to send message. Please try again.";
      setStatus({ loading: false, error: errorMessage, success: false });
    }
  };

  document.title = "EVO CODES | Contact Us";

  return (
    <section className="min-h-screen bg-[#050A0A] text-white py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-[160px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[160px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="px-4 py-2 rounded-full border border-cyan-400 text-cyan-400 tracking-widest text-sm">
            CONTACT US
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mt-6">
            Let's Build Something
            <span className="block text-cyan-400">Extraordinary</span>
          </h1>
          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            We'd love to hear from you. Send us your ideas, project details, or simply say hello.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <InfoCard emoji="📧" title="Email" value="hello@evocodes.com" />
            <InfoCard emoji="📞" title="Phone" value="+91 98765 43210" />
            <InfoCard emoji="📍" title="Location" value="Chennai, Tamil Nadu" />
            <InfoCard emoji="🕒" title="Working Hours" value="Monday - Friday | 9 AM - 6 PM" />

            <div className="hidden lg:block">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <SocialButton text="GitHub" />
                <SocialButton text="LinkedIn" />
                <SocialButton text="Instagram" />
              </div>
            </div>
          </div>

          <div className="bg-[#0B1112] border border-cyan-400/20 rounded-3xl p-8 backdrop-blur-lg">
            <h2 className="text-3xl font-bold mb-8">Send a Message</h2>

            {status.success && (
              <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500 text-green-400">
                Message sent successfully! We will get back to you soon.
              </div>
            )}

            {status.error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500 text-red-400">
                {status.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="contactRequestSenderName"
                  placeholder="Full Name"
                  value={formData.contactRequestSenderName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-deep-slate border border-cyan-400/20 px-5 py-4 outline-none focus:border-cyan-400 transition"
                />

                <input
                  type="email"
                  name="contactRequestEmail"
                  placeholder="Email Address"
                  value={formData.contactRequestEmail}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-deep-slate border border-cyan-400/20 px-5 py-4 outline-none focus:border-cyan-400 transition"
                />
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl bg-deep-slate border border-cyan-400/20 px-5 py-4 outline-none focus:border-cyan-400 transition"
              />

              <input
                type="text"
                name="contactRequestSubject"
                placeholder="Subject"
                value={formData.contactRequestSubject}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-deep-slate border border-cyan-400/20 px-5 py-4 outline-none focus:border-cyan-400 transition"
              />

              <textarea
                rows="7"
                name="contactRequestDesc"
                placeholder="Tell us about your project..."
                value={formData.contactRequestDesc}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-deep-slate border border-cyan-400/20 px-5 py-4 outline-none resize-none focus:border-cyan-400 transition"
              />

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={status.loading}
                  className="bg-cyan-400 text-black font-semibold px-8 py-4 rounded-xl hover:shadow-[0_0_25px_rgba(0,255,255,.45)] transition-all duration-300 hover:scale-105 disabled:opacity-50"
                >
                  {status.loading ? "Sending..." : "Send Message →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoCard = ({ emoji, title, value }) => (
  <div className="bg-[#0B1112] border border-cyan-400/20 rounded-2xl p-6 hover:border-cyan-400 transition duration-300">
    <div className="flex items-center gap-5">
      <div className="w-14 h-14 rounded-xl bg-cyan-400/10 flex items-center justify-center text-2xl">
        {emoji}
      </div>
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-400 mt-1">{value}</p>
      </div>
    </div>
  </div>
);

const SocialButton = ({ text }) => (
  <button className="px-5 py-3 rounded-xl bg-[#0B1112] border border-cyan-400/20 hover:bg-cyan-400 hover:text-black transition-all duration-300">
    {text}
  </button>
);

export default Contact;