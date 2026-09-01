"use client";

import { createContext, useContext, useEffect, useState } from 'react'
import { apiClient } from "./api";

const defaultContextValue = {
  reservations: [],
  loadingReserv: true,
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
  const [loadingReserv, setLoadingReserv] = useState(true);

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




  // admin check token on requests

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
    return Boolean(token && token !== 'undefined' && token !== 'null' && token.trim() !== '');
  }

const CheckAdminTokenServ = async () => {
  try {
    const token = localStorage.getItem('admin_token')
    if (!token) return false

    const resp = await apiClient.get('/wp-admin/verifytoken', {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (resp.status === 200) {
      return true
    }
  }catch (error) {
    console.error('Token verification failed:', error)
    // ONLY remove token if status is explicitly 401/403 (unauthorized)
    if (error.response?.status === 401 || error.response?.status === 403) {
      RemoveAdminToken()
    }
    return false
  }
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
        GetAdminToken,
        StoreAdminToken,
        CheckAdminToken,
        CheckAdminTokenServ,
        RemoveAdminToken,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useBarberApp = () => useContext(AppContext) ?? defaultContextValue;