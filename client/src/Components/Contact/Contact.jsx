import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    setFormData({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

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
            We'd love to hear from you. Send us your ideas, project details,
            or simply say hello.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          

          <div className="space-y-6">
            <InfoCard
              emoji="📧"
              title="Email"
              value="hello@evocodes.com"
            />

            <InfoCard
              emoji="📞"
              title="Phone"
              value="+91 98765 43210"
            />

            <InfoCard
              emoji="📍"
              title="Location"
              value="Chennai, Tamil Nadu"
            />

            <InfoCard
              emoji="🕒"
              title="Working Hours"
              value="Monday - Friday | 9 AM - 6 PM"
            />

            {/* Social */}

           {/* Desktop Social */}
<div className="hidden lg:block">
  <h3 className="text-lg font-semibold mb-4">
    Follow Us
  </h3>

  <div className="flex gap-4">
    <SocialButton text="GitHub" />
    <SocialButton text="LinkedIn" />
    <SocialButton text="Instagram" />
  </div>
</div>
          </div>

          {/* Right Section */}

          <div className="bg-[#0B1112] border border-cyan-400/20 rounded-3xl p-8 backdrop-blur-lg">
            <h2 className="text-3xl font-bold mb-8">
              Send a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-[#111819] border border-cyan-400/20 px-5 py-4 outline-none focus:border-cyan-400 transition"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl bg-[#111819] border border-cyan-400/20 px-5 py-4 outline-none focus:border-cyan-400 transition"
                />
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-[#111819] border border-cyan-400/20 px-5 py-4 outline-none focus:border-cyan-400 transition"
              />

              <textarea
                rows="7"
                name="message"
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-[#111819] border border-cyan-400/20 px-5 py-4 outline-none resize-none focus:border-cyan-400 transition"
              />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-cyan-400 text-black font-semibold px-8 py-4 rounded-xl hover:shadow-[0_0_25px_rgba(0,255,255,.45)] transition-all duration-300 hover:scale-105"
              >
                Send Message →
              </button>
              </div>
            </form>
            <div className="lg:hidden mt-10">
  <h3 className="text-lg font-semibold mb-4">
    Follow Us
  </h3>

  <div className="flex flex-wrap gap-4">
    <SocialButton text="GitHub" />
    <SocialButton text="LinkedIn" />
    <SocialButton text="Instagram" />
  </div>
</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoCard = ({ emoji, title, value }) => {
  return (
    <div className="bg-[#0B1112] border border-cyan-400/20 rounded-2xl p-6 hover:border-cyan-400 transition duration-300">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-xl bg-cyan-400/10 flex items-center justify-center text-2xl">
          {emoji}
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            {title}
          </h3>

          <p className="text-gray-400 mt-1">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

const SocialButton = ({ text }) => {
  return (
   
    <button
      className="px-5 py-3 rounded-xl bg-[#0B1112] border border-cyan-400/20 hover:bg-cyan-400 hover:text-black transition-all duration-300"
    >
      {text}
    </button>
  );
};

export default Contact;