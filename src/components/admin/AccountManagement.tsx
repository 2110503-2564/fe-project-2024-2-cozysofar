"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getUsers from "@/libs/account/getUsers";
import deleteUser from "@/libs/account/deleteUser";
import updateUser from "@/libs/account/updateUser";
import getUserProfile from "@/libs/account/getUserProfile";
import { User } from "@/types";
import LoadingSpinner from './LoadingSpinner';

export default function AccountManagement() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    if (session?.user?.token) {
      fetchUsers();
    } else {
      setLoading(false);
    }
  }, [session, currentPage]);

  const fetchUsers = async () => {
    if (!session?.user?.token) return;
    try {
      setLoading(true);
      const response = await getUsers(session.user.token, currentPage, itemsPerPage);
      setUsers(response.data);
      setTotalItems(response.count);
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

  const Pagination = ({ totalItems, currentPage, onPageChange }: { 
    totalItems: number; 
    currentPage: number; 
    onPageChange: (page: number) => void;
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      
      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) pages.push(i);
          pages.push(-1); // Ellipsis
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push(-1); // Ellipsis
          for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
        } else {
          pages.push(1);
          pages.push(-1); // Ellipsis
          for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
          pages.push(-1); // Ellipsis
          pages.push(totalPages);
        }
      }
      return pages;
    };

    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-serif text-sm
            ${currentPage === 1 
              ? 'bg-[#2A2A2A] text-gray-500 cursor-not-allowed' 
              : 'bg-[#2A2A2A] text-[#C9A55C] hover:bg-[#333333] transition-colors'}`}
        >
          Previous
        </button>
        
        {getPageNumbers().map((pageNum, idx) => (
          pageNum === -1 ? (
            <span key={`ellipsis-${idx}`} className="text-gray-500">...</span>
          ) : (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-10 h-10 rounded-lg font-serif text-sm
                ${currentPage === pageNum
                  ? 'bg-[#C9A55C] text-white'
                  : 'bg-[#2A2A2A] text-[#C9A55C] hover:bg-[#333333] transition-colors'}`}
            >
              {pageNum}
            </button>
          )
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
          className={`px-4 py-2 rounded-lg font-serif text-sm
            ${currentPage === Math.ceil(totalItems / itemsPerPage)
              ? 'bg-[#2A2A2A] text-gray-500 cursor-not-allowed' 
              : 'bg-[#2A2A2A] text-[#C9A55C] hover:bg-[#333333] transition-colors'}`}
        >
          Next
        </button>
      </div>
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!session?.user?.token) {
    return <p>Please sign in to manage accounts</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-serif text-[#C9A55C] mb-6">User Accounts</h2>

      <div className="grid gap-4 mb-8">
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
                disabled={user.role === "admin"}
              >
                Make Admin
              </button>
              <button
                onClick={() => handleUpdateRole(user._id, "user")}
                className="px-3 py-1 bg-[#2A2A2A] text-[#C9A55C] border border-[#C9A55C] rounded hover:bg-[#C9A55C] hover:text-white transition-colors"
                disabled={user.role === "user"}
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

      <Pagination 
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
