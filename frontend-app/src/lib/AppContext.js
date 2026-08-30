"use client";

import { createContext, useContext, useEffect, useState } from 'react'
import { apiClient } from "./api";

const defaultContextValue = {
  reservations: [],
  loadingReserv: false,
  isAuthenticated: false,
  user: null,
  fetchInitialData: async () => {},
  setIsAuthenticated: () => {},
  setUser: () => {},
};

const AppContext = createContext(defaultContextValue);

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [loadingReserv, setLoadingReserv] = useState(false);

      // جلب البيانات مرة واحدة فقط عند إقلاع التطبيق
    const fetchInitialData = async () => {
        try {
            setLoadingReserv(true);
            const res = await apiClient.get('/reservations');
            setReservations(res.data?.reservations || []);
            console.log('Reservations fetched:', res.data?.reservations);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoadingReserv(false);
        }
    };

    const RefetchReservations = () => {
      fetchInitialData();
    };

    useEffect(() => {
        const token = localStorage.getItem('admin_token')
        if (token) {
          setIsAuthenticated(true)
        }

        fetchInitialData();
    }, [])



  const StoreAdminToken = (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin_token', token);
    }
  }

  const GetAdminToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_token');
    }
    return null
  }


// Check if an Admin Token exists
  const CheckAdminToken = () => {
    const token = GetAdminToken();
    return Boolean(token && token.trim() !== '');
  }

  // Clear the Admin Token on Logout
  const RemoveAdminToken = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
    }
  }


  return (
    <AppContext.Provider
      value={{
        fetchInitialData,
        RefetchReservations,
        reservations,
        loadingReserv,
        isAuthenticated,
        setIsAuthenticated,

        // for the admin
        StoreAdminToken,
        CheckAdminToken,
        RemoveAdminToken,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useBarberApp = () => useContext(AppContext) ?? defaultContextValue;