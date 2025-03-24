export default async function getBookingsByHotel(hotelId: string, token: string) {
  const response = await fetch(`https://cozyhotel-be.vercel.app/api/v1/hotels/${hotelId}/bookings`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch hotel bookings");
  }

  return await response.json();
}
