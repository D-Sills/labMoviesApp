import React, { useState } from "react";

export const PageNumberContext = React.createContext();

const PageNumberContextProvider = () => {
    const [page, setPage] = useState(1);

    const handlePageChange = (val) => { 
        if (page.equals(val)) return;
        else
            setPage(val);
    };

    return (
        <PageNumberContext.Provider
        value={{
            page,
            handlePageChange
        }}>
        </PageNumberContext.Provider>
    );
};

export default PageNumberContextProvider;