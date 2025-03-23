export default async function getVenues() {
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    const response = await fetch(
      "https://a08-venue-explorer-backend-3.vercel.app/api/v1/venues"
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch venues. Status: ${response.status}, Message: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching venues:", error.message);
      throw new Error(`Error fetching venues: ${error.message}`);
    } else {
      console.error("An unknown error occurred while fetching venues:", error);
      throw new Error('An unknown error occurred while fetching venues.');
    }
  }
}