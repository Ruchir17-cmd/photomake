// AboutSection.jsx — About the business story section
import { MapPin, Clock, Users, Award } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Story */}
          <div>
            <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">
              About Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
              Dadri&apos;s Most Trusted{" "}
              <span className="text-orange-400">Print Shop</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-5">
              PhotoMake started as a small neighborhood print shop with one mission — making quality printing accessible to everyone. From students printing last-minute assignments to businesses printing thousands of documents, we&apos;ve been Dadri&apos;s printing partner for over 8 years.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Today, we&apos;ve gone digital — letting you upload files from anywhere and pick up perfect prints from our shop. Modern technology, local warmth.
            </p>

            {/* Mini stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: "Customers Served", value: "10,000+" },
                { icon: Award, label: "Years in Business", value: "8+" },
                { icon: Clock, label: "Avg. Turnaround", value: "30 min" },
                { icon: MapPin, label: "Location", value: "Dadri, UP" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-4">
                    <div className="w-9 h-9 rounded-lg bg-orange-500/15 flex items-center justify-center shrink-0">
                      <Icon size={17} className="text-orange-400" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{stat.value}</div>
                      <div className="text-zinc-500 text-xs">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Map placeholder */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
              {/* Google Maps embed placeholder */}
              <div className="bg-zinc-900 w-full h-80 flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
                <div className="relative z-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-3">
                    <MapPin size={26} className="text-orange-400" />
                  </div>
                  <p className="text-white font-bold mb-1">PhotoMake Print Shop</p>
                  <p className="text-zinc-400 text-sm">Near City Center, Main Market Road</p>
                  <p className="text-zinc-500 text-sm">Dadri, Uttar Pradesh 203207</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    <MapPin size={13} /> Open in Google Maps
                  </a>
                </div>
                {/* Decorative grid */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
              </div>
            </div>

            {/* Hours card overlay */}
            <div className="absolute -bottom-5 -right-5 bg-zinc-900 border border-zinc-700 rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={14} className="text-orange-400" />
                <span className="text-white text-xs font-bold">Shop Hours</span>
              </div>
              <div className="text-xs text-zinc-400 space-y-0.5">
                <p>Mon – Sat: 9:00 AM – 8:00 PM</p>
                <p>Sunday: 10:00 AM – 5:00 PM</p>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-xs font-medium">Open Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
