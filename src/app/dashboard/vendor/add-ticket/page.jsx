'use client';

import React, { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { Upload, Calendar, MapPin, Users, Tag, Award } from 'lucide-react';

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
    const perksList = [
        'AC', 
        'WiFi', 
        'Breakfast', 
        'Dinner', 
        'Water Bottle', 
        'Charging Port', 
        'Recliner Seat', 
        'CCTV'
    ];

    // Handle Perk Checkbox
    const handlePerkChange = (perk) => {
        setForm((prev) => {
            if (prev.perks.includes(perk)) {
                return {
                    ...prev,
                    perks: prev.perks.filter((p) => p !== perk)
                };
            } else {
                return {
                    ...prev,
                    perks: [...prev.perks, perk]
                };
            }
        });
    };

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

                const imgRes = await fetch(
                    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                    { method: 'POST', body: imgForm }
                );

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

            const res = await fetch('/api/tickets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

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
            setMessage({ type: 'error', text: 'Something went wrong. Please try again!' });
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
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Title</label>
                                    <input
                                        type="text"
                                        placeholder="Delhi to Mumbai Express"
                                        className="input-field"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Transport Type</label>
                                    <select
                                        className="input-field"
                                        value={form.type}
                                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Bus">Bus</option>
                                        <option value="Train">Train</option>
                                        <option value="Flight">Flight</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">From (City)</label>
                                    <input
                                        type="text"
                                        placeholder="Delhi"
                                        className="input-field"
                                        value={form.from}
                                        onChange={(e) => setForm({ ...form, from: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">To (City)</label>
                                    <input
                                        type="text"
                                        placeholder="Mumbai"
                                        className="input-field"
                                        value={form.to}
                                        onChange={(e) => setForm({ ...form, to: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Price, Quantity & Date */}
                        <div>
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-emerald-600" />
                                Price & Schedule
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price per Ticket (₹)</label>
                                    <input
                                        type="number"
                                        placeholder="899"
                                        className="input-field"
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Quantity</label>
                                    <input
                                        type="number"
                                        placeholder="50"
                                        className="input-field"
                                        value={form.quantity}
                                        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Departure Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        className="input-field"
                                        value={form.dateTime}
                                        onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Perks */}
                        <div>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Award className="w-6 h-6 text-emerald-600" />
                                Amenities (Perks)
                            </h2>
                            <p className="text-sm text-gray-500 mb-4">Choose all that apply</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {perksList.map((perk) => (
                                    <label key={perk} className="perk-label">
                                        <input
                                            type="checkbox"
                                            checked={form.perks.includes(perk)}
                                            onChange={() => handlePerkChange(perk)}
                                        />
                                        <span>{perk}</span>
                                    </label>
                                ))}
                            </div>
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
                                <div>
                                    <label className="text-xs text-gray-500">Name</label>
                                    <input
                                        type="text"
                                        value={session?.user?.name || ''}
                                        readOnly
                                        className="input-field bg-gray-50"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500">Email</label>
                                    <input
                                        type="text"
                                        value={session?.user?.email || ''}
                                        readOnly
                                        className="input-field bg-gray-50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button Area */}
                    <div className="bg-gray-50 px-8 py-8 border-t">
                        {message && (
                            <div className={`p-4 rounded-2xl mb-6 text-center font-medium ${
                                message.type === 'success' 
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