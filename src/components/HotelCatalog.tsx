import Link from "next/link";
import ProductCard from "./ProductCard";
import Image from "next/image";

type Hotel = {
  name : string;
  addaress : string;
  district : string;
  province : string;
  postalcode : string;
  tel : string;
  picture : string;
  description : string;
  id : string;
};

type hotelJson = {
  success: boolean;
  count: number;
  data: Hotel[];
};

export default async function HotelCatalog({ hotelJson }: { hotelJson: Promise<hotelJson> }) {
  const carJsonReady = await hotelJson;
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-light text-white mb-6 tracking-[0.2em] uppercase">
            Discover Our Collection
          </h1>
          <div className="w-24 h-[1px] bg-[#52D7F7] mx-auto mb-6"></div>
          <p className="text-[#52D7F7] text-lg font-light tracking-[0.1em] uppercase">
            Curated Luxury Hotels for the Discerning Traveler
          </p>
        </div>
        
        <div className="space-y-6">
          {carJsonReady.data.map((carItem) => (
            <Link href={`/hotel/${carItem.id}`} key={carItem.id} className="group block">
              <div className="relative overflow-hidden bg-gray-900 
                  transition-all duration-700 border border-gray-800 hover:border-[#52D7F7]/20 
                  hover:shadow-[0_0_40px_rgba(82,215,247,0.1)]">
                <div className="flex flex-col md:flex-row">
                  {/* Image container */}
                  <div className="relative w-full md:w-[400px] h-[300px] md:h-[250px] overflow-hidden">
                    <Image
                      src={carItem.picture}
                      alt={carItem.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/30 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>

                  {/* Content container */}
                  <div className="p-8 md:p-10 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-2xl font-light text-[#52D7F7] 
                        transition-colors duration-500 group-hover:text-white mb-3 tracking-wide">
                        {carItem.name}
                      </h3>
                      <p className="text-gray-500 text-sm font-light tracking-[0.1em] uppercase mb-4">
                        {carItem.district}, {carItem.province}
                      </p>
                      <p className="text-gray-400 text-sm font-light leading-relaxed line-clamp-2">
                        {carItem.description}
                      </p>
                    </div>
                    
                    {/* Elegant button */}
                    <div className="mt-6">
                      <span className="inline-flex items-center text-[#52D7F7] text-sm font-light tracking-[0.2em] uppercase
                        border-b border-transparent group-hover:border-[#52D7F7] transition-all duration-500">
                        Discover More
                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-500" 
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
