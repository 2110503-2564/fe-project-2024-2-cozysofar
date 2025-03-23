export default async function getVenue(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    const response = await fetch(
      `https://a08-venue-explorer-backend-3.vercel.app/api/v1/venues/${id}`
    );

    if (!response.ok) {
      // Improved error handling: include status code and message
      const errorText = await response.text();
      throw new Error(`Failed to fetch venue. Status: ${response.status}, Message: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    // Catch fetch errors (network, CORS, etc.)
    if (error instanceof Error) {
      console.error("Error fetching venue:", error.message);
      throw new Error(`Error fetching venue: ${error.message}`);
    } else {
      console.error("An unknown error occurred while fetching the venue:", error);
      throw new Error('An unknown error occurred while fetching the venue.');
    }
  }
}