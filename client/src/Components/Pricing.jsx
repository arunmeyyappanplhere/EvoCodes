import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Download } from "lucide-react";

const PLANS = [
  {
    key: "eco",
    name: "Eco",
    tagline: "A simple, no-frills web presence",
    domain: [999, 1299],
    hosting: [1800, 2500],
    ssl: "Included",
    uiux: 500,
    frontend: 4000,
    backend: null,
    database: null,
    api: "Not Included",
    seo: null,
    testing: "Basic",
    deployment: "Included",
    security: "Basic",
    thirdParty: "Not Included",
    content: "Up to 5 Pages",
    maintenance: 1500,
  },
  {
    key: "basic",
    name: "Basic",
    tagline: "A solid foundation with core functionality",
    domain: [1199, 1599],
    hosting: [1800, 2500],
    ssl: "Included",
    uiux: 1000,
    frontend: 8000,
    backend: 12000,
    database: 0,
    api: "1 Integration",
    seo: 500,
    testing: "Included",
    deployment: "Included",
    security: "Basic",
    thirdParty: "Up to 2 Integrations",
    content: "Up to 10 Pages",
    maintenance: 2500,
  },
  {
    key: "standard",
    name: "Standard",
    tagline: "Full-featured build for growing businesses",
    domain: [1499, 1999],
    hosting: [2500, 4000],
    ssl: "Included",
    uiux: 2500,
    frontend: 15000,
    backend: 20000,
    database: 3000,
    api: "Up to 5 Integrations",
    seo: 2000,
    testing: "Included",
    deployment: "Included",
    security: "Standard",
    thirdParty: "Up to 5 Integrations",
    content: "Up to 25 Pages",
    maintenance: 5000,
  },
  {
    key: "premium",
    name: "Premium",
    tagline: "Enterprise-grade engineering, no limits",
    domain: [1999, 5999],
    hosting: [5000, 10000],
    ssl: "Included",
    uiux: 5000,
    frontend: 30000,
    backend: 40000,
    database: 5000,
    api: "Unlimited",
    seo: 5000,
    testing: "Included",
    deployment: "Included",
    security: "Advanced",
    thirdParty: "Unlimited",
    content: "Unlimited",
    maintenance: 10000,
  },
];

const currency = (n) => `\u20b9${Math.round(n).toLocaleString("en-IN")}`;

const DESCRIPTIVE_ITEMS = [
  { key: "api", label: "API Integration" },
  { key: "testing", label: "Testing & QA" },
  { key: "security", label: "Security" },
  { key: "thirdParty", label: "Third-Party Integrations" },
  { key: "content", label: "Content Upload" },
];

