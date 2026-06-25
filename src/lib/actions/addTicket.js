'use server'

import { headers } from "next/headers";
import { auth } from "../auth";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

 const userToken = await auth.api.getToken({
        headers: await headers()
    });





export const createTicket = async (newTicket) => {
    const res = await fetch(`${baseUrl}/api/add-ticket`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             authorization: `Bearer ${userToken?.token}`
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
             authorization: `Bearer ${userToken?.token}`
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
             authorization: `Bearer ${userToken?.token}`
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
             authorization: `Bearer ${userToken?.token}`
        },

        body: JSON.stringify(ticketBooking)
    })
    return res.json();
}

// booking request accept api
export const bookingAccept = async (id) => {
    const res = await fetch(`${baseUrl}/bookings/accept/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
             authorization: `Bearer ${userToken?.token}`
        },
    })
    return res.json();
}

// booking requst reject api
export const bookingReject = async (id) => {
    const res = await fetch(`${baseUrl}/bookings/reject/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
             authorization: `Bearer ${userToken?.token}`
        },
    });

    return res.json();
};

export const updateStatusByAdmin = async (id, status) => {
    const res = await fetch(
        `${baseUrl}/api/ticket-status/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                 authorization: `Bearer ${userToken?.token}`
            },
            body: JSON.stringify({ status }),
        }
    );

    return res.json();
};

export const updateUserRoleByAdmin = async (is, role) => {
    const res = await fetch(
        `${baseUrl}/api/ticket-status/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                 authorization: `Bearer ${userToken?.token}`
            },
            body: JSON.stringify({ role }),
        }
    );

    return res.json();
};

export const advertisement = async (id, advertised) => {
    const res = await fetch(
        `${baseUrl}/api/advertise-ticket/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                 authorization: `Bearer ${userToken?.token}`
            },
            body: JSON.stringify({
                advertised,
            }),
        }
    );

    return res.json();
};