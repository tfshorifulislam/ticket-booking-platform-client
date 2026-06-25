import { DeleteTicket } from "@/component/VendorComponents/DeleteTicket";
import { MyTicketUpdate } from "@/component/VendorComponents/MyTicketUpdate";
import { getVendorTickets } from "@/lib/api/ticket";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const statusStyle = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  approved: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

const statusIcon = {
  pending: <FaClock />,
  approved: <FaCheckCircle />,
  rejected: <FaTimesCircle />,
};

const MyTicketPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userEmail = session?.user?.email;

  // Fetches tickets for the current vendor
  const vendorTicket = await getVendorTickets(userEmail);
  console.log(vendorTicket)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Tickets</h1>
            <p className="text-gray-600 mt-1">Manage and track all your listed tickets</p>
          </div>

          <a
            href="/dashboard/vendor/add-ticket"
            className="mt-4 sm:mt-0 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-medium flex items-center gap-2 transition target-element"
          >
            + Add New Ticket
          </a>
        </div>

        {/* 3-Column Grid Layout */}
        {vendorTicket && vendorTicket.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendorTicket.map((ticket) => {
              const isRejected = ticket.status === "rejected";

              return (
                <div 
                  key={ticket._id} 
                  className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between p-6 hover:shadow-xl transition-all duration-300"
                >
                  {/* Card Content Top */}
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
                        {ticket.title}
                      </h3>
                      {/* Status Badge */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase border ${statusStyle[ticket.status]}`}
                      >
                        {statusIcon[ticket.status]}
                        {ticket.status}
                      </span>
                    </div>

                    {/* Route Info */}
                    <div className="text-sm text-gray-500 mb-2">
                      <span className="font-medium text-gray-700">Route:</span> {ticket.from} → {ticket.to}
                    </div>

                    {/* Price Info */}
                    <div className="text-lg font-bold text-emerald-600 mb-6">
                      {ticket.price} BDT
                    </div>
                  </div>

                  {/* Card Actions Bottom */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    {/* Update Action Wrapper */}
                    <div
                      className={`flex-1 transition-all duration-200 ${
                        isRejected ? "opacity-40 pointer-events-none cursor-not-allowed" : ""
                      }`}
                    >
                      <MyTicketUpdate 
                        _id={ticket._id}
                        dateTime={ticket.dateTime}
                        from={ticket.from}
                        title={ticket.title}
                        quantity={ticket.quantity}
                        price={ticket.price}
                        type={ticket.type}
                        to={ticket.to}
                        disabled={isRejected}
                      />
                    </div>

                    {/* Delete Action Wrapper */}
                    <div
                      className={`transition-all duration-200 ${
                        isRejected ? "opacity-40 pointer-events-none cursor-not-allowed" : ""
                      }`}
                    >
                      <DeleteTicket 
                        _id={ticket._id} 
                        disabled={isRejected}
                      />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State (if no tickets) */
          <div className="text-center py-20 bg-white rounded-3xl shadow border border-gray-100">
            <p className="text-gray-500 text-lg">You have no tickets yet.</p>
            <Link
              href="/dashboard/vendor/add-ticket"
              className="inline-block mt-6 bg-emerald-600 text-white px-8 py-3 rounded-2xl font-medium hover:bg-emerald-700"
            >
              Add Your First Ticket
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyTicketPage;