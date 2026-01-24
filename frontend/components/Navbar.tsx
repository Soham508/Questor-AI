"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';
import { User, LayoutDashboard, History, Settings, HelpCircle, LogOut } from 'lucide-react';
import Dropdown, { DropdownItem, DropdownDivider } from './Dropdown';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const { data: session } = useSession();
    //console.log("Session data in Navbar:", session, status);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "Research", href: "/research" },
        { name: "About", href: "/about" },
        { name: "Pricing", href: "/pricing" },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${scrolled
                ? "py-3 bg-white/10 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/5"
                : "py-5 bg-transparent border-b border-transparent"
                }`}
            style={{
                backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
                WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
            }}
        >
            {/* Gradient overlay for glass effect */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"
                    }`}
                style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)",
                }}
            />

            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                            <span className="text-white font-bold text-lg">R</span>
                        </div>
                        <div className="absolute -inset-1 rounded-xl bg-linear-to-br from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300" />
                    </div>
                    <span className="text-xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        ResearchAI
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="relative px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200 group"
                        >
                            {item.name}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-blue-400 to-cyan-400 group-hover:w-4/5 transition-all duration-300 rounded-full" />
                        </Link>
                    ))}
                </div>

                {/* Right side actions */}
                <div className="hidden md:flex items-center gap-3">
                    {session ? (
                        <div className="relative">
                            <button
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                className="flex flex-row items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium 
                                    text-zinc-300 hover:text-white hover:bg-white/5 hover:cursor-pointer
                                    transition-all duration-200 group"
                            >
                                <div className="relative">
                                    <Image
                                        src={session.user?.image || "/default-profile.png"}
                                        alt="Profile"
                                        className="rounded-full ring-2 ring-transparent group-hover:ring-blue-400/50 transition-all duration-200"
                                        width={28}
                                        height={28}
                                    />
                                    <div className="absolute -inset-1 rounded-full bg-linear-to-br from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-20 blur transition-opacity duration-200" />
                                </div>
                                <span className="font-semibold">{session.user?.name || "Profile"}</span>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${profileDropdownOpen ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <Dropdown
                                isOpen={profileDropdownOpen}
                                onClose={() => setProfileDropdownOpen(false)}
                            >
                                <DropdownItem
                                    icon={<User size={18} />}
                                    label="My Profile"
                                    href="/profile"
                                />
                                <DropdownItem
                                    icon={<LayoutDashboard size={18} />}
                                    label="Dashboard"
                                    href="/dashboard"
                                />
                                <DropdownItem
                                    icon={<History size={18} />}
                                    label="History"
                                    href="/history"
                                />
                                <DropdownItem
                                    icon={<Settings size={18} />}
                                    label="Settings"
                                    href="/settings"
                                />
                                <DropdownDivider />
                                <DropdownItem
                                    icon={<HelpCircle size={18} />}
                                    label="Help & Support"
                                    href="/support"
                                />
                                <DropdownDivider />
                                <DropdownItem
                                    icon={<LogOut size={18} />}
                                    label="Sign Out"
                                    onClick={() => signOut()}
                                    variant="danger"
                                />
                            </Dropdown>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200"
                        >
                            Log in
                        </Link>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg transition-colors"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden absolute top-full left-0 w-full overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="bg-black/90 backdrop-blur-xl border-b border-white/10 px-6 py-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-3 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href="/settings"
                        className="block px-4 py-3 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Settings
                    </Link>

                    <hr className="border-zinc-800 my-2" />

                    {session ? <button
                        onClick={() => {
                            setMobileMenuOpen(false);
                            signOut();
                        }}
                        className="w-full text-left block px-4 py-3 bg-red-800/50 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                        Log Out
                    </button>
                        : <Link
                            href="/login"
                            className="block px-4 py-3 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                            Log in
                        </Link>}

                </div>
            </div>
        </nav>
    );
}
