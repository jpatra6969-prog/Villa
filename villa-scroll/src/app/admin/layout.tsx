import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estate Operations & Reservation Console | Aura Sanctuary Admin",
  description: "Executive private estate management portal for Aura Sanctuary, Capri Peninsula.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] font-sans antialiased selection:bg-[#B8923A]/20 selection:text-[#1C1917]">
      {children}
    </div>
  );
}
