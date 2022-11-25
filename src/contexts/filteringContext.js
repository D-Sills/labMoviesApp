import React, { useState } from "react";

export const ContentFilterContext = React.createContext();

const ContentFilteringContextProvider = (props) => {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };


  return (
    <ContentFilterContext.Provider
      value={{
        nameFilter,
        genreFilter,
        genreId,
        handleChange,
      }}
    >
      {props.children}
    </ContentFilterContext.Provider>
  );
};

export default ContentFilteringContextProvider;