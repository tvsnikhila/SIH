import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { Header } from "@/components/dashboard/header";
import { LanguageProvider } from "@/hooks/use-language";
import LanguageSelectionModal from "@/components/dashboard/language-selection-modal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarNav />
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="p-4 sm:p-6 lg:p-8 flex-1">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
      <LanguageSelectionModal />
    </LanguageProvider>
  );
}
