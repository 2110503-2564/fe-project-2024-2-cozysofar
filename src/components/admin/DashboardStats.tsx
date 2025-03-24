'use client'
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import getUsers from '@/libs/account/getUsers';
import getHotels from '@/libs/hotel/getHotels';
import getBookings from '@/libs/booking/getBookings';

export default function DashboardStats() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalHotels: 0,
    activeBookings: 0,
  });

  useEffect(() => {
    if (!session?.user?.token) return;
    fetchStats();
  }, [session]);

  const fetchStats = async () => {
    if (!session?.user?.token) return;
    try {
      const [usersData, hotelsData, bookingsData] = await Promise.all([
        getUsers(session.user.token),
        getHotels(),
        getBookings(session.user.token)
      ]);

      setStats({
        totalUsers: usersData.count || 0,
        totalHotels: hotelsData.count || 0,
        activeBookings: bookingsData.count || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  if (!session) {
    return <div>Please sign in to view stats</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Total Hotels</h3>
        <p className="text-3xl font-bold text-blue-600">{stats.totalHotels}</p>
      </div>
      <div className="bg-green-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Active Bookings</h3>
        <p className="text-3xl font-bold text-green-600">{stats.activeBookings}</p>
      </div>
      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Total Users</h3>
        <p className="text-3xl font-bold text-purple-600">{stats.totalUsers}</p>
      </div>
    </div>
  );
}
