import React, {useState, useMemo} from "react";
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
import AuthenticationContextProvider from "./contexts/authenticationContext";
import { lightTheme, darkTheme } from "./styles/themes";
import { useEffect } from "react";
import { CssBaseline} from "@mui/material";

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
                <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
              <Route path="/tv/" element={<TVPage />} />
                <Route path="/tv/:id" element={<TVShowPage />} />
              <Route path="/people/" element={<PeoplePage />} />
                <Route path="/people/:id" element={<PersonPage />} />
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