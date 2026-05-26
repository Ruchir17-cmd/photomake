// WhyUsSection.jsx — 4-column feature highlight section
import { whyUs } from "../../data";

export default function WhyUsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-zinc-900 to-zinc-950 border-y border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Why PhotoMake
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            The Smarter Way to Print
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto">
            We&apos;ve reimagined the local print shop experience for the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyUs.map((item, idx) => {
            const Icon = item.icon;
            const colors = [
              "from-orange-500/20 to-orange-500/5 border-orange-500/20 text-orange-400",
              "from-blue-500/20 to-blue-500/5 border-blue-500/20 text-blue-400",
              "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-400",
              "from-violet-500/20 to-violet-500/5 border-violet-500/20 text-violet-400",
            ];
            const iconColors = [
              "bg-orange-500/20 text-orange-400",
              "bg-blue-500/20 text-blue-400",
              "bg-emerald-500/20 text-emerald-400",
              "bg-violet-500/20 text-violet-400",
            ];

            return (
              <div
                key={item.title}
                className={`group relative bg-gradient-to-b ${colors[idx]} backdrop-blur-sm border rounded-2xl p-6 text-center hover:-translate-y-1 transition-all duration-300`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${iconColors[idx]} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="text-white font-bold mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
