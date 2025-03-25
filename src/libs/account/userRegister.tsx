import { API_ENDPOINTS } from '@/config/api';

export default async function userRegister(
  userName: string,
  userEmail: string,
  userPassword: string,
  userTel: string
) {
  try {
    console.log(`Registering user: ${userName}, ${userEmail}`);

    const response = await fetch(
      API_ENDPOINTS.AUTH.REGISTER,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          password: userPassword,
          tel: userTel,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to register");
    }

    return await response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}
