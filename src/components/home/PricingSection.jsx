// PricingSection.jsx — 3-card pricing layout
import { Check, ArrowRight } from "lucide-react";
import { pricingPlans } from "../../data";

export default function PricingSection({ navigate }) {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Simple Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Transparent, Fair Rates
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto">
            No hidden fees. What you see is what you pay. Bulk discounts available.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.highlight
                  ? "bg-gradient-to-b from-orange-500/20 to-rose-500/10 border-2 border-orange-500/40 shadow-2xl shadow-orange-500/10"
                  : "bg-zinc-900/60 border border-zinc-800/60 hover:border-zinc-700"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full text-white text-xs font-bold shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                <p className="text-zinc-400 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="text-zinc-400 text-sm ml-1">{plan.unit}</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      size={16}
                      className={`mt-0.5 shrink-0 ${plan.highlight ? "text-orange-400" : "text-emerald-400"}`}
                    />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate("upload")}
                className={`group w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white shadow-lg shadow-orange-500/20"
                    : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                }`}
              >
                Get Started
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-zinc-500 text-sm mt-8">
          Need bulk pricing?{" "}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="text-orange-400 hover:text-orange-300 transition-colors"
          >
            Contact us on WhatsApp
          </a>
        </p>
      </div>
    </section>
  );
}
