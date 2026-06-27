
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


// export const getVendorTickets = async (vendorEmail) => {
//     const res = await fetch(`${baseUrl}/api/get-user-created-tickets?vendorEmail=${vendorEmail}`);
//     return res.json();
// }

//get all tickets 
export const getAllTickets = async () => {
    const res = await fetch(`${baseUrl}/api/tickets`);
    return res.json();
}


//get all tickets advertisment
export const getAllAdvertismentTickets = async () => {
    const res = await fetch(`${baseUrl}/api/advertise/tickets`);
    return res.json();
}

//ticket details page api
// export const getTicketById = async (_id) => {
//     const res = await fetch(`${baseUrl}/api/tickets/${_id}`);
//     return res.json();
// }

//get ticket in added my ticket page
// export const getUserAddedTicket = async (email) => {

//     const res = await fetch(
//         `${baseUrl}/api/my-booked-tickets?email=${email}`
//     );

//     const data = await res.json();
//     console.log("API RESPONSE:", data);
 
//     return data;
// };


//vendor dashboard request booking api
// export const getRequestBooking = async (vendorEmail) => {
//     const res = await fetch(`${baseUrl}/api/request-booking-tickets?vendorEmail=${vendorEmail}`);
//     const data = await res.json();
//     return data;
// }


//pending ticket get for accept or reject by admin api
// export const getPendingTicket = async () => {
//     const res = await fetch(`${baseUrl}/api/get-all-tickets`);
//     const data = await res.json();
//     return data;
// }

// Get All Users
// export const allUser = async () => {
//     const res = await fetch(`${baseUrl}/all-user`);
//     return res.json();
// };

