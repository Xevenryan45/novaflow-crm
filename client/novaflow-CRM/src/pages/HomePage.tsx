import Stats from "../components/sections/Features";
import Hero from "../components/sections/Hero";
import TrustedCompanies from "../components/sections/TrustedCompanies";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";


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
