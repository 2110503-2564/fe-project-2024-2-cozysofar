export default async function getHotels() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await fetch("https://cozyhotel-be.vercel.app/api/v1/hotels");
  if (!response.ok) {
    throw new Error("Failed to fetch Hotels");
  }

  return await response.json();
}
