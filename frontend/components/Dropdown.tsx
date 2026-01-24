"use client";

import { ReactNode, useEffect, useRef } from "react";

interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

export default function Dropdown({ isOpen, onClose, children, className = "" }: DropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={dropdownRef}
            className={`absolute right-0 mt-2 w-56 origin-top-right rounded-2xl overflow-hidden
                bg-zinc-900/90 backdrop-blur-xl border border-white/10
                shadow-2xl shadow-black/50 animate-in fade-in slide-in-from-top-2 duration-200 ${className}`}
            style={{
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
            }}
        >
            {/* Glass effect overlay */}
            <div
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.1) 100%)",
                }}
            />

            <div className="relative py-2">
                {children}
            </div>
        </div>
    );
}

interface DropdownItemProps {
    icon?: ReactNode;
    label: string;
    onClick?: () => void;
    href?: string;
    variant?: "default" | "danger";
}

export function DropdownItem({ icon, label, onClick, href, variant = "default" }: DropdownItemProps) {
    const baseClasses = "flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-200";
    const variantClasses = variant === "danger"
        ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
        : "text-zinc-300 hover:text-white hover:bg-white/5";

    const content = (
        <>
            {icon && <span className="shrink-0">{icon}</span>}
            <span>{label}</span>
        </>
    );

    if (href) {
        return (
            <a href={href} className={`${baseClasses} ${variantClasses}`}>
                {content}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={`${baseClasses} ${variantClasses} w-full text-left`}>
            {content}
        </button>
    );
}

export function DropdownDivider() {
    return <hr className="my-1 border-zinc-800/50" />;
}
