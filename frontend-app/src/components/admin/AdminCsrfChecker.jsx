"use client";

import { useEffect, useState } from 'react';
import { useBarberApp } from '../../lib/AppContext'
import { useRouter, usePathname } from 'next/navigation';

export default function AdminCsrfChecker({ children }) {
    const {CheckAdminToken, CheckAdminTokenServ, RemoveAdminToken} = useBarberApp()
    const router = useRouter();
    const pathname = usePathname();
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (pathname === '/wp-admin/login') {
            setIsVerified(true);
            setIsLoading(false);
            return;
        }

        const VerifiedToken = async () => {
            const isValid = CheckAdminToken()
            if (!isValid) {
                RemoveAdminToken()
                setIsVerified(false);
                setIsLoading(false);
                router.replace('/wp-admin/login')
                return;
            }
            try {
                await CheckAdminTokenServ()
                setIsVerified(true)
            } catch (err) {
                console.error("Token verification failed:", err)
                RemoveAdminToken()
                router.replace('/wp-admin/login')
            } finally {
                setIsLoading(false)
            }
        }
        VerifiedToken();
    },[])

    if (isLoading || (!isVerified && pathname !== '/wp-admin/login')) {
        return null;
    }

    return <>{children}</>

}