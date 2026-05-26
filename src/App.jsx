// App.jsx — Root component with client-side routing
import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import UploadPage from "./pages/UploadPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":     return <HomePage navigate={navigate} />;
      case "services": return <ServicesPage navigate={navigate} />;
      case "upload":   return <UploadPage />;
      case "contact":  return <ContactPage />;
      default:         return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main>{renderPage()}</main>
      <Footer navigate={navigate} />
      <WhatsAppButton />
    </div>
  );
}
