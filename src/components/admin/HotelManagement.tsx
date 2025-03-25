'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import getHotels from '@/libs/hotel/getHotels';
import createHotel from '@/libs/hotel/createHotel';
import editHotel from '@/libs/hotel/updateHotel';
import deleteHotel from '@/libs/hotel/deleteHotel';
import getBookingsByHotel from '@/libs/booking/getBookingsByHotel';
import { Hotel, HotelUpdate, Booking } from '@/types';
import LoadingSpinner from './LoadingSpinner';

export default function HotelManagement() {
  const { data: session } = useSession();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isAddingHotel, setIsAddingHotel] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [formData, setFormData] = useState<HotelUpdate>({
    name: '',
    address: '',
    district: '',
    province: '',
    postalcode: '',
    tel: '',
    picture: '',
    description: ''
  });
  const [isViewingBookings, setIsViewingBookings] = useState(false);
  const [selectedHotelBookings, setSelectedHotelBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [editState, setEditState] = useState<{
    isEditing: boolean;
    editingId: string | null;
  }>({
    isEditing: false,
    editingId: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDateRange, setSearchDateRange] = useState<{
    start: string | null;
    end: string | null;
  }>({
    start: null,
    end: null
  });
  const [sortField, setSortField] = useState<'checkinDate' | 'checkoutDate' | 'createdAt'>('checkinDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchBookingId, setSearchBookingId] = useState('');

  const validateForm = (data: typeof formData) => {
    if (data.name.length > 50) {
      alert('Name cannot be more than 50 characters');
      return false;
    }
    if (data.postalcode.length > 5) {
      alert('Postal Code cannot be more than 5 digits');
      return false;
    }
    if (!data.name.trim()) {
      alert('Please add a name');
      return false;
    }
    if (!data.address) {
      alert('Please add an address');
      return false;
    }
    if (!data.district) {
      alert('Please add a district');
      return false;
    }
    if (!data.province) {
      alert('Please add a province');
      return false;
    }
    if (!data.postalcode) {
      alert('Please add a postal code');
      return false;
    }
    if (!data.picture) {
      alert('Please add a picture URL');
      return false;
    }
    if (!data.description) {
      alert('Please add a description');
      return false;
    }
    return true;
  };

  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.token) return;
    fetchHotels();
  }, [session]);

  const fetchHotels = async () => {
    if (!session?.user?.token) return;
    try {
      const response = await getHotels();
      setHotels(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.token) return;

    try {
      if (!validateForm(formData)) {
        return;
      }

      const hotelData = {
        name: formData.name,
        address: formData.address,
        district: formData.district,
        province: formData.province,
        postalcode: formData.postalcode,
        tel: formData.tel,
        picture: formData.picture,
        description: formData.description
      };

      if (editState.isEditing && editState.editingId) {
        await editHotel(editState.editingId, hotelData, session.user.token);
      } else {
        await createHotel(hotelData, session.user.token);
      }

      setIsAddingHotel(false);
      setEditState({
        isEditing: false,
        editingId: null,
      });
      setFormData({
        name: '',
        address: '',
        district: '',
        province: '',
        postalcode: '',
        tel: '',
        picture: '',
        description: ''
      });
      fetchHotels();
    } catch (error) {
      console.log('Error saving hotel:', error);
      alert('Failed to save hotel. Please try again.');
    }
  };

  const handleEdit = (hotel: Hotel) => {
    setEditState({
      isEditing: true,
      editingId: hotel._id,
    });
    setFormData({
      name: hotel.name,
      address: hotel.address,
      district: hotel.district,
      province: hotel.province,
      postalcode: hotel.postalcode,
      tel: hotel.tel,
      picture: hotel.picture,
      description: hotel.description
    });
    setIsAddingHotel(true);
  };

  const handleDelete = async (hotelId: string) => {
    if (!session?.user?.token) return;
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      try {
        await deleteHotel(hotelId, session.user.token);
        fetchHotels();
      } catch (error) {
        console.error('Error deleting hotel:', error);
      }
    }
  };

  const handleViewBookings = async (hotelId: string) => {
    if (!session?.user?.token) return;
    setBookingsLoading(true);
    try {
      const response = await getBookingsByHotel(hotelId, session.user.token);
      setSelectedHotelBookings(response.data);
      setIsViewingBookings(true);
    } catch (error) {
      console.error('Error fetching hotel bookings:', error);
      alert('Failed to fetch bookings');
    } finally {
      setBookingsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsAddingHotel(false);
    setEditState({
      isEditing: false,
      editingId: null,
    });
    setFormData({
      name: '',
      address: '',
      district: '',
      province: '',
      postalcode: '',
      tel: '',
      picture: '',
      description: ''
    });
  };

  const clearSearchFields = () => {
    setSearchTerm('');
    setSearchBookingId('');
    setSearchDateRange({
      start: null,
      end: null
    });
    setSortField('checkinDate');
    setSortDirection('asc');
  };

  const filteredBookings = selectedHotelBookings
    .filter(booking => {
      const guestName = typeof booking.user === 'object' && booking.user.name 
        ? booking.user.name.toLowerCase() 
        : '';
      
      const matchesGuestName = searchTerm 
        ? guestName.includes(searchTerm.toLowerCase())
        : true;
      
      const matchesBookingId = searchBookingId 
        ? booking._id.toLowerCase().includes(searchBookingId.toLowerCase())
        : true;

      let matchesDateRange = true;
      if (searchDateRange.start && searchDateRange.end) {
        const bookingStart = new Date(booking.checkinDate);
        const bookingEnd = new Date(booking.checkoutDate);
        const searchStart = new Date(searchDateRange.start);
        const searchEnd = new Date(searchDateRange.end);
        
        matchesDateRange = bookingStart >= searchStart && bookingEnd <= searchEnd;
      }

      return matchesGuestName && matchesBookingId && matchesDateRange;
    })
    .sort((a, b) => {
      const dateA = new Date(a[sortField]);
      const dateB = new Date(b[sortField]);
      return sortDirection === 'asc' 
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

  const handleCloseModal = () => {
    setIsViewingBookings(false);
    clearSearchFields();
  };

  if (!session) {
    return <div>Please sign in to manage hotels</div>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-[#C9A55C]">Hotels Management</h2>
        <button
          onClick={() => setIsAddingHotel(true)}
          className="px-4 py-2 bg-[#C9A55C] text-white font-serif rounded hover:bg-[#B38B4A] transition-colors"
        >
          Add New Hotel
        </button>
      </div>

      {/* Hotels List */}
      <div className="grid gap-4">
        {hotels.map((hotel: any) => (
          <div
            key={hotel._id}
            className="border border-[#333333] rounded-lg p-4 bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors"
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <img 
                    src={hotel.picture} 
                    alt={hotel.name} 
                    className="w-32 h-32 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-serif text-xl text-[#C9A55C]">{hotel.name}</h3>
                    <p className="text-gray-400">
                      {hotel.address}, {hotel.district}, {hotel.province} {hotel.postalcode}
                    </p>
                    <p className="text-gray-400">Tel: {hotel.tel}</p>
                    <p className="text-gray-400 mt-2">{hotel.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewBookings(hotel._id)}
                    className="px-3 py-1 bg-[#2A2A2A] text-[#C9A55C] border border-[#C9A55C] rounded hover:bg-[#C9A55C] hover:text-white transition-colors"
                  >
                    View Bookings
                  </button>
                  <button
                    onClick={() => handleEdit(hotel)}
                    className="px-3 py-1 bg-[#2A2A2A] text-[#C9A55C] border border-[#C9A55C] rounded hover:bg-[#C9A55C] hover:text-white transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hotel._id)}
                    className="px-3 py-1 bg-red-900/20 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bookings Modal */}
      {isViewingBookings && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#2A2A2A] p-6 rounded-lg w-full max-w-4xl border border-[#333333] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-serif text-[#C9A55C]">Hotel Bookings</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white"
              >
                Close
              </button>
            </div>
            
            <div className="mb-4 space-y-4">
              {/* Search Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Search by guest name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 bg-[#1A1A1A] border border-[#333333] rounded text-white"
                />
                <input
                  type="text"
                  placeholder="Search by booking ID..."
                  value={searchBookingId}
                  onChange={(e) => setSearchBookingId(e.target.value)}
                  className="w-full p-2 bg-[#1A1A1A] border border-[#333333] rounded text-white"
                />
              </div>

              {/* Date Range Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">From Date</label>
                  <input
                    type="date"
                    value={searchDateRange.start || ''}
                    onChange={(e) => setSearchDateRange(prev => ({
                      ...prev,
                      start: e.target.value
                    }))}
                    className="w-full p-2 bg-[#1A1A1A] border border-[#333333] rounded text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">To Date</label>
                  <input
                    type="date"
                    value={searchDateRange.end || ''}
                    onChange={(e) => setSearchDateRange(prev => ({
                      ...prev,
                      end: e.target.value
                    }))}
                    className="w-full p-2 bg-[#1A1A1A] border border-[#333333] rounded text-white"
                  />
                </div>
              </div>

              {/* Add Clear Filters button */}
              <div className="flex justify-end">
                <button
                  onClick={clearSearchFields}
                  className="px-4 py-2 bg-[#1A1A1A] text-gray-400 border border-[#333333] rounded hover:bg-[#2A2A2A] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {bookingsLoading ? (
              <p className="text-gray-400">Loading bookings...</p>
            ) : filteredBookings.length === 0 ? (
              <p className="text-gray-400">No bookings found for this hotel.</p>
            ) : (
              <div className="grid gap-4">
                {filteredBookings.map((booking) => (
                  <div key={booking._id} className="border border-[#333333] rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400">Guest: {typeof booking.user === 'object' ? booking.user.name : 'Loading...'}</p>
                        <p className="text-gray-400">Check-in: {new Date(booking.checkinDate).toLocaleDateString()}</p>
                        <p className="text-gray-400">Check-out: {new Date(booking.checkoutDate).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Booking ID: {booking._id}</p>
                        <p className="text-xs text-gray-500">Created: {new Date(booking.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Form */}
      {isAddingHotel && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#2A2A2A] p-8 rounded-lg w/full max-w-4xl border border-[#333333]">
            <h3 className="text-2xl font-serif text-[#C9A55C] mb-6">
              {editState.isEditing ? 'Edit Hotel' : 'Add New Hotel'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Hotel Name</label>
                    <input
                      type="text"
                      placeholder="Hotel Name"
                      className="w-full p-2 bg-[#1A1A1A] border border-[#333333] rounded text-white placeholder:text-gray-500 focus:border-[#C9A55C] focus:outline-none"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      maxLength={50}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-400">Address</label>
                    <input
                      type="text"
                      placeholder="Address"
                      className="w-full p-2 bg-[#1A1A1A] border border-[#333333] rounded text-white placeholder:text-gray-500 focus:border-[#C9A55C] focus:outline-none"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-400">District</label>
                    <input
                      type="text"
                      placeholder="District"
                      className="w-full p-2 bg-[#1A1A1A] border border-[#333333] rounded text-white placeholder:text-gray-500 focus:border-[#C9A55C] focus:outline-none"
                      value={formData.district}
                      onChange={(e) => setFormData({...formData, district: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-400">Province</label>
                    <input
                      type="text"
                      placeholder="Province"
                      className="w-full p-2 bg-[#1A1A1A] border border-[#333333] rounded text-white placeholder:text-gray-500 focus:border-[#C9A55C] focus:outline-none"
                      value={formData.province}
                      onChange={(e) => setFormData({...formData, province: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-400">Postal Code</label>
                    <input
                      type="text"
                      placeholder="Postal Code"
                      className="w-full p-2 bg-[#1A1A1A] border border-[#333333] rounded text-white placeholder:text-gray-500 focus:border-[#C9A55C] focus:outline-none"
                      value={formData.postalcode}
                      onChange={(e) => setFormData({...formData, postalcode: e.target.value})}
                      maxLength={5}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-400">Telephone</label>
                    <input
                      type="text"
                      placeholder="Telephone"
                      className="w-full p-2 bg-[#1A1A1A] border border-[#333333] rounded text-white placeholder:text-gray-500 focus:border-[#C9A55C] focus:outline-none"
                      value={formData.tel}
                      onChange={(e) => setFormData({...formData, tel: e.target.value})}
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-400">Picture URL</label>
                    <input
                      type="text"
                      placeholder="Picture URL"
                      className="w-full p-2 bg-[#1A1A1A] border border-[#333333] rounded text-white placeholder:text-gray-500 focus:border-[#C9A55C] focus:outline-none"
                      value={formData.picture}
                      onChange={(e) => setFormData({...formData, picture: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-400">Description</label>
                    <textarea
                      placeholder="Description"
                      className="w-full p-2 bg-[#1A1A1A] border border-[#333333] rounded text-white placeholder:text-gray-500 focus:border-[#C9A55C] focus:outline-none"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#C9A55C] text-white font-serif rounded hover:bg-[#B38B4A] transition-colors"
                    >
                      {editState.isEditing ? 'Update' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 bg-[#2A2A2A] text-[#C9A55C] border border-[#C9A55C] rounded hover:bg-[#C9A55C] hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
