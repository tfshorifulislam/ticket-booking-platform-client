'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createTicket = async (newTicket) => {
    const res = await fetch(`${baseUrl}/api/add-ticket`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTicket)
    })

    return res.json();
}



//update ticket api
export const ticketUpdate = async (updateTicket) => {
    const res = await fetch(`${baseUrl}/api/update-ticket-info`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateTicket)
    })
    return res.json();
}

// delete ticket api
export const deleteTicket = async (deleteTicket) => {
    const res = await fetch(`${baseUrl}/api/delete-ticket-info`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(deleteTicket)
    })
    return res.json();
}


//booking ticket api
export const bookingTicket = async (ticketBooking) => {
    const res = await fetch(`${baseUrl}/api/booking-ticket`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(ticketBooking)
    })
    return res.json();
}