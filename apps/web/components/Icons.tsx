// ─────────────────────────────────────────────────────────
// SouQ Icon Library — clean SVG icons, no emojis
// All icons accept className + size props
// ─────────────────────────────────────────────────────────

interface IconProps {
  className?: string;
  size?: number;
}

const d = (size = 24) => ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const });

// ── Navigation ──────────────────────────────────────────
export function MenuIcon({ className, size = 22 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="17" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function CloseIcon({ className, size = 22 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function ArrowLeftIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export function ArrowRightIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function ExternalLinkIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ── Search ───────────────────────────────────────────────
export function SearchIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

// ── Trust / Security ────────────────────────────────────
export function ShieldIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function ShieldCheckIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

export function LockIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

// ── Commerce ─────────────────────────────────────────────
export function ShoppingCartIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

export function CreditCardIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

export function TagIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

// ── Delivery ─────────────────────────────────────────────
export function ZapIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

export function DownloadIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function PackageIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

// ── Categories ───────────────────────────────────────────
export function CodeIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function PenToolIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

export function LayoutIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}

export function GamepadIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <line x1="15" y1="13" x2="15.01" y2="13" strokeWidth="2.5" />
      <line x1="18" y1="11" x2="18.01" y2="11" strokeWidth="2.5" />
      <path d="M17.92 10H19a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h1.08" />
      <path d="M8 6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2H8V6z" />
    </svg>
  );
}

export function BookOpenIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

export function BarChartIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}

export function MusicIcon({ className, size = 24 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

// ── Dashboard ────────────────────────────────────────────
export function PlusIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function MinusIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function TrashIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  );
}

export function GridIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}

export function SettingsIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export function TrendingUpIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

export function UserIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function LogOutIcon({ className, size = 20 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export function StarIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...d(size)} className={className} fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function CheckIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function HeartIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export function EyeIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// ── Social ───────────────────────────────────────────────
export function TwitterXIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...d(size)} className={className} fill="currentColor" stroke="none" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function InstagramIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function SendIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

// ── Misc ─────────────────────────────────────────────────
export function ChevronRightIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function ChevronDownIcon({ className, size = 16 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function AlertCircleIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function InfoIcon({ className, size = 18 }: IconProps) {
  return (
    <svg {...d(size)} className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export function SpinnerIcon({ className, size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ animation: 'spin 0.8s linear infinite' }}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function StatusDotIcon({ className, size = 8 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8" className={className}>
      <circle cx="4" cy="4" r="4" fill="currentColor" />
    </svg>
  );
}
