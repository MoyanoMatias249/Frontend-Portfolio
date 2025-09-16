// frontend/src/context/AdminContext.jsx
import { createContext, useContext, useState, useEffect  } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
    const [isAdmin, setIsAdminState] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('modo_admin');
        if (stored === 'true') setIsAdminState(true);
    }, []);

    const setIsAdmin  = (value) => {
        setIsAdminState(value);
        localStorage.setItem('modo_admin', value ? 'true' : 'false');
    };
    
    return (
        <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    return useContext(AdminContext);
}
