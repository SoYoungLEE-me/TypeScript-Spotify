import { Suspense } from "react";
import { Box, Typography } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import EmptyState from "../../common/components/EmptyState";
import SearchHeader from "./components/SearchHeader";
import BrowseCategories, {
  BrowseCategoriesSkeleton,
} from "./components/BrowseCategories";

const SearchPage = () => {
  return (
    <Box sx={{ pt: 2 }}>
      <SearchHeader onSearch={() => {}} />

      <Typography variant="h1" sx={{ mt: 4, mb: 2 }}>
        모두 둘러보기
      </Typography>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallback={<EmptyState>카테고리를 불러오지 못했어요.</EmptyState>}
          >
            <Suspense fallback={<BrowseCategoriesSkeleton />}>
              <BrowseCategories />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Box>
  );
};

export default SearchPage;
