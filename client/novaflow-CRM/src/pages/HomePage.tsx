import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import TrustedCompanies from "../components/sections/TrustedCompanies";
import Stats from "../components/sections/Stats";
import Footer from "../components/layout/Footer";

export default function HomePage() {
  return (
    <>
        <Navbar />
        <Hero />
        <TrustedCompanies />
        <Stats /> 
        <Footer />
    </>
  )
}
