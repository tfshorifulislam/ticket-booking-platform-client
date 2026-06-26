'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BookingTicketModal } from '@/component/PublicComponents/BookingTicketModal';
import { authClient, useSession } from '@/lib/auth-client';

const TicketDetailsPage = () => {
  const { id } = useParams();

  const { data: session } = useSession()
  const userEmail = session?.user?.email;
  const userName = session?.user?.name


  const [ticket, setTicket] = useState(null);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
 
      const { data: userToken } = await authClient.token()

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tickets/${id}`, {
        headers: {
          authorization: `Bearer ${userToken?.token}`
        },
      });

      const data = await res.json()
      setTicket(data);

    };

    if (id) {
      fetchTicket();
    }
  }, [id]);

  useEffect(() => {
    if (!ticket?.dateTime) return;

    const departureTime = new Date(ticket.dateTime).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const distance = departureTime - now;

      if (distance <= 0) {
        setCountdown('Departed');
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket?.dateTime]);

  console.log("DATE:", ticket?.dateTime);
  console.log("PARSED:", new Date(ticket?.dateTime).toString());
  console.log("NOW:", new Date().toString());

  if (!ticket) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  const isExpired =
    new Date(ticket.dateTime) < new Date();

  const isSoldOut = ticket.quantity <= 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-lg overflow-hidden transition-colors duration-300">

        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-96 object-cover"
        />

        <div className="p-6">

          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            {ticket.title}
          </h1>

          <div className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">

            <p>
              <strong className="text-gray-900 dark:text-white">
                From:
              </strong>{" "}
              {ticket.from}
            </p>

            <p>
              <strong className="text-gray-900 dark:text-white">
                To:
              </strong>{" "}
              {ticket.to}
            </p>

            <p>
              <strong className="text-gray-900 dark:text-white">
                Transport:
              </strong>{" "}
              {ticket.type}
            </p>

            <p>
              <strong className="text-gray-900 dark:text-white">
                Price:
              </strong>{" "}
              <span className="text-green-600 dark:text-green-400 font-semibold">
                ৳{ticket.price}
              </span>
            </p>

            <p>
              <strong className="text-gray-900 dark:text-white">
                Available Seats:
              </strong>{" "}
              {ticket.quantity}
            </p>

            <p>
              <strong className="text-gray-900 dark:text-white">
                Status:
              </strong>{" "}
              <span
                className={`font-semibold ${ticket.status === "accepted"
                  ? "text-green-600 dark:text-green-400"
                  : ticket.status === "pending"
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-red-600 dark:text-red-400"
                  }`}
              >
                {ticket.status}
              </span>
            </p>

            <p className="md:col-span-2">
              <strong className="text-gray-900 dark:text-white">
                Departure:
              </strong>{" "}
              {ticket.dateTime}
            </p>

          </div>

          {/* Perks */}
          <div className="mt-8">

            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
              Perks
            </h3>

            <div className="flex flex-wrap gap-2">
              {ticket.perks?.map((perk, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                >
                  {perk}
                </span>
              ))}
            </div>

          </div>

          {/* Countdown */}
          <div className="mt-8">

            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              Countdown
            </h3>

            <p
              className={`mt-2 font-semibold ${isExpired
                ? "text-red-600 dark:text-red-400"
                : "text-orange-600 dark:text-orange-400"
                }`}
            >
              {countdown}
            </p>

          </div>

          {/* Booking Button */}
          <div
            className={`mt-8 w-full rounded-xl flex justify-center transition ${isExpired || isSoldOut
              ? "bg-gray-300 dark:bg-zinc-700 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
              }`}
          >
            <BookingTicketModal
              countdown={countdown}
              ticketQuantity={ticket.quantity}
              ticketId={ticket._id}
              userEmail={userEmail}
              title={ticket.title}
              image={ticket.image}
              status={ticket.status}
              departure={ticket.dateTime}
              from={ticket.from}
              to={ticket.to}
              vendorEmail={ticket.vendorEmail}
              userName={userName}
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default TicketDetailsPage;