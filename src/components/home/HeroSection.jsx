// HeroSection.jsx — Bold hero with CTA buttons and animated gradient
import { Upload, MessageCircle, ArrowRight, Star } from "lucide-react";

export default function HeroSection({ navigate }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(251,146,60,0.15),transparent)]" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Floating blobs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-medium mb-8 hover:bg-orange-500/15 transition-colors">
          <Star size={12} fill="currentColor" />
          Trusted by 10,000+ customers in Dadri & NCR
          <Star size={12} fill="currentColor" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
          <span className="text-white">Upload Your Docs.</span>
          <br />
          <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400 bg-clip-text text-transparent">
            We&apos;ll Print Perfectly.
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Color prints, B&W copies, passport photos, lamination &amp; binding — all from the comfort of your home.
          Upload now, collect from our shop.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => navigate("upload")}
            className="group flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white font-bold rounded-xl shadow-2xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300 text-base"
          >
            <Upload size={18} />
            Upload Files & Order
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="https://wa.me/919876543210?text=Hi%20PhotoMake!%20I%20need%20printing%20help."
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 px-7 py-3.5 bg-green-500/15 hover:bg-green-500/25 border border-green-500/30 hover:border-green-500/50 text-green-400 font-bold rounded-xl transition-all duration-300 hover:scale-105 text-base"
          >
            <MessageCircle size={18} />
            Contact on WhatsApp
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { num: "10K+", label: "Happy Customers" },
            { num: "30 min", label: "Avg Pickup Time" },
            { num: "₹1", label: "Starting Price" },
            { num: "100%", label: "Privacy Guaranteed" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/60 rounded-xl p-4 hover:border-orange-500/30 hover:bg-zinc-800/40 transition-all duration-300"
            >
              <div className="text-2xl font-black text-orange-400 mb-0.5">{stat.num}</div>
              <div className="text-xs text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-zinc-600" />
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
      </div>
    </section>
  );
}
