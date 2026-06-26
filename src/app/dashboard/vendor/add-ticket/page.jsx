'use client';

import React, { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { Upload, Calendar, MapPin, Users, Tag, Award } from 'lucide-react';

import { TextField, Input, Label, Select, ListBox, CheckboxGroup, Checkbox } from "@heroui/react";
import { createTicket } from '@/lib/actions/addTicket';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

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
        vendorName: session?.user?.name,
        vendorEmail: session?.user?.email,
        status: 'pending',
      };

      const data = await createTicket(payload);

      if (data.insertedId) {
        toast.success('Ticket added successfully');

        setMessage({
          type: 'success',
          text: 'Ticket added successfully!',
        });

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

        e.target.reset();
      } else {
        toast.error('Failed to add ticket');

        setMessage({
          type: 'error',
          text: 'Failed to add ticket',
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 dark:from-slate-950 dark:to-slate-900 pb-16 transition-colors">

    <div className="max-w-4xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mb-4">
          <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl flex items-center justify-center">
            <Tag className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Add New Ticket
          </h1>
        </div>

        <p className="text-slate-600 dark:text-slate-400">
          Fill all details carefully
        </p>
      </div>

      {/* Form */}
      <form className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">

        <div className="p-6 md:p-10 space-y-12">

          {/* Section */}
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-900 dark:text-white mb-6">
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Journey Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TextField className="w-full" isRequired>
                <Label className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                  Ticket Title
                </Label>
                <Input className="input" />
              </TextField>

              <TextField className="w-full" isRequired>
                <Label className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                  Transport Type
                </Label>
                <Input className="input" />
              </TextField>

              <TextField className="w-full" isRequired>
                <Label className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                  From
                </Label>
                <Input className="input" />
              </TextField>

              <TextField className="w-full" isRequired>
                <Label className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                  To
                </Label>
                <Input className="input" />
              </TextField>
            </div>
          </div>

          {/* Price */}
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-900 dark:text-white mb-6">
              <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Price & Schedule
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TextField isRequired>
                <Label className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                  Price
                </Label>
                <Input className="input" />
              </TextField>

              <TextField isRequired>
                <Label className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                  Quantity
                </Label>
                <Input className="input" />
              </TextField>

              <TextField className="md:col-span-2" isRequired>
                <Label className="text-sm text-slate-600 dark:text-slate-300 mb-1">
                  Departure
                </Label>
                <Input className="input" />
              </TextField>
            </div>
          </div>

          {/* Perks */}
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-900 dark:text-white mb-6">
              <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Amenities
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {perksList.map((perk) => (
                <label
                  key={perk}
                  className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-400 transition"
                >
                  <input type="checkbox" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">
                    {perk}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Upload */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Upload Image
            </h2>

            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-3xl p-8 text-center">
              <Upload className="w-10 h-10 mx-auto text-slate-400 mb-3" />

              <p className="text-slate-700 dark:text-slate-200">
                Upload ticket image
              </p>

              <p className="text-sm text-slate-500">
                PNG, JPG, WEBP
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-950 px-6 py-6 border-t border-slate-100 dark:border-slate-800">
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-2xl transition"
          >
            Add Ticket
          </button>
        </div>

      </form>

    </div>
  </div>
);
};

export default AddTicketPage;