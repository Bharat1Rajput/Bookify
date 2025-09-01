import React, { useState } from "react";

// Bookify - Privacy Policy & Terms of Service
// Single-file React component (JSX) using Tailwind classes
// Default export so you can drop this into your app (e.g., pages/Privacy.jsx or components/Policy.jsx)

export default function BookifyPolicy() {
  const [tab, setTab] = useState("privacy");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <header className="px-8 py-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Bookify</h1>
              <p className="text-sm text-gray-500">Privacy Policy & Terms of Service</p>
            </div>
            <nav className="flex gap-2">
              <button
                onClick={() => setTab("privacy")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "privacy" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}>
                Privacy Policy
              </button>
              <button
                onClick={() => setTab("terms")}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === "terms" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-700"}`}>
                Terms of Service
              </button>
            </nav>
          </div>
        </header>

        <main className="p-8">
          <article className="prose max-w-none">
            {tab === "privacy" ? (
              <section>
                <h2>Privacy Policy</h2>
                <p>
                  At <strong>Bookify</strong>, your privacy matters. This policy explains what information we collect and how
                  we use it while you use our service.
                </p>

                <h3>1. Information We Collect</h3>
                <ul>
                  <li>
                    <strong>Personal information:</strong> name, email, phone number when you register or make a booking.
                  </li>
                  <li>
                    <strong>Appointment data:</strong> details such as date, time, service provider, notes, and booking status.
                  </li>
                  <li>
                    <strong>Technical data:</strong> IP address, device and browser information, and usage data for analytics.
                  </li>
                </ul>

                <h3>2. How We Use Your Information</h3>
                <ul>
                  <li>To create and manage your account and bookings.</li>
                  <li>To send confirmations, reminders, and service-related notifications.</li>
                  <li>To improve and personalize the Bookify experience and to detect abuse or fraud.</li>
                </ul>

                <h3>3. Sharing & Third Parties</h3>
                <p>
                  We do not sell personal data. We may share information with service providers who help us run the app
                  (e.g., email or SMS senders, analytics providers). We require those providers to protect your data.
                </p>

                <h3>4. Data Security</h3>
                <p>
                  We store data using standard security practices. For production apps you should enable encryption at rest,
                  TLS in transit, and follow least-privilege access patterns for databases and cloud storage.
                </p>

                <h3>5. Data Retention & Deletion</h3>
                <p>
                  You can request deletion of your account and personal data. Some information may be retained for legal or
                  operational reasons (e.g., audit logs), in which case it will be retained only as required.
                </p>

                <h3>6. Cookies</h3>
                <p>
                  Bookify uses cookies and similar technologies for session management and analytics. You can control cookies
                  in your browser, but disabling them may affect functionality.
                </p>

                <h3>7. Contact</h3>
                <p>
                  For privacy questions or data deletion requests, contact us at <a href="mailto:privacy@bookify.example">privacy@bookify.example</a>.
                </p>

                <p className="text-sm text-gray-500">Last updated: 1 September 2025</p>
              </section>
            ) : (
              <section>
                <h2>Terms of Service</h2>
                <p>
                  These Terms of Service ("Terms") govern your use of the Bookify application. By using Bookify, you agree
                  to these terms.
                </p>

                <h3>1. Acceptance</h3>
                <p>
                  If you do not agree with these Terms, do not use the service. Bookify may update the Terms from time to
                  time — continued use indicates acceptance of the updated Terms.
                </p>

                <h3>2. User Responsibilities</h3>
                <ul>
                  <li>Provide accurate and up-to-date information when creating bookings.</li>
                  <li>Use Bookify lawfully; do not impersonate others or use the platform for fraudulent activity.</li>
                  <li>Respect any cancellation or no-show policies posted by service providers.</li>
                </ul>

                <h3>3. Service Availability</h3>
                <p>
                  Bookify aims to provide reliable service but does not guarantee uninterrupted availability. We are not
                  liable for downtime, delays, or losses caused by third-party services.
                </p>

                <h3>4. Limitation of Liability</h3>
                <p>
                  To the maximum extent permitted by law, Bookify and its affiliates are not responsible for indirect,
                  incidental, or consequential damages arising from your use of the service.
                </p>

                <h3>5. Intellectual Property</h3>
                <p>
                  All Bookify branding, UI, and code are the intellectual property of the project owner. You may not copy
                  or redistribute the project without permission (for a demo/portfolio you may fork/clone but credit is
                  appreciated).
                </p>

                <h3>6. Governing Law</h3>
                <p>
                  These Terms are governed by the laws applicable to the project owner's jurisdiction. For production
                  deployments, consult legal counsel to localize terms.
                </p>

                <h3>7. Contact</h3>
                <p>
                  For questions about these Terms, contact <a href="mailto:support@bookify.example">support@bookify.example</a>.
                </p>

                <p className="text-sm text-gray-500">Last updated: 1 September 2025</p>
              </section>
            )}
          </article>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 text-sm font-medium">
              Print
            </button>

            <button
              onClick={() => navigator.clipboard?.writeText(document.documentElement.innerText)}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium">
              Copy Text
            </button>

            <a href="#" className="ml-auto text-sm text-gray-500 underline">Privacy & Terms — English</a>
          </div>
        </main>

        <footer className="px-8 py-4 border-t text-sm text-gray-500">
          © {new Date().getFullYear()} Bookify. All rights reserved. Demo / Portfolio use only.
        </footer>
      </div>
    </div>
  );
}
