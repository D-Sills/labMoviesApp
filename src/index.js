import React, {useState, useEffect} from "react";
import {createRoot} from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviesPage from "./pages/moviesPage";
import MoviePage from "./pages/movieDetailsPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import UserListProvider from "./contexts/userListsContext";
import ContentFilteringContextProvider from "./contexts/filteringContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import { ThemeProvider } from '@mui/material/styles';
import TVPage from "./pages/tvPage";
import PeoplePage from "./pages/peoplePage";
import TVShowPage from "./pages/tvDetailsPage";
import PersonPage from "./pages/personDetailsPage";
import ThemeContextProvider from "./contexts/themeContext";
import { lightTheme, darkTheme } from "./styles/themes";

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
  const [theme, setTheme] = useState(lightTheme);
  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
        const colorScheme = event.matches ? "dark" : "light";
        colorScheme === "light" ? setTheme(lightTheme) : setTheme(darkTheme); 
        console.log(colorScheme);
        setTheme(colorScheme);
      });
  }, []);
  
  const changeTheme = () => {
    theme === lightTheme ? setTheme(darkTheme) : setTheme(lightTheme);
  };
  
  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeContextProvider>
          <UserListProvider>
          <ContentFilteringContextProvider>
          <ThemeProvider theme={theme}>
          <SiteHeader theme = {theme} changeTheme={changeTheme} lightMode = {lightTheme}/>    
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies/" element={<MoviesPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
                <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
              <Route path="/tv/" element={<TVPage />} />
                <Route path="/tv/:id" element={<TVShowPage />} />
              <Route path="/people/" element={<PeoplePage />} />
                <Route path="/people/:id" element={<PersonPage />} />
              <Route path="*" element={ <Navigate to="/" /> } />
            </Routes>
          </ThemeProvider>
          </ContentFilteringContextProvider>
          </UserListProvider>
          </ThemeContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App /> );