import "./App.css";
import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";

// Lazy Loading
const AppLayout = lazy(() => import("./layout/AppLayout"));
const HomePage = lazy(() => import("./pages/HomePage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const SearchWithKeywordPage = lazy(
  () => import("./pages/SearchWithKeywordPage")
);
const PlaylistDetailPage = lazy(() => import("./pages/PlaylistDetailPage"));
const PlaylistPage = lazy(() => import("./pages/PlaylistPage"));

import LoadingSpinner from "./common/components/LoadingSpinner";

//1. HomePage /
//2. searchPage /search
//3.SearchResultPage /search/:id
//4. PlayListDetailPage /playlist/:id
//5.모바일 버전(PlayListPage) /playlist

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/:keyword" element={<SearchWithKeywordPage />} />
          <Route path="/playlist/:id" element={<PlaylistDetailPage />} />
          <Route path="/playlist" element={<PlaylistPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
