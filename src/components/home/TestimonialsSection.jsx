// TestimonialsSection.jsx — Customer review cards
import { Star } from "lucide-react";
import { testimonials } from "../../data";

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-zinc-950 to-zinc-900 border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Happy Customers
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            What People Are Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group bg-zinc-900/80 backdrop-blur border border-zinc-800/60 rounded-2xl p-5 hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-900/50"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={13} className="text-orange-400 fill-orange-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-zinc-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
