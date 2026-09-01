import Stats from "../components/sections/Features";
import Hero from "../components/sections/Hero";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Pricing from "../components/sections/Pricing";
import Testimonials from "../components/sections/Testimonials";
import CTA from "../components/sections/CTA";
import FAQ from "../components/sections/FAQ";


export default function HomePage() {
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
    </>
  )
}
