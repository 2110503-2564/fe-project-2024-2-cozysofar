"use client";
import { useReducer, useState, useRef, useEffect } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import getCars from "@/libs/getHotels";

type Car = {
  _id: string;
  model: string;
  description: string;
  picture: string;
  seats: number;
  doors: number;
  largebags: number;
  smallbags: number;
  automatic: boolean;
  dayRate: number;
  __v: number;
  id: string;
};

type carJson = {
  success: boolean;
  count: number;
  data: Car[];
};


/* Mock Data for Demontration Only 
const mockCarRepo = [
  { cid: "001", name: "Batmobile", image: "/img/batmobile.jpg" },
  { cid: "002", name: "DeLorean", image: "/img/delorean.jpg" },
  { cid: "003", name: "Mr.Bean's Car", image: "/img/mrbean.jpg" },
  { cid: "004", name: "Mystery Machine", image: "/img/mystery_machine.jpg" },
];
*/

export default function CarPanel() {
  const [carResponse, setCarResponse] = useState<carJson | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const cars = await getCars();
      setCarResponse(cars);
    };

    fetchData();
  }, []);

  const countRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const compareReducer = (
    compareList: Set<string>,
    action: { type: string; carName: string }
  ) => {
    switch (action.type) {
      case "add": {
        return new Set(compareList.add(action.carName));
      }
      case "remove": {
        compareList.delete(action.carName);
        return new Set(compareList);
      }
      default: {
        return compareList;
      }
    }
  };

  const [compareList, dispatchCompare] = useReducer(
    compareReducer,
    new Set<string>()
  );

  if (!carResponse) return <p>Car Panel is Loading ...</p>;

  return (
    <div>
      <div
        style={{
          margin: "20px",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "space-around",
        }}
      >
        {carResponse.data.map((carItem: Car) => (
          <Link href={`/car/${carItem.id}`} className="w-1/5">
            <ProductCard
              carName={carItem.model}
              imgSrc={carItem.picture}
              onCompare={(car: string) =>
                dispatchCompare({ type: "add", carName: car })
              }
            />
          </Link>
        ))}
      </div>
      <div className="w-full text-xl font-medium">
        Compare List : {compareList.size}
      </div>
      {Array.from(compareList).map((car) => (
        <div key={car}>{car}</div>
      ))}
      <button
        className="block bg-[#181A1B] text-[#52D7F7] border border-[#52D7F7] px-4 py-2 rounded-md font-bold hover:bg-[#52D7F7] hover:text-[#181A1B] transition"
        onClick={() => {
          countRef.current = countRef.current + 1;
          alert(countRef.current);
        }}
      >
        Count with Ref Object
      </button>
      <input
        type="text"
        placeholder="please fill"
        className="block text-gray-900 text-sm rounded-lg p-2 m-2 bg-purple-50 ring-1 ring-inset ring-purple-400 focus:outline-none focus:bg-purple-200 focus:ring-2"
        ref={inputRef}
      />
      <button
        className="block bg-[#181A1B] text-[#52D7F7] border border-[#52D7F7] px-4 py-2 rounded-md font-bold hover:bg-[#52D7F7] hover:text-[#181A1B] transition"
        onClick={() => {
          if (inputRef.current != null) {
            inputRef.current.focus();
          }
        }}
      >
        Focus Input
      </button>
    </div>
  );
}
