
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