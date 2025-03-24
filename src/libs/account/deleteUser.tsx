export default async function deleteUser(userId: string, token: string) {
  const response = await fetch(
    `https://cozyhotel-be.vercel.app/api/v1/accounts/${userId}`,
    {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Cannot delete user");
  }

  return await response.json();
}
