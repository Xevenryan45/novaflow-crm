
import Container from '../common/Container'
import Logo from '../common/Logo'
import { navigationLinks } from '../../constants/navigation'
import Button from '../ui/Buttons'
import { useState, useEffect } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import { Link } from "react-router-dom";



export default function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("features");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            const sections = ["features", "pricing", "testimonials", "faq"];

            for (const section of sections) {
                const element = document.getElementById(section);

                if (element) {
                    const rect = element.getBoundingClientRect();

                    if (rect.top <= 140 && rect.bottom >= 140) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
                ? "border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md"
                : "bg-white/80 backdrop-blur-md"
                }`}
        >
            <nav>
                <Container className="flex items-center justify-between py-4">
                    <div>
                        <Logo />
                    </div>

                    <div className='hidden md:flex'>
                        <ul className='flex items-center gap-8'>
                            {navigationLinks.map((link) => {
                                const sectionName = link.href.replace("#", "");
                                const isActive = activeSection === sectionName;

                                return (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className={`text-sm font-medium transition ${isActive
                                            ? "text-blue-600"
                                            : "text-slate-600 hover:text-blue-600"
                                            }`}
                                    >
                                        {link.label}
                                    </a>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="hidden items-center gap-3 md:flex">
                        <Link to="/login">
                            <Button>
                                Sign In
                            </Button>
                        </Link>

                        <Link to="/signup">
                            <Button variant="secondary">
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* mobile */}
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden"
                        aria-label="Toggle navigation"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <LuX size={20} /> : <LuMenu size={20} />}
                    </button>
                </Container>
                <div
                    className={`overflow-hidden border-slate-200 bg-white transition-all duration-300 md:hidden ${isMenuOpen
                        ? "max-h-[500px] border-t opacity-100"
                        : "max-h-0 border-t-0 opacity-0"
                        }`}
                >
                    <Container>
                        <div className="py-4">
                            <ul className="flex flex-col gap-1">
                                {navigationLinks.map((link) => {
                                    const sectionName = link.href.replace("#", "");
                                    const isActive = activeSection === sectionName;

                                    return (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={`block rounded-lg px-4 py-3 text-sm font-medium transition ${isActive
                                                    ? "bg-blue-50 text-blue-600"
                                                    : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                                                    }`}
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Button className="w-full">
                                        Sign In
                                    </Button>
                                </Link>

                                <Link
                                    to="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Button
                                        variant="secondary"
                                        className="w-full"
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Container>
                </div>
            </nav>
        </header>
    )
}
