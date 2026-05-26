// data/index.js — All static content and dummy data

import {
  Printer,
  ScanLine,
  Camera,
  Layers,
  BookOpen,
  ImageIcon,
  Shield,
  Clock,
  Zap,
  ThumbsUp,
  Star,
} from "lucide-react";

// ─── Services ───────────────────────────────────────────────────────────────
export const services = [
  {
    id: "color-print",
    icon: Printer,
    title: "Color Printing",
    description:
      "Vivid, high-resolution color prints for presentations, flyers, and photos on A4, A3, and custom sizes.",
    price: "From ₹5/page",
    gradient: "from-orange-500 to-rose-500",
    badge: "Most Popular",
  },
  {
    id: "bw-print",
    icon: ScanLine,
    title: "B&W Printing",
    description:
      "Crisp black & white prints for documents, notes, resumes, and official paperwork at unbeatable prices.",
    price: "From ₹1/page",
    gradient: "from-zinc-500 to-zinc-700",
    badge: null,
  },
  {
    id: "passport-photo",
    icon: Camera,
    title: "Passport Photos",
    description:
      "Government-compliant passport and visa photos with same-day delivery. Multiple sets printed instantly.",
    price: "₹60 for 6 photos",
    gradient: "from-blue-500 to-indigo-600",
    badge: "Quick Service",
  },
  {
    id: "lamination",
    icon: Layers,
    title: "Lamination",
    description:
      "Protect your important documents and photos with glossy or matte lamination. Durable and professional finish.",
    price: "From ₹10/page",
    gradient: "from-emerald-500 to-teal-600",
    badge: null,
  },
  {
    id: "binding",
    icon: BookOpen,
    title: "Binding",
    description:
      "Spiral, thermal, and hardcover binding for projects, reports, and thesis. Neat professional presentation.",
    price: "From ₹30/book",
    gradient: "from-violet-500 to-purple-600",
    badge: null,
  },
  {
    id: "photo-print",
    icon: ImageIcon,
    title: "Photo Printing",
    description:
      "Premium photo prints on matte or glossy paper. Perfect for memories, posters, gifts, and wall art.",
    price: "From ₹8/photo",
    gradient: "from-pink-500 to-rose-600",
    badge: "New Sizes!",
  },
];

// ─── Why Choose Us ───────────────────────────────────────────────────────────
export const whyUs = [
  {
    icon: Clock,
    title: "Same-Day Pickup",
    description: "Upload online, collect in 30 minutes. No waiting queues.",
  },
  {
    icon: Zap,
    title: "Super Fast Turnaround",
    description: "High-speed printers, bulk orders ready in under an hour.",
  },
  {
    icon: Shield,
    title: "100% Privacy",
    description: "Your documents are printed and deleted — never stored.",
  },
  {
    icon: ThumbsUp,
    title: "Guaranteed Quality",
    description: "Not happy? We reprint it. Customer satisfaction is our promise.",
  },
];

// ─── Pricing ─────────────────────────────────────────────────────────────────
export const pricingPlans = [
  {
    name: "Basic",
    description: "Perfect for students and small tasks",
    price: "₹1",
    unit: "/B&W page",
    highlight: false,
    features: [
      "B&W printing from ₹1/page",
      "Color printing from ₹5/page",
      "A4 / A3 sizes available",
      "Walk-in or upload online",
    ],
  },
  {
    name: "Photo Pack",
    description: "Best for memories and passport needs",
    price: "₹60",
    unit: "for 6 passport photos",
    highlight: true,
    features: [
      "Govt-compliant passport photos",
      "Same-day printing",
      "Glossy or matte finish",
      "Visa size options available",
    ],
  },
  {
    name: "Pro Bundle",
    description: "Great for offices and bulk orders",
    price: "₹8",
    unit: "/photo print",
    highlight: false,
    features: [
      "Bulk discounts available",
      "Lamination add-on ₹10/page",
      "Binding from ₹30",
      "Priority pickup slot",
    ],
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const testimonials = [
  {
    name: "Priya Sharma",
    role: "College Student",
    text: "Uploaded my project at midnight, picked it up before class. Absolutely love the service! Quality was perfect and staff was helpful.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "Rahul Verma",
    role: "Office Manager",
    text: "We print all our office documents here. Bulk orders, lamination, binding — everything done quickly. Best shop in Dadri!",
    rating: 5,
    avatar: "RV",
  },
  {
    name: "Anjali Singh",
    role: "Freelance Designer",
    text: "Color accuracy is amazing for my design prints. The team really understands quality. My go-to shop now.",
    rating: 5,
    avatar: "AS",
  },
  {
    name: "Mohammed Aamir",
    role: "Government Employee",
    text: "Got my passport photos in 10 minutes. Proper size, proper finish. Accepted at the passport office without any issues.",
    rating: 5,
    avatar: "MA",
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export const faqs = [
  {
    q: "How do I place an order online?",
    a: "Simply go to the 'Upload & Print' page, upload your file, choose your print settings, and submit. We'll prepare your order and notify you when it's ready for pickup.",
  },
  {
    q: "What file formats do you accept?",
    a: "We accept PDF, DOCX, PNG, JPG, and JPEG files. For best quality, we recommend PDF format. Maximum file size is 50MB.",
  },
  {
    q: "How long does it take to prepare my order?",
    a: "Most standard orders are ready within 30–60 minutes after submission. Bulk orders or special requirements may take a bit longer.",
  },
  {
    q: "Is my document safe and private?",
    a: "Absolutely. All uploaded documents are encrypted, printed, and permanently deleted from our system. We never share or store your data.",
  },
  {
    q: "Do you offer home delivery?",
    a: "Currently we offer in-store pickup only. You can collect your order directly from our shop. WhatsApp us for any special arrangements.",
  },
  {
    q: "Can I pay online or at the shop?",
    a: "You can pay at the shop via cash, UPI (PhonePe, Paytm, GPay), or card. Online prepayment option coming soon!",
  },
];

export { Star };
