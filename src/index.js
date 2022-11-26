import React from "react";
import {createRoot} from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviesPage from "./pages/moviesPage";
import MoviePage from "./pages/movieDetailsPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import ContentFilteringContextProvider from "./contexts/filteringContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import theme from "./themes"
import { ThemeProvider } from '@mui/material/styles';
import TVPage from "./pages/tvPage";

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
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MoviesContextProvider>
          <ContentFilteringContextProvider>
          <SiteHeader />      {/* New Header  */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies/" element={<MoviesPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
                <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
              <Route path="/tv/" element={<TVPage />} />
              <Route path="/people/" element={<MoviesPage />} />
              <Route path="*" element={ <Navigate to="/" /> } />
            </Routes>
          </ContentFilteringContextProvider>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App /> );