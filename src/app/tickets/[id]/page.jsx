'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getTicketById } from '@/lib/api/ticket';
import { BookingTicketModal } from '@/component/PublicComponents/BookingTicketModal';
import { useSession } from '@/lib/auth-client';

const TicketDetailsPage = () => {
  const { id } = useParams();

  const { data: session } = useSession()
  const userEmail = session?.user?.email;
  
  const [ticket, setTicket] = useState(null);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      const data = await getTicketById(id);
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

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-96 object-cover"
        />

        <div className="p-6">

          <h1 className="text-3xl font-bold mb-4">
            {ticket.title}
          </h1>

          <div className="grid md:grid-cols-2 gap-4">

            <p>
              <strong>From:</strong> {ticket.from}
            </p>

            <p>
              <strong>To:</strong> {ticket.to}
            </p>

            <p>
              <strong>Transport:</strong> {ticket.type}
            </p>

            <p>
              <strong>Price:</strong> ৳{ticket.price}
            </p>

            <p>
              <strong>Available Seats:</strong>{' '}
              {ticket.quantity}
            </p>

            <p>
              <strong>Status:</strong>{' '}
              {ticket.status}
            </p>

            <p>
              <strong>Departure:</strong>{' '}
              {ticket.dateTime}
            </p>

          </div>

          <div className="mt-6">

            <h3 className="font-semibold mb-2">
              Perks
            </h3>

            <div className="flex flex-wrap gap-2">
              {ticket.perks?.map((perk, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                >
                  {perk}
                </span>
              ))}
            </div>

          </div>

          <div className="mt-8">

            <h3 className="font-bold text-lg">
              Countdown
            </h3>

            <p className="text-red-600 font-semibold mt-2">
              {countdown}
            </p>

          </div>

          <div
            disabled={
              isExpired || isSoldOut
            }
            className={`mt-8 cursor-pointer w-full rounded-xl flex justify-center ${isExpired || isSoldOut
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
          >
            <BookingTicketModal
              countdown={countdown}
              ticketQuantity={ticket.quantity}
              ticketId={ticket._id}
              userEmail={userEmail}
            />
          </div>

        </div>

      </div>

    </div>
  );
};

export default TicketDetailsPage;