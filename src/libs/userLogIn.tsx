import Email from "next-auth/providers/email";

export default async function userLogIn(
  userEmail: string,
  userPassword: string
) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const response = await fetch("http://localhost:5000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to log-in");
  }

  return await response.json();
}
