import Sidebar from "@/component/PublicComponents/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 overflow-x-auto">
        {children}
      </main>
    </div>
  );
}