export default function Pricing() {
  const [selectedKey, setSelectedKey] = useState("standard");
  const [domainValue, setDomainValue] = useState({});
  const [hostingValue, setHostingValue] = useState({});
  const [includeMaintenance, setIncludeMaintenance] = useState(false);

  const plan = PLANS.find((p) => p.key === selectedKey);

  const domain = domainValue[plan.key] ?? Math.round((plan.domain[0] + plan.domain[1]) / 2);
  const hosting = hostingValue[plan.key] ?? Math.round((plan.hosting[0] + plan.hosting[1]) / 2);

  const total = useMemo(() => {
    let sum = domain + hosting + plan.uiux + plan.frontend;
    if (plan.backend) sum += plan.backend;
    if (plan.database) sum += plan.database;
    if (plan.seo) sum += plan.seo;
    if (includeMaintenance) sum += plan.maintenance;
    return sum;
  }, [domain, hosting, plan, includeMaintenance]);

  const startingPrice = (p) =>
    p.domain[0] + p.hosting[0] + p.uiux + p.frontend + (p.backend || 0) + (p.database || 0) + (p.seo || 0);

  return (
    <section id="pricing" className="relative bg-transparent py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 print:hidden"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/5 text-cyan-400 text-xs font-mono tracking-wide mb-6">
            TRANSPARENT PRICING
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">Pick your engagement</h2>
          <p className="mt-3 text-gray-secondary max-w-lg mx-auto">
            Every project is different — select a tier, tune the ranges, and get a live estimate.
          </p>
        </motion.div>

        {/* plan selector cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14 print:hidden">
          {PLANS.map((p) => {
            const active = p.key === selectedKey;
            return (
              <motion.button
                key={p.key}
                onClick={() => setSelectedKey(p.key)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={`relative text-left rounded-2xl border p-6 transition-colors ${
                  active
                    ? "border-cyan-400 bg-cyan-400/5 shadow-[0_0_28px_rgba(34,211,238,0.25)]"
                    : "border-white/10 bg-charcoal/30 hover:border-cyan-400/30"
                }`}
              >
                {active && (
                  <span className="absolute top-4 right-4 w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center">
                    <Check size={12} className="text-black" />
                  </span>
                )}
                <h3 className="font-display font-bold text-lg mb-1">{p.name}</h3>
                <p className="text-xs text-gray-secondary mb-4">{p.tagline}</p>
                <p className="text-2xl font-display font-bold text-cyan-400">
                  {currency(startingPrice(p))}
                  <span className="text-xs text-gray-secondary font-body font-normal"> starting</span>
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* selected plan breakdown + estimator */}
        <AnimatePresence mode="wait">
          <motion.div
            key={plan.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid lg:grid-cols-[1.3fr_1fr] gap-8 print:hidden"
          >
            {/* line items */}
            <div className="rounded-2xl border border-cyan-400/15 bg-charcoal/30 p-8">
              <h3 className="font-display font-bold text-xl mb-1">{plan.name} Plan</h3>
              <p className="text-sm text-gray-secondary mb-8">{plan.tagline}</p>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/80">Domain</span>
                  <span className="text-cyan-400 font-semibold">{currency(domain)} / yr</span>
                </div>
                <input
                  type="range"
                  min={plan.domain[0]}
                  max={plan.domain[1]}
                  step={10}
                  value={domain}
                  onChange={(e) => setDomainValue((v) => ({ ...v, [plan.key]: Number(e.target.value) }))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/80">Hosting</span>
                  <span className="text-cyan-400 font-semibold">{currency(hosting)} / yr</span>
                </div>
                <input
                  type="range"
                  min={plan.hosting[0]}
                  max={plan.hosting[1]}
                  step={50}
                  value={hosting}
                  onChange={(e) => setHostingValue((v) => ({ ...v, [plan.key]: Number(e.target.value) }))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <ul className="space-y-3 text-sm mb-6">
                <li className="flex justify-between">
                  <span className="text-white/80">UI/UX Design</span>
                  <span>{currency(plan.uiux)}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/80">Frontend Development</span>
                  <span>{currency(plan.frontend)}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/80">Backend Development</span>
                  <span>{plan.backend ? currency(plan.backend) : <span className="text-gray-secondary">Not Included</span>}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/80">Database Setup</span>
                  <span>
                    {plan.database === null
                      ? <span className="text-gray-secondary">Not Included</span>
                      : plan.database === 0
                      ? "Included"
                      : currency(plan.database)}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-white/80">SEO Setup</span>
                  <span>{plan.seo ? currency(plan.seo) : <span className="text-gray-secondary">Not Included</span>}</span>
                </li>
              </ul>

              <ul className="grid sm:grid-cols-2 gap-3 text-xs text-gray-secondary border-t border-white/10 pt-6">
                {DESCRIPTIVE_ITEMS.map((item) => (
                  <li key={item.key} className="flex justify-between gap-2">
                    <span>{item.label}</span>
                    <span className="text-white/70 text-right">{plan[item.key]}</span>
                  </li>
                ))}
              </ul>

              <label className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={includeMaintenance}
                  onChange={(e) => setIncludeMaintenance(e.target.checked)}
                  className="accent-cyan-400 w-4 h-4"
                />
                <span className="text-white/80">
                  Add Annual Maintenance — <span className="text-cyan-400">{currency(plan.maintenance)}/yr</span>
                </span>
              </label>
            </div>

            {/* estimate summary */}
            <div className="rounded-2xl border border-cyan-400/25 bg-gradient-to-b from-cyan-400/10 to-transparent p-8 flex flex-col">
              <h4 className="text-xs font-mono tracking-wide text-cyan-400 mb-2">ESTIMATED TOTAL</h4>
              <p className="font-display font-bold text-4xl mb-1">{currency(total)}</p>
              <p className="text-xs text-gray-secondary mb-8">First-year estimate, inclusive of selected add-ons</p>

              <ul className="space-y-2 text-sm text-gray-secondary mb-8">
                <li className="flex justify-between"><span>Domain + Hosting</span><span>{currency(domain + hosting)}</span></li>
                <li className="flex justify-between">
                  <span>Design & Development</span>
                  <span>{currency(plan.uiux + plan.frontend + (plan.backend || 0) + (plan.database || 0))}</span>
                </li>
                <li className="flex justify-between"><span>SEO</span><span>{plan.seo ? currency(plan.seo) : "—"}</span></li>
                <li className="flex justify-between"><span>Maintenance</span><span>{includeMaintenance ? currency(plan.maintenance) : "—"}</span></li>
              </ul>

              <motion.button
                onClick={() => window.print()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-auto inline-flex items-center justify-center gap-2 bg-cyan-400 text-black font-semibold text-sm px-6 py-3 rounded-full"
              >
                <Download size={16} /> Download Estimate (PDF)
              </motion.button>
              <p className="text-[11px] text-gray-secondary text-center mt-3">
                Opens your browser's print dialog — choose "Save as PDF" as the destination.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ---------- PRINT-ONLY QUOTE SHEET ---------- */}
      <div id="print-quote" className="hidden print:block print:bg-white print:text-black print:p-12">
        <PrintQuote plan={plan} domain={domain} hosting={hosting} includeMaintenance={includeMaintenance} total={total} />
      </div>
    </section>
  );
}

function PrintQuote({ plan, domain, hosting, includeMaintenance, total }) {
  const date = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
  return (
    <div className="font-sans text-black max-w-2xl mx-auto">
      <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Evo Codes</h1>
          <p className="text-xs text-gray-600">Project Estimate</p>
        </div>
        <div className="text-right text-xs text-gray-600">
          <p>Date: {date}</p>
          <p>Plan: {plan.name}</p>
        </div>
      </div>

      <table className="w-full text-sm border-collapse mb-6">
        <tbody>
          <Row label="Domain" value={`\u20b9${domain.toLocaleString("en-IN")} / yr`} />
          <Row label="Hosting" value={`\u20b9${hosting.toLocaleString("en-IN")} / yr`} />
          <Row label="SSL Certificate" value={plan.ssl} />
          <Row label="UI/UX Design" value={`\u20b9${plan.uiux.toLocaleString("en-IN")}`} />
          <Row label="Frontend Development" value={`\u20b9${plan.frontend.toLocaleString("en-IN")}`} />
          <Row label="Backend Development" value={plan.backend ? `\u20b9${plan.backend.toLocaleString("en-IN")}` : "Not Included"} />
          <Row
            label="Database Setup"
            value={plan.database === null ? "Not Included" : plan.database === 0 ? "Included" : `\u20b9${plan.database.toLocaleString("en-IN")}`}
          />
          <Row label="API Integration" value={plan.api} />
          <Row label="SEO Setup" value={plan.seo ? `\u20b9${plan.seo.toLocaleString("en-IN")}` : "Not Included"} />
          <Row label="Testing & QA" value={plan.testing} />
          <Row label="Deployment" value={plan.deployment} />
          <Row label="Security" value={plan.security} />
          <Row label="Third-Party Integrations" value={plan.thirdParty} />
          <Row label="Content Upload" value={plan.content} />
          <Row label="Maintenance (Annual, optional)" value={includeMaintenance ? `\u20b9${plan.maintenance.toLocaleString("en-IN")}` : "Not selected"} />
        </tbody>
      </table>

      <div className="flex justify-between items-center border-t-2 border-black pt-4">
        <span className="text-lg font-bold">Estimated Total</span>
        <span className="text-lg font-bold">{`\u20b9${Math.round(total).toLocaleString("en-IN")}`}</span>
      </div>

      <p className="text-[11px] text-gray-500 mt-8">
        This is an automatically generated estimate based on the selected plan and options. Final pricing may
        vary based on project scope discussion. Valid for 30 days from the date above.
      </p>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-2 text-gray-700">{label}</td>
      <td className="py-2 text-right font-medium">{value}</td>
    </tr>
  );
}
