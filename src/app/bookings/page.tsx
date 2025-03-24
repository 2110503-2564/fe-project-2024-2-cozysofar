"use client";
import LocationDateReserve from "@/components/LocationDateReserve";
import { AppDispatch } from "@/redux/store";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ReservationItem } from "../../../interface";
import { addReservation } from "@/redux/features/cartSlice";
import { useSession } from "next-auth/react";
import createBooking from "@/libs/createBooking";

export default function Reservations() {
  const urlParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const cid = urlParams.get("id");
  const model = urlParams.get("model");
  const [hotelName, setHotelName] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

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

  // Add a debug log for hotelName changes
  useEffect(() => {
    console.log("hotelName changed to:", hotelName);
  }, [hotelName]);

  const makeReservation = async () => {
    if (!session?.user?.token) {
      alert("Please sign in to make a reservation");
      router.push("/api/auth/signin");
      return;
    }

    if (cid && model && pickupDate && returnDate) {
      if (returnDate.isBefore(pickupDate)) {
        alert("Check-out date must be after check-in date");
        return;
      }

      try {
        console.log('Making reservation with data:', {
          cid,
          dates: {
            checkinDate: dayjs(pickupDate).format("YYYY/MM/DD"),
            checkoutDate: dayjs(returnDate).format("YYYY/MM/DD")
          },
          userId: session.user._id
        });

        await createBooking(cid, {
          startDate: dayjs(pickupDate).format("YYYY-MM-DD"),
          endDate: dayjs(returnDate).format("YYYY-MM-DD"),
          user: session.user._id
        }, session.user.token);

        const item: ReservationItem = {
          carId: cid,
          carModel: model,
          numofDays: returnDate.diff(pickupDate, "day"),
          pickupDate: dayjs(pickupDate).format("YYYY/MM/DD"),
          returnDate: dayjs(returnDate).format("YYYY/MM/DD"),
        };
        dispatch(addReservation(item));
        alert("Reservation added successfully!");
        router.push("/reservations/manage");
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to create reservation. Please try again.";
        alert(errorMessage);
        console.error("Reservation error:", error);
      }
    }
  };
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
  return (
    
    <main className="min-h-screen ">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-white mb-4 tracking-[0.2em] uppercase">
            New Reservation
          </h1>
          <div className="w-24 h-[1px] bg-[#52D7F7] mx-auto mb-4"></div>
          <p className="text-[#52D7F7] text-lg font-light tracking-[0.1em] uppercase">
            {hotelName}
          </p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 space-y-8">
          <div className="space-y-4">
            <div className="text-[#52D7F7] text-lg font-light tracking-[0.1em] uppercase">
              Check-in Date
            </div>
            <LocationDateReserve
              onDateChange={(value: Dayjs) => {
                setPickupDate(value);
              }}
              onLocationChange={() => {}}
            />
          </div>

          <div className="space-y-4">
            <div className="text-[#52D7F7] text-lg font-light tracking-[0.1em] uppercase">
              Check-out Date
            </div>
            <LocationDateReserve
              onDateChange={(value: Dayjs) => {
                setReturnDate(value);
              }}
              onLocationChange={() => {}}
            />
          </div>

          <div className="pt-4">
            <button
              className="w-full bg-gray-900 text-white border border-white 
              font-light py-3 px-6 rounded tracking-[0.2em] uppercase
              hover:bg-white hover:text-gray-900 transition-all duration-500
              disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={makeReservation}
              disabled={!cid || !model || !pickupDate || !returnDate}
            >
              Reserve This Hotel
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
