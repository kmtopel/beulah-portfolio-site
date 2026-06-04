import {
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Github,
  Dribbble,
  Twitch,
  Mail,
  Globe
} from "lucide-react";
import type { SiteSettings } from "@/sanity/lib/types";

const iconMap: Record<string, typeof Instagram> = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  twitter: Twitter,
  youtube: Youtube,
  github: Github,
  dribbble: Dribbble,
  twitch: Twitch,
  email: Mail,
  website: Globe
};

// Platforms without a lucide icon get an inline SVG
function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M7.5 11c1.38 0 2.5-1.12 2.5-2.5S8.88 6 7.5 6H3v5h4.5zm0 2H3v5h4.5C8.88 18 10 16.88 10 15.5S8.88 13 7.5 13zm9-2.5c-1.38 0-2.5.84-2.5 2.5h5c0-1.66-1.12-2.5-2.5-2.5zm0 7.5c1.14 0 2.07-.6 2.37-1.5H21c-.46 1.98-2.35 3.5-4.5 3.5-2.76 0-5-2.01-5-4.5S13.74 11 16.5 11s4.5 2.01 4.5 4.5H14c0 1.66 1.12 2.5 2.5 2.5zM14 7h5v1.5h-5V7z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
    </svg>
  );
}

const customIconMap: Record<string, ({ className }: { className?: string }) => JSX.Element> = {
  behance: BehanceIcon,
  tiktok: TikTokIcon
};

const platformLabels: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  twitter: "Twitter",
  youtube: "YouTube",
  github: "GitHub",
  dribbble: "Dribbble",
  behance: "Behance",
  tiktok: "TikTok",
  twitch: "Twitch",
  email: "Email",
  website: "Website"
};

interface FooterProps {
  socialLinks: SiteSettings["socialLinks"];
}

export default function Footer({ socialLinks }: FooterProps) {
  const links = socialLinks?.filter((link) => link.platform && link.url) ?? [];

  return (
    <footer className="mx-auto px-5 pb-10 pt-4 w-full max-w-[1020px]">
      {links.length > 0 ? (
        <div className="flex items-center justify-center gap-4">
          {links.map((link) => {
            const platform = link.platform!;
            const LucideIcon = iconMap[platform];
            const CustomIcon = customIconMap[platform];
            const label = platformLabels[platform] || platform;

            return (
              <a
                key={`${platform}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex items-center justify-center size-10 rounded-full bg-[var(--dark-olive-green)] text-white hover:opacity-80 transition-opacity"
              >
                {LucideIcon ? (
                  <LucideIcon className="size-5" strokeWidth={1.5} />
                ) : CustomIcon ? (
                  <CustomIcon className="size-5" />
                ) : (
                  <Globe className="size-5" strokeWidth={1.5} />
                )}
              </a>
            );
          })}
        </div>
      ) : null}
      <p className="mt-4 text-center text-sm opacity-40">&copy; {new Date().getFullYear()} Beulah Peters</p>
    </footer>
  );
}
