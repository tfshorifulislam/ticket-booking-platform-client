'use client';

import React, { useState } from 'react';
import { useSession } from '@/lib/auth-client';

const AddTicketPage = () => {
  const { data: session } = useSession();

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

  const perksList = ['AC', 'Breakfast', 'WiFi', 'Water'];

  const handlePerkChange = (perk) => {
    setForm((prev) => {
      const exists = prev.perks.includes(perk);
      return {
        ...prev,
        perks: exists
          ? prev.perks.filter((p) => p !== perk)
          : [...prev.perks, perk],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = '';

      // 🖼️ 1. Upload image to IMGBB first
      if (form.image) {
        const imgForm = new FormData();
        imgForm.append('image', form.image);

        const imgRes = await fetch(
          `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`,
          {
            method: 'POST',
            body: imgForm,
          }
        );

        const imgData = await imgRes.json();
        imageUrl = imgData?.data?.url;
      }

      // 📦 2. Build payload
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

      // 🔥 3. Send to backend
      const res = await fetch('http://localhost:5000/api/add-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data?.success) {
        alert('Ticket added successfully!');

        // reset form
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
        alert('Failed to add ticket');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };


  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Add New Ticket
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-green-100 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm"
      >

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Ticket Title"
            className="input"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            type="text"
            placeholder="Transport Type (Bus/Train)"
            className="input"
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />

          <input
            type="text"
            placeholder="From Location"
            className="input"
            onChange={(e) => setForm({ ...form, from: e.target.value })}
          />

          <input
            type="text"
            placeholder="To Location"
            className="input"
            onChange={(e) => setForm({ ...form, to: e.target.value })}
          />

          <input
            type="number"
            placeholder="Price per Ticket"
            className="input"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            type="number"
            placeholder="Ticket Quantity"
            className="input"
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />

          <input
            type="datetime-local"
            className="input sm:col-span-2"
            onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
          />

        </div>

        {/* Perks */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Perks</p>

          <div className="flex flex-wrap gap-3">
            {perksList.map((perk) => (
              <label
                key={perk}
                className="flex items-center gap-2 text-sm border px-3 py-1.5 rounded-lg cursor-pointer hover:bg-green-50"
              >
                <input
                  type="checkbox"
                  onChange={() => handlePerkChange(perk)}
                />
                {perk}
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <p className="text-sm text-gray-500 mb-2">Ticket Image</p>
          <input
            type="file"
            className="input"
            onChange={(e) =>
              setForm({ ...form, image: e.target.files[0] })
            }
          />
        </div>

        {/* Vendor Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <input
            value={session?.user?.name || ''}
            readOnly
            className="input bg-gray-50"
          />

          <input
            value={session?.user?.email || ''}
            readOnly
            className="input bg-gray-50"
          />

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-xl transition"
        >
          Add Ticket
        </button>

      </form>

      {/* Tailwind helper styles */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          outline: none;
        }
        .input:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.1);
        }
      `}</style>

    </div>
  );
};

export default AddTicketPage;