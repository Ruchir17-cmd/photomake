// UploadPage.jsx — Multi-step: Upload & Settings → UPI Payment → Order Confirmed
// Features: PDF page counting, DOCX manual page entry, UPI QR payment
import { useState, useRef, useCallback, useEffect } from "react";
import {
  Upload, FileText, Image, X, CheckCircle, Copy,
  Printer, AlertCircle, QrCode, Smartphone, ArrowLeft,
  ArrowRight, Shield, Hash,
} from "lucide-react";

// ─── PDF page counter using pdfjs-dist ───────────────────────────────────────
async function countPdfPages(file) {
  try {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    return pdf.numPages;
  } catch {
    return null;
  }
}

// ─── Pricing logic ────────────────────────────────────────────────────────────
function calcPrice({ filePages, color, sides, copies, pageSize }) {
  const totalPages = Object.values(filePages).reduce((sum, p) => sum + (p || 0), 0);
  if (totalPages === 0) return 0;
  const perPage = color === "color" ? (pageSize === "a3" ? 10 : 5) : 1;
  // Double sided prints both sides but counts as 1 sheet — same price
  return perPage * copies * totalPages;
}

// ─── Step indicator ──────────────────────────────────────────────────────────
function StepBar({ step }) {
  const steps = ["Upload & Settings", "Pay via UPI", "Order Confirmed"];
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((label, idx) => {
        const num = idx + 1;
        const active = step === num;
        const done = step > num;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300
                ${done ? "bg-emerald-500 border-emerald-500 text-white" :
                  active ? "bg-orange-500 border-orange-500 text-white" :
                  "bg-zinc-900 border-zinc-700 text-zinc-500"}`}>
                {done ? <CheckCircle size={16} /> : num}
              </div>
              <span className={`text-xs mt-1.5 font-medium hidden sm:block ${active ? "text-orange-400" : done ? "text-emerald-400" : "text-zinc-600"}`}>
                {label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`w-16 sm:w-24 h-0.5 mx-1 mb-5 transition-all duration-500 ${done ? "bg-emerald-500" : "bg-zinc-800"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── File row with page count ─────────────────────────────────────────────────
function FileRow({ file, pageCount, onRemove, onPageCountChange }) {
  const isPdf = file.type === "application/pdf";
  const isDocx = file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  const isImage = file.type.startsWith("image/");
  const formatSize = (b) => b < 1024 * 1024 ? (b / 1024).toFixed(1) + " KB" : (b / (1024 * 1024)).toFixed(1) + " MB";

  return (
    <li className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800/30 transition-colors">
      {isImage
        ? <Image size={15} className="text-blue-400 shrink-0" />
        : <FileText size={15} className="text-orange-400 shrink-0" />}

      <div className="flex-1 min-w-0">
        <p className="text-white text-sm truncate font-medium">{file.name}</p>
        <p className="text-zinc-500 text-xs">{formatSize(file.size)}</p>
      </div>

      {/* Page count display / input */}
      <div className="flex items-center gap-1.5 shrink-0">
        <Hash size={12} className="text-zinc-600" />
        {isImage ? (
          <span className="text-zinc-400 text-xs w-16 text-center">1 page</span>
        ) : isPdf ? (
          pageCount === undefined ? (
            <span className="text-zinc-500 text-xs animate-pulse w-16 text-center">counting…</span>
          ) : pageCount === null ? (
            <input
              type="number" min={1} placeholder="pages"
              onChange={(e) => onPageCountChange(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 bg-zinc-700 border border-zinc-600 text-white text-xs rounded px-1.5 py-1 text-center focus:outline-none focus:border-orange-500/60"
            />
          ) : (
            <span className="text-orange-400 text-xs font-bold w-16 text-center">{pageCount} pg</span>
          )
        ) : isDocx ? (
          <div className="flex items-center gap-1">
            <input
              type="number" min={1}
              value={pageCount || ""}
              placeholder="pages"
              onChange={(e) => onPageCountChange(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 bg-zinc-700 border border-zinc-600 text-white text-xs rounded px-1.5 py-1 text-center focus:outline-none focus:border-orange-500/60"
            />
          </div>
        ) : (
          <span className="text-zinc-500 text-xs w-16 text-center">—</span>
        )}
      </div>

      <button onClick={() => onRemove(file.name)} className="text-zinc-600 hover:text-rose-400 transition-colors ml-1">
        <X size={14} />
      </button>
    </li>
  );
}

// ─── Step 1: Upload & Settings ────────────────────────────────────────────────
function StepUpload({ files, setFiles, filePages, setFilePages, form, setForm, onNext, error, setError }) {
  const fileInputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const ACCEPTED = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/png", "image/jpeg",
  ];

  const processFile = async (file) => {
    if (file.type === "application/pdf") {
      // Start counting — set to undefined (loading)
      setFilePages((prev) => ({ ...prev, [file.name]: undefined }));
      const pages = await countPdfPages(file);
      setFilePages((prev) => ({ ...prev, [file.name]: pages ?? null }));
    } else if (file.type.startsWith("image/")) {
      setFilePages((prev) => ({ ...prev, [file.name]: 1 }));
    } else {
      // DOCX — user must enter manually
      setFilePages((prev) => ({ ...prev, [file.name]: null }));
    }
  };

  const addFiles = (newFiles) => {
    setError("");
    for (const f of newFiles) {
      if (!ACCEPTED.includes(f.type)) { setError("Only PDF, DOCX, PNG, JPG accepted."); continue; }
      if (f.size > 50 * 1024 * 1024) { setError("Max file size is 50MB."); continue; }
      if (files.find((x) => x.name === f.name)) continue;
      setFiles((prev) => [...prev, f]);
      processFile(f);
    }
  };

  const onDrop = useCallback((e) => {
    e.preventDefault(); setDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  }, [files]);

  const removeFile = (name) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
    setFilePages((prev) => { const n = { ...prev }; delete n[name]; return n; });
  };

  const totalPages = Object.values(filePages).reduce((sum, p) => sum + (p || 0), 0);
  const price = calcPrice({ filePages, ...form });
  const hasUnknownPages = files.some((f) => {
    const isDocx = f.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document;";
    return filePages[f.name] === null || filePages[f.name] === undefined;
  });

  const handleNext = () => {
    if (!form.name.trim()) { setError("Please enter your name."); return; }
    if (!form.phone.trim() || form.phone.length < 10) { setError("Please enter a valid phone number."); return; }
    if (files.length === 0) { setError("Please upload at least one file."); return; }
    if (Object.values(filePages).some((p) => p === undefined)) { setError("Still counting pages, please wait…"); return; }
    if (Object.values(filePages).some((p) => p === null || p < 1)) { setError("Please enter page count for all DOCX files."); return; }
    setError("");
    onNext();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Left */}
      <div className="lg:col-span-3 space-y-5">

        {/* Drop zone */}
        <div
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300
            ${dragging ? "border-orange-400 bg-orange-400/10 scale-[1.02]" : "border-zinc-700 hover:border-orange-500/50 hover:bg-orange-500/5 bg-zinc-900/40"}`}
        >
          <input ref={fileInputRef} type="file" multiple accept=".pdf,.docx,.png,.jpg,.jpeg"
            className="hidden" onChange={(e) => addFiles(Array.from(e.target.files))} />
          <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-colors ${dragging ? "bg-orange-500/20" : "bg-zinc-800"}`}>
            <Upload size={28} className={dragging ? "text-orange-400" : "text-zinc-400"} />
          </div>
          <p className="text-white font-semibold mb-1">{dragging ? "Drop files here!" : "Drag & Drop your files"}</p>
          <p className="text-zinc-400 text-sm mb-3">or click to browse</p>
          <p className="text-zinc-600 text-xs">PDF (auto page count) • DOCX • PNG • JPG • Max 50MB</p>
        </div>

        {/* File list with page counts */}
        {files.length > 0 && (
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-800 flex justify-between items-center">
              <span className="text-white text-sm font-semibold">{files.length} file{files.length > 1 ? "s" : ""}</span>
              <div className="flex items-center gap-3">
                {totalPages > 0 && (
                  <span className="text-orange-400 text-xs font-bold">{totalPages} total pages</span>
                )}
                <button onClick={() => { setFiles([]); setFilePages({}); }} className="text-zinc-500 hover:text-rose-400 text-xs transition-colors">
                  Clear all
                </button>
              </div>
            </div>

            {/* DOCX hint */}
            {files.some((f) => f.type.includes("wordprocessingml")) && (
              <div className="px-4 py-2 bg-blue-500/10 border-b border-zinc-800 flex items-center gap-2">
                <AlertCircle size={12} className="text-blue-400 shrink-0" />
                <p className="text-blue-400 text-xs">DOCX files: please enter the page count manually for accurate pricing.</p>
              </div>
            )}

            <ul className="divide-y divide-zinc-800">
              {files.map((file) => (
                <FileRow
                  key={file.name}
                  file={file}
                  pageCount={filePages[file.name]}
                  onRemove={removeFile}
                  onPageCountChange={(count) => setFilePages((prev) => ({ ...prev, [file.name]: count }))}
                />
              ))}
            </ul>
          </div>
        )}

        {/* Print settings */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-5">
          <h3 className="text-white font-bold flex items-center gap-2">
            <Printer size={17} className="text-orange-400" /> Print Settings
          </h3>

          <div>
            <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Print Type</label>
            <div className="grid grid-cols-2 gap-3">
              {[{ val: "color", label: "🎨 Color Print", price: "₹5/pg (A4) · ₹10/pg (A3)" },
                { val: "bw", label: "⬛ B&W Print", price: "₹1/pg" }].map((opt) => (
                <button key={opt.val} onClick={() => setForm((f) => ({ ...f, color: opt.val }))}
                  className={`p-3 rounded-xl border text-left transition-all ${form.color === opt.val ? "border-orange-500/60 bg-orange-500/10 text-white" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}>
                  <div className="text-sm font-semibold">{opt.label}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">{opt.price}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Page Size</label>
              <select value={form.pageSize} onChange={(e) => setForm((f) => ({ ...f, pageSize: e.target.value }))}
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500/60">
                <option value="a4">A4 (Standard)</option>
                <option value="a3">A3 (Large)</option>
                <option value="letter">Letter</option>
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Sides</label>
              <select value={form.sides} onChange={(e) => setForm((f) => ({ ...f, sides: e.target.value }))}
                className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500/60">
                <option value="single">Single Sided</option>
                <option value="double">Double Sided</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
              Copies: <span className="text-orange-400">{form.copies}</span>
            </label>
            <div className="flex items-center gap-3">
              <button onClick={() => setForm((f) => ({ ...f, copies: Math.max(1, f.copies - 1) }))}
                className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center text-lg font-bold">−</button>
              <input type="number" min={1} max={999} value={form.copies}
                onChange={(e) => setForm((f) => ({ ...f, copies: Math.max(1, parseInt(e.target.value) || 1) }))}
                className="w-20 bg-zinc-800 border border-zinc-700 text-white text-center rounded-lg py-2 text-sm focus:outline-none focus:border-orange-500/60" />
              <button onClick={() => setForm((f) => ({ ...f, copies: f.copies + 1 }))}
                className="w-9 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center text-lg font-bold">+</button>
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Special Instructions (Optional)</label>
            <textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={3} placeholder="E.g. Print pages 2-5 only, use glossy paper..."
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/60 resize-none placeholder:text-zinc-600" />
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="lg:col-span-2 space-y-5">
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-white font-bold">Your Details</h3>
          <div>
            <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Full Name *</label>
            <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Priya Sharma"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/60 placeholder:text-zinc-600" />
          </div>
          <div>
            <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1.5">Phone / WhatsApp *</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="+91 98765 43210"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500/60 placeholder:text-zinc-600" />
          </div>
        </div>

        {/* Live price calculator */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-4">Price Calculator</h3>
          <div className="space-y-2 text-sm mb-4">
            {[
              { label: "Files", value: `${files.length} file${files.length !== 1 ? "s" : ""}` },
              { label: "Total Pages", value: totalPages > 0 ? `${totalPages} pages` : "—" },
              { label: "Type", value: form.color === "color" ? `Color (₹${form.pageSize === "a3" ? 10 : 5}/pg)` : "B&W (₹1/pg)" },
              { label: "Copies", value: `× ${form.copies}` },
            ].map((r) => (
              <div key={r.label} className="flex justify-between">
                <span className="text-zinc-500">{r.label}</span>
                <span className="text-zinc-200 font-medium">{r.value}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-800 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-zinc-300 font-bold">Total</span>
              <div className="text-right">
                <span className="text-orange-400 font-black text-2xl">
                  {price > 0 ? `₹${price}` : "—"}
                </span>
                {price > 0 && <p className="text-zinc-600 text-xs">exact price</p>}
              </div>
            </div>
            {files.some((f) => f.type.includes("wordprocessingml") && !filePages[f.name]) && (
              <p className="text-yellow-500/80 text-xs mt-2">⚠ Enter DOCX page counts above for full price</p>
            )}
          </div>
        </div>

        {error && (
          <div className="flex items-start gap-2 bg-rose-500/10 border border-rose-500/30 rounded-xl p-4">
            <AlertCircle size={15} className="text-rose-400 mt-0.5 shrink-0" />
            <p className="text-rose-400 text-sm">{error}</p>
          </div>
        )}

        <button onClick={handleNext}
          className="group w-full py-4 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white font-bold rounded-xl transition-all hover:scale-[1.02] shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2">
          Proceed to Payment
          <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-center text-zinc-600 text-xs">🔒 Files are encrypted and deleted after printing</p>
      </div>
    </div>
  );
}

// ─── Step 2: UPI Payment ──────────────────────────────────────────────────────
function StepPayment({ form, filePages, onBack, onConfirm, loading }) {
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [txnId, setTxnId] = useState("");
  const [error, setError] = useState("");
  const screenshotRef = useRef(null);

  const price = calcPrice({ filePages, ...form });

  // ── Replace with shop's real UPI ID ──
  const UPI_ID = "ruchiragarwal17@okhdfcbank";
  const UPI_NAME = "Ruchir";
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${price}&cu=INR&tn=PrintOrder`;

  const handleConfirm = () => {
    if (!txnId.trim()) { setError("Please enter your UPI Transaction ID."); return; }
    if (!screenshotFile) { setError("Please upload your payment screenshot."); return; }
    setError("");
    onConfirm({ txnId, screenshotFile });
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500/20 to-rose-500/20 border-b border-zinc-800 px-6 py-5 text-center">
          <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-3">
            <QrCode size={22} className="text-orange-400" />
          </div>
          <h2 className="text-white font-black text-xl">Pay via UPI</h2>
          <p className="text-zinc-400 text-sm mt-1">Scan the QR or use any UPI app</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Amount */}
          <div className="bg-zinc-800/60 rounded-xl p-4 text-center border border-zinc-700">
            <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">Amount to Pay</p>
            <p className="text-4xl font-black text-orange-400">₹{price}</p>
            <p className="text-zinc-500 text-xs mt-1">
              {Object.values(filePages).reduce((s, p) => s + (p || 0), 0)} pages
              · {form.copies} cop{form.copies > 1 ? "ies" : "y"}
              · {form.color === "color" ? "Color" : "B&W"}
            </p>
          </div>

          {/* QR */}
          <div className="text-center">
            <div className="inline-block bg-white p-4 rounded-2xl shadow-xl">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiLink)}`}
                alt="UPI QR Code"
                className="w-44 h-44 rounded-lg"
              />
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-zinc-300 text-sm font-semibold">UPI ID: <span className="text-orange-400 font-mono">{UPI_ID}</span></p>
              <p className="text-zinc-500 text-xs">PhonePe · GPay · Paytm · BHIM · any UPI app</p>
            </div>
            <a href={upiLink}
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm font-semibold hover:bg-emerald-500/25 transition-colors">
              <Smartphone size={16} /> Open UPI App (Mobile)
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-zinc-600 text-xs">After paying, fill below</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Transaction ID */}
          <div>
            <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">UPI Transaction ID *</label>
            <input type="text" value={txnId} onChange={(e) => setTxnId(e.target.value)}
              placeholder="e.g. 316598234521"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500/60 placeholder:text-zinc-600 font-mono" />
            <p className="text-zinc-600 text-xs mt-1.5">Find this in your UPI app under payment history</p>
          </div>

          {/* Screenshot */}
          <div>
            <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">Payment Screenshot *</label>
            <input ref={screenshotRef} type="file" accept="image/*" className="hidden" onChange={(e) => setScreenshotFile(e.target.files[0])} />
            {screenshotFile ? (
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3">
                <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                <span className="text-emerald-400 text-sm truncate">{screenshotFile.name}</span>
                <button onClick={() => setScreenshotFile(null)} className="ml-auto text-zinc-500 hover:text-rose-400"><X size={14} /></button>
              </div>
            ) : (
              <button onClick={() => screenshotRef.current?.click()}
                className="w-full border-2 border-dashed border-zinc-700 hover:border-orange-500/50 rounded-xl py-4 text-zinc-400 hover:text-white transition-all text-sm flex items-center justify-center gap-2">
                <Upload size={16} /> Upload Screenshot
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 bg-zinc-800/40 rounded-xl p-3">
            <Shield size={14} className="text-blue-400 shrink-0" />
            <p className="text-zinc-400 text-xs">Payment is verified by the shop owner before printing begins.</p>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-rose-500/10 border border-rose-500/30 rounded-xl p-3">
              <AlertCircle size={14} className="text-rose-400 mt-0.5 shrink-0" />
              <p className="text-rose-400 text-xs">{error}</p>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={onBack}
              className="flex items-center gap-1.5 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-semibold transition-colors text-sm">
              <ArrowLeft size={15} /> Back
            </button>
            <button onClick={handleConfirm} disabled={loading}
              className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 disabled:opacity-60 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20">
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Confirming…</>
                : <><CheckCircle size={16} /> Confirm Order</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Success ──────────────────────────────────────────────────────────
function StepSuccess({ orderId, form, filePages, onReset }) {
  const [copied, setCopied] = useState(false);
  const totalPages = Object.values(filePages).reduce((s, p) => s + (p || 0), 0);
  const price = calcPrice({ filePages, ...form });

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={36} className="text-emerald-400" />
      </div>
      <h2 className="text-3xl font-black text-white mb-2">Order Confirmed! 🎉</h2>
      <p className="text-zinc-400 mb-8">Payment received. Your prints are being prepared!</p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-5 text-left">
        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Order ID</p>
        <div className="flex items-center justify-between">
          <span className="text-orange-400 font-mono font-bold text-lg">{orderId}</span>
          <button onClick={() => { navigator.clipboard.writeText(orderId); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-800 px-3 py-1.5 rounded-lg transition-colors">
            <Copy size={12} /> {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-8 text-left space-y-2 text-sm">
        {[
          { label: "Name", value: form.name },
          { label: "Total Pages", value: `${totalPages} pages` },
          { label: "Print Type", value: `${form.color === "color" ? "Color" : "B&W"} · ${form.pageSize.toUpperCase()}` },
          { label: "Copies", value: form.copies },
        ].map((r) => (
          <div key={r.label} className="flex justify-between">
            <span className="text-zinc-500">{r.label}</span>
            <span className="text-white font-medium">{r.value}</span>
          </div>
        ))}
        <div className="flex justify-between items-center pt-2 border-t border-zinc-800">
          <span className="text-zinc-400 font-bold">Amount Paid</span>
          <span className="text-orange-400 font-black text-lg">₹{price}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-zinc-400">Payment</span>
          <span className="text-emerald-400 text-xs font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">✓ Paid via UPI</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={onReset} className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-semibold transition-colors">
          New Order
        </button>
        <a href={`https://wa.me/919876543210?text=Hi! My order ID is ${orderId}. Payment done via UPI!`}
          target="_blank" rel="noreferrer"
          className="flex-1 py-3 bg-green-500/15 hover:bg-green-500/25 border border-green-500/30 text-green-400 rounded-xl font-semibold transition-colors text-center">
          WhatsApp Shop
        </a>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function UploadPage() {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [filePages, setFilePages] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    copies: 1, color: "bw", pageSize: "a4",
    sides: "single", notes: "", name: "", phone: "",
  });

  const generateOrderId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return "PM-" + Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };

  const handleConfirmPayment = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setOrderId(generateOrderId());
    setLoading(false);
    setStep(3);
  };

  const handleReset = () => {
    setFiles([]); setFilePages({}); setStep(1);
    setOrderId(""); setError("");
    setForm({ copies: 1, color: "bw", pageSize: "a4", sides: "single", notes: "", name: "", phone: "" });
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-3">Upload & Print</p>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Place Your Print Order</h1>
          <p className="text-zinc-400">Upload files → See exact price → Pay via UPI → Collect from shop</p>
        </div>

        <StepBar step={step} />

        {step === 1 && (
          <StepUpload
            files={files} setFiles={setFiles}
            filePages={filePages} setFilePages={setFilePages}
            form={form} setForm={setForm}
            onNext={() => setStep(2)}
            error={error} setError={setError}
          />
        )}
        {step === 2 && (
          <StepPayment
            form={form} filePages={filePages}
            onBack={() => setStep(1)}
            onConfirm={handleConfirmPayment}
            loading={loading}
          />
        )}
        {step === 3 && (
          <StepSuccess orderId={orderId} form={form} filePages={filePages} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
