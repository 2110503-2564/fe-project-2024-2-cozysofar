"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getUsers from "@/libs/account/getUsers";
import deleteUser from "@/libs/account/deleteUser";
import updateUser from "@/libs/account/updateUser";
import getUserProfile from "@/libs/account/getUserProfile";
import { User } from "@/types";

export default function AccountManagement() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.token) {
      fetchUsers();
    } else {
      setLoading(false); // Avoid indefinite loading state
    }
  }, [session]);

  const fetchUsers = async () => {
    if (!session?.user?.token) return;
    try {
      const response = await getUsers(session.user.token);
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    if (!session?.user?.token) return;
    try {
      await updateUser(userId, { role: newRole }, session.user.token);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!session?.user?.token) return;
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId, session.user.token);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  if (!session?.user?.token) {
    return <p>Please sign in to manage accounts</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-serif text-[#C9A55C] mb-6">User Accounts</h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="grid gap-4">
          {users.map((user: any) => (
            <div
              key={user._id}
              className="border border-[#333333] rounded-lg p-4 flex justify-between items-center bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors"
            >
              <div>
                <h3 className="font-semibold text-white">{user.name}</h3>
                <p className="text-sm text-gray-400">{user.email}</p>
                <p className="text-sm text-gray-400">Tel: {user.tel}</p>
                <p className="text-xs text-[#C9A55C]">Role: {user.role}</p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(user.createAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdateRole(user._id, "admin")}
                  className="px-3 py-1 bg-[#2A2A2A] text-[#C9A55C] border border-[#C9A55C] rounded hover:bg-[#C9A55C] hover:text-white transition-colors"
                >
                  Make Admin
                </button>
                <button
                  onClick={() => handleUpdateRole(user._id, "user")}
                  className="px-3 py-1 bg-[#2A2A2A] text-[#C9A55C] border border-[#C9A55C] rounded hover:bg-[#C9A55C] hover:text-white transition-colors"
                >
                  Make User
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="px-3 py-1 bg-red-900/20 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
