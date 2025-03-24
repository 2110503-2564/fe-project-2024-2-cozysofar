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
      <h2 className="text-2xl font-semibold mb-6">User Accounts</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4">
          {users.map((user: any) => (
            <div
              key={user._id}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">Tel: {user.tel}</p>
                <p className="text-xs text-gray-500">Role: {user.role}</p>
                <p className="text-xs text-gray-400">
                  Created: {new Date(user.createAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdateRole(user._id, "admin")}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Make Admin
                </button>
                <button
                  onClick={() => handleUpdateRole(user._id, "user")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Make User
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
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
