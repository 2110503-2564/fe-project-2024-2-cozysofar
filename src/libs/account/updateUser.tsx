export default async function updateUser(userId: string, userData: any, token: string) {
  const response = await fetch(
    `https://cozyhotel-be.vercel.app/api/v1/accounts/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    }
  );

  if (!response.ok) {
    throw new Error("Cannot update user");
  }

  return await response.json();
}
