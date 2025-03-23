import CarCatalog from "@/components/CarCatalog";
import CarPanel from "@/components/CarPanel";
import getCars from "@/libs/getCars";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Car() {
  const cars = getCars();

  return (
    <main className="text-center p-5">
      <h1 className="text-xl font-medium">Select Your Travel Partner</h1>
      <Suspense fallback = {<p>Loading ... <LinearProgress/></p>}>
        <CarCatalog carJson={cars} />
      </Suspense>
      <hr className="my-10" />
      <h1 className="text-xl text-white font-medium">
        Try Client Side Car Panel
      </h1>
      <CarPanel />
    </main>
  );
}
