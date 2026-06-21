import { DeleteTicket } from "@/component/VendorComponents/DeleteTicket";
import { MyTicketUpdate } from "@/component/VendorComponents/MyTicketUpdate";
import { getVendorTickets } from "@/lib/api/ticket";
import { auth } from "@/lib/auth";
import { Table } from "@heroui/react";
import { headers } from "next/headers";
import { FaCheckCircle, FaClock, FaEdit, FaTimesCircle, FaTrash } from "react-icons/fa";

const statusStyle = {
  pending: "bg-yellow-50 text-yellow-700",
  approved: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
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

  const vendorTicket = await getVendorTickets(userEmail, "pending");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 pb-12">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Beautiful Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Tickets</h1>
            <p className="text-gray-600 mt-1">Manage and track all your listed tickets</p>
          </div>

          <a
            href="/dashboard/vendor/add-ticket"
            className="mt-4 sm:mt-0 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-medium flex items-center gap-2 transition"
          >
            + Add New Ticket
          </a>
        </div>

        {/* Main Table Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <Table>
            <Table.ScrollContainer>
              <Table.Content
                aria-label="Vendor Tickets"
                className="min-w-[1000px]"
              >

                <Table.Header>
                  <Table.Column className="font-semibold text-gray-700">Ticket Title</Table.Column>
                  <Table.Column className="font-semibold text-gray-700">Route</Table.Column>
                  <Table.Column className="font-semibold text-gray-700">Price</Table.Column>
                  <Table.Column className="font-semibold text-gray-700">Status</Table.Column>
                  <Table.Column className="font-semibold text-gray-700 text-center">Actions</Table.Column>
                </Table.Header>

                <Table.Body>
                  {vendorTicket?.map((ticket) => {
                    const isRejected = ticket.status === "rejected";

                    return (
                      <Table.Row key={ticket._id} className="hover:bg-gray-50 transition-colors">

                        <Table.Cell className="font-medium text-gray-800">
                          {ticket.title}
                        </Table.Cell>

                        <Table.Cell>
                          <span className="text-gray-700">
                            {ticket.from} → {ticket.to}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <span className="font-semibold text-emerald-600">
                            {ticket.price} BDT
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium capitalize ${statusStyle[ticket.status]}`}
                          >
                            {statusIcon[ticket.status]}
                            {ticket.status}
                          </span>
                        </Table.Cell>

                        <Table.Cell>
                          <div className="flex items-center justify-center gap-3">
                            <div
                              disabled={isRejected}
                              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all ${isRejected && "bg-gray-200 text-gray-400 cursor-not-allowed"

                                }`}
                            >
                              <MyTicketUpdate _id={ticket._id}
                                dateTime={ticket.dateTime}
                                from={ticket.from}
                                title={ticket.title}
                                quantity={ticket.quantity}
                                price={ticket.price}
                                type={ticket.type}
                                to={ticket.to}
                              />
                            </div>

                            <div
                              disabled={isRejected}
                              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition-all ${isRejected
                                && "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
                            >

                              <DeleteTicket _id={ticket._id} />
                            </div>
                          </div>
                        </Table.Cell>

                      </Table.Row>
                    );
                  })}
                </Table.Body>

              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>

        {/* Empty State (if no tickets) */}
        {(!vendorTicket || vendorTicket.length === 0) && (
          <div className="text-center py-20 bg-white rounded-3xl shadow border border-gray-100">
            <p className="text-gray-500 text-lg">You have no tickets yet.</p>
            <a
              href="/add-ticket"
              className="inline-block mt-6 bg-emerald-600 text-white px-8 py-3 rounded-2xl font-medium hover:bg-emerald-700"
            >
              Add Your First Ticket
            </a>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyTicketPage;