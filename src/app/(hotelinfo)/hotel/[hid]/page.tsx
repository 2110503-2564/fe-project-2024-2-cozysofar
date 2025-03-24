import Image from "next/image";
import getHotel from "@/libs/getHotel";
import Link from "next/link";

export default async function HotelDetailPage({
  params,
}: {
  params: { hid: string };
}) {
  const hotelDetail = await getHotel(params.hid);

  if (!hotelDetail || !hotelDetail.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-white">Hotel not found</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          {hotelDetail.data.name}
        </h1>
        
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-[400px]">
              <Image
                src={hotelDetail.data.picture}
                alt="Hotel Image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-[#52D7F7] mb-2">Description</h2>
                  <p className="text-gray-300 leading-relaxed">
                    {hotelDetail.data.description}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-[#52D7F7] mb-2">Location</h2>
                  <p className="text-gray-300">
                    {hotelDetail.data.address}, {hotelDetail.data.district}
                    <br />
                    {hotelDetail.data.province} {hotelDetail.data.postalcode}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-[#52D7F7] mb-2">Contact</h2>
                  <p className="text-gray-300">{hotelDetail.data.tel}</p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href={`/bookings?id=${params.hid}&model=${hotelDetail.data.model}`}
                  className="block w-full"
                >
                  <button
                    className="w-full bg-[#52D7F7] text-[#181A1B] 
                    font-bold py-3 px-6 rounded-lg transition-all duration-300
                    hover:bg-[#181A1B] hover:text-[#52D7F7] hover:border hover:border-[#52D7F7]
                    transform hover:scale-105"
                  >
                    Make Reservation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
