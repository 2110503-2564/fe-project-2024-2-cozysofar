import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/authOptions";

export default async function createReservation(
  hotelId: string,
  bookingData: {
    startDate: string;
    endDate: string;
    user: string;
  }
) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.token) {
    throw new Error("Authentication required");
  }

  const response = await fetch(
    `https://cozyhotel-be.vercel.app/api/v1/hotels/${hotelId}/bookings/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.token}`,
      },
      body: JSON.stringify(bookingData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create reservation");
  }

  return await response.json();
} 