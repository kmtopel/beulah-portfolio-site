"use client";

import Link from "next/link";
import { Home, Menu, X } from "lucide-react";
import { useState } from "react";

type HeaderNavLink = {
  label: string;
  href: string;
};

type HeaderProps = {
  navLinks: HeaderNavLink[];
};

function isExternalUrl(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function Header({ navLinks }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative mx-auto px-5 py-5 w-full max-w-[1020px]">
      <div className="flex items-center gap-4">
        <Link
          href="/"
          aria-label="Home"
          className="inline-flex justify-center items-center hover:opacity-70 rounded-full size-10 no-underline transition-opacity"
        >
          <Home className="size-6" strokeWidth={2} />
        </Link>
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className="md:hidden inline-flex justify-center items-center ml-auto rounded-full size-10"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
        <nav className="hidden md:flex flex-wrap justify-end items-center gap-x-5 gap-y-2 ml-auto type-nav">
          {navLinks.map((item) =>
            isExternalUrl(item.href) ? (
              <a
                key={`${item.label}-${item.href}`}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="hover:opacity-70 transition-opacity"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>
      {isOpen ? (
        <nav className="md:hidden top-[calc(100%-0.35rem)] right-5 left-5 z-40 absolute bg-white shadow-[0_20px_40px_rgba(0,0,0,0.12)] p-4 border border-[var(--dark-olive-green)]/20 rounded-xl">
          <div className="flex flex-col gap-3 type-nav">
            {navLinks.map((item) =>
              isExternalUrl(item.href) ? (
                <a
                  key={`mobile-${item.label}-${item.href}`}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="hover:opacity-70 transition-opacity"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={`mobile-${item.label}-${item.href}`}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:opacity-70 transition-opacity"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
