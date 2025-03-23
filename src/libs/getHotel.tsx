export default async function getHotel(id:string) {
    const response = await fetch(`https://cozyhotel-be.vercel.app/api/v1/hotels/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch Hotel");
  }
  return await response.json(); 
}