export default async function deleteHotel(hotelId: string, token: string) {
    if (!token) {
        throw new Error("Authentication required");
    }

    const response = await fetch(`https://cozyhotel-be.vercel.app/api/v1/hotels/${hotelId}`, {
        method: 'DELETE',
        headers: {
            'authorization': `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        const errorData = await response.text();
        console.error('API Error Response:', errorData);
        console.error('Response Status:', response.status);

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