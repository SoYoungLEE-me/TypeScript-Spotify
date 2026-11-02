import { useEffect } from "react";
import { Box, Skeleton } from "@mui/material";
import { useInView } from "react-intersection-observer";
import useGetCategories from "../../../hooks/useGetCategories";
import CategoryCard from "./CategoryCard";

const gridSx = {
  display: "grid",
  gridTemplateColumns: {
    xs: "repeat(2, minmax(0, 1fr))",
    md: "repeat(3, minmax(0, 1fr))",
    lg: "repeat(4, minmax(0, 1fr))",
  },
  gap: 2,
};

export const BrowseCategoriesSkeleton = () => (
  <Box sx={gridSx}>
    {Array.from({ length: 8 }, (_, i) => (
      <Skeleton key={i} variant="rounded" height={180} />
    ))}
  </Box>
);

const BrowseCategories = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetCategories();
  const { ref, inView } = useInView({ rootMargin: "200px 0px" });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const categories = data.pages.flatMap((page) => page.categories.items);

  return (
    <>
      <Box sx={gridSx}>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </Box>

      {hasNextPage && (
        <Box ref={ref} sx={{ mt: 2 }}>
          <BrowseCategoriesSkeleton />
        </Box>
      )}
    </>
  );
};

export default BrowseCategories;
