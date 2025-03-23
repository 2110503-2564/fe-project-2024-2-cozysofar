"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import userRegister from "@/libs/userRegister";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const addUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim() === "") {
      setError("Please add a name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please add a valid email");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (tel.trim() === "") {
      setError("Please add a telephone number");
      return;
    }
    const res = await userRegister(name, email, password, tel);
    console.log(res);
    if (!res.success) {
      setError("Failed to register");
      return;
    }
    router.push("/api/auth/signin");
  };

  return (
    <main className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl text-center text-gray-800 mb-6">Register</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={addUser} className="space-y-4">
          <label className="w-auto block text-gray-700 pr-4" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            required
            id="name"
            name="name"
            placeholder="Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
          />

          <label className="w-auto block text-gray-700 pr-4" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            required
            id="email"
            name="email"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
          />

          <label className="w-auto block text-gray-700 pr-4" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            required
            id="password"
            name="password"
            placeholder="Password (min 6 characters)"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
          />

          <label className="w-auto block text-gray-700 pr-4" htmlFor="tel">
            Tel
          </label>
          <input
            type="text"
            required
            id="tel"
            name="tel"
            placeholder="Tel"
            onChange={(event) => {
              setTel(event.target.value);
            }}
            className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </main>
  );
}
