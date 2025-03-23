"use client";
import LocationDateReserve from "@/components/LocationDateReserve";
import { AppDispatch } from "@/redux/store";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ReservationItem } from "../../../interface";
import { addReservation } from "@/redux/features/cartSlice";

export default function Reservations() {
  const urlParams = useSearchParams();
  const cid = urlParams.get("id");
  const model = urlParams.get("model");
  const dispatch = useDispatch<AppDispatch>();

  const makeReservation = () => {
    if (cid && model && pickupDate && returnDate) {
      const item: ReservationItem = {
        carId: cid,
        carModel: model,
        numofDays: returnDate.diff(pickupDate, "day"),
        pickupDate: dayjs(pickupDate).format("YYYY//MM/DD"),
        pickupLocation: pickupLocation,
        returnDate: dayjs(returnDate).format("YYYY//MM/DD"),
        returnLocation: returnLocation,
      };
      dispatch(addReservation(item));
    }
  };
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
  const [pickupLocation, setPickupLocation] = useState<string>("BKK");
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
  const [returnLocation, setReturnLocation] = useState<string>("BKK");
  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div className="text-xl font-medium">New Reservation</div>
      <div className="text-xl font-medium">Car : {model}</div>
      <div className="w-fit space-y-2">
        <div className="text-md text-left text-white">
          Pick-Up Date and Location
        </div>
        <LocationDateReserve
          onDateChange={(value: Dayjs) => {
            setPickupDate(value);
          }}
          onLocationChange={(value: string) => {
            setPickupLocation(value);
          }}
        />
        <div className="text-md text-left text-white">
          Return Date and Location
        </div>
        <LocationDateReserve
          onDateChange={(value: Dayjs) => {
            setReturnDate(value);
          }}
          onLocationChange={(value: string) => {
            setReturnLocation(value);
          }}
        />
      </div>
      <button
        className="block bg-[#181A1B] text-[#52D7F7] border border-[#52D7F7] 
        font-semibold py-2 px-4 m-2 rounded hover:bg-[#52D7F7]
        hover:text-[#181A1B] hover:boarder-transparent"
        onClick={makeReservation}
      >
        Reserve This Car
      </button>
    </main>
  );
}
