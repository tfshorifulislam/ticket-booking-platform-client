import Sidebar from "@/component/PublicComponents/Sidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-5">
        {children}
      </main>
    </div>
  );
}