import { DeleteTicket } from "@/component/VendorComponents/DeleteTicket";
import { MyTicketUpdate } from "@/component/VendorComponents/MyTicketUpdate";
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-user-created-tickets?vendorEmail=${userEmail}`,
    {
      cache: "no-store",
    }
  );

  const vendorTicket = await res.json();
  console.log(vendorTicket);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pb-12">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              My Tickets
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Manage and track all your listed tickets
            </p>
          </div>

          <a
            href="/dashboard/vendor/add-ticket"
            className="mt-4 sm:mt-0 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-medium flex items-center gap-2 transition shadow-sm"
          >
            + Add New Ticket
          </a>
        </div>

        {/* Grid */}
        {vendorTicket && vendorTicket.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {vendorTicket.map((ticket) => {
              const isRejected = ticket.status === "rejected";

              return (
                <div
                  key={ticket._id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between p-6"
                >

                  {/* Top */}
                  <div>

                    <div className="flex items-start justify-between gap-3 mb-4">

                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2">
                        {ticket.title}
                      </h3>

                      {/* Status */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase border ${statusStyle[ticket.status]
                          }`}
                      >
                        {statusIcon[ticket.status]}
                        {ticket.status}
                      </span>

                    </div>

                    {/* Route */}
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                      <span className="font-medium text-slate-700 dark:text-slate-200">
                        Route:
                      </span>{" "}
                      {ticket.from} → {ticket.to}
                    </div>

                    {/* Price */}
                    <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">
                      {ticket.price} BDT
                    </div>

                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">

                    <div className={`flex-1 ${isRejected ? "opacity-40 pointer-events-none" : ""}`}>
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

                    <div className={`${isRejected ? "opacity-40 pointer-events-none" : ""}`}>
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
          /* Empty State */
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              You have no tickets yet.
            </p>

            <Link
              href="/dashboard/vendor/add-ticket"
              className="inline-block mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl font-medium transition"
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