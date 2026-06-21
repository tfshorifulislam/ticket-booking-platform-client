'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createTicket = async (newTicket) => {
    const res = await fetch(`${baseUrl}/api/add-ticket`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTicket)
    })

    return res.json();
}