"use client";
import { removeReservation } from "@/redux/features/cartSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

export default function ReservationCart() {
  const carItems = useAppSelector((state) => state.cartSlice.carItems);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {carItems.map((reservationItem) => (
        <div
          className="bg-[#181A1B] text-[#52D7F7] border border-[#52D7F7] 
          rounded px-5 mx-5 py-2 my-3"
          key={reservationItem.carId}
        >
          <div className="text-xl font-semibold">{reservationItem.carModel}</div>
          <div className="text-sm">
            Pick-up {reservationItem.pickupDate} from{" "}
            {reservationItem.pickupLocation}
          </div>

          <div className="text-sm">
            Return {reservationItem.returnDate} to{" "}
            {reservationItem.returnLocation}
          </div>
          <div className="text-md">Duration: {reservationItem.numofDays}</div>
          <button
            className="block bg-[#181A1B] text-[#52D7F7] border border-[#52D7F7] 
            font-semibold py-2 px-4 m-2 rounded z-50 bottom-0 right-0 hover:bg-[#52D7F7]
            hover:text-[#181A1B] hover:border-transparent"
            onClick={() => dispatch(removeReservation(reservationItem))}
          >
            Remove Reservation
          </button>
        </div>
      ))}
    </>
  );
}
    