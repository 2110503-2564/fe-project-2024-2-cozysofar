"use client";
import DateReserve from "@/components/DateReserve";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import createBooking from "@/libs/booking/createBooking";

export default function Reservations() {
  const urlParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const cid = urlParams.get("id");
  const [hotelName, setHotelName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchHotelName = async () => {
      if (cid) {
        try {
          console.log("Fetching hotel with ID:", cid);
          const response = await fetch(
            `https://cozyhotel-be.vercel.app/api/v1/hotels/${cid}`
          );
          console.log("Response status:", response.status);

          if (response.ok) {
            const data = await response.json();
            console.log("Received data:", data);
            if (data && data.data && data.data.name) {
              setHotelName(data.data.name);
              console.log("Set hotel name to:", data.data.name);
            } else {
              console.error("No name found in response data");
            }
          } else {
            console.error("Failed to fetch hotel:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching hotel name:", error);
        }
      } else {
        console.log("No hotel ID provided");
      }
    };

    fetchHotelName();
  }, [cid]);

  useEffect(() => {
    console.log("hotelName changed to:", hotelName);
  }, [hotelName]);

  const makeReservation = async () => {
    if (!session?.user?.token) {
      alert("Please sign in to make a reservation");
      router.push("/api/auth/signin");
      return;
    }

    if (cid && pickupDate && returnDate) {
      if (returnDate.isBefore(pickupDate)) {
        alert("Check-out date must be after check-in date");
        return;
      }

      setIsLoading(true);
      try {
        console.log("Making reservation with data:", {
          cid,
          dates: {
            checkinDate: dayjs(pickupDate).format("YYYY/MM/DD"),
            checkoutDate: dayjs(returnDate).format("YYYY/MM/DD"),
          },
          userId: session.user._id,
        });

        await createBooking(
          cid,
          {
            startDate: dayjs(pickupDate).format("YYYY-MM-DD"),
            endDate: dayjs(returnDate).format("YYYY-MM-DD"),
            user: session.user._id,
          },
          session.user.token
        );

        setShowSuccess(true);
        setTimeout(() => {
          router.push("/cart");
        }, 2000);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to create reservation. Please try again.";
        alert(errorMessage);
        console.error("Reservation error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="luxury-card p-8 text-center">
            <div className="text-[#C9A55C] text-4xl mb-4">✓</div>
            <p className="text-[#C9A55C] text-xl font-serif mb-2">Reservation successful!</p>
            <p className="text-gray-300 text-sm">
              Redirecting to your reservations...
            </p>
          </div>
        </div>
      )}

      <div className="luxury-section">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif text-[#C9A55C] mb-6">New Reservation</h1>
          <div className="w-24 h-[2px] bg-[#C9A55C] mx-auto mb-6"></div>
          <p className="text-[#C9A55C] text-xl font-serif">
            {hotelName}
          </p>
        </div>

        <div className="luxury-card p-8 space-y-8 max-w-2xl mx-auto">
          <div className="space-y-4">
            <div className="text-[#C9A55C] text-xl font-serif">
              Check-in Date
            </div>
            <DateReserve
              onDateChange={(value: Dayjs) => {
                setPickupDate(value);
                setReturnDate(null); // Reset return date if pickup date changes
              }}
              minDate={dayjs()} // Check-in date can't be in the past
            />
          </div>

          <div className="space-y-4">
            <div className="text-[#C9A55C] text-xl font-serif">
              Check-out Date
            </div>
            <DateReserve
              onDateChange={(value: Dayjs) => {
                setReturnDate(value);
              }}
              minDate={
                pickupDate ? pickupDate.add(1, "day") : dayjs().add(1, "day")
              }
              // Check-out date must be at least 1 day after Check-in
            />
          </div>

          <div className="pt-4">
            <button
              className="luxury-button w-full relative"
              onClick={makeReservation}
              disabled={
                !cid || !pickupDate || !returnDate || isLoading
              }
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#C9A55C] mr-2"></div>
                  Processing...
                </div>
              ) : (
                "Reserve This Hotel"
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}