import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SiteHeader from './components/siteHeader';
import AuthenticationContextProvider from "./contexts/authenticationContext";
import ContentFilteringContextProvider from "./contexts/filteringContext";
import UserListProvider from "./contexts/userListsContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import MoviesPage from "./pages/moviesPage";
import PeoplePage from "./pages/peoplePage";
import PersonPage from "./pages/personDetailsPage";
import TVShowPage from "./pages/tvDetailsPage";
import UserPage from "./pages/userProfilePage";
import TVPage from "./pages/tvPage";
import { darkTheme, lightTheme } from "./styles/themes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  const [themeIndex, setThemeIndex] = useState(0);
  const [theme, setTheme] = useState(lightTheme);
  
  useEffect(() => {
    if (window.localStorage.getItem('themeIndex') === null) {
      return;
    }
    setThemeIndex(JSON.parse(window.localStorage.getItem('themeIndex')));
    themeIndex === 0 ? setTheme(lightTheme) : setTheme(darkTheme);
  }, [themeIndex]);
  
  const changeTheme = () => {
    let i = themeIndex
    i === 0 ? i=1 : i=0;
    window.localStorage.setItem('themeIndex', JSON.stringify(i))
    setThemeIndex(JSON.parse(window.localStorage.getItem('themeIndex')))
  };
  
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthenticationContextProvider>
          <UserListProvider>
          <ContentFilteringContextProvider>
          <SiteHeader theme = {theme} changeTheme={changeTheme} lightMode = {lightTheme}/>    
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies/" element={<MoviesPage />} />
                <Route exact path="/movies/:id" element={<MoviePage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
              <Route path="/tv/" element={<TVPage />} />
                <Route exact path="/tv/:id" element={<TVShowPage />} />
              <Route path="/people/" element={<PeoplePage />} />
                <Route exact path="/people/:id" element={<PersonPage />} />
                <Route path="/user/:uid" element={<UserPage />} />
              <Route path="*" element={ <Navigate to="/" /> } />
            </Routes>
          </ContentFilteringContextProvider>
          </UserListProvider>
          </AuthenticationContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App /> );