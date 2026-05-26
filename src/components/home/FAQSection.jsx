// FAQSection.jsx — Accordion-style FAQ
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../../data";

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-24 bg-zinc-900 border-t border-zinc-800/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Got Questions?
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                open === idx
                  ? "border-orange-500/30 bg-orange-500/5"
                  : "border-zinc-800/60 bg-zinc-900/60"
              }`}
            >
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className={`font-semibold text-sm sm:text-base transition-colors ${open === idx ? "text-orange-400" : "text-white"}`}>
                  {faq.q}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-zinc-500 shrink-0 ml-4 transition-transform duration-200 ${open === idx ? "rotate-180 text-orange-400" : ""}`}
                />
              </button>
              {open === idx && (
                <div className="px-5 pb-5">
                  <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
