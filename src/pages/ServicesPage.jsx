// ServicesPage.jsx — Dedicated services page with detailed breakdown
import { services, pricingPlans } from "../data";
import { Check, ArrowRight, Zap } from "lucide-react";

export default function ServicesPage({ navigate }) {
  return (
    <div className="min-h-screen bg-zinc-950 pt-24">
      {/* Hero */}
      <section className="py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(251,146,60,0.12),transparent)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Our Services
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5">
            Professional Printing for Everyone
          </h1>
          <p className="text-zinc-400 text-lg">
            High-quality prints, fast turnaround, and transparent pricing. Everything your print job needs, under one roof.
          </p>
        </div>
      </section>

      {/* Detailed service cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-7 hover:border-zinc-700 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-bold text-lg">{service.title}</h3>
                      {service.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/20">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-orange-400 font-bold">{service.price}</span>
                      <button
                        onClick={() => navigate("upload")}
                        className="group/btn flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
                      >
                        <Zap size={13} />
                        Order Now
                        <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing table */}
      <section className="py-16 bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">Pricing Sheet</h2>
            <p className="text-zinc-400">All prices are inclusive of GST. Bulk orders get extra discounts.</p>
          </div>
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-800/50">
                    <th className="text-left px-6 py-4 text-zinc-300 font-semibold">Service</th>
                    <th className="text-left px-6 py-4 text-zinc-300 font-semibold">Size</th>
                    <th className="text-left px-6 py-4 text-zinc-300 font-semibold">Price</th>
                    <th className="text-left px-6 py-4 text-zinc-300 font-semibold">Bulk (50+)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { service: "B&W Printing", size: "A4", price: "₹1/page", bulk: "₹0.80/page" },
                    { service: "Color Printing", size: "A4", price: "₹5/page", bulk: "₹4/page" },
                    { service: "Color Printing", size: "A3", price: "₹10/page", bulk: "₹8/page" },
                    { service: "Passport Photos", size: "Standard", price: "₹60 / 6 pcs", bulk: "₹50 / 6 pcs" },
                    { service: "Lamination", size: "A4", price: "₹10/page", bulk: "₹8/page" },
                    { service: "Spiral Binding", size: "Up to 100 pg", price: "₹30", bulk: "₹25" },
                    { service: "Photo Print (Glossy)", size: "4×6 inch", price: "₹8", bulk: "₹6" },
                    { service: "Photo Print (Matte)", size: "4×6 inch", price: "₹10", bulk: "₹8" },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={`border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors ${i % 2 === 0 ? "" : "bg-zinc-900/30"}`}
                    >
                      <td className="px-6 py-3.5 text-white font-medium">{row.service}</td>
                      <td className="px-6 py-3.5 text-zinc-400">{row.size}</td>
                      <td className="px-6 py-3.5 text-orange-400 font-semibold">{row.price}</td>
                      <td className="px-6 py-3.5 text-emerald-400 font-semibold">{row.bulk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate("upload")}
              className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/20"
            >
              Upload & Order Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
