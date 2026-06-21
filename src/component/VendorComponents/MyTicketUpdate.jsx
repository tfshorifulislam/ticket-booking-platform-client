"use client";

import { Envelope } from "@gravity-ui/icons";
import {
    Button,
    Input,
    Label,
    Modal,
    Surface,
    TextField,
} from "@heroui/react";

export function MyTicketUpdate({ vendorTicket }) {
    const ticketData = vendorTicket;

    const {
        dateTime,
        from,
        title,
        quantity,
        price,
        to,
        type,
    } = ticketData;

    return (
        <Modal>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Update
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Update Ticket</Modal.Heading>

                            <p className="mt-1.5 text-sm text-muted">
                                Modify your ticket details below.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form className="flex flex-col gap-4">

                                    {/* Title */}
                                    <TextField name="title" variant="secondary">
                                        <Label>Title</Label>
                                        <Input value={title || ""} readOnly />
                                        {/* অথবা যদি আপনি টাইপ করতে চান, তাহলে value-র বদলে শুধু defaultValue রাখুন, তবে key ফেলে দিন */}
                                    </TextField>

                                    {/* From */}
                                    <TextField name="from" variant="secondary">
                                        <Label>From</Label>
                                        <Input value={from || ""} readOnly />
                                    </TextField>

                                    {/* To */}
                                    <TextField name="to" variant="secondary">
                                        <Label>To</Label>
                                        <Input value={to || ""} readOnly />
                                    </TextField>

                                    {/* Type */}
                                    <TextField name="type" variant="secondary">
                                        <Label>Type</Label>
                                        <Input value={type || ""} readOnly />
                                    </TextField>

                                    {/* Price */}
                                    <TextField name="price" variant="secondary">
                                        <Label>Price</Label>
                                        <Input type="number" value={price || ""} readOnly />
                                    </TextField>

                                    {/* Quantity */}
                                    <TextField name="quantity" variant="secondary">
                                        <Label>Quantity</Label>
                                        <Input type="number" value={quantity || ""} readOnly />
                                    </TextField>

                                    {/* Date & Time */}
                                    <TextField name="dateTime" variant="secondary">
                                        <Label>Date & Time</Label>
                                        <Input
                                            type="datetime-local"
                                            value={dateTime ? dateTime.slice(0, 16) : ""}
                                            readOnly
                                        />
                                    </TextField>

                                </form>
                            </Surface>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button slot="close" variant="secondary">
                                Cancel
                            </Button>

                            <Button slot="close" className="bg-blue-600 text-white">
                                Save Changes
                            </Button>
                        </Modal.Footer>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}