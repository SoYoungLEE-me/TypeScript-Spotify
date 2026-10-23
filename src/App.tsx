import "./App.css";
import { Routes, Route, useLocation } from "react-router";
import { lazy, Suspense } from "react";
import { Box } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { useEffect } from "react";
import useExchangeToken from "./hooks/useExchangeToken";

// Lazy Loading
import AppLayout from "./layout/AppLayout";
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const SearchWithKeywordPage = lazy(
  () => import("./pages/SearchWithKeywordPage")
);
const PlaylistDetailPage = lazy(() => import("./pages/PlaylistDetailPage"));
const PlaylistPage = lazy(() => import("./pages/PlaylistPage"));
const AlbumDetailPage = lazy(
  () => import("./pages/AlbumDetailPage/AlbumDetailPage")
);

import LoadingSpinner from "./common/components/LoadingSpinner";
import ErrorMessage from "./common/components/ErrorMessage";

//1. HomePage /
//2. searchPage /search
//3.SearchResultPage /search/:id
//4. PlayListDetailPage /playlist/:id
//5.모바일 버전(PlayListPage) /playlist

const CenterBox = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      display: "flex",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </Box>
);

function App() {
  const location = useLocation();

  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    const codeVerifier = localStorage.getItem("code_verifier");

    if (!code || !codeVerifier) return;

    window.history.replaceState(null, "", window.location.pathname);
    exchangeToken({ code, codeVerifier });
  }, [exchangeToken]);

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          resetKeys={[location.pathname]}
          fallback={
            <CenterBox>
              <ErrorMessage errorMessage="데이터를 불러오지 못했어요." />
            </CenterBox>
          }
        >
          <Suspense
            fallback={
              <CenterBox>
                <LoadingSpinner />
              </CenterBox>
            }
          >
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route
                  path="/search/:keyword"
                  element={<SearchWithKeywordPage />}
                />
                <Route path="/playlist/:id" element={<PlaylistDetailPage />} />
                <Route path="/playlist" element={<PlaylistPage />} />
                <Route path="/album/:id" element={<AlbumDetailPage />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default App;
