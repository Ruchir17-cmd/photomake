// UploadPage.jsx — Modern file upload and print order form
import { useState, useRef, useCallback } from "react";
import {
  Upload,
  FileText,
  Image,
  X,
  CheckCircle,
  Copy,
  Printer,
  AlertCircle,
} from "lucide-react";

// ─── Order Success component ──────────────────────────────────────────────────
function OrderSuccess({ orderId, onReset }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 border-2 border-emerald-500/30">
          <CheckCircle size={36} className="text-emerald-400" />
        </div>

        <h2 className="text-3xl font-black text-white mb-3">Order Placed! 🎉</h2>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          Your print order has been received. We&apos;ll prepare it shortly — come pick it up from our shop!
        </p>

        {/* Order ID card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6 text-left">
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Order ID</p>
          <div className="flex items-center justify-between">
            <span className="text-orange-400 font-mono font-bold text-lg">{orderId}</span>
            <button
              onClick={copy}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors bg-zinc-800 px-3 py-1.5 rounded-lg"
            >
              <Copy size={12} />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-8 text-left space-y-3">
          {[
            { step: "1", text: "We received your files & settings ✓" },
            { step: "2", text: "Our team is preparing your prints" },
            { step: "3", text: "Visit the shop & mention your Order ID" },
          ].map((s) => (
            <div key={s.step} className="flex items-center gap-3 text-sm">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${s.step === "1" ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-800 text-zinc-400"}`}>
                {s.step === "1" ? "✓" : s.step}
              </div>
              <span className={s.step === "1" ? "text-zinc-300" : "text-zinc-500"}>{s.text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onReset}
            className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-semibold transition-colors"
          >
            Place Another Order
          </button>
          <a
            href={`https://wa.me/919876543210?text=Hi!%20My%20order%20ID%20is%20${orderId}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-3 bg-green-500/15 hover:bg-green-500/25 border border-green-500/30 text-green-400 rounded-xl font-semibold transition-colors text-center"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Upload Page ─────────────────────────────────────────────────────────
export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Form state
  const [form, setForm] = useState({
    copies: 1,
    color: "bw",
    pageSize: "a4",
    sides: "single",
    notes: "",
    name: "",
    phone: "",
  });

  const ACCEPTED = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/png", "image/jpeg"];
  const MAX_MB = 50;

  const validateFile = (file) => {
    if (!ACCEPTED.includes(file.type)) return "Only PDF, DOCX, PNG, JPG files are accepted.";
    if (file.size > MAX_MB * 1024 * 1024) return `File too large. Max ${MAX_MB}MB.`;
    return null;
  };

  const addFiles = (newFiles) => {
    setError("");
    const valid = [];
    for (const f of newFiles) {
      const err = validateFile(f);
      if (err) { setError(err); continue; }
      if (files.find((x) => x.name === f.name)) continue;
      valid.push(f);
    }
    setFiles((prev) => [...prev, ...valid]);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  }, [files]);

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  const removeFile = (name) => setFiles((prev) => prev.filter((f) => f.name !== name));

  const getIcon = (type) => {
    if (type.includes("image")) return <Image size={16} className="text-blue-400" />;
    return <FileText size={16} className="text-orange-400" />;
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const generateOrderId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return "PM-" + Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) { setError("Please enter your name."); return; }
    if (!form.phone.trim() || form.phone.length < 10) { setError("Please enter a valid phone number."); return; }
    if (files.length === 0) { setError("Please upload at least one file."); return; }
    setError("");
    setLoading(true);
    // Simulate API call / order processing
    await new Promise((r) => setTimeout(r, 2200));
    setOrderId(generateOrderId());
    setLoading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFiles([]);
    setSubmitted(false);
    setOrderId("");
    setError("");
    setForm({ copies: 1, color: "bw", pageSize: "a4", sides: "single", notes: "", name: "", phone: "" });
  };

  if (submitted) return <OrderSuccess orderId={orderId} onReset={handleReset} />;

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Upload & Print
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Place Your Print Order Online
          </h1>
          <p className="text-zinc-400">
            Upload your files, set your preferences, and pick up from our shop. Simple, fast, secure.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Upload + Settings (3/5) */}
          <div className="lg:col-span-3 space-y-5">

            {/* Drop zone */}
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
                dragging
                  ? "border-orange-400 bg-orange-400/10 scale-[1.02]"
                  : "border-zinc-700 hover:border-orange-500/50 hover:bg-orange-500/5 bg-zinc-900/40"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.docx,.png,.jpg,.jpeg"
                className="hidden"
                onChange={(e) => addFiles(Array.from(e.target.files))}
              />
              <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-colors ${dragging ? "bg-orange-500/20" : "bg-zinc-800"}`}>
                <Upload size={28} className={dragging ? "text-orange-400" : "text-zinc-400"} />
              </div>
              <p className="text-white font-semibold mb-1">
                {dragging ? "Drop files here!" : "Drag & Drop your files"}
              </p>
              <p className="text-zinc-400 text-sm mb-3">or click to browse</p>
              <p className="text-zinc-600 text-xs">PDF, DOCX, PNG, JPG • Max 50MB per file</p>
            </div>

            {/* File list */}
            {files.length > 0 && (
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                  <span className="text-white text-sm font-semibold">{files.length} file{files.length > 1 ? "s" : ""} selected</span>
                  <button onClick={() => setFiles([])} className="text-zinc-500 hover:text-rose-400 text-xs transition-colors">Clear all</button>
                </div>
                <ul className="divide-y divide-zinc-800">
                  {files.map((file) => (
                    <li key={file.name} className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800/30 transition-colors">
                      {getIcon(file.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{file.name}</p>
                        <p className="text-zinc-500 text-xs">{formatSize(file.size)}</p>
                      </div>
                      <button
                        onClick={() => removeFile(file.name)}
                        className="text-zinc-600 hover:text-rose-400 transition-colors"
                      >
                        <X size={15} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Print settings */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-5">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Printer size={17} className="text-orange-400" />
                Print Settings
              </h3>

              {/* Color / BW */}
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Print Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: "color", label: "🎨 Color Print", price: "from ₹5/pg" },
                    { val: "bw", label: "⬛ B&W Print", price: "from ₹1/pg" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setForm((f) => ({ ...f, color: opt.val }))}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        form.color === opt.val
                          ? "border-orange-500/60 bg-orange-500/10 text-white"
                          : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
                      }`}
                    >
                      <div className="text-sm font-semibold">{opt.label}</div>
                      <div className="text-xs text-zinc-500 mt-0.5">{opt.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Page size + Sides in a row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    Page Size
                  </label>
                  <select
                    value={form.pageSize}
                    onChange={(e) => setForm((f) => ({ ...f, pageSize: e.target.value }))}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500/60 transition-colors"
                  >
                    <option value="a4">A4 (Standard)</option>
                    <option value="a3">A3 (Large)</option>
                    <option value="letter">Letter</option>
                    <option value="legal">Legal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    Sides
                  </label>
                  <select
                    value={form.sides}
                    onChange={(e) => setForm((f) => ({ ...f, sides: e.target.value }))}
                    className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500/60 transition-colors"
                  >
                    <option value="single">Single Sided</option>
                    <option value="double">Double Sided</option>
                  </select>
                </div>
              </div>

              {/* Copies */}
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Number of Copies: <span className="text-orange-400">{form.copies}</span>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setForm((f) => ({ ...f, copies: Math.max(1, f.copies - 1) }))}
                    className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center font-bold text-lg transition-colors"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={999}
                    value={form.copies}
                    onChange={(e) => setForm((f) => ({ ...f, copies: Math.max(1, parseInt(e.target.value) || 1) }))}
                    className="w-20 bg-zinc-800 border border-zinc-700 text-white text-center rounded-lg py-2 text-sm focus:outline-none focus:border-orange-500/60"
                  />
                  <button
                    onClick={() => setForm((f) => ({ ...f, copies: f.copies + 1 }))}
                    className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center font-bold text-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  rows={3}
                  placeholder="E.g. Print pages 2-5 only, use glossy paper, staple the pages..."
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/60 transition-colors resize-none placeholder:text-zinc-600"
                />
              </div>
            </div>
          </div>

          {/* Right: Contact + Summary + Submit (2/5) */}
          <div className="lg:col-span-2 space-y-5">

            {/* Contact info */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-white font-bold">Your Details</h3>
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Priya Sharma"
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/60 transition-colors placeholder:text-zinc-600"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
                  Phone / WhatsApp *
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

            {/* Order summary */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: "Files", value: `${files.length} file${files.length !== 1 ? "s" : ""}` },
                  { label: "Print Type", value: form.color === "color" ? "Color" : "B&W" },
                  { label: "Page Size", value: form.pageSize.toUpperCase() },
                  { label: "Sides", value: form.sides === "single" ? "Single Sided" : "Double Sided" },
                  { label: "Copies", value: form.copies },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between">
                    <span className="text-zinc-500">{row.label}</span>
                    <span className="text-zinc-200 font-medium">{row.value}</span>
                  </div>
                ))}
                <div className="border-t border-zinc-800 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-zinc-400 font-semibold">Payment</span>
                    <span className="text-emerald-400 font-semibold text-xs bg-emerald-500/10 px-2 py-0.5 rounded-full">Pay at Shop</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 bg-rose-500/10 border border-rose-500/30 rounded-xl p-4">
                <AlertCircle size={15} className="text-rose-400 mt-0.5 shrink-0" />
                <p className="text-rose-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing Order…
                </>
              ) : (
                <>
                  <Printer size={17} />
                  Place Print Order
                </>
              )}
            </button>

            <p className="text-center text-zinc-600 text-xs">
              🔒 Your files are encrypted and deleted after printing
            </p>
          </div>
        </div>

        {/* Order tracking mockup */}
        <div className="mt-12 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-xs flex items-center justify-center">📦</span>
            How Your Order Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Upload Files", desc: "Choose files & set print preferences" },
              { step: "02", title: "Order Confirmed", desc: "You get a unique Order ID instantly" },
              { step: "03", title: "We Print", desc: "Our team prepares your prints" },
              { step: "04", title: "Collect", desc: "Walk in, show Order ID, and collect!" },
            ].map((s, i) => (
              <div key={s.step} className="flex sm:flex-col items-start sm:items-center gap-3 sm:text-center">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center text-orange-400 font-black text-sm shrink-0">
                  {s.step}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{s.title}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{s.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden sm:block text-zinc-700 text-2xl absolute" style={{ right: "-12px", top: "50%" }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
