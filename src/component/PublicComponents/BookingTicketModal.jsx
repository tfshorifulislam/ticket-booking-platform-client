'use client';

import { bookingTicket } from '@/lib/actions/addTicket';
import { Button, Input, Modal, Surface, TextField } from '@heroui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export function BookingTicketModal({
    ticketId,
    ticketQuantity,
    countdown,
    userEmail,
    title,
    image,
    status,
    departure
}) {
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const qty = Number(quantity);


        if (!qty || qty < 1) {
            toast.error('Please enter a valid quantity');
            return;
        }

        if (qty > ticketQuantity) {
            toast.error('Not enough tickets available');
            return;
        }

        if (countdown === 'Departed') {
            toast.error('Booking time is over');
            return;
        }

        const bookingData = {
            ticketId,
            quantity: qty,
            userEmail,
            title,
            image,
            status,
            departure
        };

        const res = await bookingTicket(bookingData);

        if (res.success) {
            toast.success(res.message);
            setQuantity('');
        } else {
            toast.error(res.message || 'Booking failed');
        }
    };

    return (
        <Modal>
            <Button variant="none" className="font-semibold w-full py-4">
                Book Now
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading>Ticket Quantity</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <TextField
                                        className="w-full"
                                        name="ticket"
                                        variant="secondary"
                                    >
                                        <Input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            placeholder="Enter ticket quantity"
                                        />
                                    </TextField>

                                    <Button
                                        type="submit"
                                        slot="close"
                                        className="bg-green-700"
                                    >
                                        Book Ticket
                                    </Button>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}