import React, { useState } from "react";

export const ContentFilterContext = React.createContext();

const ContentFilteringContextProvider = (props) => {
  const [categoryFilter, setCategoryFilter] = useState("top_rated");
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  function handleChange(type, value) {
    if (type === "name") setNameFilter(value);
    else if (type === "category") setCategoryFilter(value);
    else setGenreFilter(value);
  };

  function changePage() { //kinda hacky ig but works
    setCategoryFilter("top_rated");
    setNameFilter("");
    setGenreFilter(0);
  };

  return (
    <ContentFilterContext.Provider
      value={{
        categoryFilter,
        nameFilter,
        genreFilter,
        genreId,
        handleChange,
        changePage,
      }}
    >
      {props.children}
    </ContentFilterContext.Provider>
  );
};

export default ContentFilteringContextProvider;