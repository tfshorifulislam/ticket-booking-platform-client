"use client";

import { ticketUpdate } from "@/lib/actions/addTicket";
import {
    Button,
    Input,
    Label,
    Modal,
    Surface,
    TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export function MyTicketUpdate({ _id,
    dateTime,
    from,
    title,
    quantity,
    price,
    to,
    type, }) {


    const [open, setOpen] = useState(false);


    const [formData, setFormData] = useState({
        title,
        from,
        to,
        type,
        price,
        quantity,
        dateTime,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        const res = await ticketUpdate({
            _id,
            ...formData,
        });

        console.log("Updated:", res);
        setOpen(false);
        redirect('/dashboard/vendor/my-tickets')
    };

    return (
        <Modal open={open} onOpenChange={setOpen}>

            <Button
                onPress={() => setOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
            >
                Update
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">

                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading>Update Ticket</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="p-6">

                            <Surface>
                                <form className="flex flex-col gap-4">

                                    <TextField>
                                        <Label>Title</Label>
                                        <Input
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                    </TextField>

                                    <TextField>
                                        <Label>From</Label>
                                        <Input
                                            name="from"
                                            value={formData.from}
                                            onChange={handleChange}
                                        />
                                    </TextField>

                                    <TextField>
                                        <Label>To</Label>
                                        <Input
                                            name="to"
                                            value={formData.to}
                                            onChange={handleChange}
                                        />
                                    </TextField>

                                    <TextField>
                                        <Label>Type</Label>
                                        <Input
                                            name="type"
                                            value={formData.type}
                                            onChange={handleChange}
                                        />
                                    </TextField>

                                    <TextField>
                                        <Label>Price</Label>
                                        <Input
                                            name="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={handleChange}
                                        />
                                    </TextField>

                                    <TextField>
                                        <Label>Quantity</Label>
                                        <Input
                                            name="quantity"
                                            type="number"
                                            value={formData.quantity}
                                            onChange={handleChange}
                                        />
                                    </TextField>

                                    <TextField>
                                        <Label>Date & Time</Label>
                                        <Input
                                            name="dateTime"
                                            type="datetime-local"
                                            value={formData.dateTime?.slice(0, 16)}
                                            onChange={handleChange}
                                        />
                                    </TextField>


                                    <Modal.Footer>
                                        <Button
                                            className="bg-blue-600 text-white"
                                            onClick={handleUpdate}
                                        >
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>

                                </form>
                            </Surface>

                        </Modal.Body>


                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}