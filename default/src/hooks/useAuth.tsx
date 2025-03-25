"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Định nghĩa các interface cho các Context
interface NumberCartContextProps {
    numberCart: number;
    setNumberCart: React.Dispatch<React.SetStateAction<number>>;
}

interface UserContextProps {
    user: string | null;
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

// Tạo các Context
const NumberCartContext = createContext<NumberCartContextProps | undefined>(undefined);
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Tạo các Provider
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [numberCart, setNumberCart] = useState<number>(0);
    const [user, setUser] = useState<string | null>(null);

    return (
        <NumberCartContext.Provider value={{ numberCart, setNumberCart }}>
            <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
        </NumberCartContext.Provider>
    );
};

// Tạo các hook để sử dụng Context
export const useNumberCart = (): NumberCartContextProps => {
    const context = useContext(NumberCartContext);
    if (!context) {
        throw new Error("useNumberCart must be used within a NumberCartProvider");
    }
    return context;
};

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
