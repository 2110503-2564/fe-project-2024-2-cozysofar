"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getBookings from "@/libs/getBookings";

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

  if (!session) {
    return (
      <div className="text-center text-[#52D7F7] py-8">
        Please sign in to view your bookings
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center text-[#52D7F7] py-8">
        Loading your bookings...
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
        </div>
      ))}
    </div>
  );
}
    