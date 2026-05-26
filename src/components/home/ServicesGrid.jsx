// ServicesGrid.jsx — 3-col grid of service cards with glassmorphism
import { ArrowRight } from "lucide-react";
import { services } from "../../data";

export default function ServicesGrid({ navigate }) {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Everything You Need to Print
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            From a single page to bulk orders — we handle all your printing needs with speed and quality.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/60 rounded-2xl p-6 hover:border-zinc-700/80 hover:bg-zinc-800/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-zinc-900/50"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Badge */}
                {service.badge && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/20">
                    {service.badge}
                  </span>
                )}

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <Icon size={22} className="text-white" />
                </div>

                {/* Content */}
                <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-orange-400 font-bold text-sm">{service.price}</span>
                  <button
                    onClick={() => navigate("upload")}
                    className="text-zinc-500 hover:text-white flex items-center gap-1 text-xs font-medium transition-colors group/btn"
                  >
                    Order Now
                    <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA below grid */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("services")}
            className="px-6 py-3 border border-zinc-700 hover:border-orange-500/50 text-zinc-300 hover:text-white rounded-xl font-medium transition-all duration-300 hover:bg-orange-500/5"
          >
            View All Services & Pricing →
          </button>
        </div>
      </div>
    </section>
  );
}
