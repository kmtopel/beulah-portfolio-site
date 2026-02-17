import Link from "next/link";

type HeaderNavLink = {
  label: string;
  href: string;
};

type HeaderProps = {
  brandLabel: string;
  navLinks: HeaderNavLink[];
};

function isExternalUrl(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function Header({ brandLabel, navLinks }: HeaderProps) {
  return (
    <header className="flex justify-between items-center gap-4 mx-auto px-5 py-5 w-full max-w-[1020px]">
      <Link
        href="/"
        className="font-['Canela','Iowan_Old_Style','Times_New_Roman',serif] text-[1.2rem] tracking-[0.03em]"
      >
        {brandLabel}
      </Link>
      <nav className="flex items-center gap-4">
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
    </header>
  );
}
