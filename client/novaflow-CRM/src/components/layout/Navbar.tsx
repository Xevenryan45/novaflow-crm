
import Container from '../common/Container'
import Logo from '../common/Logo'
import { navigationLinks } from '../../constants/navigation'
import Button from '../ui/Buttons'
import { useState } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'

export default function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
            <nav>
                <Container className="flex items-center justify-between py-4">
                    <div>
                        <Logo />
                    </div>

                    <div className='hidden md:flex'>
                        <ul className='flex items-center gap-8'>
                            {navigationLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm font-medium text-slate-600 transition hover:text-blue-600">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='hidden md:flex items-center gap-3'>
                        <Button>Sign-Up</Button>
                        <Button>Get Started</Button>

                    </div>
                    <Button
                        type="button"
                        className="md:hidden"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <LuX /> : <LuMenu />}
                    </Button>
                </Container>
                {isMenuOpen && (
                    <div className="border-t border-slate-200 bg-white px-6 py-6 md:hidden">
                        <ul className='flex flex-col items-center gap-6 py-6'>
                            {navigationLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="block w-full rounded-lg px-4 py-3 text-base font-semibold text-slate-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                                        onClick={() => setIsMenuOpen(false)}>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col gap-3 pb-6">
                            <Button>Sign-Up</Button>
                            <Button>Get Started</Button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}
