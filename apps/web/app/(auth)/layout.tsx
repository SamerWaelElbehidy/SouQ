// Shared layout for the (auth) route group.
// The group prefix `(auth)` is invisible in the URL — /login, /register,
// and /verify-otp all resolve directly from the root, without any "/auth/"
// segment. This layout lets us share a common visual frame (background,
// optional header logo) across those three pages without duplicating markup.

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-tealLight/40">
      {/* Subtle brand mark at the top — keeps pages from feeling bare */}
      <header className="flex justify-center pt-8 pb-2">
        <a
          href="/"
          className="flex items-center gap-2 text-navy font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center text-teal font-black text-sm select-none">
            س
          </span>
          <span>سوق</span>
        </a>
      </header>

      {/* Page content (the login / register / verify-otp form) */}
      <div className="flex justify-center px-4 py-6">{children}</div>
    </div>
  );
}
