"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getBookings from "@/libs/booking/getBookings";
import editBooking from "@/libs/booking/updateBooking";
import deleteBooking from "@/libs/booking/deleteBooking";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Booking {
  _id: string;
  hotel: {
    name: string;
  };
  checkinDate: string;
  checkoutDate: string;
  user: string;
}

export default function ReservationCart() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState<string | null>(null);
  const [newCheckinDate, setNewCheckinDate] = useState<Date | null>(null);
  const [newCheckoutDate, setNewCheckoutDate] = useState<Date | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (session?.user?.token) {
        try {
          const response = await getBookings(session.user.token);
          setBookings(response.data);
        } catch (error) {
          console.error("Failed to fetch bookings:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookings();
  }, [session]);

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking._id);
    setNewCheckinDate(new Date(booking.checkinDate));
    setNewCheckoutDate(new Date(booking.checkoutDate));
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editingBooking || !newCheckinDate || !newCheckoutDate || !session?.user?.token) return;

    setEditLoading(true);
    try {
      await editBooking(editingBooking, session.user.token, {
        checkinDate: newCheckinDate.toISOString(),
        checkoutDate: newCheckoutDate.toISOString(),
      });

      // Refresh bookings after edit
      const response = await getBookings(session.user.token);
      setBookings(response.data);
      setIsEditing(false);
      setEditingBooking(null);
      setSuccessMessage("Booking dates updated successfully!");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to update booking:", error);
      alert("Failed to update booking. Please try again.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteClick = (booking: Booking) => {
    setBookingToDelete(booking);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!session?.user?.token || !bookingToDelete) return;

    setDeleteLoading(bookingToDelete._id);
    try {
      await deleteBooking(bookingToDelete._id, session.user.token);
      
      // Refresh bookings after deletion
      const response = await getBookings(session.user.token);
      setBookings(response.data);
      setSuccessMessage("Booking deleted successfully!");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to delete booking:", error);
      alert("Failed to delete booking. Please try again.");
    } finally {
      setDeleteLoading(null);
      setShowDeleteConfirm(false);
      setBookingToDelete(null);
    }
  };

  if (!session) {
    return (
      <div className="text-center text-[#52D7F7] py-8">
        Please sign in to view your bookings
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#52D7F7] mb-4 mx-auto"></div>
          <div className="text-[#52D7F7] text-lg">Loading your bookings...</div>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center text-[#52D7F7] py-8">
        You don't have any bookings yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center relative">
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="text-green-600 text-2xl mb-4">✓</div>
            <p className="text-gray-800 font-medium">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && bookingToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#181A1B] p-6 rounded-lg w-96 border border-[#52D7F7] shadow-lg">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-100">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-[#52D7F7] mb-2">Delete Booking</h2>
              <p className="text-gray-400">
                Are you sure you want to delete your booking at{" "}
                <span className="text-[#52D7F7]">{bookingToDelete.hotel.name}</span>?
              </p>
              <p className="text-gray-400 mt-2 text-sm">
                Check-in: {new Date(bookingToDelete.checkinDate).toLocaleDateString()}
                <br />
                Check-out: {new Date(bookingToDelete.checkoutDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-3 justify-center">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors flex items-center justify-center min-w-[100px]"
                disabled={deleteLoading === bookingToDelete._id}
              >
                {deleteLoading === bookingToDelete._id ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setBookingToDelete(null);
                }}
                className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
                disabled={deleteLoading === bookingToDelete._id}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {bookings.map((booking) => (
        <div
          className="bg-[#181A1B] text-[#52D7F7] border border-[#52D7F7] 
          rounded px-5 mx-5 py-4 my-3"
          key={booking._id}
        >
          <div className="text-xl font-semibold">{booking.hotel.name}</div>
          <div className="text-md mt-2">
            Check-in: {new Date(booking.checkinDate).toLocaleDateString()}
          </div>
          <div className="text-md">
            Check-out: {new Date(booking.checkoutDate).toLocaleDateString()}
          </div>
          <div className="flex space-x-3 mt-3">
            <button
              onClick={() => handleEdit(booking)}
              className="bg-[#52D7F7] text-[#181A1B] px-4 py-2 rounded hover:bg-[#3BC1E5] transition-colors"
            >
              Edit Dates
            </button>
            <button
              onClick={() => handleDeleteClick(booking)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Delete Booking
            </button>
          </div>
        </div>
      ))}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-[#181A1B] p-6 rounded-lg w-96">
            <h2 className="text-[#52D7F7] text-xl mb-4">Edit Booking Dates</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[#52D7F7] mb-2">Check-in Date</label>
                <DatePicker
                  selected={newCheckinDate}
                  onChange={(date: Date | null) => setNewCheckinDate(date)}
                  className="w-full p-2 rounded bg-[#242628] text-[#52D7F7] border border-[#52D7F7]"
                  dateFormat="MM/dd/yyyy"
                  disabled={editLoading}
                />
              </div>
              <div>
                <label className="block text-[#52D7F7] mb-2">Check-out Date</label>
                <DatePicker
                  selected={newCheckoutDate}
                  onChange={(date: Date | null) => setNewCheckoutDate(date)}
                  className="w-full p-2 rounded bg-[#242628] text-[#52D7F7] border border-[#52D7F7]"
                  dateFormat="MM/dd/yyyy"
                  minDate={newCheckinDate || new Date()}
                  disabled={editLoading}
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="bg-[#52D7F7] text-[#181A1B] px-4 py-2 rounded hover:bg-[#3BC1E5] transition-colors flex items-center justify-center min-w-[100px]"
                  disabled={editLoading}
                >
                  {editLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#181A1B] mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingBooking(null);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                  disabled={editLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
    