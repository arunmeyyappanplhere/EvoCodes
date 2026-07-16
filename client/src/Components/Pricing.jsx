import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Download, Leaf, Layers, Sparkles, Crown, Minus, Plus } from "lucide-react";

const PLAN_META = {
  eco: { icon: Leaf, color: "#67E8F9" },
  basic: { icon: Layers, color: "#22D3EE" },
  standard: { icon: Sparkles, color: "#22D3EE" },
  premium: { icon: Crown, color: "#A78BFA" },
};

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
    popular: true,
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

function useAnimatedNumber(value, duration = 450) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    const start = prevRef.current;
    const change = value - start;
    if (change === 0) return;
    let raf;
    let startTime = null;

    const step = (ts) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + change * eased);
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        prevRef.current = value;
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return display;
}

/* ---------------------------------------------------------
   Themed money input: native number-input spinner arrows
   are hidden (Tailwind arbitrary variants target the
   webkit pseudo-elements directly; -moz-appearance handles
   Firefox), replaced with custom cyan +/- stepper buttons.
--------------------------------------------------------- */
function MoneyInput({ value, onChange, step = 50, size = "md" }) {
  const dims = size === "sm" ? "w-16 text-sm" : "w-20";
  return (
    <div className="inline-flex items-center bg-deep-slate border border-cyan-400/20 rounded-lg overflow-hidden focus-within:border-cyan-400/60 transition-colors">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - step))}
        className="px-2 py-1.5 text-cyan-400/60 hover:text-cyan-400 hover:bg-cyan-400/10 active:bg-cyan-400/20 transition-colors"
        aria-label="Decrease"
      >
        <Minus size={11} />
      </button>
      <div className="flex items-center gap-0.5 px-1">
        <span className="text-cyan-400 text-xs">₹</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          className={`${dims} bg-transparent text-center text-cyan-400 font-semibold outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]`}
        />
      </div>
      <button
        type="button"
        onClick={() => onChange(value + step)}
        className="px-2 py-1.5 text-cyan-400/60 hover:text-cyan-400 hover:bg-cyan-400/10 active:bg-cyan-400/20 transition-colors"
        aria-label="Increase"
      >
        <Plus size={11} />
      </button>
    </div>
  );
}

function MoneyField({ label, value, onChange, min, max, step = 50 }) {
  const sliderMin = Math.min(min, value);
  const sliderMax = Math.max(max, value);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-white/80">{label}</span>
        <MoneyInput value={value} onChange={onChange} step={step} />
      </div>
      <input
        type="range"
        min={sliderMin}
        max={sliderMax}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-cyan-400"
      />
    </div>
  );
}

