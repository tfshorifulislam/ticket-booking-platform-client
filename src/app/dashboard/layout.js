import Sidebar from "@/component/PublicComponents/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="">
      <Sidebar />

      <main
        className=" ml-16 sm:ml-64 p-4 sm:p-6">
        {children}
      </main>
    </div>
  );
}