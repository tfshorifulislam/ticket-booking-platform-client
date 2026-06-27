'use server'

import { headers } from "next/headers";
import { auth } from "../auth";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

async function getAuthHeader() {
    const token = await auth.api.getToken({
        headers: await headers(),
    });

    return {
        Authorization: `Bearer ${token.token}`,
    };
}


export const createTicket = async (newTicket) => {

    const authHeader = await getAuthHeader();

    const res = await fetch(`${baseUrl}/api/add-ticket`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader
        },
        body: JSON.stringify(newTicket)
    })

    return res.json();
}


//update ticket api
export const ticketUpdate = async (updateTicket) => {
    const authHeader = await getAuthHeader();

    const res = await fetch(`${baseUrl}/api/update-ticket-info`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader
        },
        body: JSON.stringify(updateTicket)
    })
    return res.json();
}

// delete ticket api
export const deleteTicket = async (deleteTicket) => {

    const authHeader = await getAuthHeader();

    const res = await fetch(`${baseUrl}/api/delete-ticket-info`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader
        },
        body: JSON.stringify(deleteTicket)
    })
    return res.json();
}


//booking ticket api
export const bookingTicket = async (ticketBooking) => {

    const authHeader = await getAuthHeader();

    const res = await fetch(`${baseUrl}/api/booking-ticket`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader
        },
        body: JSON.stringify(ticketBooking)
    })
    return res.json();
}

// booking request accept api
export const bookingAccept = async (id) => {

    const authHeader = await getAuthHeader();

    const res = await fetch(`${baseUrl}/bookings/accept/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...authHeader
        },
    })
    return res.json();
}

// booking requst reject api
export const bookingReject = async (id) => {

    const authHeader = await getAuthHeader();

    const res = await fetch(`${baseUrl}/bookings/reject/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...authHeader
        },
    });

    return res.json();
};

export const updateStatusByAdmin = async (id, status) => {

    const authHeader = await getAuthHeader();

    const res = await fetch(
        `${baseUrl}/api/ticket-status/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...authHeader
            },
            body: JSON.stringify({ status }),
        }
    );
    return res.json();
};

export const updateUserRoleByAdmin = async (is, role) => {

    const authHeader = await getAuthHeader();

    const res = await fetch(`${baseUrl}/api/ticket-status/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...authHeader
            },
            body: JSON.stringify({ role }),
        }
    );
    return res.json();
};

export const advertisement = async (id, advertised) => {

    const authHeader = await getAuthHeader();

    const res = await fetch(
        `${baseUrl}/api/advertise-ticket/${id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...authHeader
            },
            body: JSON.stringify({
                advertised,
            }),
        }
    );
    return res.json();
};


// Make Admin
export const makeAdmin = async (id) => {

    const authHeader = await getAuthHeader();

    const res = await fetch(
        `${baseUrl}/api/users/make-admin/${id}`,
        {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                ...authHeader
            },
        }
    );

    return res.json();
};

// Make Vendor
export const makeVendor = async (id) => {

    const authHeader = await getAuthHeader();

    const res = await fetch(
        `${baseUrl}/api/users/make-vendor/${id}`,
        {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                ...authHeader
            },
        }
    );

    return res.json();
};

// Mark Fraud
export const markFraudVendor = async (id) => {

    const authHeader = await getAuthHeader();

    const res = await fetch(
        `${baseUrl}/api/users/fraud/${id}`,
        {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                ...authHeader
            },
        }
    );

    return res.json();
};