function CostRow({ label, baseValue, value, included, onToggle, onChange }) {
  if (baseValue === 0) {
    return (
      <div className="flex items-center justify-between text-sm py-2.5 border-b border-white/5">
        <span className="text-white/80">{label}</span>
        <span className="text-emerald-400 text-xs font-medium">Included</span>
      </div>
    );
  }

  if (baseValue === null) {
    return (
      <div className="py-2.5 border-b border-white/5">
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2.5 text-white/80 cursor-pointer">
            <input
              type="checkbox"
              checked={included}
              onChange={(e) => onToggle(e.target.checked)}
              className="accent-cyan-400 w-4 h-4"
            />
            {label}
          </label>
          {included ? (
            <MoneyInput value={value} onChange={onChange} step={100} size="sm" />
          ) : (
            <span className="text-gray-secondary text-xs">Not Included</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between text-sm py-2.5 border-b border-white/5">
      <span className="text-white/80">{label}</span>
      <MoneyInput value={value} onChange={onChange} step={100} size="sm" />
    </div>
  );
}

function getDefaults(plan) {
  return {
    domain: Math.round((plan.domain[0] + plan.domain[1]) / 2),
    hosting: Math.round((plan.hosting[0] + plan.hosting[1]) / 2),
    uiux: plan.uiux,
    frontend: plan.frontend,
    backend: plan.backend ?? 12000,
    database: plan.database ?? 3000,
    seo: plan.seo ?? 500,
    includeBackend: plan.backend !== null,
    includeDatabase: plan.database !== null,
    includeSeo: plan.seo !== null,
    includeMaintenance: false,
  };
}

export default function Pricing() {
  const [selectedKey, setSelectedKey] = useState("standard");
  const [overrides, setOverrides] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const plan = PLANS.find((p) => p.key === selectedKey);
  const state = overrides[plan.key] ?? getDefaults(plan);

  const patch = (fields) =>
    setOverrides((o) => ({
      ...o,
      [plan.key]: { ...(o[plan.key] ?? getDefaults(plan)), ...fields },
    }));

  const total =
    state.domain +
    state.hosting +
    state.uiux +
    state.frontend +
    (state.includeBackend ? state.backend : 0) +
    (state.includeDatabase ? state.database : 0) +
    (state.includeSeo ? state.seo : 0) +
    (state.includeMaintenance ? plan.maintenance : 0);

  const animatedTotal = useAnimatedNumber(total);

  const startingPrice = (p) =>
    p.domain[0] + p.hosting[0] + p.uiux + p.frontend + (p.backend || 0) + (p.database || 0) + (p.seo || 0);

  return (
    <section id="pricing" className="relative bg-transparent py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/5 text-cyan-400 text-xs font-mono tracking-wide mb-6">
            TRANSPARENT PRICING
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">Pick your engagement</h2>
          <p className="mt-3 text-gray-secondary max-w-lg mx-auto">
            Every project is different — select a tier, type any figure you like, and watch the estimate update live.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {PLANS.map((p) => {
            const active = p.key === selectedKey;
            const Icon = PLAN_META[p.key].icon;
            const accent = PLAN_META[p.key].color;
            return (
              <motion.button
                key={p.key}
                onClick={() => setSelectedKey(p.key)}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className={`relative text-left rounded-2xl border p-6 overflow-hidden transition-colors ${
                  active
                    ? "border-cyan-400 bg-cyan-400/[0.07]"
                    : "border-white/10 bg-charcoal/30 hover:border-cyan-400/30"
                }`}
                style={active ? { boxShadow: `0 0 32px ${accent}33` } : undefined}
              >
                {p.popular && (
                  <span className="absolute top-0 right-0 bg-cyan-400 text-black text-[10px] font-bold tracking-wide px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </span>
                )}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 border"
                  style={{ backgroundColor: `${accent}1A`, borderColor: `${accent}40`, color: accent }}
                >
                  <Icon size={20} />
                </div>
                {active && (
                  <span className="absolute top-4 right-4 w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center">
                    <Check size={12} className="text-black" />
                  </span>
                )}
                <h3 className="font-display font-bold text-lg mb-1">{p.name}</h3>
                <p className="text-xs text-gray-secondary mb-4 leading-relaxed">{p.tagline}</p>
                <p className="text-2xl font-display font-bold" style={{ color: accent }}>
                  {currency(startingPrice(p))}
                  <span className="text-xs text-gray-secondary font-body font-normal"> starting</span>
                </p>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={plan.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid lg:grid-cols-[1.3fr_1fr] gap-8"
          >
            <div className="rounded-2xl border border-cyan-400/15 bg-charcoal/30 p-8">
              <h3 className="font-display font-bold text-xl mb-1">{plan.name} Plan</h3>
              <p className="text-sm text-gray-secondary mb-8">{plan.tagline} — every figure below is editable.</p>

              <MoneyField
                label="Domain"
                value={state.domain}
                onChange={(v) => patch({ domain: v })}
                min={plan.domain[0]}
                max={plan.domain[1]}
                step={10}
              />
              <MoneyField
                label="Hosting"
                value={state.hosting}
                onChange={(v) => patch({ hosting: v })}
                min={plan.hosting[0]}
                max={plan.hosting[1]}
                step={50}
              />
              <MoneyField
                label="UI/UX Design"
                value={state.uiux}
                onChange={(v) => patch({ uiux: v })}
                min={0}
                max={plan.uiux * 2}
                step={50}
              />
              <MoneyField
                label="Frontend Development"
                value={state.frontend}
                onChange={(v) => patch({ frontend: v })}
                min={0}
                max={plan.frontend * 2}
                step={100}
              />

              <div className="mt-2">
                <CostRow
                  label="Backend Development"
                  baseValue={plan.backend}
                  value={state.backend}
                  included={state.includeBackend}
                  onToggle={(v) => patch({ includeBackend: v })}
                  onChange={(v) => patch({ backend: v })}
                />
                <CostRow
                  label="Database Setup"
                  baseValue={plan.database}
                  value={state.database}
                  included={state.includeDatabase}
                  onToggle={(v) => patch({ includeDatabase: v })}
                  onChange={(v) => patch({ database: v })}
                />
                <CostRow
                  label="SEO Setup"
                  baseValue={plan.seo}
                  value={state.seo}
                  included={state.includeSeo}
                  onToggle={(v) => patch({ includeSeo: v })}
                  onChange={(v) => patch({ seo: v })}
                />
              </div>

              <ul className="grid sm:grid-cols-2 gap-3 text-xs text-gray-secondary border-t border-white/10 pt-6 mt-4">
                {DESCRIPTIVE_ITEMS.map((item) => (
                  <li key={item.key} className="flex justify-between gap-2">
                    <span>{item.label}</span>
                    <span className="text-white/70 text-right">{plan[item.key]}</span>
                  </li>
                ))}
              </ul>

              <label className="flex items-center justify-between gap-3 mt-6 pt-6 border-t border-white/10 cursor-pointer text-sm">
                <span className="flex items-center gap-2.5 text-white/80">
                  <input
                    type="checkbox"
                    checked={state.includeMaintenance}
                    onChange={(e) => patch({ includeMaintenance: e.target.checked })}
                    className="accent-cyan-400 w-4 h-4"
                  />
                  Add Annual Maintenance
                </span>
                <span className="text-cyan-400 font-semibold">{currency(plan.maintenance)}/yr</span>
              </label>
            </div>

            <div className="rounded-2xl border border-cyan-400/25 bg-gradient-to-b from-cyan-400/10 to-transparent p-8 flex flex-col relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-400/10 rounded-full blur-[70px] pointer-events-none" />

              <h4 className="text-xs font-mono tracking-wide text-cyan-400 mb-2 relative">ESTIMATED TOTAL</h4>
              <p className="font-display font-bold text-4xl mb-1 relative">{currency(animatedTotal)}</p>
              <p className="text-xs text-gray-secondary mb-8 relative">First-year estimate, inclusive of selected add-ons</p>

              <ul className="space-y-2 text-sm text-gray-secondary mb-8 relative">
                <li className="flex justify-between"><span>Domain + Hosting</span><span>{currency(state.domain + state.hosting)}</span></li>
                <li className="flex justify-between">
                  <span>Design & Development</span>
                  <span>
                    {currency(
                      state.uiux +
                        state.frontend +
                        (state.includeBackend ? state.backend : 0) +
                        (state.includeDatabase ? state.database : 0)
                    )}
                  </span>
                </li>
                <li className="flex justify-between"><span>SEO</span><span>{state.includeSeo ? currency(state.seo) : "—"}</span></li>
                <li className="flex justify-between"><span>Maintenance</span><span>{state.includeMaintenance ? currency(plan.maintenance) : "—"}</span></li>
              </ul>

              <motion.button
                onClick={() => window.print()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-auto inline-flex items-center justify-center gap-2 bg-cyan-400 text-black font-semibold text-sm px-6 py-3 rounded-full relative"
              >
                <Download size={16} /> Download Estimate (PDF)
              </motion.button>
              <p className="text-[11px] text-gray-secondary text-center mt-3 relative">
                Opens your browser's print dialog — choose "Save as PDF" as the destination.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {mounted &&
        createPortal(
          <div id="print-quote" className="hidden print:block print:bg-white print:text-black print:p-12">
            <PrintQuote plan={plan} state={state} total={total} />
          </div>,
          document.body
        )}
    </section>
  );
}

function PrintQuote({ plan, state, total }) {
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
          <Row label="Domain" value={`\u20b9${state.domain.toLocaleString("en-IN")} / yr`} />
          <Row label="Hosting" value={`\u20b9${state.hosting.toLocaleString("en-IN")} / yr`} />
          <Row label="SSL Certificate" value={plan.ssl} />
          <Row label="UI/UX Design" value={`\u20b9${state.uiux.toLocaleString("en-IN")}`} />
          <Row label="Frontend Development" value={`\u20b9${state.frontend.toLocaleString("en-IN")}`} />
          <Row
            label="Backend Development"
            value={state.includeBackend ? `\u20b9${state.backend.toLocaleString("en-IN")}` : "Not Included"}
          />
          <Row
            label="Database Setup"
            value={
              plan.database === 0
                ? "Included"
                : state.includeDatabase
                ? `\u20b9${state.database.toLocaleString("en-IN")}`
                : "Not Included"
            }
          />
          <Row label="API Integration" value={plan.api} />
          <Row label="SEO Setup" value={state.includeSeo ? `\u20b9${state.seo.toLocaleString("en-IN")}` : "Not Included"} />
          <Row label="Testing & QA" value={plan.testing} />
          <Row label="Deployment" value={plan.deployment} />
          <Row label="Security" value={plan.security} />
          <Row label="Third-Party Integrations" value={plan.thirdParty} />
          <Row label="Content Upload" value={plan.content} />
          <Row
            label="Maintenance (Annual, optional)"
            value={state.includeMaintenance ? `\u20b9${plan.maintenance.toLocaleString("en-IN")}` : "Not selected"}
          />
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