// Footer.jsx — Site footer with contact info and social links
import { Printer, Phone, MapPin, Mail, Instagram, Facebook } from "lucide-react";

export default function Footer({ navigate }) {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center">
                <Printer size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold">
                Photo<span className="text-orange-400">Make</span>
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-5">
              Your Printing Partner, Online. Quality prints delivered with speed and precision.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-green-600 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
              >
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", page: "home" },
                { label: "Services", page: "services" },
                { label: "Upload & Print", page: "upload" },
                { label: "Contact Us", page: "contact" },
              ].map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => navigate(link.page)}
                    className="text-zinc-400 hover:text-orange-400 text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                "Color Printing",
                "B&W Printing",
                "Passport Photos",
                "Lamination",
                "Binding",
                "Photo Printing",
              ].map((s) => (
                <li key={s}>
                  <span className="text-zinc-400 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-zinc-400">
                <MapPin size={15} className="text-orange-400 mt-0.5 shrink-0" />
                <span>Near City Center, Main Market Road, Dadri, UP 203207</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-zinc-400">
                <Phone size={15} className="text-orange-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-zinc-400">
                <Mail size={15} className="text-orange-400 shrink-0" />
                <a href="mailto:hello@photomake.in" className="hover:text-white transition-colors">
                  hello@photomake.in
                </a>
              </li>
            </ul>
            <div className="mt-4 text-xs text-zinc-500">
              Open: Mon–Sat, 9 AM – 8 PM
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} PhotoMake. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            Your Printing Partner, Online.
          </p>
        </div>
      </div>
    </footer>
  );
}
