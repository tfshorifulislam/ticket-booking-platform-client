
import { FaCheckCircle, FaClock, FaTimesCircle, } from 'react-icons/fa';
import { useSession } from '@/lib/auth-client';
import { getVendorTickets } from '@/lib/api/ticket';
import { getSession } from 'better-auth/api';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

const statusStyle = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-100',
  approved: 'bg-green-50 text-green-700 border-green-100',
  rejected: 'bg-red-50 text-red-700 border-red-100',
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
  console.log('user Email', userEmail)
  
  const vendorTicket = await getVendorTickets(userEmail)
  console.log('vendor tickets', vendorTicket)



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <h1 className="text-2xl font-semibold mb-6">
        My Tickets
      </h1>
    </div>
  );
};

export default MyTicketPage;