import HotelCatalog from "@/components/HotelCatalog";
import getHotels from "@/libs/getHotels";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Car() {
  const hotels = getHotels();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Find Your Perfect Stay
        </h1>
        <div className="bg-gray-800 rounded-xl shadow-2xl p-6">
          <Suspense 
            fallback={
              <div className="py-8">
                <p className="text-[#52D7F7] mb-4">Finding the best hotels for you...</p>
                <LinearProgress sx={{ 
                  maxWidth: '400px', 
                  margin: '0 auto',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#52D7F7'
                  }
                }}/>
              </div>
            }
          >
            <HotelCatalog hotelJson={hotels} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
