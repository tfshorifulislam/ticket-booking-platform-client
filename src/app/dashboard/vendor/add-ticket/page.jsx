'use client';

import React, { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { Upload, Calendar, MapPin, Users, Tag, Award } from 'lucide-react';

import { TextField, Input, Label, Select, ListBox, CheckboxGroup, Checkbox } from "@heroui/react";
import { createTicket } from '@/lib/actions/addTicket';
import { toast } from 'react-toastify';

const AddTicketPage = () => {

  const { data: session } = useSession();

  // Form State
  const [form, setForm] = useState({
    title: '',
    from: '',
    to: '',
    type: '',
    price: '',
    quantity: '',
    dateTime: '',
    perks: [],
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  // Available Perks
  const perksList = ['AC', 'WiFi', 'Breakfast', 'Dinner', 'Water Bottle', 'Charging Port', 'Recliner Seat', 'CCTV'];

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      setMessage({ type: 'error', text: 'Please login to add ticket' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      let imageUrl = '';
      // 1. Upload Image to ImgBB
      if (form.image) {
        const imgForm = new FormData();
        imgForm.append('image', form.image);

        const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          { method: 'POST', body: imgForm });

        const imgData = await imgRes.json();
        if (imgData?.status === 200) {
          imageUrl = imgData.data.url;
        }
      }

      // 2. Send data to your backend
      const payload = {
        title: form.title,
        from: form.from,
        to: form.to,
        type: form.type,
        price: Number(form.price),
        quantity: Number(form.quantity),
        dateTime: form.dateTime,
        perks: form.perks,
        image: imageUrl,
        vendorName: session.user.name,
        vendorEmail: session.user.email,
        status: 'pending',
      };

      const res = await createTicket(payload)
      if (res.insertedId) {
        toast.success('Ticket add successfull');
        e.target.reset();
      }

      const data = await res.json();
      console.log(data)

      if (res.ok && data.success) {
        setMessage({ type: 'success', text: 'Ticket added successfully!' });

        // Reset form
        setForm({
          title: '',
          from: '',
          to: '',
          type: '',
          price: '',
          quantity: '',
          dateTime: '',
          perks: [],
          image: null,
        });
      } else {
        setMessage({ type: 'error', text: 'Failed to add ticket' });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 pb-16">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm mb-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <Tag className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Ticket</h1>
          </div>
          <p className="text-gray-600">Fill all details carefully</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

          <div className="p-8 md:p-10 space-y-10">

            {/* Journey Details */}
            <div>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-emerald-600" />
                Journey Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField
                  className="w-full"
                  isRequired
                  value={form.title}
                  onChange={(value) => setForm({ ...form, title: value })}
                >
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Ticket Title</Label>
                  <Input placeholder="Delhi to Mumbai Express" className="input-field" />
                </TextField>

                <Select
                  className="w-full"
                  placeholder="Select Type"
                  isRequired
                  selectedKey={form.type || undefined}
                  onSelectionChange={(key) => setForm({ ...form, type: String(key) })}
                >
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Transport Type</Label>
                  <Select.Trigger className="input-field flex items-center justify-between w-full">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="Bus" textValue="Bus">Bus</ListBox.Item>
                      <ListBox.Item id="Train" textValue="Train">Train</ListBox.Item>
                      <ListBox.Item id="Flight" textValue="Flight">Flight</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>

                <TextField
                  className="w-full"
                  isRequired
                  value={form.from}
                  onChange={(value) => setForm({ ...form, from: value })}
                >
                  <Label className="block text-sm font-medium text-gray-700 mb-2">From (City)</Label>
                  <Input placeholder="Delhi" className="input-field" />
                </TextField>

                <TextField
                  className="w-full"
                  isRequired
                  value={form.to}
                  onChange={(value) => setForm({ ...form, to: value })}
                >
                  <Label className="block text-sm font-medium text-gray-700 mb-2">To (City)</Label>
                  <Input placeholder="Mumbai" className="input-field" />
                </TextField>
              </div>
            </div>

            {/* Price, Quantity & Date */}
            <div>
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-emerald-600" />
                Price & Schedule
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField
                  className="w-full"
                  isRequired
                  type="number"
                  value={form.price}
                  onChange={(value) => setForm({ ...form, price: value })}
                >
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Price per Ticket (₹)</Label>
                  <Input placeholder="899" className="input-field" />
                </TextField>

                <TextField
                  className="w-full"
                  isRequired
                  type="number"
                  value={form.quantity}
                  onChange={(value) => setForm({ ...form, quantity: value })}
                >
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Ticket Quantity</Label>
                  <Input placeholder="50" className="input-field" />
                </TextField>

                <TextField
                  className="md:col-span-2 w-full"
                  isRequired
                  type="datetime-local"
                  value={form.dateTime}
                  onChange={(value) => setForm({ ...form, dateTime: value })}
                >
                  <Label className="block text-sm font-medium text-gray-700 mb-2">Departure Date & Time</Label>
                  <Input className="input-field" />
                </TextField>
              </div>
            </div>

            {/* Perks Section (Fixed) */}
            <div>
              <div className="flex flex-col gap-1 mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Award className="w-6 h-6 text-emerald-600" />
                  Amenities (Perks)
                </h2>
              </div>

              {/* Correct HeroUI Wrapper Component */}
              <CheckboxGroup
                value={form.perks}
                onChange={(value) => setForm({ ...form, perks: value })}
              >
                <Label className="text-sm text-gray-500 block mb-4">Choose all that apply</Label>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {perksList.map((perk) => (
                    <Checkbox key={perk} value={perk} className="perk-label">
                      <Checkbox.Content>
                        <Checkbox.Control>
                          <Checkbox.Indicator />
                        </Checkbox.Control>
                        <span className="text-sm font-medium text-gray-700">{perk}</span>
                      </Checkbox.Content>
                    </Checkbox>
                  ))}
                </div>
              </CheckboxGroup>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Ticket Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-3xl p-10 text-center hover:border-emerald-400 transition">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="font-medium">Upload Image</p>
                <p className="text-sm text-gray-500 mt-1">PNG, JPG or WebP</p>

                <input
                  type="file"
                  accept="image/*"
                  className="mt-6"
                  onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                />

                {form.image && (
                  <p className="text-emerald-600 text-sm mt-3">✓ {form.image.name}</p>
                )}
              </div>
            </div>

            {/* Vendor Info */}
            <div>
              <h2 className="text-sm font-medium text-gray-700 mb-4">Vendor Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextField className="w-full" isReadOnly value={session?.user?.name || ''}>
                  <Label className="text-xs text-gray-500">Name</Label>
                  <Input className="input-field bg-gray-50" />
                </TextField>

                <TextField className="w-full" isReadOnly value={session?.user?.email || ''}>
                  <Label className="text-xs text-gray-500">Email</Label>
                  <Input className="input-field bg-gray-50" />
                </TextField>
              </div>
            </div>
          </div>

          {/* Submit Button Area */}
          <div className="bg-gray-50 px-8 py-8 border-t">
            {message && (
              <div className={`p-4 rounded-2xl mb-6 text-center font-medium ${message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
                }`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-4 rounded-2xl text-lg transition"
            >
              {isSubmitting ? 'Adding Ticket...' : 'Add Ticket'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddTicketPage;