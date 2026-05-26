// ContactPage.jsx — Contact form + info + map
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.message) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      {/* Header */}
      <section className="py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_0%,rgba(251,146,60,0.1),transparent)]" />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Get In Touch
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
            We&apos;d Love to Hear from You
          </h1>
          <p className="text-zinc-400">
            Questions about an order? Need a bulk quote? Just say hello. We&apos;re always happy to help.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Contact info cards */}
          <div className="lg:col-span-2 space-y-4">
            {[
              {
                icon: Phone,
                title: "Call / WhatsApp",
                value: "+91 98765 43210",
                sub: "Mon–Sat, 9 AM – 8 PM",
                href: "tel:+919876543210",
                color: "text-green-400",
                bg: "bg-green-500/10",
              },
              {
                icon: Mail,
                title: "Email Us",
                value: "hello@photomake.in",
                sub: "We reply within 24 hours",
                href: "mailto:hello@photomake.in",
                color: "text-blue-400",
                bg: "bg-blue-500/10",
              },
              {
                icon: MapPin,
                title: "Visit Our Shop",
                value: "Near City Center, Main Market Road",
                sub: "Dadri, UP 203207",
                href: "https://maps.google.com",
                color: "text-orange-400",
                bg: "bg-orange-500/10",
              },
              {
                icon: Clock,
                title: "Working Hours",
                value: "Mon–Sat: 9 AM – 8 PM",
                sub: "Sunday: 10 AM – 5 PM",
                href: null,
                color: "text-violet-400",
                bg: "bg-violet-500/10",
              },
            ].map((item) => {
              const Icon = item.icon;
              const Wrapper = item.href ? "a" : "div";
              return (
                <Wrapper
                  key={item.title}
                  {...(item.href ? { href: item.href, target: "_blank", rel: "noreferrer" } : {})}
                  className="flex items-start gap-4 bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-5 hover:border-zinc-700 transition-all duration-200 group"
                >
                  <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                    <Icon size={19} className={item.color} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-0.5">{item.title}</p>
                    <p className={`${item.color} font-semibold text-sm`}>{item.value}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{item.sub}</p>
                  </div>
                </Wrapper>
              );
            })}

            {/* WhatsApp direct */}
            <a
              href="https://wa.me/919876543210?text=Hi%20PhotoMake!%20I%20have%20a%20question."
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-green-500/15 hover:bg-green-500/25 border border-green-500/30 hover:border-green-500/50 text-green-400 font-bold rounded-xl transition-all hover:scale-[1.02]"
            >
              <MessageCircle size={18} />
              Message Us on WhatsApp
            </a>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-5">
                  <CheckCircle size={30} className="text-emerald-400" />
                </div>
                <h3 className="text-white text-2xl font-black mb-2">Message Sent!</h3>
                <p className="text-zinc-400 mb-6">Thanks for reaching out. We&apos;ll get back to you soon.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
                  className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-semibold transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-7 space-y-5">
                <h2 className="text-white font-bold text-xl">Send Us a Message</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/60 transition-colors placeholder:text-zinc-600"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/60 transition-colors placeholder:text-zinc-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/60 transition-colors placeholder:text-zinc-600"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    rows={5}
                    placeholder="Tell us about your printing needs, bulk order requirements, or any questions..."
                    className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/60 transition-colors resize-none placeholder:text-zinc-600"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || !form.name || !form.message}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Map section */}
        <div className="mt-12 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-zinc-800 flex items-center gap-3">
            <MapPin size={16} className="text-orange-400" />
            <span className="text-white font-semibold">Find Us on the Map</span>
          </div>
          <div className="h-64 bg-zinc-900 flex items-center justify-center relative">
            <div className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="relative z-10 text-center">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-3">
                <MapPin size={22} className="text-orange-400" />
              </div>
              <p className="text-white font-semibold mb-1">PhotoMake Print Shop</p>
              <p className="text-zinc-400 text-sm">Near City Center, Main Market Road, Dadri, UP</p>
              <a
                href="https://maps.google.com/?q=Dadri+Uttar+Pradesh"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
