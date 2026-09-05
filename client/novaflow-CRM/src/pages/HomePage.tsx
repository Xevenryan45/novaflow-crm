import { useState } from "react";

import Stats from "../components/sections/Features";
import Hero from "../components/sections/Hero";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Pricing from "../components/sections/Pricing";
import Testimonials from "../components/sections/Testimonials";
import CTA from "../components/sections/CTA";
import FAQ from "../components/sections/FAQ";
import GetStartedModal from "../components/ui/GetStartedModal";

export default function HomePage() {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  const openGetStarted = () => {
    setIsGetStartedOpen(true);
  };

  const closeGetStarted = () => {
    setIsGetStartedOpen(false);
  };

  return (
    <>
      <Navbar />

      <Hero />

      <Stats />

      <Pricing />

      <Testimonials />

      <CTA />

      <FAQ />

      <Footer />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={closeGetStarted}
      />
    </>
  );
}