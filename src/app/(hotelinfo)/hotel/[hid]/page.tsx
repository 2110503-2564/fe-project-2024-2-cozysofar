import Image from "next/image";
import getCar from "@/libs/getHotel";
import Link from "next/link";

export default async function HotelDetailPage({
  params,
}: {
  params: { hid: string };
}) {
  const hotelDetail = await getCar(params.hid);
  
  if (!hotelDetail || !hotelDetail.data) {
    return <div>Hotel not found</div>;
  }

  return (
    <main className="text-center p-5">
      <h1 className="text-lg font-medium">{hotelDetail.data.name}</h1>
      
    </main>
  );
}