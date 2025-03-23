export default async function getUserProfile(token: string) {
  const response = await fetch("https://a08-venue-explorer-backend-2.vercel.app/api/v1/auth/me", {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  console.log("------------------------------------------------------------------------"  + token)
  if (!response.ok) {
    throw new Error("Cannot get user profile");
  }
 
  return await response.json();
}
