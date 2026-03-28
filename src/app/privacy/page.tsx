import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - LockIn",
  description: "LockIn Privacy Policy. Your data stays on your device.",
};

export default function PrivacyPolicy() {
  return (
    <main className="bg-black min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-white font-bold text-xl tracking-tight"
          >
            <span className="text-2xl">&#x1F525;</span>
            <span>LockIn</span>
          </a>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-zinc-500 text-sm mb-12">
          Last updated: March 28, 2026
        </p>

        <div className="space-y-10 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Overview
            </h2>
            <p className="text-zinc-400">
              LockIn (&quot;we,&quot; &quot;our,&quot; or &quot;the app&quot;) is an iOS accountability app that
              helps friends hold each other accountable by locking distracting
              apps. We are deeply committed to your privacy. This policy explains
              what data we collect, how we use it, and your rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Screen Time Data
            </h2>
            <p className="text-zinc-400 mb-3">
              LockIn uses Apple&apos;s FamilyControls, ManagedSettings, and
              DeviceActivity frameworks to manage app blocking on your device.
              This is important to understand:
            </p>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="text-[#FFD60A] mt-1.5 shrink-0">&#x2022;</span>
                <span>
                  All Screen Time data is processed entirely on your device by
                  Apple&apos;s frameworks. We never have access to which specific
                  apps you use, block, or how much time you spend in them.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD60A] mt-1.5 shrink-0">&#x2022;</span>
                <span>
                  App selections are represented as opaque tokens by Apple. We
                  cannot reverse-engineer these tokens to identify specific apps.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD60A] mt-1.5 shrink-0">&#x2022;</span>
                <span>
                  Shield configurations and device activity monitoring run in
                  on-device extensions that do not communicate app-specific data
                  to our servers.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Data We Collect
            </h2>
            <p className="text-zinc-400 mb-3">
              We collect the minimum data necessary to provide the service:
            </p>
            <div className="space-y-4">
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                <h3 className="text-white font-medium mb-2">
                  Account Information
                </h3>
                <p className="text-zinc-500 text-sm">
                  When you sign in with Apple, we receive your Apple user ID and
                  optionally your name. We store your display name and a unique
                  user identifier.
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                <h3 className="text-white font-medium mb-2">
                  Pact Memberships
                </h3>
                <p className="text-zinc-500 text-sm">
                  We store which pacts you belong to, invite codes, and member
                  lists so your group can function.
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                <h3 className="text-white font-medium mb-2">
                  Unlock Requests
                </h3>
                <p className="text-zinc-500 text-sm">
                  When you request an unlock, we store the request metadata
                  (timestamp, status, votes) so pact members can approve or
                  deny. We do not store which apps triggered the request.
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                <h3 className="text-white font-medium mb-2">
                  Push Notification Tokens
                </h3>
                <p className="text-zinc-500 text-sm">
                  If you enable push notifications, we store your APNs device
                  token to send you alerts about unlock requests and pact
                  activity.
                </p>
              </div>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                <h3 className="text-white font-medium mb-2">
                  Lock Sessions
                </h3>
                <p className="text-zinc-500 text-sm">
                  We store timestamps of when you activate and deactivate locks
                  to calculate streaks. We do not store which apps were locked.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Data We Do NOT Collect
            </h2>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="text-[#FFD60A] mt-1.5 shrink-0">&#x2022;</span>
                <span>Which apps you use, block, or attempt to open</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD60A] mt-1.5 shrink-0">&#x2022;</span>
                <span>Your app usage time or screen time statistics</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD60A] mt-1.5 shrink-0">&#x2022;</span>
                <span>Your contacts, photos, location, or browsing history</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD60A] mt-1.5 shrink-0">&#x2022;</span>
                <span>Any analytics, advertising identifiers, or tracking data</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              How We Use Your Data
            </h2>
            <p className="text-zinc-400">
              Your data is used solely to provide the LockIn service: managing
              pacts, processing unlock requests, sending push notifications, and
              computing streaks. We do not sell, rent, or share your data with
              third parties for marketing or advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Data Storage & Security
            </h2>
            <p className="text-zinc-400">
              Account and pact data is stored securely in Supabase (PostgreSQL)
              with Row Level Security (RLS) policies ensuring you can only
              access your own data. All data transmission uses TLS encryption.
              On-device data is stored in App Group shared containers protected
              by iOS sandboxing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Your Rights
            </h2>
            <p className="text-zinc-400 mb-3">You can at any time:</p>
            <ul className="space-y-2 text-zinc-400">
              <li className="flex items-start gap-3">
                <span className="text-[#FFD60A] mt-1.5 shrink-0">&#x2022;</span>
                <span>
                  Request a copy of all data we store about you
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD60A] mt-1.5 shrink-0">&#x2022;</span>
                <span>
                  Request deletion of your account and all associated data
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD60A] mt-1.5 shrink-0">&#x2022;</span>
                <span>
                  Revoke Screen Time authorization through iOS Settings
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD60A] mt-1.5 shrink-0">&#x2022;</span>
                <span>
                  Disable push notifications through iOS Settings
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Children&apos;s Privacy
            </h2>
            <p className="text-zinc-400">
              LockIn is intended for users aged 17 and older. We do not
              knowingly collect personal information from children under 17.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">
              Changes to This Policy
            </h2>
            <p className="text-zinc-400">
              We may update this privacy policy from time to time. We will
              notify you of any material changes through the app or by updating
              the date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Contact</h2>
            <p className="text-zinc-400">
              If you have questions about this privacy policy or your data,
              contact us at{" "}
              <a
                href="mailto:hello@locked-in.dev"
                className="text-[#FFD60A] hover:underline"
              >
                hello@locked-in.dev
              </a>
              .
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm text-zinc-600">
              &copy; 2026 LockIn. All rights reserved.
            </span>
            <a
              href="/"
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              &larr; Back to home
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
