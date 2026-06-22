
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const getVendorTickets = async (vendorEmail, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/get-user-created-tickets?vendorEmail=${vendorEmail}&status=${status}`);
    return res.json();
}

//get all tickets 
export const getAllTickets = async () => {
    const res = await fetch(`${baseUrl}/api/tickets`);
    return res.json();
}

//ticket details page api
export const getTicketById = async (_id) => {
    const res = await fetch(`${baseUrl}/api/tickets/${_id}`);
    return res.json();
}

//get ticket in added my ticket page
export const getUserAddedTicket = async (email) => {
  console.log("SENDING EMAIL:", email);

  const res = await fetch(
    `${baseUrl}/api/my-booked-tickets?email=${email}`
  );

  const data = await res.json();
  console.log("API RESPONSE:", data);

  return data;
};


//vendor dashboard request booking api
export const getRequestBooking = async (vendorEmail) => {
    const res = await fetch(`${baseUrl}/api/request-booking-tickets?vendorEmail=${vendorEmail}`);
    const data = await res.json();
    return data;
}