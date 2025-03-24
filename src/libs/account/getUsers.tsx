export default async function getUsers(token: string) {
  // const params = new URLSearchParams();
  // if (queryParams) {
  //   Object.entries(queryParams).forEach(([key, value]) => {
  //     if (value) params.append(key, value.toString());
  //   });
  // }

  const response = await fetch(
    `https://cozyhotel-be.vercel.app/api/v1/accounts?`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
    } 
    }
  );

  if (!response.ok) {
    throw new Error("Cannot get users");
  }

  return await response.json();
}
