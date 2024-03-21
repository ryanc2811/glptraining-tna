import React, { createContext, useState } from 'react';

// Create a Context
const UserTnaContext = createContext();

// Create a provider component
export const UserTnaProvider = ({ children }) => {
    const [userTnaId, setUserTnaId] = useState(null);
    const [businessAreaId, setBusinessAreaId] = useState(null);
    // The value prop is where we define what values
    // that are accessible to consumer components.
    return (
        <UserTnaContext.Provider value={{ userTnaId, setUserTnaId, businessAreaId, setBusinessAreaId }}>
            {children}
        </UserTnaContext.Provider>
    );
};

export default UserTnaContext;
