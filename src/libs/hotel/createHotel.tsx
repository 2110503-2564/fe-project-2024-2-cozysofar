export default async function createHotel(
  hotelData: {
    name: string;
    address: string;
    district: string;
    province: string;
    postalcode: string;
    tel?: string;
    picture: string;
    description: string;
  },
  token: string
) {
  if (!token) {
    throw new Error("Authentication required");
  }

  const requestBody = {
    name: hotelData.name,
    address: hotelData.address,
    district: hotelData.district,
    province: hotelData.province,
    postalcode: hotelData.postalcode,
    tel: hotelData.tel,
    picture: hotelData.picture,
    description: hotelData.description,
  };

  console.log("Request URL:", `https://cozyhotel-be.vercel.app/api/v1/hotels/`);
  console.log("Request Body:", requestBody);
  console.log("Token:", token);

  const response = await fetch(
    `https://cozyhotel-be.vercel.app/api/v1/hotels/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const errorData = await response.text();
    console.error("API Error Response:", errorData);
    console.error("Response Status:", response.status);

    let errorMessage;
    try {
      // Try to parse the error as JSON
      const errorJson = JSON.parse(errorData);
      errorMessage = errorJson.message || errorJson.error || errorData;
    } catch {
      // If not JSON, use the raw error text
      errorMessage = errorData;
    }

    throw new Error(errorMessage);
  }

  return await response.json();
}
