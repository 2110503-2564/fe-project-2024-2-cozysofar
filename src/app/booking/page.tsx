"use client";
import LocationDateReserve from "@/components/DateReserve";
import { Select, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/en-gb";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSearchParams } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { BookingItem } from "../../../interface";
import { addBooking } from "@/redux/features/bookSlice";
import { useState } from "react";

export default function Bookings() {
  const urlParams = useSearchParams();
  const dispatch = useDispatch<AppDispatch>();

  const [nameLastname, setNameLastname] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [venue, setVenue] = useState<string>("");
  const [bookDate, setBookingDate] = useState<Dayjs | null>(null);

  const makeReservation = () => {
    if (nameLastname && tel && venue && bookDate) {
      const item = {
        nameLastname: nameLastname,
        tel: tel,
        venue: venue,
        bookDate: dayjs(bookDate).format("DD/MM/YYYY"),
      };
      dispatch(addBooking(item));
    }
  };

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4">
      <div className="text-xl font-medium">New Reservation</div>
      <div className="w-fit space-y-2">
        <div className="text-md text-left text-white">
          Enter Your Information
        </div>
        <div className="bg-slate-100 rounded-lg w-fit px-10 py-5 flex flex-col items-center gap-4 shadow-white">
          <TextField
            name="Name-Lastname"
            label="Name-Lastname"
            variant="standard"
            className="w-full"
            value={nameLastname}
            onChange={(e) => setNameLastname(e.target.value)}
          />
          <TextField
            name="Contact-Number"
            label="Contact-Number"
            variant="standard"
            className="w-full"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              format="DD/MM/YYYY"
              value={bookDate}
              onChange={(newValue) => setBookingDate(newValue)}
            />
          </LocalizationProvider>
          <Select
            variant="standard"
            name="location"
            id="location"
            className="h-[2em] w-[200px]"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          >
            <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
            <MenuItem value="Spark">Spark Space</MenuItem>
            <MenuItem value="GrandTable">The Grand Table</MenuItem>
          </Select>
        </div>
      </div>
      <button
        name="Book Venue"
        className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
        onClick={makeReservation}
      >
        Book Venue
      </button>
    </main>
  );
}
