import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { GlobalSearch } from "@/components/global-search";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f5f7]">
      <MobileNav />
      <Sidebar />
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
        {children}
      </main>
      <GlobalSearch />
    </div>
  );
}
