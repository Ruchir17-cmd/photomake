// HomePage.jsx — Full home page with all sections
import HeroSection from "../components/home/HeroSection";
import ServicesGrid from "../components/home/ServicesGrid";
import WhyUsSection from "../components/home/WhyUsSection";
import PricingSection from "../components/home/PricingSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import FAQSection from "../components/home/FAQSection";
import AboutSection from "../components/about/AboutSection";

export default function HomePage({ navigate }) {
  return (
    <>
      <HeroSection navigate={navigate} />
      <ServicesGrid navigate={navigate} />
      <WhyUsSection />
      <AboutSection />
      <PricingSection navigate={navigate} />
      <TestimonialsSection />
      <FAQSection />
    </>
  );
}
