// WhatsAppButton.jsx — Floating WhatsApp CTA button
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi%20PhotoMake!%20I%20need%20help%20with%20printing."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white pl-4 pr-5 py-3 rounded-full shadow-xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transition-all duration-300 group"
    >
      <MessageCircle size={20} className="group-hover:animate-bounce" />
      <span className="text-sm font-semibold hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
