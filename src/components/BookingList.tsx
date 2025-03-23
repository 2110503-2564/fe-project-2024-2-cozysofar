"use client";
import { removeBooking } from "@/redux/features/bookSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { BookingItem } from "../../interface";

export default function BookingList() {
  const venueItems = useAppSelector((state) => state.bookSlice.bookItems);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {venueItems.length == 0
        ? "No Venue Booking"
        : venueItems.map((bookingItem: BookingItem) => (
            <div
              className="bg-[#181A1B] text-[#52D7F7] border border-[#52D7F7] 
          rounded px-5 mx-5 py-2 my-3"
              key={bookingItem.venue}
            >
              <div className="text-xl font-semibold">{bookingItem.venue}</div>
              <div className="text-sm">Pick-up: {bookingItem.nameLastname}</div>
              <div className="text-sm">Return: {bookingItem.tel}</div>
              <div className="text-sm">Bookdate: {bookingItem.bookDate}</div>
              <button
                className="block bg-[#181A1B] text-[#52D7F7] border border-[#52D7F7] 
            font-semibold py-2 px-4 m-2 rounded z-50 bottom-0 right-0 hover:bg-[#52D7F7]
            hover:text-[#181A1B] hover:border-transparent"
                onClick={() => dispatch(removeBooking(bookingItem))}
              >
                Remove Reservation
              </button>
            </div>
          ))}
    </>
  );
}
